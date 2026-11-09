import Image from "next/image";
import PrivatisationForm from "@/components/PrivatisationForm";

export const metadata = {
  title: "Privatisation / Groupe - La Boule Rouge",
  description:
    "Privatisez La Boule Rouge pour vos évènements et repas de groupe à partir de 10 personnes.",
};

export default function PrivatisationPage() {
  return (
    <main className="flex flex-col items-center gap-[clamp(8px,2dvh,20px)] px-4 pt-[clamp(52px,8dvh,88px)] pb-[clamp(12px,3dvh,32px)] h-full overflow-y-auto text-center cursor-default scrollbar-hide">
      <h1 className="font-bickhamscript text-[clamp(40px,min(10dvh,16vw),96px)] text-balance leading-none">
        <span className="whitespace-nowrap">Privatisation /</span>{" "}
        <span className="block sm:inline"> Groupe</span>
      </h1>

      <div className="relative flex-1 shadow-lg rounded-xl w-full max-w-3xl min-h-[12dvh] overflow-hidden basis-0">
        <Image
          src="/laboulerouge-salle.jpeg"
          alt="Salle du restaurant La Boule Rouge : tables dressées, bougies et étagères en laiton sur des murs sombres"
          sizes="(min-width: 768px) 768px, 100vw"
          fill
          priority
          className="object-[50%_60%] object-cover"
        />
      </div>

      <div className="w-full max-w-xl">
        <p className="mb-[clamp(8px,2dvh,12px)] text-[clamp(14px,min(2.2dvh,4vw),18px)] text-balance">
          Pour toute demande de 10 personnes et plus, merci de nous écrire
          directement <span className="whitespace-nowrap">ci-dessous</span>.
        </p>
        <PrivatisationForm />
      </div>
    </main>
  );
}
