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

  a {
    text-decoration: none;
  }

  #root {
    max-width: 500px;
    margin: 0 auto;

    @media (max-width: 768px) {
      width: 100vw;
    }
  }
`;

export default GlobalStyle;
