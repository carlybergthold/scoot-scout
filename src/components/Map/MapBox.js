// import React, { Component } from "react"
// import { withRouter } from "react-router-dom"
// import ReactMapboxGl, { Layer, Feature, Map } from "react-mapbox-gl";
// import apiKeys from "../../API/apiKeys";

// class MapBox extends Component {

//   ReactMapboxGl = require("react-mapbox-gl");
//   Layer = ReactMapboxGl.Layer;
//   Feature = ReactMapboxGl.Feature;

//   Map = ReactMapboxGl({
//     accessToken: apiKeys.mapBoxToken,
//     container: 'map',
//     style: 'mapbox://styles/mapbox/streets-v10',
//     center: [-122.662323, 45.523751], // starting position
//     zoom: 12
//   });

//   render() {
//     return (
//       <Map
//         containerStyle={{height: "100vh"}}>
//           <Layer
//             type="symbol"
//             id="marker"
//             layout={{ "icon-image": "marker-15" }}>
//             <Feature coordinates={[-122.662323, 45.523751]}/>
//           </Layer>
//       </Map>
//     )
//   }
// }

// export default withRouter(MapBox)