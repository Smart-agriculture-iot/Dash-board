import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Select,
    TextField,
    useTheme,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { default as AddCircleIcon, default as IconButton } from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const DEVICES = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [devicesData, setDevicesData] = useState([]);
  const [cooperatives, setCooperatives] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openAssignDialog, setOpenAssignDialog] = useState(false);
  const [editedDevice, setEditedDevice] = useState(null);
  const [newDevice, setNewDevice] = useState({
    battery: "",
    longtitude: "",
    latitude: "",
    status: "active",
  });
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const [selectedCooperative, setSelectedCooperative] = useState(null);

  const fetchDevices = () => {
    // Fetch all devices
    fetch("https://rwandasmartagro.rw/backend/api/devices", {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setDevicesData(data);
      })
      .catch((error) => {
        console.error("Error fetching devices data:", error);
      });
  };

  const handleEditDevice = (deviceId) => {
    // Fetch the device details for editing
    fetch(`https://rwandasmartagro.rw/backend/api/devices/${deviceId}`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((deviceData) => {
        // Open the edit dialog and populate it with the device details
        setEditedDevice(deviceData);
        setOpenEditDialog(true);
      })
      .catch((error) => {
        console.error("Error fetching device details for editing:", error);
      });
  };

  const fetchCooperatives = () => {
    // Fetch all cooperatives
    fetch("https://rwandasmartagro.rw/backend/api/cooperatives", {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCooperatives(data);
      })
      .catch((error) => {
        console.error("Error fetching cooperatives:", error);
      });
  };

  const handleCreateDevice = () => {
    // Create a new device
    const newDeviceData = {
      battery: newDevice.battery,
      longtitude: newDevice.longitude,
      latitude: newDevice.latitude,
      status: newDevice.status,
    };

    fetch("https://rwandasmartagro.rw/backend/api/devices", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDeviceData),
    })
      .then((response) => {
        if (response.status === 201) {
          fetchDevices();
          setOpenSnackbar(true);
          setOpenCreateDialog(false);
        } else {
          console.error("Error creating device");
          setOpenErrorSnackbar(true);
        }
      })
      .catch((error) => {
        console.error("Error creating device:", error);
        setOpenErrorSnackbar(true);
      });
  };

  const handleSaveDevice = () => {
    // Save an edited device
    const updatedDeviceData = {
      deviceId: editedDevice.deviceId,
      battery: editedDevice.battery,
      longtitude: editedDevice.longtitude,
      latitude: editedDevice.latitude,
      status: editedDevice.status,
    };

    fetch(`https://rwandasmartagro.rw/backend/api/devices/${editedDevice.deviceId}`, {
      method: "PUT",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedDeviceData),
    })
      .then((response) => {
        if (response.status === 200) {
          fetchDevices();
          setOpenSnackbar(true);
          setOpenEditDialog(false);
        } else {
          console.error("Error updating device");
          setOpenErrorSnackbar(true);
        }
      })
      .catch((error) => {
        console.error("Error updating device:", error);
        setOpenErrorSnackbar(true);
      });
  };

  const handleDeleteDevice = (deviceId) => {
    // Delete a device
    fetch(`https://rwandasmartagro.rw/backend/api/devices/${deviceId}`, {
      method: "DELETE",
      headers: {
        accept: "*/*",
      },
    })
      .then((response) => {
        if (response.status === 204) {
          fetchDevices();
          setOpenSnackbar(true);
        } else {
          console.error("Error deleting device");
          setOpenErrorSnackbar(true);
        }
      })
      .catch((error) => {
        console.error("Error deleting device:", error);
        setOpenErrorSnackbar(true);
      });
  };

  const handleAssignDevice = (deviceId) => {
    const deviceToAssign = devicesData.find(
      (device) => device.deviceId === deviceId
    );
    setEditedDevice(deviceToAssign);
    setOpenAssignDialog(true);
  };

  const columns = [
    { field: "deviceId", headerName: "ID" },
    {
      field: "battery",
      headerName: "Battery",
      flex: 1,
    },
    {
      field: "longtitude",
      headerName: "Longitude",
      flex: 1,
    },
    {
      field: "latitude",
      headerName: "Latitude",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "coId",
      headerName: "Cooperative",
      flex: 1,
      valueGetter: (params) => {
        if (params.row.coId) {
          return params.row.coId.coName;
        } else {
          return "Unassigned";
        }
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: ({ row }) => (
        <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
          <IconButton
            color="secondary"
            aria-label="edit"
            onClick={() => handleEditDevice(row.deviceId)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            aria-label="delete"
            onClick={() => handleDeleteDevice(row.deviceId)}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            color="secondary"
            aria-label="assign"
            onClick={() => handleAssignDevice(row.deviceId)}
          >
            <AddIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

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

  const handleSaveAssignedDevice = () => {
    if (!editedDevice) {
      console.error("Edited device is missing.");
      return;
    }
  
    if (!selectedCooperative || selectedCooperative === "unassign") {
      // If "unassign" is selected or no cooperative is selected, unassign the device
      const updatedDeviceData = {
        deviceId: editedDevice.deviceId,
        battery: editedDevice.battery,
        longtitude: editedDevice.longtitude,
        latitude: editedDevice.latitude,
        status: editedDevice.status,
        coId: null, // Unassign by setting it to null
      };
  
      // Send the PUT request with the updated device data
      fetch(`https://rwandasmartagro.rw/backend/api/devices/${editedDevice.deviceId}`, {
        method: "PUT",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDeviceData),
      })
        .then((response) => {
          if (response.status === 200) {
            fetchDevices();
            setOpenSnackbar(true);
            setOpenAssignDialog(false);
          } else {
            console.error("Error updating device");
            setOpenErrorSnackbar(true);
          }
        })
        .catch((error) => {
          console.error("Error updating device:", error);
          setOpenErrorSnackbar(true);
        });
    } else {
      // A cooperative is selected
      // Use the selected cooperative's ID to fetch the cooperative details
      fetch(`https://rwandasmartagro.rw/backend/api/cooperatives/${selectedCooperative.cooperativeId}`, {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((cooperativeData) => {
          // Create an updated device object with the entire cooperative object
          const updatedDeviceData = {
            deviceId: editedDevice.deviceId,
            battery: editedDevice.battery,
            longtitude: editedDevice.longtitude,
            latitude: editedDevice.latitude,
            status: editedDevice.status,
            coId: cooperativeData, // Include the entire cooperative object
          };
  
          // Send the PUT request with the updated device data
          fetch(`https://rwandasmartagro.rw/backend/api/devices/${editedDevice.deviceId}`, {
            method: "PUT",
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedDeviceData),
          })
            .then((response) => {
              if (response.status === 200) {
                fetchDevices();
                setOpenSnackbar(true);
                setOpenAssignDialog(false);
              } else {
                console.error("Error updating device");
                setOpenErrorSnackbar(true);
              }
            })
            .catch((error) => {
              console.error("Error updating device:", error);
              setOpenErrorSnackbar(true);
            });
        })
        .catch((error) => {
          console.error("Error fetching cooperative details:", error);
        });
    }
  };
  

  useEffect(() => {
    fetchDevices();
    fetchCooperatives();
  }, []);

  return (
    <Box m="20px">
      <Header title="DEVICES" subtitle="Managing Devices" />
      <Box display="flex" justifyContent="flex-end">
      <Button
          variant="contained"
          color="secondary"
          onClick={() => setOpenCreateDialog(true)}
          style={{ color: 'Black' }}
        >
          <AddCircleIcon />
          Add New Device
        </Button>
      </Box>
      <Box m="40px 0 0 0" height="75vh">
        <DataGrid
          rows={devicesData}
          columns={columns}
          getRowId={(row) => row.deviceId}
        />
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={600}
        onClose={(event, reason) => handleSnackbarClose(event, reason, "success")}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="success"
          onClose={(event, reason) => handleSnackbarClose(event, reason, "success")}
        >
          Device created/updated/deleted successfully!
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={600}
        onClose={(event, reason) => handleSnackbarClose(event, reason, "error")}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="error"
          onClose={(event, reason) => handleSnackbarClose(event, reason, "error")}
        >
          Error creating/updating/deleting device!
        </MuiAlert>
      </Snackbar>
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Device</DialogTitle>
        <DialogContent>
          {editedDevice && (
            <form>
              <TextField
                label="Battery"
                fullWidth
                name="battery"
                value={editedDevice.battery}
                onChange={(e) =>
                  setEditedDevice({ ...editedDevice, battery: e.target.value })
                }
              />
              <TextField
                label="Longitude"
                fullWidth
                name="longtitude"
                value={editedDevice.longtitude}
                onChange={(e) =>
                  setEditedDevice({ ...editedDevice, longtitude: e.target.value })
                }
              />
              <TextField
                label="Latitude"
                fullWidth
                name="latitude"
                value={editedDevice.latitude}
                onChange={(e) =>
                  setEditedDevice({ ...editedDevice, latitude: e.target.value })
                }
              />
              <TextField
                label="Status"
                fullWidth
                name="status"
                value={editedDevice.status}
                onChange={(e) =>
                  setEditedDevice({ ...editedDevice, status: e.target.value })
                }
              />
            </form>
          )}
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={() => setOpenEditDialog(false)}>
            Cancel
          </Button>
          <Button color="secondary" onClick={handleSaveDevice}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openAssignDialog} onClose={() => setOpenAssignDialog(false)}>
        <DialogTitle>Assign Device</DialogTitle>
        <DialogContent>
          {editedDevice && (
            <form>
              <Select
                label="Cooperative"
                fullWidth
                value={selectedCooperative ? selectedCooperative.cooperativeId : "unassign"}
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  if (selectedValue === "unassign") {
                    setSelectedCooperative(null); // Clear the selected cooperative
                  } else {
                    const selectedCooperativeObject = cooperatives.find(
                      (cooperative) => cooperative.cooperativeId === selectedValue
                    );
                    setSelectedCooperative(selectedCooperativeObject);
                  }
                }}
              >
                <MenuItem value="unassign">Unassign</MenuItem> {/* Add the "Unassign" option */}
                {cooperatives.map((cooperative) => (
                  <MenuItem key={cooperative.cooperativeId} value={cooperative.cooperativeId}>
                    {cooperative.coName}
                  </MenuItem>
                ))}
              </Select>

            </form>
          )}
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={() => setOpenAssignDialog(false)}>
            Cancel
          </Button>
          <Button color="secondary" onClick={handleSaveAssignedDevice}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)}>
        <DialogTitle>Create New Device</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              label="Battery"
              fullWidth
              name="battery"
              value={newDevice.battery}
              onChange={(e) =>
                setNewDevice({ ...newDevice, battery: e.target.value })
              }
            />
            <TextField
              label="Longitude"
              fullWidth
              name="longitude"
              value={newDevice.longitude}
              onChange={(e) =>
                setNewDevice({ ...newDevice, longitude: e.target.value })
              }
            />
            <TextField
              label="Latitude"
              fullWidth
              name="latitude"
              value={newDevice.latitude}
              onChange={(e) =>
                setNewDevice({ ...newDevice, latitude: e.target.value })
              }
            />
            <TextField
              label="Status"
              fullWidth
              name="status"
              value={newDevice.status}
              onChange={(e) =>
                setNewDevice({ ...newDevice, status: e.target.value })
              }
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={() => setOpenCreateDialog(false)}>
            Cancel
          </Button>
          <Button color="secondary" onClick={handleCreateDevice}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DEVICES;
