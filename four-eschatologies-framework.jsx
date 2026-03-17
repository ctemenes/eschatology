import { useState } from "react";

const traditions = [
  {
    id: "jewish",
    label: "Jewish",
    color: "#c9a84c",
    glyph: "✡",
    core: "Messianic Fulfilment",
    beliefs: [
      {
        title: "Greater Israel",
        desc: "The land God promised Abraham — from the Nile to the Euphrates. Territorial expansion to reclaim the biblical boundaries of Eretz Yisrael.",
      },
      {
        title: "Third Temple",
        desc: "Rebuilding of the Temple in Jerusalem on the Temple Mount. Requires removal of existing structures (Al-Aqsa). The Temple is the seat of messianic governance.",
      },
      {
        title: "Pax Judaica",
        desc: "A messianic age of universal peace governed from Jerusalem. In the speaker's framing: a one-world government underpinned by AI, surveillance, and centralised control.",
      },
      {
        title: "Ingathering of Exiles",
        desc: "All Jews return to Israel. Capital, technology, and talent flow to Jerusalem as the global centre of power.",
      },
    ],
    geoPredictions: [
      "Israel expands territory (absorbing GCC, parts of Turkey/Egypt)",
      "Al-Aqsa destroyed to make way for Third Temple",
      "Tech giants (Nvidia, Oracle, Microsoft, Google) relocate to Israel",
      "Jerusalem becomes the global seat of governance",
    ],
  },
  {
    id: "christian",
    label: "Christian",
    color: "#b84c4c",
    glyph: "✝",
    core: "Tribulation & Second Coming",
    beliefs: [
      {
        title: "The Antichrist System",
        desc: "A one-world government that appears as peace but is tyrannical. The speaker maps this directly onto Pax Judaica — same structure, different interpretation of who benefits.",
      },
      {
        title: "Mark of the Beast",
        desc: "A system of total control where you cannot buy or sell without compliance. The speaker connects this to AI surveillance, digital ID, and centralised financial systems.",
      },
      {
        title: "The Great Tribulation",
        desc: "A period of unprecedented suffering, war, and persecution before Christ returns. The current wars and civil conflicts are read as this unfolding.",
      },
      {
        title: "Armageddon",
        desc: "A final battle in the Middle East. Nations gather against Israel. Interpreted as the culmination of the Iran/Russia vs Israel confrontation.",
      },
    ],
    geoPredictions: [
      "AI surveillance state established (same as Pax Judaica, different lens)",
      "Global war escalation — US civil conflict, Middle East ground war",
      "Mark of the Beast via digital control systems",
      "Final confrontation between world powers in the Middle East",
    ],
  },
  {
    id: "islamic",
    label: "Islamic",
    color: "#3b8a6e",
    glyph: "☪",
    core: "End of Days & Justice",
    beliefs: [
      {
        title: "Destruction of Al-Aqsa",
        desc: "A major sign of the end times. The third holiest site in Islam being destroyed triggers a unified Muslim response and marks the beginning of the final era.",
      },
      {
        title: "Rise of Persia / Shia Mobilisation",
        desc: "Iran's victory reactivates Persian civilisational identity. The Shia world unites. In some traditions, a righteous force emerges from the East (Khorasan).",
      },
      {
        title: "Great War (Al-Malhama)",
        desc: "A cataclysmic war involving all nations. The speaker frames the current multi-front conflict as the beginning of this prophesied war.",
      },
      {
        title: "Liberation of Jerusalem",
        desc: "Jerusalem is ultimately liberated from oppression. The end-times narrative culminates in justice being restored to the Holy Land.",
      },
    ],
    geoPredictions: [
      "Al-Aqsa destroyed — triggers unified Islamic response",
      "Iran wins the war, becomes regional superpower",
      "GCC collapses, Strait of Hormuz controlled by Iran",
      "Multi-front war draws in Turkey and Saudi Arabia",
    ],
  },
  {
    id: "orthodox",
    label: "Russian Orthodox",
    color: "#4c6eb8",
    glyph: "☦",
    core: "Third Rome Prophecy",
    beliefs: [
      {
        title: "Moscow as Third Rome",
        desc: "After Rome fell and Constantinople fell, Moscow inherits the mantle of Christian civilisation. 'Two Romes have fallen, a third stands, a fourth there shall not be.'",
      },
      {
        title: "Destruction of the West",
        desc: "Europe and NATO represent the degenerate West that must be dismantled for Orthodox civilisation to fulfil its destiny. The Ukraine war serves this purpose.",
      },
      {
        title: "Return of Constantinople",
        desc: "Istanbul (Constantinople) returned to Christendom. Russia backs Greece against Turkey. Only possible once NATO is destroyed.",
      },
      {
        title: "Gog & Magog Coalition",
        desc: "Russia and Persia march together against Israel in the final battle. This is shared with Jewish and Christian traditions but from the Orthodox lens, Russia is fulfilling divine purpose.",
      },
    ],
    geoPredictions: [
      "Russia wins in Ukraine, NATO collapses",
      "Europe economically and militarily destroyed",
      "Greece retakes Constantinople with Russian backing",
      "Russia + Iran form the prophesied coalition against Israel",
    ],
  },
];

