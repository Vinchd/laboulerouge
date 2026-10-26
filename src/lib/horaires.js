import Papa from "papaparse";

export async function fetchHoraires() {
  try {
    const res = await fetch(process.env.GOOGLE_SHEET_SCHEDULES_URL, {
      next: { revalidate: 6 },
    });

    if (!res.ok) return [];

    const csv = await res.text();
    const lignes = Papa.parse(csv, { skipEmptyLines: true }).data.slice(1);

    return lignes
      .map(([jour, ouvMidi, fermMidi, ouvSoir, fermSoir, ferme]) => ({
        jour: jour?.trim() ?? "",
        ouvMidi: ouvMidi?.trim() ?? "",
        fermMidi: fermMidi?.trim() ?? "",
        ouvSoir: ouvSoir?.trim() ?? "",
        fermSoir: fermSoir?.trim() ?? "",
        ferme: ferme?.trim() ?? "",
      }))
      .filter((h) => h.jour);
  } catch {
    return [];
  }
}

function lireHeure(valeur, zeroValide = false) {
  const [h, m = "00"] = (valeur ?? "").trim().split(":");
  if (!h) return null;

  const heures = Number(h);
  const minutes = Number(m);
  if (heures === 0 && minutes === 0 && !zeroValide) return null;

  return { heures, minutes };
}

function formatHeure({ heures, minutes }) {
  if (heures === 0 && minutes === 0) return "00h";

  const mm = minutes === 0 ? "" : String(minutes).padStart(2, "0");
  return `${heures}h${mm}`;
}

function formatHeureIso({ heures, minutes }) {
  const hh = String(heures).padStart(2, "0");
  const mm = String(minutes).padStart(2, "0");
  return `${hh}:${mm}`;
}

function creneau(debut, fin) {
  return {
    texte: `${formatHeure(debut)}-${formatHeure(fin)}`,
    iso: `${formatHeureIso(debut)}-${formatHeureIso(fin)}`,
  };
}

const estFerme = (h) => ["TRUE", "VRAI"].includes(h.ferme?.toUpperCase());

function lirePlage({ ouvMidi, fermMidi, ouvSoir, fermSoir }) {
  const a = lireHeure(ouvMidi);
  const b = lireHeure(fermMidi);
  const c = lireHeure(ouvSoir);
  const d = lireHeure(fermSoir, true);

  if (a && b && c && d) {
    const dej = creneau(a, b);
    const din = creneau(c, d);
    return {
      type: "separe",
      dej: dej.texte,
      din: din.texte,
      plage: `${dej.texte} / ${din.texte}`,
      creneaux: [dej.iso, din.iso],
    };
  }

  if (a && !b && d) {
    const continu = creneau(a, d);
    return {
      type: "continu",
      dej: null,
      din: null,
      plage: continu.texte,
      creneaux: [continu.iso],
    };
  }

  if (a && b && !c) {
    const dej = creneau(a, b);
    return {
      type: "midi",
      dej: dej.texte,
      din: null,
      plage: dej.texte,
      creneaux: [dej.iso],
    };
  }

  if (!a && !b && c && d) {
    const din = creneau(c, d);
    return {
      type: "soir",
      dej: null,
      din: din.texte,
      plage: din.texte,
      creneaux: [din.iso],
    };
  }

  return null;
}

function libelleJours(jours, prefixe = "") {
  const consecutifs = jours.every(
    (j, i) => i === 0 || j.index === jours[i - 1].index + 1,
  );

  if (jours.length >= 3 && consecutifs) {
    return `${prefixe}${jours[0].jour} au ${jours[jours.length - 1].jour}`;
  }
  return jours.map((j) => j.jour).join(", ");
}

function grouperPar(jours, cle) {
  const map = new Map();
  for (const j of jours) {
    const k = cle(j);
    if (!map.has(k)) map.set(k, []);
    map.get(k).push(j);
  }
  return map;
}

function sectionsParService(ouverts) {
  if (ouverts.length === 0 || ouverts.some((j) => j.type === "continu")) {
    return null;
  }

  const sections = [];
  for (const [titre, champ] of [
    ["Déjeuner", "dej"],
    ["Dîner", "din"],
  ]) {
    const concernes = ouverts.filter((j) => j[champ]);
    const groupes = grouperPar(concernes, (j) => j[champ]);

    if (groupes.size > 1) return null;
    if (groupes.size === 1) {
      const [plage, jours] = [...groupes][0];
      sections.push({
        titre,
        lignes: [{ jours: libelleJours(jours, "Du "), plage }],
      });
    }
  }
  return sections;
}

function sectionsParPlage(ouverts, fermes) {
  const lignes = [...grouperPar(ouverts, (j) => j.plage)].map(
    ([plage, jours]) => ({ jours: libelleJours(jours), plage }),
  );

  if (fermes.length > 0 && lignes.length !== 1) {
    lignes.push({ jours: libelleJours(fermes), plage: null });
  }
  return [{ titre: null, lignes }];
}

export function grouperHoraires(horaires) {
  const jours = horaires.map((h, index) => {
    const plage = estFerme(h) ? null : lirePlage(h);
    return { jour: h.jour, index, ...plage };
  });

  const ouverts = jours.filter((j) => j.type);
  const fermes = jours.filter((j) => !j.type);

  if (jours.length === 0) return [];

  return sectionsParService(ouverts) ?? sectionsParPlage(ouverts, fermes);
}

const CODES_JOURS = {
  lundi: "Mo",
  mardi: "Tu",
  mercredi: "We",
  jeudi: "Th",
  vendredi: "Fr",
  samedi: "Sa",
  dimanche: "Su",
};
const ORDRE_CODES = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

function libelleCodes(codes) {
  const indices = codes
    .map((c) => ORDRE_CODES.indexOf(c))
    .sort((x, y) => x - y);

  const blocs = [];
  for (const i of indices) {
    const dernier = blocs[blocs.length - 1];
    if (dernier && i === dernier[dernier.length - 1] + 1) {
      dernier.push(i);
    } else {
      blocs.push([i]);
    }
  }

  return blocs
    .map((bloc) =>
      bloc.length >= 3
        ? `${ORDRE_CODES[bloc[0]]}-${ORDRE_CODES[bloc[bloc.length - 1]]}`
        : bloc.map((i) => ORDRE_CODES[i]).join(","),
    )
    .join(",");
}

export function horairesSchemaOrg(horaires) {
  const parCreneau = new Map();

  for (const h of horaires) {
    const nom = h.jour
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const code = CODES_JOURS[nom];
    const plage = estFerme(h) ? null : lirePlage(h);
    if (!code || !plage) continue;

    for (const c of plage.creneaux) {
      if (!parCreneau.has(c)) parCreneau.set(c, []);
      parCreneau.get(c).push(code);
    }
  }

  return Array.from(parCreneau, ([c, codes]) => `${libelleCodes(codes)} ${c}`);
}
