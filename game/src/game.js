// ============================================
// ICS DEFENDER CHRONICLES - MAIN GAME LOGIC
// ============================================

const Game = {
    // Game state
    state: GameState.LOADING,
    previousState: null,

    // Game data (persisted)
    gameData: null,

    // Title screen
    titleSelection: 0,
    titleOptions: ['New Game', 'Continue', 'Controls'],

    // Current city being visited
    currentCityId: CityID.NONE,

    // Transition state
    transitioning: false,
    transitionCallback: null,

    // Time tracking
    time: 0,
    sessionStartTime: 0,

    // Message popup
    messageActive: false,
    messageText: '',
    messageCallback: null,

    // Initialize game
    async init() {
        console.log('Initializing ICS Defender Chronicles...');

        // Initialize subsystems
        Renderer.init();
        Input.init();
        await Audio.init();
        await SaveManager.init();

        // Check for existing save
        const hasSave = await SaveManager.hasSave(1);
        if (!hasSave) {
            this.titleOptions[1] = 'Continue (No Save)';
        }

        // Start at title
        this.changeState(GameState.TITLE);

        // Hide loading screen
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }

        this.sessionStartTime = Date.now();

        console.log('Game initialized!');
    },

    // Change game state
    changeState(newState) {
        console.log(`State change: ${this.state} -> ${newState}`);
        this.previousState = this.state;
        this.state = newState;

        // State-specific initialization
        switch (newState) {
            case GameState.TITLE:
                Audio.playMusic('title');
                break;

            case GameState.WORLD_MAP:
                Audio.playMusic('world_map');
                MapManager.loadMap('worldMap', this.gameData);
                break;

            case GameState.CITY:
                this.loadCity(this.currentCityId);
                break;
        }
    },

    // Start new game
    startNewGame() {
        console.log('Starting new game...');

        this.gameData = SaveManager.createDefaultSaveData();
        this.changeState(GameState.WORLD_MAP);

        // Show intro message
        this.showMessage(
            'Welcome, CyberGuard team!\n\n' +
            'Navigate to Power Plant Alpha\n' +
            '(the green building) to begin\n' +
            'your training.\n\n' +
            'Use arrow keys to move.\n' +
            'Press Z to interact.',
            () => {}
        );
    },

    // Continue from save
    async continueGame() {
        const saveData = await SaveManager.load(1);

        if (saveData) {
            console.log('Loading saved game...');
            this.gameData = saveData;

            // Restore to correct location
            if (saveData.currentMap === 'worldMap' || !saveData.currentMap) {
                this.changeState(GameState.WORLD_MAP);
            } else if (saveData.currentCity && saveData.currentCity !== CityID.NONE) {
                this.currentCityId = saveData.currentCity;
                this.changeState(GameState.CITY);
            } else {
                this.changeState(GameState.WORLD_MAP);
            }
        } else {
            this.showMessage('No save file found!\nStarting new game...', () => {
                this.startNewGame();
            });
        }
    },

    // Load a city
    loadCity(cityId) {
        this.currentCityId = cityId;
        this.gameData.currentCity = cityId;
        this.gameData.currentMap = 'tutorialCity'; // For now only tutorial

        // Load the city map
        if (cityId === CityID.TUTORIAL) {
            MapManager.loadMap('tutorialCity', this.gameData);
            Audio.playMusic('city_tutorial');
        }
        // Add other cities here as they're developed
    },

    // Enter city from world map
    enterCity(cityId) {
        if (!this.gameData.citiesUnlocked.includes(cityId)) {
            this.showMessage('This area is locked.\n\nComplete previous cities\nto unlock new areas.');
            return;
        }

        this.transition(() => {
            this.currentCityId = cityId;
            this.gameData.currentCityNPCsCompleted = [];
            this.gameData.bossArenaUnlocked = false;

            // Reset player position for city
            this.gameData.playerPosition = null;

            this.changeState(GameState.CITY);

            // Show city intro
            const cityName = CityNames[cityId] || 'Unknown City';
            this.showMessage(
                `Entering ${cityName}\n\n` +
                'Talk to all NPCs to learn\n' +
                'about ICS security.\n\n' +
                'The boss arena will unlock\n' +
                'once you\'ve spoken with everyone.'
            );
        });
    },

    // Exit city back to world map
    exitCity() {
        this.transition(() => {
            this.gameData.currentMap = 'worldMap';
            this.gameData.playerPosition = null;
            this.currentCityId = CityID.NONE;
            this.changeState(GameState.WORLD_MAP);
        });
    },

    // Start boss battle
    startBossBattle() {
        const bossId = this.getBossForCity(this.currentCityId);
        if (!bossId) return;

        this.transition(() => {
            CombatSystem.start(
                bossId,
                TutorialQuestions, // Use appropriate questions for city
                this.gameData.partyHP,
                true,
                (gameState) => this.onBossVictory(gameState),
                (gameState) => this.onBossDefeat(gameState)
            );
            this.changeState(GameState.BOSS_COMBAT);
        });
    },

    // Get boss for current city
    getBossForCity(cityId) {
        const cityBosses = {
            [CityID.TUTORIAL]: BossID.GLITCH,
            [CityID.PURDUE]: BossID.ARCHITECT,
            [CityID.PROTOCOL]: BossID.WIRETAP
        };
        return cityBosses[cityId];
    },

    // Handle boss victory
    onBossVictory(gameState) {
        console.log('Boss defeated!');

        // Mark city as completed
        if (!this.gameData.citiesCompleted.includes(this.currentCityId)) {
            this.gameData.citiesCompleted.push(this.currentCityId);
        }

        // Unlock next city
        const nextCity = this.currentCityId + 1;
        if (nextCity <= CityID.PROTOCOL && !this.gameData.citiesUnlocked.includes(nextCity)) {
            this.gameData.citiesUnlocked.push(nextCity);
        }

        // Update city progress
        if (this.gameData.cityProgress[this.currentCityId]) {
            this.gameData.cityProgress[this.currentCityId].bossDefeated = true;
            this.gameData.cityProgress[this.currentCityId].questionsAnswered = CombatSystem.questionsAnswered;
            this.gameData.cityProgress[this.currentCityId].questionsCorrect = CombatSystem.questionsCorrect;
        }

        // Update overall stats
        this.gameData.statistics.totalQuestionsAnswered += CombatSystem.questionsAnswered;

        // Restore party HP
        this.gameData.partyHP = Combat.MAX_PARTY_HP;

        // Save game
        this.saveGame();

        // Show victory dialogue
        const bossDialogue = BossVictoryDialogues[this.getBossForCity(this.currentCityId)];
        if (bossDialogue) {
            DialogueSystem.start(bossDialogue, () => {
                this.transition(() => {
                    this.exitCity();
                    this.showMessage(
                        'City Complete!\n\n' +
                        'The next area has been\n' +
                        'unlocked on the world map.',
                        () => {}
                    );
                });
            });
            this.changeState(GameState.DIALOGUE);
        } else {
            this.exitCity();
        }
    },

    // Handle boss defeat
    onBossDefeat(gameState) {
        console.log('Party defeated...');

        // Restore party HP
        this.gameData.partyHP = Combat.MAX_PARTY_HP;

        // Return to city
        this.transition(() => {
            this.changeState(GameState.CITY);
            this.showMessage(
                'Your team was defeated...\n\n' +
                'HP has been restored.\n' +
                'Talk to the NPCs to refresh\n' +
                'your knowledge, then try again!'
            );
        });
    },

    // Talk to NPC
    talkToNPC(npc) {
        const dialogue = TutorialDialogues[npc.id];

        if (dialogue) {
            DialogueSystem.start(dialogue, () => {
                // Mark NPC as talked to
                npc.talked = true;

                if (!this.gameData.currentCityNPCsCompleted.includes(npc.id)) {
                    this.gameData.currentCityNPCsCompleted.push(npc.id);
                }

                // Update city progress
                if (this.gameData.cityProgress[this.currentCityId]) {
                    if (!this.gameData.cityProgress[this.currentCityId].npcsCompleted.includes(npc.id)) {
                        this.gameData.cityProgress[this.currentCityId].npcsCompleted.push(npc.id);
                    }
                }

                // Check if boss arena should unlock
                const allNPCsTalked = MapManager.npcs.every(n => n.talked);
                if (allNPCsTalked && !this.gameData.bossArenaUnlocked) {
                    this.gameData.bossArenaUnlocked = true;
                    this.showMessage(
                        'All NPCs consulted!\n\n' +
                        'The Boss Arena is now\n' +
                        'accessible.\n\n' +
                        'Prepare for battle!'
                    );
                }

                this.changeState(GameState.CITY);
            });

            this.changeState(GameState.DIALOGUE);
            Audio.playSFX('npc_talk');
        }
    },

    // Save game
    async saveGame() {
        // Update play time
        const sessionTime = (Date.now() - this.sessionStartTime) / 1000;
        this.gameData.statistics.totalPlayTime += sessionTime;
        this.sessionStartTime = Date.now();

        await SaveManager.save(this.gameData, 1);
        console.log('Game saved!');
        Audio.playSFX('save');
    },

    // Show message popup
    showMessage(text, callback = null) {
        this.messageActive = true;
        this.messageText = text;
        this.messageCallback = callback;
    },

    // Close message popup
    closeMessage() {
        this.messageActive = false;
        this.messageText = '';

        if (this.messageCallback) {
            this.messageCallback();
            this.messageCallback = null;
        }
    },

    // Transition effect
    transition(callback) {
        this.transitioning = true;
        this.transitionCallback = callback;
        Renderer.fadeOut(0.1);
    },

    // Update game
    update(deltaTime) {
        this.time += deltaTime;
        Renderer.updateFade();

        // Handle transition
        if (this.transitioning && Renderer.isFadeComplete()) {
            if (Renderer.fadeTarget === 1) {
                // Fade out complete, do callback and fade in
                if (this.transitionCallback) {
                    this.transitionCallback();
                    this.transitionCallback = null;
                }
                Renderer.fadeIn(0.1);
            } else {
                // Fade in complete
                this.transitioning = false;
            }
        }

        // Handle message popup
        if (this.messageActive) {
            if (Input.isPressed('a') || Input.isPressed('b')) {
                this.closeMessage();
                Audio.playSFX('menu_confirm');
            }
            return;
        }

        // State-specific update
        switch (this.state) {
            case GameState.TITLE:
                this.updateTitle();
                break;

            case GameState.WORLD_MAP:
                this.updateWorldMap(deltaTime);
                break;

            case GameState.CITY:
                this.updateCity(deltaTime);
                break;

            case GameState.DIALOGUE:
                DialogueSystem.update(deltaTime);
                DialogueSystem.handleInput();
                break;

            case GameState.BOSS_COMBAT:
                CombatSystem.update(deltaTime, this.gameData);
                break;
        }
    },

    // Update title screen
    updateTitle() {
        // Navigate menu
        if (Input.isPressed('up')) {
            this.titleSelection = (this.titleSelection - 1 + this.titleOptions.length) % this.titleOptions.length;
            Audio.playSFX('menu_select');
        }
        if (Input.isPressed('down')) {
            this.titleSelection = (this.titleSelection + 1) % this.titleOptions.length;
            Audio.playSFX('menu_select');
        }

        // Select option
        if (Input.isPressed('a') || Input.isPressed('start')) {
            Audio.playSFX('menu_confirm');

            switch (this.titleSelection) {
                case 0: // New Game
                    this.transition(() => this.startNewGame());
                    break;

                case 1: // Continue
                    this.transition(() => this.continueGame());
                    break;

                case 2: // Controls
                    this.showMessage(
                        'CONTROLS\n\n' +
                        'Arrow Keys: Move\n' +
                        'Z / Space: Confirm/Action\n' +
                        'X / Escape: Cancel/Back\n' +
                        'Enter: Menu\n' +
                        'L: Cipher\'s Detect (combat)'
                    );
                    break;
            }
        }
    },

    // Update world map
    updateWorldMap(deltaTime) {
        if (this.transitioning) return;

        // Movement
        const dir = Input.getDirection();
        if (dir !== Direction.NONE && !MapManager.player.moving) {
            MapManager.tryMove(dir, this.gameData);
        }

        MapManager.update(deltaTime, this.gameData);

        // Interaction
        if (Input.isPressed('a')) {
            const interaction = MapManager.checkInteraction(this.gameData);

            if (interaction) {
                if (interaction.type === 'city') {
                    if (interaction.unlocked) {
                        this.enterCity(interaction.cityId);
                    } else {
                        this.showMessage(`${interaction.name}\n\n[LOCKED]\n\nComplete previous cities\nto unlock.`);
                    }
                }
            }
        }
    },

    // Update city
    updateCity(deltaTime) {
        if (this.transitioning) return;

        // Movement
        const dir = Input.getDirection();
        if (dir !== Direction.NONE && !MapManager.player.moving) {
            MapManager.tryMove(dir, this.gameData);
        }

        MapManager.update(deltaTime, this.gameData);

        // Interaction
        if (Input.isPressed('a')) {
            const interaction = MapManager.checkInteraction(this.gameData);

            if (interaction) {
                switch (interaction.type) {
                    case 'npc':
                        this.talkToNPC(interaction.npc);
                        break;

                    case 'save':
                        this.saveGame();
                        this.showMessage('Game Saved!');
                        break;

                    case 'boss':
                        if (interaction.ready) {
                            this.showMessage(
                                'Enter the Boss Arena?\n\n' +
                                'A powerful enemy awaits!\n\n' +
                                '[Press Z to enter]',
                                () => this.startBossBattle()
                            );
                        } else {
                            const remaining = MapManager.npcs.filter(n => !n.talked).length;
                            this.showMessage(
                                'Boss Arena LOCKED\n\n' +
                                `Talk to ${remaining} more NPC(s)\n` +
                                'to unlock the arena.'
                            );
                        }
                        break;

                    case 'exit':
                        this.exitCity();
                        break;
                }
            }
        }

        // Cancel/back to exit
        if (Input.isPressed('b')) {
            this.showMessage(
                'Return to World Map?',
                () => this.exitCity()
            );
        }
    },

    // Draw game
    draw() {
        Renderer.clear();
        Renderer.ctx.save();
        Renderer.applyShake();

        // State-specific drawing
        switch (this.state) {
            case GameState.TITLE:
                this.drawTitle();
                break;

            case GameState.WORLD_MAP:
                this.drawWorldMap();
                break;

            case GameState.CITY:
                this.drawCity();
                break;

            case GameState.DIALOGUE:
                // Draw underlying map
                if (this.previousState === GameState.CITY) {
                    this.drawCity();
                } else if (this.previousState === GameState.WORLD_MAP) {
                    this.drawWorldMap();
                } else if (this.previousState === GameState.BOSS_COMBAT) {
                    CombatSystem.draw(this.time, this.gameData);
                }
                DialogueSystem.draw(this.time);
                break;

            case GameState.BOSS_COMBAT:
                CombatSystem.draw(this.time, this.gameData);
                break;
        }

        // Draw message popup
        if (this.messageActive) {
            this.drawMessage();
        }

        Renderer.ctx.restore();

        // Draw fade overlay
        Renderer.drawFade();
    },

    // Draw title screen
    drawTitle() {
        // Background gradient
        const gradient = Renderer.ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
        gradient.addColorStop(0, '#0a0a2a');
        gradient.addColorStop(1, '#1a0a3a');
        Renderer.ctx.fillStyle = gradient;
        Renderer.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Grid effect
        Renderer.ctx.strokeStyle = 'rgba(0, 255, 136, 0.1)';
        Renderer.ctx.lineWidth = 1;
        for (let i = 0; i < CANVAS_WIDTH; i += 32) {
            Renderer.ctx.beginPath();
            Renderer.ctx.moveTo(i, 0);
            Renderer.ctx.lineTo(i, CANVAS_HEIGHT);
            Renderer.ctx.stroke();
        }

        // Title
        const titleY = 80;
        Renderer.ctx.fillStyle = Colors.PRIMARY;
        Renderer.ctx.font = 'bold 32px "Courier New", monospace';
        Renderer.ctx.textAlign = 'center';

        // Glitch effect on title
        const glitch = Math.random() > 0.95;
        const offsetX = glitch ? (Math.random() - 0.5) * 4 : 0;

        Renderer.ctx.fillText('ICS DEFENDER', CANVAS_WIDTH / 2 + offsetX, titleY);
        Renderer.ctx.fillText('CHRONICLES', CANVAS_WIDTH / 2 + offsetX, titleY + 40);

        // Subtitle
        Renderer.ctx.fillStyle = Colors.TEXT_DIM;
        Renderer.ctx.font = '14px "Courier New", monospace';
        Renderer.ctx.fillText('Defend Critical Infrastructure', CANVAS_WIDTH / 2, titleY + 80);

        // Menu options
        const menuY = 220;
        const menuSpacing = 40;

        for (let i = 0; i < this.titleOptions.length; i++) {
            const y = menuY + i * menuSpacing;
            const isSelected = i === this.titleSelection;

            if (isSelected) {
                Renderer.drawSelectionHighlight(
                    CANVAS_WIDTH / 2 - 100,
                    y - 5,
                    200,
                    30,
                    this.time
                );
                Renderer.drawCursor(CANVAS_WIDTH / 2 - 110, y - 10, this.time);
            }

            Renderer.ctx.fillStyle = isSelected ? Colors.PRIMARY : Colors.TEXT;
            Renderer.ctx.font = isSelected ?
                'bold 18px "Courier New", monospace' :
                '16px "Courier New", monospace';
            Renderer.ctx.textAlign = 'center';
            Renderer.ctx.fillText(this.titleOptions[i], CANVAS_WIDTH / 2, y + 10);
        }

        // Footer
        Renderer.ctx.fillStyle = Colors.TEXT_DIM;
        Renderer.ctx.font = '12px "Courier New", monospace';
        Renderer.ctx.fillText('CyberGuard Training Division', CANVAS_WIDTH / 2, CANVAS_HEIGHT - 60);
        Renderer.ctx.fillText('SANS ICS410 Aligned', CANVAS_WIDTH / 2, CANVAS_HEIGHT - 40);

        // Version
        Renderer.ctx.textAlign = 'right';
        Renderer.ctx.fillText('v1.0', CANVAS_WIDTH - 20, CANVAS_HEIGHT - 20);
    },

    // Draw world map
    drawWorldMap() {
        MapManager.draw(this.time, this.gameData);

        // HUD
        Renderer.drawBox(10, 10, 200, 30);
        Renderer.ctx.fillStyle = Colors.TEXT;
        Renderer.ctx.font = '14px "Courier New", monospace';
        Renderer.ctx.textAlign = 'left';
        Renderer.ctx.fillText('WORLD MAP', 25, 30);

        // Instructions
        Renderer.drawBox(10, CANVAS_HEIGHT - 50, 200, 40);
        Renderer.ctx.fillStyle = Colors.TEXT_DIM;
        Renderer.ctx.font = '12px "Courier New", monospace';
        Renderer.ctx.fillText('Arrow keys: Move', 20, CANVAS_HEIGHT - 32);
        Renderer.ctx.fillText('Z: Enter city', 20, CANVAS_HEIGHT - 16);
    },

    // Draw city
    drawCity() {
        MapManager.draw(this.time, this.gameData);

        // HUD - City name
        const cityName = CityNames[this.currentCityId] || 'Unknown';
        Renderer.drawBox(10, 10, 200, 30);
        Renderer.ctx.fillStyle = Colors.TEXT;
        Renderer.ctx.font = '14px "Courier New", monospace';
        Renderer.ctx.textAlign = 'left';
        Renderer.ctx.fillText(cityName, 25, 30);

        // Instructions
        Renderer.drawBox(10, CANVAS_HEIGHT - 50, 280, 40);
        Renderer.ctx.fillStyle = Colors.TEXT_DIM;
        Renderer.ctx.font = '12px "Courier New", monospace';
        Renderer.ctx.fillText('Z: Interact | X: Exit to world map', 20, CANVAS_HEIGHT - 25);
    },

    // Draw message popup
    drawMessage() {
        // Darken background
        Renderer.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        Renderer.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Message box
        const boxWidth = 320;
        const lines = this.messageText.split('\n');
        const boxHeight = 80 + lines.length * 20;
        const boxX = (CANVAS_WIDTH - boxWidth) / 2;
        const boxY = (CANVAS_HEIGHT - boxHeight) / 2;

        Renderer.drawBox(boxX, boxY, boxWidth, boxHeight);

        // Message text
        Renderer.ctx.fillStyle = Colors.TEXT;
        Renderer.ctx.font = '14px "Courier New", monospace';
        Renderer.ctx.textAlign = 'center';

        for (let i = 0; i < lines.length; i++) {
            Renderer.ctx.fillText(lines[i], CANVAS_WIDTH / 2, boxY + 30 + i * 20);
        }

        // Continue prompt
        const bounce = Math.sin(this.time * 5) * 2;
        Renderer.ctx.fillStyle = Colors.PRIMARY;
        Renderer.ctx.fillText('[Press Z to continue]', CANVAS_WIDTH / 2, boxY + boxHeight - 20 + bounce);
    }
};
