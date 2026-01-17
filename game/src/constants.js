// ============================================
// ICS DEFENDER CHRONICLES - GAME CONSTANTS
// ============================================

// Canvas dimensions (SNES resolution scaled 2x)
const CANVAS_WIDTH = 512;
const CANVAS_HEIGHT = 448;
const TILE_SIZE = 32;
const HALF_TILE = 16;

// Game States
const GameState = {
    LOADING: 'loading',
    TITLE: 'title',
    WORLD_MAP: 'worldMap',
    CITY: 'city',
    DIALOGUE: 'dialogue',
    COMBAT: 'combat',
    BOSS_COMBAT: 'bossCombat',
    CUTSCENE: 'cutscene',
    MENU: 'menu',
    GAME_OVER: 'gameOver',
    VICTORY: 'victory'
};

// City IDs
const CityID = {
    NONE: 0,
    TUTORIAL: 1,
    PURDUE: 2,
    PROTOCOL: 3,
    SUPERVISORY: 4,
    GOVERNANCE: 5,
    FINAL: 6
};

// City Names
const CityNames = {
    [CityID.TUTORIAL]: 'Power Plant Alpha',
    [CityID.PURDUE]: 'Purdue City',
    [CityID.PROTOCOL]: 'Protocol Port',
    [CityID.SUPERVISORY]: 'Supervisory Station',
    [CityID.GOVERNANCE]: 'Governance Garrison',
    [CityID.FINAL]: 'Final Fortress'
};

// Character IDs
const CharacterID = {
    CIPHER: 0,
    BLAZE: 1,
    GHOST: 2,
    VOLT: 3
};

// Character data
const Characters = {
    [CharacterID.CIPHER]: {
        name: 'CIPHER',
        role: 'SOC Analyst',
        color: '#4488ff',
        maxHP: 100,
        description: 'Blue Team Lead - Detection specialist'
    },
    [CharacterID.BLAZE]: {
        name: 'BLAZE',
        role: 'Incident Responder',
        color: '#ff6644',
        maxHP: 100,
        description: 'Rapid response and containment'
    },
    [CharacterID.GHOST]: {
        name: 'GHOST',
        role: 'Pen Tester',
        color: '#aa44ff',
        maxHP: 100,
        description: 'Red Team - Thinks like the enemy'
    },
    [CharacterID.VOLT]: {
        name: 'VOLT',
        role: 'ICS Engineer',
        color: '#ffcc00',
        maxHP: 100,
        description: 'OT domain expert'
    }
};

// Combat constants
const Combat = {
    MAX_PARTY_HP: 400,
    TUTORIAL_BOSS_HP: 100,
    PURDUE_BOSS_HP: 150,
    PROTOCOL_BOSS_HP: 200,
    BOSS_TIMER_SECONDS: 30,
    STREAK_BONUS_3: 1.5,
    STREAK_BONUS_5: 2.0,
    BASE_DAMAGE: 10,
    PLAYER_DAMAGE: 25
};

// Colors (cyberpunk theme)
const Colors = {
    BLACK: '#000000',
    DARK_BG: '#0a0a1a',
    PRIMARY: '#00ff88',
    SECONDARY: '#00ccff',
    WARNING: '#ffcc00',
    DANGER: '#ff4444',
    TEXT: '#ffffff',
    TEXT_DIM: '#888888',
    MENU_BG: 'rgba(0, 20, 40, 0.95)',
    DIALOGUE_BG: 'rgba(0, 10, 30, 0.95)',
    CORRECT: '#00ff88',
    WRONG: '#ff4444',
    LOCKED: '#444444'
};

// Direction constants
const Direction = {
    NONE: -1,
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3
};

// Direction vectors
const DirVectors = {
    [Direction.UP]: { x: 0, y: -1 },
    [Direction.DOWN]: { x: 0, y: 1 },
    [Direction.LEFT]: { x: -1, y: 0 },
    [Direction.RIGHT]: { x: 1, y: 0 }
};

// Tile types for maps
const TileType = {
    EMPTY: 0,
    FLOOR: 1,
    WALL: 2,
    WATER: 3,
    CITY_MARKER: 4,
    CITY_LOCKED: 5,
    NPC: 6,
    SAVE_POINT: 7,
    BOSS_DOOR: 8,
    BOSS_DOOR_LOCKED: 9,
    INFO_KIOSK: 10,
    EXIT: 11
};

// NPC IDs for Tutorial City
const NPCID = {
    // Tutorial City NPCs
    CHIEF_MARTINEZ: 'martinez',
    TECHNICIAN_PARK: 'park',
    DR_SANTOS: 'santos',
    // Purdue City NPCs (placeholder)
    NETWORK_ADMIN_CHEN: 'chen',
    SECURITY_LEAD_OKONKWO: 'okonkwo',
    OPERATOR_WILLIAMS: 'williams',
    // Protocol Port NPCs (placeholder)
    PROTOCOL_SPECIALIST_KIM: 'kim',
    FIELD_TECH_RODRIGUEZ: 'rodriguez',
    ANALYST_MORGAN: 'morgan'
};

// Boss IDs
const BossID = {
    GLITCH: 'glitch',
    ARCHITECT: 'architect',
    WIRETAP: 'wiretap'
};

// Boss data
const Bosses = {
    [BossID.GLITCH]: {
        name: 'GLITCH',
        title: 'The Script Kiddie',
        hp: Combat.TUTORIAL_BOSS_HP,
        color: '#ff00ff',
        city: CityID.TUTORIAL
    },
    [BossID.ARCHITECT]: {
        name: 'ARCHITECT',
        title: 'The Network Infiltrator',
        hp: Combat.PURDUE_BOSS_HP,
        color: '#00ffff',
        city: CityID.PURDUE
    },
    [BossID.WIRETAP]: {
        name: 'WIRETAP',
        title: 'The Protocol Exploiter',
        hp: Combat.PROTOCOL_BOSS_HP,
        color: '#ffff00',
        city: CityID.PROTOCOL
    }
};

// Question types
const QuestionType = {
    MULTIPLE_CHOICE: 'multiple_choice',
    TRUE_FALSE: 'true_false',
    MATCHING: 'matching',
    SEQUENCE: 'sequence'
};
