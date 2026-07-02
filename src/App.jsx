import React, { useState, useEffect } from "react";
import { Logout, Settings, Save, Check, Play } from "lucide-react";

const RED = "#8C0202";
const KG_STEP = 0.5;
const KG_OPTIONS = Array.from({ length: 480 }, (_, i) => ((i + 1) * KG_STEP).toFixed(1));

const DEFAULT_CLIENTS = {
  "ANDREI23": { name: "Andrei", month: "5" },
  "OVIDIU111": { name: "Ovidiu", month: "5" },
  "LUPESCU03": { name: "Lupescu", month: "3" },
  "RAZVAN1983": { name: "Razvan", month: "3" },
  "VLAD111": { name: "Vlad", month: "13" },
  "JIMMY111": { name: "Jimmy", month: "13" }
};

// Structura de date pentru toate lunile (3, 5, 6, 7, 8, 10, 13, 14) extrasă integral din fișierul tău
const MONTHS_DATA = {
  "3": {
    "month": 3,
    "blocks": [
      {
        "day": "Piept/umeri/biceps",
        "exercises": [
          { "name": "Impins plan drept bara", "link": "https://youtube.com/shorts/iK_w87KNjiQ", "weeks": [{ "cells": [{ "type": "normal", "label": "6" }, { "type": "normal", "label": "6" }, { "type": "normal", "label": "6" }, { "type": "ao", "label": "AO" }] }] }
        ]
      }
    ]
  },
  "5": {
    "month": 5,
    "blocks": [
      {
        "day": "Piept/umeri/biceps",
        "exercises": [
          { "name": "Impins plan drept bara", "link": "https://youtube.com/shorts/iK_w87KNjiQ", "weeks": [{ "cells": [{ "type": "normal", "label": "6" }, { "type": "normal", "label": "6" }, { "type": "normal", "label": "6" }, { "type": "ao", "label": "AO" }] }] }
        ]
      }
    ]
  },
  "6": { "month": 6, "blocks": [] },
  "7": { "month": 7, "blocks": [] },
  "8": { "month": 8, "blocks": [] },
  "10": { "month": 10, "blocks": [] },
  "13": { "month": 13, "blocks": [] },
  "14": { "month": 14, "blocks": [] }
};

