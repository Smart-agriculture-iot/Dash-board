import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const coperative = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [userData, setUserData] = useState([]);

  const columns = [
    { field: "cooperativeId", headerName: "ID" },
    {
      field: "Name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "district",
      headerName: "district",
      flex: 1,
    },
    {
        field: "sector",
        headerName: "sector",
        flex: 1,
        cellClassName: "name-column--cell",
      },
      {
        field: "cell",
        headerName: "cell",
        flex: 1,
        cellClassName: "name-column--cell",
      },
    {
      field: "cropcategoryName",
      headerName: "Crop Category",
      flex: 1,
      renderCell: ({ row: { roleName } }) => {
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
  ];

  useEffect(() => {
    // Replace with your API call to fetch user data
    fetch("http://localhost:8080/api/userss", {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Assuming the API response is an array of user objects
        // Map the roleName from roleId to roleRoleName
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
      <Header title="CO-OPERATIVE" subtitle="Managing all available cooperatives" />
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
    </Box>
  );
};

export default coperative;
