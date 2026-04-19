// pages/index.js
//
// Sistema com fallback:
// 1. Tenta buscar da API da Caixa
// 2. Se funcionar → salva em data/resultados.json
// 3. Se falhar → lê do arquivo JSON (último resultado conhecido)

import { useState, useEffect } from "react";

// ---------------------------------------------------------------------------
// Componente: Bola
// ---------------------------------------------------------------------------
function Bola({ numero, cor, cor2, glow, delay }) {
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

// ---------------------------------------------------------------------------
// Cores por jogo
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// Componente: Card do Sorteio
// ---------------------------------------------------------------------------
function CardSorteio({ tipo, dados }) {
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
      {/* Cabeçalho */}
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

      {/* Divisor */}
      <div
        style={{
          height: 1,
          background: c.border,
          marginBottom: 24,
          opacity: 0.5,
        }}
      />

      {/* Bolas */}
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

      {/* Rodapé */}
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

// ---------------------------------------------------------------------------
// Página principal
// ---------------------------------------------------------------------------
export default function Home({ lotofacil, lotomania, geradoEm, fonte }) {
  const [tempoAtual, setTempoAtual] = useState("");

  useEffect(() => {
    if (geradoEm) {
      const d = new Date(geradoEm);
      setTempoAtual(d.toLocaleString("pt-BR"));
    }
  }, [geradoEm]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=DM+Mono:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #0a0a14;
          min-height: 100vh;
          overflow-x: hidden;
        }

        @keyframes popIn {
          0%   { opacity: 0; transform: scale(0.5) rotate(-10deg); }
          70%  { transform: scale(1.1) rotate(3deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }

        @keyframes floatUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 1; }
        }
      `}</style>

      {/* Fundo com gradiente */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: `radial-gradient(ellipse 70% 50% at 20% 20%, rgba(155,48,255,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(255,107,0,0.10) 0%, transparent 60%), linear-gradient(180deg, #0a0a14 0%, #0d0d1a 100%)`,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: `radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Conteúdo */}
      <main
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "60px 20px 80px",
          animation: "floatUp 0.7s ease both",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 12,
              color: "rgba(255,255,255,0.35)",
              letterSpacing: 4,
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Resultado do dia
          </div>
          <h1
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: "clamp(36px, 6vw, 64px)",
              fontWeight: 700,
              color: "#fff",
              letterSpacing: 2,
              lineHeight: 1.1,
            }}
          >
            SORTEIOS DA{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #9B30FF, #FF6B00)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              SORTE
            </span>
          </h1>

          <div
            style={{
              marginTop: 16,
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 20,
              padding: "5px 14px",
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: fonte === "api" ? "#4ade80" : "#fbbf24",
                animation: "pulse 1.5s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                color: "rgba(255,255,255,0.5)",
                letterSpacing: 1,
              }}
            >
              {fonte === "api"
                ? "ATUALIZADO AUTOMATICAMENTE"
                : "CACHE (API OFFLINE)"}
            </span>
          </div>

          {tempoAtual && (
            <div
              style={{
                marginTop: 8,
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                color: "rgba(255,255,255,0.2)",
              }}
            >
              última busca: {tempoAtual}
            </div>
          )}
        </div>

        {/* Cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 32,
            width: "100%",
            maxWidth: 680,
            alignItems: "center",
          }}
        >
          <CardSorteio tipo="lotofacil" dados={lotofacil} />
          <CardSorteio tipo="lotomania" dados={lotomania} />
        </div>

        <div
          style={{
            marginTop: 60,
            fontFamily: "'DM Mono', monospace",
            fontSize: 11,
            color: "rgba(255,255,255,0.15)",
            letterSpacing: 2,
            textAlign: "center",
          }}
        >
          DADOS VIA API CAIXA ECONÔMICA FEDERAL
        </div>
      </main>
    </>
  );
}

// ---------------------------------------------------------------------------
// getStaticProps com cache local em JSON
// ---------------------------------------------------------------------------

import fs from "fs";
import path from "path";

const CACHE_FILE = path.join(process.cwd(), "data", "resultados.json");

// Garante que o diretório data/ existe
function garantirDiretorio() {
  const dir = path.dirname(CACHE_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Lê o cache local
function lerCache() {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const conteudo = fs.readFileSync(CACHE_FILE, "utf-8");
      return JSON.parse(conteudo);
    }
  } catch (err) {
    console.error("[CACHE] Erro ao ler cache:", err.message);
  }
  return null;
}

// Salva resultados no cache
function salvarCache(dados) {
  try {
    garantirDiretorio();
    fs.writeFileSync(CACHE_FILE, JSON.stringify(dados, null, 2), "utf-8");
    console.log("[CACHE] Resultados salvos com sucesso");
  } catch (err) {
    console.error("[CACHE] Erro ao salvar cache:", err.message);
  }
}

// Busca resultado da API da Caixa
async function buscarResultado(jogo) {
  try {
    const url = `https://servicebus2.caixa.gov.br/portaldeloterias/api/${jogo}`;
    const res = await fetch(url, {
      headers: {
        Referer: "https://loterias.caixa.gov.br/",
        "User-Agent": "Mozilla/5.0",
      },
    });

    if (!res.ok) {
      console.error(`[API] ${jogo} retornou status ${res.status}`);
      return null;
    }

    const json = await res.json();
    const numeros = (json.listaDezenas || []).map((n) => parseInt(n, 10));

    return {
      data: json.dataApuracao || "",
      concurso: json.numero || 0,
      numeros,
    };
  } catch (err) {
    console.error(`[API] Erro ao buscar ${jogo}:`, err.message);
    return null;
  }
}

export async function getStaticProps() {
  let fonte = "api"; // Identifica se os dados vieram da API ou do cache

  // Tenta buscar da API
  const [lotofacil, lotomania] = await Promise.all([
    buscarResultado("lotofacil"),
    buscarResultado("lotomania"),
  ]);

  // Se conseguiu buscar ambos, salva no cache
  if (lotofacil && lotomania) {
    salvarCache({ lotofacil, lotomania });
    console.log("[ISR] Dados atualizados da API");
  } else {
    // Se algum falhou, tenta ler do cache
    console.log("[ISR] API falhou, lendo do cache...");
    const cache = lerCache();

    if (cache) {
      fonte = "cache";
      return {
        props: {
          lotofacil: cache.lotofacil || null,
          lotomania: cache.lotomania || null,
          geradoEm: new Date().toISOString(),
          fonte,
        },
        revalidate: 21600, // 6 horas
      };
    }

    console.error("[ISR] Cache também não disponível");
  }

  return {
    props: {
      lotofacil: lotofacil || null,
      lotomania: lotomania || null,
      geradoEm: new Date().toISOString(),
      fonte,
    },
    revalidate: 21600,
  };
}
