// ============================================
// ICS DEFENDER CHRONICLES - INPUT HANDLER
// ============================================

const Input = {
    // Key states
    keys: {},
    keysJustPressed: {},
    keysJustReleased: {},

    // Key mappings (SNES-style)
    keyMap: {
        'ArrowUp': 'up',
        'ArrowDown': 'down',
        'ArrowLeft': 'left',
        'ArrowRight': 'right',
        'KeyW': 'up',
        'KeyS': 'down',
        'KeyA': 'left',
        'KeyD': 'right',
        'KeyZ': 'a',        // Confirm/Action
        'Space': 'a',
        'KeyX': 'b',        // Cancel/Back
        'Escape': 'b',
        'Enter': 'start',   // Start/Menu
        'ShiftLeft': 'select',
        'KeyL': 'l',        // Cipher's Detect ability
        'KeyR': 'r'
    },

    // Initialize input system
    init() {
        window.addEventListener('keydown', (e) => this.onKeyDown(e));
        window.addEventListener('keyup', (e) => this.onKeyUp(e));
        window.addEventListener('blur', () => this.reset());
    },

    // Handle key down
    onKeyDown(e) {
        const action = this.keyMap[e.code];
        if (action) {
            e.preventDefault();
            if (!this.keys[action]) {
                this.keysJustPressed[action] = true;
            }
            this.keys[action] = true;
        }
    },

    // Handle key up
    onKeyUp(e) {
        const action = this.keyMap[e.code];
        if (action) {
            e.preventDefault();
            this.keys[action] = false;
            this.keysJustReleased[action] = true;
        }
    },

    // Reset all keys (on window blur)
    reset() {
        this.keys = {};
        this.keysJustPressed = {};
        this.keysJustReleased = {};
    },

    // Clear just pressed/released states (call at end of frame)
    update() {
        this.keysJustPressed = {};
        this.keysJustReleased = {};
    },

    // Check if key is currently held
    isHeld(action) {
        return this.keys[action] === true;
    },

    // Check if key was just pressed this frame
    isPressed(action) {
        return this.keysJustPressed[action] === true;
    },

    // Check if key was just released this frame
    isReleased(action) {
        return this.keysJustReleased[action] === true;
    },

    // Get direction from held keys
    getDirection() {
        if (this.isHeld('up')) return Direction.UP;
        if (this.isHeld('down')) return Direction.DOWN;
        if (this.isHeld('left')) return Direction.LEFT;
        if (this.isHeld('right')) return Direction.RIGHT;
        return Direction.NONE;
    },

    // Get direction from just pressed keys
    getDirectionPressed() {
        if (this.isPressed('up')) return Direction.UP;
        if (this.isPressed('down')) return Direction.DOWN;
        if (this.isPressed('left')) return Direction.LEFT;
        if (this.isPressed('right')) return Direction.RIGHT;
        return Direction.NONE;
    }
};
