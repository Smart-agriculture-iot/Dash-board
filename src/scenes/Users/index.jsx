import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from "../../components/Header";

const UserRegistration = () => {
    const [formData, setFormData] = useState({
        fullname: '',
        username: '',
        password: '',
        cooperativeId: '',
        createdBy: '',
        status: '',
        roleId: '',
    });
    const [roles, setRoles] = useState([]);
    const [roleDetails, setRoleDetails] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'roleId') {
            try {
                const response = await axios.get(`http://localhost:8080/api/roles/rolename/${value}`);
                setRoleDetails(response.data);
            } catch (error) {
                console.error('Error fetching role details:', error);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create a new user object with the correct payload structure
        const newUser = {
            fullname: formData.fullname,
            username: formData.username,
            password: formData.password,
            cooperativeId: parseInt(formData.cooperativeId),
            createdBy: parseInt(formData.createdBy),
            status: formData.status,
            roleId: {
                roleId: 0, // Replace with the actual role ID from the selected role
                roleName: formData.roleId,
                status: 'string', // Replace with the actual status
            },
        };

        const selectedRole = roles.find((role) => role.roleName === formData.roleId);
        if (selectedRole) {
            newUser.roleId.roleId = selectedRole.roleId;
            newUser.roleId.status = selectedRole.status;
        }

        axios.post('http://localhost:8080/api/userss', newUser, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            window.location.href = '/USER';
            console.log('User created:', response.data);
            setFormData({
                fullname: '',
                username: '',
                password: '',
                cooperativeId: '',
                createdBy: '',
                status: '',
                roleId: '',
                
            });
            setOpenSnackbar(true);
        })
        .catch((error) => {
            console.error('Error creating user:', error);
        });
    };

    useEffect(() => {
        axios.get('http://localhost:8080/api/roles', {
            headers: {
                'accept': 'application/json',
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
    };

    return (
        <Container maxWidth="sm">
            <Box m="20px">
                <Header title="CREATE USER" subtitle="Create a New User Profile" />
            </Box>
            <form onSubmit={handleSubmit}>
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
                    required
                />
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
                <TextField
                    name="cooperativeId"
                    label="Cooperative ID"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.cooperativeId}
                    onChange={handleInputChange}
                    required
                />
                <TextField
                    name="createdBy"
                    label="Created By"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.createdBy}
                    onChange={handleInputChange}
                    required
                />
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
                    >
                        <MenuItem value=""></MenuItem>
                        {roles.map((role) => (
                            <MenuItem key={role.roleId} value={role.roleName}>
                                {role.roleName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
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
                    User registration was successful!
                </MuiAlert>
            </Snackbar>
        </Container>
    );
};

export default UserRegistration;
