// ============================================
// ICS DEFENDER CHRONICLES - SPRITE SYSTEM
// ============================================

// Character sprite definitions (pixel art patterns)
const CharacterSprites = {
    // CIPHER - Blue Team Lead, SOC Analyst
    CIPHER: {
        color: '#4488ff',
        accent: '#2266cc',
        hair: '#1a1a2e',
        skin: '#d4a574',
        // Simple 8x8 pixel pattern for body (1 = primary, 2 = accent, 3 = hair, 4 = skin, 0 = transparent)
        pattern: [
            [0,0,3,3,3,3,0,0],
            [0,3,4,4,4,4,3,0],
            [0,4,0,4,4,0,4,0],
            [0,4,4,4,4,4,4,0],
            [0,0,1,1,1,1,0,0],
            [0,1,1,2,2,1,1,0],
            [0,1,1,1,1,1,1,0],
            [0,0,1,0,0,1,0,0]
        ]
    },
    // BLAZE - Incident Responder
    BLAZE: {
        color: '#ff6644',
        accent: '#cc4422',
        hair: '#8b4513',
        skin: '#c68642',
        pattern: [
            [0,0,3,3,3,3,0,0],
            [0,3,4,4,4,4,3,0],
            [0,4,0,4,4,0,4,0],
            [0,4,4,4,4,4,4,0],
            [0,0,1,1,1,1,0,0],
            [0,1,1,2,2,1,1,0],
            [0,1,1,1,1,1,1,0],
            [0,0,1,0,0,1,0,0]
        ]
    },
    // GHOST - Pen Tester
    GHOST: {
        color: '#aa44ff',
        accent: '#7722cc',
        hair: '#2d1f3d',
        skin: '#e8beac',
        pattern: [
            [0,0,3,3,3,3,0,0],
            [0,3,4,4,4,4,3,0],
            [0,4,0,4,4,0,4,0],
            [0,4,4,4,4,4,4,0],
            [0,0,1,1,1,1,0,0],
            [0,1,1,2,2,1,1,0],
            [0,1,1,1,1,1,1,0],
            [0,0,1,0,0,1,0,0]
        ]
    },
    // VOLT - ICS Engineer
    VOLT: {
        color: '#ffcc00',
        accent: '#cc9900',
        hair: '#4a3728',
        skin: '#8d5524',
        pattern: [
            [0,0,3,3,3,3,0,0],
            [0,3,4,4,4,4,3,0],
            [0,4,0,4,4,0,4,0],
            [0,4,4,4,4,4,4,0],
            [0,0,1,1,1,1,0,0],
            [0,1,1,2,2,1,1,0],
            [0,1,1,1,1,1,1,0],
            [0,0,1,0,0,1,0,0]
        ]
    }
};

