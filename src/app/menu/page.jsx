import Papa from "papaparse";

export const metadata = {
  title: "Menu - La Boule Rouge",
  description: "Découvrez le menu de la Boule Rouge.",
  openGraph: {
    title: "Menu - La Boule Rouge",
    description: "Parcourez le menu de la Boule Rouge.",
    url: `${new URL(process.env.NEXT_PUBLIC_SITE_URL)}/menu`,
    siteName: "La Boule Rouge",
    images: [
      {
        url: "/logo-opengraph.jpg",
        width: 267,
        height: 200,
        alt: "Logo La Boule Rouge",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
};

async function getMenu() {
  const res = await fetch(process.env.GOOGLE_SHEET_URL, {
    next: { revalidate: 600 },
  });

  const csv = await res.text();
  const parsed = Papa.parse(csv, { header: true }).data;

  const menuPrincipal = parsed.reduce((acc, { Id, Catégorie, Nom, Prix }) => {
    if (!Catégorie || !Nom) return acc;

    if (Catégorie === "Plat" || Catégorie === "Dessert") {
      if (!acc[Catégorie]) acc[Catégorie] = [];
      acc[Catégorie].push({
        id: Id,
        nom: Nom,
        prix: Prix?.replace(/,00$/, ""),
      });
    }

    return acc;
  }, {});

  return menuPrincipal;
}

export default async function page() {
  const menuPrincipal = await getMenu();

  const jsonLD = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Le Café du Château",
    url: `${new URL(process.env.NEXT_PUBLIC_SITE_URL)}/menu`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "1 rue de la Boule Rouge",
      addressLocality: "Paris",
      postalCode: "75009",
      addressCountry: "FR",
    },
    hasMenu: {
      "@type": "Menu",
      name: "Menu",
      hasMenuSection: Object.entries(menuPrincipal).map(
        ([category, items]) => ({
          "@type": "MenuSection",
          name: category,
          hasMenuItem: items.map((item) => ({
            "@type": "MenuItem",
            name: item.nom,
            offers: {
              "@type": "Offer",
              price: item.prix,
              priceCurrency: "EUR",
            },
          })),
        }),
      ),
    },
  };

  return (
    <main className="relative flex flex-col bg-secondary pt-20 max-sm:pt-18 pb-12 h-full text-primary">
      <section className="overflow-y-auto cursor-default scrollbar-hide">
        <div className="flex flex-col items-center mx-auto max-w-3xl">
          <div className="mb-24">
            <h1 className="mb-8 px-14 font-bickhamscript max-sm:text-[clamp(64px,2vw,92px)] text-8xl text-center">
              Menu
            </h1>
            {Object.entries(menuPrincipal).map(
              ([category, items], idx, arr) => (
                  <ul key={category} className="flex flex-col items-center gap-6 mx-6 mb-6">
                    {items.map((item) => (
                      <li
                        key={item.id}
                        className="items-center gap-x-4 grid grid-cols-[1fr_auto] my-1 w-full max-w-lg"
                      >
                        <p className="justify-self-center max-sm:text-[clamp(8px,3vw,16px)] text-center text-balance tracking-wide">
                          {item.nom}
                        </p>
                        <p className="font-bickhamscript max-sm:text-[26px] text-4xl whitespace-nowrap">
                          {item.prix}€
                        </p>
                      </li>
                    ))}

                    {idx < arr.length - 1 && (
                      <hr className="my-8 border-primary border-t w-30" />
                    )}
                  </ul>
                
              ),
            )}
          </div>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      />
    </main>
  );
}