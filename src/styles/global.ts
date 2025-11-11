import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *{ margin:0; padding:0; box-sizing:border-box; }
  body{
    font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
    background: #0b1220;
    color:#e5e7eb;
    min-height:100vh;
  }
  h1{ font-size: 2.2rem; margin: 1rem 0 1.25rem; }
  .container{ max-width: 1000px; margin: 0 auto; padding: 1.5rem; }
  .panel{
    background:#0f172a; border-radius:20px; padding:1rem; margin-top:1.25rem;
    box-shadow: 0 10px 30px rgba(0,0,0,.25);
  }
`;
