import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import L from 'leaflet'
import "./ScootMap.css"
import apiKeys from "../../API/apiKeys";
import API from "../../API/apiCalls"
import Footer from "../Nav/Footer";
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';


class ScootMap extends Component {

    orangeIcon = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

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
                new L.marker([spinLat, spinLng], {icon: greenIcon}).addTo(map).bindPopup(`<h1>Spin</h1> <a href='https://www.google.com/maps/dir/?api=1&origin=${lat},${lng}&destination=${spinLat},${spinLng}&travelmode=walking' target='_blank'>Get Directions</a>`)
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
                new L.marker([birdLat, birdLng]).addTo(map).bindPopup(`<h1>Bird</h1> <h3>Battery Level: ${scooter.battery_level}</h3> <a href='https://www.google.com/maps/dir/?api=1&origin=${lat},${lng}&destination=${birdLat},${birdLng}&travelmode=walking' target='_blank'>Get Directions</a>`)
            });
        })
    }

    addScootsToMap = (map, lat, lng) => {
        API.multibike(lat, lng).then(r => {
            console.log("multi", r)
            r.data.vehicles.forEach(scooter => {
                let scootLat = scooter.lat;
                let scootLng = scooter.lng;
                new L.marker([scootLat, scootLng]).addTo(map).bindPopup(`<h1>${scooter.provider.name}</h1> <h3>Battery Level: ${scooter.battery}</h3> <a href='https://www.google.com/maps/dir/?api=1&origin=${lat},${lng}&destination=${scootLat},${scootLng}&travelmode=walking' target='_blank'>Get Directions</a>`)
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
            popupFormat: ({ result }) => result.label + "</br><button class='saveAddBtn'>Save to My Locations</button></br><p class='hide hidden'>Saved!</p></br><button class='currentLocationBtn hidden'>Back to Current Location</button>",
            maxMarkers: 1,
            retainZoomLevel: false,
            animateZoom: true,
            autoClose: false,
            searchLabel: 'Enter a different address',
            keepResult: false
        });

        map.on('geosearch/showlocation', result => {
            let addressObj = {
                address: result.location.label,
                location: result.location.y,
                lng: result.location.x,
                userId: 1
            }
            document.querySelector(".saveAddBtn").addEventListener("click", function() {
                API.post("savedLocations", addressObj)
                .then(document.querySelector(".hide").classList.remove("hidden"))
                .then(document.querySelector(".currentLocationBtn").classList.remove("hidden"))
                .then(document.querySelector(".saveAddBtn").classList.add("hidden"))
            })

            document.querySelector(".currentLocationBtn").addEventListener("click", function() {
                API.getUserLocation()
                .then(user => {
                    map.setView([user.location.lat, user.location.lng], 14);
                })
            })
        })

        map.addControl(searchControl);
        const reset = document.querySelector('.reset');
        reset.addEventListener('click', function() {
            API.getUserLocation()
            .then(user => {
                const lat = user.location.lat;
                const lng = user.location.lng;
                map.setView([lat, lng], 14);
            })
        })
    }

    componentDidMount() {

        //show the user location
        if (this.props.popup) {
            let lat = this.props.startingLat;
            let lng = this.props.startingLng;

            const myMap = L.map('map').setView([lat, lng], 14);

            L.tileLayer("https://api.mapbox.com/styles/v1/carlymita/cjwwjwccr51kh1cpcw995d56n/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiY2FybHltaXRhIiwiYSI6ImNqd3FoeHZtYjE5cjA0N21nMGhheGk4NXgifQ.jf0Z7pkxDwB17dk-2xPtFw", {
                id: 'mapbox.streets',
                maxZoom: 17,
                accessToken: apiKeys.mapBoxToken
            }
            ).addTo(myMap);

            new L.marker([lat, lng]).addTo(myMap).bindPopup(`${this.props.address} </br>
            <button class="currentLocationBtn">Back to Current Location</button>`).openPopup()

            document.querySelector(".currentLocationBtn").addEventListener("click", function() {
                API.getUserLocation()
                .then(user => {
                    myMap.setView([user.location.lat, user.location.lng], 14);
                    L.circle([user.location.lat, user.location.lng], {
                        color: 'red',
                        fillColor: '#f03',
                        fillOpacity: 0.5,
                        radius: 100
                    }).bindPopup("<h3>You are Here</h3>").addTo(myMap).openPopup();
                })
            })
            this.addSpinToMap(myMap, lat, lng)
            this.addBirdToMap(myMap, lat, lng)
            this.getUserAddress(myMap);
            this.addScootsToMap(myMap, lat, lng)
        }
        else {
            API.getUserLocation()
            .then(user => {
                let lat = user.location.lat
                let lng = user.location.lng

                const myMap = L.map('map').setView([lat, lng], 14);

                L.tileLayer("https://api.mapbox.com/styles/v1/carlymita/cjwwjwccr51kh1cpcw995d56n/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiY2FybHltaXRhIiwiYSI6ImNqd3FoeHZtYjE5cjA0N21nMGhheGk4NXgifQ.jf0Z7pkxDwB17dk-2xPtFw", {
                    id: 'mapbox.streets',
                    maxZoom: 17,
                    accessToken: apiKeys.mapBoxToken
                }
                ).addTo(myMap);

                L.circle([lat, lng], {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: 100
                }).bindPopup("<h3>You are Here</h3>").addTo(myMap).openPopup();

                this.addSpinToMap(myMap, lat, lng)
                this.addBirdToMap(myMap, lat, lng)
                this.getUserAddress(myMap);
                this.addScootsToMap(myMap, lat, lng)
            })

        }
    }

    mapfunction = (map) => {
        L.map.setView([this.state.startingLat, this.state.startingLng], 14);

    }

    render() {
        console.log(this.props, "scootmap rendered")
        return (
            <div>
                <div id="map"></div>
                <Footer />
            </div>
        )
    }
}

export default withRouter(ScootMap)