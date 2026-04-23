export function Bola({ numero, cor, cor2, glow, delay }) {
  const label = String(numero).padStart(2, "0");
  return (
    <div
      style={{
        width: 52,
        height: 52,
        borderRadius: "50%",
        background: `radial-gradient(circle at 36% 34%, ${cor2}, ${cor} 72%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Oswald', sans-serif",
        fontWeight: 700,
        fontSize: 20,
        color: "#fff",
        boxShadow: `${glow}, inset 0 2px 6px rgba(255,255,255,0.22)`,
        animation: `popIn 0.4s ease both`,
        animationDelay: delay,
        userSelect: "none",
        flexShrink: 0,
      }}
    >
      {label}
    </div>
  );
}
