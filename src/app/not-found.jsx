import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex flex-col justify-center items-center gap-10 bg-secondary h-[100dvh] min-h-screen text-primary">
      <div className="text-2xl">Page non trouvée</div>
      <Link
        href="/"
        className="hover:bg-[#d4c5b4] px-6 py-4 border-3 hover:border-[#fff] rounded-3xl w-fit font-semibold hover:text-[#fff] text-center tracking-wider"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
}
