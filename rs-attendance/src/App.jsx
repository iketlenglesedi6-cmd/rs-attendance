import { useState, useMemo, useEffect } from "react";

// ── Google Fonts ──
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap";
document.head.appendChild(fontLink);

const ALL_SISTERS = [
  "Adebayo, Deborah","Amuru, Valley Danis Melissa Amoh","Bantsimba, Jessica Joyce",
  "Bele, Tanganedzani Melba","Bezeya, Salina Anna","Budaza, Zandile Tisha",
  "Buthelezi, Mbali Patience","Chiakwaka, Princess","Cunningham, Johanna Maria",
  "Da-Costa, Mercy Sherone","Denesi, Amanda Nyasha","Dilebo, Fikelephi Rosemond",
  "Dlamini, Andiswa Sbahle Luthando","Dlamini, Ludo Nonhlanhla","Dlamini, Rose Sitholisile",
  "Doroh, Alexandra Tafadzwa","Dube, Lisa Lass","Eduardo, Landinha Antonio",
  "Eliza","Etuka, Yanga","Gamu, Tshepo","Ganakgomo, Reagile Bontle",
  "Gasela, Andile Deidre","Gcumeni, Asanda","Gobeni, Oluhle","Gobodo, Sisanda",
  "Gono, Lelethu","Gumede, Amahle Nicole","Gumpo, Angelica Betty Hanqiwe",
  "Gwebu, Khethabahle Ellen","Hewlett, Valencia","Hlongwa, Thingo Sinenhlanhla",
  "Hlongwane, Samelisiwe","Iketleng, Lesedi Pride","Jabanga, Kholosa Pumelela",
  "Jabavu, Sibulele","Jele, Natasha Tsolofelo Sifiso","Jiya, Lisoletu","Jones, Wendy",
  "Kalala, Liyema","Kamuche, Nomakhose","Khumalo, Khethiwe Sibusisiwe",
  "Khumalo, Siphilile","Kukuseni, Tatenda Deborah","Lamola, Molatelo Teballo Lynn",
  "Lara, Rethabile Andronica","Lau, Exaucee Miss","Lephone, Ketsiea Christina",
  "Lepota, Mpelegeng Helen","Lunga by, Fiona","Mabaso, Ntombizethu Hendriet",
  "Mabope, Amahle","Mabusela, Eden Jessica","Madamombe, Tariro","Madibe, Lesedi",
  "Maenetja, Nthabiseng Christar","Malaba, Princess Nobukhosi","Maleko, Velocity Sekao",
  "Malinga, Xeshalethu","Mashego, Dimpho","Maume, Blessing","Mavuma, Luyanda",
  "Mbangi, Faith","Mbuyisi, Nancy","Mdeni, Thembakazi","Mdunge, Katelyn M'boni",
  "MENZE, Nomthandazo Priscilla","Merveille","Mfanekiso, Avuyile","Mfuza, Noxolo Suzan",
  "Mgoma, Kopano Gladys","Mhlanzi, Sizakele Samantha Precious","Miaminel, Miami Sambin",
  "Miketu, Lukusa Carole","Mjiyakho, Zinhle Sbahle","Mkhize, Ayanda","Mkhize, Sanele",
  "Mlindazwe, Liyema Nomaswazi","Mncwabe, Nonhlanhla Purity Lethukuthula",
  "Mnyandu, Mbali Zelia","Mogale, Mmamoloko","Mogoboya, Makole Nazlene","Molefe, Palesa",
  "Mongatane, Norma Sally","Monkolot, Christelle Etemu","Monnahela, Refilwe",
  "Montjane, Dineo Prudence","Morapedi, Neo Lethabo","Moshani, Oesi Loretta Mmei",
  "Motsepe, Lesedi Faith","Moyo, Andile","Moyo, Gracious Nothando","Moyo, Privilege",
  "Mphahlele, Kgaugelo","Mpofu, Tendai","Mrulekana, Nomsa","Mtetwa, LittleAngel",
  "Mtselu, Noxolo Faith","Mukeba, Kapinga Sara","Mukeba, Tumba Rebecca",
  "Mutero, Tendayi Locadia","Mvura, Benhilda Tendai","Mwale, Emily Ayanda",
  "Mwale, Prudence Ashleigh","Mwale, Sgwili","Mwale, Wendy Aries","Myeni, Fisokuhle",
  "Myeni, Nondumiso","Nampiija, Mercy","Ncube, Livoniah","Ncube, Sympathy",
  "Ndaya, Mpoyi Generose","Ndlovu, Ncominkosi Favour","Ngakayane, Pelonomi Orateng",
  "Ngema, Njabulo","Nhleko, Sithembile","Nhlapo, Matshidiso","Nkabinde, Yamukela",
  "Nkosi, Nontobeko","Nkosi, Nqobile Pesevierance","Nomnyangwana, Solam",
  "Nozintaba, Hlumisa","Ntwe, Keitumetse","Ntwe, Pertunia Kebone","Nunge, Siphosethu",
  "Nxumalo, Bongiewe","Nyambira, Delight","Nyambira, Millicent","Nyandoro, Shalline Sekayi",
  "Nyathi, Tiffany Malaika","Nyathi, Winnie","Nzimande, Sbongiseni","Peter, Ubukho",
  "Phiri, Hannah","Phiri, Uspar Homeland","Phuthi, Anelisiwe","Rabonda, Shana-Michelle",
  "Radebe, Zinhle Sindisiwe","Rambau, Selaelo Cindy","Rantsane, Goodhope Bontle",
  "Ruchike, Mellisa Shamiso","Sefatsa, Nonhlanhla Lerato","Sibanda, Kimberly",
  "Sibanda, Vuyokazi Blanche","Sibindi, Buhle","Sinama, Sokhana","Soko, Ntokozo",
  "Solo, Mbuyi Ragina","Ssennyonga, Lillian","Tichareva, Taboka","Tobani, Asisipho",
  "Tshibanda, Ibaj Jemima Therese","Yolanda, Mvumbi",
];

