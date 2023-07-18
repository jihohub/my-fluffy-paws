import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
  }

  body {
    font-family: Helvetica, Arial, sans-serif;
  }

  #root {
    max-width: 1200px;
    margin: 0 auto;
  }
`;

export default GlobalStyle;
