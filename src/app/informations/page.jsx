import { FaInstagram } from "react-icons/fa";

export default function page() {
  return (
    <main className="flex flex-col justify-center items-center py-12 w-full min-h-full overflow-y-auto text-center scrollbar-hide">
      <h1 className="mb-12 text-4xl">Horaires d'ouverture</h1>
      <p className="font-bickhamscript text-4xl">Mercredi au Dimanche 19h-2h</p>
      <a
        href="tel:+33670814574"
        className="mt-8 font-bickhamscript text-4xl hover:scale-105 duration-300 ease-in"
      >
        06 70 81 45 74
      </a>
      <a
        href="https://maps.app.goo.gl/MA4Dr2Psv33UdBrP6"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="mt-6 mb-6 font-bickhamscript text-4xl hover:scale-105 transition duration-300 ease-in"
      >
        <p>1 rue de la Boule Rouge</p>
        <p>Paris 09</p>
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
