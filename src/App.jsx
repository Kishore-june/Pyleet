import relationData from "./relation.json";
import questionsData from "./questions.json";
import answersData from "./answer.json";

import { useState, useEffect, useMemo } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const COMPANIES = relationData.COMPANIES;;

const COMPANY_COLORS = relationData.COMPANY_COLORS;;

const QUESTIONS = questionsData.map(q => {
  const ans = answersData.find(a => a.id === q.id) || {};
  const rel = (relationData.RELATED_QUESTIONS || []).find(r => r.id === q.id) || {};
  return { ...q, ...ans, ...rel };
});


const TOPICS = [...new Set(QUESTIONS.flatMap(q => q.topic))].sort();

const COMPANY_LIST = Object.keys(COMPANIES);

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("home"); // home | list | detail | companies | company
  const [selectedQ, setSelectedQ] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [filter, setFilter] = useState({ topic: "All", search: "", sort: "mostAsked" });
  const [tab, setTab] = useState("explain"); // explain | related | ai
  const [aiLoading, setAiLoading] = useState(false);
  const [aiAnswer, setAiAnswer] = useState("");
  const [userQuestion, setUserQuestion] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [solvedSet, setSolvedSet] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem("solved") || "[]")); }
    catch { return new Set(); }
  });
  const [apiKey, setApiKey] = useState(localStorage.getItem("gemini_api_key") || "");

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const saveSolved = (s) => {
    try { localStorage.setItem("solved", JSON.stringify([...s])); } catch {}
  };

  const toggleSolved = (id) => {
    setSolvedSet(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      saveSolved(next);
      return next;
    });
  };

  const filteredQuestions = useMemo(() => {
    let qs = [...QUESTIONS];
    if (filter.topic !== "All") qs = qs.filter(q => q.topic.includes(filter.topic));
    if (filter.search) qs = qs.filter(q =>
      q.title.toLowerCase().includes(filter.search.toLowerCase()) ||
      q.num.toString().includes(filter.search)
    );
    if (selectedCompany) {
      const nums = COMPANIES[selectedCompany] || [];
      qs = qs.filter(q => nums.includes(q.num));
    }
    if (filter.sort === "mostAsked") qs.sort((a, b) => b.askCount - a.askCount);
    else if (filter.sort === "number") qs.sort((a, b) => a.num - b.num);
    return qs;
  }, [filter, selectedCompany]);

  const askAI = async (prompt) => {
    if (!apiKey) {
      setAiAnswer("Please set your Gemini API key in the 'AI Config' section first.");
      return;
    }
    setAiLoading(true);
    setAiAnswer("");
    try {
      const r = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: `You are a helpful coding mentor for a beginner Python learner. Explain in simple, friendly language.
Problem: ${selectedQ?.title}
Description: ${selectedQ?.problem}
Solution being discussed: ${selectedQ?.solution}

User question: ${prompt}` }]
          }]
        })
      });
      const data = await r.json();
      if (data.error) {
        setAiAnswer(`Error: ${data.error.message || "Invalid API key or request"}`);
      } else {
        setAiAnswer(data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.");
      }
    } catch (err) {
      setAiAnswer("Connection error. Check your internet or API key.");
    }
    setAiLoading(false);
  };

  // ── STYLES ──
  const styles = {
    app: { minHeight: "100vh", background: "#0a0e1a", color: "#e2e8f0", fontFamily: "'JetBrains Mono', 'Fira Code', monospace" },
    nav: { background: "rgba(13,18,32,0.95)", borderBottom: "1px solid #1e2d4a", padding: isMobile ? "0 12px" : "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: 60, position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(10px)", flexWrap: "wrap", gap: 10 },
    logo: { fontSize: isMobile ? 18 : 20, fontWeight: 800, background: "linear-gradient(135deg, #00d4ff, #0090ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", cursor: "pointer" },
    navBtn: (active) => ({ background: active ? "#1e3a5f" : "transparent", border: active ? "1px solid #0090ff" : "1px solid transparent", color: active ? "#00d4ff" : "#94a3b8", padding: isMobile ? "4px 10px" : "6px 14px", borderRadius: 6, cursor: "pointer", fontSize: isMobile ? 12 : 13, transition: "all .2s" }),
    hero: { textAlign: "center", padding: isMobile ? "40px 20px 40px" : "80px 24px 60px", background: "radial-gradient(ellipse at 50% 0%, rgba(0,144,255,0.12) 0%, transparent 70%)" },
    heroTitle: { fontSize: isMobile ? 32 : 48, fontWeight: 900, lineHeight: 1.1, marginBottom: 16, background: "linear-gradient(135deg, #fff 30%, #00d4ff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
    heroSub: { fontSize: isMobile ? 15 : 18, color: "#94a3b8", maxWidth: isMobile ? "100%" : 560, margin: "0 auto 40px" },
    statsRow: { display: "flex", justifyContent: "center", gap: isMobile ? 16 : 32, flexWrap: "wrap", marginBottom: isMobile ? 32 : 48 },
    stat: { textAlign: "center", minWidth: isMobile ? 120 : "auto" },
    statNum: { fontSize: isMobile ? 28 : 36, fontWeight: 800, color: "#00d4ff" },
    statLabel: { fontSize: 12, color: "#64748b", marginTop: 4 },
    ctaBtn: (primary) => ({ padding: isMobile ? "10px 20px" : "14px 32px", borderRadius: 8, fontWeight: 700, fontSize: isMobile ? 14 : 16, cursor: "pointer", transition: "all .2s", fontFamily: "inherit", background: primary ? "linear-gradient(135deg, #0090ff, #00d4ff)" : "transparent", border: primary ? "none" : "1px solid #334155", color: primary ? "#000" : "#94a3b8" }),
    section: { padding: isMobile ? "0 16px 32px" : "0 24px 48px", maxWidth: 1200, margin: "0 auto" },
    sectionTitle: { fontSize: isMobile ? 18 : 22, fontWeight: 700, color: "#fff", marginBottom: 16, paddingTop: 8 },
    companyGrid: { display: "grid", gridTemplateColumns: isMobile ? "repeat(auto-fill, minmax(110px, 1fr))" : "repeat(auto-fill, minmax(140px, 1fr))", gap: 10 },
    companyCard: (name, active) => ({ background: active ? COMPANY_COLORS[name]?.bg || "#1e2d4a" : "#0f172a", border: `1px solid ${active ? (COMPANY_COLORS[name]?.border || "#0090ff") : "#1e2d4a"}`, borderRadius: 10, padding: isMobile ? "10px 8px" : "14px 12px", cursor: "pointer", textAlign: "center", transition: "all .2s" }),
    companyName: (name) => ({ fontSize: 12, fontWeight: 600, color: COMPANY_COLORS[name]?.text || "#94a3b8", marginTop: 6 }),
    companyCount: { fontSize: 10, color: "#64748b", marginTop: 2 },
    filterBar: { display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20, alignItems: "center" },
    searchInput: { flex: 1, minWidth: isMobile ? 150 : 200, background: "#0f172a", border: "1px solid #1e2d4a", borderRadius: 8, padding: "8px 14px", color: "#e2e8f0", fontSize: 14, fontFamily: "inherit", outline: "none" },
    select: { background: "#0f172a", border: "1px solid #1e2d4a", borderRadius: 8, padding: "8px 12px", color: "#94a3b8", fontSize: 13, fontFamily: "inherit", cursor: "pointer" },
    qList: { display: "flex", flexDirection: "column", gap: 8 },
    qRow: (solved) => ({ background: solved ? "rgba(0,144,255,0.05)" : "#0f172a", border: `1px solid ${solved ? "#0090ff44" : "#1e2d4a"}`, borderRadius: 10, padding: isMobile ? "12px 14px" : "14px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: isMobile ? 8 : 12, transition: "all .2s" }),
    qNum: { fontSize: 13, color: "#64748b", minWidth: isMobile ? 30 : 36 },
    qTitle: { flex: 1, fontSize: isMobile ? 14 : 15, fontWeight: 600, color: "#e2e8f0" },
    topicTag: (t) => ({ fontSize: 10, padding: "2px 6px", borderRadius: 4, background: "#1e2d4a", color: "#64748b", border: "1px solid #1e3352" }),
    hotBadge: { fontSize: 10, padding: "2px 7px", borderRadius: 4, background: "#ff450020", color: "#ff6b6b", border: "1px solid #ff450040", display: isMobile ? "none" : "block" },
    checkBtn: (solved) => ({ width: 24, height: 24, borderRadius: 6, border: `1px solid ${solved ? "#00d4ff" : "#334155"}`, background: solved ? "#00d4ff22" : "transparent", color: solved ? "#00d4ff" : "#64748b", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }),
    detailWrap: { maxWidth: 1400, margin: "0 auto", padding: isMobile ? "0 16px 40px" : "0 24px 60px" },
    detailLayout: { display: "flex", gap: 24, marginTop: 24, alignItems: "flex-start", flexDirection: isMobile ? "column" : "row" },
    leftCol: { width: "100%", flex: "1", minWidth: 0, position: isMobile ? "static" : "sticky", top: 84 },
    rightCol: { width: "100%", flex: "1", minWidth: 0 },
    backBtn: { background: "transparent", border: "1px solid #1e2d4a", color: "#94a3b8", padding: "8px 16px", borderRadius: 6, cursor: "pointer", fontSize: 13, marginBottom: 20, fontFamily: "inherit" },
    detailHeader: { background: "#0f172a", border: "1px solid #1e2d4a", borderRadius: 12, padding: isMobile ? "16px" : "24px", marginBottom: 20 },
    detailNum: { fontSize: 13, color: "#64748b" },
    detailTitle: { fontSize: isMobile ? 22 : 28, fontWeight: 800, color: "#fff", margin: "4px 0 12px" },
    badge: (color) => ({ display: "inline-block", fontSize: 10, padding: "2px 8px", borderRadius: 20, background: color + "20", color, border: `1px solid ${color}40`, marginRight: 6 }),
    problemBox: { background: "#060b14", border: "1px solid #1e2d4a", borderRadius: 8, padding: 16, marginTop: 12, fontSize: 14, lineHeight: 1.7, color: "#94a3b8", whiteSpace: "pre-wrap", fontFamily: "inherit" },
    tabRow: { display: "flex", gap: 4, marginBottom: 16, borderBottom: "1px solid #1e2d4a", paddingBottom: 0, overflowX: "auto", scrollbarWidth: "none" },
    tabBtn: (active) => ({ background: "transparent", border: "none", borderBottom: active ? "2px solid #00d4ff" : "2px solid transparent", color: active ? "#00d4ff" : "#64748b", padding: "10px 16px", cursor: "pointer", fontSize: 13, fontWeight: active ? 700 : 400, fontFamily: "inherit", transition: "all .2s", marginBottom: -1, whiteSpace: "nowrap" }),
    card: { background: "#0f172a", border: "1px solid #1e2d4a", borderRadius: 12, padding: isMobile ? 16 : 20, marginBottom: 16 },
    cardTitle: { fontSize: 14, fontWeight: 700, color: "#00d4ff", marginBottom: 10 },
    codeBlock: { background: "#060b14", border: "1px solid #1e3352", borderRadius: 8, padding: 14, fontSize: 12, lineHeight: 1.6, color: "#7dd3fc", whiteSpace: "pre", overflowX: "auto", fontFamily: "'JetBrains Mono', monospace" },
    explainText: { fontSize: 14, color: "#94a3b8", lineHeight: 1.7 },
    highlight: { color: "#fbbf24" },
    complexityRow: { display: "flex", gap: 12, marginTop: 12, flexDirection: isMobile ? "column" : "row" },
    complexityBadge: (color) => ({ fontSize: 12, padding: "4px 12px", borderRadius: 6, background: color + "15", color, border: `1px solid ${color}30` }),
    aiBox: { background: "#060b14", border: "1px solid #1e3352", borderRadius: 12, padding: isMobile ? 16 : 20, marginTop: 16 },
    aiInput: { width: "100%", background: "#0f172a", border: "1px solid #1e2d4a", borderRadius: 8, padding: "10px 14px", color: "#e2e8f0", fontSize: 14, fontFamily: "inherit", outline: "none", resize: "vertical", minHeight: 60, boxSizing: "border-box" },
    aiSubmit: { marginTop: 10, background: "linear-gradient(135deg,#0090ff,#00d4ff)", border: "none", borderRadius: 8, padding: "10px 24px", color: "#000", fontWeight: 700, cursor: "pointer", fontSize: 14, fontFamily: "inherit" },
    aiResponse: { marginTop: 14, fontSize: 14, color: "#94a3b8", lineHeight: 1.8, whiteSpace: "pre-wrap" },
    progressBar: { height: 4, background: "#1e2d4a", borderRadius: 2, marginTop: 8 },
    progressFill: { height: "100%", background: "linear-gradient(90deg,#0090ff,#00d4ff)", borderRadius: 2, transition: "width .5s" },
    relatedCard: { background: "#060b14", border: "1px solid #1e3352", borderRadius: 12, padding: isMobile ? 16 : 20 },
    relatedTitle: { fontSize: 16, fontWeight: 700, color: "#fbbf24", marginBottom: 8 },
  };

  const progress = Math.round((solvedSet.size / QUESTIONS.length) * 100);
  
  const Logo = ({ company, size = 24 }) => {
    const logo = COMPANY_COLORS[company]?.logo;
    if (!logo) return null;
    if (logo.startsWith("/")) {
      return <img src={logo} alt={company} style={{ width: size, height: size, objectFit: "contain" }} />;
    }
    return <div style={{ fontSize: size }}>{logo}</div>;
  };

  // ── HOME PAGE ──
  if (view === "home") return (
    <div style={styles.app}>
      <nav style={styles.nav}>
        <span style={styles.logo}>⚡ PyLeet</span>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={styles.navBtn(false)} onClick={() => setView("list")}>Problems</button>
          <button style={styles.navBtn(false)} onClick={() => setView("companies")}>Companies</button>
          <button style={styles.navBtn(false)} onClick={() => setView("settings")}>AI Config</button>
        </div>
      </nav>
      <div style={styles.hero}>
        <div style={{ fontSize: 13, color: "#0090ff", marginBottom: 16, letterSpacing: 3, textTransform: "uppercase" }}>LeetCode Easy · Python · 2024</div>
        <h1 style={styles.heroTitle}>Master Every<br />Easy Problem</h1>
        <p style={styles.heroSub}>Complete solutions, deep explanations, AI tutor, company-wise filters — everything you need to crack your next interview.</p>
        <div style={styles.statsRow}>
          <div style={styles.stat}><div style={styles.statNum}>{QUESTIONS.length}+</div><div style={styles.statLabel}>Problems Covered</div></div>
          <div style={styles.stat}><div style={styles.statNum}>{COMPANY_LIST.length}</div><div style={styles.statLabel}>Companies</div></div>
          <div style={styles.stat}><div style={styles.statNum}>{TOPICS.length}</div><div style={styles.statLabel}>Topics</div></div>
          <div style={styles.stat}><div style={styles.statNum}>Python</div><div style={styles.statLabel}>Language</div></div>
        </div>
        {solvedSet.size > 0 && (
          <div style={{ maxWidth: 320, margin: "0 auto 32px", background: "#0f172a", border: "1px solid #1e2d4a", borderRadius: 12, padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 13, color: "#94a3b8" }}>Your Progress</span>
              <span style={{ fontSize: 13, color: "#00d4ff", fontWeight: 700 }}>{solvedSet.size}/{QUESTIONS.length} solved ({progress}%)</span>
            </div>
            <div style={styles.progressBar}><div style={{ ...styles.progressFill, width: `${progress}%` }} /></div>
          </div>
        )}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button style={styles.ctaBtn(true)} onClick={() => setView("list")}>Start Solving →</button>
          <button style={styles.ctaBtn(false)} onClick={() => setView("companies")}>Browse by Company</button>
        </div>
      </div>
      <div style={styles.section}>
        <div style={styles.sectionTitle}>🔥 Most Asked Problems</div>
        <div style={styles.qList}>
          {QUESTIONS.filter(q => q.mostAsked).slice(0, 6).map(q => (
            <div key={q.id} style={styles.qRow(solvedSet.has(q.id))} onClick={() => { setSelectedQ(q); setTab("solution"); setAiAnswer(""); setView("detail"); }}>
              <button style={styles.checkBtn(solvedSet.has(q.id))} onClick={e => { e.stopPropagation(); toggleSolved(q.id); }}>✓</button>
              <span style={styles.qNum}>#{q.num}</span>
              <span style={styles.qTitle}>{q.title}</span>
              <span style={styles.hotBadge}>🔥 {(q.askCount/1000).toFixed(1)}k</span>
              {q.topic.slice(0,2).map(t => <span key={t} style={styles.topicTag(t)}>{t}</span>)}
            </div>
          ))}
        </div>
        <button style={{ ...styles.ctaBtn(false), marginTop: 16, fontSize: 14, padding: "10px 24px" }} onClick={() => setView("list")}>View All {QUESTIONS.length}+ Problems →</button>
      </div>
      <div style={styles.section}>
        <div style={styles.sectionTitle}>🏢 Top Companies</div>
        <div style={styles.companyGrid}>
          {COMPANY_LIST.map(c => (
            <div key={c} style={styles.companyCard(c, false)} onClick={() => { setSelectedCompany(c); setView("list"); }}>
              <Logo company={c} size={24} />
              <div style={styles.companyName(c)}>{c}</div>
              <div style={styles.companyCount}>{QUESTIONS.filter(q => (COMPANIES[c]||[]).includes(q.num)).length} problems</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ── COMPANIES PAGE ──
  if (view === "companies") return (
    <div style={styles.app}>
      <nav style={styles.nav}>
        <span style={styles.logo} onClick={() => setView("home")}>⚡ PyLeet</span>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={styles.navBtn(false)} onClick={() => setView("list")}>Problems</button>
          <button style={styles.navBtn(true)}>Companies</button>
          <button style={styles.navBtn(false)} onClick={() => setView("settings")}>AI Config</button>
        </div>
      </nav>
      <div style={styles.section}>
        <div style={{ paddingTop: 32 }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Companies</h2>
          <p style={{ color: "#64748b", marginBottom: 32 }}>Click a company to see which Easy problems they ask most.</p>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(auto-fill, minmax(${isMobile ? "140px" : "200px"}, 1fr))`, gap: 16 }}>
            {COMPANY_LIST.map(c => {
              const count = QUESTIONS.filter(q => (COMPANIES[c]||[]).includes(q.num)).length;
              return (
                <div key={c} style={{ ...styles.companyCard(c, false), textAlign: "left", padding: 20 }} onClick={() => { setSelectedCompany(c); setView("list"); }}>
                  <div style={{ marginBottom: 8 }}><Logo company={c} size={32} /></div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: COMPANY_COLORS[c]?.text || "#fff", marginBottom: 4 }}>{c}</div>
                  <div style={{ fontSize: 13, color: "#64748b", marginBottom: 12 }}>{count} Easy questions</div>
                  <div style={{ height: 3, background: "#1e2d4a", borderRadius: 2 }}>
                    <div style={{ height: "100%", width: `${(count / QUESTIONS.length * 100)}%`, background: COMPANY_COLORS[c]?.border || "#0090ff", borderRadius: 2 }} />
                  </div>
                  <div style={{ marginTop: 12, fontSize: 12, color: COMPANY_COLORS[c]?.text || "#0090ff", fontWeight: 600 }}>View Questions →</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  // ── PROBLEM LIST ──
  if (view === "list") return (
    <div style={styles.app}>
      <nav style={styles.nav}>
        <span style={styles.logo} onClick={() => { setSelectedCompany(null); setView("home"); }}>⚡ PyLeet</span>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={styles.navBtn(true)}>Problems</button>
          <button style={styles.navBtn(false)} onClick={() => setView("companies")}>Companies</button>
          <button style={styles.navBtn(false)} onClick={() => setView("settings")}>AI Config</button>
        </div>
      </nav>
      <div style={styles.section}>
        <div style={{ paddingTop: 24 }}>
          {selectedCompany && (
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <Logo company={selectedCompany} size={28} />
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, color: COMPANY_COLORS[selectedCompany]?.text || "#fff" }}>{selectedCompany}</div>
                <div style={{ fontSize: 13, color: "#64748b" }}>Easy questions asked by {selectedCompany}</div>
              </div>
              <button style={{ marginLeft: "auto", ...styles.navBtn(false) }} onClick={() => setSelectedCompany(null)}>✕ Clear Filter</button>
            </div>
          )}
          {solvedSet.size > 0 && (
            <div style={{ marginBottom: 20, background: "#0f172a", border: "1px solid #1e2d4a", borderRadius: 10, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 13, color: "#64748b" }}>Progress:</span>
              <span style={{ fontSize: 13, color: "#00d4ff", fontWeight: 700 }}>{solvedSet.size}/{QUESTIONS.length} solved</span>
              <div style={{ flex: 1, ...styles.progressBar, marginTop: 0 }}><div style={{ ...styles.progressFill, width: `${progress}%` }} /></div>
              <span style={{ fontSize: 12, color: "#64748b" }}>{progress}%</span>
            </div>
          )}
          <div style={styles.filterBar}>
            <input style={styles.searchInput} placeholder="🔍 Search by title or number..." value={filter.search} onChange={e => setFilter(f => ({ ...f, search: e.target.value }))} />
            <select style={styles.select} value={filter.topic} onChange={e => setFilter(f => ({ ...f, topic: e.target.value }))}>
              <option>All</option>
              {TOPICS.map(t => <option key={t}>{t}</option>)}
            </select>
            <select style={styles.select} value={filter.sort} onChange={e => setFilter(f => ({ ...f, sort: e.target.value }))}>
              <option value="mostAsked">Most Asked</option>
              <option value="number">By Number</option>
            </select>
          </div>
          <div style={{ fontSize: 13, color: "#64748b", marginBottom: 12 }}>{filteredQuestions.length} problems</div>
          <div style={styles.qList}>
            {filteredQuestions.map(q => (
              <div key={q.id} style={styles.qRow(solvedSet.has(q.id))} onClick={() => { setSelectedQ(q); setTab("solution"); setAiAnswer(""); setView("detail"); }}>
                <button style={styles.checkBtn(solvedSet.has(q.id))} onClick={e => { e.stopPropagation(); toggleSolved(q.id); }}>✓</button>
                <span style={styles.qNum}>#{q.num}</span>
                <span style={styles.qTitle}>{q.title}</span>
                {q.mostAsked && <span style={styles.hotBadge}>🔥</span>}
                <span style={{ fontSize: 12, color: "#64748b" }}>{(q.askCount/1000).toFixed(1)}k</span>
                {q.topic.slice(0,2).map(t => <span key={t} style={styles.topicTag(t)}>{t}</span>)}
                <span style={{ fontSize: 18, color: "#334155" }}>›</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // ── DETAIL PAGE ──
  if (view === "detail" && selectedQ) {
    const q = selectedQ;
    return (
      <div style={styles.app}>
        <nav style={styles.nav}>
          <span style={styles.logo} onClick={() => { setSelectedCompany(null); setView("home"); }}>⚡ PyLeet</span>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={styles.navBtn(false)} onClick={() => setView("list")}>Problems</button>
            <button style={styles.navBtn(false)} onClick={() => setView("companies")}>Companies</button>
            <button style={styles.navBtn(false)} onClick={() => setView("settings")}>AI Config</button>
          </div>
        </nav>
        <div style={styles.detailWrap}>
          <div style={{ paddingTop: 24 }}>
            <button style={styles.backBtn} onClick={() => setView("list")}>← Back to Problems</button>
            <div style={styles.detailLayout}>
              <div style={styles.leftCol}>
                <div style={styles.detailHeader}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
                    <div>
                      <div style={styles.detailNum}>Problem #{q.num}</div>
                      <h1 style={styles.detailTitle}>{q.title}</h1>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
                        <span style={styles.badge("#22c55e")}>Easy</span>
                        {q.mostAsked && <span style={styles.badge("#ef4444")}>🔥 Most Asked</span>}
                        {q.topic.map(t => <span key={t} style={styles.badge("#0090ff")}>{t}</span>)}
                        <span style={{ fontSize: 12, color: "#64748b", marginLeft: 4 }}>~{(q.askCount / 1000).toFixed(1)}k asks</span>
                      </div>
                    </div>
                    <button style={{ ...styles.checkBtn(solvedSet.has(q.id)), width: "auto", padding: "8px 16px", fontSize: 13 }} onClick={() => toggleSolved(q.id)}>
                      {solvedSet.has(q.id) ? "✓ Solved" : "Mark Solved"}
                    </button>
                  </div>
                  <div style={styles.problemBox}>{q.problem}</div>
                </div>
              </div>

              <div style={styles.rightCol}>
                <div style={styles.card}>
                  <div style={styles.cardTitle}>🐍 Python Solution</div>
                  <div style={styles.codeBlock}>{q.solution}</div>
                  <div style={styles.complexityRow}>
                    <span style={styles.complexityBadge("#22c55e")}>⏱ Time: {q.timeComplexity}</span>
                    <span style={styles.complexityBadge("#0090ff")}>💾 Space: {q.spaceComplexity}</span>
                  </div>
                </div>

                <div style={styles.tabRow}>
                  {["explain", "related", "ai"].map(t => (
                    <button key={t} style={styles.tabBtn(tab === t)} onClick={() => setTab(t)}>
                      {t === "explain" ? "📚 Deep Dive" : t === "related" ? "🔗 Related" : "🤖 Ask AI"}
                    </button>
                  ))}
                </div>

                {tab === "explain" && (
                  <div>
                    <div style={styles.card}>
                      <div style={styles.cardTitle}>💡 Why This Approach?</div>
                      <p style={styles.explainText}>{q.whyMethod}</p>
                    </div>
                    <div style={styles.card}>
                      <div style={styles.cardTitle}>🔄 How It Works (Step by Step)</div>
                      <p style={styles.explainText}>{q.howMethod}</p>
                    </div>
                    <div style={styles.card}>
                      <div style={styles.cardTitle}>❓ Why Use This Function/Method?</div>
                      <p style={styles.explainText}>{q.whyFunction}</p>
                    </div>
                    <div style={styles.card}>
                      <div style={styles.cardTitle}>⚙️ How Does This Function Work?</div>
                      <p style={styles.explainText}>{q.howFunction}</p>
                    </div>
                    <div style={styles.card}>
                      <div style={styles.cardTitle}>📊 Complexity Analysis</div>
                      <p style={styles.explainText}>
                        <span style={styles.highlight}>Time Complexity: {q.timeComplexity}</span> — {q.timeComplexity === "O(1)" ? "Constant time, fastest possible!" : q.timeComplexity === "O(n)" ? "Linear time — we visit each element once." : q.timeComplexity === "O(log n)" ? "Logarithmic time — we halve the search space each step." : "Polynomial time — multiple passes through the data."}<br /><br />
                        <span style={styles.highlight}>Space Complexity: {q.spaceComplexity}</span> — {q.spaceComplexity.includes("1") ? "Constant space — no extra memory proportional to input." : "Extra memory used proportional to input size."}
                      </p>
                    </div>
                  </div>
                )}

                {tab === "related" && q.relatedQ && (
                  <div>
                    <div style={styles.relatedCard}>
                      <div style={styles.relatedTitle}>🔗 {q.relatedQ.title}</div>
                      <div style={{ fontSize: 13, color: "#64748b", marginBottom: 16, lineHeight: 1.7 }}>{q.relatedQ.problem}</div>
                      <div style={styles.cardTitle}>Solution:</div>
                      <div style={styles.codeBlock}>{q.relatedQ.solution}</div>
                      <div style={{ marginTop: 14 }}>
                        <div style={styles.cardTitle}>💡 Why is this related?</div>
                        <p style={styles.explainText}>{q.relatedQ.why}</p>
                      </div>
                    </div>
                  </div>
                )}

                {tab === "ai" && (
                  <div>
                    <div style={styles.aiBox}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: "#00d4ff", marginBottom: 8 }}>🤖 Ask AI Tutor</div>
                      <div style={{ fontSize: 13, color: "#64748b", marginBottom: 12 }}>Got stuck? Ask anything about this problem in plain English!</div>
                      <textarea style={styles.aiInput} placeholder="e.g. Why do we use a dictionary here? What is XOR? Can you give me another example?" value={userQuestion} onChange={e => setUserQuestion(e.target.value)} />
                      <button style={{ ...styles.aiSubmit, opacity: aiLoading ? 0.6 : 1 }} onClick={() => { if (userQuestion.trim()) askAI(userQuestion); }} disabled={aiLoading}>
                        {aiLoading ? "Thinking..." : "Ask →"}
                      </button>
                      {aiAnswer && <div style={styles.aiResponse}>{aiAnswer}</div>}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── SETTINGS PAGE ──
  if (view === "settings") return (
    <div style={styles.app}>
      <nav style={styles.nav}>
        <span style={styles.logo} onClick={() => setView("home")}>⚡ PyLeet</span>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={styles.navBtn(false)} onClick={() => setView("list")}>Problems</button>
          <button style={styles.navBtn(false)} onClick={() => setView("companies")}>Companies</button>
          <button style={styles.navBtn(true)}>AI Config</button>
        </div>
      </nav>
      <div style={styles.section}>
        <div style={{ paddingTop: 60, maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: "#fff", marginBottom: 12 }}>AI Configuration</h2>
          <p style={{ color: "#94a3b8", marginBottom: 32, lineHeight: 1.6 }}>PyLeet uses Google Gemini AI to provide real-time mentoring. Add your free API key from Google AI Studio to enable the 'Ask AI' features.</p>
          
          <div style={styles.card}>
            <div style={{ ...styles.cardTitle, marginBottom: 16 }}>Google Gemini API Key</div>
            <input 
              type="password" 
              style={{ ...styles.aiInput, minHeight: "auto", marginBottom: 16 }} 
              placeholder="Paste your API key here..." 
              value={apiKey} 
              onChange={e => {
                const val = e.target.value;
                setApiKey(val);
                localStorage.setItem("gemini_api_key", val);
              }}
            />
            <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#060b14", padding: 12, borderRadius: 8, border: "1px solid #1e3352" }}>
              <span style={{ fontSize: 20 }}>💡</span>
              <span style={{ fontSize: 13, color: "#64748b" }}>
                Don't have a key? Get one for free at <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" style={{ color: "#00d4ff", textDecoration: "none" }}>Google AI Studio</a>.
              </span>
            </div>
          </div>
          
          <div style={{ marginTop: 24, textAlign: "center" }}>
            <button style={styles.ctaBtn(true)} onClick={() => setView("list")}>Go Content Exploring →</button>
          </div>
        </div>
      </div>
    </div>
  );

  return <div style={styles.app}><div style={{ padding: 40, textAlign: "center", color: "#94a3b8" }}>Loading...</div></div>;
}
