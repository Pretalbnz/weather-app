import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getCitySuggestions, CitySuggestion } from "../api/weather";

const Wrap = styled.div`
  position: relative;
  width: 100%;
`;
const Form = styled.form`
  display: flex;
  gap: 0.6rem;
  width: 100%;
`;
const Input = styled.input`
  flex: 1 1 auto;
  min-width: 0; /* evita empurrar o botão para fora */
  padding: 0.9rem 1.1rem;
  border-radius: 12px;
  border: 1px solid #2b3445;
  background: #0f172a;
  color: #e5e7eb;
  outline: none;
  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
  }
`;
const Btn = styled.button`
  flex: 0 0 auto; /* mantém o tamanho do botão fixo */
  padding: 0.9rem 1.2rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  background: #3b82f6;
  color: #fff;
  font-weight: 600;
  &:hover {
    filter: brightness(1.05);
  }
`;
const List = styled.ul`
  position: absolute;
  top: calc(100% + 0.35rem);
  left: 0;
  right: 0;
  z-index: 1000;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 20;
  background: #0f172a;
  border: 1px solid #2b3445;
  border-radius: 12px;
  margin-top: 0.35rem;
  max-height: 260px;
  overflow: auto;
  list-style: none;
  padding: 0.25rem;
`;
const Item = styled.li<{ active: boolean }>`
  padding: 0.7rem 0.8rem;
  border-radius: 10px;
  cursor: pointer;
  background: ${(p) => (p.active ? "#1f2937" : "transparent")};
  &:hover {
    background: #1f2937;
  }
  small {
    opacity: 0.7;
  }
`;

type Props = {
  onSearch: (city: string) => void;
  onPickCoords?: (c: CitySuggestion) => void;
};

const portalRoot = document.body;

export default function SearchBar({ onSearch, onPickCoords }: Props) {
  
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(-1);
  const [items, setItems] = useState<CitySuggestion[]>([]);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // autocomplete
  useEffect(() => {
    const t = setTimeout(async () => {
      if (q.trim().length < 3) {
        setItems([]);
        setOpen(false);
        return;
      }
      const list = await getCitySuggestions(q.trim()).catch(() => []);
      setItems(list);
      setOpen(list.length > 0);
      setIdx(-1);
    }, 250);
    return () => clearTimeout(t);
  }, [q]);

  // fechar ao clicar fora
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const select = (c: CitySuggestion) => {
    setQ(`${c.name}${c.state ? ", " + c.state : ""}, ${c.country}`);
    setOpen(false);
    inputRef.current?.blur(); // sai da searchbar
    onPickCoords?.(c);
    onSearch(c.name);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idx >= 0 && items[idx]) select(items[idx]);
    else if (q.trim()) {
      setOpen(false);
      inputRef.current?.blur(); // sai da searchbar
      onSearch(q.trim());
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || items.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIdx((i) => Math.min(i + 1, items.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (idx >= 0) select(items[idx]);
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <Wrap ref={wrapRef}>
      <Form onSubmit={submit} role="search">
        <Input
          ref={inputRef}
          placeholder="Search for cities"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={onKeyDown}
          aria-autocomplete="list"
          aria-expanded={open}
        />
        <Btn type="submit" aria-label="Pesquisar">
          Pesquisar
        </Btn>
      </Form>

      {open && items.length > 0 && (
        <List role="listbox">
          {items.map((c, i) => (
            <Item
              key={`${c.name}-${c.lat}-${c.lon}`}
              active={i === idx}
              role="option"
              aria-selected={i === idx}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => select(c)}
            >
              <div>
                {c.name}
                {c.state ? `, ${c.state}` : ""}
              </div>
              <small>{c.country}</small>
            </Item>
          ))}
        </List>
      )}
    </Wrap>
  );
}
