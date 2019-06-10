import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import L from 'leaflet'
import "../Map/ScootMap.css"
import apiKeys from "../apiKeys";


class ScootMap extends Component {

    componentDidMount() {
        // create map
        const map = L.map('map').setView([36, -86], 13);

        L.tileLayer(`https://api.mapbox.com/v4/mapbox.mapbox-streets-v8/12/1171/1566.mvt?style=mapbox://styles/mapbox/streets-v11@00&access_token=${apiKeys.mapBoxToken}`, {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: `${apiKeys.mapBoxToken}`
          }
        ).addTo(map);
    }

    render() {
        return <div id="map"></div>
    }
}

export default withRouter(ScootMap)