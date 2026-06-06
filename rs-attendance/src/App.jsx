import { useState, useMemo } from "react";

const ALL_SISTERS = [
  "Adebayo, Deborah","Amuru, Valley Danis Melissa Amoh","Bantsimba, Jessica Joyce",
  "Bele, Tanganedzani Melba","Bezeya, Salina Anna","Budaza, Zandile Tisha",
  "Buthelezi, Mbali Patience","Chiakwaka, Princess","Cunningham, Johanna Maria",
  "Da-Costa, Mercy Sherone","Denesi, Amanda Nyasha","Dilebo, Fikelephi Rosemond",
  "Dlamini, Andiswa Sbahle Luthando","Dlamini, Ludo Nonhlanhla","Dlamini, Rose Sitholisile",
  "Doroh, Alexandra Tafadzwa","Dube, Lass Lisa","Eduardo, Landinha Antonio",
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
  { value: "member",      label: "Member",       emoji: "🟢", color: "#1B6B5A", bg: "#E1F5EE", desc: "Active ward member" },
  { value: "less_active", label: "Less active",  emoji: "🟡", color: "#854F0B", bg: "#FAEEDA", desc: "Returning / less active" },
  { value: "new_convert", label: "New convert",  emoji: "⭐", color: "#185FA5", bg: "#E6F1FB", desc: "Baptised within 1 year" },
  { value: "investigator",label: "Investigator", emoji: "🔵", color: "#534AB7", bg: "#EEEDFE", desc: "Learning about the Church" },
  { value: "visitor",     label: "Visitor",      emoji: "🟣", color: "#6B3A6B", bg: "#F5EEFE", desc: "Guest / friend" },
];

const SECRETARY_PIN = "1830";
const TEAL = "#1B6B5A";
const LIGHT_TEAL = "#E1F5EE";

