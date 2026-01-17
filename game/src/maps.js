// ============================================
// ICS DEFENDER CHRONICLES - MAP SYSTEM
// ============================================

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
        // Base floor
        Renderer.ctx.fillStyle = '#1a1a2e';
        Renderer.ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);

        switch (tile) {
            case TileType.WALL:
                Renderer.ctx.fillStyle = '#2a2a4e';
                Renderer.ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);

                // Wall detail
                Renderer.ctx.strokeStyle = '#3a3a6e';
                Renderer.ctx.lineWidth = 2;
                Renderer.ctx.strokeRect(x + 2, y + 2, TILE_SIZE - 4, TILE_SIZE - 4);
                break;

            case TileType.SAVE_POINT:
                // Glowing save point
                const pulse = Math.sin(Date.now() / 300) * 0.3 + 0.7;
                Renderer.ctx.fillStyle = `rgba(0, 255, 255, ${pulse * 0.3})`;
                Renderer.ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);

                Renderer.ctx.fillStyle = Colors.SECONDARY;
                Renderer.ctx.font = 'bold 20px "Courier New", monospace';
                Renderer.ctx.textAlign = 'center';
                Renderer.ctx.textBaseline = 'middle';
                Renderer.ctx.fillText('S', x + TILE_SIZE / 2, y + TILE_SIZE / 2);
                break;

            case TileType.BOSS_DOOR:
                const allTalked = this.npcs.every(npc => npc.talked);

                if (allTalked) {
                    // Unlocked door - pulsing
                    const doorPulse = Math.sin(Date.now() / 200) * 0.2 + 0.8;
                    Renderer.ctx.fillStyle = `rgba(255, 0, 255, ${doorPulse * 0.5})`;
                    Renderer.ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);

                    Renderer.ctx.fillStyle = '#ff00ff';
                } else {
                    // Locked door
                    Renderer.ctx.fillStyle = '#660066';
                }

                Renderer.ctx.fillRect(x + 4, y + 2, TILE_SIZE - 8, TILE_SIZE - 4);

                // Door frame
                Renderer.ctx.strokeStyle = '#ff00ff';
                Renderer.ctx.lineWidth = 2;
                Renderer.ctx.strokeRect(x + 4, y + 2, TILE_SIZE - 8, TILE_SIZE - 4);

                // Boss icon
                Renderer.ctx.fillStyle = allTalked ? '#fff' : '#888';
                Renderer.ctx.font = 'bold 16px "Courier New", monospace';
                Renderer.ctx.textAlign = 'center';
                Renderer.ctx.textBaseline = 'middle';
                Renderer.ctx.fillText('!', x + TILE_SIZE / 2, y + TILE_SIZE / 2);
                break;

            case TileType.EXIT:
                // Exit marker
                Renderer.ctx.fillStyle = '#00ff00';
                Renderer.ctx.fillRect(x + 8, y, TILE_SIZE - 16, TILE_SIZE);

                Renderer.ctx.fillStyle = '#004400';
                Renderer.ctx.beginPath();
                Renderer.ctx.moveTo(x + TILE_SIZE / 2, y + 8);
                Renderer.ctx.lineTo(x + TILE_SIZE / 2 - 8, y + 20);
                Renderer.ctx.lineTo(x + TILE_SIZE / 2 + 8, y + 20);
                Renderer.ctx.closePath();
                Renderer.ctx.fill();
                break;
        }

        // Grid lines
        Renderer.ctx.strokeStyle = 'rgba(0, 255, 136, 0.05)';
        Renderer.ctx.lineWidth = 1;
        Renderer.ctx.strokeRect(x, y, TILE_SIZE, TILE_SIZE);
    }
};
