/**
 * D&D Spooky Carnival - Audio Controls
 * This script handles all audio functionality for the D&D campaign website,
 * including basic playback controls and special audio effects.
 */

// Wait for the DOM to be fully loaded before executing
document.addEventListener('DOMContentLoaded', function() {
    // Audio elements
    const mainTrack = document.getElementById('main-track');
    const shatteringFloorEffect = document.getElementById('shattering-floor');
    const twistedRhythmEffect = document.getElementById('twisted-rhythm');
    
    // Control buttons
    const playBtn = document.getElementById('play-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const stopBtn = document.getElementById('stop-btn');
    const doubleTempoBtn = document.getElementById('double-tempo-btn');
    const shatteringFloorBtn = document.getElementById('shattering-floor-btn');
    const violentCrescendoBtn = document.getElementById('violent-crescendo-btn');
    const twistedRhythmBtn = document.getElementById('twisted-rhythm-btn');
    const muteAllBtn = document.getElementById('mute-all-btn');
    const resetBtn = document.getElementById('reset-btn');
    
    // Volume controls
    const mainVolumeControl = document.getElementById('main-volume');
    const masterVolumeControl = document.getElementById('master-volume');
    
    // Instructions toggle
    const instructionsToggle = document.getElementById('instructions-toggle');
    const instructionsContent = document.getElementById('instructions-content');
    const toggleIcon = document.querySelector('.instructions-toggle');
    
    // Audio context for advanced effects
    let audioContext;
    let mainTrackSource;
    let gainNode;
    let crescendoInterval;
    let normalPlaybackRate = 1.0;
    let isDoubleTempoActive = false;
    let isMuted = false;
    
    // Initialize Web Audio API
    function initAudioContext() {
        try {
            // Create audio context
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Connect main track to audio context
            mainTrackSource = audioContext.createMediaElementSource(mainTrack);
            
            // Create gain node for volume control
            gainNode = audioContext.createGain();
            
            // Connect nodes: source -> gain -> destination
            mainTrackSource.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            console.log("Audio context initialized successfully");
        } catch (error) {
            console.error("Error initializing audio context:", error);
            alert("There was an error setting up the audio system. Some features may not work properly.");
        }
    }
    
    // Basic audio controls
    function playMainTrack() {
        // Initialize audio context on first play (to handle autoplay restrictions)
        if (!audioContext) {
            initAudioContext();
        }
        
        // Play the track
        mainTrack.play().catch(error => {
            console.error("Error playing audio:", error);
            alert("Couldn't play audio. Please check your browser settings.");
        });
        
        // Update button states
        playBtn.classList.add('active');
        pauseBtn.classList.remove('active');
    }
    
    function pauseMainTrack() {
        mainTrack.pause();
        
        // Update button states
        playBtn.classList.remove('active');
        pauseBtn.classList.add('active');
    }
    
    function stopMainTrack() {
        mainTrack.pause();
        mainTrack.currentTime = 0;
        
        // Update button states
        playBtn.classList.remove('active');
        pauseBtn.classList.remove('active');
    }
    
    // Special effects
    function toggleDoubleTempo() {
        if (isDoubleTempoActive) {
            // Return to normal tempo
            mainTrack.playbackRate = normalPlaybackRate;
            doubleTempoBtn.classList.remove('active');
            doubleTempoBtn.textContent = "Double Tempo";
        } else {
            // Double the tempo
            mainTrack.playbackRate = normalPlaybackRate * 2;
            doubleTempoBtn.classList.add('active');
            doubleTempoBtn.textContent = "Normal Tempo";
        }
        
        isDoubleTempoActive = !isDoubleTempoActive;
    }
    
    function playShatteringFloorEffect() {
        // Reset the effect to the beginning if it's already playing
        shatteringFloorEffect.currentTime = 0;
        
        // Play the effect
        shatteringFloorEffect.play().catch(error => {
            console.error("Error playing shattering floor effect:", error);
        });
        
        // Visual feedback
        shatteringFloorBtn.classList.add('active');
        
        // Remove active class after effect ends
        shatteringFloorEffect.onended = function() {
            shatteringFloorBtn.classList.remove('active');
        };
    }
    
    function playTwistedRhythmEffect() {
        // Reset the effect to the beginning if it's already playing
        twistedRhythmEffect.currentTime = 0;
        
        // Play the effect
        twistedRhythmEffect.play().catch(error => {
            console.error("Error playing twisted rhythm effect:", error);
        });
        
        // Visual feedback
        twistedRhythmBtn.classList.add('active');
        
        // Remove active class after effect ends
        twistedRhythmEffect.onended = function() {
            twistedRhythmBtn.classList.remove('active');
        };
    }
    
    function startViolentCrescendo() {
        if (!audioContext) {
            initAudioContext();
        }
        
        // Clear any existing crescendo
        stopViolentCrescendo();
        
        // Start at current volume
        let startVolume = parseFloat(mainVolumeControl.value);
        let currentVolume = startVolume;
        let maxVolume = 1.0; // Maximum volume
        let step = 0.02; // Volume increase per step
        
        // Visual feedback
        violentCrescendoBtn.classList.add('active');
        
        // Create crescendo effect by gradually increasing volume
        crescendoInterval = setInterval(() => {
            currentVolume += step;
            
            // Cap at maximum volume
            if (currentVolume >= maxVolume) {
                currentVolume = maxVolume;
                stopViolentCrescendo();
            }
            
            // Update gain node and volume slider
            gainNode.gain.value = currentVolume;
            mainVolumeControl.value = currentVolume;
            
        }, 200); // Increase volume every 200ms
    }
    
    function stopViolentCrescendo() {
        if (crescendoInterval) {
            clearInterval(crescendoInterval);
            crescendoInterval = null;
            violentCrescendoBtn.classList.remove('active');
        }
    }
    
    // Master controls
    function toggleMute() {
        if (isMuted) {
            // Unmute all audio
            mainTrack.muted = false;
            shatteringFloorEffect.muted = false;
            twistedRhythmEffect.muted = false;
            
            // Update button text
            muteAllBtn.textContent = "Mute All";
            muteAllBtn.classList.remove('active');
        } else {
            // Mute all audio
            mainTrack.muted = true;
            shatteringFloorEffect.muted = true;
            twistedRhythmEffect.muted = true;
            
            // Update button text
            muteAllBtn.textContent = "Unmute All";
            muteAllBtn.classList.add('active');
        }
        
        isMuted = !isMuted;
    }
    
    function resetAll() {
        // Stop all audio
        stopMainTrack();
        shatteringFloorEffect.pause();
        shatteringFloorEffect.currentTime = 0;
        twistedRhythmEffect.pause();
        twistedRhythmEffect.currentTime = 0;
        
        // Reset tempo
        if (isDoubleTempoActive) {
            toggleDoubleTempo();
        }
        
        // Stop crescendo effect
        stopViolentCrescendo();
        
        // Reset volume to default
        mainVolumeControl.value = 0.7;
        masterVolumeControl.value = 0.8;
        updateVolumes();
        
        // Unmute if muted
        if (isMuted) {
            toggleMute();
        }
        
        // Reset all active button states
        document.querySelectorAll('.btn.active').forEach(button => {
            button.classList.remove('active');
        });
        
        console.log("All audio controls reset to default state");
    }
    
    // Volume control functions
    function updateMainVolume() {
        const volume = parseFloat(mainVolumeControl.value);
        
        if (audioContext && gainNode) {
            gainNode.gain.value = volume;
        } else {
            mainTrack.volume = volume;
        }
    }
    
    function updateMasterVolume() {
        const masterVolume = parseFloat(masterVolumeControl.value);
        
        // Apply master volume to all audio elements
        if (audioContext) {
            // If we're using Web Audio API, adjust the main gain node
            // and keep individual control for effects
            updateMainVolume();
            shatteringFloorEffect.volume = masterVolume;
            twistedRhythmEffect.volume = masterVolume;
        } else {
            // Direct volume control if Web Audio API isn't initialized
            mainTrack.volume = masterVolume * parseFloat(mainVolumeControl.value);
            shatteringFloorEffect.volume = masterVolume;
            twistedRhythmEffect.volume = masterVolume;
        }
    }
    
    function updateVolumes() {
        updateMainVolume();
        updateMasterVolume();
    }
    
    // Error handling for audio loading
    function handleAudioError(audioElement, name) {
        audioElement.addEventListener('error', function(e) {
            console.error(`Error loading ${name} audio:`, e);
            alert(`Failed to load ${name} audio. Please check the file path and format.`);
        });
    }
    
    // Instructions toggle functionality
    function toggleInstructions() {
        instructionsContent.classList.toggle('show');
        toggleIcon.textContent = instructionsContent.classList.contains('show') ? '−' : '+';
    }
    
    // Set up error handling for all audio elements
    handleAudioError(mainTrack, "main track");
    handleAudioError(shatteringFloorEffect, "shattering floor effect");
    handleAudioError(twistedRhythmEffect, "twisted rhythm effect");
    
    // Event listeners for buttons
    playBtn.addEventListener('click', playMainTrack);
    pauseBtn.addEventListener('click', pauseMainTrack);
    stopBtn.addEventListener('click', stopMainTrack);
    doubleTempoBtn.addEventListener('click', toggleDoubleTempo);
    shatteringFloorBtn.addEventListener('click', playShatteringFloorEffect);
    violentCrescendoBtn.addEventListener('click', startViolentCrescendo);
    twistedRhythmBtn.addEventListener('click', playTwistedRhythmEffect);
    muteAllBtn.addEventListener('click', toggleMute);
    resetBtn.addEventListener('click', resetAll);
    instructionsToggle.addEventListener('click', toggleInstructions);
    
    // Event listeners for volume controls
    mainVolumeControl.addEventListener('input', updateMainVolume);
    masterVolumeControl.addEventListener('input', updateMasterVolume);
    
    // Track ended event
    mainTrack.addEventListener('ended', function() {
        playBtn.classList.remove('active');
    });
    
    // Initialize volumes
    updateVolumes();
    
    console.log("D&D Spooky Carnival audio controls initialized");
});