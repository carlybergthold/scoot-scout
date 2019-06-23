import React, { Component } from "react"
import { withRouter, Link } from "react-router-dom"
import markercluster from "leaflet.markercluster"
import L from 'leaflet'
import markers from "./Markers"


class MapTest extends Component {
    

    componentDidMount() {

        const markers = [

        {
            "name":"Goroka",
            "city":"Goroka, Papua New Guinea",
            "iata_faa":"GKA",
            "icao":"AYGA",
            "lat":-6.081689,
            "lng":145.391881,
            "alt":5282,
            "tz":"Pacific/Port_Moresby"
          },{
            "name":"Madang",
            "city":"Madang, Papua New Guinea",
            "iata_faa":"MAG",
            "icao":"AYMD",
            "lat":-5.207083,
            "lng":145.7887,
            "alt":20,
            "tz":"Pacific/Port_Moresby"
          },{
            "name":"Mount Hagen",
            "city":"Mount Hagen, Papua New Guinea",
            "iata_faa":"HGU",
            "icao":"AYMH",
            "lat":-5.826789,
            "lng":144.295861,
            "alt":5388,
            "tz":"Pacific/Port_Moresby"
          }
        ]



    const map = L.map( 'map', {
        center: [10.0, 5.0],
        minZoom: 2,
        zoom: 2
    });

    L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: ['a','b','c']
    }).addTo( map );

    var myIcon = L.icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
        iconSize: [29, 24],
        iconAnchor: [9, 21],
        popupAnchor: [0, -14]
    });

    var markerClusters = L.markerClusterGroup();

    for ( var i = 0; i < markers.length; ++i )
    {
        var popup = markers[i].name +
                    '<br/>' + markers[i].city +
                    '<br/><b>IATA/FAA:</b> ' + markers[i].iata_faa +
                    '<br/><b>ICAO:</b> ' + markers[i].icao +
                    '<br/><b>Altitude:</b> ' + Math.round( markers[i].alt * 0.3048 ) + ' m' +
                    '<br/><b>Timezone:</b> ' + markers[i].tz;

        var m = L.marker( [markers[i].lat, markers[i].lng], {icon: myIcon} )
                        .bindPopup( popup );

        markerClusters.addLayer( m );
    }

    map.addLayer( markerClusters );

    }

    render() {
        return(<div id="map"></div>)
    }
}

export default withRouter(MapTest)