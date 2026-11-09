export default function PrivatisationEmail({ email, message }) {
  return (
    <div
      style={{
        fontFamily: "Arial, Helvetica, sans-serif",
        color: "#222",
        lineHeight: 1.5,
      }}
    >
      <h1 style={{ fontSize: "20px", margin: "0 0 16px" }}>
        Demande de privatisation / groupe
      </h1>
      <p style={{ margin: "0 0 16px" }}>
        <strong>De :</strong> <a href={`mailto:${email}`}>{email}</a>
      </p>
      <p style={{ margin: 0, whiteSpace: "pre-wrap" }}>{message}</p>
    </div>
  );
}
