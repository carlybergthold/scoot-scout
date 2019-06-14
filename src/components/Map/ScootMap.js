import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import L from 'leaflet'
import "./ScootMap.css"
import apiKeys from "../../API/apiKeys";
import API from "../../API/apiCalls"
import Footer from "../Nav/Footer";
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';


class ScootMap extends Component {

    //function to call the Spin API and mark their scooters on the map
    addSpinToMap = (map, lat, lng) => {
        var greenIcon = new L.Icon({
            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });

        API.getSpin().then(r => {
            console.log("Spin", r)
            r.data.bikes.forEach(scooter => {
                let spinLat = scooter.lat;
                let spinLng = scooter.lon;
                new L.marker([spinLat, spinLng], {icon: greenIcon}).addTo(map).bindPopup(`<h1>Spin Scooter</h1> <a href='https://www.google.com/maps/dir/?api=1&origin=${lat},${lng}&destination=${spinLat},${spinLng}&travelmode=walking' target='_blank'>Get Directions</a>`)
            });
        })
    }

    //function to call the Bird API and mark their scooters on the map
    addBirdToMap = (map, lat, lng) => {
        API.getBird(lat, lng).then(r => {
            console.log("Bird", r)
            r.birds.forEach(scooter => {
                let birdLat = scooter.location.latitude;
                let birdLng = scooter.location.longitude;
                new L.marker([birdLat, birdLng]).addTo(map).bindPopup(`<h1>Bird Scooter</h1> <h3>Battery Level: ${scooter.battery_level}</h3> <a href='https://www.google.com/maps/dir/?api=1&origin=${lat},${lng}&destination=${birdLat},${birdLng}&travelmode=walking' target='_blank'>Get Directions</a>`)
            });
        })
    }

    getUserAddress = (map) => {
        const myProvider = new OpenStreetMapProvider();

        var violetIcon = new L.Icon({
            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        const searchControl = new GeoSearchControl({
            provider: myProvider,
            autoComplete: true,
            autoCompleteDelay: 400,
            showMarker: true,
            showPopup: true,
            marker: {
                icon: violetIcon
            },
            popupFormat: ({ result }) => result.label,
            maxMarkers: 1,
            retainZoomLevel: false,
            animateZoom: true,
            autoClose: false,
            searchLabel: 'Enter a different address',
            keepResult: false
        });
        map.addControl(searchControl);
        const reset = document.querySelector('.reset');
        reset.addEventListener('click', function() {
            console.log("hi")
            API.getUserLocation()
            .then(user => {
                const lat = user.location.lat;
                const lng = user.location.lng;
                map.setView([lat, lng], 14);
            })
        })
    }

    componentDidMount() {
        API.getUserLocation()
        .then(user => {
            console.log("user location", user.location)
            const lat = user.location.lat;
            const lng = user.location.lng;
            const myMap = L.map('map').setView([lat, lng], 14);

            L.tileLayer("https://api.mapbox.com/styles/v1/carlymita/cjwwjwccr51kh1cpcw995d56n/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiY2FybHltaXRhIiwiYSI6ImNqd3FoeHZtYjE5cjA0N21nMGhheGk4NXgifQ.jf0Z7pkxDwB17dk-2xPtFw", {
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
                radius: 100
            }).bindPopup("You are Here").addTo(myMap).openPopup();

            this.addSpinToMap(myMap, lat, lng)
            this.addBirdToMap(myMap, lat, lng)
            this.getUserAddress(myMap);
        })
    }

    render() {
        return (<div>
            <div id="map"></div>
            <Footer />
        </div>)
    }
}

export default withRouter(ScootMap)