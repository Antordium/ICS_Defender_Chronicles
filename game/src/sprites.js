// ============================================
// ICS DEFENDER CHRONICLES - SPRITE SYSTEM
// ============================================

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

        // Direction colors for visibility
        const dirColors = {
            [Direction.UP]: '#00aaff',
            [Direction.DOWN]: '#00ff88',
            [Direction.LEFT]: '#ffaa00',
            [Direction.RIGHT]: '#ff00aa'
        };

        // Body
        ctx.fillStyle = dirColors[this.direction] || '#00ff88';
        ctx.fillRect(px, py, this.width, this.height);

        // Walking animation (bob up and down)
        const bobY = this.moving ? Math.sin(this.animFrame * Math.PI / 2) * 2 : 0;

        // Direction indicator
        ctx.fillStyle = Colors.TEXT;
        const cx = px + this.width / 2;
        const cy = py + this.height / 2 - bobY;

        ctx.beginPath();
        switch (this.direction) {
            case Direction.UP:
                ctx.moveTo(cx, cy - 8);
                ctx.lineTo(cx - 6, cy + 4);
                ctx.lineTo(cx + 6, cy + 4);
                break;
            case Direction.DOWN:
                ctx.moveTo(cx, cy + 8);
                ctx.lineTo(cx - 6, cy - 4);
                ctx.lineTo(cx + 6, cy - 4);
                break;
            case Direction.LEFT:
                ctx.moveTo(cx - 8, cy);
                ctx.lineTo(cx + 4, cy - 6);
                ctx.lineTo(cx + 4, cy + 6);
                break;
            case Direction.RIGHT:
                ctx.moveTo(cx + 8, cy);
                ctx.lineTo(cx - 4, cy - 6);
                ctx.lineTo(cx - 4, cy + 6);
                break;
        }
        ctx.closePath();
        ctx.fill();

        // Border
        ctx.strokeStyle = Colors.TEXT;
        ctx.lineWidth = 2;
        ctx.strokeRect(px, py - bobY, this.width, this.height);
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

        // Body color (dimmer if already talked to)
        ctx.fillStyle = this.talked ? this.color + '88' : this.color;
        ctx.fillRect(px, py - bobY, this.width, this.height);

        // Name initial
        ctx.fillStyle = Colors.TEXT;
        ctx.font = 'bold 14px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.name[0], px + this.width / 2, py + this.height / 2 - bobY);

        // Border
        ctx.strokeStyle = this.talked ? Colors.TEXT_DIM : Colors.TEXT;
        ctx.lineWidth = 2;
        ctx.strokeRect(px, py - bobY, this.width, this.height);

        // Exclamation mark if not talked to
        if (!this.talked) {
            ctx.fillStyle = Colors.WARNING;
            ctx.font = 'bold 16px "Courier New", monospace';
            ctx.fillText('!', px + this.width / 2, py - 10 - Math.sin(time * 5) * 3);
        }
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
        const width = 120;
        const height = 100;

        // Idle animation
        const bobY = Math.sin(this.animTimer * 2) * 3;
        const shakeOffset = Math.sin(this.shakeX * 10) * this.shakeX;

        const px = centerX - width / 2 + shakeOffset;
        const py = y + bobY;

        // Hit flash
        const flashColor = this.hitFlash > 0 ? '#ffffff' : this.color;

        // Body
        ctx.fillStyle = flashColor;
        ctx.fillRect(px, py, width, height);

        // Menacing eyes
        ctx.fillStyle = Colors.DANGER;
        ctx.fillRect(px + 30, py + 30, 15, 10);
        ctx.fillRect(px + 75, py + 30, 15, 10);

        // Evil grin
        ctx.strokeStyle = Colors.DANGER;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(px + 35, py + 70);
        ctx.quadraticCurveTo(px + 60, py + 85, px + 85, py + 70);
        ctx.stroke();

        // Border with glow
        ctx.strokeStyle = this.hitFlash > 0 ? Colors.DANGER : Colors.TEXT;
        ctx.lineWidth = 3;
        ctx.strokeRect(px, py, width, height);

        // Name and title
        ctx.fillStyle = Colors.TEXT;
        ctx.font = 'bold 18px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(this.name, centerX, py + height + 25);

        ctx.fillStyle = Colors.TEXT_DIM;
        ctx.font = '14px "Courier New", monospace';
        ctx.fillText(this.title, centerX, py + height + 45);

        // HP Bar
        Renderer.drawHPBar(centerX - 80, py + height + 55, 160, 16, this.hp, this.maxHP);
        ctx.fillStyle = Colors.TEXT;
        ctx.font = '12px "Courier New", monospace';
        ctx.fillText(`HP: ${this.hp}/${this.maxHP}`, centerX, py + height + 85);
    }
}

// Export for use
const Sprites = {
    PlayerSprite,
    NPCSprite,
    EnemySprite
};
