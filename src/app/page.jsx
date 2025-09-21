import Image from "next/image";

export default function Home() {
  const jsonLD = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "La Boule rouge",
    image: "https://www.laboulerougeparis.fr/logo-opengraph.png",
    "@id": "https://www.laboulerougeparis.fr/",
    url: "https://www.laboulerougeparis.fr/",
    // telephone: "+33 2 40 82 91 71",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1 rue de la Boule Rouge",
      addressLocality: "Pornic",
      postalCode: "75009",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 48.87327,
      longitude: 2.34459,
    },
    servesCuisine: ["Française"],
    priceRange: "€€",
    openingHours: ["We-Su 19:00-02:00"],
  };

  return (
    <main className="relative bg-primary h-full overflow-hidden">
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
