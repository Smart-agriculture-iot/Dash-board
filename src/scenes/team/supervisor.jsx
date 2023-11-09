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
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const SupervisorTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [supervisors, setSupervisors] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedSupervisor, setEditedSupervisor] = useState(null);
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");

  const handleEditSupervisor = (supervisorId) => {
    fetch(`https://rwandasmartagro.rw/backend/api/supervisors/${supervisorId}`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((supervisor) => {
        setEditedSupervisor(supervisor);
        setSelectedRole(supervisor.roleId.roleName); // Set the selectedRole based on the edited supervisor's role
        setOpenEditDialog(true);
      })
      .catch((error) => {
        console.error("Error fetching supervisor details:", error);
        setOpenErrorSnackbar(true);
      });
  };
  

  useEffect(() => {
    if (openEditDialog) {
      fetchRoles();
    }
  }, [openEditDialog]);

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

  const handleSaveSupervisor = () => {
    if (!editedSupervisor) {
      return;
    }

    const updatedSupervisor = {
      id: editedSupervisor.id,
      fullname: editedSupervisor.fullname,
      username: editedSupervisor.username,
      password: editedSupervisor.password,
      province: editedSupervisor.province,
      createdBy: editedSupervisor.createdBy,
      status: editedSupervisor.status,
      district: editedSupervisor.district,
      sector: editedSupervisor.sector,
      cell: editedSupervisor.cell,
      roleId: editedSupervisor.roleId,
    };

    fetch(`https://rwandasmartagro.rw/backend/api/supervisors/${editedSupervisor.id}`, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedSupervisor),
    })
      .then((response) => {
        if (response.status === 200) {
          const updatedData = supervisors.map((supervisor) =>
            supervisor.id === editedSupervisor.id ? updatedSupervisor : supervisor
            
          );
          setSupervisors(updatedData);
          setOpenSnackbar(true);
        } else {
          console.error("Error updating supervisor");
          setOpenErrorSnackbar(true);
        }
      })
      .catch((error) => {
        console.error("Error updating supervisor:", error);
        setOpenErrorSnackbar(true);
      });

    setOpenEditDialog(false);
  };

  const handleDeleteSupervisor = (supervisorId) => {
    fetch(`https://rwandasmartagro.rw/backend/api/supervisors/${supervisorId}`, {
      method: "DELETE",
      headers: {
        accept: "*/*",
      },
    })
      .then((response) => {
        if (response.status === 204) {
          const updatedData = supervisors.filter((supervisor) => supervisor.id !== supervisorId);
          setSupervisors(updatedData);
        } else {
          console.error("Error deleting supervisor");
          setOpenErrorSnackbar(true);
        }
        setOpenSnackbar(true);
      })
      .catch((error) => {
        console.error("Error deleting supervisor:", error);
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
    { field: "id", headerName: "ID" },
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
        field: "district",
        headerName: "District",
        flex: 1,
      },
      {
        field: "sector",
        headerName: "Sector",
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
      renderCell: ({ row: { id } }) => (
        <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
          <IconButton
            color="secondary"
            aria-label="edit"
            onClick={() => handleEditSupervisor(id)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            aria-label="delete"
            onClick={() => handleDeleteSupervisor(id)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
         ),
    },
  ];

  useEffect(() => {
    fetch("https://rwandasmartagro.rw/backend/api/supervisors", {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSupervisors(data);
      })
      .catch((error) => {
        console.error("Error fetching supervisor data:", error);
      });
  }, []);

  return (
    <Box m="20px">
      <Header title="Local Government Officers" subtitle="Managing the Local Government Officers" />
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
          rows={supervisors}
          columns={columns}
          getRowId={(row) => row.id}
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
          Supervisor deleted was successful!
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
          Error deleting supervisor!
        </MuiAlert>
      </Snackbar>
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        PaperProps={{
          sx: {
            backgroundColor: colors.primary[500],
          },
        }}
      >
        <DialogTitle>Edit Supervisor</DialogTitle>
        <DialogContent>
          {editedSupervisor && (
            <form>
              <TextField
                label="Fullname"
                fullWidth
                defaultValue={editedSupervisor.fullname}
                onChange={(e) => setEditedSupervisor({ ...editedSupervisor, fullname: e.target.value })}
              />
              <TextField
                label="Username"
                fullWidth
                defaultValue={editedSupervisor.username}
                onChange={(e) => setEditedSupervisor({ ...editedSupervisor, username: e.target.value })}
              />
                          <FormControl fullWidth>
                              <InputLabel htmlFor="role">Role</InputLabel>
                              <Select
                                  value={selectedRole}
                                  onChange={(event) => setSelectedRole(event.target.value)} // Update the selectedRole state
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
          <Button color="secondary" onClick={handleSaveSupervisor}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SupervisorTable;