// NPC sprite definitions
const NPCSprites = {
    // Tutorial City NPCs
    martinez: {
        color: '#cc8844',
        accent: '#996633',
        hair: '#4a4a4a',
        skin: '#c68642',
        helmet: true,
        pattern: [
            [0,2,2,2,2,2,2,0],
            [0,2,4,4,4,4,2,0],
            [0,4,0,4,4,0,4,0],
            [0,4,4,4,4,4,4,0],
            [0,0,1,1,1,1,0,0],
            [0,1,1,2,2,1,1,0],
            [0,1,1,1,1,1,1,0],
            [0,0,1,0,0,1,0,0]
        ]
    },
    park: {
        color: '#44aa88',
        accent: '#228866',
        hair: '#1a1a2e',
        skin: '#e8beac',
        pattern: [
            [0,0,3,3,3,3,0,0],
            [0,3,4,4,4,4,3,0],
            [0,4,0,4,4,0,4,0],
            [0,4,4,4,4,4,4,0],
            [0,0,1,1,1,1,0,0],
            [0,1,1,2,2,1,1,0],
            [0,1,1,1,1,1,1,0],
            [0,0,1,0,0,1,0,0]
        ]
    },
    santos: {
        color: '#8844aa',
        accent: '#662288',
        hair: '#2d1f3d',
        skin: '#d4a574',
        labcoat: true,
        pattern: [
            [0,0,3,3,3,3,0,0],
            [0,3,4,4,4,4,3,0],
            [0,4,0,4,4,0,4,0],
            [0,4,4,4,4,4,4,0],
            [0,0,5,5,5,5,0,0],
            [0,5,5,1,1,5,5,0],
            [0,5,5,5,5,5,5,0],
            [0,0,1,0,0,1,0,0]
        ]
    },
    // Purdue City NPCs
    chen: {
        color: '#4488cc',
        accent: '#336699',
        hair: '#1a1a2e',
        skin: '#e8beac',
        pattern: [
            [0,0,3,3,3,3,0,0],
            [0,3,4,4,4,4,3,0],
            [0,4,0,4,4,0,4,0],
            [0,4,4,4,4,4,4,0],
            [0,0,1,1,1,1,0,0],
            [0,1,1,2,2,1,1,0],
            [0,1,1,1,1,1,1,0],
            [0,0,1,0,0,1,0,0]
        ]
    },
    okonkwo: {
        color: '#cc4444',
        accent: '#992222',
        hair: '#1a1a1a',
        skin: '#8d5524',
        pattern: [
            [0,0,3,3,3,3,0,0],
            [0,3,4,4,4,4,3,0],
            [0,4,0,4,4,0,4,0],
            [0,4,4,4,4,4,4,0],
            [0,0,1,1,1,1,0,0],
            [0,1,1,2,2,1,1,0],
            [0,1,1,1,1,1,1,0],
            [0,0,1,0,0,1,0,0]
        ]
    },
    williams: {
        color: '#88aa44',
        accent: '#668822',
        hair: '#8b4513',
        skin: '#c68642',
        pattern: [
            [0,0,3,3,3,3,0,0],
            [0,3,4,4,4,4,3,0],
            [0,4,0,4,4,0,4,0],
            [0,4,4,4,4,4,4,0],
            [0,0,1,1,1,1,0,0],
            [0,1,1,2,2,1,1,0],
            [0,1,1,1,1,1,1,0],
            [0,0,1,0,0,1,0,0]
        ]
    },
    // Protocol Port NPCs
    kim: {
        color: '#44cccc',
        accent: '#229999',
        hair: '#1a1a2e',
        skin: '#e8beac',
        pattern: [
            [0,0,3,3,3,3,0,0],
            [0,3,4,4,4,4,3,0],
            [0,4,0,4,4,0,4,0],
            [0,4,4,4,4,4,4,0],
            [0,0,1,1,1,1,0,0],
            [0,1,1,2,2,1,1,0],
            [0,1,1,1,1,1,1,0],
            [0,0,1,0,0,1,0,0]
        ]
    },
    rodriguez: {
        color: '#cc8844',
        accent: '#996622',
        hair: '#2d1f3d',
        skin: '#c68642',
        hardhat: true,
        pattern: [
            [0,2,2,2,2,2,2,0],
            [0,2,4,4,4,4,2,0],
            [0,4,0,4,4,0,4,0],
            [0,4,4,4,4,4,4,0],
            [0,0,1,1,1,1,0,0],
            [0,1,1,2,2,1,1,0],
            [0,1,1,1,1,1,1,0],
            [0,0,1,0,0,1,0,0]
        ]
    },
    morgan: {
        color: '#aa88cc',
        accent: '#8866aa',
        hair: '#4a3728',
        skin: '#d4a574',
        pattern: [
            [0,0,3,3,3,3,0,0],
            [0,3,4,4,4,4,3,0],
            [0,4,0,4,4,0,4,0],
            [0,4,4,4,4,4,4,0],
            [0,0,1,1,1,1,0,0],
            [0,1,1,2,2,1,1,0],
            [0,1,1,1,1,1,1,0],
            [0,0,1,0,0,1,0,0]
        ]
    }
};

