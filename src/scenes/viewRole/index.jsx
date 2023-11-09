import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
    useTheme,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const ROLES = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rolesData, setRolesData] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [editedRole, setEditedRole] = useState(null);
  const [newRole, setNewRole] = useState({ roleName: "", status: "" });

  const fetchRoles = () => {
    fetch("https://rwandasmartagro.rw/backend/api/roles", {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setRolesData(data);
      })
      .catch((error) => {
        console.error("Error fetching roles data:", error);
      });
  };

  const handleEditRole = (roleId) => {
    const roleToEdit = rolesData.find((role) => role.roleId === roleId);
    setEditedRole(roleToEdit);
    setOpenEditDialog(true);
  };


  const handleSaveRole = () => {
    // Construct the updated role data object with edited values
    const updatedRole = {
      roleId: editedRole.roleId, // Include the role ID
      roleName: editedRole.roleName,
      status: editedRole.status,
    };
  
    // Make a PUT request to update the role
    fetch(`https://rwandasmartagro.rw/backend/api/roles/${editedRole.roleId}`, {
      method: "PUT",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedRole), 
    })
      .then((response) => {
        if (response.status === 200) {
          // Successfully updated the role via the API
  
          // Update the rolesData state to reflect the changes in the DataGrid
          const updatedRolesData = rolesData.map((role) =>
            role.roleId === updatedRole.roleId ? updatedRole : role
          );
  
          setRolesData(updatedRolesData);
          setOpenSnackbar(true);
          // Close the edit dialog
          setOpenEditDialog(false);
        } else {
          console.error("Error updating role");
          setOpenErrorSnackbar(true);
          // Handle the error condition and show an error message if needed
        }
      })
      .catch((error) => {
        console.error("Error updating role:", error);
        // Handle the error condition and show an error message if needed
        setOpenErrorSnackbar(true);
      });
  };
  

  const handleCreateRole = () => {
    fetch("https://rwandasmartagro.rw/backend/api/roles", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRole),
    })
      .then((response) => {
        if (response.status === 201) {
          // Successfully created
          // You can fetch and update rolesData from the server again to include the new role
          // For now, we'll just show a success message and clear the new role fields
          setOpenSnackbar(true);
          setNewRole({ roleName: "", status: "" });
          setOpenCreateDialog(false);
          // Fetch roles again to include the new role
          fetchRoles();
        } else {
          console.error("Error creating role");
          setOpenErrorSnackbar(true);
        }
      })
      .catch((error) => {
        console.error("Error creating role:", error);
        setOpenErrorSnackbar(true);
      });
  };

  const handleDeleteRole = (roleId) => {
    // Make an API request to delete the role by roleId
    fetch(`https://rwandasmartagro.rw/backend/api/roles/${roleId}`, {
      method: "DELETE",
      headers: {
        accept: "*/*",
      },
    })
      .then((response) => {
        if (response.status === 204) {
          // Successfully deleted
          // Filter out the deleted role and update the rolesData state
          const updatedData = rolesData.filter((role) => role.roleId !== roleId);
          setRolesData(updatedData);
          setOpenSnackbar(true); // Show success Snackbar
        } else {
          console.error("Error deleting role");
          setOpenErrorSnackbar(true); // Show error Snackbar
        }
      })
      .catch((error) => {
        console.error("Error deleting role:", error);
        setOpenErrorSnackbar(true); // Show error Snackbar
      });
  };


  const handleSnackbarClose = (event, reason, type) => {
    if (reason === "clickaway") {
      return;
    }

    if (type === "error") {
      setOpenErrorSnackbar(false);
    } else {
      setOpenSnackbar(false);
    }
  };

  const columns = [
    { field: "roleId", headerName: "ID" },
    {
      field: "roleName",
      headerName: "Role Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: ({ row: { roleId } }) => (
        <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
          <IconButton
            color="secondary"
            aria-label="edit"
            onClick={() => handleEditRole(roleId)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            aria-label="delete"
            onClick={() => handleDeleteRole(roleId)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  useEffect(() => {
    fetchRoles();
  }, []); // Fetch roles when the component is mounted

  return (
    <Box m="20px">
      <Header title="ROLES" subtitle="Managing Roles" />
      <Box display="flex" justifyContent="flex-end">
      
  <Button
    variant="contained"
    color="secondary"
    onClick={() => setOpenCreateDialog(true)}
    style={{ color: 'Black' }}
    icon={<AddCircleIcon />}
  >
    <AddCircleIcon />
    Add New Role
  </Button>
</Box>
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
          rows={rolesData}
          columns={columns}
          getRowId={(row) => row.roleId}
        />
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={600}
        onClose={(event, reason) =>
          handleSnackbarClose(event, reason, "success")
        }
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="success"
          onClose={(event, reason) =>
            handleSnackbarClose(event, reason, "success")
          }
        >
          Role created successfully!
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={600}
        onClose={(event, reason) =>
          handleSnackbarClose(event, reason, "error")
        }
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="error"
          onClose={(event, reason) =>
            handleSnackbarClose(event, reason, "error")
          }
        >
          Error creating role!
        </MuiAlert>
      </Snackbar>
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Role</DialogTitle>
        <DialogContent>
          {editedRole && (
            <form>
              <TextField
                label="Role Name"
                fullWidth
                name="roleName"
                value={editedRole.roleName}
                onChange={(e) => setEditedRole({ ...editedRole, roleName: e.target.value })}
              />
           <TextField
                label="Status"
                fullWidth
                name="status"
                value={editedRole.status}
                onChange={(e) => setEditedRole({ ...editedRole, status: e.target.value })}
              />
            </form>
          )}
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={() => setOpenEditDialog(false)}>
            Cancel
          </Button>
          <Button color="secondary" onClick={handleSaveRole}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {/* Create Role Dialog */}
      <Dialog
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
      >
        <DialogTitle>Create New Role</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              label="Role Name"
              fullWidth
              name="roleName"
              value={newRole.roleName}
              onChange={(e) =>
                setNewRole({ ...newRole, roleName: e.target.value })
              }
              disabled={false}
            />
            <TextField
              label="Status"
              fullWidth
              name="status"
              value={newRole.status}
              onChange={(e) =>
                setNewRole({ ...newRole, status: e.target.value })
              }
              disabled={false}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={() => setOpenCreateDialog(false)}>
            Cancel
          </Button>
          <Button color="secondary" onClick={handleCreateRole}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ROLES;
