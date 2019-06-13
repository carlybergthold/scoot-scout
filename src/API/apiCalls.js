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
    //opendata might show all scooters even if not free/charged
    getLime: () => {
        return fetch("https://data.nashville.gov/resource/ntar-zcjt.json")
                    .then(w => w.json())
    },
    //opendata might show all scooters even if not free/charged
    getJump: () => {
        return fetch("https://data.nashville.gov/resource/jwwr-v4rf.json")
                    .then(w => w.json())
    },
    //opendata might show all scooters even if not free/charged
    getLyft: () => {
        return fetch("https://data.nashville.gov/resource/bmb2-fucd.json")
                    .then(w => w.json())
    },
    getSpin: () => {
        return fetch("https://web.spin.pm/api/gbfs/v1/nashville/free_bike_status")
        .then(w => w.json())
    }
}

export default API

