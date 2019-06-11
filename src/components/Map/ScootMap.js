import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import L from 'leaflet'
import "./ScootMap.css"
import apiKeys from "../../API/apiKeys";


class ScootMap extends Component {

    componentDidMount() {
        // create map
        const myMap = L.map('map').setView([36.1218284, -86.7516844], 13);

        L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox.streets',
            maxZoom: 18,
            accessToken: apiKeys.mapBoxToken
        }
        ).addTo(myMap);

        const scooter = L.marker([36.1218284, -86.7516844]).addTo(myMap).bindPopup("<b>Hello world!</b><br>I am a popup.")

        this.addScootsToMap()
    }

    addScootsToMap = () => {
        //creates marker for each scooter location
        this.props.spins.forEach(scooter => {
            console.log([scooter.lat, scooter.lon])
            let marker = L.marker([36.1218284, -86.7516844]).addTo(this.myMap).bindPopup("<b>Hello world!</b><br>I am a popup.")
        });
    }

    render() {
        return <div id="map"></div>
    }
}

export default withRouter(ScootMap)