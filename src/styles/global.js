import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        box-sizing: 0;
    }

    html {
        font-size: 100%;
        font-family: 'Sora', sans-serif;
    }

    html, body, #__next {
        height: 100%;
    }
`;

export default GlobalStyles;
