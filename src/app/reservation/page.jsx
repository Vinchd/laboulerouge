"use client";

import { useEffect, useState } from "react";

export default function ReservationPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const iframe = document.getElementById("zenchef-iframe");
    if (iframe) {
      iframe.addEventListener("load", () => setIsLoaded(true));
    }
  }, []);

  return (
    <main className="flex flex-col justify-center items-center py-24 min-h-screen">
      <div className="px-4 w-full max-w-2xl">
        <h1 className="mx-12 mb-12 text-4xl text-center">Réserver une table</h1>
        <div className="relative bg-[#242625] shadow-lg rounded-2xl overflow-hidden">
          {!isLoaded && (
            <div className="absolute inset-0 flex flex-col justify-center items-center animate-pulse">
              <div className="bg-gray-300 mb-6 rounded w-2/3 h-8"></div>
              <div className="bg-gray-300 mb-4 rounded w-1/2 h-6"></div>
              <div className="bg-gray-300 rounded w-1/3 h-6"></div>
            </div>
          )}
          <iframe
            id="zenchef-iframe"
            src="https://bookings.zenchef.com/results?rid=378734&pid=1001&fullscreen=true"
            title="Réservation Zenchef"
            loading="lazy"
            className={`${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-700 w-full p-4 h-[500px]`}
          />
        </div>
      </div>
    </main>
  );
}
