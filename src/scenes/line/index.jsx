import { Box,Typography, useTheme, FormControl, InputLabel,MenuItem,Select } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import { tokens } from "../../theme";
import React from 'react'

const Line = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [age, setAge] = React.useState('');


  const handleChange = (event) => {
    setAge(event.target.value);
  };
  
  return (
    <Box m="20px" >
      
      <div className="flex items-center gap-6">
      <Header title="Meta Data" subtitle="Metat data from devices deployed in the farm " />
      <Box mb="30px" >
    
      <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Age</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={age}
    label="Age"
    onChange={handleChange}
  >
    {/* <MenuItem value={10}>2005</MenuItem>
    <MenuItem value={20}>2006</MenuItem>
    <MenuItem value={30}>2007</MenuItem>
    <MenuItem value={10}>2008</MenuItem>
    <MenuItem value={20}>2009</MenuItem>
    <MenuItem value={30}>2010</MenuItem>
    <MenuItem value={30}>2011</MenuItem>
    <MenuItem value={10}>2012</MenuItem>
    <MenuItem value={20}>2013</MenuItem>
    <MenuItem value={30}>2014</MenuItem>
    <MenuItem value={10}>2015</MenuItem> */}
    <MenuItem value={20}>2016</MenuItem>
    <MenuItem value={30}>2017</MenuItem>
    <MenuItem value={20}>2018</MenuItem>
    <MenuItem value={30}>2019</MenuItem>
  </Select>
</FormControl>
    </Box>
      </div>
      <Box height="75vh">
        <LineChart />
      </Box>
    </Box>
  );
};

export default Line;
