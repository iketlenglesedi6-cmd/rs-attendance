import { useState, useMemo, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://baxfhxeozfqryngxvflo.supabase.co";
const SUPABASE_KEY = "sb_publishable_K7WHnGXHdoGFqk3iuek9SA_7GgFu7aX";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

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
  lesedi: { pin:"1830", name:"Sister Lesedi", role:"Secretary" },
  nancy:  { pin:"2004", name:"Sister Nancy",  role:"Assistant Secretary" },
};

const C = {
  cream:"#FAF7F2", beige:"#F2EBE0", beige2:"#E8DDD0", beige3:"#D9CCBC",
  sage:"#7A8C6E", sageDark:"#5C7A5C", sageLight:"#EEF2EB",
  gold:"#B8963E", goldLight:"#F5EDD8",
  brown:"#6B4F3A", brownLight:"#FAF0E8",
  text:"#3A3228", textMid:"#6B5E52", textSoft:"#9C8E82", white:"#FFFCF8",
  shadow:"rgba(90,70,50,0.08)",
};

const S = {
  page:{ fontFamily:"'Jost',sans-serif", background:C.cream, minHeight:"100vh", maxWidth:480, margin:"0 auto", padding:"0 0 3rem" },
  header:{ background:`linear-gradient(160deg,${C.beige} 0%,${C.cream} 100%)`, borderBottom:`1px solid ${C.beige3}`, padding:"28px 24px 22px", position:"relative", overflow:"hidden" },
  headerWard:{ fontFamily:"'Jost',sans-serif", fontSize:10, letterSpacing:"0.15em", textTransform:"uppercase", color:C.gold, marginBottom:6, fontWeight:500 },
  headerTitle:{ fontFamily:"'Cormorant Garamond',serif", fontSize:28, fontWeight:300, color:C.text, lineHeight:1.2, marginBottom:4 },
  headerSub:{ fontFamily:"'Jost',sans-serif", fontSize:12, color:C.textSoft, fontWeight:300 },
  card:{ background:C.white, borderRadius:16, border:`1px solid ${C.beige2}`, boxShadow:`0 2px 12px ${C.shadow}`, padding:"20px", marginBottom:12 },
  btn:{ width:"100%", padding:"14px 20px", borderRadius:12, border:`1px solid ${C.beige3}`, background:C.white, cursor:"pointer", fontFamily:"'Jost',sans-serif", fontSize:14, color:C.text, fontWeight:400 },
  btnPrimary:{ background:`linear-gradient(135deg,${C.sage} 0%,${C.sageDark} 100%)`, border:"none", color:C.white, fontWeight:500, boxShadow:`0 3px 10px rgba(92,122,92,0.25)` },
  btnGold:{ background:`linear-gradient(135deg,${C.gold} 0%,#9A7A2E 100%)`, border:"none", color:C.white, fontWeight:500 },
  input:{ width:"100%", padding:"13px 16px", borderRadius:10, border:`1px solid ${C.beige3}`, background:C.white, fontFamily:"'Jost',sans-serif", fontSize:15, color:C.text, boxSizing:"border-box", outline:"none" },
  tag:(color,bg)=>({ fontSize:11, padding:"3px 10px", borderRadius:20, background:bg, color, fontWeight:500, fontFamily:"'Jost',sans-serif", letterSpacing:"0.03em" }),
  divider:{ height:1, background:`linear-gradient(90deg,transparent,${C.beige3},transparent)`, margin:"16px 0" },
};

function formatDate(d) {
  const [y,m,day] = d.split("-");
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  return `${parseInt(day)} ${months[parseInt(m)-1]} ${y}`;
}
function getTodayStr() { return new Date().toISOString().split("T")[0]; }
function isSunday() { return new Date().getDay() === 0; }
function getMonth(d) { return d.slice(0,7); }

function OliveBranch({style}) {
  return (
    <svg viewBox="0 0 120 40" style={{opacity:0.12,position:"absolute",...style}} fill={C.sage}>
      <path d="M10,20 Q30,5 60,20 Q90,35 110,20" stroke={C.sage} strokeWidth="1.5" fill="none"/>
      <ellipse cx="25" cy="13" rx="7" ry="4" transform="rotate(-20,25,13)"/>
      <ellipse cx="45" cy="17" rx="7" ry="4" transform="rotate(-10,45,17)"/>
      <ellipse cx="65" cy="22" rx="7" ry="4" transform="rotate(5,65,22)"/>
      <ellipse cx="85" cy="19" rx="7" ry="4" transform="rotate(-5,85,19)"/>
      <ellipse cx="100" cy="15" rx="6" ry="3.5" transform="rotate(-15,100,15)"/>
    </svg>
  );
}

