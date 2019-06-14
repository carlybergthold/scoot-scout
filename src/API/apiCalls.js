import apiKeys from "./apiKeys";

const API = {
    // multibike: () => {
    //     require('isomorphic-fetch');
    //     fetch('https://api.multicycles.org/v1', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ query: "query ($lat: Float!, $lng: Float!) {\n  vehicles(lat: $lat, lng: $lng) {\n\t\tid\n  }\n}","variables":{"lat":48.856614,"lng":2.352222}
    //     })
    //     .then(res => res.json())
    //     .then(res => console.log(res.data))
    // },
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
    getLime: () => {
        return fetch('https://cors-anywhere.herokuapp.com/https://web-production.lime.bike/api/rider/v1/views/map?ne_lat=36.130159&ne_lng=-86.775379&sw_lat=36.130159&sw_lng=-86.775379&user_latitude=36.130159&user_longitude=-86.775379&zoom=16', {
            cookie: "_limebike-web_session=QW00WEkrVUc2VjREc0U0bzFOcitSaldHS2hHYnc5SUxQNVhMa09qdkZGQkhFWkd1WVNuSU8rMmJvZlFZejV3Q1RRQlRrbGdYZGtrL05PSzhxSGR3eU5IaDdodDBPd3ZDSmZ1ZUY5MzlxYWtTMkV5bFl0VXpuM21qSGxLbzJVMEU0SzNSMXE5OWE3Q3ZlSmdRR3N2ZjZKSmtSVkRaYVNOKzBLcG9PUFhHc0ZjNzlrb0VSR2hPUG80dWxYYndYcWc5cGlZRjM3UUdETjRBYzdwU3lCVDdaeE9aQkRFdmlqVW96Z3N6VGZzQlgwRGo4b1NxSkpEQllPUUkyUGhZbytqZ01UbE5ISXZqYWdsc3NKeUNKU1VXb0JtUUVQbnBXNmVYOFV6ckpZNWkrOVhYNFBhZjByUEdkZ1FDV0F6ckdTUFp6K1BraUxIWkVqemg5Ry90aXRsQ2Y1ckhBdWJ6aHo0TEpWdlV3VlNycUIvYmdZY1R3YmsrQlgyNmVqK2ZMV1hGTkNlL3cyTndVYjh1cGlIdzVKcVlraHpLeFN5emlEZVVZRCtBVExOMnNXdz0tLWJUR09iSVRsc0FVb0NzZWk4bHdUdEE9PQ%3D%3D--eac3795b4739c19809b3fb4105b1ca439a863a23",
            headers: {
                "Authorization":  `${apiKeys.limeKey}`
            }
        })
                    .then(w => w.json())
                    .then(r => console.log(r))
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

