import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${(probs) => probs.theme['green-500']};
}

body {
    
    background: ${(probs) => probs.theme['gray-900']};
    color: ${(probs) => probs.theme['gray-300']};
    -webkit-font-smoothing: antialiased;
}

body, input, textarea, button {
    font-family: 'roboto', sans-serif;
    font-weight: 400;
    font-size: 1rem;
}


`