// ── NOT SUNDAY SCREEN ──
function NotSundayScreen() {
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const today = days[new Date().getDay()];
  const daysUntilSunday = (7 - new Date().getDay()) % 7 || 7;
  return (
    <div style={{...S.page}}>
      <div style={{...S.header,position:"relative"}}>
        <OliveBranch style={{top:0,right:-10,width:160}}/>
        <div style={S.headerWard}>Johannesburg YSA Ward</div>
        <div style={S.headerTitle}>Gather</div>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,fontStyle:"italic",color:C.textMid}}>Relief Society</div>
      </div>
      <div style={{padding:"40px 24px",textAlign:"center"}}>
        <div style={{fontSize:48,marginBottom:20}}>🌿</div>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,color:C.text,fontWeight:300,marginBottom:12}}>
          See you on Sunday!
        </div>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,color:C.textMid,fontStyle:"italic",marginBottom:24,lineHeight:1.7}}>
          Sister check-in is only available on Sundays. Today is {today}.
        </div>
        <div style={{...S.card,background:C.sageLight,border:`1px solid ${C.beige3}`,textAlign:"center"}}>
          <div style={{fontSize:11,color:C.sage,letterSpacing:"0.1em",textTransform:"uppercase",fontWeight:500,marginBottom:8}}>Next check-in opens in</div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:32,color:C.sageDark}}>
            {daysUntilSunday} {daysUntilSunday===1?"day":"days"}
          </div>
        </div>
        <div style={{fontSize:13,color:C.textSoft,fontStyle:"italic",fontFamily:"'Cormorant Garamond',serif",lineHeight:1.8,marginTop:24}}>
          "Charity never faileth"<br/>— 1 Corinthians 13:8
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [mode, setMode] = useState("home");
  const [currentUser, setCurrentUser] = useState(null);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);
  const [date, setDate] = useState(getTodayStr());
  const [todayRecords, setTodayRecords] = useState([]);
  const [allRecords, setAllRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newVisitorName, setNewVisitorName] = useState("");
  const [newVisitorStatus, setNewVisitorStatus] = useState("visitor");
  const [checkinSearch, setCheckinSearch] = useState("");
  const [checkinStep, setCheckinStep] = useState("search");
  const [checkinName, setCheckinName] = useState("");
  const [secTab, setSecTab] = useState("overview");
  const [copied, setCopied] = useState(false);
  const [statsView, setStatsView] = useState("summary");

  useEffect(() => { fetchToday(); }, [date]);
  useEffect(() => { if (mode==="secretary") fetchAll(); }, [mode]);

  useEffect(() => {
    const channel = supabase
      .channel("attendance-live")
      .on("postgres_changes", { event:"INSERT", schema:"public", table:"attendance" }, () => fetchToday())
      .on("postgres_changes", { event:"DELETE", schema:"public", table:"attendance" }, () => fetchToday())
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [date]);

  async function fetchToday() {
    const { data } = await supabase.from("attendance").select("*").eq("date", date).order("created_at",{ascending:true});
    if (data) setTodayRecords(data);
  }

  async function fetchAll() {
    const { data } = await supabase.from("attendance").select("*").order("date",{ascending:true});
    if (data) setAllRecords(data);
  }

  const checkinFiltered = useMemo(() =>
    checkinSearch.length < 1 ? [] :
    ALL_SISTERS.filter(s => s.toLowerCase().includes(checkinSearch.toLowerCase())).slice(0,8),
    [checkinSearch]
  );

  const presentCount = todayRecords.length;
  const checkedInNames = todayRecords.map(r => r.sister_name);

  const grouped = STATUS_OPTIONS.map(opt => ({
    ...opt, sisters: todayRecords.filter(r => r.status===opt.value),
  })).filter(g => g.sisters.length > 0);

  async function handleCheckinSelect(name) {
    setCheckinName(name);
    setCheckinStep(checkedInNames.includes(name) ? "already" : "pick_status");
    setCheckinSearch("");
  }

  async function confirmCheckin(status) {
    setLoading(true);
    await supabase.from("attendance").insert({ date, sister_name:checkinName, status, is_visitor:false, added_by:"self" });
    setLoading(false);
    setCheckinStep("confirm");
    fetchToday();
  }

  async function addVisitor() {
    const n = newVisitorName.trim();
    if (!n) return;
    setLoading(true);
    await supabase.from("attendance").insert({ date, sister_name:n, status:newVisitorStatus, is_visitor:true, added_by:currentUser?.name });
    setLoading(false);
    setNewVisitorName("");
    setNewVisitorStatus("visitor");
    fetchToday();
  }

  async function removeRecord(id) {
    await supabase.from("attendance").delete().eq("id",id);
    fetchToday();
  }

  function resetCheckin() { setCheckinStep("search"); setCheckinName(""); setCheckinSearch(""); }

  function copySummary() {
    const lines = [
      `GATHER — Relief Society Attendance`,
      `Johannesburg YSA Ward  |  ${formatDate(date)}`,
      `Recorded by: ${currentUser?.name} (${currentUser?.role})`,
      `Total present: ${presentCount} / ${ALL_SISTERS.length}`,
      ``,`══ FOR LCR — Mark present ══`,
      ...todayRecords.filter(r=>!r.is_visitor).map(r=>`✓ ${r.sister_name}`),
      ``,`══ BREAKDOWN ══`,
      ...grouped.map(g=>`${g.emoji} ${g.label} (${g.sisters.length}):\n${g.sisters.map(s=>`   • ${s.sister_name}`).join("\n")}`),
    ].join("\n");
    navigator.clipboard.writeText(lines);
    setCopied(true);
    setTimeout(()=>setCopied(false),3000);
  }

  function buildStats() {
    if (allRecords.length===0) return null;
    const dates = [...new Set(allRecords.map(r=>r.date))];
    const totalSundays = dates.length;
    const avgAttendance = (allRecords.length/totalSundays).toFixed(1);
    const sisterCount = {};
    ALL_SISTERS.forEach(s=>{sisterCount[s]=0;});
    allRecords.forEach(r=>{if(!r.is_visitor) sisterCount[r.sister_name]=(sisterCount[r.sister_name]||0)+1;});
    const byMonth = {};
    allRecords.forEach(r=>{
      const m=getMonth(r.date);
      if(!byMonth[m]) byMonth[m]={total:0,member:0,new_convert:0,less_active:0,investigator:0,visitor:0};
      byMonth[m].total++;
      byMonth[m][r.status]=(byMonth[m][r.status]||0)+1;
    });
    return {
      totalSundays, avgAttendance, byMonth,
      mostFaithful:Object.entries(sisterCount).sort((a,b)=>b[1]-a[1]).filter(([,v])=>v>0).slice(0,10),
      returningLessActive:[...new Set(allRecords.filter(r=>r.status==="less_active").map(r=>r.sister_name))].length,
      newConvertsAttended:[...new Set(allRecords.filter(r=>r.status==="new_convert").map(r=>r.sister_name))].length,
      investigatorsAttended:[...new Set(allRecords.filter(r=>r.status==="investigator").map(r=>r.sister_name))].length,
    };
  }

  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  // ══ HOME ══
  if (mode==="home") return (
    <div style={S.page}>
      <div style={{...S.header,position:"relative"}}>
        <OliveBranch style={{top:0,right:-10,width:160}}/>
        <div style={S.headerWard}>Johannesburg YSA Ward</div>
        <div style={S.headerTitle}>Gather</div>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,fontStyle:"italic",color:C.textMid,marginBottom:2}}>Relief Society</div>
        <div style={S.headerSub}>{formatDate(date)}</div>
      </div>
      <div style={{padding:"20px 16px 0"}}>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,color:C.textMid,fontStyle:"italic",textAlign:"center",marginBottom:20}}>
          "Charity never faileth" — 1 Corinthians 13:8
        </div>

        {/* Sister check-in — Sunday only */}
        {isSunday() ? (
          <button onClick={()=>setMode("checkin")} style={{...S.btn,...S.btnPrimary,marginBottom:10,padding:"18px 20px",textAlign:"left",display:"flex",alignItems:"center",gap:14}}>
            <div style={{width:42,height:42,borderRadius:12,background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>🌿</div>
            <div>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:500,marginBottom:2}}>Sister Check-In</div>
              <div style={{fontSize:12,opacity:0.85,fontWeight:300}}>Find your name & mark yourself present</div>
            </div>
          </button>
        ) : (
          <div style={{...S.card,background:C.beige,border:`1px solid ${C.beige3}`,marginBottom:10,padding:"18px 20px",display:"flex",alignItems:"center",gap:14,opacity:0.7}}>
            <div style={{width:42,height:42,borderRadius:12,background:C.beige2,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>🌿</div>
            <div>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,color:C.textMid,marginBottom:2}}>Sister Check-In</div>
              <div style={{fontSize:12,color:C.textSoft,fontWeight:300}}>Available on Sundays only</div>
            </div>
          </div>
        )}

        <button onClick={()=>setMode("pinentry")} style={{...S.btn,marginBottom:16,padding:"18px 20px",textAlign:"left",display:"flex",alignItems:"center",gap:14}}>
          <div style={{width:42,height:42,borderRadius:12,background:C.beige,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>🔐</div>
          <div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,color:C.text,marginBottom:2}}>Secretary Access</div>
            <div style={{fontSize:12,color:C.textSoft,fontWeight:300}}>Records, reports & attendance history</div>
          </div>
        </button>

        {presentCount>0&&(
          <div style={{...S.card,background:C.sageLight,border:`1px solid ${C.beige3}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,color:C.sageDark,fontWeight:500}}>{presentCount} sisters present</div>
              <div style={{fontSize:12,color:C.sage,fontWeight:300}}>today · live</div>
            </div>
            <div style={{fontSize:22}}>🌿</div>
          </div>
        )}
        <div style={S.divider}/>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",justifyContent:"center"}}>
          {STATUS_OPTIONS.map(o=><span key={o.value} style={S.tag(o.color,o.bg)}>{o.emoji} {o.label}</span>)}
        </div>
      </div>
    </div>
  );

  // ══ CHECKIN — Sunday gate ══
  if (mode==="checkin") {
    if (!isSunday()) return <NotSundayScreen/>;
    return (
      <div style={S.page}>
        <div style={{...S.header}}>
          <OliveBranch style={{top:0,right:-10,width:140}}/>
          <button onClick={()=>{resetCheckin();setMode("home");}} style={{background:"none",border:"none",color:C.textMid,fontSize:20,cursor:"pointer",padding:0,marginBottom:10,display:"block"}}>←</button>
          <div style={S.headerTitle}>Check In</div>
          <div style={S.headerSub}>Search your surname and tap your name</div>
        </div>
        <div style={{padding:"20px 16px 0"}}>

          {checkinStep==="confirm"&&(
            <div style={{...S.card,textAlign:"center",background:C.sageLight,border:`1px solid ${C.beige3}`}}>
              <div style={{fontSize:40,marginBottom:12}}>✦</div>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:24,color:C.sageDark,fontWeight:500,marginBottom:4}}>
                Welcome, Sister {checkinName.split(",")[0]}
              </div>
              <div style={{fontSize:13,color:C.sage,fontStyle:"italic",marginBottom:14}}>We are glad you are here today</div>
              <div style={S.divider}/>
              <button onClick={resetCheckin} style={{...S.btn,...S.btnPrimary,marginTop:4}}>Check in another sister</button>
            </div>
          )}

          {checkinStep==="already"&&(
            <div style={{...S.card,textAlign:"center",background:C.goldLight,border:`1px solid ${C.beige3}`}}>
              <div style={{fontSize:36,marginBottom:8}}>✓</div>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,color:C.brown,marginBottom:4}}>Already checked in!</div>
              <div style={{fontSize:13,color:C.textMid,marginBottom:14}}>Sister {checkinName.split(",")[0]} is already present today</div>
              <button onClick={resetCheckin} style={{...S.btn,...S.btnPrimary}}>Back to search</button>
            </div>
          )}

          {checkinStep==="pick_status"&&(
            <div>
              <div style={{...S.card,marginBottom:0}}>
                <div style={{fontSize:12,color:C.textSoft,marginBottom:4,fontWeight:300}}>Checking in</div>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,color:C.text}}>{checkinName}</div>
              </div>
              <div style={{padding:"16px 0 10px",fontFamily:"'Cormorant Garamond',serif",fontSize:17,color:C.textMid,fontStyle:"italic",textAlign:"center"}}>
                How would you describe yourself today?
              </div>
              {STATUS_OPTIONS.map(opt=>(
                <button key={opt.value} onClick={()=>!loading&&confirmCheckin(opt.value)}
                  style={{...S.btn,marginBottom:8,padding:"14px 18px",display:"flex",alignItems:"center",gap:14,background:opt.bg,borderColor:opt.color+"44",opacity:loading?0.7:1}}>
                  <span style={{fontSize:22}}>{opt.emoji}</span>
                  <div style={{textAlign:"left"}}>
                    <div style={{fontSize:14,fontWeight:500,color:opt.color}}>{opt.label}</div>
                    <div style={{fontSize:12,color:opt.color,opacity:0.7,fontWeight:300}}>{opt.desc}</div>
                  </div>
                </button>
              ))}
              <button onClick={resetCheckin} style={{...S.btn,marginTop:4,color:C.textSoft,fontSize:13}}>← Back to search</button>
            </div>
          )}

          {checkinStep==="search"&&(
            <>
              <input placeholder="Type your surname…" value={checkinSearch} onChange={e=>setCheckinSearch(e.target.value)} autoFocus
                style={{...S.input,marginBottom:14,fontSize:16,borderColor:checkinSearch?C.sage:C.beige3}}/>
              {checkinSearch.length>0&&checkinFiltered.length===0&&(
                <div style={{textAlign:"center",color:C.textSoft,fontSize:13,padding:"1.5rem 0",fontStyle:"italic",fontFamily:"'Cormorant Garamond',serif"}}>
                  Name not found — please see the secretary
                </div>
              )}
              {checkinFiltered.map(name=>{
                const alreadyIn=checkedInNames.includes(name);
                const rec=alreadyIn?todayRecords.find(r=>r.sister_name===name):null;
                const st=rec?STATUS_OPTIONS.find(s=>s.value===rec.status):null;
                return (
                  <div key={name} onClick={()=>handleCheckinSelect(name)}
                    style={{padding:"14px 18px",borderRadius:12,marginBottom:8,cursor:"pointer",border:`1px solid ${alreadyIn?C.sage:C.beige2}`,background:alreadyIn?C.sageLight:C.white,display:"flex",alignItems:"center",justifyContent:"space-between",boxShadow:`0 1px 4px ${C.shadow}`}}>
                    <span style={{fontSize:15,color:alreadyIn?C.sageDark:C.text,fontWeight:alreadyIn?500:400}}>{name}</span>
                    {alreadyIn&&st?<span style={S.tag(st.color,st.bg)}>{st.emoji} Checked in</span>:<span style={{fontSize:12,color:C.textSoft}}>Tap →</span>}
                  </div>
                );
              })}
              {presentCount>0&&<div style={{textAlign:"center",fontSize:12,color:C.textSoft,marginTop:16,fontStyle:"italic",fontFamily:"'Cormorant Garamond',serif"}}>{presentCount} sister{presentCount!==1?"s":""} present today</div>}
            </>
          )}
        </div>
      </div>
    );
  }

  // ══ PIN ENTRY ══
  if (mode==="pinentry") return (
    <div style={S.page}>
      <div style={S.header}>
        <OliveBranch style={{top:0,right:-10,width:140}}/>
        <button onClick={()=>{setPinInput("");setPinError(false);setMode("home");}} style={{background:"none",border:"none",color:C.textMid,fontSize:20,cursor:"pointer",padding:0,marginBottom:10,display:"block"}}>←</button>
        <div style={S.headerTitle}>Secretary</div>
        <div style={S.headerSub}>Enter your personal PIN to continue</div>
      </div>
      <div style={{padding:"32px 16px 0",textAlign:"center"}}>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,color:C.textMid,fontStyle:"italic",marginBottom:20}}>Who is signing in?</div>
        <div style={{display:"flex",gap:10,justifyContent:"center",marginBottom:24}}>
          {Object.entries(USERS).map(([key,u])=>(
            <div key={key} style={{flex:1,padding:"12px 16px",borderRadius:12,background:C.white,border:`1px solid ${C.beige3}`,textAlign:"center"}}>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,color:C.text}}>{u.name}</div>
              <div style={{fontSize:11,fontWeight:300,marginTop:2,color:C.textSoft}}>{u.role}</div>
            </div>
          ))}
        </div>
        <div style={{display:"flex",gap:10,justifyContent:"center",marginBottom:12}}>
          {[0,1,2,3].map(i=>(
            <div key={i} style={{width:46,height:46,borderRadius:12,border:`1.5px solid ${pinInput.length>i?C.sage:C.beige3}`,background:pinInput.length>i?C.sageLight:C.white,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,color:C.sage}}>
              {pinInput.length>i?"•":""}
            </div>
          ))}
        </div>
        {pinError&&<div style={{fontSize:13,color:"#9A4A3A",marginBottom:12,fontStyle:"italic",fontFamily:"'Cormorant Garamond',serif"}}>Incorrect PIN — please try again</div>}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,maxWidth:220,margin:"0 auto"}}>
          {[1,2,3,4,5,6,7,8,9,"",0,"⌫"].map((k,i)=>(
            <button key={i} onClick={()=>{
              if(k==="⌫"){setPinInput(p=>p.slice(0,-1));setPinError(false);}
              else if(k!==""){
                const next=pinInput+k; setPinInput(next);
                if(next.length===4){setTimeout(()=>{
                  const user=Object.values(USERS).find(u=>u.pin===next);
                  if(user){setCurrentUser(user);setMode("secretary");setPinInput("");setPinError(false);}
                  else{setPinError(true);setPinInput("");}
                },100);}
              }
            }} style={{height:50,borderRadius:10,fontSize:k==="⌫"?18:20,fontWeight:400,background:k===""?"transparent":C.white,border:k===""?"none":`1px solid ${C.beige3}`,color:C.text,cursor:k===""?"default":"pointer",fontFamily:"'Jost',sans-serif",boxShadow:k===""?"none":`0 1px 3px ${C.shadow}`}}>
              {k}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // ══ SECRETARY ══
  if (mode==="secretary") {
    const stats=buildStats();
    return (
      <div style={S.page}>
        <div style={{...S.header}}>
          <OliveBranch style={{top:0,right:-10,width:140}}/>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div>
              <div style={S.headerWard}>{currentUser?.role}</div>
              <div style={S.headerTitle}>{currentUser?.name.replace("Sister ","")}</div>
              <div style={S.headerSub}>{formatDate(date)} · {presentCount} present · live</div>
            </div>
            <button onClick={()=>{setMode("home");setCurrentUser(null);}} style={{background:C.beige2,border:"none",borderRadius:8,color:C.textMid,fontSize:12,padding:"6px 12px",cursor:"pointer",fontFamily:"'Jost',sans-serif",marginTop:4}}>Sign out</button>
          </div>
        </div>

        <div style={{overflowX:"auto",display:"flex",gap:6,padding:"14px 16px 0",paddingBottom:2}}>
          {[["overview","Overview"],["visitors","Add Visitor"],["lcr","LCR Export"],["stats","Statistics"],["settings","Settings"]].map(([tab,label])=>(
            <button key={tab} onClick={()=>setSecTab(tab)} style={{flexShrink:0,padding:"7px 14px",borderRadius:20,fontSize:12,border:`1px solid ${secTab===tab?C.sage:C.beige3}`,background:secTab===tab?C.sageLight:C.white,color:secTab===tab?C.sageDark:C.textSoft,fontWeight:secTab===tab?500:400,cursor:"pointer",fontFamily:"'Jost',sans-serif"}}>
              {label}
            </button>
          ))}
        </div>

        <div style={{padding:"14px 16px 0"}}>

          {secTab==="overview"&&(
            <div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:14}}>
                {[
                  {label:"Present",val:presentCount,bg:C.sageLight,col:C.sageDark},
                  {label:"Members",val:todayRecords.filter(r=>r.status==="member").length,bg:C.sageLight,col:C.sage},
                  {label:"Special",val:todayRecords.filter(r=>["new_convert","less_active","investigator","visitor"].includes(r.status)).length,bg:C.goldLight,col:C.gold},
                ].map(c=>(
                  <div key={c.label} style={{background:c.bg,borderRadius:12,padding:"12px",textAlign:"center",border:`1px solid ${C.beige2}`}}>
                    <div style={{fontSize:10,color:c.col,marginBottom:4,letterSpacing:"0.05em",textTransform:"uppercase",fontWeight:500}}>{c.label}</div>
                    <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:28,color:c.col}}>{c.val}</div>
                  </div>
                ))}
              </div>
              {grouped.length===0&&<div style={{textAlign:"center",color:C.textSoft,fontSize:14,padding:"3rem 0",fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic"}}>No sisters have checked in yet today</div>}
              {grouped.map(g=>(
                <div key={g.value} style={{marginBottom:14}}>
                  <span style={{...S.tag(g.color,g.bg),display:"inline-block",marginBottom:8}}>{g.emoji} {g.label} · {g.sisters.length}</span>
                  {g.sisters.map(r=>(
                    <div key={r.id} style={{fontSize:13,padding:"8px 14px",borderLeft:`2px solid ${g.color}44`,marginBottom:3,background:C.white,borderRadius:"0 8px 8px 0",color:C.text,display:"flex",justifyContent:"space-between",alignItems:"center",boxShadow:`0 1px 3px ${C.shadow}`}}>
                      <span>{r.sister_name}</span>
                      <button onClick={()=>removeRecord(r.id)} style={{background:"none",border:"none",color:C.textSoft,cursor:"pointer",fontSize:14,padding:"0 0 0 8px"}}>✕</button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {secTab==="visitors"&&(
            <div>
              <div style={S.card}>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,color:C.text,marginBottom:14}}>Add a visitor or guest</div>
                <input placeholder="Full name" value={newVisitorName} onChange={e=>setNewVisitorName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addVisitor()} style={{...S.input,marginBottom:10}}/>
                <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>
                  {STATUS_OPTIONS.map(opt=>(
                    <button key={opt.value} onClick={()=>setNewVisitorStatus(opt.value)}
                      style={{...S.btn,width:"auto",padding:"5px 12px",fontSize:12,background:newVisitorStatus===opt.value?opt.bg:C.white,border:`1px solid ${newVisitorStatus===opt.value?opt.color:C.beige3}`,color:newVisitorStatus===opt.value?opt.color:C.textSoft}}>
                      {opt.emoji} {opt.label}
                    </button>
                  ))}
                </div>
                <button onClick={addVisitor} style={{...S.btn,...S.btnPrimary,opacity:loading?0.7:1}}>{loading?"Adding…":"Add to today's attendance"}</button>
              </div>
            </div>
          )}

          {secTab==="lcr"&&(
            <div>
              <div style={{...S.card,background:"#EEF2F8",border:`1px solid #C8D4E8`}}>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:17,color:"#3A4A6A",marginBottom:8}}>How to update LCR</div>
                <div style={{fontSize:12,color:"#4A5A7A",lineHeight:1.9,fontWeight:300}}>
                  1. Tap <b>Copy list</b> below<br/>
                  2. Open LCR → Reports &amp; Forms → Attendance<br/>
                  3. Select <b>Relief Society</b> and today's date<br/>
                  4. Mark each sister as present<br/>
                  5. Save ✓
                </div>
              </div>
              <div style={S.card}>
                <div style={{fontSize:11,color:C.textSoft,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:10,fontWeight:500}}>Present today — {formatDate(date)}</div>
                {grouped.map(g=>(
                  <div key={g.value} style={{marginBottom:12}}>
                    <span style={{...S.tag(g.color,g.bg),display:"inline-block",marginBottom:6}}>{g.emoji} {g.label} ({g.sisters.length})</span>
                    {g.sisters.map(r=>(
                      <div key={r.id} style={{fontSize:13,color:C.text,padding:"4px 12px",borderLeft:`2px solid ${g.color}44`,marginBottom:2,background:C.cream,borderRadius:"0 6px 6px 0"}}>{r.sister_name}</div>
                    ))}
                  </div>
                ))}
                {presentCount===0&&<div style={{fontSize:13,color:C.textSoft,fontStyle:"italic"}}>No attendance recorded yet</div>}
              </div>
              <button onClick={copySummary} style={{...S.btn,...(copied?{...S.btnPrimary,background:C.sageDark}:S.btnGold),padding:16,fontSize:15}}>
                {copied?"✓ Copied & ready for LCR":"Copy list for LCR"}
              </button>
            </div>
          )}

          {secTab==="stats"&&(
            <div>
              {!stats?(
                <div style={{textAlign:"center",padding:"3rem 0"}}>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,color:C.textMid,fontStyle:"italic",marginBottom:8}}>Your records will grow here</div>
                  <div style={{fontSize:13,color:C.textSoft,fontWeight:300}}>Stats appear as sisters check in each Sunday</div>
                </div>
              ):(
                <>
                  <div style={{display:"flex",gap:6,marginBottom:14}}>
                    {[["summary","Summary"],["monthly","Monthly"],["sisters","Sisters"]].map(([v,l])=>(
                      <button key={v} onClick={()=>setStatsView(v)} style={{flex:1,padding:"7px 0",borderRadius:20,fontSize:12,border:`1px solid ${statsView===v?C.sage:C.beige3}`,background:statsView===v?C.sageLight:C.white,color:statsView===v?C.sageDark:C.textSoft,cursor:"pointer",fontFamily:"'Jost',sans-serif"}}>{l}</button>
                    ))}
                  </div>
                  {statsView==="summary"&&(
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                      {[
                        {label:"Sundays recorded",val:stats.totalSundays,bg:C.sageLight,col:C.sageDark},
                        {label:"Avg attendance",val:stats.avgAttendance,bg:C.sageLight,col:C.sageDark},
                        {label:"Less active returned",val:stats.returningLessActive,bg:C.brownLight,col:C.brown},
                        {label:"New converts",val:stats.newConvertsAttended,bg:C.goldLight,col:C.gold},
                        {label:"Investigators",val:stats.investigatorsAttended,bg:"#EEF2F5",col:"#5A6A7A"},
                      ].map((c,i)=>(
                        <div key={i} style={{background:c.bg,borderRadius:12,padding:"14px",border:`1px solid ${C.beige2}`}}>
                          <div style={{fontSize:10,color:c.col,textTransform:"uppercase",letterSpacing:"0.08em",fontWeight:500,marginBottom:6}}>{c.label}</div>
                          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:28,color:c.col}}>{c.val}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  {statsView==="monthly"&&Object.entries(stats.byMonth).sort().map(([m,data])=>(
                    <div key={m} style={{...S.card,marginBottom:8,padding:"14px 16px"}}>
                      <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:17,color:C.text,marginBottom:8}}>
                        {months[parseInt(m.split("-")[1])-1]} {m.split("-")[0]}
                        <span style={{fontSize:12,color:C.textSoft,marginLeft:8,fontFamily:"'Jost',sans-serif",fontWeight:300}}>· {data.total} total</span>
                      </div>
                      <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                        {STATUS_OPTIONS.map(opt=>data[opt.value]>0&&<span key={opt.value} style={S.tag(opt.color,opt.bg)}>{opt.emoji} {opt.label}: {data[opt.value]}</span>)}
                      </div>
                    </div>
                  ))}
                  {statsView==="sisters"&&(
                    <div>
                      <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,color:C.textMid,fontStyle:"italic",marginBottom:12}}>Most faithful attenders</div>
                      {stats.mostFaithful.map(([name,count],i)=>(
                        <div key={name} style={{display:"flex",alignItems:"center",padding:"10px 14px",borderRadius:10,marginBottom:6,background:C.white,border:`1px solid ${C.beige2}`,boxShadow:`0 1px 3px ${C.shadow}`}}>
                          <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,color:C.gold,width:28}}>#{i+1}</span>
                          <span style={{flex:1,fontSize:14,color:C.text}}>{name.split(",")[0]}</span>
                          <span style={{fontSize:13,color:C.sage,fontWeight:500}}>{count}×</span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {secTab==="settings"&&(
            <div style={{textAlign:"center",padding:"1rem 0"}}>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:24,color:C.textMid,fontStyle:"italic",marginBottom:6}}>Date Settings</div>
              <div style={{fontSize:13,color:C.textSoft,marginBottom:20,fontWeight:300}}>Change the date if recording for a different Sunday</div>
              <input type="date" value={date} onChange={e=>setDate(e.target.value)} style={{...S.input,marginBottom:16,textAlign:"center"}}/>
              <div style={{fontSize:12,color:C.textSoft,fontStyle:"italic",fontFamily:"'Cormorant Garamond',serif"}}>All check-ins will be recorded under {formatDate(date)}</div>
            </div>
          )}

        </div>
      </div>
    );
  }
  return null;
}