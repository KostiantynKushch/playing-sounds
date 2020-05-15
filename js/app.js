'use strict';

const modes = document.querySelectorAll('.ba-mode');
const keys = document.querySelectorAll('.ba-key');
const play = document.querySelector('.ba-btn-play');





modes.forEach(mode => {

	playingSounds(true); //sounds workings by default

	mode.addEventListener('click', () => { //switching modes

		if (mode.checked == true) {
			if (mode.value === 'sandbox') {
				playingSounds(true);
				play.classList.add('ba-hidden');
			} else if (mode.value === 'record') {
				playingSounds(false);
				record();
				play.classList.remove('ba-hidden');

			}
		}
	});
});



let audioTrack = []; //stores audio track
function record() {
	writeToList();
}

play.addEventListener('click', () => {
	playTrack(audioTrack);
});


function writeToList() {
	window.addEventListener('keydown', recButtonSounds);
}


// play record from the list of tarck parts
async function playTrack(audioTrack) {
	for (let i = 0; i < audioTrack.length; i++) {
		const part = audioTrack[i];
		buttonSound(part);
		console.log(part);
		await sleep(part.duration); //pause between sounds
	}

}

//async timeout
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}



function playingSounds(check) {


	if (check === true) { //if true function will add event listener else - remove default eventListener
		window.addEventListener('keydown', buttonSound);

		keys.forEach(key => {
			key.addEventListener('transitionend', removeTransition);
		});
	} else {
		window.removeEventListener('keydown', buttonSound);
		return;
	}

}






//remove background opacity after finish of playing sound
function removeTransition(element) {
	if (element.propertyName !== 'background-color') {
		return;
	} else {
		this.classList.remove('ba-playing');
	}
}



function buttonSound(btn) {
	const key = document.querySelector(`.ba-key[data-key="${btn.keyCode}"]`);
	const audio = document.querySelector(`audio[data-key="${btn.keyCode}"]`);

	if (!audio) {
		return;
	}
	else {
		audio.currentTime = 0;
		audio.play();
		key.classList.add('ba-playing');
	}

}

let startTime, endTime, duration;

function recButtonSounds(btn) {
	const key = document.querySelector(`.ba-key[data-key="${btn.keyCode}"]`);
	const audio = document.querySelector(`audio[data-key="${btn.keyCode}"]`);

	if (!audio) {
		return;
	}
	else {
		audio.currentTime = 0;
		audio.play();
		key.classList.add('ba-playing');

		if (audioTrack.length < 1) {
			// start timer
			startTime = +new Date();
			console.log(startTime);
			// btn recordr with zero duration
			audioTrack.push({ 'keyCode': btn.keyCode, 'duration': 0 });
			console.log(audioTrack);
		} else {

			// timer stop
			endTime = +new Date();
			duration = endTime - startTime;
			console.log(duration);
			// record duration to prev trackPart
			audioTrack[audioTrack.length - 1].duration = duration;
			// timer start
			startTime = +new Date();
			// btn recordr with zero duration
			audioTrack.push({ 'keyCode': btn.keyCode, 'duration': 0 });
			console.log(audioTrack);
		}

	}

}

