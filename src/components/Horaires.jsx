import { fetchHoraires, grouperHoraires } from "@/lib/horaires";

export default async function Horaires() {
  const horaires = await fetchHoraires();
  const sections = grouperHoraires(horaires);

  if (sections.length === 0) {
    return <p>Mardi au Samedi 19h-2h</p>;
  }

  return sections.map(({ titre, lignes }) => (
    <div key={titre ?? "horaires"} className="not-first:mt-10">
      {titre && (
        <h2 className="mb-1 font-bickhamscript font-bold text-5xl">{titre}</h2>
      )}
      {lignes.map(({ jours, plage }) => (
        <p key={jours}>
          {jours} {plage ? <strong>{plage}</strong> : "fermé"}
        </p>
      ))}
    </div>
  ));
}
