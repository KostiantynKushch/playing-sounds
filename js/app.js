'use strict';

const modes = document.querySelectorAll('.ba-mode');
const keys = document.querySelectorAll('.ba-key');




modes.forEach(mode => {

	playingSounds(true); //sounds workings by default

	mode.addEventListener('click', () => { //switching modes

		if (mode.checked == true) {
			if (mode.value === 'sandbox') {
				playingSounds(true);
			} else if (mode.value === 'record') {
				playingSounds(false);
				record();
			}
		}
	});
});



function record() {

	let audioTrack = [{ 'keyCode': 71, 'duration': 150 }, { 'keyCode': 72, 'duration': 500 }, { 'keyCode': 74, 'duration': 1000 }];

	playTrack(audioTrack);


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