"use client";
// @ts-nocheck
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard, FolderKanban, Zap, Clock, MessageSquare,
  LogOut, Sun, Moon, Plus, Pencil, Trash2,
  Save, RotateCcw, Globe, Briefcase, GraduationCap,
  Rocket, BarChart3, Package, Brain, Check, X,
  ChevronRight, AlertTriangle, BookOpen, Eye,
} from "lucide-react";
import { projects as initialProjects, skills as initialSkills, timeline as initialTimeline, blogPosts as initialBlog, defaultConfig } from "@/app/lib/data";

// ── Types ─────────────────────────────────────────────────────────────────────
type Toast = { id: string; msg: string; type: "success" | "error" | "info" };

// ── Helpers ───────────────────────────────────────────────────────────────────
const uid = () => Math.random().toString(36).slice(2);

function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toast = useCallback((msg: string, type: Toast["type"] = "success") => {
    const id = uid();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
  }, []);
  return { toasts, toast };
}

// ── Components ────────────────────────────────────────────────────────────────
function Modal({ children, onClose, surface, border }: { children: React.ReactNode; onClose: () => void; surface: string; border: string }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);
  return (
    <div onClick={onClose} style={{ position:"fixed",inset:0,zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",padding:24,background:"rgba(0,0,0,.75)",backdropFilter:"blur(10px)" }}>
      <div onClick={e => e.stopPropagation()} style={{ width:"100%",maxWidth:560,maxHeight:"88vh",overflowY:"auto",background:surface,border:`1px solid ${border}`,borderRadius:24,padding:28,animation:"slideIn .2s ease" }}>
        {children}
      </div>
    </div>
  );
}

function ConfirmDelete({ onConfirm, onCancel, surface, border }: { onConfirm:()=>void; onCancel:()=>void; surface:string; border:string }) {
  return (
    <div onClick={onCancel} style={{ position:"fixed",inset:0,zIndex:600,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,.65)",backdropFilter:"blur(8px)" }}>
      <div onClick={e => e.stopPropagation()} style={{ background:surface,border:`1px solid ${border}`,borderRadius:20,padding:28,maxWidth:320,width:"100%",textAlign:"center" }}>
        <AlertTriangle size={36} color="#f59e0b" style={{ margin:"0 auto 12px" }}/>
        <h3 style={{ fontFamily:"'DM Serif Display',serif",fontSize:20,marginBottom:8 }}>Delete this item?</h3>
        <p style={{ fontSize:13,opacity:.5,marginBottom:24 }}>This cannot be undone.</p>
        <div style={{ display:"flex",gap:10,justifyContent:"center" }}>
          <button onClick={onCancel} style={{ padding:"9px 20px",borderRadius:99,background:"transparent",border:`1px solid ${border}`,fontSize:13,cursor:"pointer" }}>Cancel</button>
          <button onClick={onConfirm} style={{ padding:"9px 20px",borderRadius:99,background:"#ef4444",color:"#fff",border:"none",fontSize:13,fontWeight:600,cursor:"pointer" }}>Delete</button>
        </div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [dark, setDark] = useState(true);
  const [tab, setTab] = useState("dashboard");
  const [projects, setProjects] = useState(initialProjects);
  const [skills, setSkills] = useState(initialSkills);
  const [timeline, setTimeline] = useState(initialTimeline);
  const [blog, setBlog] = useState(initialBlog);
  const [brand, setBrand] = useState(defaultConfig.brand);
  const [editItem, setEditItem] = useState<any>(null);
  const [editType, setEditType] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<{type:string;id:string}|null>(null);
  const [search, setSearch] = useState("");
  const { toasts, toast } = useToast();
  const router = useRouter();

  // Theme
  const bg      = dark ? "#0c1015" : "#f7f8fa";
  const fg      = dark ? "#e8eaf0" : "#0f1117";
  const surface = dark ? "#13181f" : "#ffffff";
  const surface2= dark ? "#1a2030" : "#eef0f5";
  const border  = dark ? "#232d3d" : "#dde0e8";
  const muted   = dark ? "#6b7685" : "#8a8f9a";
  const accent  = brand.accentColor;
  const accent2 = brand.secondColor;

  const inp: React.CSSProperties = { width:"100%",padding:"10px 13px",borderRadius:12,background:surface2,border:`1.5px solid ${border}`,color:fg,fontSize:14,outline:"none",fontFamily:"'DM Sans',sans-serif",transition:"border-color .2s" };
  const btnP: React.CSSProperties = { padding:"9px 18px",borderRadius:99,background:`linear-gradient(135deg,${accent},${accent2})`,color:"#fff",fontSize:13,fontWeight:600,border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:6 };
  const btnS: React.CSSProperties = { padding:"9px 14px",borderRadius:99,background:surface2,color:fg,border:`1px solid ${border}`,fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",gap:6 };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/");
  };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');
    *{box-sizing:border-box;margin:0;padding:0} body{font-family:'DM Sans',sans-serif}
    input,textarea,select{font-family:'DM Sans',sans-serif}
    input[type=color]{-webkit-appearance:none;padding:0;border:none;cursor:pointer;width:100%;height:100%}
    input[type=color]::-webkit-color-swatch-wrapper{padding:0}
    input[type=color]::-webkit-color-swatch{border:none;border-radius:6px}
    input[type=range]{width:100%;accent-color:${accent};cursor:pointer}
    ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:${border};border-radius:2px}
    .hov:hover{background:${surface2}!important}
    .ff:focus{border-color:${accent}!important;outline:none}
    @keyframes slideIn{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:scale(1)}}
    @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
    @keyframes toastIn{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
    @media(max-width:768px){
      .sidebar{position:fixed!important;bottom:0!important;left:0!important;right:0!important;top:auto!important;height:60px!important;width:100%!important;border-right:none!important;border-top:1px solid ${border}!important;flex-direction:row!important;padding:0 4px!important;overflow-x:auto!important;overflow-y:hidden!important;z-index:90!important;gap:0!important}
      .sb-btn{flex-direction:column!important;gap:2px!important;padding:6px 8px!important;min-width:52px!important;font-size:10px!important}
      .main{padding:20px 16px 80px!important}
      .two-col{grid-template-columns:1fr!important}
    }
  `;

  const TABS = [
    { id:"dashboard", label:"Dashboard", Icon:LayoutDashboard },
    { id:"brand",     label:"Brand",     Icon:Globe            },
    { id:"projects",  label:"Projects",  Icon:FolderKanban     },
    { id:"skills",    label:"Skills",    Icon:Zap              },
    { id:"timeline",  label:"Timeline",  Icon:Clock            },
    { id:"blog",      label:"Blog",      Icon:BookOpen         },
    { id:"messages",  label:"Messages",  Icon:MessageSquare    },
  ];

  const TL_COLORS: Record<string,string> = { work:"#4f8ef7", project:"#f59e0b", education:"#10b981" };
  const TL_ICONS: Record<string,any> = { work:Briefcase, project:Rocket, education:GraduationCap };
  const CAT_COLORS: Record<string,string> = { frontend:"#4f8ef7", backend:"#10b981", tools:"#f59e0b", design:"#ec4899" };

  // ── DASHBOARD ──
  const renderDashboard = () => (
    <div style={{ animation:"fadeUp .3s ease" }}>
      <h1 style={{ fontFamily:"'DM Serif Display',serif",fontSize:28,color:fg,marginBottom:4 }}>Dashboard</h1>
      <p style={{ fontSize:14,color:muted,marginBottom:28 }}>Welcome back to Zewin Group admin.</p>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:14,marginBottom:28 }}>
        {[
          { label:"Projects", value:projects.length,                    color:"#4f8ef7", Icon:FolderKanban },
          { label:"Skills",   value:skills.length,                      color:"#10b981", Icon:Zap          },
          { label:"Timeline", value:timeline.length,                    color:"#f59e0b", Icon:Clock        },
          { label:"Blog",     value:blog.length,                        color:"#a78bfa", Icon:BookOpen     },
          { label:"Featured", value:projects.filter(p=>p.featured).length, color:"#ec4899", Icon:BarChart3 },
        ].map(({ label, value, color, Icon:I }) => (
          <div key={label} style={{ padding:"20px 22px",borderRadius:20,background:surface,border:`1px solid ${border}` }}>
            <div style={{ width:40,height:40,borderRadius:12,background:`${color}18`,border:`1px solid ${color}33`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:12 }}>
              <I size={20} color={color}/>
            </div>
            <div style={{ fontFamily:"'DM Serif Display',serif",fontSize:28,color:fg,lineHeight:1 }}>{value}</div>
            <div style={{ fontSize:12,color:muted,marginTop:4 }}>{label}</div>
          </div>
        ))}
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:10 }}>
        {TABS.filter(t=>t.id!=="dashboard").map(({ id, label, Icon:I }) => (
          <button key={id} onClick={() => setTab(id)} className="hov"
            style={{ padding:"14px 16px",borderRadius:16,background:surface,border:`1px solid ${border}`,display:"flex",alignItems:"center",gap:10,cursor:"pointer",color:fg,fontSize:13,fontWeight:500,transition:"background .15s" }}>
            <I size={16} color={accent}/>{label}
            <ChevronRight size={13} color={muted} style={{ marginLeft:"auto" }}/>
          </button>
        ))}
      </div>
    </div>
  );

  // ── BRAND ──
  const renderBrand = () => (
    <div style={{ maxWidth:580,animation:"fadeUp .3s ease" }}>
      <h1 style={{ fontFamily:"'DM Serif Display',serif",fontSize:28,color:fg,marginBottom:4 }}>Brand</h1>
      <p style={{ fontSize:14,color:muted,marginBottom:28 }}>Customize your portfolio appearance.</p>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:20 }} className="two-col">
        {[["name","Brand Name"],["tagline","Tagline"]].map(([k,l]) => (
          <div key={k}>
            <label style={{ display:"block",fontFamily:"'DM Mono',monospace",fontSize:11,color:muted,textTransform:"uppercase",letterSpacing:".1em",marginBottom:7 }}>{l}</label>
            <input className="ff" style={inp} value={(brand as any)[k]} onChange={e => setBrand({...brand,[k]:e.target.value})}/>
          </div>
        ))}
      </div>
      <div style={{ height:1,background:border,margin:"20px 0" }}/>
      <label style={{ display:"block",fontFamily:"'DM Mono',monospace",fontSize:11,color:muted,textTransform:"uppercase",letterSpacing:".1em",marginBottom:14 }}>Colors</label>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16 }} className="two-col">
        {[["accentColor","Primary"],["secondColor","Secondary"]].map(([k,l]) => (
          <div key={k} style={{ padding:16,borderRadius:16,background:surface,border:`1px solid ${border}` }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10 }}>
              <div style={{ fontSize:13,fontWeight:500,color:fg }}>{l}</div>
              <div style={{ width:36,height:36,borderRadius:10,background:(brand as any)[k],border:`2px solid ${border}`,overflow:"hidden",position:"relative" }}>
                <input type="color" value={(brand as any)[k]} onChange={e => setBrand({...brand,[k]:e.target.value})} style={{ position:"absolute",inset:"-4px",width:"calc(100% + 8px)",height:"calc(100% + 8px)",opacity:0,cursor:"pointer" }}/>
                <div style={{ position:"absolute",inset:0,background:(brand as any)[k] }}/>
              </div>
            </div>
            <code style={{ fontSize:11,color:muted,background:surface2,padding:"3px 8px",borderRadius:6,display:"block" }}>{(brand as any)[k]}</code>
          </div>
        ))}
      </div>
      {/* Presets */}
      <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
        {[{n:"Blue",a:"#4f8ef7",b:"#a78bfa"},{n:"Emerald",a:"#10b981",b:"#06b6d4"},{n:"Amber",a:"#f59e0b",b:"#ef4444"},{n:"Rose",a:"#f43f5e",b:"#ec4899"},{n:"Violet",a:"#7c3aed",b:"#db2777"}].map(p => (
          <button key={p.n} onClick={() => { setBrand({...brand,accentColor:p.a,secondColor:p.b}); toast(`${p.n} applied`,"success"); }}
            style={{ display:"flex",alignItems:"center",gap:6,padding:"5px 12px",borderRadius:99,border:`1px solid ${border}`,background:surface2,cursor:"pointer",fontSize:12,color:fg }}>
            <span style={{ width:8,height:8,borderRadius:"50%",background:p.a,display:"inline-block" }}/><span style={{ width:8,height:8,borderRadius:"50%",background:p.b,display:"inline-block" }}/>{p.n}
          </button>
        ))}
      </div>
      {/* Preview */}
      <div style={{ marginTop:20,padding:"14px 18px",borderRadius:14,background:surface,border:`1px solid ${border}`,display:"flex",alignItems:"center",justifyContent:"space-between" }}>
        <span style={{ fontFamily:"'DM Mono',monospace",fontWeight:700,fontSize:14,background:`linear-gradient(135deg,${accent},${accent2})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>{brand.name}</span>
        <span style={{ fontSize:12,color:muted }}>{brand.tagline}</span>
      </div>
      <button onClick={() => toast("Brand saved! Push to GitHub to apply changes.","info")} style={{ ...btnP,marginTop:20 }}>
        <Save size={14}/> Save Brand
      </button>
    </div>
  );

  // ── PROJECTS ──
  const renderProjects = () => {
    const filtered = projects.filter(p => !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.tags.join(",").toLowerCase().includes(search.toLowerCase()));
    const open = (p?: any) => { setEditItem(p ? {...p,tags:p.tags.join(",")} : { id:uid(),title:"",description:"",longDescription:"",tags:"",category:"web",color:"#4f8ef7",year:new Date().getFullYear(),featured:false,icon:"🌐",github:"",live:"",order:projects.length,tech:[],metrics:[] }); setEditType("project"); };
    const save = () => {
      const item = { ...editItem, tags: editItem.tags.split(",").map((t:string)=>t.trim()).filter(Boolean), tech: editItem.tags.split(",").map((t:string)=>t.trim()).filter(Boolean) };
      setProjects(prev => prev.find(p=>p.id===item.id) ? prev.map(p=>p.id===item.id?item:p) : [...prev,item]);
      toast("Project saved!","success"); setEditItem(null);
    };
    return (
      <div style={{ animation:"fadeUp .3s ease" }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:12 }}>
          <div><h1 style={{ fontFamily:"'DM Serif Display',serif",fontSize:28,color:fg,marginBottom:2 }}>Projects</h1><p style={{ fontSize:14,color:muted }}>{projects.length} total</p></div>
          <button onClick={()=>open()} style={btnP}><Plus size={14}/>Add project</button>
        </div>
        <input className="ff" style={{ ...inp,marginBottom:14 }} value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍  Search projects..."/>
        {filtered.map(p => (
          <div key={p.id} className="hov" style={{ display:"flex",alignItems:"center",gap:14,padding:14,borderRadius:16,background:surface,border:`1px solid ${border}`,marginBottom:8,transition:"background .15s" }}>
            <div style={{ width:40,height:40,borderRadius:10,background:`${p.color}22`,border:`1px solid ${p.color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0 }}>{p.icon}</div>
            <div style={{ flex:1,minWidth:0 }}>
              <div style={{ display:"flex",alignItems:"center",gap:6,marginBottom:2,flexWrap:"wrap" }}>
                <span style={{ fontSize:14,fontWeight:600,color:fg }}>{p.title}</span>
                {p.featured && <span style={{ fontSize:10,padding:"1px 7px",borderRadius:99,background:`${accent}20`,color:accent,fontFamily:"'DM Mono',monospace" }}>Featured</span>}
                <span style={{ fontSize:10,padding:"1px 7px",borderRadius:99,background:surface2,color:muted,fontFamily:"'DM Mono',monospace" }}>{p.category}</span>
              </div>
              <p style={{ fontSize:12,color:muted,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{p.description}</p>
            </div>
            <div style={{ display:"flex",gap:6,flexShrink:0 }}>
              <button onClick={()=>open(p)} style={btnS}><Pencil size={13}/>Edit</button>
              <button onClick={()=>setDeleteTarget({type:"project",id:p.id})} style={{ padding:"9px 12px",borderRadius:99,background:"#ef444418",color:"#ef4444",border:"1px solid #ef444430",fontSize:12,cursor:"pointer",display:"flex",alignItems:"center" }}><Trash2 size={13}/></button>
            </div>
          </div>
        ))}
        {editItem && editType==="project" && (
          <Modal onClose={()=>setEditItem(null)} surface={surface} border={border}>
            <h3 style={{ fontFamily:"'DM Serif Display',serif",fontSize:22,color:fg,marginBottom:20 }}>{projects.find(p=>p.id===editItem.id) ? "Edit Project" : "New Project"}</h3>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12 }} className="two-col">
              {[["title","Title"],["year","Year"]].map(([k,l]) => (
                <div key={k}>
                  <label style={{ display:"block",fontFamily:"'DM Mono',monospace",fontSize:11,color:muted,textTransform:"uppercase",letterSpacing:".1em",marginBottom:6 }}>{l}</label>
                  <input className="ff" style={{ ...inp,color:fg }} value={editItem[k]} onChange={e=>setEditItem({...editItem,[k]:k==="year"?+e.target.value:e.target.value})}/>
                </div>
              ))}
            </div>
            {[["description","Description"],["longDescription","Long Description"]].map(([k,l]) => (
              <div key={k} style={{ marginBottom:12 }}>
                <label style={{ display:"block",fontFamily:"'DM Mono',monospace",fontSize:11,color:muted,textTransform:"uppercase",letterSpacing:".1em",marginBottom:6 }}>{l}</label>
                <textarea className="ff" rows={k==="longDescription"?3:2} style={{ ...inp,resize:"none",color:fg }} value={editItem[k]} onChange={e=>setEditItem({...editItem,[k]:e.target.value})}/>
              </div>
            ))}
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12 }} className="two-col">
              <div>
                <label style={{ display:"block",fontFamily:"'DM Mono',monospace",fontSize:11,color:muted,textTransform:"uppercase",letterSpacing:".1em",marginBottom:6 }}>Category</label>
                <select className="ff" style={{ ...inp,color:fg }} value={editItem.category} onChange={e=>setEditItem({...editItem,category:e.target.value})}>
                  {["web","backend","ai","mobile","design"].map(c=><option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display:"block",fontFamily:"'DM Mono',monospace",fontSize:11,color:muted,textTransform:"uppercase",letterSpacing:".1em",marginBottom:6 }}>Color</label>
                <div style={{ display:"flex",gap:8,alignItems:"center" }}>
                  <div style={{ width:40,height:40,borderRadius:10,background:editItem.color,border:`2px solid ${border}`,flexShrink:0,overflow:"hidden",position:"relative" }}>
                    <input type="color" value={editItem.color} onChange={e=>setEditItem({...editItem,color:e.target.value})} style={{ position:"absolute",inset:"-4px",width:"calc(100% + 8px)",height:"calc(100% + 8px)",opacity:0,cursor:"pointer" }}/>
                    <div style={{ position:"absolute",inset:0,background:editItem.color }}/>
                  </div>
                  <input className="ff" style={{ ...inp,color:fg }} value={editItem.color} onChange={e=>setEditItem({...editItem,color:e.target.value})}/>
                </div>
              </div>
            </div>
            {[["tags","Tags (comma separated)"],["icon","Icon (emoji)"],["github","GitHub URL"],["live","Live URL"]].map(([k,l]) => (
              <div key={k} style={{ marginBottom:12 }}>
                <label style={{ display:"block",fontFamily:"'DM Mono',monospace",fontSize:11,color:muted,textTransform:"uppercase",letterSpacing:".1em",marginBottom:6 }}>{l}</label>
                <input className="ff" style={{ ...inp,color:fg }} value={editItem[k]||""} onChange={e=>setEditItem({...editItem,[k]:e.target.value})}/>
              </div>
            ))}
            <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:20 }}>
              <button onClick={()=>setEditItem({...editItem,featured:!editItem.featured})} style={{ width:40,height:22,borderRadius:11,background:editItem.featured?accent:surface2,border:`1px solid ${border}`,cursor:"pointer",position:"relative",padding:0,transition:"background .2s",flexShrink:0 }}>
                <div style={{ position:"absolute",top:2,left:editItem.featured?20:2,width:18,height:18,borderRadius:"50%",background:"#fff",transition:"left .2s" }}/>
              </button>
              <span style={{ fontSize:13,color:fg }}>Featured project</span>
            </div>
            <div style={{ display:"flex",gap:10,justifyContent:"flex-end" }}>
              <button onClick={()=>setEditItem(null)} style={{ ...btnS,color:fg }}>Cancel</button>
              <button onClick={save} style={btnP}><Save size={14}/>Save</button>
            </div>
          </Modal>
        )}
        {deleteTarget?.type==="project" && <ConfirmDelete onConfirm={()=>{ setProjects(prev=>prev.filter(p=>p.id!==deleteTarget.id)); toast("Deleted","info"); setDeleteTarget(null); }} onCancel={()=>setDeleteTarget(null)} surface={surface} border={border}/>}
      </div>
    );
  };

  // ── SKILLS ──
  const renderSkills = () => {
    const open = (s?: any) => { setEditItem(s ? {...s} : { id:uid(),name:"",level:80,category:"frontend",icon:"⚡" }); setEditType("skill"); };
    const save = () => {
      setSkills(prev => prev.find(s=>s.name===editItem.name&&!editItem.id) ? [...prev,editItem] : prev.find(s=>s.name===editItem.name) ? prev.map(s=>s.name===editItem.name?editItem:s) : [...prev,editItem]);
      toast("Skill saved!","success"); setEditItem(null);
    };
    const grouped = skills.reduce((a:any,s)=>{ if(!a[s.category])a[s.category]=[]; a[s.category].push(s); return a; },{});
    return (
      <div style={{ animation:"fadeUp .3s ease" }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:28,flexWrap:"wrap",gap:12 }}>
          <div><h1 style={{ fontFamily:"'DM Serif Display',serif",fontSize:28,color:fg,marginBottom:2 }}>Skills</h1><p style={{ fontSize:14,color:muted }}>{skills.length} skills</p></div>
          <button onClick={()=>open()} style={btnP}><Plus size={14}/>Add skill</button>
        </div>
        {Object.entries(grouped).map(([cat,catSkills]:any) => (
          <div key={cat} style={{ marginBottom:22 }}>
            <p style={{ fontFamily:"'DM Mono',monospace",fontSize:11,color:CAT_COLORS[cat]??accent,textTransform:"uppercase",letterSpacing:".1em",marginBottom:10 }}>{cat}</p>
            {catSkills.map((sk:any) => (
              <div key={sk.name} className="hov" style={{ display:"flex",alignItems:"center",gap:14,padding:14,borderRadius:16,background:surface,border:`1px solid ${border}`,marginBottom:8,transition:"background .15s" }}>
                <span style={{ fontSize:22,flexShrink:0 }}>{sk.icon}</span>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex",justifyContent:"space-between",marginBottom:6 }}>
                    <span style={{ fontSize:14,fontWeight:500,color:fg }}>{sk.name}</span>
                    <span style={{ fontFamily:"'DM Mono',monospace",fontSize:12,color:muted }}>{sk.level}%</span>
                  </div>
                  <div style={{ height:5,background:surface2,borderRadius:3,overflow:"hidden" }}>
                    <div style={{ height:"100%",width:`${sk.level}%`,borderRadius:3,background:CAT_COLORS[cat]??accent }}/>
                  </div>
                </div>
                <div style={{ display:"flex",gap:6,flexShrink:0 }}>
                  <button onClick={()=>open(sk)} style={btnS}><Pencil size={13}/>Edit</button>
                  <button onClick={()=>setDeleteTarget({type:"skill",id:sk.name})} style={{ padding:"9px 12px",borderRadius:99,background:"#ef444418",color:"#ef4444",border:"1px solid #ef444430",fontSize:12,cursor:"pointer",display:"flex",alignItems:"center" }}><Trash2 size={13}/></button>
                </div>
              </div>
            ))}
          </div>
        ))}
        {editItem && editType==="skill" && (
          <Modal onClose={()=>setEditItem(null)} surface={surface} border={border}>
            <h3 style={{ fontFamily:"'DM Serif Display',serif",fontSize:22,color:fg,marginBottom:20 }}>Edit Skill</h3>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14 }} className="two-col">
              <div>
                <label style={{ display:"block",fontFamily:"'DM Mono',monospace",fontSize:11,color:muted,textTransform:"uppercase",letterSpacing:".1em",marginBottom:6 }}>Name</label>
                <input className="ff" style={{ ...inp,color:fg }} value={editItem.name} onChange={e=>setEditItem({...editItem,name:e.target.value})}/>
              </div>
              <div>
                <label style={{ display:"block",fontFamily:"'DM Mono',monospace",fontSize:11,color:muted,textTransform:"uppercase",letterSpacing:".1em",marginBottom:6 }}>Icon</label>
                <input className="ff" style={{ ...inp,color:fg }} value={editItem.icon} onChange={e=>setEditItem({...editItem,icon:e.target.value})}/>
              </div>
            </div>
            <div style={{ marginBottom:14 }}>
              <label style={{ display:"block",fontFamily:"'DM Mono',monospace",fontSize:11,color:muted,textTransform:"uppercase",letterSpacing:".1em",marginBottom:6 }}>Category</label>
              <select className="ff" style={{ ...inp,color:fg }} value={editItem.category} onChange={e=>setEditItem({...editItem,category:e.target.value})}>
                {["frontend","backend","tools","design"].map(c=><option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div style={{ marginBottom:20 }}>
              <label style={{ display:"block",fontFamily:"'DM Mono',monospace",fontSize:11,color:muted,textTransform:"uppercase",letterSpacing:".1em",marginBottom:6 }}>Level — {editItem.level}%</label>
              <input type="range" min={0} max={100} value={editItem.level} onChange={e=>setEditItem({...editItem,level:+e.target.value})}/>
              <div style={{ height:6,background:surface2,borderRadius:3,marginTop:8,overflow:"hidden" }}>
                <div style={{ height:"100%",width:`${editItem.level}%`,background:`linear-gradient(90deg,${accent},${accent2})`,borderRadius:3,transition:"width .1s" }}/>
              </div>
            </div>
            <div style={{ display:"flex",gap:10,justifyContent:"flex-end" }}>
              <button onClick={()=>setEditItem(null)} style={{ ...btnS,color:fg }}>Cancel</button>
              <button onClick={save} style={btnP}><Save size={14}/>Save</button>
            </div>
          </Modal>
        )}
        {deleteTarget?.type==="skill" && <ConfirmDelete onConfirm={()=>{ setSkills(prev=>prev.filter(s=>s.name!==deleteTarget.id)); toast("Deleted","info"); setDeleteTarget(null); }} onCancel={()=>setDeleteTarget(null)} surface={surface} border={border}/>}
      </div>
    );
  };

  // ── TIMELINE ──
  const renderTimeline = () => {
    const open = (t?: any) => { setEditItem(t ? {...t} : { id:uid(),year:String(new Date().getFullYear()),title:"",company:"",description:"",type:"work" }); setEditType("timeline"); };
    const save = () => {
      setTimeline(prev => prev.find(t=>t.year===editItem.year&&t.title===editItem.title) ? prev.map(t=>t.year===editItem.year&&t.title===editItem.title?editItem:t) : [...prev,editItem]);
      toast("Saved!","success"); setEditItem(null);
    };
    return (
      <div style={{ animation:"fadeUp .3s ease" }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:28,flexWrap:"wrap",gap:12 }}>
          <div><h1 style={{ fontFamily:"'DM Serif Display',serif",fontSize:28,color:fg,marginBottom:2 }}>Timeline</h1></div>
          <button onClick={()=>open()} style={btnP}><Plus size={14}/>Add entry</button>
        </div>
        {timeline.map((item,i) => {
          const c = TL_COLORS[item.type]??accent;
          const TLI = TL_ICONS[item.type]??Briefcase;
          return (
            <div key={i} className="hov" style={{ display:"flex",gap:14,padding:14,borderRadius:16,background:surface,border:`1px solid ${border}`,marginBottom:8,transition:"background .15s",alignItems:"center" }}>
              <div style={{ width:38,height:38,borderRadius:10,background:`${c}18`,border:`1px solid ${c}33`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                <TLI size={18} color={c}/>
              </div>
              <div style={{ flex:1,minWidth:0 }}>
                <div style={{ display:"flex",alignItems:"center",gap:6,marginBottom:2,flexWrap:"wrap" }}>
                  <span style={{ fontSize:14,fontWeight:600,color:fg }}>{item.title}</span>
                  <span style={{ fontSize:10,padding:"1px 7px",borderRadius:99,background:`${c}20`,color:c,fontFamily:"'DM Mono',monospace" }}>{item.year}</span>
                </div>
                <p style={{ fontSize:12,color:muted }}>{item.company}</p>
              </div>
              <div style={{ display:"flex",gap:6,flexShrink:0 }}>
                <button onClick={()=>open(item)} style={btnS}><Pencil size={13}/>Edit</button>
                <button onClick={()=>setDeleteTarget({type:"timeline",id:item.year+item.title})} style={{ padding:"9px 12px",borderRadius:99,background:"#ef444418",color:"#ef4444",border:"1px solid #ef444430",fontSize:12,cursor:"pointer",display:"flex",alignItems:"center" }}><Trash2 size={13}/></button>
              </div>
            </div>
          );
        })}
        {editItem && editType==="timeline" && (
          <Modal onClose={()=>setEditItem(null)} surface={surface} border={border}>
            <h3 style={{ fontFamily:"'DM Serif Display',serif",fontSize:22,color:fg,marginBottom:20 }}>Edit Entry</h3>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12 }} className="two-col">
              <div>
                <label style={{ display:"block",fontFamily:"'DM Mono',monospace",fontSize:11,color:muted,textTransform:"uppercase",letterSpacing:".1em",marginBottom:6 }}>Year</label>
                <input className="ff" style={{ ...inp,color:fg }} value={editItem.year} onChange={e=>setEditItem({...editItem,year:e.target.value})}/>
              </div>
              <div>
                <label style={{ display:"block",fontFamily:"'DM Mono',monospace",fontSize:11,color:muted,textTransform:"uppercase",letterSpacing:".1em",marginBottom:6 }}>Type</label>
                <select className="ff" style={{ ...inp,color:fg }} value={editItem.type} onChange={e=>setEditItem({...editItem,type:e.target.value})}>
                  {["work","project","education"].map(t=><option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            {[["title","Title"],["company","Company / Institution"],["description","Description"]].map(([k,l]) => (
              <div key={k} style={{ marginBottom:12 }}>
                <label style={{ display:"block",fontFamily:"'DM Mono',monospace",fontSize:11,color:muted,textTransform:"uppercase",letterSpacing:".1em",marginBottom:6 }}>{l}</label>
                {k==="description" ? <textarea className="ff" rows={3} style={{ ...inp,resize:"none",color:fg }} value={editItem[k]} onChange={e=>setEditItem({...editItem,[k]:e.target.value})}/> : <input className="ff" style={{ ...inp,color:fg }} value={editItem[k]} onChange={e=>setEditItem({...editItem,[k]:e.target.value})}/>}
              </div>
            ))}
            <div style={{ display:"flex",gap:10,justifyContent:"flex-end" }}>
              <button onClick={()=>setEditItem(null)} style={{ ...btnS,color:fg }}>Cancel</button>
              <button onClick={save} style={btnP}><Save size={14}/>Save</button>
            </div>
          </Modal>
        )}
        {deleteTarget?.type==="timeline" && <ConfirmDelete onConfirm={()=>{ setTimeline(prev=>prev.filter(t=>t.year+t.title!==deleteTarget.id)); toast("Deleted","info"); setDeleteTarget(null); }} onCancel={()=>setDeleteTarget(null)} surface={surface} border={border}/>}
      </div>
    );
  };

  // ── BLOG ──
  const renderBlog = () => {
    const open = (b?: any) => { setEditItem(b ? {...b,tags:Array.isArray(b.tags)?b.tags.join(","):b.tags} : { id:uid(),title:"",excerpt:"",content:"",tags:"",date:new Date().toISOString().slice(0,10),readTime:5,cover:"✍️" }); setEditType("blog"); };
    const save = () => {
      const item = { ...editItem, tags: editItem.tags.split(",").map((t:string)=>t.trim()).filter(Boolean) };
      setBlog(prev => prev.find(b=>b.id===item.id) ? prev.map(b=>b.id===item.id?item:b) : [...prev,item]);
      toast("Post saved!","success"); setEditItem(null);
    };
    return (
      <div style={{ animation:"fadeUp .3s ease" }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:28,flexWrap:"wrap",gap:12 }}>
          <div><h1 style={{ fontFamily:"'DM Serif Display',serif",fontSize:28,color:fg,marginBottom:2 }}>Blog</h1><p style={{ fontSize:14,color:muted }}>{blog.length} posts</p></div>
          <button onClick={()=>open()} style={btnP}><Plus size={14}/>Add post</button>
        </div>
        {blog.map(b => (
          <div key={b.id} className="hov" style={{ display:"flex",alignItems:"center",gap:14,padding:14,borderRadius:16,background:surface,border:`1px solid ${border}`,marginBottom:8,transition:"background .15s" }}>
            <div style={{ width:44,height:44,borderRadius:12,background:surface2,border:`1px solid ${border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0 }}>{b.cover}</div>
            <div style={{ flex:1,minWidth:0 }}>
              <div style={{ fontSize:14,fontWeight:600,color:fg,marginBottom:2 }}>{b.title}</div>
              <div style={{ fontSize:11,color:muted,fontFamily:"'DM Mono',monospace" }}>{b.date} · {b.readTime} min read</div>
            </div>
            <div style={{ display:"flex",gap:6,flexShrink:0 }}>
              <button onClick={()=>open(b)} style={btnS}><Pencil size={13}/>Edit</button>
              <button onClick={()=>setDeleteTarget({type:"blog",id:b.id})} style={{ padding:"9px 12px",borderRadius:99,background:"#ef444418",color:"#ef4444",border:"1px solid #ef444430",fontSize:12,cursor:"pointer",display:"flex",alignItems:"center" }}><Trash2 size={13}/></button>
            </div>
          </div>
        ))}
        {editItem && editType==="blog" && (
          <Modal onClose={()=>setEditItem(null)} surface={surface} border={border}>
            <h3 style={{ fontFamily:"'DM Serif Display',serif",fontSize:22,color:fg,marginBottom:20 }}>Edit Post</h3>
            <div style={{ marginBottom:12 }}>
              <label style={{ display:"block",fontFamily:"'DM Mono',monospace",fontSize:11,color:muted,textTransform:"uppercase",letterSpacing:".1em",marginBottom:6 }}>Title</label>
              <input className="ff" style={{ ...inp,color:fg }} value={editItem.title} onChange={e=>setEditItem({...editItem,title:e.target.value})}/>
            </div>
            <div style={{ marginBottom:12 }}>
              <label style={{ display:"block",fontFamily:"'DM Mono',monospace",fontSize:11,color:muted,textTransform:"uppercase",letterSpacing:".1em",marginBottom:6 }}>Excerpt</label>
              <textarea className="ff" rows={2} style={{ ...inp,resize:"none",color:fg }} value={editItem.excerpt} onChange={e=>setEditItem({...editItem,excerpt:e.target.value})}/>
            </div>
            <div style={{ marginBottom:12 }}>
              <label style={{ display:"block",fontFamily:"'DM Mono',monospace",fontSize:11,color:muted,textTransform:"uppercase",letterSpacing:".1em",marginBottom:6 }}>Content</label>
              <textarea className="ff" rows={5} style={{ ...inp,resize:"none",color:fg,fontFamily:"'DM Mono',monospace",fontSize:12 }} value={editItem.content} onChange={e=>setEditItem({...editItem,content:e.target.value})}/>
            </div>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:14 }} className="two-col">
              {[["tags","Tags"],["date","Date"],["cover","Cover"]].map(([k,l]) => (
                <div key={k}>
                  <label style={{ display:"block",fontFamily:"'DM Mono',monospace",fontSize:11,color:muted,textTransform:"uppercase",letterSpacing:".1em",marginBottom:6 }}>{l}</label>
                  <input className="ff" style={{ ...inp,color:fg }} value={editItem[k]} onChange={e=>setEditItem({...editItem,[k]:e.target.value})}/>
                </div>
              ))}
            </div>
            <div style={{ marginBottom:20 }}>
              <label style={{ display:"block",fontFamily:"'DM Mono',monospace",fontSize:11,color:muted,textTransform:"uppercase",letterSpacing:".1em",marginBottom:6 }}>Read time — {editItem.readTime} min</label>
              <input type="range" min={1} max={30} value={editItem.readTime} onChange={e=>setEditItem({...editItem,readTime:+e.target.value})}/>
            </div>
            <div style={{ display:"flex",gap:10,justifyContent:"flex-end" }}>
              <button onClick={()=>setEditItem(null)} style={{ ...btnS,color:fg }}>Cancel</button>
              <button onClick={save} style={btnP}><Save size={14}/>Save</button>
            </div>
          </Modal>
        )}
        {deleteTarget?.type==="blog" && <ConfirmDelete onConfirm={()=>{ setBlog(prev=>prev.filter(b=>b.id!==deleteTarget.id)); toast("Deleted","info"); setDeleteTarget(null); }} onCancel={()=>setDeleteTarget(null)} surface={surface} border={border}/>}
      </div>
    );
  };

  // ── MESSAGES ──
  const renderMessages = () => (
    <div style={{ animation:"fadeUp .3s ease" }}>
      <h1 style={{ fontFamily:"'DM Serif Display',serif",fontSize:28,color:fg,marginBottom:4 }}>Messages</h1>
      <p style={{ fontSize:14,color:muted,marginBottom:28 }}>Contact form submissions.</p>
      <div style={{ padding:32,borderRadius:20,background:surface,border:`1px solid ${border}`,textAlign:"center" }}>
        <MessageSquare size={40} color={muted} style={{ margin:"0 auto 12px" }}/>
        <h3 style={{ fontFamily:"'DM Serif Display',serif",fontSize:20,color:fg,marginBottom:8 }}>Messages go to your email</h3>
        <p style={{ fontSize:14,color:muted,maxWidth:400,margin:"0 auto" }}>
          Set <code style={{ fontFamily:"'DM Mono',monospace",background:surface2,padding:"2px 6px",borderRadius:4 }}>EMAIL_USER</code> and <code style={{ fontFamily:"'DM Mono',monospace",background:surface2,padding:"2px 6px",borderRadius:4 }}>EMAIL_PASS</code> in Vercel environment variables.
        </p>
      </div>
    </div>
  );

  const sections: Record<string, () => React.ReactNode> = { dashboard:renderDashboard, brand:renderBrand, projects:renderProjects, skills:renderSkills, timeline:renderTimeline, blog:renderBlog, messages:renderMessages };

  return (
    <div style={{ minHeight:"100vh",background:bg,color:fg,fontFamily:"'DM Sans',sans-serif",display:"flex",flexDirection:"column" }}>
      <style>{css}</style>

      {/* TOP BAR */}
      <header style={{ position:"sticky",top:0,zIndex:100,background:`${surface}ec`,backdropFilter:"blur(16px)",borderBottom:`1px solid ${border}`,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 20px",height:58,gap:12,flexShrink:0 }}>
        <div style={{ display:"flex",alignItems:"center",gap:10 }}>
          <div style={{ width:28,height:28,borderRadius:8,background:`linear-gradient(135deg,${accent},${accent2})`,display:"flex",alignItems:"center",justifyContent:"center" }}>
            <span style={{ fontFamily:"'DM Mono',monospace",fontWeight:700,fontSize:10,color:"#fff" }}>ZW</span>
          </div>
          <span style={{ fontFamily:"'DM Mono',monospace",fontSize:13,fontWeight:700,background:`linear-gradient(135deg,${accent},${accent2})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>Zewin Group</span>
          <span style={{ fontSize:12,color:muted }}>/ Admin</span>
        </div>
        <div style={{ display:"flex",gap:8,alignItems:"center" }}>
          <button onClick={()=>setDark(!dark)} style={{ width:32,height:32,borderRadius:"50%",border:`1px solid ${border}`,background:surface2,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center" }}>
            {dark ? <Sun size={15} color={muted}/> : <Moon size={15} color={muted}/>}
          </button>
          <a href="/" target="_blank" rel="noreferrer" style={{ width:32,height:32,borderRadius:"50%",border:`1px solid ${border}`,background:surface2,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none" }} title="View site">
            <Eye size={14} color={muted}/>
          </a>
          <button onClick={handleLogout} style={{ width:32,height:32,borderRadius:"50%",border:`1px solid ${border}`,background:surface2,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center" }} title="Logout">
            <LogOut size={14} color={muted}/>
          </button>
        </div>
      </header>

      <div style={{ display:"flex",flex:1 }}>
        {/* SIDEBAR */}
        <aside className="sidebar" style={{ width:200,borderRight:`1px solid ${border}`,padding:"16px 8px",background:surface,position:"sticky",top:58,height:"calc(100vh - 58px)",overflowY:"auto",flexShrink:0,display:"flex",flexDirection:"column",gap:2 }}>
          {TABS.map(({ id, label, Icon:I }) => (
            <button key={id} className="sb-btn" onClick={()=>setTab(id)} style={{ width:"100%",display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:10,background:tab===id?`${accent}15`:"transparent",border:tab===id?`1px solid ${accent}30`:"1px solid transparent",color:tab===id?accent:muted,fontSize:13,fontWeight:500,cursor:"pointer",textAlign:"left",transition:"all .15s" }}>
              <I size={16}/><span style={{ flex:1 }}>{label}</span>
              {id==="projects" && <span style={{ fontSize:10,background:surface2,padding:"1px 6px",borderRadius:99,color:muted }}>{projects.length}</span>}
              {id==="skills"   && <span style={{ fontSize:10,background:surface2,padding:"1px 6px",borderRadius:99,color:muted }}>{skills.length}</span>}
            </button>
          ))}
        </aside>

        {/* MAIN */}
        <main className="main" style={{ flex:1,padding:"32px 36px",overflowY:"auto" }}>
          {sections[tab]?.()}
        </main>
      </div>

      {/* TOASTS */}
      <div style={{ position:"fixed",bottom:24,right:24,zIndex:9999,display:"flex",flexDirection:"column",gap:8,pointerEvents:"none" }}>
        {toasts.map(t => (
          <div key={t.id} style={{ padding:"11px 18px",borderRadius:14,fontSize:13,fontWeight:500,display:"flex",alignItems:"center",gap:8,background:t.type==="success"?"#16a34a":t.type==="error"?"#dc2626":"#2563eb",color:"#fff",boxShadow:"0 8px 30px rgba(0,0,0,.3)",animation:"toastIn .3s ease" }}>
            {t.type==="success" ? <Check size={14}/> : <X size={14}/>}
            {t.msg}
          </div>
        ))}
      </div>
    </div>
  );
}
