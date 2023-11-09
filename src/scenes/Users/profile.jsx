import { Edit, Lock, Phone, Security } from "@mui/icons-material";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";

const UserProfile = () => {
  const userId = localStorage.getItem("userId");

  const [userProfile, setUserProfile] = useState(null);
  const [cooperativeDetails, setCooperativeDetails] = useState(null);

  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [verificationError, setVerificationError] = useState("");

  useEffect(() => {
    fetch(`https://rwandasmartagro.rw/backend/api/userss/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUserProfile(data);
        fetch(`https://rwandasmartagro.rw/backend/api/cooperatives/${data.cooperative}`)
          .then((response) => response.json())
          .then((cooperativeData) =>
            setCooperativeDetails(cooperativeData)
          )
          .catch((error) =>
            console.error("Error fetching cooperative details: ", error)
          );
      })
      .catch((error) => console.error("Error fetching user details: ", error));
  }, [userId]);

  const handleOpenPasswordDialog = () => {
    setOpenPasswordDialog(true);
  };

  const handleClosePasswordDialog = () => {
    setOpenPasswordDialog(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setVerificationError("");
  };

  const handleChangePassword = async () => {
    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (newPassword !== confirmPassword) {
      setVerificationError("New passwords do not match.");
    } else {
      // Verify old password before changing
      try {
        const response = await fetch(
          `https://rwandasmartagro.rw/backend/api/userss/password/${userId}/${currentPassword}/verify`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (response.status === 200) {
          // Password verification succeeded, proceed to change password
          const changeResponse = await fetch(
            `https://rwandasmartagro.rw/backend/api/userss/password/${userId}/${newPassword}/change`,
            {
              method: "POST",
              headers: {
                Accept: "application/json",
              },
            }
          );

          if (changeResponse.status === 200) {
            setOpenSnackbar(true);
            setOpenPasswordDialog(false);
            setPasswordData({
              currentPassword: "",
              newPassword: "",
              confirmPassword: "",
            });
    setVerificationError("");
            // Password changed successfully
          } else {
            console.log("Failed to change password");
          }
        } else {
          setVerificationError("Old password verification failed.");
        }
      } catch (error) {
        console.error("Error changing or verifying password: ", error);
      }
    }
  };

  const handleUpdateProfile = () => {
    setIsEditMode(!isEditMode);
  };

  const theme = useTheme();

  const cardStyle = {
    mt: 2,
    bgcolor: theme.palette.mode === "dark" ? "primary.main" : "background.paper",
    p: 2,
    m: 1,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: 12,
  };

  const textFieldStyle = {
    backgroundColor: theme.palette.mode === "dark" ? "primary.dark" : "common.white",
    borderColor: theme.palette.mode === "dark" ? "primary.dark" : "common.white",
    borderRadius: 8,
  };

  return (
    <Container>
      <Header title="My Profile" subtitle="Profile settings" />
      <Box mt={4}>
        {userProfile && (
          <Box display="flex" alignItems="center">
            <Box>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  fontSize: "3rem",
                  bgcolor: "secondary",
                }}
              >
                {userProfile.username[0].toUpperCase()}
              </Avatar>
            </Box>
            <Box sx={{ ml: 2 }}>
              <Typography variant="h4" color="secondary">
                {userProfile.fullname}
              </Typography>
              <Typography variant="h6" color="textSecondary">
                {userProfile.roleId.roleName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {userProfile.status}
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleOpenPasswordDialog}
              startIcon={<Security />}
              sx={{ ml: "auto", borderRadius: 8 }}
            >
              Change Password
            </Button>
          </Box>
        )}
      </Box>
      {userProfile && cooperativeDetails && (
        <Card elevation={5} sx={cardStyle}>
          <CardContent>
            <Typography variant="h5" color="secondary">
              User Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Fullname"
                  fullWidth
                  variant="outlined"
                  value={userProfile.fullname}
                  disabled={!isEditMode}
                  InputProps={{ style: textFieldStyle }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Username"
                  fullWidth
                  variant="outlined"
                  value={userProfile.username}
                  disabled={!isEditMode}
                  InputProps={{
                    style: textFieldStyle,
                    startAdornment: <PersonIcon />,
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Province"
                  fullWidth
                  variant="outlined"
                  value={cooperativeDetails.province}
                  disabled={!isEditMode}
                  InputProps={{
                    style: textFieldStyle,
                    startAdornment: <LocationOnIcon />,
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="District"
                  fullWidth
                  variant="outlined"
                  value={cooperativeDetails.district}
                  disabled={!isEditMode}
                  InputProps={{
                    style: textFieldStyle,
                    startAdornment: <LocationOnIcon />,
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Sector"
                  fullWidth
                  variant="outlined"
                  value={cooperativeDetails.sector}
                  disabled={!isEditMode}
                  InputProps={{
                    style: textFieldStyle,
                    startAdornment: <LocationOnIcon />,
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Cell"
                  fullWidth
                  variant="outlined"
                  value={cooperativeDetails.cell}
                  disabled={!isEditMode}
                  InputProps={{
                    style: textFieldStyle,
                    startAdornment: <LocationOnIcon />,
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone Number"
                  fullWidth
                  variant="outlined"
                  value="0788445849"
                  disabled={!isEditMode}
                  InputProps={{ style: textFieldStyle, startAdornment: <Phone /> }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Cooperative"
                  fullWidth
                  variant="outlined"
                  value={cooperativeDetails.coName}
                  disabled={!isEditMode}
                  InputProps={{
                    style: textFieldStyle,
                    startAdornment: <Diversity3Icon />,
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
      <Box mt={2} display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="secondary"
          onClick={handleUpdateProfile}
          startIcon={isEditMode ? <Lock /> : <Edit />}
          sx={{ borderRadius: 8 }}
        >
          {isEditMode ? "Save Profile" : "Update Profile"}
        </Button>
      </Box>
      <Dialog open={openPasswordDialog} onClose={handleClosePasswordDialog}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Current Password"
            type="password"
            value={passwordData.currentPassword}
            onChange={(e) =>
              setPasswordData({
                ...passwordData,
                currentPassword: e.target.value,
              })
            }
            InputProps={{ style: textFieldStyle }}
          />
          {verificationError && (
            <Typography variant="body2" color="error">
              {verificationError}
            </Typography>
          )}
          <TextField
            fullWidth
            label="New Password"
            type="password"
            value={passwordData.newPassword}
            onChange={(e) =>
              setPasswordData({
                ...passwordData,
                newPassword: e.target.value,
              })
            }
            InputProps={{ style: textFieldStyle }}
          />
          <TextField
            fullWidth
            label="Confirm New Password"
            type="password"
            value={passwordData.confirmPassword}
            onChange={(e) =>
              setPasswordData({
                ...passwordData,
                confirmPassword: e.target.value,
              })
            }
            InputProps={{ style: textFieldStyle }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            onClick={handleClosePasswordDialog}
            sx={{ borderRadius: 8 }}
          >
            Cancel
          </Button>
          <Button
            color="secondary"
            onClick={handleChangePassword}
            sx={{ borderRadius: 8 }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        sx={{
          backgroundColor: theme.palette.success.main,
          color: theme.palette.success.contrastText,
        }}
      >
        <MuiAlert elevation={6} variant="filled" severity="success">
          Account updated successfully!
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default UserProfile;
