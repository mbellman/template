var assets = {
    graphics: [
        // './images/filename.png'
    ],

    sounds: [
        // ['name', 'path.mp3']
    ],

    videos: [
    ]
}


// ----------------
// Image preloading
// ----------------
var preloadedImages = [];

function preloadImages(imageArray, callback) {
    var totalImages = imageArray.length;
    var loadCount = 0;

    // Any setup code goes here

    for(var i = 0 ; i < totalImages ; i++) {
        var img = new Image();
        img.src = imageArray[i];

        preloadedImages.push(img);

        img.onload = function() {
            loadCount++;

            // Update preloader indicator

            if(loadCount == totalImages) {
                callback();
            }
        }

        img.onerror = function() {
            console.log(img.src);

            loadCount++;

            if(loadCount == totalImages) {
                callback();
            }
        }
    }
}


// ---------------
// Audio interface
// ---------------
var muted = false;
var sounds = {};

var audio = {
    preload: function() {
        var totalSounds = assets.sounds.length;

        for(var s = 0 ; s < totalSounds ; s++) {
            var audioName = assets.sounds[s][0];
            var audioPath = assets.sounds[s][1];

            sounds[audioName] = new Audio(audioPath);

            if(pages.platform == 'desktop') {
                sounds[audioName].load();
            }
        }
    },

    load: function(s) {
        if(typeof sounds[s] != 'undefined') {
            sounds[s].load();
        }
    },

    pause: function(s) {
        if(typeof sounds[s] != 'undefined') {
            sounds[s].pause();
        }
    },

    play: function(s) {
        if(typeof sounds[s] != 'undefined') {
            sounds[s].play();
        }
    },

    stop: function(s) {
        if(typeof sounds[s] != 'undefined') {
            sounds[s].pause();

            if(sounds[s].readyState > 1) {
                sounds[s].currentTime = 0;
            }
        }
    },

    terminate: function() {
        for(var key in sounds) {
            if(sounds[key].readyState > 1) {
                sounds[key].pause();
                sounds[key].currentTime = 0;
            }
        }
    }
}