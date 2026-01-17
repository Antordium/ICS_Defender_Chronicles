// ============================================
// ICS DEFENDER CHRONICLES - MAP SYSTEM
// ============================================

// Power Plant Environment Decorations
const PlantDecorations = {
    // Control panel patterns (4x4 tiles)
    controlPanel: [
        [1, 1, 1, 1],
        [2, 3, 3, 2],
        [2, 4, 4, 2],
        [1, 1, 1, 1]
    ],
    // Pipe patterns
    pipeHorizontal: { color: '#666688', width: 8 },
    pipeVertical: { color: '#666688', width: 8 },
    // Industrial equipment colors
    colors: {
        metal: '#4a4a5e',
        metalDark: '#2a2a3e',
        metalLight: '#6a6a7e',
        warning: '#ffcc00',
        danger: '#ff4444',
        safe: '#44ff44',
        pipe: '#666688',
        console: '#1a2a3a',
        screen: '#003322',
        screenGlow: '#00ff88',
        cable: '#222233',
        reactor: '#00ffff',
        coolant: '#0088ff'
    }
};

// World Map Data
const WorldMapData = {
    width: 16,
    height: 14,
    playerStart: { x: 7, y: 8 },

    // City positions on world map
    cities: {
        [CityID.TUTORIAL]: { x: 4, y: 4, name: 'Power Plant Alpha' },
        [CityID.PURDUE]: { x: 8, y: 3, name: 'Purdue City' },
        [CityID.PROTOCOL]: { x: 12, y: 5, name: 'Protocol Port' },
        [CityID.SUPERVISORY]: { x: 3, y: 9, name: 'Supervisory Station' },
        [CityID.GOVERNANCE]: { x: 8, y: 10, name: 'Governance Garrison' },
        [CityID.FINAL]: { x: 13, y: 9, name: 'Final Fortress' }
    },

    // Map tiles (0=water, 1=land, 2=mountain)
    tiles: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
};

