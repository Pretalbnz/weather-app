// src/components/RecentSearches.tsx
import React from "react";
import styled from "styled-components";

const Box = styled.div`display:grid; gap:.5rem;`;
const Item = styled.button`
  width:100%; text-align:left; padding:.6rem .8rem; border-radius:10px;
  border:1px solid #2b3445; background:#182133; color:#e5e7eb; cursor:pointer;
  &:hover{ background:#1f2633; }
`;

export default function RecentSearches({
  items, onPick, onClear,
}: { items: string[]; onPick: (city: string) => void; onClear?: () => void }) {
  return (
    <Box>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <h3 style={{margin:0, color:"#94a3b8", fontSize:14}}>Pesquisas recentes</h3>
        {!!items.length && (
          <button onClick={onClear} style={{background:"transparent", border:"none", color:"#94a3b8", cursor:"pointer"}}>Limpar</button>
        )}
      </div>
      {items.length === 0 ? (
        <div style={{color:"#94a3b8"}}>Sem pesquisas.</div>
      ) : (
        items.map(c => <Item key={c} onClick={()=>onPick(c)}>{c}</Item>)
      )}
    </Box>
  );
}
