import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/harvest";

const Bar = () => {


  return (
    <Box m="20px">
      <Header title=" DATA" subtitle="Harvest visualisation" />
    
      <Box height="75vh">
        <BarChart />
      </Box>
    </Box>
  );
};

export default Bar;
