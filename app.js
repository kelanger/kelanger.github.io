const startButton = document.getElementsByClassName("btn__reset")[0];
const overlay = document.getElementById("overlay");
const qwerty = document.getElementById("qwerty");
const phraseId = document.getElementById("phrase");
const scoreboard = document.getElementsByClassName("tries");
const phrases = ["Cow jumped over the moon",
					"Like a big pizza pie",
					"Part of your world",
					"Let it go",
					"Live long and prosper",
					"Luke I am your father",
					"But her emails",
					"I can not do that Dave"
					]; 
let missed = 0;
let letterFound;


// Create random phrase
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getRandomPhraseArray (arr) {
	let phrasesNum = getRandomInt(phrases.length);
	return phrases[phrasesNum].split("");
}


// Initiate and reset game
function playGame() {
	missed = 0;
	phraseId.removeChild(phraseId.firstElementChild);
	phraseId.appendChild(document.createElement("ul"));
	let randomWord = getRandomPhraseArray(phrases);
	addPhraseToDisplay(randomWord);
	let chosen = document.getElementsByClassName("chosen");
	while (chosen.length){
		chosen[0].disabled = false;
		chosen[0].className = "";
	}
	for (i = 0; i < scoreboard.length; i ++) {
		scoreboard[i].innerHTML = '<img src="images/liveHeart.png" height="35px" width="35px">';
	}
	overlay.style.display = "none";
}

function addPhraseToDisplay(arr) {
	for (i = 0; i < arr.length; i++) {
		let li = document.createElement("li");
		li.innerHTML = arr[i];
		if (arr[i] === " ") {
			li.className = "space";
		} else {
			li.className = "letter";
		}
		phraseId.firstElementChild.appendChild(li);
	}
}


// Check user selection and phrase
function checkLetter(button) {
	let chosen = document.getElementsByClassName("letter");
	let wasLetterFound = false;
	for (i = 0; i < chosen.length; i ++) {
		if (chosen[i].textContent.toLowerCase() === button.textContent) {
			chosen[i].classList.toggle("show");
			wasLetterFound = true;
		}
	}
	if (wasLetterFound) {
		return button.textContent;
	} else {
		return null;
	}
}


// Check for win or lose conditions
function checkWin () {
	const title = document.getElementsByClassName("title")[0];
	const show = document.getElementsByClassName("show");
	const letter = document.getElementsByClassName("letter");
	if (missed >= 5) {
		overlay.style.display = "flex";
		title.textContent = "Sorry, but you lost.";
		overlay.className = "lose";
	} else if (letter.length === show.length) {
		overlay.style.display = "flex";
		title.textContent = "Congratulations, you won!";
		overlay.className = "win";
	}
}


// Event Listeners
startButton.addEventListener("click", () => {
	playGame();
	});

qwerty.addEventListener("click", (e) => {
	if (e.target.tagName === 'BUTTON') {
		e.target.className = "chosen";
		letterFound = checkLetter(e.target);
		e.target.disabled = true;
		if (!letterFound) {
			scoreboard[missed].innerHTML = '<img src="images/lostHeart.png" height="35px" width="35px">';
			missed ++;
		}
		checkWin();
	}
	});