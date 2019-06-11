import apiKeys from "./apiKeys";

const API = {
    getUserLocation: () => {
        return fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${apiKeys.googleKey}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify()
        })
            .then(e => e.json())
    },
    getBird: (lat, lng) => {
        return fetch(`https://api.bird.co/bird/nearby?latitude=${lat}&longitude=${lng}&radius=1000`, {
                    headers: {
                        "Authorization":  `${apiKeys.birdToken}`,
                        "Device-id": `${apiKeys.birdDeviceId}`,
                        "App-Version": "3.0.5",
                        "Location": `{"latitude":${lat},"longitude":${lng}}`
                    }
        })
                    .then(w => w.json())
    },
    getLime: (lat, lng) => {
        return fetch(`http://localhost:6060/api/lime/v1/views/map?ne_lat=${lat}&ne_lng=${lng}&sw_lat=${lat}&sw_lng=${lng}&user_latitude=${lat}&user_longitude=${lng}&zoom=16`, {
                    headers: {"Authorization":  `${apiKeys.limeKey}`, "Content-Type": "application/json"},
                    credentials: 'include'
        })
                    .then(w => w.json())
    },
    getSpin: () => {
        return fetch("https://web.spin.pm/api/gbfs/v1/nashville/free_bike_status")
        .then(w => w.json())
    }
}

export default API