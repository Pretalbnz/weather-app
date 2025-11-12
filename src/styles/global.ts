// styles/global.ts
import { createGlobalStyle } from "styled-components";
export const GlobalStyle = createGlobalStyle`
  :root{
    --bg:#0b1220; --panel:#0f172a; --panel-2:#182133;
    --text:#e5e7eb; --muted:#94a3b8; --primary:#3b82f6; --stroke:#2b3445;
  }
  *{margin:0;padding:0;box-sizing:border-box;}
  body{font-family:Inter,system-ui,Segoe UI,Roboto,Arial,sans-serif;background:var(--bg);color:var(--text);min-height:100vh;}
  h1{font-size:2rem;}
  .container{max-width:1200px;margin:0 auto;padding:1.5rem;}
  * {
  scrollbar-width: thin;                 /* auto | thin | none */
  scrollbar-color: #2f3b52 transparent;  /* thumb | track */
}

/* WebKit (Chrome, Edge, Safari, Opera) */
*::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
*::-webkit-scrollbar-track {
  background: transparent;
}
*::-webkit-scrollbar-thumb {
  background: #2f3b52;                   /* cor do “thumb” */
  border-radius: 999px;
  border: 2px solid transparent;         /* “almofada” para ficar arredondado */
  background-clip: padding-box;
}
*::-webkit-scrollbar-thumb:hover {
  background: #3b4966;
}
`;
