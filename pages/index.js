import { LotteryController } from "../controllers/LotteryController.js";
import { CardSorteio } from "../views/CardSorteio.js";

export default function Home({ lotofacil, lotomania, geradoEm, fonte }) {
  return (
    <>
      <style>{`
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
              CAIXA
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

          {geradoEm && (
            <div
              suppressHydrationWarning
              style={{
                marginTop: 8,
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                color: "rgba(255,255,255,0.2)",
              }}
            >
              última busca: {geradoEm}
            </div>
          )}
        </div>

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

export async function getStaticProps() {
  let fonte = "api";

  const { lotofacil, lotomania } = await LotteryController.fetchAllResults();

  const geradoEm = LotteryController.formatarData(new Date());

  if (lotofacil && lotomania) {
    LotteryController.saveCache(lotofacil, lotomania);
    console.log("[ISR] Dados atualizados da API");
  } else {
    console.log("[ISR] API falhou, lendo do cache...");
    const cache = LotteryController.getCache();

    if (cache) {
      fonte = "cache";
      return {
        props: {
          lotofacil: cache.lotofacil || null,
          lotomania: cache.lotomania || null,
          geradoEm,
          fonte,
        },
        revalidate: 21600,
      };
    }

    console.error("[ISR] Cache também não disponível");
  }

  return {
    props: {
      lotofacil: lotofacil?.toJSON() || null,
      lotomania: lotomania?.toJSON() || null,
      geradoEm,
      fonte,
    },
    revalidate: 21600,
  };
}
