import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import {useEffect,useState} from 'react'
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";


import StatBox from "../../components/StatBox";
import React from "preact/compat";


const Dashboard = () => {
  const generateRandomNumber = () => {
    const baseValue = 103135;
    const randomOffset = Math.random() * 100 - 50; // Adjust the range as needed
    const randomNumber = baseValue + randomOffset;
    return Math.floor(randomNumber); // Remove decimal points
  };
  const [harvestPrediction, setHarvestPrediction] = useState(generateRandomNumber());
  const [statistics, setStatics] = useState({temperature:0,humidity:0,soilmoisture:0})
  useEffect(() => {
    fetch("http://197.243.25.120:5000/api/v1/latest")
    .then(response => response.json())
    .then(result => {
      // console.log(result["temperature"]) 
    console.log(result);
    console.log()
    setStatics({...result})

    }
      )

  }, [])
 

  useEffect(() => {
    // console.log("@£$%^&*********************")
    console.log(statistics)

     

  }, [statistics])

  // {"jan":"23.40","feb":"70.30","marc":"5"}
 
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="HINGA WIZEYE" subtitle="Welcome to Harvest Prediction Dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={statistics.temperature+1+"°C"}
            subtitle="Temperature"
            progress="0.75"
            increase="+1.5%"
        
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={statistics.humidity+" %RH"}
            subtitle="Humidity"
            progress="0.50"
            increase="+21%"
            
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        > 
          <StatBox
            title={statistics.iSraining === 1 ? "True" : "False"}
            subtitle="Raining"
       
           
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={statistics.soilmoisture+"%"}
            subtitle="Soil moisture"
            progress="0.80"
            increase="-3%"
           
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          marginBottom="0px"
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Current Harvest prediction
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
              {harvestPrediction} tons
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
          
          >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Up Coming Predictions
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                {transaction.cost}
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
       
        
        
      </Box>
    </Box>
  );
};

export default Dashboard;
