const request = require('request-promise-native');

const fetchMyIP = () => {
    return request('https://api.ipify.org?format=json');
}

const fetchCoordsByIP = (body) => {
    return request(`https://api.ipbase.com/v2/info?apikey=ogN5tuMHqZfxU761kE276yF8o6fJia6Plm2Cd175&language=en&ip=${JSON.parse(body).ip}`);
};

const fetchISSFlyOverTimes = (body) => {
    let parsedBody = JSON.parse(body);
    let location = parsedBody.data.location;
    return request(`https://iss-pass.herokuapp.com/json/?lat=${location.latitude}&lon=${location.longitude}`)
};

const nextISSTimesForMyLocation = () => {
    return fetchMyIP().then(fetchCoordsByIP).then(fetchISSFlyOverTimes).then(body => {
        return JSON.parse(body).response;
    });
}

module.exports = {
    fetchMyIP,
    fetchCoordsByIP,
    fetchISSFlyOverTimes,
    nextISSTimesForMyLocation,
}