const convergencePoints = [
  {
    id: "c1",
    title: "Destruction of Al-Aqsa / Third Temple",
    traditions: ["jewish", "christian", "islamic"],
    colors: ["#c9a84c", "#b84c4c", "#3b8a6e"],
    desc: "Judaism requires it for the Third Temple. Christianity sees it as a tribulation sign. Islam sees it as an end-times trigger. All three agree it happens — they disagree on what it means.",
  },
  {
    id: "c2",
    title: "One-World Government from Jerusalem",
    traditions: ["jewish", "christian"],
    colors: ["#c9a84c", "#b84c4c"],
    desc: "Jewish tradition: messianic peace (Pax Judaica). Christian tradition: the Antichrist system. Same structure, opposite moral valence. Both agree it will be built on surveillance and total control.",
  },
  {
    id: "c3",
    title: "Persia + Russia vs Israel",
    traditions: ["jewish", "christian", "islamic", "orthodox"],
    colors: ["#c9a84c", "#b84c4c", "#3b8a6e", "#4c6eb8"],
    desc: "All four traditions anticipate a coalition led by Persia and Russia marching against Israel. The Gog & Magog prophecy is the single strongest convergence point across all eschatologies.",
  },
  {
    id: "c4",
    title: "Destruction of Europe / NATO",
    traditions: ["orthodox", "christian"],
    colors: ["#4c6eb8", "#b84c4c"],
    desc: "Orthodox eschatology requires the fall of the West for Moscow's Third Rome. Christian eschatology frames it as the collapse of secular civilisation during tribulation. Both agree Europe falls.",
  },
  {
    id: "c5",
    title: "Global War Centred on the Middle East",
    traditions: ["jewish", "christian", "islamic", "orthodox"],
    colors: ["#c9a84c", "#b84c4c", "#3b8a6e", "#4c6eb8"],
    desc: "Armageddon (Christian), Al-Malhama (Islamic), the war of Gog & Magog (Jewish/Orthodox). All four traditions place the final apocalyptic conflict in or around the Middle East.",
  },
  {
    id: "c6",
    title: "Rise of Iran as a Superpower",
    traditions: ["islamic", "orthodox"],
    colors: ["#3b8a6e", "#4c6eb8"],
    desc: "Islamic eschatology needs a powerful Eastern force. Orthodox eschatology needs Persia as an ally for the Gog coalition. Both require Iran to win, industrialise, and project power.",
  },
];

function TraditionCard({ t, isActive, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        border: `2px solid ${isActive ? t.color : t.color + "55"}`,
        background: isActive ? `${t.color}15` : "rgba(16,16,18,0.9)",
        borderRadius: "8px",
        padding: "18px 20px",
        cursor: "pointer",
        transition: "all 0.35s ease",
        boxShadow: isActive ? `0 0 30px ${t.color}22` : "0 2px 8px rgba(0,0,0,0.3)",
        minWidth: "200px",
        flex: "1 1 200px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
        <span style={{ fontSize: "22px" }}>{t.glyph}</span>
        <span
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "18px",
            fontWeight: 700,
            color: isActive ? t.color : "#aaa",
            transition: "color 0.3s",
          }}
        >
          {t.label}
        </span>
      </div>
      <span
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "10px",
          color: t.color,
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          opacity: 0.8,
        }}
      >
        {t.core}
      </span>
    </div>
  );
}

