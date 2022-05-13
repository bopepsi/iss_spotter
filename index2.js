const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss_promised');

// fetchMyIP()
//     .then(fetchCoordsByIP)
//     .then(fetchISSFlyOverTimes)
//     .then(body=>console.log(JSON.parse(body).response));

nextISSTimesForMyLocation()
    .then(data => console.log(data))
    // .catch((error) => console.log("It didn't work: ", error.message));