const STATUS_OPTIONS = [
  { value:"member",      label:"Member",       emoji:"🌿", color:"#5C7A5C", bg:"#F0F5EE", desc:"Active ward member" },
  { value:"less_active", label:"Less active",  emoji:"🌸", color:"#8C6A4A", bg:"#FAF3EC", desc:"Returning / less active" },
  { value:"new_convert", label:"New convert",  emoji:"✨", color:"#7A6A3A", bg:"#FAF7EC", desc:"Baptised within 1 year" },
  { value:"investigator",label:"Investigator", emoji:"🕊️", color:"#5A6A7A", bg:"#EEF2F5", desc:"Learning about the Church" },
  { value:"visitor",     label:"Visitor",      emoji:"🤍", color:"#7A5A6A", bg:"#F5EEF2", desc:"Guest / friend" },
];

const USERS = {
  lesedi: { pin: "1830", name: "Sister Lesedi", role: "Secretary" },
  nancy:  { pin: "2004", name: "Sister Nancy",  role: "Assistant Secretary" },
};

// ── Design tokens ──
const C = {
  cream:    "#FAF7F2",
  beige:    "#F2EBE0",
  beige2:   "#E8DDD0",
  beige3:   "#D9CCBC",
  sage:     "#7A8C6E",
  sageDark: "#5C7A5C",
  sageLight:"#EEF2EB",
  gold:     "#B8963E",
  goldLight:"#F5EDD8",
  brown:    "#6B4F3A",
  brownLight:"#FAF0E8",
  text:     "#3A3228",
  textMid:  "#6B5E52",
  textSoft: "#9C8E82",
  white:    "#FFFCF8",
  shadow:   "rgba(90,70,50,0.08)",
};

const styles = {
  page: {
    fontFamily:"'Jost', sans-serif",
    background: C.cream,
    minHeight:"100vh",
    maxWidth:480,
    margin:"0 auto",
    padding:"0 0 3rem",
  },
  header: {
    background:`linear-gradient(160deg, ${C.beige} 0%, ${C.cream} 100%)`,
    borderBottom:`1px solid ${C.beige3}`,
    padding:"28px 24px 22px",
    position:"relative",
    overflow:"hidden",
  },
  headerWard: {
    fontFamily:"'Jost', sans-serif",
    fontSize:10,
    letterSpacing:"0.15em",
    textTransform:"uppercase",
    color:C.gold,
    marginBottom:6,
    fontWeight:500,
  },
  headerTitle: {
    fontFamily:"'Cormorant Garamond', serif",
    fontSize:28,
    fontWeight:300,
    color:C.text,
    lineHeight:1.2,
    marginBottom:4,
  },
  headerSub: {
    fontFamily:"'Jost', sans-serif",
    fontSize:12,
    color:C.textSoft,
    fontWeight:300,
  },
  card: {
    background:C.white,
    borderRadius:16,
    border:`1px solid ${C.beige2}`,
    boxShadow:`0 2px 12px ${C.shadow}`,
    padding:"20px 20px",
    margin:"0 16px 12px",
  },
  btn: {
    width:"100%",
    padding:"14px 20px",
    borderRadius:12,
    border:`1px solid ${C.beige3}`,
    background:C.white,
    cursor:"pointer",
    fontFamily:"'Jost', sans-serif",
    fontSize:14,
    color:C.text,
    fontWeight:400,
    transition:"all 0.15s",
  },
  btnPrimary: {
    background:`linear-gradient(135deg, ${C.sage} 0%, ${C.sageDark} 100%)`,
    border:"none",
    color:C.white,
    fontWeight:500,
    boxShadow:`0 3px 10px rgba(92,122,92,0.25)`,
  },
  btnGold: {
    background:`linear-gradient(135deg, ${C.gold} 0%, #9A7A2E 100%)`,
    border:"none",
    color:C.white,
    fontWeight:500,
    boxShadow:`0 3px 10px rgba(184,150,62,0.25)`,
  },
  input: {
    width:"100%",
    padding:"13px 16px",
    borderRadius:10,
    border:`1px solid ${C.beige3}`,
    background:C.white,
    fontFamily:"'Jost', sans-serif",
    fontSize:15,
    color:C.text,
    boxSizing:"border-box",
    outline:"none",
  },
  tag: (color, bg) => ({
    fontSize:11,
    padding:"3px 10px",
    borderRadius:20,
    background:bg,
    color:color,
    fontWeight:500,
    fontFamily:"'Jost', sans-serif",
    letterSpacing:"0.03em",
  }),
  divider: {
    height:1,
    background:`linear-gradient(90deg, transparent, ${C.beige3}, transparent)`,
    margin:"16px 0",
  },
};

