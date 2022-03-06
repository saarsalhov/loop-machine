let allAudios = document.getElementsByClassName("allAudios");
let allSongsEndTimeObject = document.getElementsByClassName("endTime");
let allSongsCurrentTimeObject = document.getElementsByClassName("time");
let allPlayButtons = document.getElementsByClassName("playButton");
let allPauseButtons = document.getElementsByClassName("pauseButton");
let allSeeksSliders = document.getElementsByClassName("progress_bar")
let allSongs = document.getElementsByClassName("songs");
let allMuteToggleCheckbox = document.getElementsByClassName("muteAudio");
let allMuteText = document.getElementsByClassName("muteText");
let playAll = document.getElementById("playAll");
let pauseAll = document.getElementById("pauseAll");
let checkbox = document.getElementById("loopCheckbox");
let loopText = document.getElementById("loopText");


window.onload = function() {
    for (let i = 0; i < allSongs.length ; i++) {
        let music = new Audio(allSongs.item(i).src);
        let seeker = allSeeksSliders.item(i);
        let playButton = allPlayButtons.item(i);
        let pauseButton = allPauseButtons.item(i);
        let muteButton = allMuteToggleCheckbox.item(i);
        let muteText = allMuteText.item(i);

        //Play all channels event

        playAll.addEventListener('click', () => {
            if(music.muted === false){
                playButton.click();
            }
        });

        //Pause all channels event

        pauseAll.addEventListener('click', () => {
            pauseButton.click();
            music.currentTime = 0;
        });

        //Event for loop toggle button

        checkbox.addEventListener('click', () => {
            if (checkbox.checked) {
                music.loop = true;
                loopText.innerHTML = "Click to disable loop";
            }
            else {
                music.loop = false;
                loopText.innerHTML = "Click to enable loop";
            }
        });

        //event for moving the seeker

        music.addEventListener('timeupdate', () => {
            seeker.value = music.currentTime / music.duration * 100;
        });

        // Allow seeking
        seeker.addEventListener('input', (e) => {
            music.currentTime = e.target.value / 100 * music.duration;
        });

        //Event to play button of specific channel

        playButton.addEventListener('click', () => {
            music.play();

            setInterval(function() {
                let timeRemaining = music.currentTime;
                let minutes = Math.floor(timeRemaining / 60);
                let seconds = Math.floor(timeRemaining % 60);
                let secondsWithLeadingZero = seconds < 10 ? '0' + seconds : seconds;

                allSongsCurrentTimeObject.item(i).textContent = (minutes + ':' + secondsWithLeadingZero);
            }, 500);
        });

        //Event to pause button of specific channel

        pauseButton.addEventListener('click', () => {
            music.pause();
        })

        //Event to mute toggle of specific channel
        muteButton.addEventListener('click', () => {
            if(music.muted === false){
                music.muted = true;
                muteText.innerHTML = "Click to unmute";
            }
            else {
                music.muted = false;
                muteText.innerHTML = "Click to mute";
            }
        });

        //Set the duration time of all the channels

        let timeOfSong = allAudios.item(i).duration;
        let minutes = Math.floor(timeOfSong / 60);
        let seconds = Math.floor(timeOfSong % 60);

        allSongsEndTimeObject.item(i).textContent = (minutes + ':' + seconds);
    }
}


