// CURRENCY CONVERTER API..............................

const from_select = document.querySelector("#from-curr");
const to_select = document.querySelector("#to-curr");
const allSelect = document.querySelectorAll("select");
const amount = document.querySelector("#amount");
const btn = document.querySelector("button");
const disabledInput = document.querySelector("#disabled");
const mode = document.querySelector(".mode");

for (const selecElement of allSelect) {
	for (const key in countryList) {
		const option = document.createElement("option");
		option.value = key;
		option.textContent = key;
		if (selecElement.name === "from-curr" && key === "USD") {
			option.selected = "selected";
		} else if (selecElement.name === "to-curr" && key === "INR") {
			option.selected = "selected";
		}
		selecElement.appendChild(option);
	}
}

allSelect.forEach((selectElement) => {
	selectElement.addEventListener("change", (e) => {
		const selected = e.target.value;
		const newsrc = `https://flagsapi.com/${countryList[selected]}/flat/64.png`;
		selectElement.parentElement.querySelector("img").src = newsrc;
	});
});

btn.addEventListener("click", () => {
	document.querySelector(".loadera").style.display = "block";
	document.querySelector(".ppp").style.display = "flex";
	document.querySelector(".converter").classList.add("animation");
	btn.disabled = true;
	btn.style.color = "#828ef8";

	const fromSelectVal = from_select.value;
	const toSelectVal = to_select.value;
	if (fromSelectVal == toSelectVal) {
		document.querySelector(".err-msg").innerText =
			"Not Converting... Both Currencies Are Same !";
		document.querySelector(".loadera").style.display = "none";
		document.querySelector(".ppp").style.display = "none";
		btn.disabled = false;
		btn.style.color = "#fff";
		setTimeout(() => {
			document.querySelector(".err-msg").innerText = "";
			document.querySelector(".converter").classList.remove("animation");
		}, 3000);
	}
	let amountval = Number(amount.value);
	if (amountval < 1) {
		amount.value = 1;
		amountval = 1;
	}

	const url = `https://currency-exchange.p.rapidapi.com/exchange?from=${fromSelectVal}&to=${toSelectVal}`;
	// const url = `https://cdn.jsdeliver.net/gh/fawazahmed0/currency-api@1/latest/${fromSelectVal}/${toSelectVal}/json`;

	const options = {
		method: "Get",
		headers: {
			"X-RapidAPI-Key": "a23bfcd749msheab360a7f47b447p169793jsnaa4b28a51c77",
			"X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
		},
	};

	fetch(url, options)
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			document.querySelector(".loadera").style.display = "none";
			document.querySelector(".ppp").style.display = "none";
			btn.disabled = false;
			btn.style.color = "#fff";
			document.querySelector(".converter").classList.remove("animation");

			let disableVal = Math.round(data * amountval).toLocaleString();
			if (disableVal == 0 || disableVal < 0 || disableVal === NaN) {
				disableVal = "Not Reliable to Convert in ";
			}
			// disabledInput.value = disableVal + " " + toSelectVal;
			disabledInput.value = `${amountval} ${fromSelectVal} = ${disableVal} ${toSelectVal}`;
			document.querySelector(".err-msg").innerText = "Converted Successfully .";
			document.querySelector(".err-msg").classList.add("green");
			setTimeout(() => {
				document.querySelector(".err-msg").classList.remove("green");
				document.querySelector(".err-msg").innerText = "";
			}, 3000);
		})
		.catch((err) => {
			console.log(err.message);
			setTimeout(() => {
				document.querySelector(".err-msg").innerText = "Something went Wrong !";
				document.querySelector(".loadera").style.display = "none";
				document.querySelector(".ppp").style.display = "none";
				btn.disabled = false;
				btn.style.color = "#fff";
				document.querySelector(".converter").classList.remove("animation");
			}, 1000);
			setTimeout(() => {
				document.querySelector(".err-msg").innerText = "";
			}, 4000);
		});
});

