"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Lock } from "lucide-react";

export default function LoginClient() {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useSearchParams();

  const handleLogin = async () => {
    if (!password) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        const from = params.get("from") ?? "/admin";
        router.push(from);
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error ?? "Wrong password");
      }
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight:"100vh", background:"#0c1015", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'DM Sans',sans-serif", padding:24, position:"relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0} input{font-family:'DM Sans',sans-serif}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none" }}>
        <div style={{ position:"absolute", top:"20%", left:"25%", width:400, height:400, borderRadius:"50%", background:"#4f8ef712", filter:"blur(80px)" }}/>
        <div style={{ position:"absolute", bottom:"20%", right:"25%", width:320, height:320, borderRadius:"50%", background:"#a78bfa10", filter:"blur(80px)" }}/>
      </div>

      <div style={{ width:"100%", maxWidth:420, animation:"fadeUp .5s ease", position:"relative" }}>
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <div style={{ width:64, height:64, borderRadius:20, margin:"0 auto 16px", background:"linear-gradient(135deg,#4f8ef7,#a78bfa)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 12px 40px #4f8ef733" }}>
            <Lock size={26} color="#fff" strokeWidth={1.8}/>
          </div>
          <h1 style={{ fontFamily:"'DM Serif Display',serif", fontSize:28, color:"#e8eaf0", marginBottom:6 }}>Admin Panel</h1>
          <p style={{ fontSize:14, color:"#6b7685" }}>Zewin Group</p>
        </div>

        <div style={{ background:"#13181f", border:"1px solid #232d3d", borderRadius:24, padding:32, boxShadow:"0 20px 60px rgba(0,0,0,.3)" }}>
          <div style={{ marginBottom:20 }}>
            <label style={{ display:"block", fontFamily:"'DM Mono',monospace", fontSize:11, color:"#6b7685", textTransform:"uppercase", letterSpacing:".1em", marginBottom:8 }}>Password</label>
            <div style={{ position:"relative" }}>
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={e => { setPassword(e.target.value); setError(""); }}
                onKeyDown={e => e.key === "Enter" && handleLogin()}
                placeholder="Enter admin password"
                style={{ width:"100%", padding:"11px 44px 11px 14px", borderRadius:12, background:"#1a2030", border:`1.5px solid ${error ? "#ef4444" : "#232d3d"}`, color:"#e8eaf0", fontSize:14, outline:"none" }}
              />
              <button onClick={() => setShow(!show)} style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:"#6b7685", display:"flex", alignItems:"center" }}>
                {show ? <EyeOff size={16}/> : <Eye size={16}/>}
              </button>
            </div>
          </div>

          {error && (
            <div style={{ padding:"10px 14px", borderRadius:10, marginBottom:16, background:"#ef444415", border:"1px solid #ef444430", color:"#ef4444", fontSize:13 }}>
              ⚠ {error}
            </div>
          )}

          <button onClick={handleLogin} disabled={loading || !password}
            style={{ width:"100%", padding:12, borderRadius:12, background:"linear-gradient(135deg,#4f8ef7,#a78bfa)", color:"#fff", fontSize:14, fontWeight:600, border:"none", cursor:loading ? "wait" : "pointer", opacity:loading || !password ? 0.6 : 1 }}>
            {loading ? "Signing in..." : "Sign in →"}
          </button>

          <p style={{ textAlign:"center", marginTop:16, fontSize:11, color:"#6b7685", fontFamily:"'DM Mono',monospace" }}>
            Default: <span style={{ color:"#4f8ef7" }}></span>
          </p>
        </div>

        <div style={{ textAlign:"center", marginTop:20 }}>
          <a href="/" style={{ fontSize:13, color:"#6b7685", textDecoration:"none" }}>← Back to site</a>
        </div>
      </div>
    </div>
  );
}
