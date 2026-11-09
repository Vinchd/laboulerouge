"use server";

import { Resend } from "resend";
import PrivatisationEmail from "@/components/PrivatisationEmail";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 2000;

export async function sendPrivatisationRequest(_prevState, formData) {
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const honeypot = String(formData.get("website") ?? "");

  // Champ piège : un humain ne le remplit jamais. On répond "succès" aux bots
  // sans rien envoyer.
  if (honeypot) {
    return { status: "success" };
  }

  if (!EMAIL_REGEX.test(email) || email.length > MAX_EMAIL_LENGTH) {
    return {
      status: "error",
      error: "Merci de saisir une adresse email valide.",
      values: { email, message },
    };
  }

  if (!message) {
    return {
      status: "error",
      error: "Merci de saisir votre message.",
      values: { email, message },
    };
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return {
      status: "error",
      error: `Votre message est trop long (${MAX_MESSAGE_LENGTH} caractères maximum).`,
      values: { email, message },
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.PRIVATISATION_TO_EMAIL;
  const from = process.env.PRIVATISATION_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.error(
      "[privatisation] Variables manquantes : RESEND_API_KEY, PRIVATISATION_TO_EMAIL, PRIVATISATION_FROM_EMAIL",
    );
    return {
      status: "error",
      error:
        "L'envoi est momentanément indisponible. Merci de réessayer plus tard.",
      values: { email, message },
    };
  }

  try {
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `Demande de privatisation / groupe - ${email}`,
      react: PrivatisationEmail({ email, message }),
      text: `De : ${email}\n\n${message}`,
    });

    if (error) {
      throw new Error(`Resend : ${error.name} - ${error.message}`);
    }

    return { status: "success" };
  } catch (error) {
    console.error("[privatisation] Erreur d'envoi", error);
    return {
      status: "error",
      error: "Une erreur est survenue. Merci de réessayer dans un instant.",
      values: { email, message },
    };
  }
}
