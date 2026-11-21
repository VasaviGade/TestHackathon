import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowRight, Check, ChevronDown, ClipboardCheck, ExternalLink, FileText, Globe2, MapPin, Mic, Send, ShieldCheck, Sparkles, Store, Volume2 } from 'lucide-react';
import './style.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const types = ['Tea stall', 'Food stall', 'Home bakery'];
const copy = {
  en: {
    brand: 'Local rules, made clearer', title: 'Start your business with clarity.', intro: 'A friendly guide to permissions, paperwork, and the next right step for your small business.', start: 'Get started', how: 'How it works', business: 'What are you starting?', city: 'City', where: 'Area or locality', language: 'Your language', continue: 'Open my workspace', workspace: 'Your PermitPath workspace', greeting: 'Hi! I can help you explore permissions and paperwork for your business. Ask me anything, and I’ll show the sources I used.', ask: 'Ask a question…', assistant: 'PermitPath Assistant', checklist: 'My checklist', sources: 'Source references', verify: 'Needs verification', loading: 'Checking sources…', disclaimer: 'General information, not legal advice or official approval. Verify requirements with the relevant authority.', suggest: 'TRY ASKING', back: 'Change details', completed: 'completed', details: 'Business profile', profile: 'Profile', unavailable: 'Could not reach the assistant. Check that the backend is running and try again.', noItems: 'No suggested checks for this profile yet.', noSources: 'No source has been cited yet. Ask a question to see the retrieved references. The demo document is unverified.', documents: 'Documents', procedure: 'Procedure', status: 'Status', listen: 'Read latest answer aloud', micUnavailable: 'Voice input is unavailable in this browser. Text chat is ready.', source: 'Source', official: 'Official portal; applicability needs verification', unknown: 'Needs official source verification', cityDefault: 'Hyderabad'
  },
  te: {
    brand: 'స్థానిక నియమాలు, సులభంగా', title: 'మీ వ్యాపారాన్ని స్పష్టతతో ప్రారంభించండి.', intro: 'చిన్న వ్యాపారానికి అనుమతులు, పత్రాలు, తదుపరి చర్యలపై సులభమైన మార్గదర్శకం.', start: 'ప్రారంభించండి', how: 'ఇది ఎలా పనిచేస్తుంది', business: 'మీరు ఏ వ్యాపారాన్ని ప్రారంభిస్తున్నారు?', city: 'నగరం', where: 'ప్రాంతం లేదా కాలనీ', language: 'మీ భాష', continue: 'నా కార్యస్థలాన్ని తెరవండి', workspace: 'మీ PermitPath కార్యస్థలం', greeting: 'నమస్కారం! మీ వ్యాపారానికి సంబంధించిన అనుమతులు, పత్రాల గురించి తెలుసుకోవడంలో సహాయం చేస్తాను. ప్రశ్న అడగండి; ఉపయోగించిన మూలాలను చూపిస్తాను.', ask: 'మీ ప్రశ్న అడగండి…', assistant: 'PermitPath సహాయకుడు', checklist: 'నా తనిఖీ జాబితా', sources: 'మూల సూచనలు', verify: 'నిర్ధారించాలి', loading: 'మూలాలను పరిశీలిస్తోంది…', disclaimer: 'ఇది సాధారణ సమాచారం మాత్రమే; న్యాయ సలహా లేదా అధికారిక అనుమతి కాదు. సంబంధిత అధికారితో నిర్ధారించండి.', suggest: 'ఇవి అడగండి', back: 'వివరాలను మార్చండి', completed: 'పూర్తయ్యాయి', details: 'వ్యాపార వివరాలు', profile: 'వివరాలు', unavailable: 'సహాయకుడిని చేరుకోలేకపోయాం. బ్యాకెండ్ నడుస్తోందో చూసి మళ్లీ ప్రయత్నించండి.', noItems: 'ఈ వివరాలకు సూచించదగిన తనిఖీలు ఇంకా లేవు.', noSources: 'ఇంకా మూలం సూచించబడలేదు. పొందిన మూలాలను చూడటానికి ప్రశ్న అడగండి. నమూనా పత్రం నిర్ధారించబడలేదు.', documents: 'పత్రాలు', procedure: 'విధానం', status: 'స్థితి', listen: 'తాజా సమాధానాన్ని వినండి', micUnavailable: 'ఈ బ్రౌజర్‌లో వాయిస్ ఇన్‌పుట్ అందుబాటులో లేదు. టెక్స్ట్ చాట్ ఉపయోగించండి.', source: 'మూలం', official: 'అధికారిక పోర్టల్; వర్తింపును నిర్ధారించాలి', unknown: 'అధికారిక మూలంతో నిర్ధారించాలి', cityDefault: 'హైదరాబాద్'
  }
};

