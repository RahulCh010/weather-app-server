const request = require("request");

// f64ac2ca328acb0264a76bed634c061f
const forecast = (latitude, longitude, callback) => {
	const url = "http://api.weatherstack.com/current?access_key=69ce258c6931d95372cff1c3d41bdca6&query=" + latitude + "," + longitude;

	request({ url, json: true }, (error, { body } = {}) => {
		if (error) {
			callback("Unable to connect to weather service!");
		} else if (body.error) {
			callback(body.error.info);
		} else {
			const { temperature, precip, weather_descriptions } = body.current;
			callback(
				undefined,
				`${weather_descriptions[0]}. It is currently ${temperature} degrees out. There is a ${precip * 100}% chance of rain.`
			);
		}
	});
};

module.exports = forecast;
