import AddIcon from '@mui/icons-material/Add';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GridOnIcon from '@mui/icons-material/GridOn';
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import SyncLockIcon from '@mui/icons-material/SyncLock';
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { useState } from "react";
import { Menu, MenuItem, ProSidebar } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed} height="80px">
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  HINGA WIZEYE
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/images.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  ADMIN
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  admin
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            
           <Accordion sx={{
    backgroundColor: `${colors.primary[400]} !important`,
  }}
  >
  <AccordionSummary
    expandIcon={<ExpandMoreIcon />}
    aria-controls="manage-users-submenu"
    id="manage-users-submenu"
  >
    {<PeopleOutlinedIcon />}
    <Typography>Manage Users</Typography>
  </AccordionSummary>
  <AccordionDetails>
    <Menu>
      <Item
        title="Add User"
        to="/UserRegistration"
        icon={<GroupAddOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
<Item
              title="View Users"
              to="/USER"
              icon={<GridOnIcon />}
              selected={selected}
              setSelected={setSelected}
            /> 
    </Menu>
  </AccordionDetails>
</Accordion>



<Accordion sx={{
    backgroundColor: `${colors.primary[400]} !important`,
  }}
  >
  <AccordionSummary
    expandIcon={<ExpandMoreIcon />}
    aria-controls="manage-users-submenu"
    id="manage-users-submenu"
  > 
  <Diversity3Icon style={{ marginRight: '8px' }}/>
    <Typography>Cooperatives</Typography>
  </AccordionSummary>
  <AccordionDetails>
    <Menu>
      <Item
        title="Add Cooperative"
        to="/copregistration"
        icon={<AddBoxRoundedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
<Item
              title="View cooperatives"
              to="/cooperatives"
              icon={<GridOnIcon />}
              selected={selected}
              setSelected={setSelected}
            /> 
    </Menu>
  </AccordionDetails>
</Accordion>


<Accordion sx={{
    backgroundColor: `${colors.primary[400]} !important`,
  }}
  >
  <AccordionSummary
    expandIcon={<ExpandMoreIcon />}
    aria-controls="manage-users-submenu"
    id="manage-users-submenu"
  >
    <SyncLockIcon style={{ marginRight: '8px' }}/>
    <Typography>Roles</Typography>
  </AccordionSummary>
  <AccordionDetails>
    <Menu>
      <Item
        title="Add Role"
        to="/copregistration"
        icon={<AddCircleIcon />}
        selected={selected}
        setSelected={setSelected}
      />
<Item
              title="View Roles"
              to="/cooperatives"
              icon={<GridOnIcon />}
              selected={selected}
              setSelected={setSelected}
            /> 
    </Menu>
  </AccordionDetails>
</Accordion>


<Accordion sx={{
    backgroundColor: `${colors.primary[400]} !important`,
  }}
  >
    
  <AccordionSummary
    expandIcon={<ExpandMoreIcon />}
    aria-controls="manage-users-submenu"
    id="manage-users-submenu"
  >
    <DeviceHubIcon/>
    <Typography>Devices</Typography>
  </AccordionSummary>
  <AccordionDetails>
    <Menu>
      <Item
        title="Add Device"
        to="/copregistration"
        icon={<AddIcon />}
        selected={selected}
        setSelected={setSelected}
      />
<Item
              title="View Devices"
              to="/cooperatives"
              icon={<GridOnIcon />}
              selected={selected}
              setSelected={setSelected}
            /> 
    </Menu>
  </AccordionDetails>
</Accordion>
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data Visualisation
            </Typography>
            <Item
              title="RainFall Data"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Harvest Data"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Farm metadata"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Device Tracking"
              to="/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
           
  

          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
