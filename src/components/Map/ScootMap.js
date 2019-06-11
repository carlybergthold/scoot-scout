import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import L from 'leaflet'
import "./ScootMap.css"
import apiKeys from "../../API/apiKeys";


class ScootMap extends Component {

    componentDidMount() {
        // create map
        const myMap = L.map('map').setView([36, -86], 13);

        L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox.streets',
            maxZoom: 18,
            accessToken: apiKeys.mapBoxToken
        }
        ).addTo(myMap);
    }

    render() {
        return <div id="map"></div>
    }
}

export default withRouter(ScootMap)