// Boss sprite definitions (larger, more detailed)
const BossSprites = {
    glitch: {
        name: 'GLITCH',
        title: 'The Script Kiddie',
        color: '#ff00ff',
        accent: '#cc00cc',
        eyeColor: '#00ff00',
        // 12x12 pixel pattern for bosses
        pattern: [
            [0,0,0,1,1,1,1,1,1,0,0,0],
            [0,0,1,1,2,1,1,2,1,1,0,0],
            [0,1,1,1,1,1,1,1,1,1,1,0],
            [0,1,2,0,0,2,2,0,0,2,1,0],
            [1,1,1,0,3,1,1,3,0,1,1,1],
            [1,2,1,0,0,1,1,0,0,1,2,1],
            [1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,2,1,2,2,2,2,1,2,1,1],
            [0,1,1,1,1,1,1,1,1,1,1,0],
            [0,0,1,1,0,1,1,0,1,1,0,0],
            [0,0,0,1,1,0,0,1,1,0,0,0],
            [0,0,0,0,1,0,0,1,0,0,0,0]
        ]
    },
    architect: {
        name: 'ARCHITECT',
        title: 'The Network Infiltrator',
        color: '#00ffff',
        accent: '#00cccc',
        eyeColor: '#ff0000',
        pattern: [
            [0,0,1,1,1,1,1,1,1,1,0,0],
            [0,1,2,2,2,2,2,2,2,2,1,0],
            [1,2,1,1,1,1,1,1,1,1,2,1],
            [1,1,1,0,0,1,1,0,0,1,1,1],
            [1,1,1,3,3,1,1,3,3,1,1,1],
            [1,2,1,0,0,1,1,0,0,1,2,1],
            [1,1,1,1,1,1,1,1,1,1,1,1],
            [1,2,1,1,2,2,2,2,1,1,2,1],
            [0,1,1,1,1,1,1,1,1,1,1,0],
            [0,0,1,2,1,0,0,1,2,1,0,0],
            [0,0,1,1,1,0,0,1,1,1,0,0],
            [0,0,0,1,0,0,0,0,1,0,0,0]
        ]
    },
    wiretap: {
        name: 'WIRETAP',
        title: 'The Protocol Exploiter',
        color: '#ffff00',
        accent: '#cccc00',
        eyeColor: '#ff0000',
        pattern: [
            [0,0,0,2,2,2,2,2,2,0,0,0],
            [0,0,2,1,1,1,1,1,1,2,0,0],
            [0,2,1,1,1,1,1,1,1,1,2,0],
            [2,1,1,0,0,1,1,0,0,1,1,2],
            [1,1,1,3,3,1,1,3,3,1,1,1],
            [1,1,1,0,0,1,1,0,0,1,1,1],
            [1,2,1,1,1,1,1,1,1,1,2,1],
            [1,1,2,1,2,2,2,2,1,2,1,1],
            [0,1,1,1,1,1,1,1,1,1,1,0],
            [0,0,1,1,2,0,0,2,1,1,0,0],
            [0,0,0,1,1,0,0,1,1,0,0,0],
            [0,0,0,0,1,0,0,1,0,0,0,0]
        ]
    }
};

// Helper function to draw pixel art pattern
function drawPixelPattern(ctx, pattern, x, y, pixelSize, colors) {
    for (let py = 0; py < pattern.length; py++) {
        for (let px = 0; px < pattern[py].length; px++) {
            const colorIndex = pattern[py][px];
            if (colorIndex === 0) continue; // Transparent

            let color;
            switch(colorIndex) {
                case 1: color = colors.color; break;
                case 2: color = colors.accent; break;
                case 3: color = colors.hair || colors.eyeColor; break;
                case 4: color = colors.skin; break;
                case 5: color = '#ffffff'; break; // White (labcoat)
                default: color = colors.color;
            }

            ctx.fillStyle = color;
            ctx.fillRect(x + px * pixelSize, y + py * pixelSize, pixelSize, pixelSize);
        }
    }
}

