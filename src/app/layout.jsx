import { Analytics } from "@vercel/analytics/next";
import localFont from "next/font/local";
import NavBar from "@/components/NavBar";
import "./globals.css";

const sackersGothic = localFont({
  variable: "--font-sackersgothic",
  src: [
    {
      path: "./fonts/sackers-gothic/Sackers-Gothic-Light.woff2",
      weight: "300",
    },
    {
      path: "./fonts/sackers-gothic/Sackers-Gothic-Medium.woff2",
      weight: "400",
    },
    {
      path: "./fonts/sackers-gothic/Sackers-Gothic-Heavy.woff2",
      weight: "700",
    },
  ],
  subsets: ["latin"],
});

const bickhamScript = localFont({
  variable: "--font-bickhamscript",
  src: [
    {
      path: "./fonts/bickham-script/BickhamScriptPro-Regular.woff2",
      weight: "400",
    },
    {
      path: "./fonts/bickham-script/BickhamScriptPro-Semibold.woff2",
      weight: "600",
    },
    {
      path: "./fonts/bickham-script/BickhamScriptPro-Bold.woff2",
      weight: "700",
    },
  ],
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL),
  title: "La Boule Rouge",
  description:
    "Freestyle fine cuisine. Curated wines. Bold cocktails. 75009 Paris. Wednesday to Sunday 7PM 2AM.",
  keywords: [
    "restaurant",
    "café",
    "paris",
    "restau",
    "la boule rouge",
    "fait maison",
  ],
  creator: "Vincent Daviaud",
  publisher: "Vincent Daviaud",
  openGraph: {
    title: "La Boule Rouge",
    description:
      "Freestyle fine cuisine. Curated wines. Bold cocktails. 75009 Paris. Wednesday to Sunday 7PM 2AM.",
    url: new URL(process.env.NEXT_PUBLIC_SITE_URL),
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
    twitter: {
      card: "summary_large_image",
      title: "La Boule Rouge",
      description:
        "Freestyle fine cuisine. Curated wines. Bold cocktails. 75009 Paris. Wednesday to Sunday 7PM 2AM.",
      images: ["/logo-opengraph.jpg"],
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className="h-dvh">
      <body
        className={`${sackersGothic.className} ${sackersGothic.variable} ${bickhamScript.variable} antialiased h-dvh bg-secondary text-primary`}
      >
        <NavBar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
