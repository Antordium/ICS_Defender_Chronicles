// ============================================
// ICS DEFENDER CHRONICLES - MAIN ENTRY POINT
// ============================================

// Game timing
let lastTime = 0;
const targetFPS = 60;
const frameTime = 1000 / targetFPS;

// Main game loop
function gameLoop(timestamp) {
    // Calculate delta time
    const deltaTime = (timestamp - lastTime) / 1000;
    lastTime = timestamp;

    // Cap delta time to prevent spiral of death
    const cappedDelta = Math.min(deltaTime, 0.1);

    // Update game
    Game.update(cappedDelta);

    // Draw game
    Game.draw();

    // Clear input states for next frame
    Input.update();

    // Continue loop
    requestAnimationFrame(gameLoop);
}

// Initialize and start game
async function main() {
    try {
        console.log('=================================');
        console.log('  ICS DEFENDER CHRONICLES v1.0');
        console.log('=================================');
        console.log('Initializing...');

        // Update loading progress
        const progressBar = document.querySelector('.loading-progress');
        if (progressBar) {
            progressBar.style.width = '30%';
        }

        // Initialize game
        await Game.init();

        if (progressBar) {
            progressBar.style.width = '100%';
        }

        // Small delay for visual feedback
        await Utils.wait(300);

        // Start game loop
        console.log('Starting game loop...');
        lastTime = performance.now();
        requestAnimationFrame(gameLoop);

    } catch (error) {
        console.error('Failed to initialize game:', error);

        // Show error on loading screen
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.innerHTML = `
                <h1>Error</h1>
                <p style="color: #ff4444;">${error.message}</p>
                <button onclick="location.reload()" style="
                    margin-top: 20px;
                    padding: 10px 30px;
                    background: #00ff88;
                    color: #000;
                    border: none;
                    font-family: inherit;
                    cursor: pointer;
                ">Retry</button>
            `;
        }
    }
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main);
} else {
    main();
}

// Debug console commands
window.debugCommands = {
    // Unlock all cities
    unlockAll: () => {
        if (Game.gameData) {
            Game.gameData.citiesUnlocked = [CityID.TUTORIAL, CityID.PURDUE, CityID.PROTOCOL];
            console.log('All cities unlocked!');
        }
    },

    // Complete current city
    completeCity: () => {
        if (Game.gameData && Game.currentCityId) {
            Game.gameData.citiesCompleted.push(Game.currentCityId);
            const nextCity = Game.currentCityId + 1;
            if (nextCity <= CityID.PROTOCOL) {
                Game.gameData.citiesUnlocked.push(nextCity);
            }
            console.log('City completed!');
        }
    },

    // Heal party
    heal: () => {
        if (Game.gameData) {
            Game.gameData.partyHP = Combat.MAX_PARTY_HP;
            console.log('Party healed!');
        }
    },

    // Save game
    save: () => {
        Game.saveGame();
    },

    // Clear save
    clearSave: async () => {
        await SaveManager.deleteSave(1);
        console.log('Save cleared!');
    },

    // Show game state
    status: () => {
        console.log('Current state:', Game.state);
        console.log('Current city:', Game.currentCityId);
        console.log('Game data:', Game.gameData);
    },

    // Skip to boss
    skipToBoss: () => {
        if (Game.state === GameState.CITY) {
            MapManager.npcs.forEach(npc => npc.talked = true);
            Game.gameData.bossArenaUnlocked = true;
            console.log('All NPCs marked as talked. Boss arena unlocked!');
        }
    },

    // Test combat
    testCombat: () => {
        Game.gameData = Game.gameData || SaveManager.createDefaultSaveData();
        Game.currentCityId = CityID.TUTORIAL;
        Game.startBossBattle();
    }
};

console.log('Debug commands available: window.debugCommands');
console.log('  - unlockAll(): Unlock all cities');
console.log('  - completeCity(): Complete current city');
console.log('  - heal(): Restore party HP');
console.log('  - save(): Save game');
console.log('  - clearSave(): Delete save file');
console.log('  - status(): Show game status');
console.log('  - skipToBoss(): Skip to boss fight');
console.log('  - testCombat(): Test combat system');
