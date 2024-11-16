import { fromLonLat } from "ol/proj";

import WMSLayer from "./WMSLayer";


function MapComp() {

  
    const distlayer = WMSLayer()
    const proj = fromLonLat([77,19])
    const zoom = 6.5
    const cordinate = "EPSG:3857"

    return {projction : proj, zoomlevel : zoom, coord : cordinate, districtlayer : distlayer}
}

export default MapComp