import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import L from 'leaflet'
import "./ScootMap.css"
import apiKeys from "../../API/apiKeys";


class ScootMap extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    addScootersToMap = (map) => {
        L.marker([36.141, -86.7516844]).addTo(map).bindPopup("<b>Hello world!</b><br>I am a popup.")
        console.log("hi", this.props.userLat)
        // this.props.spins.forEach(scooter => {
        //     console.log([scooter.lat, scooter.lon])
        //     L.marker([36, -86]).addTo(map).bindPopup("<b>Hello world!</b><br>I am a popup.")
        // })
    }

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

        //show the user location
        L.circle([36.1218284, -86.7516844], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 150
        }).bindPopup("You are Here").addTo(myMap);

        // L.marker([36.1218284, -86.7516844]).addTo(myMap).bindPopup("<b>Hello world!</b><br>I am a popup.")
        this.addScootersToMap(myMap)
        console.log("ho", this.props.userLat)

    }


    render() {
        return <div id="map"></div>
    }
}

export default withRouter(ScootMap)