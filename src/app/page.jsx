import Image from "next/image";

export default function Home() {
  const jsonLD = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "La Boule rouge",
    image: "https://www.laboulerougeparis.fr/logo-opengraph.jpg",
    "@id": "https://www.laboulerougeparis.fr/",
    url: "https://www.laboulerougeparis.fr/",
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
    openingHours: ["We-Su 19:00-02:00"],
  };

  return (
    <main className="relative bg-[#010101] h-full overflow-hidden">
      <Image
        src="/laboulerouge.jpeg"
        alt="Logo la Boule Rouge"
        sizes="(max-width: 500px) 100vw, (max-width: 800px) 100vw, (max-width: 1080px) 100vw, 100vw"
        fill
        priority
        className="top-0 left-0 absolute w-full h-full object-contain"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      />
    </main>
  );
}
