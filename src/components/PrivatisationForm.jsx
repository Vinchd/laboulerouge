"use client";

import { useActionState } from "react";
import { sendPrivatisationRequest } from "@/app/privatisation/actions";

const fieldClass =
  "w-full rounded-xl shadow-md border-2 border-primary bg-transparent px-4 py-[clamp(6px,1.3dvh,12px)] text-base text-primary placeholder:text-primary/60 focus:border-tertiary focus:bg-white/10 focus:outline-none duration-300 ease-in";

export default function PrivatisationForm() {
  const [state, formAction, isPending] = useActionState(
    sendPrivatisationRequest,
    { status: "idle" },
  );

  const isSuccess = state.status === "success";

  return (
    <div className="relative p-[clamp(12px,2dvh,24px)] rounded-xl text-primary">
      {isSuccess && (
        <output className="absolute inset-0 flex flex-col justify-center items-center gap-1 px-6 text-center">
          <span className="font-bickhamscript text-[clamp(40px,7dvh,56px)] leading-none">
            Merci !
          </span>
          <span className="text-[clamp(14px,2.2dvh,18px)] text-balance">
            Votre message a bien été envoyé, nous revenons vers vous très vite.
          </span>
        </output>
      )}

      <form
        action={formAction}
        className={`flex flex-col gap-[clamp(6px,1.3dvh,12px)] w-full ${isSuccess ? "invisible **:transition-none" : ""}`}
      >
        <label htmlFor="privatisation-email" className="sr-only">
          Votre email
        </label>
        <input
          id="privatisation-email"
          type="email"
          name="email"
          required
          maxLength={254}
          autoComplete="email"
          placeholder="Votre email"
          defaultValue={state.values?.email}
          className={fieldClass}
        />

        <label htmlFor="privatisation-message" className="sr-only">
          Votre message
        </label>
        <textarea
          id="privatisation-message"
          name="message"
          required
          maxLength={2000}
          placeholder="Votre message"
          defaultValue={state.values?.message}
          className={`${fieldClass} h-[clamp(3.5rem,11dvh,8rem)] resize-none`}
        />

        {/* Champ piège anti-spam, invisible pour les humains */}
        <div
          className="-z-10 absolute opacity-0 pointer-events-none"
          aria-hidden="true"
        >
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        {state.status === "error" && (
          <p role="alert" className="font-semibold text-sm">
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="self-center hover:bg-tertiary disabled:opacity-50 shadow-md mt-1 px-8 py-[clamp(5px,1.1dvh,12px)] border-3 border-primary hover:border-tertiary rounded-2xl font-semibold text-primary hover:text-secondary tracking-wider duration-300 ease-in cursor-pointer disabled:cursor-not-allowed"
        >
          {isPending ? "Envoi…" : "Envoyer"}
        </button>
      </form>
    </div>
  );
}
