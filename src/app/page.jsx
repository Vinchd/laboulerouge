import Image from "next/image";
import { fetchHoraires, horairesSchemaOrg } from "@/lib/horaires";

export default async function Home() {
  const horaires = await fetchHoraires();

  const jsonLD = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "La Boule rouge",
    image: `${new URL(process.env.NEXT_PUBLIC_SITE_URL)}logo-opengraph.jpg`,
    "@id": new URL(process.env.NEXT_PUBLIC_SITE_URL),
    url: new URL(process.env.NEXT_PUBLIC_SITE_URL),
    telephone: "+33 1 86 04 81 29",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1 rue de la Boule Rouge",
      addressLocality: "Paris",
      postalCode: "75009",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 48.87359,
      longitude: 2.34461,
    },
    servesCuisine: ["Française"],
    priceRange: "€€",
    openingHours:
      horaires.length > 0 ? horairesSchemaOrg(horaires) : ["Tu-Sa 19:00-02:00"],
  };

  return (
    <main className="relative bg-[#010101] h-full overflow-hidden">
      <Image
        src="/laboulerouge-plat.webp"
        alt="plat restauration"
        sizes="100vw"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <div className="relative w-[min(70vw,260px)] max-sm:w-[min(70vw,120px)] h-[min(45dvh,460px)]">
          <Image
            src="/laboulerouge-logo-blanc.png"
            alt="Logo la Boule Rouge"
            sizes="(max-width: 640px) 70vw, 260px"
            fill
            priority
            className="object-contain"
          />
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      />
    </main>
  );
}
