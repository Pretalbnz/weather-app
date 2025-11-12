// components/Panel.tsx
import React from "react";
export default function Panel({title, value}:{title:string; value:string}){
  return (
    <div style={{background:"var(--panel-2)", borderRadius:16, padding:16}}>
      <div style={{color:"var(--muted)", fontSize:12, letterSpacing:.5}}>{title}</div>
      <div style={{fontSize:28, fontWeight:700, marginTop:6}}>{value}</div>
    </div>
  );
}
