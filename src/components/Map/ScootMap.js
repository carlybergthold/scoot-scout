import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import L from 'leaflet'
import "./ScootMap.css"
import apiKeys from "../../API/apiKeys";
import API from "../../API/apiCalls"
import Footer from "../Nav/Footer";
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import markercluster from "leaflet.markercluster"



class ScootMap extends Component {

    addSpinToMap(map, lat, lng) {
        API.getSpin().then(r => {

            const orangeIcon = new L.Icon({
                iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });

            const scooters = r.data.bikes;
            const markerClusters = L.markerClusterGroup({
                spiderfyOnMaxZoom: true
            });

            for ( var i = 0; i < scooters.length; i++ )
            {
                let spinLat = scooters[i].lat;
                let spinLng = scooters[i].lon;

                let popup =
                `<h1>Spin</h1> <a href='https://www.google.com/maps/dir/?api=1&origin=${lat},${lng}&destination=${spinLat},${spinLng}&travelmode=walking' target='_blank'>Get Directions</a>`

                let m = L.marker([spinLat, spinLng], {icon: orangeIcon}).bindPopup( popup );
                markerClusters.addLayer( m );
            }
            map.addLayer( markerClusters );
        })
    }

    addMoreScoots = (func, brand, color, map, lat, lng) => {
        var icon = new L.Icon({
            iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        func().then(r => {
            console.log(r, "add")
            const scooters = r;
            const markerClusters = L.markerClusterGroup({
                spiderfyOnMaxZoom: true
            });

            for ( var i = 0; i < scooters.length; i++ )
            {
                let scootLat = scooters[i].gps_latitude;
                let scootLng = scooters[i].gps_longitude;
                let scootBrand = brand;

                let popup =
                `<h1>${scootBrand}</h1> <a href='https://www.google.com/maps/dir/?api=1&origin=${lat},${lng}&destination=${scootLat},${scootLng}&travelmode=walking' target='_blank'>Get Directions</a>`

                let m = L.marker([scootLat, scootLng], {icon: icon}).bindPopup( popup );
                markerClusters.addLayer( m );
            }
            map.addLayer( markerClusters );
        })
    }

    getUserAddress = (map) => {

        let popupText;
        if (this.props.userId !== "") {
            popupText = "</br><button class='saveAddBtn'>Save to My Locations</button></br><p class='hide hidden'>Saved!</p></br><button class='currentLocationBtn hidden'>Back to Current Location</button>"
        } else popupText = "</br><a href='/register'>Register to Save Location</a></br><button class='currentLocationBtn'>Back to Current Location</button><button class='saveAddBtn hidden'>Save to My Locations</button>"

        const myProvider = new OpenStreetMapProvider();

        const violetIcon = new L.Icon({
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
            popupFormat: ({ result }) => result.label + popupText,
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
                lat: result.location.y,
                lng: result.location.x,
                userId: this.props.userId
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
            this.getUserAddress(myMap);
            this.addSpinToMap(myMap, lat, lng)
            this.addMoreScoots(API.getLyft, "Lyft", myMap, lat, lng)
            this.addMoreScoots(API.getJump, "Jump", myMap, lat, lng)
            this.addMoreScoots(API.getLime, "Lime", myMap, lat, lng)
            this.addMoreScoots(API.getGotcha, "Gotcha", myMap, lat, lng)
            // this.addBirdToMap(myMap, lat, lng)
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

                this.getUserAddress(myMap);
                this.addSpinToMap(myMap, lat, lng)
                this.addMoreScoots(API.getLyft, "Lyft", "red", myMap, lat, lng)
                this.addMoreScoots(API.getJump, "Jump", "yellow", myMap, lat, lng)
                this.addMoreScoots(API.getLime, "Lime", "green", myMap, lat, lng)
                this.addMoreScoots(API.getGotcha, "Gotcha", "grey", myMap, lat, lng)
                // this.addBirdToMap(myMap, lat, lng)
            })
    }
}

    render() {
        return (
            <div>
                <div id="map"></div>
                <Footer />
            </div>
        )
    }
}

export default withRouter(ScootMap)