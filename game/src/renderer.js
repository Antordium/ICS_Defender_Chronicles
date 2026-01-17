// ============================================
// ICS DEFENDER CHRONICLES - RENDERER
// ============================================

const Renderer = {
    canvas: null,
    ctx: null,
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,

    // Screen shake effect
    shakeAmount: 0,
    shakeDecay: 0.9,

    // Fade effect
    fadeAlpha: 0,
    fadeTarget: 0,
    fadeSpeed: 0.05,

    // Initialize renderer
    init() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');

        // Disable image smoothing for pixel art
        this.ctx.imageSmoothingEnabled = false;

        console.log('Renderer initialized');
    },

    // Clear the screen
    clear(color = Colors.DARK_BG) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.width, this.height);
    },

    // Apply screen shake
    applyShake() {
        if (this.shakeAmount > 0.5) {
            const shakeX = (Math.random() - 0.5) * this.shakeAmount;
            const shakeY = (Math.random() - 0.5) * this.shakeAmount;
            this.ctx.translate(shakeX, shakeY);
            this.shakeAmount *= this.shakeDecay;
        } else {
            this.shakeAmount = 0;
        }
    },

    // Trigger screen shake
    shake(amount = 10) {
        this.shakeAmount = amount;
    },

    // Update fade effect
    updateFade() {
        if (Math.abs(this.fadeAlpha - this.fadeTarget) > 0.01) {
            this.fadeAlpha += (this.fadeTarget - this.fadeAlpha) * this.fadeSpeed;
        } else {
            this.fadeAlpha = this.fadeTarget;
        }
    },

    // Draw fade overlay
    drawFade() {
        if (this.fadeAlpha > 0.01) {
            this.ctx.fillStyle = `rgba(0, 0, 0, ${this.fadeAlpha})`;
            this.ctx.fillRect(0, 0, this.width, this.height);
        }
    },

    // Fade to black
    fadeOut(speed = 0.05) {
        this.fadeTarget = 1;
        this.fadeSpeed = speed;
    },

    // Fade from black
    fadeIn(speed = 0.05) {
        this.fadeTarget = 0;
        this.fadeSpeed = speed;
    },

    // Check if fade is complete
    isFadeComplete() {
        return Math.abs(this.fadeAlpha - this.fadeTarget) < 0.01;
    },

    // Draw rectangle
    drawRect(x, y, width, height, color, filled = true) {
        if (filled) {
            this.ctx.fillStyle = color;
            this.ctx.fillRect(x, y, width, height);
        } else {
            this.ctx.strokeStyle = color;
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(x, y, width, height);
        }
    },

    // Draw bordered box (for menus/dialogs)
    drawBox(x, y, width, height, bgColor = Colors.MENU_BG, borderColor = Colors.PRIMARY) {
        // Background
        this.ctx.fillStyle = bgColor;
        this.ctx.fillRect(x, y, width, height);

        // Border
        this.ctx.strokeStyle = borderColor;
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(x + 1, y + 1, width - 2, height - 2);

        // Inner glow
        this.ctx.strokeStyle = `${borderColor}44`;
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(x + 4, y + 4, width - 8, height - 8);
    },

    // Draw text
    drawText(text, x, y, color = Colors.TEXT, size = 16, align = 'left') {
        this.ctx.fillStyle = color;
        this.ctx.font = `${size}px "Courier New", monospace`;
        this.ctx.textAlign = align;
        this.ctx.textBaseline = 'top';
        this.ctx.fillText(text, x, y);
    },

    // Draw text with shadow
    drawTextShadow(text, x, y, color = Colors.TEXT, size = 16, align = 'left') {
        this.ctx.font = `${size}px "Courier New", monospace`;
        this.ctx.textAlign = align;
        this.ctx.textBaseline = 'top';

        // Shadow
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillText(text, x + 2, y + 2);

        // Text
        this.ctx.fillStyle = color;
        this.ctx.fillText(text, x, y);
    },

    // Draw centered text
    drawTextCentered(text, y, color = Colors.TEXT, size = 16) {
        this.drawText(text, this.width / 2, y, color, size, 'center');
    },

    // Draw multi-line text
    drawTextMultiline(lines, x, y, color = Colors.TEXT, size = 16, lineHeight = null) {
        lineHeight = lineHeight || size + 4;
        for (let i = 0; i < lines.length; i++) {
            this.drawText(lines[i], x, y + i * lineHeight, color, size);
        }
    },

    // Draw HP bar
    drawHPBar(x, y, width, height, current, max, color = Colors.PRIMARY) {
        const percentage = Math.max(0, current / max);

        // Background
        this.ctx.fillStyle = Colors.BLACK;
        this.ctx.fillRect(x, y, width, height);

        // HP fill
        const hpColor = percentage > 0.5 ? Colors.PRIMARY :
                        percentage > 0.25 ? Colors.WARNING : Colors.DANGER;
        this.ctx.fillStyle = hpColor;
        this.ctx.fillRect(x + 1, y + 1, (width - 2) * percentage, height - 2);

        // Border
        this.ctx.strokeStyle = Colors.TEXT;
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(x, y, width, height);
    },

    // Draw timer bar
    drawTimerBar(x, y, width, height, timeLeft, maxTime) {
        const percentage = Math.max(0, timeLeft / maxTime);

        // Background
        this.ctx.fillStyle = Colors.BLACK;
        this.ctx.fillRect(x, y, width, height);

        // Timer fill
        const timerColor = percentage > 0.5 ? Colors.SECONDARY :
                          percentage > 0.25 ? Colors.WARNING : Colors.DANGER;
        this.ctx.fillStyle = timerColor;
        this.ctx.fillRect(x + 1, y + 1, (width - 2) * percentage, height - 2);

        // Border
        this.ctx.strokeStyle = Colors.TEXT;
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(x, y, width, height);
    },

    // Draw sprite placeholder (colored rectangle with initial)
    drawSpritePlaceholder(x, y, width, height, color, label = '') {
        // Body
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);

        // Border
        this.ctx.strokeStyle = Colors.TEXT;
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(x, y, width, height);

        // Label
        if (label) {
            this.ctx.fillStyle = Colors.TEXT;
            this.ctx.font = '12px "Courier New", monospace';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(label, x + width / 2, y + height / 2);
        }
    },

    // Draw character portrait with Chrono Trigger style pixel art
    drawPortrait(x, y, size, color, name) {
        // Background with gradient
        const bgGradient = this.ctx.createLinearGradient(x, y, x, y + size);
        bgGradient.addColorStop(0, '#1a1a2e');
        bgGradient.addColorStop(1, '#0a0a1a');
        this.ctx.fillStyle = bgGradient;
        this.ctx.fillRect(x, y, size, size);

        // Try to find the sprite for this character
        let sprite = null;
        let pattern = null;
        let palette = null;
        let pixelSize = 2; // Chrono Trigger style portrait scale
        let isBoss = false;

        // Check main characters (use first frame for portrait)
        if (name === 'CIPHER') {
            sprite = CharacterSprites.CIPHER;
            pattern = sprite.frames?.down?.[0];
            palette = sprite.palette;
            pixelSize = 1.8;
        } else if (name === 'BLAZE') {
            sprite = CharacterSprites.BLAZE;
            pattern = CharacterSprites.CIPHER.frames?.down?.[0]; // Use CIPHER base with BLAZE palette
            palette = sprite.palette;
            pixelSize = 1.8;
        } else if (name === 'GHOST') {
            sprite = CharacterSprites.GHOST;
            pattern = CharacterSprites.CIPHER.frames?.down?.[0];
            palette = sprite.palette;
            pixelSize = 1.8;
        } else if (name === 'VOLT') {
            sprite = CharacterSprites.VOLT;
            pattern = CharacterSprites.CIPHER.frames?.down?.[0];
            palette = sprite.palette;
            pixelSize = 1.8;
        }
        // Check bosses
        else if (name === 'GLITCH') {
            sprite = BossSprites.glitch;
            palette = sprite.palette;
            isBoss = true;
        } else if (name === 'ARCHITECT') {
            sprite = BossSprites.architect;
            palette = sprite.palette;
            isBoss = true;
        } else if (name === 'WIRETAP') {
            sprite = BossSprites.wiretap;
            palette = sprite.palette;
            isBoss = true;
        }
        // Check NPCs by name matching
        else if (name.includes('Martinez')) {
            sprite = NPCSprites.martinez;
            pattern = GenericNPCPattern;
            palette = sprite.palette;
        } else if (name.includes('Park')) {
            sprite = NPCSprites.park;
            pattern = GenericNPCPattern;
            palette = sprite.palette;
        } else if (name.includes('Santos')) {
            sprite = NPCSprites.santos;
            pattern = GenericNPCPattern;
            palette = sprite.palette;
        } else if (name.includes('Chen')) {
            sprite = NPCSprites.chen;
            pattern = GenericNPCPattern;
            palette = sprite.palette;
        } else if (name.includes('Okonkwo')) {
            sprite = NPCSprites.okonkwo;
            pattern = GenericNPCPattern;
            palette = sprite.palette;
        } else if (name.includes('Williams')) {
            sprite = NPCSprites.williams;
            pattern = GenericNPCPattern;
            palette = sprite.palette;
        } else if (name.includes('Kim')) {
            sprite = NPCSprites.kim;
            pattern = GenericNPCPattern;
            palette = sprite.palette;
        } else if (name.includes('Rodriguez')) {
            sprite = NPCSprites.rodriguez;
            pattern = GenericNPCPattern;
            palette = sprite.palette;
        } else if (name.includes('Morgan')) {
            sprite = NPCSprites.morgan;
            pattern = GenericNPCPattern;
            palette = sprite.palette;
        }

        if (isBoss && palette) {
            // Draw boss portrait using geometric shape
            const bossX = x + size * 0.15;
            const bossY = y + size * 0.1;
            const bossW = size * 0.7;
            const bossH = size * 0.75;

            // Gradient background based on boss color
            const bossGradient = this.ctx.createLinearGradient(x, y, x, y + size);
            bossGradient.addColorStop(0, palette.body[4] + '88');
            bossGradient.addColorStop(1, palette.body[5] + '88');
            this.ctx.fillStyle = bossGradient;
            this.ctx.fillRect(x + 2, y + 2, size - 4, size - 4);

            // Boss silhouette
            const bodyGradient = this.ctx.createLinearGradient(bossX, bossY, bossX, bossY + bossH);
            for (let i = 0; i < palette.body.length; i++) {
                bodyGradient.addColorStop(i / (palette.body.length - 1), palette.body[i]);
            }
            this.ctx.fillStyle = bodyGradient;

            this.ctx.beginPath();
            this.ctx.moveTo(bossX + bossW / 2, bossY);
            this.ctx.lineTo(bossX + bossW, bossY + bossH * 0.3);
            this.ctx.lineTo(bossX + bossW * 0.85, bossY + bossH);
            this.ctx.lineTo(bossX + bossW * 0.15, bossY + bossH);
            this.ctx.lineTo(bossX, bossY + bossH * 0.3);
            this.ctx.closePath();
            this.ctx.fill();

            // Glowing eyes
            const eyeY = bossY + bossH * 0.3;
            this.ctx.fillStyle = palette.accent[0];
            this.ctx.shadowColor = palette.accent[0];
            this.ctx.shadowBlur = 8;
            this.ctx.beginPath();
            this.ctx.ellipse(bossX + bossW * 0.35, eyeY, 4, 3, 0, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.beginPath();
            this.ctx.ellipse(bossX + bossW * 0.65, eyeY, 4, 3, 0, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.shadowBlur = 0;

        } else if (pattern && palette) {
            // Draw Chrono Trigger style pixel art portrait
            const spriteWidth = pattern[0].length * pixelSize;
            const spriteHeight = pattern.length * pixelSize;
            const spriteX = x + (size - spriteWidth) / 2;
            const spriteY = y + (size - spriteHeight) / 2;

            // Draw background accent
            const bgColor = palette.body ? palette.body[3] : color;
            this.ctx.fillStyle = bgColor + '33';
            this.ctx.fillRect(x + 4, y + 4, size - 8, size - 8);

            // Draw the pixel art using Chrono Trigger style function
            if (typeof drawCTSprite === 'function') {
                drawCTSprite(this.ctx, pattern, spriteX, spriteY, pixelSize, palette, {
                    outline: true,
                    outlineColor: '#000000',
                    shadow: false
                });
            } else {
                // Fallback drawing
                for (let py = 0; py < pattern.length; py++) {
                    for (let px = 0; px < pattern[py].length; px++) {
                        const colorIndex = pattern[py][px];
                        if (colorIndex === 0) continue;

                        let pixelColor = color;
                        if (colorIndex >= 1 && colorIndex <= 6 && palette.body) {
                            pixelColor = palette.body[Math.min(colorIndex - 1, palette.body.length - 1)];
                        } else if (colorIndex >= 5 && colorIndex <= 8 && palette.skin) {
                            pixelColor = palette.skin[Math.min(colorIndex - 5, palette.skin.length - 1)];
                        } else if (colorIndex >= 9 && colorIndex <= 12 && palette.hair) {
                            pixelColor = palette.hair[Math.min(colorIndex - 9, palette.hair.length - 1)];
                        }

                        this.ctx.fillStyle = pixelColor;
                        this.ctx.fillRect(spriteX + px * pixelSize, spriteY + py * pixelSize, pixelSize, pixelSize);
                    }
                }
            }
        } else {
            // Fallback to styled initial
            const gradient = this.ctx.createRadialGradient(
                x + size / 2, y + size / 2, 0,
                x + size / 2, y + size / 2, size / 2
            );
            gradient.addColorStop(0, color);
            gradient.addColorStop(1, color + '44');
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(x + 8, y + 8, size - 16, size - 16);

            this.ctx.fillStyle = Colors.TEXT;
            this.ctx.font = 'bold 28px "Courier New", monospace';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.shadowColor = '#000000';
            this.ctx.shadowBlur = 4;
            this.ctx.fillText(name[0], x + size / 2, y + size / 2);
            this.ctx.shadowBlur = 0;
        }

        // Fancy border with glow
        this.ctx.shadowColor = color;
        this.ctx.shadowBlur = 8;
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 3;
        this.ctx.strokeRect(x + 1, y + 1, size - 2, size - 2);
        this.ctx.shadowBlur = 0;

        // Inner border highlight
        this.ctx.strokeStyle = color + '66';
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(x + 4, y + 4, size - 8, size - 8);
    },

    // Draw tile with Chrono Trigger style details
    drawTile(x, y, tileType, time = 0) {
        const ts = TILE_SIZE;

        switch(tileType) {
            case TileType.EMPTY:
                this.ctx.fillStyle = '#000000';
                this.ctx.fillRect(x, y, ts, ts);
                break;

            case TileType.FLOOR:
                // Industrial metal floor with texture
                this.ctx.fillStyle = '#1a1a2e';
                this.ctx.fillRect(x, y, ts, ts);
                // Grid pattern
                this.ctx.strokeStyle = '#2a2a4e';
                this.ctx.lineWidth = 1;
                this.ctx.strokeRect(x + 2, y + 2, ts - 4, ts - 4);
                // Rivets
                this.ctx.fillStyle = '#3a3a5e';
                this.ctx.fillRect(x + 2, y + 2, 3, 3);
                this.ctx.fillRect(x + ts - 5, y + 2, 3, 3);
                this.ctx.fillRect(x + 2, y + ts - 5, 3, 3);
                this.ctx.fillRect(x + ts - 5, y + ts - 5, 3, 3);
                break;

            case TileType.WALL:
                // Industrial wall with panels
                const wallGradient = this.ctx.createLinearGradient(x, y, x, y + ts);
                wallGradient.addColorStop(0, '#3a3a5e');
                wallGradient.addColorStop(0.5, '#2a2a4e');
                wallGradient.addColorStop(1, '#1a1a3e');
                this.ctx.fillStyle = wallGradient;
                this.ctx.fillRect(x, y, ts, ts);
                // Panel lines
                this.ctx.strokeStyle = '#4a4a6e';
                this.ctx.lineWidth = 2;
                this.ctx.strokeRect(x + 1, y + 1, ts - 2, ts - 2);
                this.ctx.strokeStyle = '#0a0a1e';
                this.ctx.lineWidth = 1;
                this.ctx.beginPath();
                this.ctx.moveTo(x, y + ts / 2);
                this.ctx.lineTo(x + ts, y + ts / 2);
                this.ctx.stroke();
                break;

            case TileType.WATER:
                // Animated water/coolant
                const waterPhase = (time || 0) * 2;
                const waterGradient = this.ctx.createLinearGradient(x, y, x + ts, y + ts);
                waterGradient.addColorStop(0, '#0044aa');
                waterGradient.addColorStop(0.5, '#0066cc');
                waterGradient.addColorStop(1, '#0044aa');
                this.ctx.fillStyle = waterGradient;
                this.ctx.fillRect(x, y, ts, ts);
                // Ripple effect
                this.ctx.strokeStyle = 'rgba(100, 200, 255, 0.3)';
                this.ctx.lineWidth = 1;
                for (let i = 0; i < 3; i++) {
                    const rippleY = ((waterPhase + i * 10) % ts);
                    this.ctx.beginPath();
                    this.ctx.moveTo(x, y + rippleY);
                    this.ctx.bezierCurveTo(x + ts/3, y + rippleY - 3, x + ts*2/3, y + rippleY + 3, x + ts, y + rippleY);
                    this.ctx.stroke();
                }
                break;

            case TileType.CITY_MARKER:
                // Glowing city entrance
                this.ctx.fillStyle = '#1a2a1a';
                this.ctx.fillRect(x, y, ts, ts);
                // Glow effect
                const cityGlow = this.ctx.createRadialGradient(x + ts/2, y + ts/2, 0, x + ts/2, y + ts/2, ts/2);
                cityGlow.addColorStop(0, 'rgba(0, 255, 136, 0.6)');
                cityGlow.addColorStop(1, 'rgba(0, 255, 136, 0)');
                this.ctx.fillStyle = cityGlow;
                this.ctx.fillRect(x, y, ts, ts);
                // Icon
                this.ctx.fillStyle = '#00ff88';
                this.ctx.font = 'bold 16px "Courier New"';
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.fillText('◆', x + ts/2, y + ts/2);
                break;

            case TileType.CITY_LOCKED:
                this.ctx.fillStyle = '#1a1a1a';
                this.ctx.fillRect(x, y, ts, ts);
                this.ctx.fillStyle = '#444444';
                this.ctx.font = 'bold 16px "Courier New"';
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.fillText('🔒', x + ts/2, y + ts/2);
                break;

            case TileType.NPC:
                // NPC standing area
                this.ctx.fillStyle = '#1a1a2e';
                this.ctx.fillRect(x, y, ts, ts);
                break;

            case TileType.SAVE_POINT:
                // Glowing save terminal
                this.ctx.fillStyle = '#0a1a2a';
                this.ctx.fillRect(x, y, ts, ts);
                const saveGlow = this.ctx.createRadialGradient(x + ts/2, y + ts/2, 0, x + ts/2, y + ts/2, ts/2);
                const savePulse = Math.sin((time || 0) * 3) * 0.3 + 0.7;
                saveGlow.addColorStop(0, `rgba(0, 255, 255, ${savePulse})`);
                saveGlow.addColorStop(1, 'rgba(0, 255, 255, 0)');
                this.ctx.fillStyle = saveGlow;
                this.ctx.fillRect(x, y, ts, ts);
                // Terminal icon
                this.ctx.fillStyle = '#00ffff';
                this.ctx.font = 'bold 14px "Courier New"';
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.fillText('💾', x + ts/2, y + ts/2);
                break;

            case TileType.BOSS_DOOR:
                // Menacing boss door
                const doorGradient = this.ctx.createLinearGradient(x, y, x, y + ts);
                doorGradient.addColorStop(0, '#ff00ff');
                doorGradient.addColorStop(0.5, '#cc00cc');
                doorGradient.addColorStop(1, '#880088');
                this.ctx.fillStyle = doorGradient;
                this.ctx.fillRect(x, y, ts, ts);
                // Pulsing effect
                const bossPulse = Math.sin((time || 0) * 4) * 0.3 + 0.5;
                this.ctx.fillStyle = `rgba(255, 100, 255, ${bossPulse})`;
                this.ctx.fillRect(x + 4, y + 4, ts - 8, ts - 8);
                // Warning icon
                this.ctx.fillStyle = '#ffffff';
                this.ctx.font = 'bold 16px "Courier New"';
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.fillText('⚠', x + ts/2, y + ts/2);
                break;

            case TileType.BOSS_DOOR_LOCKED:
                this.ctx.fillStyle = '#2a0a2a';
                this.ctx.fillRect(x, y, ts, ts);
                this.ctx.strokeStyle = '#660066';
                this.ctx.lineWidth = 2;
                this.ctx.strokeRect(x + 2, y + 2, ts - 4, ts - 4);
                this.ctx.fillStyle = '#660066';
                this.ctx.font = 'bold 14px "Courier New"';
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.fillText('🔒', x + ts/2, y + ts/2);
                break;

            case TileType.INFO_KIOSK:
                // Information terminal
                this.ctx.fillStyle = '#1a2a1a';
                this.ctx.fillRect(x, y, ts, ts);
                const infoGlow = this.ctx.createRadialGradient(x + ts/2, y + ts/2, 0, x + ts/2, y + ts/2, ts/2);
                infoGlow.addColorStop(0, 'rgba(136, 255, 136, 0.5)');
                infoGlow.addColorStop(1, 'rgba(136, 255, 136, 0)');
                this.ctx.fillStyle = infoGlow;
                this.ctx.fillRect(x, y, ts, ts);
                this.ctx.fillStyle = '#88ff88';
                this.ctx.font = 'bold 16px "Courier New"';
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.fillText('ℹ', x + ts/2, y + ts/2);
                break;

            case TileType.EXIT:
                // Exit portal
                this.ctx.fillStyle = '#0a1a0a';
                this.ctx.fillRect(x, y, ts, ts);
                const exitGlow = this.ctx.createRadialGradient(x + ts/2, y + ts/2, 0, x + ts/2, y + ts/2, ts/2);
                exitGlow.addColorStop(0, 'rgba(0, 255, 0, 0.7)');
                exitGlow.addColorStop(1, 'rgba(0, 255, 0, 0)');
                this.ctx.fillStyle = exitGlow;
                this.ctx.fillRect(x, y, ts, ts);
                this.ctx.fillStyle = '#00ff00';
                this.ctx.font = 'bold 16px "Courier New"';
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.fillText('↑', x + ts/2, y + ts/2);
                break;

            default:
                // Unknown tile
                this.ctx.fillStyle = '#ff00ff';
                this.ctx.fillRect(x, y, ts, ts);
                this.ctx.fillStyle = '#000000';
                this.ctx.font = '10px "Courier New"';
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.fillText('?', x + ts/2, y + ts/2);
        }
    },

    // Draw menu cursor
    drawCursor(x, y, time) {
        const pulse = Math.sin(time * 5) * 2;
        this.ctx.fillStyle = Colors.PRIMARY;
        this.ctx.beginPath();
        this.ctx.moveTo(x + pulse, y + 8);
        this.ctx.lineTo(x + 12 + pulse, y + 16);
        this.ctx.lineTo(x + pulse, y + 24);
        this.ctx.closePath();
        this.ctx.fill();
    },

    // Draw selection highlight
    drawSelectionHighlight(x, y, width, height, time) {
        const alpha = 0.3 + Math.sin(time * 4) * 0.1;
        this.ctx.fillStyle = `rgba(0, 255, 136, ${alpha})`;
        this.ctx.fillRect(x, y, width, height);

        this.ctx.strokeStyle = Colors.PRIMARY;
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(x, y, width, height);
    }
};
