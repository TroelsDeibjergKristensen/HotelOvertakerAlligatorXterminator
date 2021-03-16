console.log("Pretty Woman");

$(document).ready(function () {

	// initial state of the game
	let state = { hp: 100, xp: 0, score: 0 };


	let gameIsRunning = true;

	// the display that will show what happens
	const status = $('#status');
	const highScores = $('#highscores');

	console.log(highScores);

	status.html('Your status is now: ' + JSON.stringify(state));
	//`your hp is ${state.hp}, and ...`;


	const enterBtn = $('#enterBtn');
	const userInput = $('#userInput');

	$.ajax({
		type: "POST",
		url: "http://localhost:3000/highscores",
		dataType: "json"
	}).done(function (data) {
		setHighScores(data);
	});

	const setHighScores = (highscores) => {
		highScores.html(`<h3>Highscores</h3>`)

		highscores.forEach((element) => {
			console.log("gg");
			highScores.append(`<div>User: ${element.username}       Score: ${element.bestScore}</div>`);
		})
	}

	const quit = () => {
		$.ajax({
			type: "POST",
			url: "http://localhost:3000/highscores",
			dataType: "json",
			data: JSON.stringify({
				username: "Troels",
				bestScore: state.score
			}
			)
		}).done(function (data) {
			setHighScores(data);
		});

		status.html('You logged out!<br/>');
		status.append('HighScore: ...' + state.score); // to do
		gameIsRunning = false;
		enterBtn.disabled = true;
	}

	enterBtn.click(function () {
		status.html('Your status is now: ' + JSON.stringify(state));

		switch (userInput.val().toUpperCase()) {
			case 'QUIT': {
				quit();
			} break;
			case 'SEARCH': {
				let dice = Math.floor(Math.random() * 6) + 1;
				if (dice <= 3) {
					status.append('<br/>you found something...');
					dice = Math.floor(Math.random() * 6) + 1;
					if (dice == 1) {
						status.append('<br/>... a rosted chicken!');
						state.hp += Math.floor(Math.random() * 6) + 1;
					}
					if (dice == 2) {
						status.append('<br/>... some coins!');
						state.score += Math.floor(Math.random() * 6) + 1;
						state.xp += Math.floor(Math.random() * 6) + 1;
					}
					if (dice == 3) {
						status.append('<br/>... poisonous mushroom!');
						state.hp -= Math.floor(Math.random() * 6) + 1;
						state.xp += 1;
					}
				} else {
					status.innerHTML += '<br/>you found nothing.';
				}
			} break;
			case 'KILL': {
				let dice = Math.floor(Math.random() * 6) + 1;
				if (dice <= 2) {
					status.append('<br/>you killed a monster!');
					state.hp -= Math.floor(Math.random() * 6) + 1;
					state.xp += Math.floor(Math.random() * 6) + 1;
					state.score += Math.floor(Math.random() * 2);
				} else {
					status.append('<br/>you tried to kill a monster... no luck!');
				}
			} break;
			default: {
				status.append('<br/>...command not recognized...');
			}
		}
	});


});