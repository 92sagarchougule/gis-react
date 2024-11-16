import MapContainer from "./MapContainer";
import SelectComp from "./UiWidgets/SelectComp"
import MapComp from "./MapComponent/MapComp";
import React from "react";

 function BaseMap() {

    const {projction, zoomlevel, coord, districtlayer} = MapComp();

 
    

    return ( 
            <>
            <React.StrictMode>
            <SelectComp />
            </React.StrictMode>
            

            <MapContainer 

            project = {projction}  
            zoom={zoomlevel} 
            cordinate = {coord} 
            wmslayer = {districtlayer} 
        
            /> 
            
            </>
           );

 }
 
 export default BaseMap;