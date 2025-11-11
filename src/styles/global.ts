// src/styles/global.ts
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background: linear-gradient(180deg, #e6f0ff 0%, #f9fcff 100%);
    color: #333;
    min-height: 100vh;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: #0a3d62;
  }
`;