// Tutorial City (Power Plant Alpha) Map Data
const TutorialCityData = {
    width: 16,
    height: 14,
    playerStart: { x: 8, y: 12 },

    // NPC positions
    npcs: [
        { id: NPCID.CHIEF_MARTINEZ, name: 'Chief Martinez', x: 3, y: 4, color: '#cc8844', role: 'Plant Manager' },
        { id: NPCID.TECHNICIAN_PARK, name: 'Technician Park', x: 8, y: 3, color: '#44aa88', role: 'Control Room Operator' },
        { id: NPCID.DR_SANTOS, name: 'Dr. Santos', x: 12, y: 4, color: '#8844aa', role: 'Process Engineer' }
    ],

    // Special locations
    savePoint: { x: 2, y: 11 },
    bossArena: { x: 8, y: 1 },
    exit: { x: 8, y: 13 },

    // Map tiles
    // 0=empty, 1=floor, 2=wall, 6=npc spot, 7=save, 8=boss door, 11=exit
    tiles: [
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 8, 1, 1, 1, 1, 1, 1, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 6, 1, 1, 1, 1, 1, 1, 2],
        [2, 1, 1, 6, 1, 1, 1, 1, 1, 1, 1, 1, 6, 1, 1, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
        [2, 1, 1, 1, 1, 2, 2, 1, 1, 1, 2, 2, 1, 1, 1, 2],
        [2, 1, 1, 1, 1, 2, 2, 1, 1, 1, 2, 2, 1, 1, 1, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
        [2, 1, 7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 11, 2, 2, 2, 2, 2, 2, 2]
    ]
};

// Map Manager
const MapManager = {
    currentMap: null,
    mapData: null,
    player: null,
    npcs: [],
    cameraX: 0,
    cameraY: 0,

    // Load a map
    loadMap(mapName, gameState) {
        this.currentMap = mapName;

        if (mapName === 'worldMap') {
            this.mapData = WorldMapData;
            this.player = new Sprites.PlayerSprite(
                gameState.playerPosition?.x || WorldMapData.playerStart.x,
                gameState.playerPosition?.y || WorldMapData.playerStart.y
            );
            this.npcs = [];
        } else if (mapName === 'tutorialCity') {
            this.mapData = TutorialCityData;
            this.player = new Sprites.PlayerSprite(
                gameState.playerPosition?.x || TutorialCityData.playerStart.x,
                gameState.playerPosition?.y || TutorialCityData.playerStart.y
            );

            // Load NPCs
            this.npcs = TutorialCityData.npcs.map(npcData => {
                const npc = new Sprites.NPCSprite(
                    npcData.id,
                    npcData.name,
                    npcData.x,
                    npcData.y,
                    npcData.color,
                    npcData.role
                );
                // Check if already talked to
                if (gameState.currentCityNPCsCompleted?.includes(npcData.id)) {
                    npc.talked = true;
                }
                return npc;
            });
        }

        this.updateCamera();
    },

    // Update camera position
    updateCamera() {
        if (!this.player) return;

        // Center camera on player
        const targetX = this.player.x * TILE_SIZE - CANVAS_WIDTH / 2 + TILE_SIZE / 2;
        const targetY = this.player.y * TILE_SIZE - CANVAS_HEIGHT / 2 + TILE_SIZE / 2;

        // Clamp to map bounds
        const maxX = this.mapData.width * TILE_SIZE - CANVAS_WIDTH;
        const maxY = this.mapData.height * TILE_SIZE - CANVAS_HEIGHT;

        this.cameraX = Utils.clamp(targetX, 0, Math.max(0, maxX));
        this.cameraY = Utils.clamp(targetY, 0, Math.max(0, maxY));
    },

    // Check if a tile is walkable
    canWalk(x, y, gameState) {
        if (x < 0 || y < 0 || x >= this.mapData.width || y >= this.mapData.height) {
            return false;
        }

        const tile = this.mapData.tiles[y][x];

        // World map specific
        if (this.currentMap === 'worldMap') {
            return tile === 1; // Only land is walkable
        }

        // City map specific
        if (tile === TileType.WALL || tile === TileType.EMPTY) {
            return false;
        }

        // Boss door locked check
        if (tile === TileType.BOSS_DOOR) {
            const allNPCsTalked = this.npcs.every(npc => npc.talked);
            return allNPCsTalked;
        }

        // NPC collision
        for (const npc of this.npcs) {
            if (npc.x === x && npc.y === y) {
                return false;
            }
        }

        return true;
    },

    // Try to move player
    tryMove(direction, gameState) {
        if (!this.player || this.player.moving) return false;

        const vec = DirVectors[direction];
        if (!vec) return false;

        const newX = this.player.getTileX() + vec.x;
        const newY = this.player.getTileY() + vec.y;

        this.player.direction = direction;

        if (this.canWalk(newX, newY, gameState)) {
            this.player.moveTo(newX, newY, direction);
            return true;
        }

        return false;
    },

    // Check for interactions at current position
    checkInteraction(gameState) {
        const px = this.player.getTileX();
        const py = this.player.getTileY();

        // Check NPC interaction (facing direction)
        const vec = DirVectors[this.player.direction] || { x: 0, y: 0 };
        const facingX = px + vec.x;
        const facingY = py + vec.y;

        for (const npc of this.npcs) {
            if (npc.x === facingX && npc.y === facingY) {
                return { type: 'npc', npc: npc };
            }
        }

        // Check tile-based interactions at player position
        const tile = this.mapData.tiles[py]?.[px];

        if (this.currentMap === 'worldMap') {
            // Check city entry
            for (const [cityId, cityData] of Object.entries(WorldMapData.cities)) {
                if (cityData.x === px && cityData.y === py) {
                    const id = parseInt(cityId);
                    const isUnlocked = gameState.citiesUnlocked?.includes(id);
                    return { type: 'city', cityId: id, unlocked: isUnlocked, name: cityData.name };
                }
            }
        } else {
            // Save point
            if (this.mapData.savePoint && this.mapData.savePoint.x === px && this.mapData.savePoint.y === py) {
                return { type: 'save' };
            }

            // Boss arena
            if (this.mapData.bossArena && this.mapData.bossArena.x === px && this.mapData.bossArena.y === py) {
                const allNPCsTalked = this.npcs.every(npc => npc.talked);
                return { type: 'boss', ready: allNPCsTalked };
            }

            // Exit
            if (tile === TileType.EXIT || (this.mapData.exit && this.mapData.exit.x === px && this.mapData.exit.y === py)) {
                return { type: 'exit' };
            }
        }

        return null;
    },

    // Update map state
    update(deltaTime, gameState) {
        if (!this.player) return;

        this.player.update(deltaTime);
        this.updateCamera();

        for (const npc of this.npcs) {
            npc.update(deltaTime);
        }

        // Save player position to game state
        gameState.playerPosition = {
            x: this.player.getTileX(),
            y: this.player.getTileY()
        };
    },

    // Draw the map
    draw(time, gameState) {
        if (!this.mapData) return;

        const offsetX = -this.cameraX;
        const offsetY = -this.cameraY;

        // Draw tiles
        for (let y = 0; y < this.mapData.height; y++) {
            for (let x = 0; x < this.mapData.width; x++) {
                const screenX = x * TILE_SIZE + offsetX;
                const screenY = y * TILE_SIZE + offsetY;

                // Skip if off screen
                if (screenX < -TILE_SIZE || screenX > CANVAS_WIDTH ||
                    screenY < -TILE_SIZE || screenY > CANVAS_HEIGHT) {
                    continue;
                }

                const tile = this.mapData.tiles[y][x];

                if (this.currentMap === 'worldMap') {
                    this.drawWorldTile(screenX, screenY, tile, x, y, gameState);
                } else {
                    this.drawCityTile(screenX, screenY, tile, x, y, gameState);
                }
            }
        }

        // Draw NPCs
        for (const npc of this.npcs) {
            npc.draw(Renderer.ctx, offsetX, offsetY, time);
        }

        // Draw player
        if (this.player) {
            this.player.draw(Renderer.ctx, offsetX, offsetY, time);
        }
    },

    // Draw world map tile
    drawWorldTile(x, y, tile, tileX, tileY, gameState) {
        // Base terrain
        if (tile === 0) {
            // Water
            Renderer.ctx.fillStyle = '#004488';
            Renderer.ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);

            // Waves animation
            const wave = Math.sin((tileX + tileY + Date.now() / 500) * 0.5) * 2;
            Renderer.ctx.fillStyle = 'rgba(0, 100, 200, 0.3)';
            Renderer.ctx.fillRect(x, y + 10 + wave, TILE_SIZE, 5);
        } else {
            // Land
            Renderer.ctx.fillStyle = '#2a3a2a';
            Renderer.ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        }

        // Draw cities
        for (const [cityId, cityData] of Object.entries(WorldMapData.cities)) {
            if (cityData.x === tileX && cityData.y === tileY) {
                const id = parseInt(cityId);
                const isUnlocked = gameState.citiesUnlocked?.includes(id);
                const isCompleted = gameState.citiesCompleted?.includes(id);

                // City marker
                if (isUnlocked) {
                    Renderer.ctx.fillStyle = isCompleted ? Colors.CORRECT : Colors.PRIMARY;
                } else {
                    Renderer.ctx.fillStyle = Colors.LOCKED;
                }

                // Draw building shape
                Renderer.ctx.fillRect(x + 4, y + 8, TILE_SIZE - 8, TILE_SIZE - 12);

                // Roof
                Renderer.ctx.beginPath();
                Renderer.ctx.moveTo(x + TILE_SIZE / 2, y + 2);
                Renderer.ctx.lineTo(x + 2, y + 10);
                Renderer.ctx.lineTo(x + TILE_SIZE - 2, y + 10);
                Renderer.ctx.closePath();
                Renderer.ctx.fill();

                // Lock icon for locked cities
                if (!isUnlocked) {
                    Renderer.ctx.fillStyle = '#666';
                    Renderer.ctx.fillRect(x + 12, y + 14, 8, 10);
                    Renderer.ctx.strokeStyle = '#666';
                    Renderer.ctx.lineWidth = 2;
                    Renderer.ctx.beginPath();
                    Renderer.ctx.arc(x + 16, y + 13, 4, Math.PI, 0);
                    Renderer.ctx.stroke();
                }

                // Check mark for completed
                if (isCompleted) {
                    Renderer.ctx.strokeStyle = '#fff';
                    Renderer.ctx.lineWidth = 3;
                    Renderer.ctx.beginPath();
                    Renderer.ctx.moveTo(x + 10, y + 18);
                    Renderer.ctx.lineTo(x + 15, y + 23);
                    Renderer.ctx.lineTo(x + 24, y + 12);
                    Renderer.ctx.stroke();
                }
            }
        }

        // Grid lines
        Renderer.ctx.strokeStyle = 'rgba(0, 255, 136, 0.05)';
        Renderer.ctx.lineWidth = 1;
        Renderer.ctx.strokeRect(x, y, TILE_SIZE, TILE_SIZE);
    },

    // Draw city tile
    drawCityTile(x, y, tile, tileX, tileY, gameState) {
        const C = PlantDecorations.colors;
        const time = Date.now();

        // Base industrial floor with checker pattern
        if ((tileX + tileY) % 2 === 0) {
            Renderer.ctx.fillStyle = '#1a1a2e';
        } else {
            Renderer.ctx.fillStyle = '#1e1e32';
        }
        Renderer.ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);

        // Add floor details based on position
        this.drawFloorDetails(x, y, tileX, tileY, time);

        switch (tile) {
            case TileType.WALL:
                // Industrial wall with panels
                Renderer.ctx.fillStyle = C.metalDark;
                Renderer.ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);

                // Metal panel effect
                Renderer.ctx.fillStyle = C.metal;
                Renderer.ctx.fillRect(x + 2, y + 2, TILE_SIZE - 4, TILE_SIZE - 4);

                // Rivets in corners
                Renderer.ctx.fillStyle = C.metalLight;
                Renderer.ctx.fillRect(x + 4, y + 4, 3, 3);
                Renderer.ctx.fillRect(x + TILE_SIZE - 7, y + 4, 3, 3);
                Renderer.ctx.fillRect(x + 4, y + TILE_SIZE - 7, 3, 3);
                Renderer.ctx.fillRect(x + TILE_SIZE - 7, y + TILE_SIZE - 7, 3, 3);

                // Random wall decorations
                if ((tileX * 7 + tileY * 13) % 5 === 0) {
                    // Warning stripe
                    Renderer.ctx.fillStyle = C.warning;
                    for (let i = 0; i < 4; i++) {
                        Renderer.ctx.fillRect(x + 4 + i * 8, y + TILE_SIZE - 6, 4, 4);
                    }
                } else if ((tileX * 3 + tileY * 11) % 7 === 0) {
                    // Vent grate
                    Renderer.ctx.fillStyle = '#1a1a1a';
                    Renderer.ctx.fillRect(x + 8, y + 8, TILE_SIZE - 16, TILE_SIZE - 16);
                    for (let i = 0; i < 3; i++) {
                        Renderer.ctx.fillStyle = C.metalDark;
                        Renderer.ctx.fillRect(x + 8, y + 10 + i * 5, TILE_SIZE - 16, 2);
                    }
                } else if ((tileX * 5 + tileY * 9) % 11 === 0) {
                    // Control box
                    Renderer.ctx.fillStyle = C.console;
                    Renderer.ctx.fillRect(x + 6, y + 6, TILE_SIZE - 12, TILE_SIZE - 12);
                    // Status lights
                    const lightColor = Math.sin(time / 500) > 0 ? C.safe : C.danger;
                    Renderer.ctx.fillStyle = lightColor;
                    Renderer.ctx.fillRect(x + 10, y + 10, 4, 4);
                    Renderer.ctx.fillStyle = C.safe;
                    Renderer.ctx.fillRect(x + 18, y + 10, 4, 4);
                }
                break;

            case TileType.FLOOR:
                // Add cables on some floor tiles
                if ((tileX * 11 + tileY * 17) % 13 === 0) {
                    Renderer.ctx.strokeStyle = C.cable;
                    Renderer.ctx.lineWidth = 3;
                    Renderer.ctx.beginPath();
                    Renderer.ctx.moveTo(x, y + TILE_SIZE / 2);
                    Renderer.ctx.lineTo(x + TILE_SIZE, y + TILE_SIZE / 2);
                    Renderer.ctx.stroke();
                }
                break;

            case TileType.SAVE_POINT:
                // Industrial terminal/save point
                Renderer.ctx.fillStyle = C.console;
                Renderer.ctx.fillRect(x + 4, y + 4, TILE_SIZE - 8, TILE_SIZE - 8);

                // Screen
                const pulse = Math.sin(time / 300) * 0.3 + 0.7;
                Renderer.ctx.fillStyle = C.screen;
                Renderer.ctx.fillRect(x + 6, y + 6, TILE_SIZE - 12, TILE_SIZE - 16);

                // Screen glow effect
                Renderer.ctx.shadowColor = C.screenGlow;
                Renderer.ctx.shadowBlur = 10;
                Renderer.ctx.fillStyle = `rgba(0, 255, 136, ${pulse * 0.8})`;
                Renderer.ctx.font = 'bold 14px "Courier New", monospace';
                Renderer.ctx.textAlign = 'center';
                Renderer.ctx.textBaseline = 'middle';
                Renderer.ctx.fillText('SAVE', x + TILE_SIZE / 2, y + TILE_SIZE / 2 - 4);
                Renderer.ctx.shadowBlur = 0;

                // Keyboard
                Renderer.ctx.fillStyle = C.metalDark;
                Renderer.ctx.fillRect(x + 8, y + TILE_SIZE - 10, TILE_SIZE - 16, 6);
                break;

            case TileType.BOSS_DOOR:
                const allTalked = this.npcs.every(npc => npc.talked);

                // Heavy blast door
                Renderer.ctx.fillStyle = C.metalDark;
                Renderer.ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);

                if (allTalked) {
                    // Unlocked - glowing danger door
                    const doorPulse = Math.sin(time / 200) * 0.3 + 0.7;
                    Renderer.ctx.fillStyle = `rgba(255, 0, 100, ${doorPulse * 0.6})`;
                    Renderer.ctx.fillRect(x + 4, y + 2, TILE_SIZE - 8, TILE_SIZE - 4);

                    // Warning stripes
                    Renderer.ctx.fillStyle = C.danger;
                    for (let i = 0; i < 6; i++) {
                        Renderer.ctx.fillRect(x + 6 + i * 4, y + 4, 2, 4);
                    }

                    // Skull/danger icon
                    Renderer.ctx.fillStyle = '#ff0066';
                    Renderer.ctx.font = 'bold 18px "Courier New", monospace';
                    Renderer.ctx.textAlign = 'center';
                    Renderer.ctx.textBaseline = 'middle';
                    Renderer.ctx.fillText('☠', x + TILE_SIZE / 2, y + TILE_SIZE / 2);
                } else {
                    // Locked door
                    Renderer.ctx.fillStyle = '#440044';
                    Renderer.ctx.fillRect(x + 4, y + 2, TILE_SIZE - 8, TILE_SIZE - 4);

                    // Lock icon
                    Renderer.ctx.fillStyle = '#666';
                    Renderer.ctx.fillRect(x + 12, y + 14, 8, 8);
                    Renderer.ctx.strokeStyle = '#666';
                    Renderer.ctx.lineWidth = 2;
                    Renderer.ctx.beginPath();
                    Renderer.ctx.arc(x + 16, y + 13, 4, Math.PI, 0);
                    Renderer.ctx.stroke();
                }

                // Door frame
                Renderer.ctx.strokeStyle = allTalked ? '#ff0066' : '#660066';
                Renderer.ctx.lineWidth = 3;
                Renderer.ctx.strokeRect(x + 2, y + 1, TILE_SIZE - 4, TILE_SIZE - 2);
                break;

            case TileType.EXIT:
                // Industrial exit door
                Renderer.ctx.fillStyle = '#004400';
                Renderer.ctx.fillRect(x + 6, y, TILE_SIZE - 12, TILE_SIZE);

                // Exit sign above
                Renderer.ctx.fillStyle = C.safe;
                Renderer.ctx.fillRect(x + 8, y + 4, TILE_SIZE - 16, 8);
                Renderer.ctx.fillStyle = '#002200';
                Renderer.ctx.font = 'bold 6px "Courier New", monospace';
                Renderer.ctx.textAlign = 'center';
                Renderer.ctx.fillText('EXIT', x + TILE_SIZE / 2, y + 10);

                // Door handle
                Renderer.ctx.fillStyle = C.metalLight;
                Renderer.ctx.fillRect(x + TILE_SIZE - 12, y + TILE_SIZE / 2 - 2, 4, 8);

                // Arrow pointing down
                Renderer.ctx.fillStyle = C.safe;
                Renderer.ctx.beginPath();
                Renderer.ctx.moveTo(x + TILE_SIZE / 2, y + TILE_SIZE - 8);
                Renderer.ctx.lineTo(x + TILE_SIZE / 2 - 6, y + TILE_SIZE - 16);
                Renderer.ctx.lineTo(x + TILE_SIZE / 2 + 6, y + TILE_SIZE - 16);
                Renderer.ctx.closePath();
                Renderer.ctx.fill();
                break;
        }

        // Grid lines (subtle)
        Renderer.ctx.strokeStyle = 'rgba(0, 255, 136, 0.03)';
        Renderer.ctx.lineWidth = 1;
        Renderer.ctx.strokeRect(x, y, TILE_SIZE, TILE_SIZE);
    },

    // Draw floor decorations and details
    drawFloorDetails(x, y, tileX, tileY, time) {
        const C = PlantDecorations.colors;

        // Occasional floor markings
        if ((tileX * 7 + tileY * 3) % 17 === 0) {
            // Hazard stripes
            Renderer.ctx.fillStyle = 'rgba(255, 204, 0, 0.2)';
            for (let i = 0; i < 4; i++) {
                Renderer.ctx.fillRect(x + i * 8, y + TILE_SIZE - 4, 4, 4);
            }
        }

        // Floor drain/grate
        if ((tileX * 13 + tileY * 7) % 23 === 0) {
            Renderer.ctx.fillStyle = '#0a0a1a';
            Renderer.ctx.fillRect(x + 10, y + 10, 12, 12);
            Renderer.ctx.strokeStyle = '#2a2a3e';
            Renderer.ctx.lineWidth = 1;
            for (let i = 0; i < 3; i++) {
                Renderer.ctx.beginPath();
                Renderer.ctx.moveTo(x + 12, y + 12 + i * 4);
                Renderer.ctx.lineTo(x + 20, y + 12 + i * 4);
                Renderer.ctx.stroke();
            }
        }

        // Pipe shadows on floor
        if (tileY === 6 || tileY === 7) {
            Renderer.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            Renderer.ctx.fillRect(x, y, TILE_SIZE, 4);
        }

        // Occasional cable conduit
        if ((tileX + tileY) % 8 === 0 && tileY > 2 && tileY < 12) {
            Renderer.ctx.strokeStyle = C.cable;
            Renderer.ctx.lineWidth = 2;
            Renderer.ctx.setLineDash([4, 4]);
            Renderer.ctx.beginPath();
            Renderer.ctx.moveTo(x, y + 16);
            Renderer.ctx.lineTo(x + TILE_SIZE, y + 16);
            Renderer.ctx.stroke();
            Renderer.ctx.setLineDash([]);
        }

        // Blinking floor light
        if ((tileX * 5 + tileY * 11) % 19 === 0) {
            const blink = Math.sin(time / 1000 + tileX) > 0.5;
            if (blink) {
                Renderer.ctx.fillStyle = 'rgba(0, 255, 136, 0.3)';
                Renderer.ctx.beginPath();
                Renderer.ctx.arc(x + TILE_SIZE / 2, y + TILE_SIZE / 2, 3, 0, Math.PI * 2);
                Renderer.ctx.fill();
            }
        }
    }
};
