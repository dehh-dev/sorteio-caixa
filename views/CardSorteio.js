import { Bola } from "./Bola.js";

const CORES = {
  lotofacil: {
    bola: "#9B30FF",
    bola2: "#C77DFF",
    border: "rgba(155,48,255,0.45)",
    glow: "0 0 18px 4px rgba(155,48,255,0.35)",
    badge: "#9B30FF",
  },
  lotomania: {
    bola: "#FF6B00",
    bola2: "#FFA040",
    border: "rgba(255,107,0,0.45)",
    glow: "0 0 18px 4px rgba(255,107,0,0.35)",
    badge: "#FF6B00",
  },
};

export function CardSorteio({ tipo, dados }) {
  const c = CORES[tipo];
  const titulo = tipo === "lotofacil" ? "Lotofácil" : "Lotomania";
  const icone = tipo === "lotofacil" ? "🍀" : "🎲";

  if (!dados) {
    return (
      <div
        style={{
          background: "rgba(18,18,28,0.85)",
          border: `1.5px solid ${c.border}`,
          borderRadius: 20,
          padding: "32px 36px",
          width: "100%",
          maxWidth: 640,
          textAlign: "center",
          color: "rgba(255,255,255,0.3)",
          fontFamily: "'DM Mono', monospace",
          fontSize: 13,
        }}
      >
        {icone} {titulo} — sem sorteio disponível
      </div>
    );
  }

  return (
    <div
      style={{
        background: "rgba(18,18,28,0.85)",
        border: `1.5px solid ${c.border}`,
        borderRadius: 20,
        padding: "32px 36px 28px",
        boxShadow: `0 8px 48px rgba(0,0,0,0.5), ${c.glow}`,
        backdropFilter: "blur(16px)",
        width: "100%",
        maxWidth: 640,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 32 }}>{icone}</span>
          <div>
            <div
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: 26,
                fontWeight: 700,
                color: "#fff",
                letterSpacing: 1,
              }}
            >
              {titulo}
            </div>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 13,
                color: "rgba(255,255,255,0.45)",
                marginTop: 1,
              }}
            >
              Concurso #{dados.concurso}
            </div>
          </div>
        </div>
        <div
          style={{
            background: c.badge,
            borderRadius: 8,
            padding: "5px 13px",
            fontFamily: "'DM Mono', monospace",
            fontSize: 12,
            color: "#fff",
            letterSpacing: 1,
            opacity: 0.92,
          }}
        >
          {dados.data}
        </div>
      </div>

      <div
        style={{
          height: 1,
          background: c.border,
          marginBottom: 24,
          opacity: 0.5,
        }}
      />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          justifyContent: "center",
        }}
      >
        {dados.numeros.map((n, i) => (
          <Bola
            key={`${n}-${i}`}
            numero={n}
            cor={c.bola}
            cor2={c.bola2}
            glow={c.glow}
            delay={`${i * 60}ms`}
          />
        ))}
      </div>

      <div
        style={{
          marginTop: 22,
          fontFamily: "'DM Mono', monospace",
          fontSize: 12,
          color: "rgba(255,255,255,0.3)",
          textAlign: "center",
        }}
      >
        {dados.numeros.length} números sorteados
      </div>
    </div>
  );
}