mode.addEventListener("click", () => {
	if (document.querySelector(".mode p").innerText == "Dark Mode") {
		document.querySelector(".mode p").innerText = "Light Mode";
		document.body.style.backgroundColor = "#031D2E";
		document.querySelector(".converter").style.marginTop = "70px";
		document.querySelector(".converter").style.boxShadow =
			"0px 0px 5px 2px #ff7010";
		document.querySelector("header").style.boxShadow = "0px 1px 2px #ff7010";
		document.querySelector(".converter").style.backgroundColor = "#031a29";
		document.querySelectorAll("h2").forEach((element) => {
			element.style.color = "#fff";
		});
		document.querySelectorAll("span").forEach((element) => {
			element.style.color = "#fff";
		});
		document.querySelectorAll(".right select").forEach((element) => {
			element.style.backgroundColor = "#031D2E";
			element.style.color = "#fff";
		});
		document.querySelector(".select-container .from-select").style.border =
			"2px solid gray";
		document.querySelector(".select-container .to-select").style.border =
			"2px solid gray";
		document.querySelector(".logo h1").style.color = "#fff";
		document.querySelector(".mode p").style.color = "#fff";
		document.querySelector(".mode img").src = "/assets/svg/nightmode.svg";
		document.querySelector(".convert-sign img").src =
			"/assets/svg/whiteExchange.svg";
		document.querySelector("#disabled").style.backgroundColor = "#020e17";
		document.querySelector("#disabled").style.border = "1px solid gray";
		document.querySelector(".right label").style.color = "#fff";
		document.querySelector(".right input").style.backgroundColor = "#031D2E";
		document.querySelector(".right input").style.border = "1px solid gray";
		document.querySelector(".right input").style.color = "#fff";
		document.querySelector(".right h2").style.borderBottom =
			"2px solid #ff7010";
		const img = document.querySelector(".left img");
		img.src = "/assets/img/convert_BTC_1200x675_EN.jpg";
		img.style.height = "46%";
		img.style.width = "90%";
		img.style.marginTop = "30px";
	} else {
		document.querySelector(".mode p").innerText = "Dark Mode";
		document.querySelectorAll("h2").forEach((element) => {
			element.style.color = "#ff7010";
			document.body.style.backgroundColor = "#fff";
			document.querySelector(".converter").style.marginTop = "20px";
			document.querySelector(".converter").style.boxShadow =
				"0px 0px 10px 0px rgb(255, 255, 255)";
			document.querySelector(".converter").style.backgroundColor = "#efeaea";
			document.querySelectorAll("span").forEach((element) => {
				element.style.color = "#ff7010";
			});
			document.querySelectorAll(".right select").forEach((element) => {
				element.style.backgroundColor = "#efeaea";
				element.style.color = "#212121";
			});
			document.querySelector(".select-container .from-select").style.border =
				"1px solid #ff7010";
			document.querySelector(".select-container .to-select").style.border =
				"1px solid #ff7010";

			document.querySelector("#disabled").style.backgroundColor = "#dbd9d9";
			document.querySelector("#disabled").style.border = "1px solid #ff7010";
			document.querySelector(".right label").style.color = "#ff7010";
			document.querySelector(".right input").style.background = "transparent";
			document.querySelector(".right input").style.border = "1px solid #ff7010";
			document.querySelector(".right input").style.color = "#000";
			document.querySelector(".right h2").style.borderBottom =
				"2px solid #ff7010";
			document.querySelector(".logo h1").style.color = " #ff7010";
			document.querySelector(".mode p").style.color = "#000";
			document.querySelector(".mode img").src = "/assets/svg/darkmode.svg";
			document.querySelector(".convert-sign img").src =
				"/assets/svg/exchange-svgrepo-com.svg";
			const img = document.querySelector(".left img");
			img.src =
				"./assets/img/currency-exchange-money-conversion-euro-600nw-1919947535.webp";
			img.style.height = "auto";
			img.style.width = "200px";
			img.style.margin = "10px 0px";
		});
	}
});
