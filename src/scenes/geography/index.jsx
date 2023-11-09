// import { Box, useTheme } from "@mui/material";
// import GeographyChart from "../../components/GeographyChart";
// import Header from "../../components/Header";
// import { tokens } from "../../theme";
import GoogleMapReact from "google-map-react";
import React, { Fragment, useEffect, useState } from "react";

// const retre = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   return (
//     <Box m="20px">
//       <Header title="Device Tracker" subtitle="Geo locations of our devices by Google Map locator /GPS" />

//       <Box
//         height="75vh"
//         border={`1px solid ${colors.grey[100]}`}
//         borderRadius="4px"
//       >
//         <GeographyChart />
//       </Box>
//     </Box>
//   );
// };


let Geography = () => {

    const [statistics, setStatics] = useState({temperature:0,humidity:0,soilmoisture:0})
    useEffect(() => {
      fetch("http://localhost:5000/api/v1/latest")
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
    const AnyReactComponent = ({ text }) => (
        <div style={{
            color: 'white',
            background: 'red',
            padding: '15px 10px',
            display: 'inline-flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '100%',
            transform: 'translate(-50%, -50%)'
        }}>
            {text}
        </div>
    );
    const handleApiLoaded = (map, maps) => {
        // use map and maps objects
    };
    const defaultProps = {
      // -1.9584882697723136, 30.064548390365417
        center: {lat:-1.9584882697723136, lng:30.064548390365417},
        zoom: 9,
        greatPlaceCoords: {lat: 59.724465, lng: 30.080121}
    };

    return <Fragment>
        <div  className={"w-screen h-screen test1 bg-primary"}>
            <GoogleMapReact
                bootstrapURLKeys={{ key:"AIzaSyB7dDD3UGDO2hSJgBrGYPohWjQJE4xQYYU"}}
                defaultZoom={defaultProps.zoom}
                yesIWantToUseGoogleMapApiInternals
                defaultCenter={defaultProps.center}
                onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
            >
                <AnyReactComponent
                
                    lat={defaultProps.center.lat}
                    lng={defaultProps.center.lng}
                    text="Device 1"
                />
                {/* <AnyReactComponent
                // -1.4996926171514455, 29.632733820533694 -2.3560746429711545, 29.73483994814169
                lat={parseFloat(statistics.latitude)} // Replace with the latitude value from the API response
  lng={parseFloat(statistics.longitude)} // Replace with the longitude value from the API response
  text={`Device ${statistics.serialNumber} Voltage=${statistics.voltage}`} // Replace with the device name and voltage from the API response
                
            /> */}

<AnyReactComponent
                // -1.4996926171514455, 29.632733820533694 -2.3560746429711545, 29.73483994814169  -2.3538020506991506, 29.746341260135075
                lat={-2.3538020506991506}
                lng={29.746341260135075}
                text="Device 3"
               
            />
            </GoogleMapReact>

            {/* <p className="t">
              mwaramutse
            </p> */}
        </div>
    </Fragment>
}

// export default LandingPage;



export default Geography;
