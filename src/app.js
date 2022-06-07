const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geoCode = require("./utils/geocode");

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
	res.render("index", {
		title: "Weather App",
		name: "Rahul Choudhary",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About",
		name: "Rahul Choudhary",
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		title: "Help",
		name: "Rahul Choudhary",
		helpText: "Visit xyz.com for more information",
	});
});

app.get("/weather", (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: "You must provide an address!",
		});
	}

	geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({ error });
		}

		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({ error });
			}
			res.send({ location, forecast: forecastData, address: req.query.address });
		});
	});
});

app.get("/products", (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: "You must provide a search term.",
		});
	}
	res.send({
		products: [],
	});
});

app.get("/help/*", (req, res) => {
	res.render("404", {
		title: "404",
		errorMessage: "Help article not found.",
		name: "Rahul Choudhary",
	});
});

app.get("*", (req, res) => {
	res.render("404", {
		title: "404",
		errorMessage: "Page not found.",
		name: "Rahul Choudhary",
	});
});

app.listen(8080, () => {
	console.log("Server is up and running on 8080.");
});
