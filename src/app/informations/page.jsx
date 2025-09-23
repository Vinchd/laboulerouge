import { FaInstagram } from "react-icons/fa";

export default function page() {
  return (
    <main className="flex flex-col justify-center items-center w-full h-full text-center">
      <h1 className="mb-16 text-4xl">Horaires d'ouverture</h1>
      <p className="font-bickhamscript text-4xl">Mercredi au Dimanche 19h-2h</p>
      <a
        href="https://maps.app.goo.gl/WSRsrLp6tz1jN86u8"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="mt-8 mb-6 hover:scale-105 transition duration-300 ease-in"
      >
        <div className="font-bickhamscript text-4xl">
          <p>1 rue de la Boule Rouge</p>
          <p>Paris 09</p>
        </div>
      </a>
      <a
        href="https://www.instagram.com/laboulerougeparis/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="hover:scale-105 transition duration-300 ease-in"
      >
        <FaInstagram className="w-9 h-9" />
      </a>
    </main>
  );
}
