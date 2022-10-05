import { ThemeProvider } from "styled-components";
import { Router } from "./Router";
import { GlobalStyle } from "./styles/global";
import { BrowserRouter } from "react-router-dom"
import { defaultTheme } from "./styles/themes/default";
import { createContext } from "react";
import { CyclesContextProvider } from "./contexts/CyclesContext";




export function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )

}
