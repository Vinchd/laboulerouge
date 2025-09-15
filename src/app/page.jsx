import Image from "next/image";

export default function Home() {
  return (
    <main className="relative bg-[#0D0200] h-full overflow-hidden">
      <Image
        src="/laboulerouge.jpeg"
        alt="Logo la Boule Rouge"
        sizes="(max-width: 500px) 100vw, (max-width: 800px) 100vw, (max-width: 1080px) 100vw, 100vw"
        fill
        priority
        className="top-0 left-0 absolute w-full h-full object-contain"
      />
    </main>
  );
}
