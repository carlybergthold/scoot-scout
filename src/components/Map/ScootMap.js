import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import L from 'leaflet'
import "./ScootMap.css"
import apiKeys from "../../API/apiKeys";
import API from "../../API/apiCalls"
import Footer from "../Nav/Footer";
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import markercluster from "leaflet.markercluster"
import spin from "./images/spin.jpg"
import jump from "./images/jump.png"
import bird from "./images/bird.png"
import lime from "./images/lime.jpeg"
import lyft from "./images/lyft.png"
import gotcha from "./images/gotcha.jpeg"


class ScootMap extends Component {

    filterSpin = () => {

        const spinLogo = document.querySelector("#spinLogo")

        const clusters = document.querySelectorAll(".spinCluster")
        for (let i = 0; i < clusters.length; i++) {
            if (clusters[i].style.display === "none") {
                clusters[i].style.display = "flex";
                spinLogo.style.opacity = 1;
            } else {
                clusters[i].style.display = "none";
                spinLogo.style.opacity = 0.5;
            }
        }

        const icons = document.querySelectorAll(".spinIcon")
        for (let i = 0; i < icons.length; i++) {
            if (icons[i].style.display === "none") {
                icons[i].style.display = "flex";
            } else {
                icons[i].style.display = "none";
            }
        }
    }

    filterJump = () => {

        const jumpLogo = document.querySelector("#jumpLogo")

        const clusters = document.querySelectorAll(".JumpCluster")
        for (let i = 0; i < clusters.length; i++) {
            if (clusters[i].style.display === "none") {
                clusters[i].style.display = "flex";
                jumpLogo.style.opacity = 1;
            } else {
                clusters[i].style.display = "none";
                jumpLogo.style.opacity = 0.5;
            }
        }

        const icons = document.querySelectorAll(".JumpIcon")
        for (let i = 0; i < icons.length; i++) {
            if (icons[i].style.display === "none") {
                icons[i].style.display = "flex";
            } else {
                icons[i].style.display = "none";
            }
        }
    }

    filterLime = () => {

        const limeLogo = document.querySelector("#limeLogo")

        const clusters = document.querySelectorAll(".LimeCluster")
        for (let i = 0; i < clusters.length; i++) {
            if (clusters[i].style.display === "none") {
                clusters[i].style.display = "flex";
                limeLogo.style.opacity = 1;
            } else {
                clusters[i].style.display = "none";
                limeLogo.style.opacity = 0.5;
            }
        }

        const icons = document.querySelectorAll(".LimeIcon")
        for (let i = 0; i < icons.length; i++) {
            if (icons[i].style.display === "none") {
                icons[i].style.display = "flex";
            } else {
                icons[i].style.display = "none";
            }
        }
    }

    filterLyft = () => {

        const lyftLogo = document.querySelector("#lyftLogo")

        const clusters = document.querySelectorAll(".LyftCluster")
        for (let i = 0; i < clusters.length; i++) {
            if (clusters[i].style.display === "none") {
                clusters[i].style.display = "flex";
                lyftLogo.style.opacity = 1;
            } else {
                clusters[i].style.display = "none";
                lyftLogo.style.opacity = 0.5;
            }
        }

        const icons = document.querySelectorAll(".LyftIcon")
        for (let i = 0; i < icons.length; i++) {
            if (icons[i].style.display === "none") {
                icons[i].style.display = "flex";
            } else {
                icons[i].style.display = "none";
            }
        }
    }

    filterBird = () => {

        const birdLogo = document.querySelector("#birdLogo")

        const clusters = document.querySelectorAll(".BirdCluster")
        for (let i = 0; i < clusters.length; i++) {
            if (clusters[i].style.display === "none") {
                clusters[i].style.display = "flex";
                birdLogo.style.opacity = 1;
            } else {
                clusters[i].style.display = "none";
                birdLogo.style.opacity = 0.5;
            }
        }

        const icons = document.querySelectorAll(".BirdIcon")
        for (let i = 0; i < icons.length; i++) {
            if (icons[i].style.display === "none") {
                icons[i].style.display = "flex";
                birdLogo.style.opacity = 1;
            } else {
                icons[i].style.display = "none";
                birdLogo.style.opacity = 0.5;
            }
        }
    }

    filterGotcha = () => {

        const gotchaLogo = document.querySelector("#gotchaLogo")

        const clusters = document.querySelectorAll(".GotchaCluster")
        for (let i = 0; i < clusters.length; i++) {
            if (clusters[i].style.display === "none") {
                clusters[i].style.display = "flex";
                gotchaLogo.style.opacity = 1;
            } else {
                clusters[i].style.display = "none";
                gotchaLogo.style.opacity = 0.5;
            }
        }

        const icons = document.querySelectorAll(".GotchaIcon")
        for (let i = 0; i < icons.length; i++) {
            if (icons[i].style.display === "none") {
                icons[i].style.display = "flex";
            } else {
                icons[i].style.display = "none";
            }
        }
    }

    addSpinToMap(map, lat, lng) {
        API.getSpin().then(r => {

            const orangeIcon = new L.Icon({
                iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41],
                className: 'spinIcon',
            });

            const scooters = r.data.bikes;

            const markerClusters = L.markerClusterGroup({
                iconCreateFunction: function(cluster) {
                    var childCount = cluster.getChildCount();
                    var c = ' size';
                    if (childCount < 50) {
                      c += 'small';
                    }
                    else {
                      c += 'large';
                    }
                    return new L.DivIcon({ html: childCount,
                     className: `spinCluster` + c, iconSize: new L.Point(50, 50) });
                    }
            })


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
            shadowSize: [41, 41],
            className: `${brand}Icon`,
        });

