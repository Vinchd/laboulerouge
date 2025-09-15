import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex flex-col justify-center items-center gap-10 bg-primary h-[100dvh] min-h-screen text-2xl">
      <div className="text-secondary">Page non trouvée</div>
      <Link
        href="/"
        className="hover:bg-secondary px-12 py-4 border-3 rounded-3xl w-fit font-semibold text-secondary hover:text-primary text-center tracking-wider"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
}
