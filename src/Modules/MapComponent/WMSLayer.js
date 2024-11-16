import { TileWMS } from "ol/source"
import { Tile as TileLayer } from 'ol/layer';

const WMSLayer = ()=>{

    const url ="http://localhost:8282/geoserver/portal/wms"

    const distLayer = new TileLayer({
        source: new TileWMS({
            crossOrigin: "Anonymous",
		    serverType: "geoserver",
            url: url,
            params: {
                LAYERS: "portal:Rail_Track",
                TILED: true,
            }
        })
    })

    return distLayer

}

export default WMSLayer