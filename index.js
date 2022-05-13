//todo - Require and run our main fetch function.

const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require("./iss");

fetchMyIP((err, ip) => {
    if (err) {
        console.log("It didn't work!", error);
        return;
    }

    console.log('It worked! Returned IP:', ip);
    fetchCoordsByIP(ip, (err, latAndLongData) => {
        if (err) {
            console.log("Fetching Lat and Long didn't work!", error);
            return;
        }

        console.log('It worked! Returned Lat&Long:', latAndLongData);
        fetchISSFlyOverTimes(latAndLongData, (err, data) => {
            if (err) {
                console.log("Fetching ISS data didn't work!", error);
                return;
            }

            console.log('It worked! Returned data:', data);
        });
    });

})