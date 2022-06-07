const request = require("request");

const geoCode = (address, callback) => {
	const url =
		"https://api.mapbox.com/geocoding/v5/mapbox.places/" +
		encodeURIComponent(address) +
		".json?access_token=pk.eyJ1IjoicmFodWw3N2MiLCJhIjoiY2wxd2hkMmVtMDBvYzNqbGE5ZXlyMG0xeSJ9.ZrJO5WN_WBXBs2zQj0CNZQ&limit=1";

	request({ url: url, json: true }, (error, { body } = {}) => {
		if (error) {
			callback("Unable to connect to location service!");
		} else if (body.message || body.features.length === 0) {
			callback("Unable to find location. Try another search.");
		} else {
			const {
				center: [longitude, latitude],
				place_name: location,
			} = body.features[0];
			callback(undefined, {
				latitude,
				longitude,
				location,
			});
		}
	});
};

module.exports = geoCode;
