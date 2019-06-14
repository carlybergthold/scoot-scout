//function to call the Lyft API and mark their scooters on the map
addLyftToMap = (map, lat, lng) => {
    var orangeIcon = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    API.getLyft(lat, lng).then(r => {
        console.log("Lyft", r)
        r.forEach(scooter => {
            let lyftLat = scooter.gps_latitude;
            let lyftLng = scooter.gps_longitude;
            new L.marker([lyftLat, lyftLng], {icon: orangeIcon}).addTo(map).bindPopup(`<h1>Lyft Scooter</h1> <a href='https://www.google.com/maps/dir/?api=1&origin=${lat},${lng}&destination=${lyftLat},${lyftLng}&travelmode=walking' target='_blank'>Get Directions</a>`)
        });
    })
}

//function to call the Lime API and mark their scooters on the map
addLimeToMap = (map, lat, lng) => {
    var redIcon = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    API.getLime(lat, lng).then(r => {
        console.log("Lime", r)
        r.forEach(scooter => {
            let limeLat = scooter.gps_latitude;
            let limeLng = scooter.gps_longitude;
            new L.marker([limeLat, limeLng], {icon: redIcon}).addTo(map).bindPopup(`<h1>Lime Scooter</h1> <a href='https://www.google.com/maps/dir/?api=1&origin=${lat},${lng}&destination=${limeLat},${limeLng}&travelmode=walking' target='_blank'>Get Directions</a>`)
        });
    })
}

//function to call the Jump API and mark their scooters on the map
addJumpToMap = (map, lat, lng) => {
    var violetIcon = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    API.getJump(lat, lng).then(r => {
        console.log("Jump", r)
        r.forEach(scooter => {
            let jumpLat = scooter.gps_latitude;
            let jumpLng = scooter.gps_longitude;
            new L.marker([jumpLat, jumpLng], {icon: violetIcon}).addTo(map).bindPopup(`<h1>Jump Scooter</h1> <a href='https://www.google.com/maps/dir/?api=1&origin=${lat},${lng}&destination=${jumpLat},${jumpLng}&travelmode=walking' target='_blank'>Get Directions</a>`)
        });
    })
}