        func().then(r => {
            const scooters = r;
            const markerClusters = L.markerClusterGroup({
                iconCreateFunction: function(cluster) {
                    var childCount = cluster.getChildCount();
                    var c = ' size';
                    if (childCount < 50) {
                      c += 'small';
                    }
                    else {
                      c += 'large';
                    }
    
                    return new L.DivIcon({ html: childCount,
                     className: `${brand}Cluster` + c, iconSize: new L.Point(50, 50) });
                    }
            })

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
        if (localStorage.getItem('user')) {
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
                    map.setView([user.location.lat, user.location.lng], 15);
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
                map.setView([lat, lng], 15);
            })
        })
    }

    componentDidMount() {
        //show the user location
        if (this.props.popup) {
            let lat = this.props.startingLat;
            let lng = this.props.startingLng;

            const myMap = L.map('map').setView([lat, lng], 15);

            L.tileLayer("https://api.mapbox.com/styles/v1/carlymita/cjwwjwccr51kh1cpcw995d56n/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiY2FybHltaXRhIiwiYSI6ImNqd3FoeHZtYjE5cjA0N21nMGhheGk4NXgifQ.jf0Z7pkxDwB17dk-2xPtFw", {
                id: 'mapbox.streets',
                maxZoom: 18,
                accessToken: apiKeys.mapBoxToken
            }
            ).addTo(myMap);

            new L.marker([lat, lng]).addTo(myMap).bindPopup(`${this.props.address} </br>
            <button class="currentLocationBtn">Back to Current Location</button>`).openPopup()

            document.querySelector(".currentLocationBtn").addEventListener("click", function() {
                API.getUserLocation()
                .then(user => {
                    myMap.setView([user.location.lat, user.location.lng], 15);
                    L.circleMarker([user.location.lat, user.location.lng], {
                        color: 'red',
                        fillColor: '#f03',
                        fillOpacity: 0.5,
                        radius: 12
                    }).bindPopup("<h3>You are Here</h3>").addTo(myMap).openPopup();
                })
            })
            this.getUserAddress(myMap);
            this.addSpinToMap(myMap, lat, lng)
            this.addMoreScoots(API.getLyft, "Lyft", "red", myMap, lat, lng)
            this.addMoreScoots(API.getJump, "Jump", "yellow", myMap, lat, lng)
            this.addMoreScoots(API.getLime, "Lime", "green", myMap, lat, lng)
            this.addMoreScoots(API.getGotcha, "Gotcha", "grey", myMap, lat, lng)
            this.addMoreScoots(API.getBird, "Bird", "black", myMap, lat, lng)
        }
        else {
            navigator.geolocation.getCurrentPosition(user => {
                let lat = user.coords.latitude
                let lng = user.coords.longitude

                const myMap = L.map('map').setView([lat, lng], 15);

                L.tileLayer("https://api.mapbox.com/styles/v1/carlymita/cjwwjwccr51kh1cpcw995d56n/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiY2FybHltaXRhIiwiYSI6ImNqd3FoeHZtYjE5cjA0N21nMGhheGk4NXgifQ.jf0Z7pkxDwB17dk-2xPtFw", {
                    id: 'mapbox.streets',
                    maxZoom: 18,
                    accessToken: apiKeys.mapBoxToken
                }
                ).addTo(myMap);

                L.circleMarker([lat, lng], {
                    color: 'red',
                    fillColor: 'red'
                }).bindPopup("<h3>You are Here</h3>").addTo(myMap).openPopup().bringToFront();

                this.getUserAddress(myMap);
                this.addSpinToMap(myMap, lat, lng)
                this.addMoreScoots(API.getLyft, "Lyft", "red", myMap, lat, lng)
                this.addMoreScoots(API.getJump, "Jump", "yellow", myMap, lat, lng)
                this.addMoreScoots(API.getLime, "Lime", "green", myMap, lat, lng)
                this.addMoreScoots(API.getGotcha, "Gotcha", "grey", myMap, lat, lng)
                this.addMoreScoots(API.getBird, "Bird", "black", myMap, lat, lng)

                // myMap.on('zoom', function() {
                //     for (let i = 50; i < 800; i++) {
                //         $(`.leaflet-marker-icon:contains(${i})`).remove();
                //     }
                // })
            })
    }
}

    render() {
        return (
            <div>
                <div id="map"></div>
                <div id="sidebar">
                    <img src={spin} className="brandLogo" id="spinLogo" alt="spin-logo" onClick={this.filterSpin}></img>
                    <img src={jump} className="brandLogo" id="jumpLogo" alt="jump-logo" onClick={this.filterJump}></img>
                    <img src={lime} className="brandLogo" id="limeLogo" alt="lime-logo" onClick={this.filterLime}></img>
                    <img src={lyft} className="brandLogo" id="lyftLogo" alt="lyft-logo" onClick={this.filterLyft}></img>
                    <img src={bird} className="brandLogo" id="birdLogo" alt="bird-logo" onClick={this.filterBird}></img>
                    <img src={gotcha} className="brandLogo" id="gotchaLogo" alt="gotcha-logo" onClick={this.filterGotcha}></img>
                </div>
                <Footer />
            </div>
        )
    }
}

export default withRouter(ScootMap)