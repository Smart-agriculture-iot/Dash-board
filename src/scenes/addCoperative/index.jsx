import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from "../../components/Header";
import rwandaData from '../Users/rwanda.json'; // Import your JSON file

const CooperativeRegistration = () => {
  const [formData, setFormData] = useState({
    coName: '',
    province: '', // Add province field
    district: '',
    sector: '',
    cell: '',
    status: '',
    cropCategory: '',
  });

  const [cropCategories, setCropCategories] = useState([]);
  const [cropCategoryDetails, setCropCategoryDetails] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [cells, setCells] = useState([]);

  useEffect(() => {
    // Fetch the provinces from the JSON data
    const provinces = Object.keys(rwandaData);
    setProvinces(provinces);

    // Initialize the other dropdown states
    setDistricts([]);
    setSectors([]);
    setCells([]);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'province') {
      // Filter districts based on the selected province
      const selectedProvinceData = rwandaData[value];
      if (selectedProvinceData) {
        const districtNames = Object.keys(selectedProvinceData);
        setDistricts(districtNames);
        setSectors([]);
        setCells([]);
      }
    } else if (name === 'district') {
      // Filter sectors based on the selected district
      const selectedDistrictData = rwandaData[formData.province][value];
      if (selectedDistrictData) {
        const sectorNames = Object.keys(selectedDistrictData);
        setSectors(sectorNames);
        setCells([]);
      }
    } else if (name === 'sector') {
      // Filter cells based on the selected sector
      const selectedSectorData = rwandaData[formData.province][formData.district][value];
      if (selectedSectorData) {
        // Convert cell data to an array of cell names
        const cellNames = Object.keys(selectedSectorData);
        setCells(cellNames);
      } else {
        setCells([]);
      }
    }
  };

  const showSnackbarWithDelay = (delay) => {
    setOpenSnackbar(true);

    setTimeout(() => {
      handleSnackbarClose();
    }, delay);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new cooperative object with the correct payload structure
    const newCooperative = {
      coName: formData.coName,
      province: formData.province,
      district: formData.district,
      sector: formData.sector,
      cell: formData.cell,
      status: formData.status,
      cropCategory: {
        categoryId: 0, // Replace with the actual category ID from the selected category
        cropNames: formData.cropCategory,
        status: 'string', // Replace with the actual status
      },
    };

    const selectedCategory = cropCategories.find((category) => category.cropNames === formData.cropCategory);
    if (selectedCategory) {
      newCooperative.cropCategory.categoryId = selectedCategory.categoryId;
      newCooperative.cropCategory.status = selectedCategory.status;
    }

    axios
      .post('https://rwandasmartagro.rw/backend/api/cooperatives', newCooperative, {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('Cooperative created:', response.data);
        setFormData({
          coName: '',
          province: '',
          district: '',
          sector: '',
          cell: '',
          status: '',
          cropCategory: '',
        });
        showSnackbarWithDelay(600);
      })
      .catch((error) => {
        setOpenErrorSnackbar(true);
        console.error('Error creating cooperative:', error);
      });
  };

  useEffect(() => {
    axios
      .get('https://rwandasmartagro.rw/backend/api/cropCatgories', {
        headers: {
          accept: 'application/json',
        },
      })
      .then((response) => {
        setCropCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching crop categories:', error);
      });
  }, []);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
    setOpenErrorSnackbar(false);
  };

  return (
    <Container maxWidth="sm">
      <Box m="20px">
        <Header title="CREATE COOPERATIVE" subtitle="Create a New Cooperative Profile" />
      </Box>
      <form onSubmit={handleSubmit}>
        <TextField
          name="coName"
          label="Cooperative Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.coName}
          onChange={handleInputChange}
          required
        />
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel htmlFor="province">Province</InputLabel>
          <Select
            name="province"
            value={formData.province}
            onChange={handleInputChange}
            label="Province"
          >
            <MenuItem value=""></MenuItem>
            {provinces.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel htmlFor="district">District</InputLabel>
          <Select
            name="district"
            value={formData.district}
            onChange={handleInputChange}
            label="District"
          >
            <MenuItem value=""></MenuItem>
            {districts.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel htmlFor="sector">Sector</InputLabel>
          <Select
            name="sector"
            value={formData.sector}
            onChange={handleInputChange}
            label="Sector"
          >
            <MenuItem value=""></MenuItem>
            {sectors.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel htmlFor="cell">Cell</InputLabel>
          <Select
            name="cell"
            value={formData.cell}
            onChange={handleInputChange}
            label="Cell"
          >
            <MenuItem value=""></MenuItem>
            {cells.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          name="status"
          label="Status"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.status}
          onChange={handleInputChange}
          required
        />
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel htmlFor="cropCategory">Crop Category</InputLabel>
          <Select
            name="cropCategory"
            value={formData.cropCategory}
            onChange={handleInputChange}
            label="Crop Category"
          >
            <MenuItem value=""></MenuItem>
            {cropCategories.map((category) => (
              <MenuItem key={category.categoryId} value={category.cropNames}>
                {category.cropNames}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {cropCategoryDetails && (
          <div>
            <h2>Crop Category Details</h2>
            <p>Crop Names: {cropCategoryDetails.cropNames}</p>
            <p>Status: {cropCategoryDetails.status}</p>
          </div>
        )}
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            Create New Cooperative
          </Button>
        </Box>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="success"
          onClose={handleSnackbarClose}
        >
          Cooperative registration was successful!
        </MuiAlert>
      </Snackbar>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={600}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="success"
          onClose={handleSnackbarClose}
        >
          Cooperative registration was successful!
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={600}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="error"
          onClose={handleSnackbarClose}
        >
          Error registering cooperative!
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default CooperativeRegistration;
