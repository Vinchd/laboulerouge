import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex flex-col justify-center items-center gap-10 bg-secondary h-[100dvh] min-h-screen text-primary">
      <div className="text-2xl">Page non trouvée</div>
      <Link
        href="/"
        className="hover:bg-tertiary disabled:opacity-50 shadow-md mt-1 px-8 py-[clamp(5px,1.1dvh,12px)] border-3 border-primary hover:border-tertiary rounded-2xl font-semibold text-primary hover:text-secondary tracking-wider duration-300 ease-in cursor-pointer disabled:cursor-not-allowed"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
}
