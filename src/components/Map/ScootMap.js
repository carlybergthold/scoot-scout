import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import L from 'leaflet'
import "./ScootMap.css"
import apiKeys from "../../API/apiKeys";
import API from "../../API/apiCalls"


class ScootMap extends Component {

    //function to call the Spin API and mark their scooters on the map
    addSpinToMap = (map) => {
        var greenIcon = new L.Icon({
            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });

        API.getSpin().then(r => {
            r.data.bikes.forEach(scooter => {
                new L.marker([scooter.lat, scooter.lon], {icon: greenIcon}).addTo(map).bindPopup("Spin Scooter")
            });
        })
    }

    //function to call the Bird API and mark their scooters on the map
    addBirdToMap = (map, lat, lng) => {
        API.getBird(lat, lng).then(r => {
            r.birds.forEach(scooter => {
                new L.marker([scooter.location.latitude, scooter.location.longitude]).addTo(map).bindPopup("Bird Scooter")
            });
        })
    }


    componentDidMount() {
        API.getUserLocation()
        .then(user => {
            const lat = user.location.lat;
            const lng = user.location.lng;
            const myMap = L.map('map').setView([lat, lng], 13);

            L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                id: 'mapbox.streets',
                maxZoom: 16,
                accessToken: apiKeys.mapBoxToken
            }
            ).addTo(myMap);

            //show the user location
            L.circle([lat, lng], {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: 150
            }).bindPopup("You are Here").addTo(myMap);

            this.addSpinToMap(myMap)
            this.addBirdToMap(myMap, lat, lng)

        })
    }

    render() {
        return (<div id="map"></div>)
    }
}

export default withRouter(ScootMap)