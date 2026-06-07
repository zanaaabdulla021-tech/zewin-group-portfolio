"use client";
// @ts-nocheck

import { useState, useRef, useEffect, useCallback } from "react";

// ── Role Config ────────────────────────────────────────────────────────────────
const ROLE_CONFIG = {
  administrator: {
    label: "Administrator", color: "#f59e0b", badge: "👑",
    canViewDashboard: true,
    canEdit: true, canDelete: true,
    canManageUsers: true, canChangeBrand: true,
    canChangeColors: true,
  },
  editor: {
    label: "Editor", color: "#4f8ef7", badge: "✏️",
    canViewDashboard: true,
    canEdit: true, canDelete: false,
    canManageUsers: false, canChangeBrand: false,
    canChangeColors: false,
  },
  viewer: {
    label: "Viewer", color: "#10b981", badge: "👁",
    canViewDashboard: false,
    canEdit: false, canDelete: false,
    canManageUsers: false, canChangeBrand: false,
    canChangeColors: false,
  },
};

// ── Users ──────────────────────────────────────────────────────────────────────
const INITIAL_USERS = [
  {
    id: 1,
    username: "admin",
    password: "Awin1998h",
    role: "administrator",
    name: "Administrator",
    avatar: "👑",
  },
  {
    id: 2,
    username: "editor",
    password: "Awin1998h",
    role: "editor",
    name: "Editor",
    avatar: "✏️",
  },
  {
    id: 3,
    username: "viewer",
    password: "Awin1998h",
    role: "viewer",
    name: "Viewer",
    avatar: "👁️",
  },
];
// ── Data ───────────────────────────────────────────────────────────────────────
const INITIAL_DATA = {
  brand:   { name: "Zewin", tagline: "Full-Stack Developer", logo: "/logo.jfif", },
  profile: { fullName: "Zana", bio: "Full-stack developer from Kurdistan Region.", email: "zanaaabdulla021@gmail.com", phone: "", location: "Sulaymaniyah, Kurdistan", available: true, avatar: null },
  seo:     { title: "Zewin Group — Full-Stack Development & Tech Solutions", description: "Building modern web applications and AI-powered tools.", keywords: "KurdCod, React, Next.js" },
  social:  { github: "https://github.com/zanaaabdulla021-tech", linkedin: "", twitter: "", email: "zanaaabdulla021@gmail.com", website: "https://zewin.dev" },
  projects: [
    { id:1, title:"PharmTrack",        description:"Multi-branch pharmacy management system.", category:"web",     tags:"React, TypeScript, Odoo",  color:"#3B82F6", featured:true,  year:2024, github:"#", live:"#", order:0 },
    { id:2, title:"Zewin Group", description:"Personal developer brand site.",           category:"web",     tags:"HTML, CSS, GSAP",          color:"#8B5CF6", featured:true,  year:2024, github:"#", live:"#", order:1 },
    { id:3, title:"Prescription OCR",  description:"AI-powered prescription scanning.",        category:"ai",      tags:"Python, Claude API, React", color:"#F59E0B", featured:true,  year:2025, github:"#", live:"",  order:2 },
    { id:4, title:"Inventory Dashboard",description:"Real-time warehouse control panel.",     category:"backend", tags:"Next.js, WebSocket, Odoo",  color:"#10B981", featured:false, year:2024, github:"#", live:"",  order:3 },
  ],
  skills: [
    { id:1, name:"React",      level:95, category:"frontend", icon:"⚛️" },
    { id:2, name:"TypeScript", level:90, category:"frontend", icon:"🔷" },
    { id:3, name:"Next.js",    level:85, category:"frontend", icon:"▲"  },
    { id:4, name:"Python",     level:85, category:"backend",  icon:"🐍" },
    { id:5, name:"Odoo",       level:85, category:"tools",    icon:"🏢" },
    { id:6, name:"Figma",      level:75, category:"design",   icon:"🎨" },
  ],
  blog: [
    { id:"b1", title:"Building PharmTrack", excerpt:"How I built a 12-branch pharmacy system.", content:"Full article here.", tags:"React,Case Study", date:"2025-03-15", readTime:8, cover:"🏥" },
    { id:"b2", title:"Using Claude API for OCR", excerpt:"AI pipeline for prescription scanning.", content:"Full article here.", tags:"AI,Python", date:"2025-01-28", readTime:6, cover:"🤖" },
    { id:"b3", title:"Kurdish Dev Scene 2025", excerpt:"The growing tech community in Kurdistan.", content:"Full article here.", tags:"Community,Kurdistan", date:"2024-11-10", readTime:5, cover:"🌍" },
  ],
  timeline: [
    { id:1, year:"2025", title:"Senior Full-Stack Developer", company:"Pharmacy Group",           description:"Leading PharmTrack across 12 branches.", type:"work"      },
    { id:2, year:"2024", title:"PharmTrack v1.0 Launch",      company:"Internal",                 description:"Shipped first production release.",       type:"project"   },
    { id:3, year:"2021", title:"Computer Science — BSc",       company:"Univ. of Sulaymaniyah",   description:"Graduated in software engineering.",      type:"education" },
  ],
};

const TABS = [
  { id:"brand",    label:"Brand",    icon:"✦", need:"canChangeBrand"  },
  { id:"colors",   label:"Colors",   icon:"🎨", need:"canChangeColors" },
  { id:"profile",  label:"Profile",  icon:"👤", need:"canEdit"         },
  { id:"projects", label:"Projects", icon:"◈", need:null              },
  { id:"skills",   label:"Skills",   icon:"⚡", need:null              },
  { id:"timeline", label:"Timeline", icon:"◎", need:null              },
  { id:"social",   label:"Social",   icon:"↗", need:"canEdit"         },
  { id:"seo",      label:"SEO",      icon:"🔍", need:"canChangeBrand"  },
  { id:"users",    label:"Users",    icon:"👥", need:"canManageUsers"  },
  { id:"blog",     label:"Blog",     icon:"✍️", need:"canEdit"          },
  { id:"analytics",label:"Analytics",icon:"📈", need:"canManageUsers"  },
];

const CAT_OPTIONS = ["web","backend","ai","mobile","design"];
const SKILL_CATS  = ["frontend","backend","tools","design"];
const TL_TYPES    = ["work","project","education"];
const TYPE_COLORS = { work:"#4f8ef7", project:"#f59e0b", education:"#10b981" };
const TYPE_ICONS  = { work:"💼", project:"🚀", education:"🎓" };

function uid(){ return Date.now()+Math.floor(Math.random()*9999); }

// ── Toast ──────────────────────────────────────────────────────────────────────
function ToastContainer({ toasts }: { toasts: { id: string; msg: string; type: "success" | "error" | "info" }[] }){
  return(
    <div style={{position:"fixed",bottom:24,right:24,zIndex:9999,display:"flex",flexDirection:"column",gap:10,pointerEvents:"none"}}>
      {toasts.map(t=>(
        <div key={t.id} style={{padding:"12px 20px",borderRadius:14,fontSize:13,fontWeight:500,display:"flex",alignItems:"center",gap:10,
          background:t.type==="success"?"#16a34a":t.type==="error"?"#dc2626":t.type==="info"?"#2563eb":"#d97706",
          color:"#fff",boxShadow:"0 8px 30px rgba(0,0,0,.3)",animation:"toastIn .3s cubic-bezier(.22,1,.36,1)"}}>
          <span>{t.type==="success"?"✓":t.type==="error"?"✕":"ℹ"}</span>{t.msg}
        </div>
      ))}
    </div>
  );
}
function useToast(){
  const[toasts,setToasts]=useState([]);
  const toast=useCallback((message,type="success")=>{
    const id=uid(); setToasts(t=>[...t,{id,message,type}]);
    setTimeout(()=>setToasts(t=>t.filter(x=>x.id!==id)),3000);
  },[]);
  return{toasts,toast};
}

