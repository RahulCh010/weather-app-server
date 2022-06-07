fetch("https://puzzle.mead.io/puzzle").then((response) => {
	response.json().then((data) => {
		console.log(data);
	});
});

const weatherForm = document.querySelector("form");
const searchInput = document.querySelector("input");
const messageOne = document.getElementById("messageOne");
const messageTwo = document.getElementById("messageTwo");

weatherForm.addEventListener("submit", (event) => {
	event.preventDefault();

	const location = searchInput.value;
	messageOne.style.color = "#888888";
	messageOne.textContent = "Loading...";
	messageTwo.style.color = "#888888";
	messageTwo.textContent = "";

	fetch("http://localhost:8080/weather?address=" + location)
		.then((response) => {
			response.json().then((data) => {
				if (data.error) {
					messageOne.style.color = "red";
					messageOne.textContent = data.error;
				} else {
					messageOne.textContent = data.location;
					messageTwo.textContent = data.forecast;
				}
			});
		})
		.catch((error) => {
			messageOne.textContent = error;
		});
});
