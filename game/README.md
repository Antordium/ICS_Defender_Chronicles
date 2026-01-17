# ICS Defender Chronicles - Game

## Quick Start

### Option 1: Python HTTP Server (Recommended)
```bash
cd game
python -m http.server 8000
```
Then open: http://localhost:8000

### Option 2: Node.js HTTP Server
```bash
npx http-server game -p 8000
```
Then open: http://localhost:8000

### Option 3: VS Code Live Server
- Install the "Live Server" extension
- Right-click on `index.html` -> "Open with Live Server"

### Option 4: Direct File (Limited)
Open `index.html` directly in browser. Note: Save functionality may not work due to IndexedDB restrictions on file:// protocol.

## Controls

| Key | Action |
|-----|--------|
| Arrow Keys | Move character |
| Z / Space | Confirm / Interact |
| X / Escape | Cancel / Back |
| Enter | Start / Menu |
| L | Cipher's Detect ability (in combat) |

## Gameplay Flow

1. **Title Screen** - New Game or Continue
2. **World Map** - Navigate to cities (use arrow keys)
3. **Power Plant Alpha (Tutorial City)** - First accessible city
   - Talk to all 3 NPCs to learn ICS basics
   - Boss arena unlocks after talking to everyone
4. **Boss Battle** - Answer questions to deal damage
   - 30-second timer per question
   - Streak bonuses: 3x = 1.5x damage, 5x = 2x damage
   - Use Cipher's Detect (L key) once per battle to reveal answer
5. **Victory** - Unlocks next city on world map

## Debug Commands (Browser Console)

Open browser console (F12) and type:
- `debugCommands.status()` - Show game state
- `debugCommands.heal()` - Restore party HP
- `debugCommands.unlockAll()` - Unlock all cities
- `debugCommands.skipToBoss()` - Mark all NPCs as talked
- `debugCommands.testCombat()` - Jump into boss fight
- `debugCommands.save()` - Force save
- `debugCommands.clearSave()` - Delete save file

## File Structure

```
game/
├── index.html          # Main HTML file
├── style.css           # Game styling
├── src/
│   ├── main.js         # Entry point, game loop
│   ├── game.js         # Main game logic, state management
│   ├── constants.js    # Game constants and enums
│   ├── utils.js        # Utility functions
│   ├── input.js        # Keyboard input handling
│   ├── renderer.js     # Canvas drawing functions
│   ├── sprites.js      # Player, NPC, enemy sprites
│   ├── maps.js         # World map and city data
│   ├── dialogue.js     # NPC dialogue system
│   ├── combat.js       # Quiz combat system
│   ├── saves.js        # IndexedDB save system
│   └── audio.js        # Audio manager (placeholder)
└── assets/             # Asset folders (for future use)
    ├── sprites/
    ├── tilesets/
    └── audio/
```

## Current Status

**Sprint 1 - Tutorial City Complete:**
- [x] Title screen with menu
- [x] World map navigation
- [x] Tutorial City (Power Plant Alpha)
- [x] 3 NPCs with full dialogue
- [x] Boss battle with GLITCH
- [x] Quiz combat system with streak mechanics
- [x] Timer for boss battles
- [x] Cipher's Detect ability
- [x] Save/Load system
- [x] 25 placeholder questions

**Locked for Future Development:**
- [ ] Purdue City (greyed out on map)
- [ ] Protocol Port (greyed out on map)
- [ ] Supervisory Station (greyed out on map)
- [ ] Governance Garrison (greyed out on map)
- [ ] Final Fortress (greyed out on map)

## Adding Real Content

### Questions
Edit: `docs/QUESTION_BANKS/tutorial_questions.json`
Format in `src/combat.js` (TutorialQuestions array)

### Dialogue
Edit: `docs/DIALOGUE/tutorial_dialogue.json`
Format in `src/dialogue.js` (TutorialDialogues object)

### Graphics
Place assets in `assets/` folders
Update sprite loading in `src/sprites.js`

### Audio
Place MP3 files in `assets/audio/`
Update paths in `src/audio.js`
Remove placeholder mode code to enable real audio
