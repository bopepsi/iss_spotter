//todo - Contains most of the logic for fetching the data from each API endpoint.
const request = require('request');


/*
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function (callback) {
    //* use request to fetch IP address from JSON API
    request('https://api.ipify.org?format=json', (error, response, body) => {

        // inside the request callback ...
        // error can be set if invalid domain, user is offline, etc.
        if (error) {
            callback(error, null);
            return;
        }
        // if non-200 status, assume server error
        if (response.statusCode !== 200) {
            const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
            callback(Error(msg), null);
            //? The Error(...) part is something we haven't seen before. Just know that it creates a new Error object that we can pass around. In this case, we pass it back to the callback to indicate that something went wrong.
            return;
        }
        // if we get here, all's well and we got the data
        let ip = JSON.parse(body).ip;
        callback(null, ip);
    })

};

const fetchCoordsByIP = (ip, callback) => {
    request(`https://api.ipbase.com/v2/info?apikey=ogN5tuMHqZfxU761kE276yF8o6fJia6Plm2Cd175&language=en&ip=${ip}`, (error, response, body) => {
        if (error) {
            callback(error, null);
            return;
        }
        if (response.statusCode !== 200) {
            const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
            callback(Error(msg), null);
            return;
        }
        let parsedBody = JSON.parse(body);
        let location = parsedBody.data.location;
        const { latitude, longitude } = location;
        callback(error, { latitude, longitude });
    })
};

const fetchISSFlyOverTimes = function (coords, callback) {
    request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
        if (error) {
            callback(error, null);
        };
        if (response.statusCode !== 200) {
            const msg = `Status Code ${response.statusCode} when fetching ISS data. Response: ${response}`;
            callback(Error(msg), null);
            return;
        };
        callback(null, JSON.parse(body).response);
    })
};

const nextISSTimesForMyLocation = function (callback) {
    fetchMyIP((error, ip) => {
        if (error) {
            return callback(error, null);
        }

        fetchCoordsByIP(ip, (error, loc) => {
            if (error) {
                return callback(error, null);
            }

            fetchISSFlyOverTimes(loc, (error, nextPasses) => {
                if (error) {
                    return callback(error, null);
                }

                callback(null, nextPasses);
            });
        });
    });
};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };