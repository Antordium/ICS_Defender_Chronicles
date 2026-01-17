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

    // Draw character portrait placeholder
    drawPortrait(x, y, size, color, name) {
        // Background
        this.ctx.fillStyle = Colors.BLACK;
        this.ctx.fillRect(x, y, size, size);

        // Character color
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x + 4, y + 4, size - 8, size - 8);

        // Border
        this.ctx.strokeStyle = Colors.PRIMARY;
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(x, y, size, size);

        // Name initial
        this.ctx.fillStyle = Colors.TEXT;
        this.ctx.font = 'bold 24px "Courier New", monospace';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(name[0], x + size / 2, y + size / 2);
    },

    // Draw tile
    drawTile(x, y, tileType) {
        const colors = {
            [TileType.EMPTY]: '#000000',
            [TileType.FLOOR]: '#1a1a2e',
            [TileType.WALL]: '#2a2a4e',
            [TileType.WATER]: '#0044aa',
            [TileType.CITY_MARKER]: '#00ff88',
            [TileType.CITY_LOCKED]: '#444444',
            [TileType.NPC]: '#ffcc00',
            [TileType.SAVE_POINT]: '#00ffff',
            [TileType.BOSS_DOOR]: '#ff00ff',
            [TileType.BOSS_DOOR_LOCKED]: '#660066',
            [TileType.INFO_KIOSK]: '#88ff88',
            [TileType.EXIT]: '#00ff00'
        };

        const color = colors[tileType] || '#ff00ff';
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);

        // Tile border for visibility
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(x, y, TILE_SIZE, TILE_SIZE);
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
