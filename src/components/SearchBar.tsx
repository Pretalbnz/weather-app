import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { getCitySuggestions, CitySuggestion } from "../api/weather";

const Wrap = styled.div`position: relative; max-width: 700px; margin: 0 auto;`;
const Form = styled.form`display:flex; gap:.5rem;`;
const Input = styled.input`
  flex:1; padding:.75rem 1rem; border-radius:12px; border:1px solid #2b3445; background:#0f172a; color:#e5e7eb;
`;
const Btn = styled.button`
  padding:.75rem 1rem; border:none; border-radius:12px; background:#0b84ff; color:#fff; cursor:pointer;
`;
const List = styled.ul`
  position:absolute; top:100%; left:0; right:0; z-index:10;
  background:#0f172a; border:1px solid #2b3445; border-radius:12px; margin-top:.35rem;
  max-height:260px; overflow:auto; list-style:none; padding:.25rem;
`;
const Item = styled.li<{active:boolean}>`
  padding:.65rem .75rem; border-radius:10px; cursor:pointer;
  background: ${({active}) => active ? "#1f2937" : "transparent"};
  &:hover{ background:#1f2937; }
  small{ opacity:.7; }
`;

type Props = {
  onSearch: (city: string) => void;               // pesquisa por nome
  onPickCoords?: (c: CitySuggestion) => void;     // opcional: usar coords diretamente
};

export default function SearchBar({ onSearch, onPickCoords }: Props) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(-1);
  const [items, setItems] = useState<CitySuggestion[]>([]);
  const abortRef = useRef<AbortController | null>(null);

  // debounce 250ms
  const debouncedQ = useDebounce(q, 250);

  useEffect(() => {
    (async () => {
      setIdx(-1);
      if (abortRef.current) abortRef.current.abort();
      abortRef.current = new AbortController();

      const list = await getCitySuggestions(debouncedQ).catch(() => []);
      setItems(list);
      setOpen(list.length > 0);
    })();
  }, [debouncedQ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idx >= 0 && items[idx]) {
      select(items[idx]);
    } else if (q.trim()) {
      onSearch(q.trim());
      setOpen(false);
    }
  };

  const select = (c: CitySuggestion) => {
    setQ(`${c.name}${c.state ? ", " + c.state : ""}, ${c.country}`);
    setOpen(false);
    onPickCoords?.(c);        // se quiseres chamar direto por coords
    onSearch(c.name);         // fallback por nome
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || items.length === 0) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setIdx((i) => Math.min(i + 1, items.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setIdx((i) => Math.max(i - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); if (idx >= 0) select(items[idx]); }
    else if (e.key === "Escape") { setOpen(false); }
  };

  return (
    <Wrap>
      <Form onSubmit={handleSubmit} role="search">
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={() => items.length && setOpen(true)}
          placeholder="Introduz uma cidade…"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls="city-suggestions"
        />
        <Btn type="submit" aria-label="Pesquisar">Pesquisar</Btn>
      </Form>

      {open && items.length > 0 && (
        <List id="city-suggestions" role="listbox">
          {items.map((c, i) => (
            <Item
              key={`${c.name}-${c.lat}-${c.lon}`}
              active={i === idx}
              role="option"
              aria-selected={i === idx}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => select(c)}
            >
              <div>{c.name}{c.state ? `, ${c.state}` : ""}</div>
              <small>{c.country}</small>
            </Item>
          ))}
        </List>
      )}
    </Wrap>
  );
}

/* --- util: debounce --- */
function useDebounce<T>(value: T, ms = 250) {
  const [v, setV] = useState(value);
  useEffect(() => { const t = setTimeout(() => setV(value), ms); return () => clearTimeout(t); }, [value, ms]);
  return v;
}