function Inline({ text }) {
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\(https?:\/\/[^\s)]+\))/g;
  return text.split(pattern).filter(Boolean).map((part, i) => {
    const link = part.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/);
    if (link) return <a key={i} href={link[2]} target="_blank" rel="noreferrer">{link[1]}</a>;
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('*') && part.endsWith('*')) return <em key={i}>{part.slice(1, -1)}</em>;
    if (part.startsWith('`') && part.endsWith('`')) return <code key={i}>{part.slice(1, -1)}</code>;
    return part;
  });
}

function Markdown({ text }) {
  const lines = String(text || '').replace(/\\n/g, '\n').split('\n');
  const blocks = [];
  let list = [];
  const flush = () => { if (list.length) { blocks.push(<ul key={`ul-${blocks.length}`}>{list.map((line, i) => <li key={i}><Inline text={line} /></li>)}</ul>); list = []; } };
  lines.forEach((line, i) => {
    const trimmed = line.trim();
    if (!trimmed) { flush(); return; }
    const li = trimmed.match(/^(?:[-*•]|\d+[.)])\s+(.+)/);
    if (li) { list.push(li[1]); return; }
    flush();
    const heading = trimmed.match(/^(#{1,3})\s+(.+)/);
    if (heading) { const Tag = `h${heading[1].length + 2}`; blocks.push(<Tag key={i}><Inline text={heading[2]} /></Tag>); }
    else blocks.push(<p key={i}><Inline text={trimmed} /></p>);
  });
  flush();
  return <div className="markdown">{blocks}</div>;
}

function App() {
  const [page, setPage] = useState('home');
  const [biz, setBiz] = useState(types[0]);
  const [city, setCity] = useState('Hyderabad');
  const [area, setArea] = useState('');
  const [lang, setLang] = useState('en');
  const [q, setQ] = useState('');
  const [msgs, setMsgs] = useState([]);
  const [items, setItems] = useState([]);
  const [catalogSources, setCatalogSources] = useState([]);
  const [busy, setBusy] = useState(false);
  const [listening, setListening] = useState(false);
  const [checkError, setCheckError] = useState(false);
  const t = copy[lang];
  const profile = useMemo(() => ({ business_type: biz, city, locality: area, language: lang }), [biz, city, area, lang]);

  function changeBusiness(next) {
    if (next !== biz) { setBiz(next); setMsgs([]); }
  }
  function changeCity(next) {
    if (next !== city) setMsgs([]);
    setCity(next);
  }
  function changeArea(next) {
    if (next !== area) setMsgs([]);
    setArea(next);
  }

  useEffect(() => {
    if (page !== 'workspace') return;
    setMsgs(m => m.length ? m : [{ role: 'assistant', text: t.greeting, sources: [] }]);
    loadChecklist();
    loadSources();
  }, [page, biz, city, area, lang]);

  async function loadChecklist(completedOverride) {
    let saved = completedOverride;
    try { saved ||= JSON.parse(localStorage.getItem(`permitpath:${biz}:${city}`) || '[]'); } catch { saved = []; }
    try {
      const response = await fetch(`${API}/api/checklist`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...profile, completed: saved }) });
      if (!response.ok) throw new Error('Checklist service unavailable');
      setItems((await response.json()).items || []); setCheckError(false);
    } catch { setItems([]); setCheckError(true); }
  }

  async function loadSources() {
    try { const response = await fetch(`${API}/api/sources`); if (!response.ok) throw new Error(); setCatalogSources(await response.json()); }
    catch { setCatalogSources([]); }
  }

  async function send(text = q) {
    const question = text.trim();
    if (!question || busy) return;
    setMsgs(m => [...m, { role: 'user', text: question }]); setQ(''); setBusy(true);
    try {
      const history = msgs.slice(-8).map(turn => ({ role: turn.role, text: turn.text, sources: turn.sources || [] }));
      const response = await fetch(`${API}/api/chat`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...profile, question, history }) });
      if (!response.ok) throw new Error('Assistant service unavailable');
      const data = await response.json();
      setMsgs(m => [...m, { role: 'assistant', text: data.answer, sources: data.sources || [] }]);
    } catch { setMsgs(m => [...m, { role: 'assistant', text: t.unavailable, sources: [] }]); }
    finally { setBusy(false); }
  }

  function toggle(item) {
    const next = items.map(x => x.id === item.id ? { ...x, completed: !x.completed } : x);
    setItems(next);
    localStorage.setItem(`permitpath:${biz}:${city}`, JSON.stringify(next.filter(x => x.completed).map(x => x.id)));
  }

  function mic() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) { window.alert(t.micUnavailable); return; }
    const recognition = new SpeechRecognition(); recognition.lang = lang === 'te' ? 'te-IN' : 'en-IN';
    recognition.onstart = () => setListening(true); recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false); recognition.onresult = e => setQ(e.results[0][0].transcript); recognition.start();
  }

  function speak() {
    const last = [...msgs].reverse().find(x => x.role === 'assistant');
    if (last && window.speechSynthesis) { const utterance = new SpeechSynthesisUtterance(last.text); utterance.lang = lang === 'te' ? 'te-IN' : 'en-IN'; window.speechSynthesis.speak(utterance); }
  }

  const usedSources = msgs.flatMap(m => m.sources || []).filter((s, i, a) => a.findIndex(x => x.name === s.name && x.page === s.page) === i);
  return <>
    <header className="top"><a className="logo" href="#home" onClick={e => { e.preventDefault(); setPage('home'); }}><span>↗</span> permitpath<small>AI</small></a><div className="topright"><span className="location"><MapPin size={14} /> {city}, Telangana</span><button className="plain" onClick={() => setLang(lang === 'en' ? 'te' : 'en')}><Globe2 size={15} />{lang === 'en' ? 'తెలుగు' : 'English'} <ChevronDown size={13} /></button>{page === 'home' && <button className="dark small" onClick={() => setPage('setup')}>{t.start}<ArrowRight size={15} /></button>}</div></header>
    {page === 'home' && <main className="landing"><section className="hero"><div><div className="kicker"><i /> {t.brand.toUpperCase()}</div><h1>{t.title}</h1><p>{t.intro}</p><button className="dark" onClick={() => setPage('setup')}>{t.start}<ArrowRight size={16} /></button><a className="how" href="#steps">{t.how} ↓</a><div className="trust"><ShieldCheck size={15} /> Sources are labelled by verification status <span>·</span> No exact address needed</div></div><div className="hero-art"><div className="art-card"><div className="cardtop">PERMITPATH AI <i /></div><h2>Your next steps,<br /><em>all in one place.</em></h2>{['Explore permissions', 'Gather your documents', 'Ask with confidence'].map((x, i) => <div className="artrow" key={x}><span>{i === 0 ? <Check size={13} /> : <FileText size={13} />}</span><b>{x}<small>{['Find what may apply', 'Know what to prepare', 'Get answers with sources'][i]}</small></b></div>)}<small className="cardfoot">HYDERABAD · TELANGANA</small></div><span className="float one"><Store size={15} /> Built for local business</span><span className="float two"><i /> English · తెలుగు</span></div></section><section id="steps" className="steps"><div className="kicker">A CLEARER WAY FORWARD</div><h2>From “where do I start?”<br /><em>to a plan you can follow.</em></h2><div className="stepgrid">{[['01', 'Tell us about your business', 'Pick a business type and share your city and area.'], ['02', 'Ask what matters to you', 'Get plain language answers with the source documents shown.'], ['03', 'Keep track of next steps', 'Build a cautious checklist and mark off what you have done.']].map(x => <article key={x[0]}><small>{x[0]}</small><span><Sparkles size={17} /></span><h3>{x[1]}</h3><p>{x[2]}</p></article>)}</div></section><footer>permitpath AI <span>Local knowledge for the people who make a place.</span><small>HYDERABAD, INDIA · {new Date().getFullYear()}</small></footer></main>}
    {page === 'setup' && <main className="setup"><button className="plain back" onClick={() => setPage('home')}>← {t.back}</button><div className="kicker">LET’S GET YOU SET UP</div><h1>{t.business}</h1><p>A little context helps make your workspace more useful.</p><label>{t.business}</label><div className="types">{types.map(x => <button onClick={() => changeBusiness(x)} className={biz === x ? 'chosen' : ''} key={x}><Store size={16} />{x}<i>{biz === x ? '●' : '○'}</i></button>)}</div><label>{t.city}</label><div className="input"><MapPin size={16} /><input value={city} onChange={e => changeCity(e.target.value)} maxLength={100} /></div><label>{t.where}</label><div className="input"><MapPin size={16} /><input placeholder={t.where} value={area} onChange={e => changeArea(e.target.value)} maxLength={120} /></div><label>{t.language}</label><div className="languages"><button className={lang === 'en' ? 'chosen' : ''} onClick={() => setLang('en')}>English</button><button className={lang === 'te' ? 'chosen' : ''} onClick={() => setLang('te')}>తెలుగు</button></div><button className="dark wide" onClick={() => setPage('workspace')}>{t.continue}<ArrowRight size={16} /></button><div className="hint"><ShieldCheck size={14} /> Your locality is enough. We don’t ask for an exact street address.</div></main>}
    {page === 'workspace' && <div className="app"><aside><a className="logo" href="#home" onClick={e => { e.preventDefault(); setPage('home'); }}><span>↗</span> permitpath<small>AI</small></a><div className="sidelabel">YOUR WORKSPACE</div><button className="nav active"><Sparkles size={15} />{t.assistant}</button><button className="nav" onClick={() => document.getElementById('checklist')?.scrollIntoView({ behavior: 'smooth' })}><ClipboardCheck size={15} />{t.checklist}</button><button className="nav" onClick={() => document.getElementById('sources')?.scrollIntoView({ behavior: 'smooth' })}><FileText size={15} />{t.sources}</button><div className="profile"><Store size={16} /><b>{biz}</b><button onClick={() => setPage('setup')}>{t.profile}</button><small><MapPin size={11} />{area ? `${area}, ` : ''}{city}</small></div></aside><section className="main"><header className="apphead"><div><small>{t.workspace.toUpperCase()}</small><h2>{t.assistant}</h2></div><span>● {city}, Telangana</span></header><div className="columns"><section className="chat"><div className="chathead"><div className="avatar"><Sparkles size={14} /></div><b>{t.assistant}<small>● Grounded answers · {lang === 'en' ? 'English' : 'తెలుగు'}</small></b><button className="plain" onClick={speak} aria-label={t.listen}><Volume2 size={16} /></button></div><div className="messages">{msgs.map((m, i) => <article className={`message ${m.role}`} key={`${i}-${m.role}`}><div className="avatar">{m.role === 'assistant' ? <Sparkles size={13} /> : 'YOU'}</div><div><small>{m.role === 'assistant' ? t.assistant.toUpperCase() : 'YOU'}</small><Markdown text={m.text} />{m.sources?.map((s, j) => <span className="sourcechip" key={`${s.name}-${s.page}-${j}`}><i className={s.verified ? '' : 'demo'} />{s.title || s.name}{s.page ? ` · p. ${s.page}` : ''}{!s.verified ? ` · ${t.verify}` : ''}</span>)}</div></article>)}{busy && <div className="loading" role="status">{t.loading}</div>}</div><div className="suggestions"><small>{t.suggest}</small>{[lang === 'en' ? `What should I check for a ${biz.toLowerCase()}?` : `${biz} కోసం ఏమి పరిశీలించాలి?`, lang === 'en' ? 'Which sources support this?' : 'దీనికి ఆధారమైన మూలాలు ఏవి?'].map(x => <button key={x} onClick={() => send(x)}><Sparkles size={11} />{x}</button>)}</div><form onSubmit={e => { e.preventDefault(); send(); }}><button type="button" className={listening ? 'record' : ''} onClick={mic} aria-label="Use speech input"><Mic size={15} /></button><input value={q} onChange={e => setQ(e.target.value)} placeholder={t.ask} maxLength={2000} /><button type="submit" className="send" disabled={busy || !q.trim()} aria-label="Send"><Send size={15} /></button></form><div className="disclaimer"><ShieldCheck size={12} />{t.disclaimer}</div></section><div className="rail"><section className="card" id="checklist"><h3><ClipboardCheck size={16} />{t.checklist}<small>{items.filter(x => x.completed).length}/{items.length} {t.completed}</small></h3><p>Possible next steps · confirm applicability</p>{checkError && <div className="inline-error">Checklist unavailable. Check the backend and retry by reopening this workspace.</div>}{!checkError && items.length === 0 && <p>{t.noItems}</p>}{items.map(item => <label className="checkitem" key={item.id}><input type="checkbox" checked={item.completed} onChange={() => toggle(item)} /><span><b>{item.title}</b><small>{item.why}</small><small><strong>Authority:</strong> {item.authority}</small>{item.documents?.length > 0 && <small>{t.documents}: {item.documents.join(', ')}</small>}<small><strong>{t.procedure}:</strong> {item.procedure}</small>{item.url && <small><a href={item.url} target="_blank" rel="noreferrer">Official source <ExternalLink size={10} /></a></small>}<em>{item.status_label || (item.verification_status === 'needs_verification' ? t.unknown : t.official)}</em></span></label>)}</section><section className="card" id="sources"><h3><FileText size={16} />{t.sources}<small>{usedSources.length}</small></h3>{usedSources.length ? usedSources.map((s, i) => <div className="source-row" key={`${s.name}-${s.page}-${i}`}><b>{s.title || s.name}</b><small>{s.authority}{s.page ? ` · page ${s.page}` : ''}</small><em>{s.verified ? 'Curator verified' : t.verify}</em>{s.excerpt && <small className="source-excerpt">“{s.excerpt.slice(0,320)}{s.excerpt.length>320 ? "…" : ""}”</small>}{s.url && <a href={s.url} target="_blank" rel="noreferrer">{s.url} <ExternalLink size={10} /></a>}</div>) : <div className="notyet"><ShieldCheck size={14} />{t.noSources}<div>Source links are leads until the specific content is reviewed.</div></div>}</section><section className="card"><h3><ShieldCheck size={16} />Official source catalog<small>{catalogSources.length}</small></h3>{catalogSources.map((source, i) => <div className="source-row" key={`official-${source.name}-${i}`}><b>{source.title}</b><small>{source.authority}</small><em>{source.verified ? "Curator verified" : "Official link; content review needed"}</em>{source.url && <a href={source.url} target="_blank" rel="noreferrer">{source.url} <ExternalLink size={10} /></a>}</div>)}</section><div className="help"><b>Need help?</b><p>Check official sources and ask the responsible department to confirm what applies to your exact activity and location.</p><button onClick={() => setPage('setup')}>{t.details}<ArrowRight size={12} /></button></div></div></div><footer className="appfoot"><span>PERMITPATH AI · HYDERABAD</span><button onClick={() => setPage('setup')}>{t.back}</button></footer></section></div>}
  </>;
}

createRoot(document.getElementById('root')).render(<App />);
