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
    MenuItem,
    Select,
    TextField,
    useTheme,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const COOPERATIVES = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [cooperativeData, setCooperativeData] = useState([]);
  const [cropCategories, setCropCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedCooperative, setEditedCooperative] = useState(null);

  const handleEditCooperative = (cooperativeId) => {
    fetch(`https://rwandasmartagro.rw/backend/api/cooperatives/${cooperativeId}`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setEditedCooperative(data);
        setSelectedCategory(data.cropCategoryName);
        setOpenEditDialog(true);
      })
      .catch((error) => {
        console.error("Error fetching cooperative details:", error);
        setOpenErrorSnackbar(true);
      });
  };

  const handleSaveCooperative = () => {
    if (!editedCooperative || !selectedCategory) {
      return;
    }

    const updatedCooperative = {
      ...editedCooperative,
      cropCategoryName: selectedCategory,
    };

    fetch(`https://rwandasmartagro.rw/backend/api/cooperatives/${updatedCooperative.cooperativeId}`, {
      method: "PUT",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCooperative),
    })
      .then((response) => {
        if (response.status === 200) {
          const updatedData = cooperativeData.map((coop) =>
            coop.cooperativeId === updatedCooperative.cooperativeId ? updatedCooperative : coop
          );
          setCooperativeData(updatedData);
          setOpenSnackbar(true);
          setOpenEditDialog(false);
        } else {
          console.error("Error saving cooperative");
          setOpenErrorSnackbar(true);
        }
      })
      .catch((error) => {
        console.error("Error saving cooperative:", error);
        setOpenErrorSnackbar(true);
      });
  };

  useEffect(() => {
    fetch("https://rwandasmartagro.rw/backend/api/cropCatgories", {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCropCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching crop categories:", error);
      });

    fetch("https://rwandasmartagro.rw/backend/api/cooperatives", {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedData = data.map((coop) => ({
          ...coop,
          cropCategoryName: coop.cropCategory.cropNames,
        }));
        setCooperativeData(updatedData);
      })
      .catch((error) => {
        console.error("Error fetching cooperative data:", error);
      });
  }, []);

  const columns = [
    { field: "cooperativeId", headerName: "ID" },
    { field: "coName", headerName: "Cooperative Name", flex: 1 },
    { field: "district", headerName: "District", flex: 1 },
    { field: "sector", headerName: "Sector", flex: 1 },
    { field: "cell", headerName: "Cell", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "cropCategoryName", headerName: "Crop Category", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: ({ row: { cooperativeId } }) => (
        <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
          <IconButton
            color="secondary"
            aria-label="edit"
            onClick={() => handleEditCooperative(cooperativeId)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            aria-label="delete"
            onClick={() => handleDeleteCooperative(cooperativeId)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];
  const handleDeleteCooperative = (cooperativeId) => {
    fetch(`https://rwandasmartagro.rw/backend/api/cooperatives/${cooperativeId}`, {
      method: "DELETE",
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => {
        if (response.status === 204) {
          const updatedData = cooperativeData.filter((coop) => coop.cooperativeId !== cooperativeId);
          setCooperativeData(updatedData);
          setOpenSnackbar(true);
        } else {
          console.error("Error deleting cooperative");
          setOpenErrorSnackbar(true);
        }
      })
      .catch((error) => {
        console.error("Error deleting cooperative:", error);
        setOpenErrorSnackbar(true);
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

  return (
    <Box m="20px">
      <Header title="COOPERATIVES" subtitle="Managing Cooperative Members" />
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={cooperativeData}
          columns={columns}
          getRowId={(row) => row.cooperativeId}
          onRowClick={(params) => handleEditCooperative(params.id)}
        />
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={600}
        onClose={() => setOpenSnackbar(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="success"
          onClose={() => setOpenSnackbar(false)}
        >
          Cooperative updated successfully!
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={600}
        onClose={() => setOpenErrorSnackbar(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="error"
          onClose={() => setOpenErrorSnackbar(false)}
        >
          Error updating cooperative!
        </MuiAlert>
      </Snackbar>
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Cooperative</DialogTitle>
        <DialogContent>
          {editedCooperative && (
            <form>
              <TextField label="Cooperative Name" fullWidth defaultValue={editedCooperative.coName} />
              <TextField label="District" fullWidth defaultValue={editedCooperative.district} />
              <TextField label="Sector" fullWidth defaultValue={editedCooperative.sector} />
              <TextField label="Cell" fullWidth defaultValue={editedCooperative.cell} />
              <TextField label="Status" fullWidth defaultValue={editedCooperative.status} />
              <Select
                label="Crop Category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                fullWidth
              >
                {cropCategories.map((category) => (
                  <MenuItem key={category.categoryId} value={category.cropNames}>
                    {category.cropNames}
                  </MenuItem>
                ))}
              </Select>
            </form>
          )}
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={() => setOpenEditDialog(false)}>
            Cancel
          </Button>
          <Button color="secondary" onClick={handleSaveCooperative}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default COOPERATIVES;