// Player sprite class
class PlayerSprite {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.targetX = x;
        this.targetY = y;
        this.direction = Direction.DOWN;
        this.moving = false;
        this.moveSpeed = 0.15;
        this.animFrame = 0;
        this.animTimer = 0;
        this.width = TILE_SIZE - 8;
        this.height = TILE_SIZE - 4;
    }

    // Set position instantly
    setPosition(tileX, tileY) {
        this.x = tileX;
        this.y = tileY;
        this.targetX = tileX;
        this.targetY = tileY;
    }

    // Start moving to a tile
    moveTo(tileX, tileY, direction) {
        if (this.moving) return false;

        this.targetX = tileX;
        this.targetY = tileY;
        this.direction = direction;
        this.moving = true;
        return true;
    }

    // Update movement
    update(deltaTime) {
        if (this.moving) {
            // Interpolate position
            this.x += (this.targetX - this.x) * this.moveSpeed;
            this.y += (this.targetY - this.y) * this.moveSpeed;

            // Check if arrived
            if (Math.abs(this.x - this.targetX) < 0.05 &&
                Math.abs(this.y - this.targetY) < 0.05) {
                this.x = this.targetX;
                this.y = this.targetY;
                this.moving = false;
            }

            // Animate
            this.animTimer += deltaTime;
            if (this.animTimer > 0.15) {
                this.animTimer = 0;
                this.animFrame = (this.animFrame + 1) % 4;
            }
        } else {
            this.animFrame = 0;
        }
    }

    // Get pixel position
    getPixelX() {
        return this.x * TILE_SIZE + 4;
    }

    getPixelY() {
        return this.y * TILE_SIZE + 2;
    }

    // Get tile position (rounded)
    getTileX() {
        return Math.round(this.x);
    }

    getTileY() {
        return Math.round(this.y);
    }

    // Draw the player
    draw(ctx, offsetX = 0, offsetY = 0, time = 0) {
        const px = this.getPixelX() + offsetX;
        const py = this.getPixelY() + offsetY;

        // Walking animation (bob up and down)
        const bobY = this.moving ? Math.sin(this.animFrame * Math.PI / 2) * 2 : 0;

        // Get CIPHER sprite (main player character)
        const sprite = CharacterSprites.CIPHER;
        const pixelSize = 3; // Scale factor for pixel art
        const spriteWidth = sprite.pattern[0].length * pixelSize;
        const spriteHeight = sprite.pattern.length * pixelSize;

        // Center the sprite in the tile
        const spriteX = px + (this.width - spriteWidth) / 2;
        const spriteY = py + (this.height - spriteHeight) / 2 - bobY;

        // Draw the pixel art character
        drawPixelPattern(ctx, sprite.pattern, spriteX, spriteY, pixelSize, sprite);

        // Add direction indicator below sprite
        ctx.fillStyle = Colors.PRIMARY;
        const cx = px + this.width / 2;
        const indicatorY = py + this.height + 2;

        ctx.beginPath();
        switch (this.direction) {
            case Direction.UP:
                ctx.moveTo(cx, indicatorY - 4);
                ctx.lineTo(cx - 4, indicatorY + 2);
                ctx.lineTo(cx + 4, indicatorY + 2);
                break;
            case Direction.DOWN:
                ctx.moveTo(cx, indicatorY + 2);
                ctx.lineTo(cx - 4, indicatorY - 4);
                ctx.lineTo(cx + 4, indicatorY - 4);
                break;
            case Direction.LEFT:
                ctx.moveTo(cx - 4, indicatorY - 1);
                ctx.lineTo(cx + 2, indicatorY - 4);
                ctx.lineTo(cx + 2, indicatorY + 2);
                break;
            case Direction.RIGHT:
                ctx.moveTo(cx + 4, indicatorY - 1);
                ctx.lineTo(cx - 2, indicatorY - 4);
                ctx.lineTo(cx - 2, indicatorY + 2);
                break;
        }
        ctx.closePath();
        ctx.fill();

        // Glow effect for player
        ctx.shadowColor = sprite.color;
        ctx.shadowBlur = 5;
        ctx.strokeStyle = sprite.color;
        ctx.lineWidth = 1;
        ctx.strokeRect(spriteX - 1, spriteY - 1, spriteWidth + 2, spriteHeight + 2);
        ctx.shadowBlur = 0;
    }
}

// NPC sprite class
class NPCSprite {
    constructor(id, name, x, y, color, role) {
        this.id = id;
        this.name = name;
        this.x = x;
        this.y = y;
        this.color = color;
        this.role = role;
        this.direction = Direction.DOWN;
        this.width = TILE_SIZE - 8;
        this.height = TILE_SIZE - 4;
        this.talked = false;
        this.animTimer = 0;
    }

    // Get pixel position
    getPixelX() {
        return this.x * TILE_SIZE + 4;
    }

    getPixelY() {
        return this.y * TILE_SIZE + 2;
    }

    // Update animation
    update(deltaTime) {
        this.animTimer += deltaTime;
    }

