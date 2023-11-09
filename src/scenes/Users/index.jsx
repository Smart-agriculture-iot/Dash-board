import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import Header from '../../components/Header';
import rwandaData from './rwanda.json';
const UserRegistration = () => {
  useEffect(() => {
    // Fetch the provinces from the JSON data
    const provinces = Object.keys(rwandaData);
    setProvinces(provinces);

    // Initialize the other dropdown states
    setDistricts([]);
    setSectors([]);
    setCells([]);
  }, []);
  const [cooperatives, setCooperatives] = useState([]);
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    password: '',
    cooperative: '',
    createdBy: '',
    status: '',
    roleId: '',
    province: '',
    district: '',
    sector: '',
    cell: '',
  });

  const [roles, setRoles] = useState([]);
  const [roleDetails, setRoleDetails] = useState(null);
  const [userType, setUserType] = useState('Cooperative');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [filteredSectors, setFilteredSectors] = useState([]);
  const [filteredCells, setFilteredCells] = useState([]);

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [cells, setCells] = useState([]);
  const userId = localStorage.getItem('userId');
  const userRole = localStorage.getItem('userRole');
  const [usernameAvailability, setUsernameAvailability] = useState(null);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('');

  

  useEffect(() => {
    // Fetch the list of cooperatives when the component is mounted
    fetchCooperatives();
  }, []); // Empty dependency array ensures it's only called once when mounted

  const fetchCooperatives = () => {
    // Make an API request to fetch the list of cooperatives
    axios
      .get('https://rwandasmartagro.rw/backend/api/cooperatives', {
        headers: {
          accept: 'application/json',
        },
      })
      .then((response) => {
        // Extract the cooperative data from the API response
        const cooperativeData = response.data;

        // Set the cooperatives in your state
        setCooperatives(cooperativeData);
      })
      .catch((error) => {
        console.error('Error fetching cooperatives:', error);
      });
  };


  const checkUsernameAvailability = (username) => {
    axios
      .get(`https://rwandasmartagro.rw/backend/api/userss/username/${username}`, {
        headers: {
          accept: 'application/json',
        },
      })
      .then((response) => {
        if (response.status === 200) {
         
          setUsernameAvailability(false);
          setUsernameErrorMessage('Username already taken');
        } else {
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
           // Username is available
           setUsernameAvailability(true);
           setUsernameErrorMessage('Username is available.');
        } else {
          // Handle other errors
          setUsernameAvailability(null);
          setUsernameErrorMessage('Error checking username availability.');
        }
      });
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'username') {
      const username = value.trim();
      if (username === '') {
        // Handle empty username
        setUsernameAvailability(null);
        setUsernameErrorMessage('Username is required.');
      } else {
        checkUsernameAvailability(username);
      }
    }

    if (name === 'province') {
      // Filter districts based on the selected province
      const selectedProvinceData = rwandaData[value];
      if (selectedProvinceData) {
        const districtNames = Object.keys(selectedProvinceData);
        setFilteredDistricts(districtNames);
        setFilteredSectors([]);
        setFilteredCells([]);
      }
    } else if (name === 'district') {
      // Filter sectors based on the selected district
      const selectedDistrictData = rwandaData[formData.province][value];
      if (selectedDistrictData) {
        const sectorNames = Object.keys(selectedDistrictData);
        setFilteredSectors(sectorNames);
        setFilteredCells([]);
      }
    } else if (name === 'sector') {
      // Filter cells based on the selected sector
      const selectedSectorData = rwandaData[formData.province][formData.district][value];
      if (selectedSectorData) {
        // Convert cell data to an array of cell names
        const cellNames = Object.keys(selectedSectorData);
        setFilteredCells(cellNames);
      } else {
        setFilteredCells([]);
      }
    }
  };



  const handleUserTypeChange = (e) => {
    const selectedType = e.target.value;
    setUserType(selectedType);
  };

  const showSnackbarWithDelayAndNavigate = (delay) => {
    setOpenSnackbar(true);

    setTimeout(() => {
      handleSnackbarClose(null, null, 'success');
      
    }, delay);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      fullname: formData.fullname,
      username: formData.username,
      password: formData.password,
      cooperative: parseInt(formData.cooperative),
      createdBy: parseInt(userId),
      status: formData.status,
      roleId: {
        roleId: 0,
        roleName: formData.roleId,
        status: 'string',
      },
    };

    if (userType === 'Supervisor') {
      newUser.province = formData.province;
      newUser.district = formData.district;
      newUser.sector = formData.sector;
      newUser.cell = formData.cell;
    }

    const selectedRole = roles.find((role) => role.roleName === formData.roleId);
    if (selectedRole) {
      newUser.roleId.roleId = selectedRole.roleId;
      newUser.roleId.status = selectedRole.status;
    }

    const apiEndpoint = userType === 'Cooperative' ? 'https://rwandasmartagro.rw/backend/api/userss' : 'https://rwandasmartagro.rw/backend/api/supervisors';

    axios
      .post(apiEndpoint, newUser, {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('User created:', response.data);
        setFormData({
          fullname: '',
          username: '',
          password: '',
          cooperative: '',
          createdBy: '',
          status: '',
          roleId: '',
          province: '',
          district: '',
          sector: '',
          cell: '',
        });
        showSnackbarWithDelayAndNavigate(600);
      })
      .catch((error) => {
        setOpenErrorSnackbar(true);
        console.error('Error creating user:', error);
      });
  };

  useEffect(() => {
    axios
      .get('https://rwandasmartagro.rw/backend/api/roles', {
        headers: {
          accept: 'application/json',
        },
      })
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => {
        console.error('Error fetching roles:', error);
      });
  }, []);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
    setOpenErrorSnackbar(false);
  };

  return (


    <Container maxWidth="sm">
      <Box m="20px">
        <Header title="CREATE USER" subtitle="Create a New User Profile" />
      </Box>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel htmlFor="userType">User Type</InputLabel>
          <Select
            name="userType"
            value={userType}
            onChange={handleUserTypeChange}
            label="User Type"
          >
            <MenuItem value="Cooperative">Cooperative</MenuItem>
            <MenuItem value="Supervisor">Local Government</MenuItem>
          </Select>
        </FormControl>
        <TextField
          name="fullname"
          label="Full Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.fullname}
          onChange={handleInputChange}
          required
        />
        <TextField
          name="username"
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.username}
          onChange={handleInputChange}
          error={usernameAvailability === false}
          helperText={usernameAvailability === false ? usernameErrorMessage : ''}
          required
        />
        {usernameAvailability === false && (
        <p style={{ color: 'red' }}>Username already taken</p>
      )}
      {usernameAvailability === true && (
        <p style={{ color: 'green' }}>Username is available.</p>
      )}
        <TextField
          name="password"
          type="password"
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        {userType === 'Cooperative' && (
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel htmlFor="cooperativeId">Cooperative</InputLabel>
            <Select
              name="cooperative"
              value={formData.cooperative}
              onChange={handleInputChange}
              label="Cooperative"
              required
            >
              <MenuItem value=""></MenuItem>
              {cooperatives.map((cooperative) => (
                <MenuItem key={cooperative.cooperativeId} value={cooperative.cooperativeId}>
                  {cooperative.coName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}


        {/* <TextField
          name="createdBy"
          label="Created By"
          variant="outlined"
          fullWidth
          margin="normal"
          value={userName}
          onChange={handleInputChange}
          required
        /> */}
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
          <InputLabel htmlFor="roleId">Role</InputLabel>
          <Select
            name="roleId"
            value={formData.roleId}
            onChange={handleInputChange}
            label="Role"
            required
          >
            <MenuItem value=""></MenuItem>
            {roles.map((role) => (
              <MenuItem key={role.roleId} value={role.roleName}>
                {role.roleName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {userType === 'Supervisor' && (
          <Box display="flex" flexDirection="row">
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
                {filteredDistricts.map((item) => (
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
                {filteredSectors.map((item) => (
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
                {filteredCells.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}


        {roleDetails && (
          <div>
            <h2>Role Details</h2>
            <p>Role Name: {roleDetails.roleName}</p>
            <p>Status: {roleDetails.status}</p>
          </div>
        )}

        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            Create New User
          </Button>
        </Box>
      </form>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert elevation={6} variant="filled" severity="success" onClose={handleSnackbarClose}>
          User registration was successful!
        </MuiAlert>
      </Snackbar>

      <Snackbar open={openErrorSnackbar} autoHideDuration={6000} onClose={(event, reason) => handleSnackbarClose(event, reason, 'error')}>
        <MuiAlert elevation={6} variant="filled" severity="error" onClose={(event, reason) => handleSnackbarClose(event, reason, 'error')}>
          Error registering user!
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default UserRegistration;