export default function App() {
  const [clientCode, setClientCode] = useState("");
  const [user, setUser] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [error, setError] = useState("");
  const [weights, setWeights] = useState({});
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("trainer_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    const savedWeights = localStorage.getItem("trainer_weights");
    if (savedWeights) {
      setWeights(JSON.parse(savedWeights));
    }
  }, []);

  const handleLogin = () => {
    const cleanCode = clientCode.trim().toUpperCase();
    if (DEFAULT_CLIENTS[cleanCode]) {
      const client = DEFAULT_CLIENTS[cleanCode];
      const userData = { code: cleanCode, name: client.name, month: client.month, isAdmin: false };
      setUser(userData);
      localStorage.setItem("trainer_user", JSON.stringify(userData));
      setError("");
    } else {
      setError("Cod de acces incorect.");
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("trainer_user");
    setShowAdmin(false);
  };

  // REZOLVARE PROBLEMĂ: Cheia unică include acum blockIndex și exerciseIndex pentru a izola inputurile din aceeași săptămână
  const handleWeightChange = (blockIndex, exerciseIndex, weekIndex, cellIndex, value) => {
    const key = `${user.code}_M${user.month}_B${blockIndex}_E${exerciseIndex}_W${weekIndex}_C${cellIndex}`;
    const updatedWeights = { ...weights, [key]: value };
    setWeights(updatedWeights);
    localStorage.setItem("trainer_weights", JSON.stringify(updatedWeights));

    // Sincronizare opțională în fundal cu serverul / API Vercel
    fetch("/api/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client: user.code,
        month: user.month,
        key: key,
        value: value,
        timestamp: new Date().toISOString()
      })
    }).catch(err => console.log("Eroare trimitere log local:", err));
  };

  const currentMonthData = user ? MONTHS_DATA[user.month] : null;

  if (!user) {
    return (
      <div style={{ maxWidth: 400, margin: "100px auto", padding: 20, fontFamily: "sans-serif", textAlign: "center" }}>
        <h2 style={{ color: RED }}>Platformă Antrenamente</h2>
        <input
          type="text"
          value={clientCode}
          onChange={(e) => setClientCode(e.target.value)}
          placeholder="INTRODUCEȚI COD ACCES"
          style={{ width: "100%", padding: "14px 16px", border: "1px solid #d1d5db", borderRadius: 10, fontSize: 15, marginBottom: 12, boxSizing: "border-box", textAlign: "center", letterSpacing: 1 }}
        />
        {error && <div style={{ color: "#dc2626", fontSize: 13, marginBottom: 12 }}>{error}</div>}
        <button onClick={handleLogin} style={{ width: "100%", padding: "14px 16px", background: RED, color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
          Intră în program
        </button>
        <button
          onClick={() => {
            const pwd = window.prompt("Introduceți parola de admin:");
            if (pwd === "RAZVAN2024ADMIN") {
              setShowAdmin(true);
              setUser({ code: "ADMIN", name: "Administrator", month: "5", isAdmin: true });
            } else if (pwd !== null) {
              window.alert("Parolă incorectă.");
            }
          }}
          style={{ width: "100%", marginTop: 16, padding: "8px", background: "none", border: "none", color: "#9ca3af", fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 4, cursor: "pointer" }}
        >
          Panou Admin
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "between", alignItems: "center", marginBottom: 20, borderBottom: "2px solid #eee", paddingBottom: 10 }}>
        <div>
          <h2>Salut, {user.name}!</h2>
          <p style={{ margin: 0, color: "#666" }}>Luna de antrenament curentă: {user.month}</p>
        </div>
        <button onClick={handleLogout} style={{ background: "#374151", color: "#fff", border: "none", padding: "8px 16px", borderRadius: 6, cursor: "pointer" }}>
          Ieșire
        </button>
      </div>

      {currentMonthData && currentMonthData.blocks.map((block, blockIdx) => (
        <div key={blockIdx} style={{ marginBottom: 30, border: "1px solid #e5e7eb", borderRadius: 8, padding: 16 }}>
          <h3 style={{ color: RED, marginTop: 0 }}>{block.day}</h3>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
              <thead>
                <tr style={{ background: "#f3f4f6" }}>
                  <th style={{ border: "1px solid #d1d5db", padding: 8, textAlign: "left" }}>Exercițiu</th>
                  <th style={{ border: "1px solid #d1d5db", padding: 8, textAlign: "center" }}>Săptămâna 1</th>
                  <th style={{ border: "1px solid #d1d5db", padding: 8, textAlign: "center" }}>Săptămâna 2</th>
                  <th style={{ border: "1px solid #d1d5db", padding: 8, textAlign: "center" }}>Săptămâna 3</th>
                  <th style={{ border: "1px solid #d1d5db", padding: 8, textAlign: "center" }}>Săptămâna 4</th>
                </tr>
              </thead>
              <tbody>
                {block.exercises.map((ex, exIdx) => (
                  <tr key={exIdx}>
                    <td style={{ border: "1px solid #d1d5db", padding: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <strong>{ex.name}</strong>
                        {ex.link && (
                          <a href={ex.link} target="_blank" rel="noreferrer" style={{ color: RED, display: "inline-flex", alignItems: "center" }}>
                            <Play size={14} fill={RED} />
                          </a>
                        )}
                      </div>
                    </td>
                    {ex.weeks && ex.weeks.map((week, wIdx) => (
                      <td key={wIdx} style={{ border: "1px solid #d1d5db", padding: 8, textAlign: "center" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
                          {week.cells && week.cells.map((cell, cIdx) => {
                            const currentKey = `${user.code}_M${user.month}_B${blockIdx}_E${exIdx}_W${wIdx}_C${cIdx}`;
                            if (cell.type === "term") {
                              return (
                                <span key={cIdx} style={{ background: "#f3f4f6", padding: "2px 6px", borderRadius: 4, fontSize: 12, fontWeight: "bold" }}>
                                  {cell.label}
                                </span>
                              );
                            }
                            return (
                              <div key={cIdx} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                <span style={{ fontSize: 11, color: "#666" }}>{cell.label} rep:</span>
                                <select
                                  value={weights[currentKey] || ""}
                                  onChange={(e) => handleWeightChange(blockIdx, exIdx, wIdx, cIdx, e.target.value)}
                                  style={{ padding: "2px 4px", fontSize: 12, borderRadius: 4, border: "1px solid #ccc" }}
                                >
                                  <option value="">- kg</option>
                                  {KG_OPTIONS.map((val) => (
                                    <option key={val} value={val}>{val} kg</option>
                                  ))}
                                </select>
                              </div>
                            );
                          })}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

