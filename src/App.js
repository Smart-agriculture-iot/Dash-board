import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import USER from "./scenes/team";
import Bar from "./scenes/bar";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/login";
import LoginActivity from "./scenes/login";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const Skaford = ({children}) => {
    return <>
      <Sidebar isSidebar={isSidebar} />
      <main className="content">
                  <Topbar setIsSidebar={setIsSidebar} />
                  {children}
                </main>
    </>
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
        
          <Routes>
            <Route path="/" element={
              <Skaford>
                <Dashboard />
              </Skaford>
            
            } />
            <Route path="/USER" element={
              <Skaford><USER /></Skaford>
            
            } />
              <Route path="/USER" element={<Skaford><USER /></Skaford>} />
              <Route path="/bar" element={<Skaford><Bar /></Skaford>} />
              <Route path="/pie" element={<Skaford><Pie /></Skaford>} />
              <Route path="/line" element={<Skaford><Line /></Skaford>} />
              <Route path="/login" element={
                <div className="mx-auto">
                  <FAQ />
                </div>
              
              } />
              
        
              <Route path="/geography" element={<Skaford><Geography /></Skaford>} />
            </Routes>
          
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
