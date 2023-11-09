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

const CATEGORIES = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [cropCategoriesData, setCropCategoriesData] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [editedCategory, setEditedCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({ cropNames: "", status: "active" });

  const fetchCropCategories = () => {
    fetch("https://rwandasmartagro.rw/backend/api/cropCatgories", {
        
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCropCategoriesData(data);
      })
      .catch((error) => {
        console.error("Error fetching crop categories data:", error);
      });
    };
 

  const handleEditCategory = (categoryId) => {
    const categoryToEdit = cropCategoriesData.find((category) => category.categoryId === categoryId);
    setEditedCategory(categoryToEdit);
    setOpenEditDialog(true);
  };

  const handleSaveCategory = () => {
    editedCategory.createdBy = 0;
    // Construct the updated category data object with edited values
    const updatedCategory = {
      categoryId: editedCategory.categoryId, // Include the category ID
      cropNames: editedCategory.cropNames,
      status: editedCategory.status,
      createdBy: editedCategory.createdBy || 0,
    };
  
    // Make a PUT request to update the category
    fetch(`https://rwandasmartagro.rw/backend/api/cropCatgories/${editedCategory.categoryId}`, {
      method: "PUT",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCategory), 
    })
      .then((response) => {
        if (response.status === 200) {
          // Successfully updated the category via the API
  
          // Update the cropCategoriesData state to reflect the changes in the DataGrid
          const updatedCropCategoriesData = cropCategoriesData.map((category) =>
            category.categoryId === updatedCategory.categoryId ? updatedCategory : category
          );
  
          setCropCategoriesData(updatedCropCategoriesData);
          setOpenSnackbar(true);
          // Close the edit dialog
          setOpenEditDialog(false);
        } else {
          console.error("Error updating category");
          setOpenErrorSnackbar(true);
          // Handle the error condition and show an error message if needed
        }
      })
      .catch((error) => {
        console.error("Error updating category:", error);
        // Handle the error condition and show an error message if needed
        setOpenErrorSnackbar(true);
      });
  };

  const handleCreateCategory = () => {
    newCategory.createdBy = 0;
    fetch("https://rwandasmartagro.rw/backend/api/cropCatgories", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCategory),
    })
      .then((response) => {
        if (response.status === 201) {
          // Successfully created
          // You can fetch and update cropCategoriesData from the server again to include the new category
          // For now, we'll just show a success message and clear the new category fields
          setOpenSnackbar(true);
          setNewCategory({ cropNames: "", status: "active" });
          setOpenCreateDialog(false);
          // Fetch crop categories again to include the new category
          fetchCropCategories();
        } else {
          console.error("Error creating category");
          setOpenErrorSnackbar(true);
        }
      })
      .catch((error) => {
        console.error("Error creating category:", error);
        setOpenErrorSnackbar(true);
      });
  };

  const handleDeleteCategory = (categoryId) => {
    // Make an API request to delete the category by categoryId
    fetch(`https://rwandasmartagro.rw/backend/api/cropCatgories/${categoryId}`, {
      method: "DELETE",
      headers: {
        accept: "*/*",
      },
    })
      .then((response) => {
        if (response.status === 204) {
          // Successfully deleted
          // Filter out the deleted category and update the cropCategoriesData state
          const updatedData = cropCategoriesData.filter((category) => category.categoryId !== categoryId);
          setCropCategoriesData(updatedData);
          setOpenSnackbar(true); // Show success Snackbar
        } else {
          console.error("Error deleting category");
          setOpenErrorSnackbar(true); // Show error Snackbar
        }
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
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
    { field: "categoryId", headerName: "ID" },
    {
      field: "cropNames",
      headerName: "Crop Names",
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
      renderCell: ({ row: { categoryId } }) => (
        <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
          <IconButton
            color="secondary"
            aria-label="edit"
            onClick={() => handleEditCategory(categoryId)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            aria-label="delete"
            onClick={() => handleDeleteCategory(categoryId)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];
  useEffect(() => {
    fetchCropCategories();
  }, []); // Fetch crop categories when the component is mounted

  return (
    <Box m="20px">
      <Header title="CROP CATEGORIES" subtitle="Managing Crop Categories" />
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setOpenCreateDialog(true)}
          style={{ color: 'Black' }}
        >
          <AddCircleIcon />
          Add New Crop Category
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
          rows={cropCategoriesData}
          columns={columns}
          getRowId={(row) => row.categoryId}
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
          Crop category created successfully!
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
          Error creating crop category!
        </MuiAlert>
      </Snackbar>
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Crop Category</DialogTitle>
        <DialogContent>
          {editedCategory && (
            <form>
              <TextField
                label="Crop Names"
                fullWidth
                name="cropNames"
                value={editedCategory.cropNames}
                onChange={(e) => setEditedCategory({ ...editedCategory, cropNames: e.target.value })}
              />
              <TextField
                label="Status"
                fullWidth
                name="status"
                value={editedCategory.status}
                onChange={(e) => setEditedCategory({ ...editedCategory, status: e.target.value })}
              />
            </form>
          )}
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={() => setOpenEditDialog(false)}>
            Cancel
          </Button>
          <Button color="secondary" onClick={handleSaveCategory}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {/* Create Crop Category Dialog */}
      <Dialog
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
      >
        <DialogTitle>Create New Crop Category</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              label="Crop Names"
              fullWidth
              name="cropNames"
              value={newCategory.cropNames}
              onChange={(e) =>
                setNewCategory({ ...newCategory, cropNames: e.target.value })
              }
            />
            <TextField
              label="Status"
              fullWidth
              name="status"
              value={newCategory.status}
              onChange={(e) =>
                setNewCategory({ ...newCategory, status: e.target.value })
                
              }
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={() => setOpenCreateDialog(false)}>
            Cancel
          </Button>
          <Button color="secondary" onClick={handleCreateCategory}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CATEGORIES;