function BeliefDetail({ tradition }) {
  if (!tradition) return null;
  const t = tradition;
  return (
    <div
      style={{
        border: `1px solid ${t.color}44`,
        borderRadius: "8px",
        padding: "28px 30px",
        background: `${t.color}08`,
        animation: "fadeIn 0.3s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
        <span style={{ fontSize: "26px" }}>{t.glyph}</span>
        <div>
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "22px",
              fontWeight: 700,
              color: t.color,
              margin: 0,
            }}
          >
            {t.label} Eschatology
          </h3>
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "11px",
              color: "#777",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            {t.core}
          </span>
        </div>
      </div>

      <div
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "10px",
          color: t.color,
          textTransform: "uppercase",
          letterSpacing: "0.14em",
          marginBottom: "14px",
          fontWeight: 700,
        }}
      >
        Core Beliefs
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "28px" }}>
        {t.beliefs.map((b, i) => (
          <div key={i}>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "16px",
                fontWeight: 700,
                color: "#e0dcd2",
                marginBottom: "4px",
              }}
            >
              {b.title}
            </div>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "14px",
                color: "#999",
                lineHeight: 1.6,
              }}
            >
              {b.desc}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "10px",
          color: t.color,
          textTransform: "uppercase",
          letterSpacing: "0.14em",
          marginBottom: "12px",
          fontWeight: 700,
        }}
      >
        Geopolitical Predictions
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {t.geoPredictions.map((p, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "11px",
                color: t.color,
                marginTop: "2px",
                opacity: 0.6,
              }}
            >
              →
            </span>
            <span
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "14px",
                color: "#bbb",
                lineHeight: 1.5,
              }}
            >
              {p}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function EschatologicalFramework() {
  const [activeTradition, setActiveTradition] = useState(null);
  const [activeConvergence, setActiveConvergence] = useState(null);

  const selectedTradition = traditions.find((t) => t.id === activeTradition);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0c0c0e",
        color: "#e0dcd2",
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        padding: "40px 20px",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "48px", maxWidth: "800px", margin: "0 auto 48px" }}>
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(26px, 5vw, 42px)",
            fontWeight: 800,
            background: "linear-gradient(135deg, #c9a84c, #b84c4c, #3b8a6e, #4c6eb8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            margin: "0 0 12px 0",
            lineHeight: 1.2,
          }}
        >
          The Four Eschatologies
        </h1>
        <p
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "11px",
            color: "#666",
            letterSpacing: "0.08em",
            lineHeight: 1.6,
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          Four religious traditions. Different prophecies. Same predicted outcomes.
          Select a tradition to explore its beliefs, then see where they converge.
        </p>
      </div>

      {/* Tradition selector */}
      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto 32px",
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        {traditions.map((t) => (
          <TraditionCard
            key={t.id}
            t={t}
            isActive={activeTradition === t.id}
            onClick={() =>
              setActiveTradition(activeTradition === t.id ? null : t.id)
            }
          />
        ))}
      </div>

      {/* Belief detail */}
      {selectedTradition && (
        <div style={{ maxWidth: "960px", margin: "0 auto 48px", animation: "fadeIn 0.3s ease" }}>
          <BeliefDetail tradition={selectedTradition} />
        </div>
      )}

      {/* Convergence section */}
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              marginBottom: "8px",
            }}
          >
            <div style={{ width: "60px", height: "1px", background: "#333" }} />
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "24px",
                fontWeight: 700,
                color: "#e0dcd2",
                margin: 0,
              }}
            >
              Points of Convergence
            </h2>
            <div style={{ width: "60px", height: "1px", background: "#333" }} />
          </div>
          <p
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "10px",
              color: "#555",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
            }}
          >
            Where the traditions agree — click to expand
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {convergencePoints.map((cp) => {
            const isOpen = activeConvergence === cp.id;
            return (
              <div
                key={cp.id}
                onClick={() => setActiveConvergence(isOpen ? null : cp.id)}
                style={{
                  border: `1px solid ${isOpen ? "#555" : "#2a2a2c"}`,
                  borderRadius: "6px",
                  padding: "16px 20px",
                  background: isOpen ? "rgba(40,40,42,0.5)" : "rgba(20,20,22,0.8)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "14px", flex: 1 }}>
                    <div style={{ display: "flex", gap: "4px" }}>
                      {cp.colors.map((c, i) => (
                        <div
                          key={i}
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            background: c,
                          }}
                        />
                      ))}
                    </div>
                    <span
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#d4d0c6",
                      }}
                    >
                      {cp.title}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {cp.traditions.map((tid) => {
                      const trad = traditions.find((t) => t.id === tid);
                      return (
                        <span
                          key={tid}
                          style={{
                            fontFamily: "'IBM Plex Mono', monospace",
                            fontSize: "9px",
                            color: trad.color,
                            border: `1px solid ${trad.color}44`,
                            borderRadius: "3px",
                            padding: "2px 7px",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                          }}
                        >
                          {trad.label}
                        </span>
                      );
                    })}
                  </div>
                </div>
                {isOpen && (
                  <div
                    style={{
                      marginTop: "14px",
                      paddingTop: "14px",
                      borderTop: "1px solid #2a2a2c",
                      animation: "fadeIn 0.25s ease",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: "14px",
                        color: "#999",
                        lineHeight: 1.7,
                        margin: 0,
                      }}
                    >
                      {cp.desc}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary */}
      <div
        style={{
          maxWidth: "700px",
          margin: "56px auto 20px",
          textAlign: "center",
          borderTop: "1px solid #222",
          paddingTop: "28px",
        }}
      >
        <p
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "10px",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: "#555",
            marginBottom: "14px",
          }}
        >
          The Framework's Logic
        </p>
        <p
          style={{
            fontSize: "16px",
            lineHeight: 1.7,
            color: "#888",
            fontStyle: "italic",
          }}
        >
          Each tradition tells a different story about why these events happen — but they all agree
          on <em>what</em> happens. The convergence points become the predictions. The disagreements
          are about meaning, not outcome.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            marginTop: "20px",
            flexWrap: "wrap",
          }}
        >
          {traditions.map((t) => (
            <span
              key={t.id}
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "10px",
                color: t.color,
                border: `1px solid ${t.color}33`,
                borderRadius: "4px",
                padding: "4px 10px",
                background: `${t.color}0a`,
              }}
            >
              {t.glyph} {t.label}
            </span>
          ))}
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "10px",
              color: "#666",
              padding: "4px 10px",
            }}
          >
            → Same outcomes, different meanings
          </span>
        </div>
      </div>
    </div>
  );
}
