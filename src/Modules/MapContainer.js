import Map from 'ol/Map'
// import Layer from 'ol/layer/Layer'    
import View from 'ol/View' 
import react, {useRef, useEffect} from 'react'
import OSM from 'ol/source/OSM'
import { Tile as TileLayer } from 'ol/layer';
import './MapContainer.css';
import Widgets from './UiWidgets/Widgets';

    function MapContainer({project, zoom, cordinate, wmslayer}){

        const [scale, mousePosition, overviewMap ] = Widgets()

        const mapRef = useRef()

            useEffect(()=>{                                                                
                
                const map = new Map({
                    view: new View({
                        projection: cordinate,
                        center:project,
                        zoom:zoom
                    }),
                    layers: [
                        new TileLayer({
                        source: new OSM(),
                        }),
                        wmslayer
                    ],
                    target: "map",//mapRef.current,
                    
                })

                map.addControl(scale)
                map.addControl(mousePosition)
                // map.addControl(overviewMap)

                return () => map.setTarget(undefined);
            
            },[project, zoom, cordinate, wmslayer])

    return <div id="map"  style={{width:'100vw', height:'100vh'}}> </div>  //ref={mapRef}  
    
    }

    export default MapContainer

