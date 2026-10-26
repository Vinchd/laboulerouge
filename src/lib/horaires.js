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

function formatHeure(valeur, zeroValide = false) {
  const [h, m = "00"] = (valeur ?? "").trim().split(":");
  if (!h) return "";

  const heures = Number(h);
  const minutes = Number(m);
  if (heures === 0 && minutes === 0) return zeroValide ? "00h" : "";

  const mm = minutes === 0 ? "" : String(minutes).padStart(2, "0");
  return `${heures}h${mm}`;
}

function lirePlage({ ouvMidi, fermMidi, ouvSoir, fermSoir }) {
  const a = formatHeure(ouvMidi);
  const b = formatHeure(fermMidi);
  const c = formatHeure(ouvSoir);
  const d = formatHeure(fermSoir, true);

  if (a && b && c && d) {
    const dej = `${a}-${b}`;
    const din = `${c}-${d}`;
    return { type: "separe", dej, din, plage: `${dej} / ${din}` };
  }

  if (a && !b && d) {
    return { type: "continu", dej: null, din: null, plage: `${a}-${d}` };
  }

  if (a && b && !c) {
    const dej = `${a}-${b}`;
    return { type: "midi", dej, din: null, plage: dej };
  }

  if (!a && !b && c && d) {
    const din = `${c}-${d}`;
    return { type: "soir", dej: null, din, plage: din };
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
    const ferme = ["TRUE", "VRAI"].includes(h.ferme?.toUpperCase());
    const plage = ferme ? null : lirePlage(h);
    return { jour: h.jour, index, ...plage };
  });

  const ouverts = jours.filter((j) => j.type);
  const fermes = jours.filter((j) => !j.type);

  if (jours.length === 0) return [];

  return sectionsParService(ouverts) ?? sectionsParPlage(ouverts, fermes);
}
