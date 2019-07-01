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

    state = {
        showSpin: true,
        showJump: true,
        showLime: true,
        showLyft: true,
        showBird: true,
        showGotcha: true
    }

    apiCallsForScoots = () => {
        API.getJump().then(r => {
            this.setState({ jump: r})
        })
        API.getSpin().then(r => {
            this.setState({spin: r.data.bikes})
        })
        .then(() => {
            API.getLime().then(r => {
                this.setState({ lime: r})
            })
        })
        .then(() => {
            API.getLyft().then(r => {
                this.setState({ lyft: r})
            })
        })
        .then(() => {
            API.getBird().then(r => {
                this.setState({ bird: r})
            })
        })
        .then(() => {
            API.getGotcha().then(r => {
                this.setState({ gotcha: r})
            })
        })
    }

    filterSpin = () => {
        this.setState(state => ({ showSpin: !state.showSpin }));

        const clusters = document.querySelectorAll(`.spinCluster`)
        const logo = document.querySelector(`#spinLogo`)
        const icons = document.querySelectorAll(`.spinIcon`)

        for (let i = 0; i < clusters.length; i++) {
            if (this.state.showSpin) {
                clusters[i].classList.remove("hidden");
                logo.style.opacity = 1;
            } else {
                clusters[i].classList.add("hidden");
                logo.style.opacity = 0.5;
            }
        }

        for (let i = 0; i < icons.length; i++) {
            if (this.state.showSpin) {
                icons[i].classList.remove("hidden");
                logo.style.opacity = 1;
            } else {
                icons[i].classList.add("hidden");
                logo.style.opacity = 0.5;
            }
        }
    }

    filterLyft = () => {
        this.setState(state => ({ showLyft: !state.showLyft }));

        const clusters = document.querySelectorAll(`.LyftCluster`)
        const logo = document.querySelector(`#lyftLogo`)
        const icons = document.querySelectorAll(`.LyftIcon`)

        for (let i = 0; i < clusters.length; i++) {
            if (this.state.showLyft) {
                clusters[i].classList.remove("hidden");
                logo.style.opacity = 1;
            } else {
                clusters[i].classList.add("hidden");
                logo.style.opacity = 0.5;
            }
        }

        for (let i = 0; i < icons.length; i++) {
            if (this.state.showLyft) {
                icons[i].classList.remove("hidden");
                logo.style.opacity = 1;
            } else {
                icons[i].classList.add("hidden");
                logo.style.opacity = 0.5;
            }
        }
    }

    filterLime = () => {
        this.setState(state => ({ showLime: !state.showLime }));

        const clusters = document.querySelectorAll(`.LimeCluster`)
        const logo = document.querySelector(`#limeLogo`)
        const icons = document.querySelectorAll(`.LimeIcon`)

        for (let i = 0; i < clusters.length; i++) {
            if (this.state.showLime) {
                clusters[i].classList.remove("hidden");
                logo.style.opacity = 1;
            } else {
                clusters[i].classList.add("hidden");
                logo.style.opacity = 0.5;
            }
        }

        for (let i = 0; i < icons.length; i++) {
            if (this.state.showLime) {
                icons[i].classList.remove("hidden");
                logo.style.opacity = 1;
            } else {
                icons[i].classList.add("hidden");
                logo.style.opacity = 0.5;
            }
        }
    }

    filterJump = () => {
        this.setState(state => ({ showJump: !state.showJump }));

        const clusters = document.querySelectorAll(`.JumpCluster`)
        const logo = document.querySelector(`#jumpLogo`)
        const icons = document.querySelectorAll(`.JumpIcon`)

        for (let i = 0; i < clusters.length; i++) {
            if (this.state.showJump) {
                clusters[i].classList.remove("hidden");
                logo.style.opacity = 1;
            } else {
                clusters[i].classList.add("hidden");
                logo.style.opacity = 0.5;
            }
        }

        for (let i = 0; i < icons.length; i++) {
            if (this.state.showJump) {
                icons[i].classList.remove("hidden");
                logo.style.opacity = 1;
            } else {
                icons[i].classList.add("hidden");
                logo.style.opacity = 0.5;
            }
        }
    }

    filterBird = () => {
        this.setState(state => ({ showBird: !state.showBird }));

        const clusters = document.querySelectorAll(`.BirdCluster`)
        const logo = document.querySelector(`#birdLogo`)
        const icons = document.querySelectorAll(`.BirdIcon`)

        for (let i = 0; i < clusters.length; i++) {
            if (this.state.showBird) {
                clusters[i].classList.remove("hidden");
                logo.style.opacity = 1;
            } else {
                clusters[i].classList.add("hidden");
                logo.style.opacity = 0.5;
            }
        }

        for (let i = 0; i < icons.length; i++) {
            if (this.state.showBird) {
                icons[i].classList.remove("hidden");
                logo.style.opacity = 1;
            } else {
                icons[i].classList.add("hidden");
                logo.style.opacity = 0.5;
            }
        }
    }

    filterGotcha = () => {
        this.setState(state => ({ showGotcha: !state.showGotcha }));

        const clusters = document.querySelectorAll(`.GotchaCluster`)
        const logo = document.querySelector(`#gotchaLogo`)
        const icons = document.querySelectorAll(`.GotchaIcon`)

        for (let i = 0; i < clusters.length; i++) {
            if (this.state.showGotcha) {
                clusters[i].classList.remove("hidden");
                logo.style.opacity = 1;
            } else {
                clusters[i].classList.add("hidden");
                logo.style.opacity = 0.5;
            }
        }

        for (let i = 0; i < icons.length; i++) {
            if (this.state.showGotcha) {
                icons[i].classList.remove("hidden");
                logo.style.opacity = 1;
            } else {
                icons[i].classList.add("hidden");
                logo.style.opacity = 0.5;
            }
        }
    }


    addSpinToMap = (map, lat, lng) => {
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
            popupFormat: ({ result }) => `<div style='width: 10rem'>${result.label} ${popupText}</div>`,
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
        //if coming from the saved locations page
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

            const violetIcon = new L.Icon({
                iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });

            new L.marker([lat, lng], {icon: violetIcon}).addTo(myMap).bindPopup(`<div style='width: 10rem'>${this.props.address} </br>
            <button class="currentLocationBtn">Back to Current Location</button></div>`).openPopup()

            this.getUserAddress(myMap);
            this.addSpinToMap(myMap, lat, lng)
            this.addMoreScoots(API.getLyft, "Lyft", "yellow", myMap, lat, lng)
            this.addMoreScoots(API.getJump, "Jump", "red", myMap, lat, lng)
            this.addMoreScoots(API.getLime, "Lime", "green", myMap, lat, lng)
            this.addMoreScoots(API.getGotcha, "Gotcha", "grey", myMap, lat, lng)
            this.addMoreScoots(API.getBird, "Bird", "black", myMap, lat, lng)

            document.querySelector(".currentLocationBtn").addEventListener("click", function() {
                navigator.geolocation.getCurrentPosition(user => {
                    myMap.setView([user.coords.latitude, user.coords.longitude], 16);
                    L.circleMarker([user.coords.latitude, user.coords.longitude], {
                        color: 'red',
                        fillColor: '#f03',
                        fillOpacity: 0.5,
                        radius: 12
                    }).bindPopup("<h3>You are Here</h3>").addTo(myMap).openPopup();
                })
            })
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
                }).bindPopup("<h3>You are Here</h3>").addTo(myMap).openPopup();

                this.getUserAddress(myMap);
                this.addSpinToMap(myMap, lat, lng)
                this.addMoreScoots(API.getLyft, "Lyft", "yellow", myMap, lat, lng)
                this.addMoreScoots(API.getJump, "Jump", "red", myMap, lat, lng)
                this.addMoreScoots(API.getLime, "Lime", "green", myMap, lat, lng)
                this.addMoreScoots(API.getGotcha, "Gotcha", "grey", myMap, lat, lng)
                this.addMoreScoots(API.getBird, "Bird", "black", myMap, lat, lng)
            })
        }
    }

    render() {
        return (
            <div id="mapContainer">
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