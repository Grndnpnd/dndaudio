# D&D Spooky Carnival Audio Control Panel

## Project Overview
This project provides an interactive HTML website for a D&D campaign with a spooky carnival theme. The website includes audio controls for background music and various sound effects that can be triggered during gameplay to enhance the immersive experience.

## Features
- Background carnival waltz music with basic playback controls
- Double tempo functionality for creating tension
- Special sound effects:
  - Shattering Floor effect
  - Violent Crescendo (gradual volume increase)
  - Twisted Rhythm warping effect
- Master volume control and mute functionality
- Responsive design for use on different devices
- Collapsible usage instructions for DMs

## Project Structure
```
final/
├── index.html             # Main HTML file with embedded CSS
├── js/
│   └── audio-controls.js  # Audio control functionality
├── audio/
│   ├── carnival-waltz.mp3 # Main background music
│   ├── effects/           # Sound effect files
│   │   ├── shattering-floor.mp3
│   │   └── twisted-rhythm.mp3
│   └── sources.txt        # Attribution for audio files
├── test-checklist.md      # Testing documentation
└── README.md              # This file
```

## Technical Implementation
- **HTML5**: Semantic structure with audio elements
- **CSS3**: Responsive design with dark/spooky carnival theme
- **JavaScript**: 
  - Web Audio API for advanced audio manipulation
  - Event listeners for interactive controls
  - Error handling for audio playback issues

## Browser Compatibility
The website has been designed to work in modern browsers that support HTML5 audio and the Web Audio API:
- Chrome
- Firefox
- Safari
- Edge

## Usage Instructions
1. Open `index.html` in a web browser
2. Click the "How to Use This Audio Panel" section to expand detailed instructions
3. Use the play/pause/stop buttons to control the main carnival waltz
4. Trigger sound effects using the dedicated buttons when appropriate during gameplay
5. Adjust volume using the sliders
6. Use the master controls to mute all sounds or reset everything

## For Dungeon Masters
The website includes specific instructions for DMs on when to use different sound effects during the campaign:
- Start the carnival waltz when players first enter the carnival grounds
- Use the "Double Tempo" feature during chase scenes or when tension rises
- Trigger the "Shattering Floor" effect for breaking glass or crumbling pathways
- Use "Violent Crescendo" during build-ups to important revelations
- Play the "Twisted Rhythm" effect when reality warps or when players enter distorted dimensions

## Testing
The website has been thoroughly tested to ensure all functionality works as expected. See `test-checklist.md` for detailed testing information and results.

## Audio Attribution
All audio files used in this project are properly attributed in the `audio/sources.txt` file:
- Main Carnival Waltz: SoundBible - Carnival Ride (Attribution 3.0)
- Shattering Floor Effect: SoundBible - Glass Breaking (Attribution 3.0)
- Warping/Twisted Rhythm Effect: SoundBible - Alien Spaceship UFO (Attribution 3.0)

## Troubleshooting
- If audio doesn't play immediately, try clicking anywhere on the page first. Some browsers require user interaction before allowing audio playback.
- If sound effects don't work, check that your browser supports the HTML5 audio element and the audio format used.
- For best experience, use a modern browser with updated audio capabilities.