    // Draw the NPC
    draw(ctx, offsetX = 0, offsetY = 0, time = 0) {
        const px = this.getPixelX() + offsetX;
        const py = this.getPixelY() + offsetY;

        // Idle bob animation
        const bobY = Math.sin(this.animTimer * 2) * 1;

        // Get NPC sprite data if available
        const sprite = NPCSprites[this.id];
        const pixelSize = 3;

        if (sprite && sprite.pattern) {
            const spriteWidth = sprite.pattern[0].length * pixelSize;
            const spriteHeight = sprite.pattern.length * pixelSize;

            // Center the sprite in the tile
            const spriteX = px + (this.width - spriteWidth) / 2;
            const spriteY = py + (this.height - spriteHeight) / 2 - bobY;

            // Draw with transparency if already talked to
            if (this.talked) {
                ctx.globalAlpha = 0.6;
            }

            // Draw the pixel art character
            drawPixelPattern(ctx, sprite.pattern, spriteX, spriteY, pixelSize, sprite);

            ctx.globalAlpha = 1.0;

            // Border glow
            if (!this.talked) {
                ctx.shadowColor = sprite.color;
                ctx.shadowBlur = 8;
                ctx.strokeStyle = sprite.color;
                ctx.lineWidth = 1;
                ctx.strokeRect(spriteX - 1, spriteY - 1, spriteWidth + 2, spriteHeight + 2);
                ctx.shadowBlur = 0;
            }
        } else {
            // Fallback to colored rectangle with initial
            ctx.fillStyle = this.talked ? this.color + '88' : this.color;
            ctx.fillRect(px, py - bobY, this.width, this.height);

            ctx.fillStyle = Colors.TEXT;
            ctx.font = 'bold 14px "Courier New", monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(this.name[0], px + this.width / 2, py + this.height / 2 - bobY);

            ctx.strokeStyle = this.talked ? Colors.TEXT_DIM : Colors.TEXT;
            ctx.lineWidth = 2;
            ctx.strokeRect(px, py - bobY, this.width, this.height);
        }

        // Exclamation mark if not talked to
        if (!this.talked) {
            ctx.fillStyle = Colors.WARNING;
            ctx.font = 'bold 16px "Courier New", monospace';
            ctx.textAlign = 'center';
            ctx.fillText('!', px + this.width / 2, py - 10 - Math.sin(time * 5) * 3);
        }

        // Name tag below NPC
        ctx.fillStyle = this.talked ? Colors.TEXT_DIM : Colors.TEXT;
        ctx.font = '8px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(this.name.split(' ').pop(), px + this.width / 2, py + this.height + 8);
    }
}

// Enemy/Boss sprite class
class EnemySprite {
    constructor(id, name, title, hp, maxHP, color) {
        this.id = id;
        this.name = name;
        this.title = title;
        this.hp = hp;
        this.maxHP = maxHP;
        this.color = color;
        this.animTimer = 0;
        this.hitFlash = 0;
        this.shakeX = 0;
    }

    // Update animation
    update(deltaTime) {
        this.animTimer += deltaTime;

        if (this.hitFlash > 0) {
            this.hitFlash -= deltaTime * 5;
        }

        if (this.shakeX !== 0) {
            this.shakeX *= 0.9;
            if (Math.abs(this.shakeX) < 0.5) this.shakeX = 0;
        }
    }

    // Trigger hit effect
    hit() {
        this.hitFlash = 1;
        this.shakeX = 10;
    }