function formatDate(d) {
  const [y, m, day] = d.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${day} ${months[parseInt(m)-1]} ${y}`;
}

function getTodayStr() { return new Date().toISOString().split("T")[0]; }

function getWeekKey(d) {
  const date = new Date(d);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? 0 : -day + 0);
  const sunday = new Date(date.setDate(diff));
  return sunday.toISOString().split("T")[0];
}

function getMonth(d) { return d.slice(0, 7); }

export default function App() {
  const [mode, setMode] = useState("home");
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const [date, setDate] = useState(getTodayStr());

  // attendance: { name: statusValue }
  const [attendance, setAttendance] = useState({});
  // visitors: [{ name, status }]
  const [visitors, setVisitors] = useState([]);
  // history: { "YYYY-MM-DD": { date, attendance: {name:status}, visitors:[{name,status}] } }
  const [history, setHistory] = useState({});

  const [newVisitorName, setNewVisitorName] = useState("");
  const [newVisitorStatus, setNewVisitorStatus] = useState("visitor");
  const [checkinSearch, setCheckinSearch] = useState("");
  const [checkinStep, setCheckinStep] = useState("search"); // search | pick_status | confirm
  const [checkinName, setCheckinName] = useState("");
  const [secTab, setSecTab] = useState("overview");
  const [copied, setCopied] = useState(false);
  const [statsView, setStatsView] = useState("summary");

  const presentMembers = Object.keys(attendance);
  const presentCount = presentMembers.length + visitors.length;

  const checkinFiltered = useMemo(() =>
    checkinSearch.length < 1 ? [] :
    ALL_SISTERS.filter(s => s.toLowerCase().includes(checkinSearch.toLowerCase())).slice(0, 8),
    [checkinSearch]
  );

  function handleCheckinSelect(name) {
    if (attendance[name]) {
      setCheckinName(name);
      setCheckinStep("confirm");
    } else {
      setCheckinName(name);
      setCheckinStep("pick_status");
    }
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
    setVisitors(prev => [...prev, { name: n, status: newVisitorStatus }]);
    setNewVisitorName("");
    setNewVisitorStatus("visitor");
  }

  function saveToHistory() {
    setHistory(prev => ({
      ...prev,
      [date]: { date, attendance: { ...attendance }, visitors: [...visitors] }
    }));
  }

  function copySummary() {
    const grouped = STATUS_OPTIONS.map(opt => ({
      ...opt,
      sisters: [
        ...presentMembers.filter(s => attendance[s] === opt.value),
        ...(opt.value === "visitor" ? visitors : []),
      ]
    })).filter(g => g.sisters.length > 0);

    const lines = [
      `RS ATTENDANCE — ${formatDate(date)}`,
      `Johannesburg YSA Ward Relief Society`,
      `Total present: ${presentCount} / ${ALL_SISTERS.length} on register`,
      ``,
      `══ FOR LCR — Mark these sisters present ══`,
      ...presentMembers.map(s => `✓ ${s}`),
      ...(visitors.filter(v => ALL_SISTERS.includes(v.name)).map(v => `✓ ${v.name}`)),
      ``,
      `══ CATEGORISED BREAKDOWN ══`,
      ...grouped.map(g =>
        `${g.emoji} ${g.label.toUpperCase()} (${g.sisters.length}):\n${g.sisters.map(s => `   • ${s.name || s}`).join("\n")}`
      ),
      ``,
      `Recorded by: Sister Lesedi (RS Secretary)`,
    ].join("\n");

    navigator.clipboard.writeText(lines);
    setCopied(true);
    saveToHistory();
    setTimeout(() => setCopied(false), 3000);
  }

  // ── YEAR-END STATS ──
  function buildStats() {
    const allRecords = Object.values(history);
    if (allRecords.length === 0) return null;

    const totalSundays = allRecords.length;
    const sisterStats = {};

    ALL_SISTERS.forEach(s => {
      sisterStats[s] = { attended: 0, statuses: {} };
    });

    allRecords.forEach(rec => {
      Object.entries(rec.attendance).forEach(([name, status]) => {
        if (!sisterStats[name]) sisterStats[name] = { attended: 0, statuses: {} };
        sisterStats[name].attended++;
        sisterStats[name].statuses[status] = (sisterStats[name].statuses[status] || 0) + 1;
      });
    });

    const byMonth = {};
    allRecords.forEach(rec => {
      const m = getMonth(rec.date);
      if (!byMonth[m]) byMonth[m] = { total: 0, member: 0, new_convert: 0, less_active: 0, investigator: 0, visitor: 0 };
      const cnt = Object.keys(rec.attendance).length + rec.visitors.length;
      byMonth[m].total += cnt;
      Object.values(rec.attendance).forEach(s => { byMonth[m][s] = (byMonth[m][s] || 0) + 1; });
      rec.visitors.forEach(v => { byMonth[m][v.status] = (byMonth[m][v.status] || 0) + 1; });
    });

    const avgAttendance = (allRecords.reduce((a, r) => a + Object.keys(r.attendance).length + r.visitors.length, 0) / totalSundays).toFixed(1);
    const mostFaithful = Object.entries(sisterStats).sort((a,b) => b[1].attended - a[1].attended).slice(0,10);
    const returningLessActive = Object.entries(sisterStats).filter(([,v]) => v.statuses["less_active"] > 0).length;
    const newConvertsAttended = Object.entries(sisterStats).filter(([,v]) => v.statuses["new_convert"] > 0).length;
    const investigatorsAttended = Object.entries(sisterStats).filter(([,v]) => v.statuses["investigator"] > 0).length;

    return { totalSundays, avgAttendance, byMonth, mostFaithful, returningLessActive, newConvertsAttended, investigatorsAttended, sisterStats };
  }

  function tryPin() {
    if (pin === SECRETARY_PIN) { setMode("secretary"); setPin(""); setPinError(false); }
    else { setPinError(true); setPin(""); }
  }

  function resetWeek() {
    saveToHistory();
    setAttendance({});
    setVisitors([]);
    setCheckinSearch("");
    setCheckinStep("search");
    setDate(getTodayStr());
    setMode("home");
  }

  const grouped = STATUS_OPTIONS.map(opt => ({
    ...opt,
    sisters: [
      ...presentMembers.filter(s => attendance[s] === opt.value),
      ...(opt.value === "visitor" ? visitors : []),
    ]
  })).filter(g => g.sisters.length > 0);

  // ══ HOME ══
  if (mode === "home") return (
    <div style={{fontFamily:"Arial,sans-serif",maxWidth:480,margin:"0 auto",padding:"0 0 2rem"}}>
      <div style={{background:TEAL,borderRadius:12,padding:"18px 20px",marginBottom:20}}>
        <div style={{color:"#9FE1CB",fontSize:11,letterSpacing:1,textTransform:"uppercase",marginBottom:4}}>Johannesburg YSA Ward</div>
        <div style={{color:"#fff",fontSize:20,fontWeight:500}}>Relief Society Attendance</div>
        <div style={{color:"#9FE1CB",fontSize:13,marginTop:2}}>{formatDate(date)}</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
        <button onClick={()=>setMode("checkin")} style={{background:LIGHT_TEAL,border:`2px solid ${TEAL}`,borderRadius:12,padding:"22px 16px",cursor:"pointer",textAlign:"left"}}>
          <div style={{fontSize:28,marginBottom:8}}>🙋‍♀️</div>
          <div style={{fontSize:15,fontWeight:500,color:TEAL}}>Sister check-in</div>
          <div style={{fontSize:12,color:"#0F6E56",marginTop:4}}>Find your name & select your status</div>
        </button>
        <button onClick={()=>setMode("pinentry")} style={{background:"var(--color-background-secondary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:12,padding:"22px 16px",cursor:"pointer",textAlign:"left"}}>
          <div style={{fontSize:28,marginBottom:8}}>🔐</div>
          <div style={{fontSize:15,fontWeight:500,color:"var(--color-text-primary)"}}>Secretary</div>
          <div style={{fontSize:12,color:"var(--color-text-secondary)",marginTop:4}}>Records, LCR copy & year-end stats</div>
        </button>
      </div>
      {presentCount > 0 && (
        <div style={{background:LIGHT_TEAL,borderRadius:10,padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontSize:14,color:TEAL,fontWeight:500}}>{presentCount} sister{presentCount!==1?"s":""} checked in</span>
          <div style={{display:"flex",gap:6}}>
            {STATUS_OPTIONS.filter(o => grouped.find(g=>g.value===o.value)).map(o=>(
              <span key={o.value} title={o.label} style={{fontSize:16}}>{o.emoji}</span>
            ))}
          </div>
        </div>
      )}
      <div style={{marginTop:12,display:"flex",gap:6,flexWrap:"wrap"}}>
        {STATUS_OPTIONS.map(o=>(
          <span key={o.value} style={{fontSize:11,padding:"3px 10px",borderRadius:12,background:o.bg,color:o.color,fontWeight:500}}>
            {o.emoji} {o.label}
          </span>
        ))}
      </div>
    </div>
  );

  // ══ SISTER CHECK-IN ══
  if (mode === "checkin") return (
    <div style={{fontFamily:"Arial,sans-serif",maxWidth:480,margin:"0 auto",padding:"0 0 2rem"}}>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20,paddingTop:4}}>
        <button onClick={()=>{setCheckinSearch("");setCheckinStep("search");setMode("home");}} style={{background:"none",border:"none",fontSize:22,cursor:"pointer",color:"var(--color-text-secondary)",padding:0}}>←</button>
        <div>
          <div style={{fontSize:16,fontWeight:500,color:"var(--color-text-primary)"}}>Sister check-in</div>
          <div style={{fontSize:12,color:"var(--color-text-secondary)"}}>Search your name, tap it, then choose your status</div>
        </div>
      </div>

      {/* CONFIRM SCREEN */}
      {checkinStep === "confirm" && (
        <div style={{background:LIGHT_TEAL,border:`2px solid ${TEAL}`,borderRadius:12,padding:"24px 20px",textAlign:"center",marginBottom:16}}>
          <div style={{fontSize:36,marginBottom:8}}>✅</div>
          <div style={{fontSize:17,fontWeight:500,color:TEAL}}>Welcome, Sister!</div>
          <div style={{fontSize:14,color:"#0F6E56",marginTop:4}}>{checkinName.split(",")[0]}</div>
          <div style={{marginTop:10}}>
            {(() => { const st = STATUS_OPTIONS.find(s=>s.value===(attendance[checkinName]||"member")); return st ? <span style={{fontSize:12,padding:"3px 12px",borderRadius:12,background:st.bg,color:st.color,fontWeight:500}}>{st.emoji} {st.label}</span> : null; })()}
          </div>
          <div style={{fontSize:12,color:"#0F6E56",marginTop:10}}>Your attendance has been recorded</div>
          <button onClick={resetCheckin} style={{marginTop:14,padding:"8px 20px",borderRadius:8,background:TEAL,color:"#fff",border:"none",fontSize:13,cursor:"pointer"}}>Check in another sister</button>
        </div>
      )}

      {/* PICK STATUS */}
      {checkinStep === "pick_status" && (
        <div style={{marginBottom:16}}>
          <div style={{background:"var(--color-background-secondary)",borderRadius:10,padding:"14px 16px",marginBottom:12}}>
            <div style={{fontSize:13,color:"var(--color-text-secondary)",marginBottom:4}}>Checking in</div>
            <div style={{fontSize:16,fontWeight:500,color:"var(--color-text-primary)"}}>{checkinName}</div>
          </div>
          <div style={{fontSize:14,fontWeight:500,color:"var(--color-text-primary)",marginBottom:10}}>Who are you today? 👇</div>
          {STATUS_OPTIONS.map(opt=>(
            <button key={opt.value} onClick={()=>confirmCheckin(opt.value)}
              style={{width:"100%",marginBottom:8,padding:"12px 16px",borderRadius:10,border:`0.5px solid ${opt.color}`,
                background:opt.bg,cursor:"pointer",display:"flex",alignItems:"center",gap:12,textAlign:"left"}}>
              <span style={{fontSize:22}}>{opt.emoji}</span>
              <div>
                <div style={{fontSize:14,fontWeight:500,color:opt.color}}>{opt.label}</div>
                <div style={{fontSize:12,color:opt.color,opacity:0.8}}>{opt.desc}</div>
              </div>
            </button>
          ))}
          <button onClick={resetCheckin} style={{width:"100%",padding:10,borderRadius:8,background:"none",border:"0.5px solid var(--color-border-tertiary)",color:"var(--color-text-secondary)",fontSize:13,cursor:"pointer",marginTop:4}}>← Back to search</button>
        </div>
      )}

      {/* SEARCH */}
      {checkinStep === "search" && (
        <>
          <input placeholder="Type your surname..." value={checkinSearch} onChange={e=>setCheckinSearch(e.target.value)} autoFocus
            style={{width:"100%",padding:"14px 16px",borderRadius:10,fontSize:16,border:`1.5px solid ${TEAL}`,background:"var(--color-background-primary)",color:"var(--color-text-primary)",boxSizing:"border-box",marginBottom:12}}/>
          {checkinSearch.length > 0 && checkinFiltered.length === 0 && (
            <div style={{textAlign:"center",color:"var(--color-text-tertiary)",fontSize:13,padding:"1rem 0"}}>Name not found — ask the secretary to add you as a visitor</div>
          )}
          {checkinFiltered.map(name=>{
            const alreadyIn = !!attendance[name];
            const st = alreadyIn ? STATUS_OPTIONS.find(s=>s.value===attendance[name]) : null;
            return (
              <div key={name} onClick={()=>handleCheckinSelect(name)}
                style={{padding:"14px 16px",borderRadius:10,marginBottom:8,cursor:"pointer",
                  border:alreadyIn?`2px solid ${TEAL}`:"0.5px solid var(--color-border-tertiary)",
                  background:alreadyIn?LIGHT_TEAL:"var(--color-background-primary)",
                  display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <span style={{fontSize:15,color:alreadyIn?TEAL:"var(--color-text-primary)",fontWeight:alreadyIn?500:400}}>{name}</span>
                {alreadyIn && st
                  ? <span style={{fontSize:11,padding:"2px 8px",borderRadius:12,background:st.bg,color:st.color,fontWeight:500}}>{st.emoji} {st.label} ✓</span>
                  : <span style={{fontSize:12,color:"var(--color-text-tertiary)"}}>Tap to check in →</span>}
              </div>
            );
          })}
          {presentCount > 0 && <div style={{textAlign:"center",fontSize:12,color:"var(--color-text-tertiary)",marginTop:16}}>{presentCount} sister{presentCount!==1?"s":""} checked in today</div>}
        </>
      )}
    </div>
  );

  // ══ PIN ENTRY ══
  if (mode === "pinentry") return (
    <div style={{fontFamily:"Arial,sans-serif",maxWidth:480,margin:"0 auto",padding:"0 0 2rem"}}>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:32,paddingTop:4}}>
        <button onClick={()=>{setPin("");setPinError(false);setMode("home");}} style={{background:"none",border:"none",fontSize:22,cursor:"pointer",color:"var(--color-text-secondary)",padding:0}}>←</button>
        <div style={{fontSize:16,fontWeight:500,color:"var(--color-text-primary)"}}>Secretary access</div>
      </div>
      <div style={{textAlign:"center",marginBottom:24}}>
        <div style={{fontSize:40,marginBottom:12}}>🔐</div>
        <div style={{fontSize:14,color:"var(--color-text-secondary)"}}>Enter your secretary PIN</div>
      </div>
      <div style={{display:"flex",gap:12,justifyContent:"center",marginBottom:12}}>
        {[0,1,2,3].map(i=>(
          <div key={i} style={{width:48,height:48,borderRadius:10,border:`2px solid ${pin.length>i?TEAL:"var(--color-border-tertiary)"}`,background:pin.length>i?LIGHT_TEAL:"var(--color-background-secondary)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,color:TEAL}}>
            {pin.length>i?"●":""}
          </div>
        ))}
      </div>
      {pinError && <div style={{textAlign:"center",color:"#A32D2D",fontSize:13,marginBottom:12}}>Incorrect PIN. Try again.</div>}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,maxWidth:240,margin:"0 auto"}}>
        {[1,2,3,4,5,6,7,8,9,"",0,"⌫"].map((k,i)=>(
          <button key={i} onClick={()=>{
            if(k==="⌫"){setPin(p=>p.slice(0,-1));setPinError(false);}
            else if(k!==""){const next=pin+k;setPin(next);if(next.length===4){setTimeout(()=>{if(next===SECRETARY_PIN){setMode("secretary");setPin("");setPinError(false);}else{setPinError(true);setPin("");}},100);}}
          }} style={{height:52,borderRadius:10,fontSize:k==="⌫"?18:20,fontWeight:500,background:k===""?"transparent":"var(--color-background-secondary)",border:k===""?"none":"0.5px solid var(--color-border-tertiary)",color:"var(--color-text-primary)",cursor:k===""?"default":"pointer"}}>
            {k}
          </button>
        ))}
      </div>
    </div>
  );

  // ══ SECRETARY VIEW ══
  if (mode === "secretary") {
    const stats = buildStats();
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    return (
      <div style={{fontFamily:"Arial,sans-serif",maxWidth:480,margin:"0 auto",padding:"0 0 2rem"}}>
        <div style={{background:TEAL,borderRadius:12,padding:"14px 16px",marginBottom:14,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div>
            <div style={{color:"#9FE1CB",fontSize:11}}>Secretary — {formatDate(date)}</div>
            <div style={{color:"#fff",fontSize:16,fontWeight:500}}>{presentCount} sisters present</div>
          </div>
          <button onClick={()=>setMode("home")} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:8,color:"#fff",fontSize:12,padding:"6px 12px",cursor:"pointer"}}>← Back</button>
        </div>

        {/* TABS */}
        <div style={{display:"flex",gap:6,marginBottom:14,overflowX:"auto",paddingBottom:2}}>
          {[["overview","📋 Overview"],["visitors","➕ Visitors"],["lcr","📤 LCR"],["stats","📊 Stats"],["newweek","🗓 New week"]].map(([tab,label])=>(
            <button key={tab} onClick={()=>setSecTab(tab)} style={{flexShrink:0,padding:"7px 12px",borderRadius:8,fontSize:12,
              border:secTab===tab?`1.5px solid ${TEAL}`:"0.5px solid var(--color-border-tertiary)",
              background:secTab===tab?LIGHT_TEAL:"var(--color-background-primary)",
              color:secTab===tab?TEAL:"var(--color-text-secondary)",fontWeight:secTab===tab?500:400,cursor:"pointer"}}>
              {label}
            </button>
          ))}
        </div>

        {/* OVERVIEW */}
        {secTab==="overview" && (
          <div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:14}}>
              {[
                {label:"Present",val:presentCount,bg:LIGHT_TEAL,col:TEAL},
                {label:"Members",val:presentMembers.filter(s=>attendance[s]==="member").length,bg:"#E1F5EE",col:"#1B6B5A"},
                {label:"Special",val:presentMembers.filter(s=>["new_convert","less_active","investigator"].includes(attendance[s])).length + visitors.length,bg:"#FAEEDA",col:"#854F0B"},
              ].map(c=>(
                <div key={c.label} style={{background:c.bg,borderRadius:8,padding:"10px 12px",textAlign:"center"}}>
                  <div style={{fontSize:11,color:c.col,marginBottom:2}}>{c.label}</div>
                  <div style={{fontSize:24,fontWeight:500,color:c.col}}>{c.val}</div>
                </div>
              ))}
            </div>
            {grouped.length === 0 && <div style={{textAlign:"center",color:"var(--color-text-tertiary)",fontSize:13,padding:"2rem 0"}}>No sisters have checked in yet</div>}
            {grouped.map(g=>(
              <div key={g.value} style={{marginBottom:12}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                  <span style={{fontSize:11,padding:"2px 10px",borderRadius:12,background:g.bg,color:g.color,fontWeight:500}}>{g.emoji} {g.label} ({g.sisters.length})</span>
                </div>
                {g.sisters.map((s,i)=>(
                  <div key={i} style={{fontSize:13,padding:"6px 12px",borderLeft:`3px solid ${g.color}`,marginBottom:3,background:"var(--color-background-secondary)",borderRadius:"0 6px 6px 0",color:"var(--color-text-primary)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span>{s.name||s}</span>
                    {s.name===undefined && (
                      <button onClick={()=>setAttendance(p=>{const n={...p};delete n[s];return n;})} style={{background:"none",border:"none",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:14}}>✕</button>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* ADD VISITOR */}
        {secTab==="visitors" && (
          <div>
            <div style={{background:"var(--color-background-secondary)",borderRadius:10,padding:16,marginBottom:16}}>
              <div style={{fontSize:13,fontWeight:500,color:"var(--color-text-primary)",marginBottom:10}}>Add someone not on the ward register</div>
              <input placeholder="Full name" value={newVisitorName} onChange={e=>setNewVisitorName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addVisitor()}
                style={{width:"100%",marginBottom:10,padding:"10px 14px",borderRadius:8,border:"0.5px solid var(--color-border-tertiary)",fontSize:14,background:"var(--color-background-primary)",color:"var(--color-text-primary)",boxSizing:"border-box"}}/>
              <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>
                {STATUS_OPTIONS.map(opt=>(
                  <button key={opt.value} onClick={()=>setNewVisitorStatus(opt.value)}
                    style={{fontSize:12,padding:"4px 12px",borderRadius:12,cursor:"pointer",
                      border:newVisitorStatus===opt.value?`1.5px solid ${opt.color}`:"0.5px solid var(--color-border-tertiary)",
                      background:newVisitorStatus===opt.value?opt.bg:"var(--color-background-primary)",
                      color:newVisitorStatus===opt.value?opt.color:"var(--color-text-secondary)",fontWeight:newVisitorStatus===opt.value?500:400}}>
                    {opt.emoji} {opt.label}
                  </button>
                ))}
              </div>
              <button onClick={addVisitor} style={{width:"100%",padding:10,borderRadius:8,background:TEAL,color:"#fff",border:"none",fontSize:14,fontWeight:500,cursor:"pointer"}}>Add to attendance</button>
            </div>
            {visitors.map((v,i)=>{
              const st=STATUS_OPTIONS.find(s=>s.value===v.status)||STATUS_OPTIONS[4];
              return (
                <div key={i} style={{display:"flex",alignItems:"center",padding:"10px 14px",border:"0.5px solid var(--color-border-tertiary)",borderRadius:10,marginBottom:6,background:"var(--color-background-primary)"}}>
                  <span style={{flex:1,fontSize:14,color:"var(--color-text-primary)"}}>{v.name}</span>
                  <span style={{fontSize:11,padding:"2px 8px",borderRadius:12,background:st.bg,color:st.color,fontWeight:500,marginRight:10}}>{st.emoji} {st.label}</span>
                  <button onClick={()=>setVisitors(p=>p.filter((_,idx)=>idx!==i))} style={{background:"none",border:"none",color:"var(--color-text-tertiary)",cursor:"pointer",fontSize:16,padding:0}}>✕</button>
                </div>
              );
            })}
          </div>
        )}

        {/* LCR COPY */}
        {secTab==="lcr" && (
          <div>
            <div style={{background:"#E6F1FB",borderRadius:10,padding:14,marginBottom:14,border:"0.5px solid #B5D4F4"}}>
              <div style={{fontSize:13,fontWeight:500,color:"#185FA5",marginBottom:6}}>How to update LCR after copying</div>
              <div style={{fontSize:12,color:"#185FA5",lineHeight:1.8}}>
                1. Tap Copy below<br/>
                2. Open LCR → Reports &amp; Forms → Attendance<br/>
                3. Select <b>Relief Society</b> → today's date<br/>
                4. Mark each sister on the list as present<br/>
                5. Save ✓
              </div>
            </div>
            <div style={{background:"var(--color-background-secondary)",borderRadius:10,padding:14,marginBottom:14}}>
              <div style={{fontSize:12,fontWeight:500,color:"var(--color-text-secondary)",marginBottom:8}}>PRESENT TODAY — {formatDate(date)} ({presentCount} total)</div>
              {grouped.map(g=>(
                <div key={g.value} style={{marginBottom:10}}>
                  <div style={{fontSize:11,padding:"2px 10px",borderRadius:12,display:"inline-block",background:g.bg,color:g.color,fontWeight:500,marginBottom:4}}>{g.emoji} {g.label} ({g.sisters.length})</div>
                  {g.sisters.map((s,i)=>(
                    <div key={i} style={{fontSize:13,color:"var(--color-text-primary)",padding:"3px 10px",borderLeft:`3px solid ${g.color}`,marginBottom:2,background:"var(--color-background-primary)",borderRadius:"0 6px 6px 0"}}>
                      {s.name||s}
                    </div>
                  ))}
                </div>
              ))}
              {presentCount===0 && <div style={{fontSize:13,color:"var(--color-text-tertiary)"}}>No attendance recorded yet</div>}
            </div>
            <button onClick={copySummary} style={{width:"100%",padding:14,borderRadius:10,background:copied?"#145C4A":TEAL,color:"#fff",border:"none",fontSize:15,fontWeight:500,cursor:"pointer",transition:"background 0.2s"}}>
              {copied?"✓ Copied & saved to history!":"Copy full list for LCR"}
            </button>
          </div>
        )}

        {/* STATS */}
        {secTab==="stats" && (
          <div>
            {!stats ? (
              <div style={{textAlign:"center",padding:"2rem 0"}}>
                <div style={{fontSize:32,marginBottom:12}}>📊</div>
                <div style={{fontSize:14,color:"var(--color-text-secondary)"}}>Stats will appear here as you record Sundays and copy to LCR</div>
              </div>
            ) : (
              <>
                <div style={{display:"flex",gap:6,marginBottom:14}}>
                  {[["summary","Summary"],["monthly","Monthly"],["sisters","Sisters"]].map(([v,l])=>(
                    <button key={v} onClick={()=>setStatsView(v)} style={{flex:1,padding:"7px 0",borderRadius:8,fontSize:12,
                      border:statsView===v?`1.5px solid ${TEAL}`:"0.5px solid var(--color-border-tertiary)",
                      background:statsView===v?LIGHT_TEAL:"var(--color-background-primary)",
                      color:statsView===v?TEAL:"var(--color-text-secondary)",fontWeight:statsView===v?500:400,cursor:"pointer"}}>
                      {l}
                    </button>
                  ))}
                </div>

                {statsView==="summary" && (
                  <div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
                      {[
                        {label:"Sundays recorded",val:stats.totalSundays},
                        {label:"Avg attendance",val:stats.avgAttendance},
                        {label:"Less active returned",val:stats.returningLessActive,bg:"#FAEEDA",col:"#854F0B"},
                        {label:"New converts attended",val:stats.newConvertsAttended,bg:"#E6F1FB",col:"#185FA5"},
                        {label:"Investigators attended",val:stats.investigatorsAttended,bg:"#EEEDFE",col:"#534AB7"},
                      ].map((c,i)=>(
                        <div key={i} style={{background:c.bg||LIGHT_TEAL,borderRadius:8,padding:"12px 14px"}}>
                          <div style={{fontSize:11,color:c.col||TEAL,marginBottom:4}}>{c.label}</div>
                          <div style={{fontSize:22,fontWeight:500,color:c.col||TEAL}}>{c.val}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {statsView==="monthly" && (
                  <div>
                    {Object.entries(stats.byMonth).sort().map(([m, data])=>(
                      <div key={m} style={{marginBottom:12,background:"var(--color-background-secondary)",borderRadius:10,padding:14}}>
                        <div style={{fontSize:14,fontWeight:500,color:"var(--color-text-primary)",marginBottom:8}}>
                          {months[parseInt(m.split("-")[1])-1]} {m.split("-")[0]}
                          <span style={{fontSize:12,color:"var(--color-text-secondary)",marginLeft:8}}>Total: {data.total}</span>
                        </div>
                        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                          {STATUS_OPTIONS.map(opt=>data[opt.value]>0&&(
                            <span key={opt.value} style={{fontSize:11,padding:"2px 8px",borderRadius:12,background:opt.bg,color:opt.color,fontWeight:500}}>
                              {opt.emoji} {opt.label}: {data[opt.value]}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {statsView==="sisters" && (
                  <div>
                    <div style={{fontSize:12,color:"var(--color-text-secondary)",marginBottom:10}}>Most faithful attenders (top 10)</div>
                    {stats.mostFaithful.map(([name,data],i)=>(
                      <div key={name} style={{display:"flex",alignItems:"center",padding:"8px 12px",borderRadius:8,marginBottom:6,background:"var(--color-background-secondary)"}}>
                        <span style={{fontSize:13,color:TEAL,fontWeight:500,width:24}}>#{i+1}</span>
                        <span style={{flex:1,fontSize:13,color:"var(--color-text-primary)"}}>{name.split(",")[0]}</span>
                        <span style={{fontSize:12,color:TEAL,fontWeight:500}}>{data.attended}x</span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* NEW WEEK */}
        {secTab==="newweek" && (
          <div style={{textAlign:"center",padding:"1rem 0"}}>
            <div style={{fontSize:40,marginBottom:16}}>🗓️</div>
            <div style={{fontSize:15,fontWeight:500,color:"var(--color-text-primary)",marginBottom:8}}>Save & start a new week</div>
            <div style={{fontSize:13,color:"var(--color-text-secondary)",marginBottom:24}}>Today's record will be saved to history before clearing. Make sure you've already copied to LCR.</div>
            <input type="date" value={date} onChange={e=>setDate(e.target.value)}
              style={{width:"100%",marginBottom:16,padding:"10px 14px",borderRadius:8,border:"0.5px solid var(--color-border-tertiary)",fontSize:14,background:"var(--color-background-primary)",color:"var(--color-text-primary)",boxSizing:"border-box"}}/>
            <button onClick={resetWeek} style={{width:"100%",padding:14,borderRadius:10,background:"#FCEBEB",color:"#A32D2D",border:"1.5px solid #F09595",fontSize:15,fontWeight:500,cursor:"pointer"}}>
              Save & clear for new Sunday
            </button>
          </div>
        )}
      </div>
    );
  }
  return null;
}