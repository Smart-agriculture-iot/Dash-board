import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LanguageIcon from "@mui/icons-material/Language";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  useTheme,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, { useContext } from 'react';
import { useTranslation } from "react-i18next"; // Import the translation hook
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
        <IconButton onClick={handleLogout}>
          <LogoutOutlinedIcon />
          <Typography color="red" fontWeight="bold">
            {t("logout")}
          </Typography>
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