    // Draw the enemy (centered at top of screen)
    draw(ctx, time = 0) {
        const centerX = CANVAS_WIDTH / 2;
        const y = 60;

        // Get boss sprite data if available
        const sprite = BossSprites[this.id];
        const pixelSize = 10; // Larger for bosses

        // Idle animation
        const bobY = Math.sin(this.animTimer * 2) * 3;
        const shakeOffset = Math.sin(this.shakeX * 10) * this.shakeX;

        if (sprite && sprite.pattern) {
            const spriteWidth = sprite.pattern[0].length * pixelSize;
            const spriteHeight = sprite.pattern.length * pixelSize;

            const px = centerX - spriteWidth / 2 + shakeOffset;
            const py = y + bobY;

            // Hit flash effect
            if (this.hitFlash > 0) {
                ctx.globalAlpha = 0.5 + Math.sin(this.hitFlash * 20) * 0.5;
            }

            // Draw the pixel art boss
            drawPixelPattern(ctx, sprite.pattern, px, py, pixelSize, sprite);

            ctx.globalAlpha = 1.0;

            // Glitch effect for GLITCH boss
            if (this.id === 'glitch' && Math.random() > 0.95) {
                const glitchX = px + Math.random() * spriteWidth;
                const glitchY = py + Math.random() * spriteHeight;
                ctx.fillStyle = '#00ff00';
                ctx.fillRect(glitchX, glitchY, pixelSize * 2, pixelSize);
            }

            // Electric effect for WIRETAP
            if (this.id === 'wiretap' && Math.random() > 0.9) {
                ctx.strokeStyle = '#ffff00';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(px + Math.random() * spriteWidth, py);
                ctx.lineTo(px + Math.random() * spriteWidth, py + spriteHeight);
                ctx.stroke();
            }

            // Data stream effect for ARCHITECT
            if (this.id === 'architect') {
                ctx.fillStyle = 'rgba(0, 255, 255, 0.3)';
                for (let i = 0; i < 5; i++) {
                    const streamY = (time * 100 + i * 30) % spriteHeight;
                    ctx.fillRect(px, py + streamY, spriteWidth, 2);
                }
            }

            // Border glow
            ctx.shadowColor = sprite.color;
            ctx.shadowBlur = 15;
            ctx.strokeStyle = this.hitFlash > 0 ? '#ffffff' : sprite.color;
            ctx.lineWidth = 2;
            ctx.strokeRect(px - 2, py - 2, spriteWidth + 4, spriteHeight + 4);
            ctx.shadowBlur = 0;

            // Name and title
            ctx.fillStyle = Colors.TEXT;
            ctx.font = 'bold 18px "Courier New", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(this.name, centerX, py + spriteHeight + 25);

            ctx.fillStyle = Colors.TEXT_DIM;
            ctx.font = '14px "Courier New", monospace';
            ctx.fillText(this.title, centerX, py + spriteHeight + 45);

            // HP Bar
            Renderer.drawHPBar(centerX - 80, py + spriteHeight + 55, 160, 16, this.hp, this.maxHP);
            ctx.fillStyle = Colors.TEXT;
            ctx.font = '12px "Courier New", monospace';
            ctx.fillText(`HP: ${this.hp}/${this.maxHP}`, centerX, py + spriteHeight + 85);
        } else {
            // Fallback rendering
            const width = 120;
            const height = 100;
            const px = centerX - width / 2 + shakeOffset;
            const py = y + bobY;

            const flashColor = this.hitFlash > 0 ? '#ffffff' : this.color;

            ctx.fillStyle = flashColor;
            ctx.fillRect(px, py, width, height);

            ctx.fillStyle = Colors.DANGER;
            ctx.fillRect(px + 30, py + 30, 15, 10);
            ctx.fillRect(px + 75, py + 30, 15, 10);

            ctx.strokeStyle = Colors.DANGER;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(px + 35, py + 70);
            ctx.quadraticCurveTo(px + 60, py + 85, px + 85, py + 70);
            ctx.stroke();

            ctx.strokeStyle = this.hitFlash > 0 ? Colors.DANGER : Colors.TEXT;
            ctx.lineWidth = 3;
            ctx.strokeRect(px, py, width, height);

            ctx.fillStyle = Colors.TEXT;
            ctx.font = 'bold 18px "Courier New", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(this.name, centerX, py + height + 25);

            ctx.fillStyle = Colors.TEXT_DIM;
            ctx.font = '14px "Courier New", monospace';
            ctx.fillText(this.title, centerX, py + height + 45);

            Renderer.drawHPBar(centerX - 80, py + height + 55, 160, 16, this.hp, this.maxHP);
            ctx.fillStyle = Colors.TEXT;
            ctx.font = '12px "Courier New", monospace';
            ctx.fillText(`HP: ${this.hp}/${this.maxHP}`, centerX, py + height + 85);
        }
    }
}

// Export for use
const Sprites = {
    PlayerSprite,
    NPCSprite,
    EnemySprite
};
