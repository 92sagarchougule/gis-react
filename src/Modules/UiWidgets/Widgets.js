import ScaleLine from 'ol/control/ScaleLine'
import MousePosition from 'ol/control/MousePosition'
import OverviewMap from "ol/control/OverviewMap"
import './Widgets.css'


const Widgets = () => {


    // const scale = new ScaleLine({})
    // const mousePosition = new MousePosition({})
    // const overViewMap = new OverviewMap({})

    const scale = new ScaleLine({
        units: 'metric', // or 'imperial'
        className: 'custom-scale', // Optional class for styling
    });
    const mousePosition = new MousePosition({
        coordinateFormat: (coord) => {
            return `Lon: ${coord[0].toFixed(2)}, Lat: ${coord[1].toFixed(2)}`;
        },
        projection: 'EPSG:4326', // Make sure this is correct
        className:"mouse-position"
    });
    const overviewMap = new OverviewMap({

        className:"overview"
        // Add any necessary configuration
    });

    return [scale, mousePosition, overviewMap]

}

export default Widgets