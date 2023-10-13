import { CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import UserRegistration from "./scenes/Users";
import Bar from "./scenes/bar";
import Dashboard from "./scenes/dashboard";
import Form from "./scenes/form";
import Geography from "./scenes/geography";
import Sidebar from "./scenes/global/Sidebar";
import Topbar from "./scenes/global/Topbar";
import Line from "./scenes/line";
import FAQ from "./scenes/login";
import Pie from "./scenes/pie";
import USER from "./scenes/team";
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
            <Route path="/dashboard" element={
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
              <Route path="/form" element={<Skaford><Form /></Skaford>} />
              <Route path="/coperative" element={<Skaford><coperative /></Skaford>} />
              <Route path="/UserRegistration" element={<Skaford><UserRegistration /></Skaford>} />
              <Route path="/" element={
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