function formatDate(d) {
  const [y,m,day] = d.split("-");
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  return `${parseInt(day)} ${months[parseInt(m)-1]} ${y}`;
}

function getTodayStr() { return new Date().toISOString().split("T")[0]; }
function getMonth(d) { return d.slice(0,7); }

// ── Decorative olive branch SVG ──
function OliveBranch({ style }) {
  return (
    <svg viewBox="0 0 120 40" style={{ opacity:0.12, position:"absolute", ...style }} fill={C.sage}>
      <path d="M10,20 Q30,5 60,20 Q90,35 110,20" stroke={C.sage} strokeWidth="1.5" fill="none"/>
      <ellipse cx="25" cy="13" rx="7" ry="4" transform="rotate(-20,25,13)"/>
      <ellipse cx="45" cy="17" rx="7" ry="4" transform="rotate(-10,45,17)"/>
      <ellipse cx="65" cy="22" rx="7" ry="4" transform="rotate(5,65,22)"/>
      <ellipse cx="85" cy="19" rx="7" ry="4" transform="rotate(-5,85,19)"/>
      <ellipse cx="100" cy="15" rx="6" ry="3.5" transform="rotate(-15,100,15)"/>
    </svg>
  );
}

// ── App icon SVG (for manifest) ──
function AppIcon() {
  return (
    <div style={{width:56,height:56,borderRadius:16,background:`linear-gradient(135deg,${C.beige} 0%,${C.cream} 100%)`,border:`1px solid ${C.beige3}`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 2px 8px ${C.shadow}`,flexShrink:0}}>
      <svg viewBox="0 0 40 40" width="32" height="32">
        <ellipse cx="20" cy="20" rx="12" ry="8" stroke={C.sage} strokeWidth="1.2" fill="none"/>
        <path d="M20,12 Q14,16 14,20 Q14,24 20,28 Q26,24 26,20 Q26,16 20,12Z" stroke={C.gold} strokeWidth="1" fill={C.goldLight} opacity="0.7"/>
        <circle cx="20" cy="20" r="2.5" fill={C.sage}/>
        <path d="M10,20 Q15,14 20,12" stroke={C.sage} strokeWidth="1" fill="none"/>
        <path d="M30,20 Q25,14 20,12" stroke={C.sage} strokeWidth="1" fill="none"/>
      </svg>
    </div>
  );
}

export default function App() {
  const [mode, setMode] = useState("home");
  const [currentUser, setCurrentUser] = useState(null);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [date, setDate] = useState(getTodayStr());
  const [attendance, setAttendance] = useState({});
  const [visitors, setVisitors] = useState([]);
  const [history, setHistory] = useState({});
  const [newVisitorName, setNewVisitorName] = useState("");
  const [newVisitorStatus, setNewVisitorStatus] = useState("visitor");
  const [checkinSearch, setCheckinSearch] = useState("");
  const [checkinStep, setCheckinStep] = useState("search");
  const [checkinName, setCheckinName] = useState("");
  const [secTab, setSecTab] = useState("overview");
  const [copied, setCopied] = useState(false);
  const [statsView, setStatsView] = useState("summary");
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    setFadeIn(false);
    setTimeout(() => setFadeIn(true), 50);
  }, [mode]);

  const presentMembers = Object.keys(attendance);
  const presentCount = presentMembers.length + visitors.length;

  const checkinFiltered = useMemo(() =>
    checkinSearch.length < 1 ? [] :
    ALL_SISTERS.filter(s => s.toLowerCase().includes(checkinSearch.toLowerCase())).slice(0, 8),
    [checkinSearch]
  );

  const grouped = STATUS_OPTIONS.map(opt => ({
    ...opt,
    sisters: [
      ...presentMembers.filter(s => attendance[s] === opt.value),
      ...(opt.value === "visitor" ? visitors : []),
    ]
  })).filter(g => g.sisters.length > 0);

  function handleCheckinSelect(name) {
    setCheckinName(name);
    setCheckinStep(attendance[name] ? "confirm" : "pick_status");
    setCheckinSearch("");
  }

  function confirmCheckin(status) {
    setAttendance(prev => ({ ...prev, [checkinName]: status }));
    setCheckinStep("confirm");
  }

  function resetCheckin() {
    setCheckinStep("search");
    setCheckinName("");
    setCheckinSearch("");
  }

  function addVisitor() {
    const n = newVisitorName.trim();
    if (!n) return;
    setVisitors(prev => [...prev, { name:n, status:newVisitorStatus, addedBy: currentUser?.name }]);
    setNewVisitorName("");
    setNewVisitorStatus("visitor");
  }

  function saveToHistory() {
    setHistory(prev => ({
      ...prev,
      [date]: { date, attendance:{...attendance}, visitors:[...visitors] }
    }));
  }

  function copySummary() {
    const lines = [
      `GATHER — Relief Society Attendance`,
      `Johannesburg YSA Ward  |  ${formatDate(date)}`,
      `Recorded by: ${currentUser?.name} (${currentUser?.role})`,
      `Total present: ${presentCount} / ${ALL_SISTERS.length}`,
      ``,
      `══ FOR LCR — Mark present ══`,
      ...presentMembers.map(s => `✓ ${s}`),
      ``,
      `══ BREAKDOWN ══`,
      ...grouped.map(g =>
        `${g.emoji} ${g.label} (${g.sisters.length}):\n${g.sisters.map(s=>`   • ${s.name||s}`).join("\n")}`
      ),
    ].join("\n");
    navigator.clipboard.writeText(lines);
    setCopied(true);
    saveToHistory();
    setTimeout(() => setCopied(false), 3000);
  }

  function buildStats() {
    const allRecords = Object.values(history);
    if (allRecords.length === 0) return null;
    const totalSundays = allRecords.length;
    const sisterStats = {};
    ALL_SISTERS.forEach(s => { sisterStats[s] = { attended:0, statuses:{} }; });
    allRecords.forEach(rec => {
      Object.entries(rec.attendance).forEach(([name, status]) => {
        if (!sisterStats[name]) sisterStats[name] = { attended:0, statuses:{} };
        sisterStats[name].attended++;
        sisterStats[name].statuses[status] = (sisterStats[name].statuses[status]||0)+1;
      });
    });
    const byMonth = {};
    allRecords.forEach(rec => {
      const m = getMonth(rec.date);
      if (!byMonth[m]) byMonth[m] = { total:0, member:0, new_convert:0, less_active:0, investigator:0, visitor:0 };
      byMonth[m].total += Object.keys(rec.attendance).length + rec.visitors.length;
      Object.values(rec.attendance).forEach(s => { byMonth[m][s]=(byMonth[m][s]||0)+1; });
      rec.visitors.forEach(v => { byMonth[m][v.status]=(byMonth[m][v.status]||0)+1; });
    });
    const avg = (allRecords.reduce((a,r)=>a+Object.keys(r.attendance).length+r.visitors.length,0)/totalSundays).toFixed(1);
    return {
      totalSundays, avgAttendance:avg, byMonth,
      mostFaithful: Object.entries(sisterStats).sort((a,b)=>b[1].attended-a[1].attended).slice(0,10),
      returningLessActive: Object.entries(sisterStats).filter(([,v])=>v.statuses["less_active"]>0).length,
      newConvertsAttended: Object.entries(sisterStats).filter(([,v])=>v.statuses["new_convert"]>0).length,
      investigatorsAttended: Object.entries(sisterStats).filter(([,v])=>v.statuses["investigator"]>0).length,
    };
  }

  function tryPin() {
    const user = Object.values(USERS).find(u => u.pin === pinInput);
    if (user) {
      setCurrentUser(user);
      setMode("secretary");
      setPinInput("");
      setPinError(false);
    } else {
      setPinError(true);
      setPinInput("");
    }
  }

  function resetWeek() {
    saveToHistory();
    setAttendance({});
    setVisitors([]);
    setCheckinSearch("");
    setCheckinStep("search");
    setDate(getTodayStr());
    setMode("home");
    setCurrentUser(null);
  }

  const pageStyle = {
    ...styles.page,
    opacity: fadeIn ? 1 : 0,
    transition: "opacity 0.2s ease",
  };

  // ══ HOME ══
  if (mode === "home") return (
    <div style={pageStyle}>
      <div style={{ ...styles.header, position:"relative" }}>
        <OliveBranch style={{ top:0, right:-10, width:160 }} />
        <div style={styles.headerWard}>Johannesburg YSA Ward</div>
        <div style={styles.headerTitle}>Gather</div>
        <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:14, fontStyle:"italic", color:C.textMid, marginBottom:2 }}>
          Relief Society
        </div>
        <div style={styles.headerSub}>{formatDate(date)}</div>
      </div>

      <div style={{ padding:"20px 16px 0" }}>
        <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:16, color:C.textMid, fontStyle:"italic", textAlign:"center", marginBottom:20 }}>
          "Charity never faileth" — 1 Corinthians 13:8
        </div>

        <button onClick={()=>setMode("checkin")} style={{ ...styles.btn, ...styles.btnPrimary, marginBottom:10, padding:"18px 20px", textAlign:"left", display:"flex", alignItems:"center", gap:14 }}>
          <div style={{ width:42, height:42, borderRadius:12, background:"rgba(255,255,255,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>🌿</div>
          <div>
            <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:18, fontWeight:500, marginBottom:2 }}>Sister Check-In</div>
            <div style={{ fontSize:12, opacity:0.85, fontWeight:300 }}>Find your name & mark yourself present</div>
          </div>
        </button>

        <button onClick={()=>setMode("pinentry")} style={{ ...styles.btn, marginBottom:16, padding:"18px 20px", textAlign:"left", display:"flex", alignItems:"center", gap:14 }}>
          <div style={{ width:42, height:42, borderRadius:12, background:C.beige, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>🔐</div>
          <div>
            <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:18, color:C.text, marginBottom:2 }}>Secretary Access</div>
            <div style={{ fontSize:12, color:C.textSoft, fontWeight:300 }}>Records, reports & attendance history</div>
          </div>
        </button>

        {presentCount > 0 && (
          <div style={{ ...styles.card, margin:"0 0 12px", background:C.sageLight, border:`1px solid ${C.beige3}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div>
              <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:20, color:C.sageDark, fontWeight:500 }}>{presentCount} sisters present</div>
              <div style={{ fontSize:12, color:C.sage, fontWeight:300 }}>today</div>
            </div>
            <div style={{ fontSize:22 }}>🌿</div>
          </div>
        )}

        <div style={styles.divider}/>

        <div style={{ display:"flex", gap:6, flexWrap:"wrap", justifyContent:"center" }}>
          {STATUS_OPTIONS.map(o=>(
            <span key={o.value} style={styles.tag(o.color, o.bg)}>{o.emoji} {o.label}</span>
          ))}
        </div>
      </div>
    </div>
  );

  // ══ SISTER CHECK-IN ══
  if (mode === "checkin") return (
    <div style={pageStyle}>
      <div style={{ ...styles.header }}>
        <OliveBranch style={{ top:0, right:-10, width:140 }}/>
        <button onClick={()=>{resetCheckin();setMode("home");}} style={{ background:"none", border:"none", color:C.textMid, fontSize:20, cursor:"pointer", padding:0, marginBottom:10, display:"block" }}>←</button>
        <div style={styles.headerTitle}>Check In</div>
        <div style={styles.headerSub}>Search your surname and tap your name</div>
      </div>

      <div style={{ padding:"20px 16px 0" }}>

        {checkinStep === "confirm" && (
          <div style={{ ...styles.card, textAlign:"center", background:C.sageLight, border:`1px solid ${C.beige3}` }}>
            <div style={{ fontSize:40, marginBottom:12 }}>✦</div>
            <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:24, color:C.sageDark, fontWeight:500, marginBottom:4 }}>
              Welcome, Sister {checkinName.split(",")[0]}
            </div>
            <div style={{ fontSize:13, color:C.sage, fontStyle:"italic", marginBottom:14 }}>
              We are glad you are here today
            </div>
            {(() => { const st = STATUS_OPTIONS.find(s=>s.value===(attendance[checkinName]||"member")); return st ? <span style={styles.tag(st.color,st.bg)}>{st.emoji} {st.label}</span> : null; })()}
            <div style={styles.divider}/>
            <button onClick={resetCheckin} style={{ ...styles.btn, ...styles.btnPrimary, marginTop:4 }}>Check in another sister</button>
          </div>
        )}

        {checkinStep === "pick_status" && (
          <div>
            <div style={{ ...styles.card, marginBottom:0 }}>
              <div style={{ fontSize:12, color:C.textSoft, marginBottom:4, fontWeight:300 }}>Checking in</div>
              <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:20, color:C.text }}>{checkinName}</div>
            </div>
            <div style={{ padding:"16px 0 10px", fontFamily:"'Cormorant Garamond', serif", fontSize:17, color:C.textMid, fontStyle:"italic", textAlign:"center" }}>
              How would you describe yourself today?
            </div>
            {STATUS_OPTIONS.map(opt=>(
              <button key={opt.value} onClick={()=>confirmCheckin(opt.value)}
                style={{ ...styles.btn, marginBottom:8, padding:"14px 18px", display:"flex", alignItems:"center", gap:14, background:opt.bg, borderColor:opt.color+"44" }}>
                <span style={{ fontSize:22 }}>{opt.emoji}</span>
                <div style={{ textAlign:"left" }}>
                  <div style={{ fontSize:14, fontWeight:500, color:opt.color, fontFamily:"'Jost',sans-serif" }}>{opt.label}</div>
                  <div style={{ fontSize:12, color:opt.color, opacity:0.7, fontWeight:300 }}>{opt.desc}</div>
                </div>
              </button>
            ))}
            <button onClick={resetCheckin} style={{ ...styles.btn, marginTop:4, color:C.textSoft, fontSize:13 }}>← Back to search</button>
          </div>
        )}

        {checkinStep === "search" && (
          <>
            <input
              placeholder="Type your surname…"
              value={checkinSearch}
              onChange={e=>setCheckinSearch(e.target.value)}
              autoFocus
              style={{ ...styles.input, marginBottom:14, fontSize:16, borderColor: checkinSearch ? C.sage : C.beige3 }}
            />
            {checkinSearch.length > 0 && checkinFiltered.length === 0 && (
              <div style={{ textAlign:"center", color:C.textSoft, fontSize:13, padding:"1.5rem 0", fontStyle:"italic", fontFamily:"'Cormorant Garamond',serif" }}>
                Name not found — please see the secretary
              </div>
            )}
            {checkinFiltered.map(name => {
              const alreadyIn = !!attendance[name];
              const st = alreadyIn ? STATUS_OPTIONS.find(s=>s.value===attendance[name]) : null;
              return (
                <div key={name} onClick={()=>handleCheckinSelect(name)}
                  style={{ padding:"14px 18px", borderRadius:12, marginBottom:8, cursor:"pointer",
                    border:`1px solid ${alreadyIn ? C.sage : C.beige2}`,
                    background: alreadyIn ? C.sageLight : C.white,
                    display:"flex", alignItems:"center", justifyContent:"space-between",
                    boxShadow:`0 1px 4px ${C.shadow}` }}>
                  <span style={{ fontSize:15, color: alreadyIn ? C.sageDark : C.text, fontWeight: alreadyIn ? 500 : 400 }}>{name}</span>
                  {alreadyIn && st
                    ? <span style={styles.tag(st.color,st.bg)}>{st.emoji} Checked in</span>
                    : <span style={{ fontSize:12, color:C.textSoft }}>Tap →</span>}
                </div>
              );
            })}
            {presentCount > 0 && (
              <div style={{ textAlign:"center", fontSize:12, color:C.textSoft, marginTop:16, fontStyle:"italic", fontFamily:"'Cormorant Garamond',serif" }}>
                {presentCount} sister{presentCount!==1?"s":""} present today
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );

  // ══ PIN ENTRY ══
  if (mode === "pinentry") return (
    <div style={pageStyle}>
      <div style={styles.header}>
        <OliveBranch style={{ top:0, right:-10, width:140 }}/>
        <button onClick={()=>{setPinInput("");setPinError(false);setMode("home");}} style={{ background:"none", border:"none", color:C.textMid, fontSize:20, cursor:"pointer", padding:0, marginBottom:10, display:"block" }}>←</button>
        <div style={styles.headerTitle}>Secretary</div>
        <div style={styles.headerSub}>Enter your personal PIN to continue</div>
      </div>

      <div style={{ padding:"32px 16px 0", textAlign:"center" }}>
        <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:15, color:C.textMid, fontStyle:"italic", marginBottom:28 }}>
          Who is signing in?
        </div>
        <div style={{ display:"flex", gap:10, justifyContent:"center", marginBottom:24 }}>
          {Object.entries(USERS).map(([key, u]) => (
            <button key={key} onClick={()=>setSelectedUser(key)}
              style={{ ...styles.btn, width:"auto", flex:1, padding:"12px 16px",
                background: selectedUser===key ? C.sageLight : C.white,
                border:`1px solid ${selectedUser===key ? C.sage : C.beige3}`,
                color: selectedUser===key ? C.sageDark : C.textMid }}>
              <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:16 }}>{u.name}</div>
              <div style={{ fontSize:11, fontWeight:300, marginTop:2 }}>{u.role}</div>
            </button>
          ))}
        </div>

        <div style={{ display:"flex", gap:10, justifyContent:"center", marginBottom:12 }}>
          {[0,1,2,3].map(i=>(
            <div key={i} style={{ width:46, height:46, borderRadius:12,
              border:`1.5px solid ${pinInput.length>i ? C.sage : C.beige3}`,
              background: pinInput.length>i ? C.sageLight : C.white,
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:20, color:C.sage, transition:"all 0.15s" }}>
              {pinInput.length>i ? "•" : ""}
            </div>
          ))}
        </div>

        {pinError && (
          <div style={{ fontSize:13, color:"#9A4A3A", marginBottom:12, fontStyle:"italic", fontFamily:"'Cormorant Garamond',serif" }}>
            Incorrect PIN — please try again
          </div>
        )}

        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, maxWidth:220, margin:"0 auto" }}>
          {[1,2,3,4,5,6,7,8,9,"",0,"⌫"].map((k,i)=>(
            <button key={i} onClick={()=>{
              if(k==="⌫"){setPinInput(p=>p.slice(0,-1));setPinError(false);}
              else if(k!==""){
                const next=pinInput+k;
                setPinInput(next);
                if(next.length===4){
                  setTimeout(()=>{
                    const user = Object.values(USERS).find(u=>u.pin===next);
                    if(user){setCurrentUser(user);setMode("secretary");setPinInput("");setPinError(false);}
                    else{setPinError(true);setPinInput("");}
                  },100);
                }
              }
            }} style={{ height:50, borderRadius:10,
              fontSize: k==="⌫" ? 18 : 20,
              fontWeight:400,
              background: k==="" ? "transparent" : C.white,
              border: k==="" ? "none" : `1px solid ${C.beige3}`,
              color:C.text, cursor: k===""?"default":"pointer",
              fontFamily:"'Jost',sans-serif",
              boxShadow: k==="" ? "none" : `0 1px 3px ${C.shadow}` }}>
              {k}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // ══ SECRETARY VIEW ══
  if (mode === "secretary") {
    const stats = buildStats();
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    return (
      <div style={pageStyle}>
        <div style={{ ...styles.header }}>
          <OliveBranch style={{ top:0, right:-10, width:140 }}/>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
            <div>
              <div style={styles.headerWard}>{currentUser?.role}</div>
              <div style={styles.headerTitle}>{currentUser?.name.replace("Sister ","")}</div>
              <div style={styles.headerSub}>{formatDate(date)} · {presentCount} present</div>
            </div>
            <button onClick={()=>{setMode("home");setCurrentUser(null);}}
              style={{ background:C.beige2, border:"none", borderRadius:8, color:C.textMid, fontSize:12, padding:"6px 12px", cursor:"pointer", fontFamily:"'Jost',sans-serif", marginTop:4 }}>
              Sign out
            </button>
          </div>
        </div>

        <div style={{ overflowX:"auto", display:"flex", gap:6, padding:"14px 16px 0", paddingBottom:2 }}>
          {[["overview","Overview"],["visitors","Add Visitor"],["lcr","LCR Export"],["stats","Statistics"],["newweek","New Week"]].map(([tab,label])=>(
            <button key={tab} onClick={()=>setSecTab(tab)} style={{ flexShrink:0, padding:"7px 14px", borderRadius:20, fontSize:12,
              border:`1px solid ${secTab===tab ? C.sage : C.beige3}`,
              background: secTab===tab ? C.sageLight : C.white,
              color: secTab===tab ? C.sageDark : C.textSoft,
              fontWeight: secTab===tab ? 500 : 400,
              cursor:"pointer", fontFamily:"'Jost',sans-serif" }}>
              {label}
            </button>
          ))}
        </div>

        <div style={{ padding:"14px 16px 0" }}>

          {secTab==="overview" && (
            <div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginBottom:14 }}>
                {[
                  {label:"Present",val:presentCount,bg:C.sageLight,col:C.sageDark},
                  {label:"Members",val:presentMembers.filter(s=>attendance[s]==="member").length,bg:C.sageLight,col:C.sage},
                  {label:"Special",val:presentMembers.filter(s=>["new_convert","less_active","investigator"].includes(attendance[s])).length+visitors.length,bg:C.goldLight,col:C.gold},
                ].map(c=>(
                  <div key={c.label} style={{ background:c.bg, borderRadius:12, padding:"12px", textAlign:"center", border:`1px solid ${C.beige2}` }}>
                    <div style={{ fontSize:10, color:c.col, marginBottom:4, letterSpacing:"0.05em", textTransform:"uppercase", fontWeight:500 }}>{c.label}</div>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:28, color:c.col }}>{c.val}</div>
                  </div>
                ))}
              </div>
              {grouped.length===0 && (
                <div style={{ textAlign:"center", color:C.textSoft, fontSize:14, padding:"3rem 0", fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic" }}>
                  No sisters have checked in yet today
                </div>
              )}
              {grouped.map(g=>(
                <div key={g.value} style={{ marginBottom:14 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                    <span style={styles.tag(g.color,g.bg)}>{g.emoji} {g.label} · {g.sisters.length}</span>
                  </div>
                  {g.sisters.map((s,i)=>(
                    <div key={i} style={{ fontSize:13, padding:"8px 14px", borderLeft:`2px solid ${g.color}44`, marginBottom:3, background:C.white, borderRadius:"0 8px 8px 0", color:C.text, display:"flex", justifyContent:"space-between", alignItems:"center", boxShadow:`0 1px 3px ${C.shadow}` }}>
                      <span>{s.name||s}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {secTab==="visitors" && (
            <div>
              <div style={styles.card}>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, color:C.text, marginBottom:14 }}>Add a visitor or guest</div>
                <input placeholder="Full name" value={newVisitorName} onChange={e=>setNewVisitorName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addVisitor()}
                  style={{ ...styles.input, marginBottom:10 }}/>
                <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:14 }}>
                  {STATUS_OPTIONS.map(opt=>(
                    <button key={opt.value} onClick={()=>setNewVisitorStatus(opt.value)}
                      style={{ ...styles.btn, width:"auto", padding:"5px 12px", fontSize:12,
                        background: newVisitorStatus===opt.value ? opt.bg : C.white,
                        border:`1px solid ${newVisitorStatus===opt.value ? opt.color : C.beige3}`,
                        color: newVisitorStatus===opt.value ? opt.color : C.textSoft }}>
                      {opt.emoji} {opt.label}
                    </button>
                  ))}
                </div>
                <button onClick={addVisitor} style={{ ...styles.btn, ...styles.btnPrimary }}>Add to today's attendance</button>
              </div>
              {visitors.map((v,i)=>{
                const st=STATUS_OPTIONS.find(s=>s.value===v.status)||STATUS_OPTIONS[4];
                return (
                  <div key={i} style={{ ...styles.card, display:"flex", alignItems:"center", padding:"12px 16px" }}>
                    <span style={{ flex:1, fontSize:14, color:C.text }}>{v.name}</span>
                    <span style={{ ...styles.tag(st.color,st.bg), marginRight:10 }}>{st.emoji} {st.label}</span>
                    <button onClick={()=>setVisitors(p=>p.filter((_,idx)=>idx!==i))} style={{ background:"none", border:"none", color:C.textSoft, cursor:"pointer", fontSize:16 }}>✕</button>
                  </div>
                );
              })}
            </div>
          )}

          {secTab==="lcr" && (
            <div>
              <div style={{ ...styles.card, background:"#EEF2F8", border:`1px solid #C8D4E8` }}>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:17, color:"#3A4A6A", marginBottom:8 }}>How to update LCR</div>
                <div style={{ fontSize:12, color:"#4A5A7A", lineHeight:1.9, fontWeight:300 }}>
                  1. Tap <b>Copy list</b> below<br/>
                  2. Open LCR → Reports &amp; Forms → Attendance<br/>
                  3. Select <b>Relief Society</b> and today's date<br/>
                  4. Mark each sister as present<br/>
                  5. Save ✓
                </div>
              </div>
              <div style={styles.card}>
                <div style={{ fontSize:11, color:C.textSoft, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:10, fontWeight:500 }}>
                  Present today — {formatDate(date)}
                </div>
                {grouped.map(g=>(
                  <div key={g.value} style={{ marginBottom:12 }}>
                    <span style={{ ...styles.tag(g.color,g.bg), display:"inline-block", marginBottom:6 }}>{g.emoji} {g.label} ({g.sisters.length})</span>
                    {g.sisters.map((s,i)=>(
                      <div key={i} style={{ fontSize:13, color:C.text, padding:"4px 12px", borderLeft:`2px solid ${g.color}44`, marginBottom:2, background:C.cream, borderRadius:"0 6px 6px 0" }}>
                        {s.name||s}
                      </div>
                    ))}
                  </div>
                ))}
                {presentCount===0 && <div style={{ fontSize:13, color:C.textSoft, fontStyle:"italic" }}>No attendance recorded yet</div>}
              </div>
              <button onClick={copySummary} style={{ ...styles.btn, ...(copied ? {...styles.btnPrimary, background:C.sageDark} : styles.btnGold), padding:16, fontSize:15 }}>
                {copied ? "✓ Copied & saved" : "Copy list for LCR"}
              </button>
            </div>
          )}

          {secTab==="stats" && (
            <div>
              {!stats ? (
                <div style={{ textAlign:"center", padding:"3rem 0" }}>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, color:C.textMid, fontStyle:"italic", marginBottom:8 }}>Your records will grow here</div>
                  <div style={{ fontSize:13, color:C.textSoft, fontWeight:300 }}>Stats appear as you record each Sunday and copy to LCR</div>
                </div>
              ) : (
                <>
                  <div style={{ display:"flex", gap:6, marginBottom:14 }}>
                    {[["summary","Summary"],["monthly","Monthly"],["sisters","Sisters"]].map(([v,l])=>(
                      <button key={v} onClick={()=>setStatsView(v)} style={{ flex:1, padding:"7px 0", borderRadius:20, fontSize:12,
                        border:`1px solid ${statsView===v ? C.sage : C.beige3}`,
                        background: statsView===v ? C.sageLight : C.white,
                        color: statsView===v ? C.sageDark : C.textSoft,
                        cursor:"pointer", fontFamily:"'Jost',sans-serif" }}>
                        {l}
                      </button>
                    ))}
                  </div>
                  {statsView==="summary" && (
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                      {[
                        {label:"Sundays recorded",val:stats.totalSundays,bg:C.sageLight,col:C.sageDark},
                        {label:"Avg attendance",val:stats.avgAttendance,bg:C.sageLight,col:C.sageDark},
                        {label:"Less active returned",val:stats.returningLessActive,bg:C.brownLight,col:C.brown},
                        {label:"New converts",val:stats.newConvertsAttended,bg:C.goldLight,col:C.gold},
                        {label:"Investigators",val:stats.investigatorsAttended,bg:"#EEF2F5",col:"#5A6A7A"},
                      ].map((c,i)=>(
                        <div key={i} style={{ background:c.bg, borderRadius:12, padding:"14px", border:`1px solid ${C.beige2}` }}>
                          <div style={{ fontSize:10, color:c.col, textTransform:"uppercase", letterSpacing:"0.08em", fontWeight:500, marginBottom:6 }}>{c.label}</div>
                          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:28, color:c.col }}>{c.val}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  {statsView==="monthly" && Object.entries(stats.byMonth).sort().map(([m,data])=>(
                    <div key={m} style={{ ...styles.card, marginBottom:8, padding:"14px 16px" }}>
                      <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:17, color:C.text, marginBottom:8 }}>
                        {months[parseInt(m.split("-")[1])-1]} {m.split("-")[0]}
                        <span style={{ fontSize:12, color:C.textSoft, marginLeft:8, fontFamily:"'Jost',sans-serif", fontWeight:300 }}>· {data.total} total</span>
                      </div>
                      <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                        {STATUS_OPTIONS.map(opt=>data[opt.value]>0&&(
                          <span key={opt.value} style={styles.tag(opt.color,opt.bg)}>{opt.emoji} {opt.label}: {data[opt.value]}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                  {statsView==="sisters" && (
                    <div>
                      <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:16, color:C.textMid, fontStyle:"italic", marginBottom:12 }}>Most faithful attenders</div>
                      {stats.mostFaithful.map(([name,data],i)=>(
                        <div key={name} style={{ display:"flex", alignItems:"center", padding:"10px 14px", borderRadius:10, marginBottom:6, background:C.white, border:`1px solid ${C.beige2}`, boxShadow:`0 1px 3px ${C.shadow}` }}>
                          <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:16, color:C.gold, width:28 }}>#{i+1}</span>
                          <span style={{ flex:1, fontSize:14, color:C.text }}>{name.split(",")[0]}</span>
                          <span style={{ fontSize:13, color:C.sage, fontWeight:500 }}>{data.attended}×</span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {secTab==="newweek" && (
            <div style={{ textAlign:"center", padding:"1rem 0" }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24, color:C.textMid, fontStyle:"italic", marginBottom:6 }}>Start a new week</div>
              <div style={{ fontSize:13, color:C.textSoft, marginBottom:24, fontWeight:300 }}>Today's record will be saved before clearing. Ensure you have already copied to LCR.</div>
              <input type="date" value={date} onChange={e=>setDate(e.target.value)}
                style={{ ...styles.input, marginBottom:16, textAlign:"center" }}/>
              <button onClick={resetWeek} style={{ ...styles.btn, background:"#FAF0EE", color:"#9A4A3A", border:`1px solid #E8C4BC`, padding:14, fontSize:14 }}>
                Save & clear for next Sunday
              </button>
            </div>
          )}

        </div>
      </div>
    );
  }
  return null;
}