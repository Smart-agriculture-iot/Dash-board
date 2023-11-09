
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LanguageIcon from "@mui/icons-material/Language";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SearchIcon from '@mui/icons-material/Search';
import ThreePRoundedIcon from '@mui/icons-material/ThreePRounded';
import { Box, IconButton, InputBase, Menu, MenuItem, Typography, useTheme } from "@mui/material";
import React, { useContext, useState } from 'react';
import { useTranslation } from "react-i18next"; // Import the translation hook
import { Link } from "react-router-dom";
import { ColorModeContext, tokens } from "../../theme";
const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { t, i18n } = useTranslation(); // Use the translation hook

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/";
  };
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleLanguageMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    handleLanguageMenuClose();
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px">
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder={t("search")} />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton onClick={handleLanguageMenuClick}>
          <LanguageIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleLanguageMenuClose}
        >
          <MenuItem onClick={() => changeLanguage("en")}>English</MenuItem>
          <MenuItem onClick={() => changeLanguage("rw")}>Ikinyarwanda</MenuItem>
        </Menu>
        <IconButton onClick={handleMenuOpen}>
        <AccountCircleIcon />
</IconButton>
<Menu
  anchorEl={menuAnchorEl}
  open={Boolean(menuAnchorEl)}
  onClose={handleMenuClose}
>
  <MenuItem onClick={handleLogout}>
    <LogoutOutlinedIcon style={{ marginRight: '8px' }} />
    <Typography color="red" fontWeight="bold">
            {t("logout")}
          </Typography>
  </MenuItem>
  <MenuItem component={Link} to="/UserProfile" onClick={handleMenuClose}>
    <ThreePRoundedIcon style={{ marginRight: '8px' }}/>
    Profile
  </MenuItem>
</Menu>

      </Box>
    </Box>
  );
};

export default Topbar;
