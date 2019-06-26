import apiKeys from "./apiKeys";

const API = {
    multibike: (lat, lng) => {
        return fetch(`https://api.multicycles.org/v1?access_token=${apiKeys.multiCycles}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: `{"query":"query ($lat: Float!, $lng: Float!) {vehicles(lat: $lat, lng: $lng) {id,type,attributes,lat,lng,battery,provider{name}}}","variables":{"lat":${lat},"lng":${lng}}}`
        })
            .then(e => e.json())
    },
    getUserLocation: () => {
        return fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${apiKeys.googleKey}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify()
        })
            .then(e => e.json())
    },
    getgetBird: (lat, lng) => {
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
    post: (path, object) => {
        return fetch(`http://localhost:8088/${path}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(object)
            })
            .then(response => response.json());
    },
    delete: (path, id) => {
        return fetch(`http://localhost:8088/${path}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            }
            })
    },
    get: (path, id) => {
        return fetch(`http://localhost:8088/${path}/${id}`)
            .then(response => response.json());
    },
    getLocations: (id) => {
        return fetch(`http://localhost:8088/users/${id}?_embed=savedLocations`)
            .then(response => response.json());
    },
    getUsername: (id) => {
        return fetch(`http://localhost:8088/users/${id}`)
            .then(response => response.json());
    },
    getLime: () => {
        return fetch("https://data.nashville.gov/resource/ntar-zcjt.json")
                    .then(w => w.json())
    },
    getJump: () => {
        return fetch("https://data.nashville.gov/resource/jwwr-v4rf.json")
                    .then(w => w.json())
    },
    getLyft: () => {
        return fetch("https://data.nashville.gov/resource/bmb2-fucd.json")
                    .then(w => w.json())
    },
    getGotcha: () => {
        return fetch("https://data.nashville.gov/resource/anqi-zsnc.json")
                    .then(w => w.json())
    },
    getBird: () => {
        return fetch("https://data.nashville.gov/resource/nar3-8j89.json")
        .then(w => w.json())
    },
    getSpin: () => {
        return fetch("https://web.spin.pm/api/gbfs/v1/nashville/free_bike_status")
        .then(w => w.json())
    }
}

export default API

