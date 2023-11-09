import { CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import UserRegistration from "./scenes/Users";
import UserProfile from "./scenes/Users/profile";
import CooperativeRegistration from "./scenes/addCoperative";
import Bar from "./scenes/bar";
import CATEGORIES from "./scenes/cropCategory";
import Dashboard from "./scenes/dashboard";
import DEVICES from "./scenes/device";
import Form from "./scenes/form";
import Geography from "./scenes/geography";
import Sidebar from "./scenes/global/Sidebar";
import Topbar from "./scenes/global/Topbar";
import Line from "./scenes/line";
import FAQ from "./scenes/login";
import Pie from "./scenes/pie";
import USER from "./scenes/team";
import SupervisorTable from "./scenes/team/supervisor";
import COOPERATIVES from "./scenes/viewCoperative";
import ROLES from "./scenes/viewRole";
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
              <Route path="/addcoperative" element={<Skaford><CooperativeRegistration/></Skaford>} />
              <Route path="/viewcoperative" element={<Skaford><COOPERATIVES/></Skaford>} />
              <Route path="/cropcategory" element={<Skaford><CATEGORIES/></Skaford>} /> 
              <Route path="/device" element={<Skaford><DEVICES/></Skaford>} />
              <Route path="/viewroles" element={<Skaford><ROLES/></Skaford>} />
              <Route path="/UserProfile" element={<Skaford><UserProfile/></Skaford>} />
              <Route path="/supervisor" element={<Skaford><SupervisorTable/></Skaford>} />
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