// ── Shared UI ──────────────────────────────────────────────────────────────────
function Field({label,hint,children}: {label:string;hint?:string;children:React.ReactNode}){
  return(
    <div style={{marginBottom:20}}>
      <label style={{display:"block",fontFamily:"'DM Mono',monospace",fontSize:11,opacity:.5,textTransform:"uppercase",letterSpacing:".1em",marginBottom:7}}>{label}</label>
      {children}
      {hint&&<p style={{fontSize:11,opacity:.4,marginTop:5}}>{hint}</p>}
    </div>
  );
}
function SectionHeader({title,sub}: {title:string;sub:string}){
  return <div style={{marginBottom:32}}><h1 style={{fontFamily:"'DM Serif Display'",fontSize:28,marginBottom:4}}>{title}</h1><p style={{fontSize:14,opacity:.45}}>{sub}</p></div>;
}
function Modal({children,onClose,surface,border}: {children:React.ReactNode;onClose:()=>void;surface:string;border:string}){
  useEffect(()=>{const h=e=>{if(e.key==="Escape")onClose();}; window.addEventListener("keydown",h); return()=>window.removeEventListener("keydown",h);},[onClose]);
  return(
    <div onClick={onClose} style={{position:"fixed",inset:0,zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",padding:24,background:"rgba(0,0,0,.65)",backdropFilter:"blur(10px)"}}>
      <div onClick={e=>e.stopPropagation()} style={{width:"100%",maxWidth:560,maxHeight:"88vh",overflowY:"auto",background:surface,border:`1px solid ${border}`,borderRadius:24,padding:32,animation:"slideIn .25s cubic-bezier(.22,1,.36,1)"}}>
        {children}
      </div>
    </div>
  );
}
function DeleteConfirm({show,onConfirm,onCancel,surface,border}: {show:boolean;onConfirm:()=>void;onCancel:()=>void;surface:string;border:string}){
  if(!show) return null;
  return(
    <div onClick={onCancel} style={{position:"fixed",inset:0,zIndex:400,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,.6)",backdropFilter:"blur(8px)"}}>
      <div onClick={e=>e.stopPropagation()} style={{background:surface,border:`1px solid ${border}`,borderRadius:20,padding:28,maxWidth:340,width:"100%",textAlign:"center",animation:"slideIn .2s ease"}}>
        <div style={{fontSize:40,marginBottom:12}}>🗑️</div>
        <h3 style={{fontFamily:"'DM Serif Display'",fontSize:20,marginBottom:8}}>Delete?</h3>
        <p style={{fontSize:13,opacity:.5,marginBottom:24}}>This cannot be undone.</p>
        <div style={{display:"flex",gap:10,justifyContent:"center"}}>
          <button onClick={onCancel} style={{padding:"9px 20px",borderRadius:99,background:"transparent",border:`1px solid ${border}`,fontSize:13,cursor:"pointer"}}>Cancel</button>
          <button onClick={onConfirm} style={{padding:"9px 20px",borderRadius:99,background:"#ef4444",color:"#fff",border:"none",fontSize:13,fontWeight:600,cursor:"pointer"}}>Delete</button>
        </div>
      </div>
    </div>
  );
}
function useDragList(items,setItems){
  const di=useRef(null),dov=useRef(null);
  const onDragStart=i=>{di.current=i;};
  const onDragEnter=i=>{dov.current=i;};
  const onDragEnd=()=>{
    if(di.current===null||dov.current===null||di.current===dov.current)return;
    const next=[...items]; const[moved]=next.splice(di.current,1); next.splice(dov.current,0,moved);
    setItems(next.map((it,i)=>({...it,order:i}))); di.current=null; dov.current=null;
  };
  return{onDragStart,onDragEnter,onDragEnd};
}

// ── Viewer Blocked Screen ─────────────────────────────────────────────────────
function ViewerBlocked({ dark }: { dark: boolean }){
  const fg=dark?"#e8eaf0":"#111318"; const muted=dark?"#7c8593":"#8a8f9a";
  return(
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:16,fontFamily:"'DM Sans',sans-serif",color:fg,textAlign:"center",padding:24}}>
      <div style={{fontSize:64}}>🔒</div>
      <h2 style={{fontFamily:"'DM Serif Display'",fontSize:32,color:fg}}>Access Denied</h2>
      <p style={{fontSize:15,color:muted,maxWidth:360}}>Your account is a <strong style={{color:"#10b981"}}>Viewer</strong> — you can only view the public portfolio. You don't have access to the admin panel.</p>
      <div style={{marginTop:8,padding:"10px 20px",borderRadius:12,background:"#10b98118",border:"1px solid #10b98133",color:"#10b981",fontSize:13,fontWeight:500}}>👁 Viewer role — read only</div>
    </div>
  );
}

// ── Login Screen ───────────────────────────────────────────────────────────────
function LoginScreen({onLogin,dark,setDark}: {onLogin:(u:any)=>void;dark:boolean;setDark:(v:boolean)=>void}){
  const[u,setU]=useState(""); const[p,setP]=useState(""); const[err,setErr]=useState(""); const[show,setShow]=useState(false);
  const bg=dark?"#0d1117":"#f5f6f8"; const fg=dark?"#e8eaf0":"#111318";
  const surface=dark?"#161b22":"#ffffff"; const surface2=dark?"#1e2530":"#eef0f5";
  const border=dark?"#2a3140":"#dde0e8"; const muted=dark?"#7c8593":"#8a8f9a";

  const attempt=()=>{
    const found=INITIAL_USERS.find(x=>x.username===u&&x.password===p);
    if(found){ setErr(""); onLogin(found); }
    else setErr("Invalid username or password");
  };

  return(
    <div style={{minHeight:"100vh",background:bg,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Sans',sans-serif",position:"relative"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');*{box-sizing:border-box;margin:0;padding:0}input{font-family:'DM Sans',sans-serif}@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none"}}>
        <div style={{position:"absolute",top:"15%",left:"20%",width:400,height:400,borderRadius:"50%",background:"#4f8ef718",filter:"blur(80px)"}}/>
        <div style={{position:"absolute",bottom:"20%",right:"20%",width:300,height:300,borderRadius:"50%",background:"#a78bfa18",filter:"blur(80px)"}}/>
      </div>
      <button onClick={()=>setDark(!dark)} style={{position:"absolute",top:24,right:24,width:36,height:36,borderRadius:"50%",border:`1px solid ${border}`,background:surface2,cursor:"pointer",fontSize:16}}>{dark?"☀️":"🌙"}</button>
      <div style={{width:"100%",maxWidth:420,padding:24,animation:"fadeUp .5s ease"}}>
        <div style={{textAlign:"center",marginBottom:36}}>
          <div style={{width:64,height:64,borderRadius:20,background:"linear-gradient(135deg,#4f8ef7,#a78bfa)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",boxShadow:"0 12px 40px #4f8ef733"}}>
            <span style={{fontFamily:"'DM Mono'",fontWeight:700,fontSize:22,color:"#fff"}}>KC</span>
          </div>
          <h1 style={{fontFamily:"'DM Serif Display'",fontSize:28,color:fg,marginBottom:6}}>Welcome back</h1>
          <p style={{fontSize:14,color:muted}}>Sign in to your portfolio admin</p>
        </div>
        <div style={{background:surface,border:`1px solid ${border}`,borderRadius:24,padding:32,boxShadow:`0 20px 60px rgba(0,0,0,${dark?.2:.08})`}}>
          <div style={{marginBottom:16}}>
            <label style={{display:"block",fontFamily:"'DM Mono'",fontSize:11,opacity:.5,textTransform:"uppercase",letterSpacing:".1em",marginBottom:7}}>Username</label>
            <input value={u} onChange={e=>{setU(e.target.value);setErr("");}} onKeyDown={e=>e.key==="Enter"&&attempt()}
              style={{width:"100%",padding:"11px 14px",borderRadius:12,background:surface2,border:`1.5px solid ${err?"#ef4444":border}`,color:fg,fontSize:14,outline:"none"}} placeholder="admin"/>
          </div>
          <div style={{marginBottom:16}}>
            <label style={{display:"block",fontFamily:"'DM Mono'",fontSize:11,opacity:.5,textTransform:"uppercase",letterSpacing:".1em",marginBottom:7}}>Password</label>
            <div style={{position:"relative"}}>
              <input type={show?"text":"password"} value={p} onChange={e=>{setP(e.target.value);setErr("");}} onKeyDown={e=>e.key==="Enter"&&attempt()}
                style={{width:"100%",padding:"11px 44px 11px 14px",borderRadius:12,background:surface2,border:`1.5px solid ${err?"#ef4444":border}`,color:fg,fontSize:14,outline:"none"}} placeholder="••••••••"/>
              <button onClick={()=>setShow(!show)} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",fontSize:16,color:muted}}>{show?"🙈":"👁"}</button>
            </div>
          </div>
          {err&&<div style={{padding:"10px 14px",borderRadius:10,background:"#ef444415",border:"1px solid #ef444430",color:"#ef4444",fontSize:13,marginBottom:16}}>⚠ {err}</div>}
          <button onClick={attempt} style={{width:"100%",padding:"12px",borderRadius:12,background:"linear-gradient(135deg,#4f8ef7,#a78bfa)",color:"#fff",fontSize:14,fontWeight:600,border:"none",cursor:"pointer",boxShadow:"0 4px 16px #4f8ef733"}}>
            Sign in →
          </button>
        </div>
        {/* Demo accounts */}
        <div style={{marginTop:20,padding:16,borderRadius:16,background:surface2,border:`1px solid ${border}`}}>
          <p style={{fontFamily:"'DM Mono'",fontSize:10,color:muted,textTransform:"uppercase",letterSpacing:".1em",marginBottom:10}}>Demo accounts</p>
          {INITIAL_USERS.map(usr=>{
            const rc=ROLE_CONFIG[usr.role];
            return(
              <button key={usr.id} onClick={()=>{setU(usr.username);setP(usr.password);setErr("");}}
                style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"8px 10px",borderRadius:10,border:`1px solid ${border}`,background:"transparent",cursor:"pointer",marginBottom:6,textAlign:"left"}}
                onMouseEnter={e=>e.currentTarget.style.borderColor=rc.color} onMouseLeave={e=>e.currentTarget.style.borderColor=border}>
                <span style={{fontSize:18}}>{usr.avatar}</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:500,color:fg}}>{usr.name}</div>
                  <div style={{fontFamily:"'DM Mono'",fontSize:11,color:muted}}>{usr.username} / {usr.password}</div>
                </div>
                <span style={{fontSize:11,padding:"2px 8px",borderRadius:99,background:`${rc.color}20`,color:rc.color,fontWeight:600}}>{rc.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── MAIN ADMIN ─────────────────────────────────────────────────────────────────
export default function PortfolioAdmin(){
  const[currentUser,setCurrentUser]=useState(null);
  const[dark,setDark]=useState(true);
  const[data,setData]=useState(INITIAL_DATA);
  const[draft,setDraft]=useState(INITIAL_DATA);
  const[activeTab,setActiveTab]=useState("projects");
  const[projectSearch,setPS]=useState("");
  const[projectFilter,setPF]=useState("all");
  const[editingProject,setEP]=useState(null);
  const[editingSkill,setES]=useState(null);
  const[editingTimeline,setET]=useState(null);
  const[editingUser,setEU]=useState(null);
  const[deleteTarget,setDT]=useState(null);
  const[users,setUsers]=useState(INITIAL_USERS);
  const[editBlog,setEditBlog]=useState(null);
  const[previewOpen,setPreviewOpen]=useState(false);
  const[isMobile,setIsMobile]=useState(false);
  const{toasts,toast}=useToast();
  const logoRef=useRef<HTMLInputElement|null>(null); const avatarRef=useRef<HTMLInputElement|null>(null); const importRef=useRef<HTMLInputElement|null>(null);

  useEffect(()=>{
    const check=()=>setIsMobile(window.innerWidth<768);
    check();
    window.addEventListener("resize",check); return()=>window.removeEventListener("resize",check);
  },[]);

  const bg      =dark?"#0d1117":"#f5f6f8";
  const fg      =dark?"#e8eaf0":"#111318";
  const surface =dark?"#161b22":"#ffffff";
  const surface2=dark?"#1e2530":"#eef0f5";
  const border  =dark?"#2a3140":"#dde0e8";
  const muted   =dark?"#7c8593":"#8a8f9a";
  const accent  =draft.brand.accentColor;
  const accent2 =draft.brand.secondColor;
  const isDirty =JSON.stringify(draft)!==JSON.stringify(data);

  const role=currentUser?ROLE_CONFIG[currentUser.role]:null;

  const inp={width:"100%",padding:"10px 14px",borderRadius:12,background:surface2,border:`1.5px solid ${border}`,color:fg,fontSize:14,outline:"none",transition:"border-color .2s"};
  const btnP={padding:"9px 20px",borderRadius:99,background:`linear-gradient(135deg,${accent},${accent2})`,color:"#fff",fontSize:13,fontWeight:600,border:"none",cursor:"pointer"};
  const btnS={padding:"9px 16px",borderRadius:99,background:surface2,color:fg,border:`1px solid ${border}`,fontSize:13,cursor:"pointer"};
  const btnD={padding:"7px 14px",borderRadius:99,background:"#ef444418",color:"#ef4444",border:"1px solid #ef444430",fontSize:12,cursor:"pointer"};
  const card={padding:18,borderRadius:16,background:surface,border:`1px solid ${border}`,marginBottom:10};

  const upd=(sec,key,val)=>setDraft(d=>({...d,[sec]:{...d[sec],[key]:val}}));
  const handleImg=(ref,cb)=>{
    ref.current.value=""; ref.current.click();
    ref.current.onchange=e=>{
      const f=(e.target as HTMLInputElement).files?.[0]; if(!f) return;
      if(f.size>2*1024*1024){toast("Max 2MB","error");return;}
      const r=new FileReader(); r.onload=ev=>cb(ev.target?.result as string); r.readAsDataURL(f);
    };
  };
  const handleSave=()=>{setData({...draft}); toast("Saved!","success");};
  const handleReset=()=>{setDraft({...data}); toast("Reset","info");};
  const handleExport=()=>{
    const a=document.createElement("a");
    a.href=URL.createObjectURL(new Blob([JSON.stringify(draft,null,2)],{type:"application/json"}));
    a.download=`${draft.brand.name.toLowerCase().replace(/\s+/g,"-")}-data.json`; a.click(); toast("Exported!","success");
  };
  const handleImport=()=>{
    importRef.current.value=""; importRef.current.click();
    importRef.current.onchange=e=>{
      const f=(e.target as HTMLInputElement).files?.[0]; if(!f) return;
      const r=new FileReader();
      r.onload=ev=>{try{const p=JSON.parse(ev.target?.result as string); if(!p.brand||!p.profile)throw 0; setDraft(p); toast("Imported!","success");}catch{toast("Invalid JSON","error");}};
      r.readAsText(f);
    };
  };

  const setProjects=ps=>setDraft(d=>({...d,projects:ps}));
  const{onDragStart,onDragEnter,onDragEnd}=useDragList(draft.projects,setProjects);

  const filteredProjects=draft.projects
    .filter(p=>{
      const s=!projectSearch||[p.title,p.description,p.tags].join(" ").toLowerCase().includes(projectSearch.toLowerCase());
      const c=projectFilter==="all"||p.category===projectFilter;
      return s&&c;
    }).sort((a,b)=>(a.order??0)-(b.order??0));

  const css=`
    /* fonts loaded via layout.tsx */
    *{box-sizing:border-box;margin:0;padding:0}body{font-family:'DM Sans',sans-serif}
    input,textarea,select{font-family:'DM Sans',sans-serif}
    input[type=color]{-webkit-appearance:none;padding:0;border:none}
    input[type=color]::-webkit-color-swatch-wrapper{padding:0}
    input[type=color]::-webkit-color-swatch{border:none;border-radius:6px}
    input[type=range]{width:100%;accent-color:${accent};cursor:pointer}
    ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:${border};border-radius:2px}
    .ff:focus{border-color:${accent}!important}.hov:hover{background:${surface2}!important}
    @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
    @keyframes slideIn{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}
    @keyframes toastIn{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
    @keyframes spin{to{transform:rotate(360deg)}}
  `;

  // ── BRAND ──
  const renderBrand=()=>(
    <div style={{maxWidth:620,animation:"fadeUp .3s ease"}}>
      <SectionHeader title="Brand" sub="Customize your name and logo."/>
      <Field label="Logo">
        <div style={{display:"flex",gap:16,alignItems:"flex-start"}}>
          <div style={{width:72,height:72,borderRadius:18,background:`linear-gradient(135deg,${accent}33,${surface2})`,border:`2px solid ${accent}55`,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",flexShrink:0}}>
            {draft.brand.logo?<img src={draft.brand.logo} style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<span style={{fontFamily:"'DM Mono'",fontWeight:700,fontSize:20,background:`linear-gradient(135deg,${accent},${accent2})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{(draft.brand.name||"ZW").slice(0,2).toUpperCase()}</span>}
          </div>
          <div style={{flex:1}}>
            <input ref={logoRef} type="file" accept="image/*" style={{display:"none"}}/>
            <button onClick={()=>handleImg(logoRef,v=>{upd("brand","logo",v);toast("Logo updated!","success");})} style={{...btnS,width:"100%",marginBottom:8}}>📁 Upload logo</button>
            {draft.brand.logo&&<button onClick={()=>{upd("brand","logo",null);toast("Removed","info");}} style={{fontSize:12,color:"#ef4444",background:"none",border:"none",cursor:"pointer"}}>✕ Remove</button>}
            <p style={{fontSize:11,color:muted,marginTop:4}}>PNG, JPG, SVG — max 2MB</p>
          </div>
        </div>
      </Field>
      <div className="two-col" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        <Field label="Brand Name"><input className="ff" style={inp} value={draft.brand.name} onChange={e=>upd("brand","name",e.target.value)}/></Field>
        <Field label="Tagline"><input className="ff" style={inp} value={draft.brand.tagline} onChange={e=>upd("brand","tagline",e.target.value)}/></Field>
      </div>
      {/* Nav preview */}
      <div style={{height:1,background:border,margin:"20px 0"}}/>
      <p style={{fontFamily:"'DM Mono'",fontSize:11,color:muted,textTransform:"uppercase",letterSpacing:".1em",marginBottom:14}}>Preview</p>
      <div style={{padding:"14px 20px",borderRadius:14,background:`${surface}ee`,border:`1px solid ${border}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:26,height:26,borderRadius:8,background:`linear-gradient(135deg,${accent},${accent2})`,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"}}>
            {draft.brand.logo?<img src={draft.brand.logo} style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<span style={{fontFamily:"'DM Mono'",fontWeight:700,fontSize:10,color:"#fff"}}>{(draft.brand.name||"ZW").slice(0,2).toUpperCase()}</span>}
          </div>
          <span style={{fontFamily:"'DM Mono'",fontWeight:700,fontSize:13,background:`linear-gradient(135deg,${accent},${accent2})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{draft.brand.name||"Portfolio"}</span>
        </div>
        <div style={{display:"flex",gap:12}}>{["About","Projects","Skills","Contact"].map(l=><span key={l} style={{fontSize:12,color:muted}}>{l}</span>)}</div>
        <div style={{padding:"5px 14px",borderRadius:99,background:fg,color:bg,fontSize:12,fontWeight:600}}>Hire me</div>
      </div>
    </div>
  );

  // ── COLORS ──
  const COLOR_PRESETS=[{name:"Blue",a:"#4f8ef7",b:"#a78bfa"},{name:"Emerald",a:"#10b981",b:"#06b6d4"},{name:"Amber",a:"#f59e0b",b:"#ef4444"},{name:"Rose",a:"#f43f5e",b:"#ec4899"},{name:"Slate",a:"#64748b",b:"#94a3b8"},{name:"Violet",a:"#7c3aed",b:"#db2777"},{name:"Cyan",a:"#0891b2",b:"#059669"},{name:"Orange",a:"#ea580c",b:"#d97706"}];
  const renderColors=()=>(
    <div style={{maxWidth:680,animation:"fadeUp .3s ease"}}>
      <SectionHeader title="Colors" sub="Change the accent colors of your entire portfolio website."/>

      {/* Big preview */}
      <div style={{borderRadius:20,overflow:"hidden",border:`1px solid ${border}`,marginBottom:32}}>
        {/* Hero mini preview */}
        <div style={{padding:"32px 28px",background:dark?"#0a0f16":"#f2f3f7",position:"relative",overflow:"hidden",textAlign:"center"}}>
          <div style={{position:"absolute",top:"10%",left:"20%",width:120,height:120,borderRadius:"50%",background:`${accent}20`,filter:"blur(30px)"}}/>
          <div style={{position:"absolute",bottom:"10%",right:"20%",width:100,height:100,borderRadius:"50%",background:`${accent2}20`,filter:"blur(30px)"}}/>
          <div style={{position:"relative"}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:6,marginBottom:16,padding:"4px 12px",borderRadius:99,border:`1px solid ${border}`,background:`${surface}99`,fontSize:12,color:muted}}>
              <span style={{width:6,height:6,borderRadius:"50%",background:"#22c55e",display:"inline-block",animation:"pulse 2s infinite"}}/>Available for work
            </div>
            <div style={{fontFamily:"'DM Serif Display'",fontSize:40,lineHeight:.95,marginBottom:12,color:fg}}>
              Full-Stack<br/>
              <span style={{background:`linear-gradient(135deg,${accent},${accent2})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",fontStyle:"italic"}}>Developer</span>
            </div>
            <div style={{display:"flex",gap:10,justifyContent:"center",marginTop:16}}>
              <div style={{padding:"8px 20px",borderRadius:99,background:fg,color:bg,fontSize:12,fontWeight:600}}>View work</div>
              <div style={{padding:"8px 20px",borderRadius:99,border:`1px solid ${border}`,color:fg,fontSize:12}}>Contact</div>
            </div>
          </div>
        </div>
        {/* Skill bar preview */}
        <div style={{padding:"16px 24px",background:surface,borderTop:`1px solid ${border}`,display:"flex",gap:16,alignItems:"center"}}>
          <span style={{fontSize:14,color:muted,flexShrink:0}}>Skill preview:</span>
          <div style={{flex:1}}>
            <div style={{height:6,background:surface2,borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",width:"85%",background:`linear-gradient(90deg,${accent},${accent2})`,borderRadius:3}}/></div>
          </div>
          <span style={{fontFamily:"'DM Mono'",fontSize:12,color:accent,flexShrink:0}}>85%</span>
        </div>
        {/* Nav preview */}
        <div style={{padding:"12px 24px",background:surface,borderTop:`1px solid ${border}`,display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:22,height:22,borderRadius:7,background:`linear-gradient(135deg,${accent},${accent2})`,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <span style={{fontFamily:"'DM Mono'",fontWeight:700,fontSize:9,color:"#fff"}}>{(draft.brand.name||"ZW").slice(0,2).toUpperCase()}</span>
          </div>
          <span style={{fontFamily:"'DM Mono'",fontWeight:700,fontSize:12,background:`linear-gradient(135deg,${accent},${accent2})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{draft.brand.name}</span>
          <div style={{flex:1}}/>
          <div style={{padding:"4px 12px",borderRadius:99,background:fg,color:bg,fontSize:11,fontWeight:600}}>Hire me</div>
        </div>
      </div>

      {/* Color pickers */}
      <div className="two-col" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:24}}>
        {[["accentColor","Primary Color","Used for buttons, links, active states"],["secondColor","Secondary Color","Used in gradients alongside primary"]].map(([key,lbl,desc])=>(
          <div key={key} style={{padding:20,borderRadius:16,background:surface,border:`1px solid ${border}`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
              <div><div style={{fontSize:14,fontWeight:600,color:fg,marginBottom:2}}>{lbl}</div><div style={{fontSize:12,color:muted}}>{desc}</div></div>
              <label style={{cursor:"pointer",flexShrink:0}}>
                <div style={{width:44,height:44,borderRadius:12,background:draft.brand[key],border:`2px solid ${border}`,position:"relative",overflow:"hidden",boxShadow:`0 4px 12px ${draft.brand[key]}44`}}>
                  <input type="color" value={draft.brand[key]} onChange={e=>upd("brand",key,e.target.value)} style={{position:"absolute",inset:0,width:"200%",height:"200%",opacity:0,cursor:"pointer"}}/>
                </div>
              </label>
            </div>
            <div style={{fontFamily:"'DM Mono'",fontSize:12,color:muted,background:surface2,padding:"6px 10px",borderRadius:8,marginBottom:10}}>{draft.brand[key]}</div>
            {/* Mini swatches */}
            <div style={{display:"flex",gap:4}}>
              {["#4f8ef7","#10b981","#f59e0b","#f43f5e","#7c3aed","#0891b2","#ea580c","#64748b"].map(c=>(
                <button key={c} onClick={()=>upd("brand",key,c)} style={{width:20,height:20,borderRadius:"50%",background:c,border:`2px solid ${draft.brand[key]===c?fg:"transparent"}`,cursor:"pointer",transition:"transform .15s"}}
                  onMouseEnter={e=>e.currentTarget.style.transform="scale(1.2)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}/>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Preset palettes */}
      <Field label="Preset Palettes">
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
          {COLOR_PRESETS.map(p=>{
            const active=draft.brand.accentColor===p.a&&draft.brand.secondColor===p.b;
            return(
              <button key={p.name} onClick={()=>{setDraft(d=>({...d,brand:{...d.brand,accentColor:p.a,secondColor:p.b}}));toast(`${p.name} applied`,"success");}}
                style={{padding:"14px 10px",borderRadius:14,border:`2px solid ${active?p.a:border}`,background:active?`${p.a}10`:surface2,cursor:"pointer",textAlign:"center",transition:"all .15s"}}>
                <div style={{display:"flex",gap:4,justifyContent:"center",marginBottom:8}}>
                  <div style={{width:20,height:20,borderRadius:"50%",background:p.a}}/>
                  <div style={{width:20,height:20,borderRadius:"50%",background:p.b}}/>
                </div>
                <div style={{fontSize:12,fontWeight:500,color:active?p.a:fg}}>{p.name}</div>
              </button>
            );
          })}
        </div>
      </Field>

      {/* Gradient preview */}
      <div style={{padding:20,borderRadius:16,background:`linear-gradient(135deg,${accent},${accent2})`,marginTop:8,textAlign:"center"}}>
        <p style={{fontSize:14,fontWeight:600,color:"#fff",marginBottom:4}}>Current Gradient</p>
        <p style={{fontSize:12,color:"rgba(255,255,255,.7)",fontFamily:"'DM Mono'"}}>{accent} → {accent2}</p>
      </div>
    </div>
  );

  // ── PROFILE ──
  const renderProfile=()=>(
    <div style={{maxWidth:620,animation:"fadeUp .3s ease"}}>
      <SectionHeader title="Profile" sub="Your personal information."/>
      <Field label="Avatar">
        <div style={{display:"flex",gap:16,alignItems:"center"}}>
          <div style={{width:72,height:72,borderRadius:"50%",background:surface2,border:`2px solid ${border}`,overflow:"hidden",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:36}}>
            {draft.profile.avatar?<img src={draft.profile.avatar} style={{width:"100%",height:"100%",objectFit:"cover"}}/>:"👤"}
          </div>
          <div>
            <input ref={avatarRef} type="file" accept="image/*" style={{display:"none"}}/>
            <button onClick={()=>handleImg(avatarRef,v=>{upd("profile","avatar",v);toast("Updated!","success");})} style={{...btnS,marginBottom:6}}>Upload photo</button>
            {draft.profile.avatar&&<button onClick={()=>{upd("profile","avatar",null);toast("Removed","info");}} style={{fontSize:12,color:"#ef4444",background:"none",border:"none",cursor:"pointer",display:"block"}}>✕ Remove</button>}
          </div>
        </div>
      </Field>
      <div className="two-col" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        <Field label="Full Name"><input className="ff" style={inp} value={draft.profile.fullName} onChange={e=>upd("profile","fullName",e.target.value)}/></Field>
        <Field label="Location"><input className="ff" style={inp} value={draft.profile.location} onChange={e=>upd("profile","location",e.target.value)}/></Field>
        <Field label="Email"><input className="ff" style={inp} type="email" value={draft.profile.email} onChange={e=>upd("profile","email",e.target.value)}/></Field>
        <Field label="Phone"><input className="ff" style={inp} value={draft.profile.phone} onChange={e=>upd("profile","phone",e.target.value)} placeholder="+964 ..."/></Field>
      </div>
      <Field label="Bio"><textarea className="ff" rows={4} style={{...inp,resize:"none"}} value={draft.profile.bio} onChange={e=>upd("profile","bio",e.target.value)}/></Field>
      <Field label="Availability">
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <button onClick={()=>upd("profile","available",!draft.profile.available)} style={{width:44,height:24,borderRadius:12,background:draft.profile.available?accent:surface2,border:`1px solid ${border}`,cursor:"pointer",position:"relative",transition:"background .2s",padding:0,flexShrink:0}}>
            <div style={{position:"absolute",top:3,left:draft.profile.available?22:3,width:18,height:18,borderRadius:"50%",background:"#fff",transition:"left .2s",boxShadow:"0 1px 4px #0004"}}/>
          </button>
          <span style={{fontSize:14,color:draft.profile.available?"#22c55e":muted,fontWeight:500}}>{draft.profile.available?"✓ Available for work":"Not available"}</span>
        </div>
      </Field>
    </div>
  );

  // ── PROJECTS ──
  const renderProjects=()=>{
    const canEdit=role?.canEdit;
    const openEdit=p=>setEP(p?{...p}:{id:uid(),title:"",description:"",category:"web",tags:"",color:"#4f8ef7",featured:false,year:new Date().getFullYear(),github:"",live:"",order:draft.projects.length});
    const saveProject=()=>{
      setDraft(d=>{const ex=d.projects.find(p=>p.id===editingProject.id); return{...d,projects:ex?d.projects.map(p=>p.id===editingProject.id?editingProject:p):[...d.projects,editingProject]};});
      toast(draft.projects.find(p=>p.id===editingProject.id)?"Updated!":"Added!","success"); setEP(null);
    };
    return(
      <div style={{animation:"fadeUp .3s ease"}}>
        <div className="section-header-row" style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24,flexWrap:"wrap",gap:12}}>
          <div><h1 style={{fontFamily:"'DM Serif Display'",fontSize:28,marginBottom:2}}>Projects</h1><p style={{fontSize:14,opacity:.45}}>{draft.projects.length} total{canEdit?" · drag to reorder":""}</p></div>
          {canEdit&&<button onClick={()=>openEdit(null)} style={btnP}>+ Add project</button>}
        </div>
        <div style={{display:"flex",gap:10,marginBottom:20,flexWrap:"wrap"}}>
          <div style={{position:"relative",flex:1,minWidth:200}}>
            <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:muted,fontSize:14}}>🔍</span>
            <input className="ff" style={{...inp,paddingLeft:36}} value={projectSearch} onChange={e=>setPS(e.target.value)} placeholder="Search..."/>
          </div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {["all",...CAT_OPTIONS].map(c=>(
              <button key={c} onClick={()=>setPF(c)} style={{padding:"8px 14px",borderRadius:99,fontSize:12,fontWeight:500,cursor:"pointer",border:"none",background:projectFilter===c?fg:surface2,color:projectFilter===c?bg:muted}}>
                {c==="all"?"All":c}
              </button>
            ))}
          </div>
        </div>
        {filteredProjects.length===0&&<div style={{textAlign:"center",padding:"48px 0",color:muted}}><div style={{fontSize:36,marginBottom:8}}>🔍</div><p>No results</p></div>}
        {filteredProjects.map(p=>(
          <div key={p.id} draggable={canEdit} onDragStart={()=>canEdit&&onDragStart(draft.projects.findIndex(x=>x.id===p.id))} onDragEnter={()=>canEdit&&onDragEnter(draft.projects.findIndex(x=>x.id===p.id))} onDragEnd={onDragEnd} onDragOver={e=>e.preventDefault()} className="hov" style={{...card,display:"flex",alignItems:"center",gap:14,cursor:canEdit?"grab":"default",transition:"all .15s"}}>
            {canEdit&&<span style={{color:muted,fontSize:16,flexShrink:0}}>⠿</span>}
            <div style={{width:40,height:40,borderRadius:10,background:`${p.color}22`,border:`1px solid ${p.color}44`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><div style={{width:14,height:14,borderRadius:"50%",background:p.color}}/></div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2,flexWrap:"wrap"}}>
                <span style={{fontSize:14,fontWeight:600,color:fg}}>{p.title}</span>
                {p.featured&&<span style={{fontSize:10,fontFamily:"'DM Mono'",padding:"1px 7px",borderRadius:99,background:`${accent}20`,color:accent}}>Featured</span>}
                <span style={{fontSize:10,fontFamily:"'DM Mono'",padding:"1px 7px",borderRadius:99,background:surface2,color:muted}}>{p.category}</span>
              </div>
              <p style={{fontSize:12,color:muted,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.description}</p>
            </div>
            <div style={{display:"flex",gap:8,flexShrink:0}}>
              {canEdit&&<button onClick={()=>openEdit(p)} style={btnS}>Edit</button>}
              {role?.canDelete&&<button onClick={()=>setDT({type:"project",id:p.id})} style={btnD}>Delete</button>}
              {!canEdit&&<span style={{fontSize:12,color:muted,padding:"6px 10px",borderRadius:99,background:surface2}}>View only</span>}
            </div>
          </div>
        ))}
        {editingProject&&(
          <Modal onClose={()=>setEP(null)} surface={surface} border={border}>
            <h3 style={{fontFamily:"'DM Serif Display'",fontSize:22,color:fg,marginBottom:20}}>{draft.projects.find(p=>p.id===editingProject.id)?"Edit Project":"New Project"}</h3>
            <div className="two-col" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
              <Field label="Title"><input className="ff" style={{...inp,color:fg}} value={editingProject.title} onChange={e=>setEP({...editingProject,title:e.target.value})}/></Field>
              <Field label="Year"><input className="ff" style={{...inp,color:fg}} type="number" value={editingProject.year} onChange={e=>setEP({...editingProject,year:+e.target.value})}/></Field>
            </div>
            <Field label="Description"><textarea className="ff" rows={2} style={{...inp,resize:"none",color:fg}} value={editingProject.description} onChange={e=>setEP({...editingProject,description:e.target.value})}/></Field>
            <div className="two-col" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
              <Field label="Category"><select className="ff" style={{...inp,color:fg}} value={editingProject.category} onChange={e=>setEP({...editingProject,category:e.target.value})}>{CAT_OPTIONS.map(c=><option key={c} value={c}>{c}</option>)}</select></Field>
              <Field label="Color">
                <div style={{display:"flex",gap:10,alignItems:"center"}}>
                  <div style={{width:40,height:40,borderRadius:10,background:editingProject.color,border:`2px solid ${border}`,position:"relative",overflow:"hidden",flexShrink:0}}>
                    <input type="color" value={editingProject.color} onChange={e=>setEP({...editingProject,color:e.target.value})} style={{position:"absolute",inset:0,width:"200%",height:"200%",opacity:0,cursor:"pointer"}}/>
                  </div>
                  <input className="ff" style={{...inp,color:fg}} value={editingProject.color} onChange={e=>setEP({...editingProject,color:e.target.value})}/>
                </div>
              </Field>
            </div>
            <Field label="Tags"><input className="ff" style={{...inp,color:fg}} value={editingProject.tags} onChange={e=>setEP({...editingProject,tags:e.target.value})}/></Field>
            <div className="two-col" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
              <Field label="GitHub"><input className="ff" style={{...inp,color:fg}} value={editingProject.github} onChange={e=>setEP({...editingProject,github:e.target.value})}/></Field>
              <Field label="Live URL"><input className="ff" style={{...inp,color:fg}} value={editingProject.live} onChange={e=>setEP({...editingProject,live:e.target.value})}/></Field>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:24}}>
              <button onClick={()=>setEP({...editingProject,featured:!editingProject.featured})} style={{width:40,height:22,borderRadius:11,background:editingProject.featured?accent:surface2,border:`1px solid ${border}`,cursor:"pointer",position:"relative",padding:0,transition:"background .2s",flexShrink:0}}>
                <div style={{position:"absolute",top:2,left:editingProject.featured?20:2,width:18,height:18,borderRadius:"50%",background:"#fff",transition:"left .2s"}}/>
              </button>
              <span style={{fontSize:13,color:fg}}>Featured</span>
            </div>
            <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
              <button onClick={()=>setEP(null)} style={{...btnS,color:fg}}>Cancel</button>
              <button onClick={saveProject} style={btnP}>Save</button>
            </div>
          </Modal>
        )}
        <DeleteConfirm show={deleteTarget?.type==="project"} onConfirm={()=>{setDraft(d=>({...d,projects:d.projects.filter(p=>p.id!==deleteTarget.id)}));toast("Deleted","info");setDT(null);}} onCancel={()=>setDT(null)} surface={surface} border={border}/>
      </div>
    );
  };

  // ── SKILLS ──
  const renderSkills=()=>{
    const canEdit=role?.canEdit;
    const openEdit=s=>setES(s?{...s}:{id:uid(),name:"",level:80,category:"frontend",icon:"⚡"});
    const saveSkill=()=>{
      setDraft(d=>{const ex=d.skills.find(s=>s.id===editingSkill.id); return{...d,skills:ex?d.skills.map(s=>s.id===editingSkill.id?editingSkill:s):[...d.skills,editingSkill]};});
      toast("Saved!","success"); setES(null);
    };
    const grouped=draft.skills.reduce((a:Record<string,any[]>,s:any)=>{if(!a[s.category])a[s.category]=[];a[s.category].push(s);return a;},{} as Record<string,any[]>);
    return(
      <div style={{animation:"fadeUp .3s ease"}}>
        <div className="section-header-row" style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:32}}>
          <div><h1 style={{fontFamily:"'DM Serif Display'",fontSize:28,marginBottom:2}}>Skills</h1><p style={{fontSize:14,opacity:.45}}>{draft.skills.length} skills</p></div>
          {canEdit&&<button onClick={()=>openEdit(null)} style={btnP}>+ Add skill</button>}
        </div>
        {Object.entries(grouped).map(([cat,cs])=>(
          <div key={cat} style={{marginBottom:28}}>
            <p style={{fontFamily:"'DM Mono'",fontSize:11,color:muted,textTransform:"uppercase",letterSpacing:".1em",marginBottom:10}}>{cat}</p>
            {cs.map(sk=>(
              <div key={sk.id} className="hov" style={{...card,display:"flex",alignItems:"center",gap:14,transition:"background .15s"}}>
                <span style={{fontSize:22,flexShrink:0}}>{sk.icon}</span>
                <div style={{flex:1}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                    <span style={{fontSize:14,fontWeight:500,color:fg}}>{sk.name}</span>
                    <span style={{fontFamily:"'DM Mono'",fontSize:12,color:muted}}>{sk.level}%</span>
                  </div>
                  <div style={{height:5,background:surface2,borderRadius:3}}><div style={{height:"100%",width:`${sk.level}%`,borderRadius:3,background:`linear-gradient(90deg,${accent},${accent2})`}}/></div>
                </div>
                <div style={{display:"flex",gap:8,flexShrink:0}}>
                  {canEdit&&<button onClick={()=>openEdit(sk)} style={btnS}>Edit</button>}
                  {role?.canDelete&&<button onClick={()=>setDT({type:"skill",id:sk.id})} style={btnD}>Delete</button>}
                </div>
              </div>
            ))}
          </div>
        ))}
        {editingSkill&&(
          <Modal onClose={()=>setES(null)} surface={surface} border={border}>
            <h3 style={{fontFamily:"'DM Serif Display'",fontSize:22,color:fg,marginBottom:20}}>{draft.skills.find(s=>s.id===editingSkill.id)?"Edit Skill":"New Skill"}</h3>
            <div className="two-col" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
              <Field label="Name"><input className="ff" style={{...inp,color:fg}} value={editingSkill.name} onChange={e=>setES({...editingSkill,name:e.target.value})}/></Field>
              <Field label="Icon"><input className="ff" style={{...inp,color:fg}} value={editingSkill.icon} onChange={e=>setES({...editingSkill,icon:e.target.value})}/></Field>
            </div>
            <Field label="Category"><select className="ff" style={{...inp,color:fg}} value={editingSkill.category} onChange={e=>setES({...editingSkill,category:e.target.value})}>{SKILL_CATS.map(c=><option key={c} value={c}>{c}</option>)}</select></Field>
            <Field label={`Level — ${editingSkill.level}%`}>
              <input type="range" min={0} max={100} value={editingSkill.level} onChange={e=>setES({...editingSkill,level:+e.target.value})}/>
              <div style={{height:6,background:surface2,borderRadius:3,marginTop:8,overflow:"hidden"}}><div style={{height:"100%",width:`${editingSkill.level}%`,background:`linear-gradient(90deg,${accent},${accent2})`,borderRadius:3,transition:"width .1s"}}/></div>
            </Field>
            <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:8}}>
              <button onClick={()=>setES(null)} style={{...btnS,color:fg}}>Cancel</button>
              <button onClick={()=>{saveSkill();}} style={btnP}>Save</button>
            </div>
          </Modal>
        )}
        <DeleteConfirm show={deleteTarget?.type==="skill"} onConfirm={()=>{setDraft(d=>({...d,skills:d.skills.filter(s=>s.id!==deleteTarget.id)}));toast("Deleted","info");setDT(null);}} onCancel={()=>setDT(null)} surface={surface} border={border}/>
      </div>
    );
  };

  // ── TIMELINE ──
  const renderTimeline=()=>{
    const canEdit=role?.canEdit;
    const openEdit=t=>setET(t?{...t}:{id:uid(),year:String(new Date().getFullYear()),title:"",company:"",description:"",type:"work"});
    const saveTL=()=>{
      setDraft(d=>{const ex=d.timeline.find(t=>t.id===editingTimeline.id); return{...d,timeline:ex?d.timeline.map(t=>t.id===editingTimeline.id?editingTimeline:t):[...d.timeline,editingTimeline]};});
      toast("Saved!","success"); setET(null);
    };
    return(
      <div style={{animation:"fadeUp .3s ease"}}>
        <div className="section-header-row" style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:32}}>
          <div><h1 style={{fontFamily:"'DM Serif Display'",fontSize:28,marginBottom:2}}>Timeline</h1><p style={{fontSize:14,opacity:.45}}>Career history</p></div>
          {canEdit&&<button onClick={()=>openEdit(null)} style={btnP}>+ Add entry</button>}
        </div>
        {draft.timeline.map(t=>(
          <div key={t.id} className="hov" style={{...card,display:"flex",gap:14,transition:"background .15s"}}>
            <div style={{flexShrink:0,width:36,height:36,borderRadius:10,background:`${TYPE_COLORS[t.type]}22`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>{TYPE_ICONS[t.type]}</div>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2,flexWrap:"wrap"}}>
                <span style={{fontSize:14,fontWeight:600,color:fg}}>{t.title}</span>
                <span style={{fontSize:10,fontFamily:"'DM Mono'",padding:"1px 7px",borderRadius:99,background:`${TYPE_COLORS[t.type]}20`,color:TYPE_COLORS[t.type]}}>{t.year}</span>
              </div>
              <p style={{fontSize:12,color:muted}}>{t.company}</p>
            </div>
            <div style={{display:"flex",gap:8,flexShrink:0}}>
              {canEdit&&<button onClick={()=>openEdit(t)} style={btnS}>Edit</button>}
              {role?.canDelete&&<button onClick={()=>setDT({type:"timeline",id:t.id})} style={btnD}>Delete</button>}
            </div>
          </div>
        ))}
        {editingTimeline&&(
          <Modal onClose={()=>setET(null)} surface={surface} border={border}>
            <h3 style={{fontFamily:"'DM Serif Display'",fontSize:22,color:fg,marginBottom:20}}>{draft.timeline.find(t=>t.id===editingTimeline.id)?"Edit Entry":"New Entry"}</h3>
            <div className="two-col" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
              <Field label="Year"><input className="ff" style={{...inp,color:fg}} value={editingTimeline.year} onChange={e=>setET({...editingTimeline,year:e.target.value})}/></Field>
              <Field label="Type"><select className="ff" style={{...inp,color:fg}} value={editingTimeline.type} onChange={e=>setET({...editingTimeline,type:e.target.value})}>{TL_TYPES.map(t=><option key={t} value={t}>{t}</option>)}</select></Field>
            </div>
            <Field label="Title"><input className="ff" style={{...inp,color:fg}} value={editingTimeline.title} onChange={e=>setET({...editingTimeline,title:e.target.value})}/></Field>
            <Field label="Company"><input className="ff" style={{...inp,color:fg}} value={editingTimeline.company} onChange={e=>setET({...editingTimeline,company:e.target.value})}/></Field>
            <Field label="Description"><textarea className="ff" rows={3} style={{...inp,resize:"none",color:fg}} value={editingTimeline.description} onChange={e=>setET({...editingTimeline,description:e.target.value})}/></Field>
            <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
              <button onClick={()=>setET(null)} style={{...btnS,color:fg}}>Cancel</button>
              <button onClick={saveTL} style={btnP}>Save</button>
            </div>
          </Modal>
        )}
        <DeleteConfirm show={deleteTarget?.type==="timeline"} onConfirm={()=>{setDraft(d=>({...d,timeline:d.timeline.filter(t=>t.id!==deleteTarget.id)}));toast("Deleted","info");setDT(null);}} onCancel={()=>setDT(null)} surface={surface} border={border}/>
      </div>
    );
  };

  // ── SOCIAL ──
  const renderSocial=()=>(
    <div style={{maxWidth:540,animation:"fadeUp .3s ease"}}>
      <SectionHeader title="Social Links" sub="Links in the contact section."/>
      {[["github","GitHub","⌥"],["linkedin","LinkedIn","in"],["twitter","Twitter","✕"],["email","Email","@"],["website","Website","🌐"]].map(([key,lbl,icon])=>(
        <Field key={key} label={lbl}>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            <div style={{width:38,height:38,borderRadius:10,background:surface2,border:`1px solid ${border}`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Mono'",fontWeight:700,fontSize:13,color:fg,flexShrink:0}}>{icon}</div>
            <input className="ff" style={inp} value={draft.social[key]} onChange={e=>upd("social",key,e.target.value)}/>
          </div>
        </Field>
      ))}
    </div>
  );

  // ── SEO ──
  const renderSEO=()=>(
    <div style={{maxWidth:620,animation:"fadeUp .3s ease"}}>
      <SectionHeader title="SEO" sub="Search engine settings."/>
      <Field label="Title" hint={`${draft.seo.title.length}/60`}><input className="ff" style={{...inp,borderColor:draft.seo.title.length>60?"#ef4444":border}} value={draft.seo.title} onChange={e=>upd("seo","title",e.target.value)}/></Field>
      <Field label="Description" hint={`${draft.seo.description.length}/160`}><textarea className="ff" rows={3} style={{...inp,resize:"none",borderColor:draft.seo.description.length>160?"#ef4444":border}} value={draft.seo.description} onChange={e=>upd("seo","description",e.target.value)}/></Field>
      <Field label="Keywords"><input className="ff" style={inp} value={draft.seo.keywords} onChange={e=>upd("seo","keywords",e.target.value)}/></Field>
      <div style={{padding:20,borderRadius:14,background:surface,border:`1px solid ${border}`}}>
        <p style={{fontFamily:"'DM Mono'",fontSize:10,color:muted,textTransform:"uppercase",letterSpacing:".1em",marginBottom:12}}>Google Preview</p>
        <p style={{fontSize:12,color:"#4b9a5f",marginBottom:4}}>{draft.social.website||"https://zewin.dev"} ›</p>
        <p style={{fontSize:17,color:"#1a73e8",marginBottom:4,fontWeight:500}}>{draft.seo.title.slice(0,60)}</p>
        <p style={{fontSize:13,color:dark?"#9aa0a6":"#4d5156"}}>{draft.seo.description.slice(0,160)}</p>
      </div>
    </div>
  );

  // ── USERS ──
  const renderUsers=()=>{
    const openEdit=u=>setEU(u?{...u}:{id:uid(),username:"",password:"",role:"editor",name:"",avatar:"👤"});
    const saveUser=()=>{
      const ex=users.find(u=>u.id===editingUser.id);
      setUsers(ex?users.map(u=>u.id===editingUser.id?editingUser:u):[...users,editingUser]);
      toast(ex?"User updated!":"User added!","success"); setEU(null);
    };
    return(
      <div style={{animation:"fadeUp .3s ease"}}>
        <div className="section-header-row" style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:32}}>
          <div><h1 style={{fontFamily:"'DM Serif Display'",fontSize:28,marginBottom:2}}>Users</h1><p style={{fontSize:14,opacity:.45}}>{users.length} accounts</p></div>
          <button onClick={()=>openEdit(null)} style={btnP}>+ Add user</button>
        </div>
        {users.map(u=>{
          const rc=ROLE_CONFIG[u.role]; const isMe=u.id===currentUser.id;
          return(
            <div key={u.id} className="hov" style={{...card,display:"flex",alignItems:"center",gap:14,transition:"background .15s"}}>
              <div style={{width:44,height:44,borderRadius:"50%",background:`${rc.color}22`,border:`2px solid ${rc.color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{u.avatar}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:2,flexWrap:"wrap"}}>
                  <span style={{fontSize:14,fontWeight:600,color:fg}}>{u.name}</span>
                  {isMe&&<span style={{fontSize:10,padding:"1px 7px",borderRadius:99,background:`${accent}20`,color:accent,fontFamily:"'DM Mono'"}}>You</span>}
                  <span style={{fontSize:11,padding:"2px 10px",borderRadius:99,background:`${rc.color}18`,color:rc.color,fontWeight:600}}>{rc.label}</span>
                </div>
                <div style={{fontFamily:"'DM Mono'",fontSize:12,color:muted}}>@{u.username}</div>
              </div>
              <div style={{display:"flex",gap:8,flexShrink:0}}>
                <button onClick={()=>openEdit(u)} style={btnS}>Edit</button>
                {!isMe&&<button onClick={()=>setDT({type:"user",id:u.id})} style={btnD}>Delete</button>}
              </div>
            </div>
          );
        })}
        {editingUser&&(
          <Modal onClose={()=>setEU(null)} surface={surface} border={border}>
            <h3 style={{fontFamily:"'DM Serif Display'",fontSize:22,color:fg,marginBottom:20}}>{users.find(u=>u.id===editingUser.id)?"Edit User":"New User"}</h3>
            <div className="two-col" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
              <Field label="Full Name"><input className="ff" style={{...inp,color:fg}} value={editingUser.name} onChange={e=>setEU({...editingUser,name:e.target.value})}/></Field>
              <Field label="Avatar (emoji)"><input className="ff" style={{...inp,color:fg}} value={editingUser.avatar} onChange={e=>setEU({...editingUser,avatar:e.target.value})}/></Field>
              <Field label="Username"><input className="ff" style={{...inp,color:fg}} value={editingUser.username} onChange={e=>setEU({...editingUser,username:e.target.value})}/></Field>
              <Field label="Password"><input className="ff" style={{...inp,color:fg}} type="password" value={editingUser.password} onChange={e=>setEU({...editingUser,password:e.target.value})}/></Field>
            </div>
            <Field label="Role">
              <div className="three-col" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:16}}>
                {Object.entries(ROLE_CONFIG).map(([key,rc])=>(
                  <button key={key} onClick={()=>setEU({...editingUser,role:key})} style={{padding:"14px 8px",borderRadius:14,border:`2px solid ${editingUser.role===key?rc.color:border}`,background:editingUser.role===key?`${rc.color}15`:surface2,cursor:"pointer",textAlign:"center",transition:"all .15s"}}>
                    <div style={{fontSize:22,marginBottom:6}}>{rc.badge}</div>
                    <div style={{fontSize:12,fontWeight:600,color:editingUser.role===key?rc.color:fg}}>{rc.label}</div>
                  </button>
                ))}
              </div>
            </Field>
            {/* Permissions */}
            <div style={{padding:14,borderRadius:12,background:surface2,border:`1px solid ${border}`,marginBottom:20}}>
              <p style={{fontFamily:"'DM Mono'",fontSize:10,color:muted,textTransform:"uppercase",letterSpacing:".1em",marginBottom:10}}>Permissions for this role</p>
              {[["canEdit","Edit & create content"],["canDelete","Delete items"],["canManageUsers","Manage users"],["canChangeBrand","Change brand & SEO"],["canChangeColors","Change website colors"],["canViewDashboard","Access admin panel"]].map(([key,lbl])=>(
                <div key={key} style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                  <span style={{fontSize:14}}>{ROLE_CONFIG[editingUser.role]?.[key]?"✅":"❌"}</span>
                  <span style={{fontSize:13,color:ROLE_CONFIG[editingUser.role]?.[key]?fg:muted}}>{lbl}</span>
                </div>
              ))}
            </div>
            <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
              <button onClick={()=>setEU(null)} style={{...btnS,color:fg}}>Cancel</button>
              <button onClick={saveUser} style={btnP}>Save user</button>
            </div>
          </Modal>
        )}
        <DeleteConfirm show={deleteTarget?.type==="user"} onConfirm={()=>{setUsers(users.filter(u=>u.id!==deleteTarget.id));toast("Deleted","info");setDT(null);}} onCancel={()=>setDT(null)} surface={surface} border={border}/>
      </div>
    );
  };


  // ── BLOG ──
  const renderBlog=()=>{
    const canEdit=role?.canEdit;
    const openEdit=b=>setEditBlog(b?{...b}:{id:"b"+Date.now(),title:"",excerpt:"",content:"",tags:"",date:new Date().toISOString().slice(0,10),readTime:5,cover:"📝"});
    const saveBlog=()=>{
      setDraft(d=>{const ex=d.blog?.find(b=>b.id===editBlog.id); return{...d,blog:ex?d.blog.map(b=>b.id===editBlog.id?editBlog:b):[...(d.blog||[]),editBlog]};});
      toast("Blog post saved!","success"); setEditBlog(null);
    };
    return(
      <div style={{animation:"fadeUp .3s ease"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:32,flexWrap:"wrap",gap:12}}>
          <div><h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:28,color:fg,marginBottom:2}}>Blog</h1><p style={{fontSize:14,color:muted}}>{(draft.blog||[]).length} posts</p></div>
          {canEdit&&<button onClick={()=>openEdit(undefined)} style={btnP}>+ New post</button>}
        </div>
        {(draft.blog||[]).map(post=>(
          <div key={post.id} className="hov" style={{display:"flex",gap:14,padding:16,borderRadius:16,background:surface,border:`1px solid ${border}`,marginBottom:10,transition:"background .15s",alignItems:"center"}}>
            <div style={{width:44,height:44,borderRadius:12,background:surface2,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>{post.cover}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:2,flexWrap:"wrap"}}>
                <span style={{fontSize:14,fontWeight:600,color:fg}}>{post.title}</span>
                <span style={{fontSize:10,padding:"1px 7px",borderRadius:99,background:surface2,color:muted,fontFamily:"'DM Mono',monospace"}}>{post.readTime} min</span>
                <span style={{fontSize:10,padding:"1px 7px",borderRadius:99,background:surface2,color:muted,fontFamily:"'DM Mono',monospace"}}>{post.date}</span>
              </div>
              <p style={{fontSize:12,color:muted,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{post.excerpt}</p>
            </div>
            {canEdit&&<div style={{display:"flex",gap:8,flexShrink:0}}>
              <button onClick={()=>openEdit(post)} style={{...btnS,padding:"7px 12px",display:"flex",alignItems:"center",gap:5}}>✏ Edit</button>
              <button onClick={()=>setDraft(d=>({...d,blog:(d.blog||[]).filter(b=>b.id!==post.id)}))} style={{padding:"7px 12px",borderRadius:99,background:"#ef444418",color:"#ef4444",border:"1px solid #ef444430",fontSize:12,cursor:"pointer"}}>🗑</button>
            </div>}
          </div>
        ))}
        {editBlog&&(
          <Modal onClose={()=>setEditBlog(null)} surface={surface} border={border}>
            <h3 style={{fontFamily:"'DM Serif Display',serif",fontSize:22,color:fg,marginBottom:20}}>{(draft.blog||[]).find(b=>b.id===editBlog.id)?"Edit Post":"New Post"}</h3>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}} className="two-col">
              <div><label style={{display:"block",fontFamily:"'DM Mono',monospace",fontSize:11,color:muted,textTransform:"uppercase",letterSpacing:".1em",marginBottom:6}}>Title</label><input className="ff" style={{...inp,color:fg}} value={editBlog.title} onChange={e=>setEditBlog({...editBlog,title:e.target.value})}/></div>
              <div><label style={{display:"block",fontFamily:"'DM Mono',monospace",fontSize:11,color:muted,textTransform:"uppercase",letterSpacing:".1em",marginBottom:6}}>Cover (emoji)</label><input className="ff" style={{...inp,color:fg}} value={editBlog.cover} onChange={e=>setEditBlog({...editBlog,cover:e.target.value})}/></div>
            </div>
            <div style={{marginBottom:14}}><label style={{display:"block",fontFamily:"'DM Mono',monospace",fontSize:11,color:muted,textTransform:"uppercase",letterSpacing:".1em",marginBottom:6}}>Excerpt</label><textarea className="ff" rows={2} style={{...inp,resize:"none",color:fg}} value={editBlog.excerpt} onChange={e=>setEditBlog({...editBlog,excerpt:e.target.value})}/></div>
            <div style={{marginBottom:14}}><label style={{display:"block",fontFamily:"'DM Mono',monospace",fontSize:11,color:muted,textTransform:"uppercase",letterSpacing:".1em",marginBottom:6}}>Content (Markdown)</label><textarea className="ff" rows={6} style={{...inp,resize:"none",color:fg,fontFamily:"'DM Mono',monospace",fontSize:12}} value={editBlog.content} onChange={e=>setEditBlog({...editBlog,content:e.target.value})}/></div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginBottom:18}} className="two-col">
              <div><label style={{display:"block",fontFamily:"'DM Mono',monospace",fontSize:11,color:muted,textTransform:"uppercase",letterSpacing:".1em",marginBottom:6}}>Tags</label><input className="ff" style={{...inp,color:fg}} value={editBlog.tags} onChange={e=>setEditBlog({...editBlog,tags:e.target.value})} placeholder="React,AI"/></div>
              <div><label style={{display:"block",fontFamily:"'DM Mono',monospace",fontSize:11,color:muted,textTransform:"uppercase",letterSpacing:".1em",marginBottom:6}}>Date</label><input className="ff" style={{...inp,color:fg}} type="date" value={editBlog.date} onChange={e=>setEditBlog({...editBlog,date:e.target.value})}/></div>
              <div><label style={{display:"block",fontFamily:"'DM Mono',monospace",fontSize:11,color:muted,textTransform:"uppercase",letterSpacing:".1em",marginBottom:6}}>Read time (min)</label><input className="ff" style={{...inp,color:fg}} type="number" value={editBlog.readTime} onChange={e=>setEditBlog({...editBlog,readTime:+e.target.value})}/></div>
            </div>
            <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
              <button onClick={()=>setEditBlog(null)} style={{...btnS,color:fg}}>Cancel</button>
              <button onClick={saveBlog} style={btnP}>Save post</button>
            </div>
          </Modal>
        )}
      </div>
    );
  };

  // ── BLOG ──


  // ── ANALYTICS ──
  const [analyticsData, setAnalyticsData] = useState<{all:Record<string,number>;total:number}|null>(null);
  useEffect(()=>{
    if(activeTab==="analytics"){
      fetch("/api/views").then(r=>r.json()).then(d=>setAnalyticsData(d)).catch(()=>{});
    }
  },[activeTab]);

  const renderAnalytics=()=>(
    <div style={{animation:"fadeUp .3s ease"}}>
      <h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:28,color:fg,marginBottom:4}}>Analytics</h1>
      <p style={{fontSize:14,color:muted,marginBottom:32}}>Page views since last server restart.</p>
      {!analyticsData?(
        <div style={{textAlign:"center",padding:48,color:muted}}>Loading...</div>
      ):(
        <>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:14,marginBottom:28}}>
            <div style={{padding:"20px 22px",borderRadius:20,background:surface,border:`1px solid ${border}`}}>
              <div style={{fontSize:11,fontFamily:"'DM Mono',monospace",color:muted,textTransform:"uppercase",letterSpacing:".1em",marginBottom:8}}>Total Views</div>
              <div style={{fontFamily:"'DM Serif Display',serif",fontSize:36,color:fg}}>{analyticsData.total}</div>
            </div>
            <div style={{padding:"20px 22px",borderRadius:20,background:surface,border:`1px solid ${border}`}}>
              <div style={{fontSize:11,fontFamily:"'DM Mono',monospace",color:muted,textTransform:"uppercase",letterSpacing:".1em",marginBottom:8}}>Pages Tracked</div>
              <div style={{fontFamily:"'DM Serif Display',serif",fontSize:36,color:fg}}>{Object.keys(analyticsData.all).length}</div>
            </div>
          </div>
          <div style={{padding:24,borderRadius:20,background:surface,border:`1px solid ${border}`}}>
            <h3 style={{fontFamily:"'DM Serif Display',serif",fontSize:18,color:fg,marginBottom:16}}>Page breakdown</h3>
            {Object.entries(analyticsData.all).sort(([,a],[,b])=>b-a).map(([page,count])=>(
              <div key={page} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:`1px solid ${border}`}}>
                <span style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:fg,flex:1}}>{page}</span>
                <div style={{width:120,height:6,background:surface2,borderRadius:3,overflow:"hidden"}}>
                  <div style={{height:"100%",width:`${Math.min((count/Math.max(...Object.values(analyticsData.all)))*100,100)}%`,background:`linear-gradient(90deg,${accent},${accent2})`,borderRadius:3}}/>
                </div>
                <span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:muted,width:40,textAlign:"right"}}>{count}</span>
              </div>
            ))}
            {Object.keys(analyticsData.all).length===0&&(
              <p style={{color:muted,fontSize:14,textAlign:"center",padding:"20px 0"}}>No page views recorded yet.</p>
            )}
          </div>
          <button onClick={()=>fetch("/api/views").then(r=>r.json()).then(d=>setAnalyticsData(d))} style={{...btnS,marginTop:16,display:"flex",alignItems:"center",gap:6}}>
            ↻ Refresh
          </button>
        </>
      )}
    </div>
  );


  const sections={brand:renderBrand,colors:renderColors,profile:renderProfile,projects:renderProjects,skills:renderSkills,timeline:renderTimeline,social:renderSocial,seo:renderSEO,users:renderUsers,blog:renderBlog,analytics:renderAnalytics};

  // ── Guards ──
  if(!currentUser) return <LoginScreen onLogin={u=>{setCurrentUser(u); const rc=ROLE_CONFIG[u.role]; setActiveTab(rc.canViewDashboard?(rc.canManageUsers?"users":"projects"):"projects");}} dark={dark} setDark={setDark}/>;
  if(!role?.canViewDashboard) return <ViewerBlocked dark={dark}/>;

  const safeTabs=TABS.filter(t=>!t.need||role?.[t.need]);

  const mobileCss = `
    @media (max-width: 767px) {
      .admin-layout { grid-template-columns: 1fr !important; }
      .desktop-sidebar { display: none !important; }
      .main-content { padding: 20px 16px 90px 16px !important; }
      .top-bar-right .user-chip-name,
      .top-bar-right .user-chip-role,
      .top-bar-right .import-btn,
      .top-bar-right .export-btn,
      .top-bar-right .reset-btn { display: none !important; }
      .header-brand-name { font-size: 13px !important; }
      .two-col { grid-template-columns: 1fr !important; }
      .three-col { grid-template-columns: 1fr 1fr !important; }
      .color-grid { grid-template-columns: 1fr !important; }
      .preset-grid { grid-template-columns: repeat(4,1fr) !important; }
      .search-row { flex-direction: column !important; }
      .filter-pills { overflow-x: auto; flex-wrap: nowrap !important; padding-bottom: 4px; }
      .card-actions { flex-direction: column; gap: 6px !important; align-items: flex-end !important; }
      .section-header-row { flex-direction: column; align-items: flex-start !important; gap: 12px !important; }
    }
  `;

  return(
    <div style={{minHeight:"100vh",background:bg,color:fg,fontFamily:"'DM Sans',sans-serif"}}>
      <style>{css+mobileCss}</style>
      <input ref={importRef} type="file" accept=".json" style={{display:"none"}}/>

      {/* ── TOP BAR ── */}
      <header style={{position:"sticky",top:0,zIndex:100,background:`${surface}ee`,backdropFilter:"blur(16px)",borderBottom:`1px solid ${border}`,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 16px",height:56,gap:10}}>
        {/* Logo */}
        <div style={{display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
          <div style={{width:28,height:28,borderRadius:8,background:`linear-gradient(135deg,${accent},${accent2})`,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",flexShrink:0}}>
            {draft.brand.logo?<img src={draft.brand.logo} style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<span style={{fontFamily:"'DM Mono'",fontWeight:700,fontSize:10,color:"#fff"}}>{(draft.brand.name||"ZW").slice(0,2).toUpperCase()}</span>}
          </div>
          <span className="header-brand-name" style={{fontFamily:"'DM Mono'",fontSize:14,fontWeight:700,background:`linear-gradient(135deg,${accent},${accent2})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{draft.brand.name}</span>
        </div>

        {/* Right actions */}
        <div className="top-bar-right" style={{display:"flex",gap:6,alignItems:"center"}}>
          {isDirty&&<span style={{display:"flex",alignItems:"center",gap:4,fontSize:11,color:"#f59e0b",flexShrink:0}}><span style={{width:5,height:5,borderRadius:"50%",background:"#f59e0b",animation:"pulse 2s infinite",display:"inline-block"}}/>Unsaved</span>}
          {role?.canEdit&&<button className="import-btn" onClick={handleImport} style={{...btnS,fontSize:12,padding:"5px 10px"}}>⬆</button>}
          {role?.canEdit&&<button className="export-btn" onClick={handleExport} style={{...btnS,fontSize:12,padding:"5px 10px"}}>⬇</button>}
          <button onClick={()=>setDark(!dark)} style={{width:30,height:30,borderRadius:"50%",border:`1px solid ${border}`,background:surface2,cursor:"pointer",fontSize:13,flexShrink:0}}>{dark?"☀️":"🌙"}</button>
          {isDirty&&role?.canEdit&&<button className="reset-btn" onClick={handleReset} style={{...btnS,padding:"5px 10px",fontSize:12}}>Reset</button>}
          {role?.canEdit&&<button onClick={handleSave} style={{...btnP,opacity:isDirty?1:.5,padding:"6px 14px",fontSize:12,flexShrink:0}}>{isMobile?"Save":"Save changes"}</button>}
          {/* User chip */}
          <div style={{display:"flex",alignItems:"center",gap:6,padding:"3px 10px 3px 3px",borderRadius:99,border:`1px solid ${border}`,background:surface2,flexShrink:0}}>
            <div style={{width:22,height:22,borderRadius:"50%",background:`${role?.color}22`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>{currentUser.avatar}</div>
            <span className="user-chip-name" style={{fontSize:12,fontWeight:500,color:fg}}>{currentUser.name}</span>
            <span className="user-chip-role" style={{fontSize:10,padding:"1px 6px",borderRadius:99,background:`${role?.color}20`,color:role?.color,fontWeight:600}}>{role?.label}</span>
            <button onClick={()=>setCurrentUser(null)} style={{fontSize:12,color:muted,background:"none",border:"none",cursor:"pointer",lineHeight:1}}>↩</button>
          </div>
        </div>
      </header>

      {/* ── BODY ── */}
      <div className="admin-layout" style={{display:"grid",gridTemplateColumns:"210px 1fr",minHeight:"calc(100vh - 56px)"}}>

        {/* ── DESKTOP SIDEBAR ── */}
        <aside className="desktop-sidebar" style={{borderRight:`1px solid ${border}`,padding:"16px 10px",background:surface,position:"sticky",top:56,height:"calc(100vh - 56px)",overflowY:"auto",flexShrink:0}}>
          {/* Role card */}
          <div style={{padding:"10px 12px",borderRadius:12,background:`${role?.color}12`,border:`1px solid ${role?.color}30`,marginBottom:16,display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:32,height:32,borderRadius:"50%",background:`${role?.color}22`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{currentUser.avatar}</div>
            <div style={{minWidth:0}}>
              <div style={{fontSize:13,fontWeight:600,color:fg,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{currentUser.name}</div>
              <div style={{fontSize:11,color:role?.color,fontWeight:500}}>{role?.label}</div>
            </div>
          </div>
          <p style={{fontFamily:"'DM Mono'",fontSize:10,color:muted,textTransform:"uppercase",letterSpacing:".12em",marginBottom:8,paddingLeft:8}}>Menu</p>
          {safeTabs.map(tab=>(
            <button key={tab.id} onClick={()=>setActiveTab(tab.id)} style={{width:"100%",display:"flex",alignItems:"center",gap:10,padding:"8px 12px",borderRadius:10,marginBottom:2,background:activeTab===tab.id?`${accent}15`:"transparent",border:activeTab===tab.id?`1px solid ${accent}30`:"1px solid transparent",color:activeTab===tab.id?accent:muted,fontSize:13,fontWeight:500,cursor:"pointer",textAlign:"left",transition:"all .15s"}}>
              <span>{tab.icon}</span><span style={{flex:1}}>{tab.label}</span>
              {tab.id==="projects"&&<span style={{fontSize:10,background:surface2,padding:"1px 6px",borderRadius:99,color:muted}}>{draft.projects.length}</span>}
              {tab.id==="skills"&&<span style={{fontSize:10,background:surface2,padding:"1px 6px",borderRadius:99,color:muted}}>{draft.skills.length}</span>}
              {tab.id==="users"&&<span style={{fontSize:10,background:surface2,padding:"1px 6px",borderRadius:99,color:muted}}>{users.length}</span>}
            </button>
          ))}
          {role?.canEdit&&<>
            <div style={{height:1,background:border,margin:"12px 0"}}/>
            <p style={{fontFamily:"'DM Mono'",fontSize:10,color:muted,textTransform:"uppercase",letterSpacing:".12em",marginBottom:8,paddingLeft:8}}>Data</p>
            <button onClick={handleExport} style={{width:"100%",display:"flex",alignItems:"center",gap:8,padding:"8px 12px",borderRadius:10,background:"transparent",border:"1px solid transparent",color:muted,fontSize:12,cursor:"pointer",textAlign:"left"}}>⬇ Export JSON</button>
            <button onClick={handleImport} style={{width:"100%",display:"flex",alignItems:"center",gap:8,padding:"8px 12px",borderRadius:10,background:"transparent",border:"1px solid transparent",color:muted,fontSize:12,cursor:"pointer",textAlign:"left"}}>⬆ Import JSON</button>
          </>}
          <div style={{marginTop:12,padding:"12px",borderRadius:12,background:surface2,border:`1px solid ${border}`}}>
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
              <span style={{width:6,height:6,borderRadius:"50%",background:isDirty?"#f59e0b":"#22c55e",animation:"pulse 2s infinite",display:"inline-block"}}/>
              <span style={{fontSize:12,fontWeight:500,color:fg}}>{isDirty?"Unsaved":"Saved"}</span>
            </div>
            <p style={{fontSize:11,color:muted}}>{isDirty?"Save your changes!":"Up to date."}</p>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main className="main-content" style={{padding:"28px 36px",overflowY:"auto",paddingBottom:isMobile?90:28}}>
          {sections[activeTab]?.()}
        </main>
      </div>

      {/* ── MOBILE BOTTOM NAV ── */}
      {isMobile&&(
        <nav style={{position:"fixed",bottom:0,left:0,right:0,zIndex:200,background:`${surface}f5`,backdropFilter:"blur(16px)",borderTop:`1px solid ${border}`,display:"flex",alignItems:"stretch",paddingBottom:"env(safe-area-inset-bottom,0px)"}}>
          {/* show max 5 tabs, rest hidden */}
          {safeTabs.slice(0,5).map(tab=>(
            <button key={tab.id} onClick={()=>setActiveTab(tab.id)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"8px 4px",border:"none",background:"transparent",cursor:"pointer",gap:3,position:"relative",transition:"all .15s"}}>
              {/* active indicator */}
              {activeTab===tab.id&&<span style={{position:"absolute",top:0,left:"25%",right:"25%",height:2,borderRadius:99,background:`linear-gradient(90deg,${accent},${accent2})`}}/>}
              <span style={{fontSize:18,lineHeight:1}}>{tab.icon}</span>
              <span style={{fontSize:10,fontWeight:activeTab===tab.id?600:400,color:activeTab===tab.id?accent:muted,lineHeight:1}}>{tab.label}</span>
              {/* badge */}
              {tab.id==="projects"&&draft.projects.length>0&&<span style={{position:"absolute",top:6,right:"calc(50% - 16px)",width:14,height:14,borderRadius:"50%",background:accent,color:"#fff",fontSize:8,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>{draft.projects.length}</span>}
            </button>
          ))}
          {/* More button if tabs > 5 */}
          {safeTabs.length>5&&(
            <button onClick={()=>{
              const next=safeTabs[(safeTabs.findIndex(t=>t.id===activeTab)+1)%safeTabs.length];
              setActiveTab(next.id);
            }} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"8px 4px",border:"none",background:"transparent",cursor:"pointer",gap:3}}>
              <span style={{fontSize:18}}>⋯</span>
              <span style={{fontSize:10,color:muted}}>More</span>
            </button>
          )}
        </nav>
      )}

      <ToastContainer toasts={toasts}/>
    </div>
  );
}