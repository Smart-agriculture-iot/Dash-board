import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const USER = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [userData, setUserData] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  // const handleEditUser = (userId) => {
  //   const userToEdit = userData.find((user) => user.userId === userId);
  //   setEditedUser(userToEdit);
  //   setOpenEditDialog(true);
  // };

  const handleEditUser = (userId) => {
    // Fetch the user's details by userId
    fetch(`https://rwandasmartagro.rw/backend/api/userss/${userId}`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((user) => {
        setEditedUser(user);
        setOpenEditDialog(true);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        setOpenErrorSnackbar(true);
      });
  };
  // Fetch roles when the dialog is opened
  useEffect(() => {
    if (openEditDialog) {
      fetchRoles(); // Create a function to fetch roles
    }
  }, [openEditDialog]);

  // Function to fetch roles
  const fetchRoles = () => {
    fetch("https://rwandasmartagro.rw/backend/api/roles", {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setRoles(data);
      })
      .catch((error) => {
        console.error("Error fetching roles:", error);
      });
  };

  const handleSaveUser = () => {
    if (!editedUser) {
      return;
    }

    // Create a new user object with the updated data
    const updatedUser = {
      userId: editedUser.userId,
      fullname: editedUser.fullname, // Updated fullname
      username: editedUser.username, // Updated username
      roleName: selectedRole, // Updated role based on the selected role
      // Include other properties like password, cooperativeId, createdBy, and status
      password: editedUser.password,
      cooperativeId: editedUser.cooperativeId,
      createdBy: editedUser.createdBy,
      status: editedUser.status,
      roleId: editedUser.roleId,
    };

    // Send a PUT request to update the user's information
    fetch(`https://rwandasmartagro.rw/backend/api/userss/${editedUser.userId}`, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => {
        if (response.status === 200) {
          // Update the user data in the state with the updated information
          const updatedData = userData.map((user) =>
            user.userId === editedUser.userId ? updatedUser : user
          );
          setUserData(updatedData);
          setOpenSnackbar(true);
        } else {
          console.error("Error updating user");
          setOpenErrorSnackbar(true);
        }
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        setOpenErrorSnackbar(true);
      });

    // Close the edit dialog
    setOpenEditDialog(false);
  };






  const handleDeleteUser = (userId) => {
    fetch(`https://rwandasmartagro.rw/backend/api/userss/${userId}`, {
      method: "DELETE",
      headers: {
        accept: "*/*",
      },
    })
      .then((response) => {
        if (response.status === 204) {
          const updatedData = userData.filter((user) => user.userId !== userId);
          setUserData(updatedData);
        } else {
          console.error("Error deleting user");
          setOpenErrorSnackbar(true);
        }
        setOpenSnackbar(true);
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        setOpenErrorSnackbar(true);
      });
  };

  const handleSnackbarClose = (event, reason, type) => {
    if (reason === 'clickaway') {
      return;
    }

    if (type === 'error') {
      setOpenErrorSnackbar(false);
    } else {
      setOpenSnackbar(false);
    }
  };

  const columns = [
    { field: "userId", headerName: "ID" },
    {
      field: "fullname",
      headerName: "Fullname",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "username",
      headerName: "Username",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "roleName",
      headerName: "Role",
      flex: 1,
      renderCell: ({ row }) => {
        const roleName = row.roleId ? row.roleId.roleName : '';
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              roleName === "admin"
                ? colors.greenAccent[600]
                : roleName === "manager"
                  ? colors.greenAccent[700]
                  : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {roleName === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {roleName === "manager" && <SecurityOutlinedIcon />}
            {roleName === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {roleName}
            </Typography>
          </Box>
        );
      },
    },
    
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: ({ row: { userId } }) => (
        <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
          <IconButton
            color="secondary"
            aria-label="edit"
            onClick={() => handleEditUser(userId)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            aria-label="delete"
            onClick={() => handleDeleteUser(userId)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  useEffect(() => {
    fetch("https://rwandasmartagro.rw/backend/api/userss", {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedData = data.map((user) => ({
          ...user,
          roleName: user.roleId.roleName,
        }));
        setUserData(updatedData);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <Box m="20px">
      <Header title="USER" subtitle="Managing the USER Members" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={userData}
          columns={columns}
          getRowId={(row) => row.userId}
        />
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={600}
        onClose={(event, reason) => handleSnackbarClose(event, reason, 'success')}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="success"
          onClose={(event, reason) => handleSnackbarClose(event, reason, 'success')}
        >
          User deleted was successful!
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={600}
        onClose={(event, reason) => handleSnackbarClose(event, reason, 'error')}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="error"
          onClose={(event, reason) => handleSnackbarClose(event, reason, 'error')}
        >
          Error deleting user!
        </MuiAlert>
      </Snackbar>
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        PaperProps={{
          sx: {
            backgroundColor: colors.primary[500], // Use your primary color
          },
        }}
      >
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          {editedUser && (
            <form>
              <TextField
                label="Fullname"
                fullWidth
                defaultValue={editedUser.fullname}
                onChange={(e) => setEditedUser({ ...editedUser, fullname: e.target.value })} // Update the fullname
              />
              <TextField
                label="Username"
                fullWidth
                defaultValue={editedUser.username}
                onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })} // Update the username
              />
              <FormControl fullWidth>
                <InputLabel htmlFor="role">Role</InputLabel>
                <Select
                  value={selectedRole}
                  onChange={(event) => setSelectedRole(event.target.value)}
                >
                  {roles.map((role) => (
                    <MenuItem key={role.roleId} value={role.roleName}>
                      {role.roleName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </form>
          )}
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={() => setOpenEditDialog(false)}>
            Cancel
          </Button>
          <Button color="secondary" onClick={handleSaveUser}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default USER;
