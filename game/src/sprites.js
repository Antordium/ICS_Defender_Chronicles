// ============================================
// ICS DEFENDER CHRONICLES - CHRONO TRIGGER STYLE GRAPHICS
// ============================================

// Enhanced color palettes with more shading depth
const Palette = {
    // Skin tones (6 shades for smooth gradients)
    skin1: ['#fff5e6', '#ffd5b5', '#e8b48a', '#c98860', '#8b5a3c', '#5c3825'],
    skin2: ['#fff0dc', '#ffe0c4', '#d4a574', '#a67c52', '#6b4423', '#3d2815'],
    skin3: ['#e0a060', '#c68642', '#8d5524', '#5c3a1a', '#3a2410', '#1a1008'],

    // Hair colors (6 shades)
    hairBlack: ['#4a4a5a', '#2a2a3a', '#1a1a2e', '#0a0a1a', '#050510', '#000008'],
    hairBrown: ['#c8944a', '#8b6914', '#6b4910', '#4a3728', '#2a1a10', '#150d08'],
    hairBlonde: ['#fff080', '#e8c040', '#c8a030', '#a88020', '#886010', '#604008'],
    hairRed: ['#ff8844', '#dd5522', '#aa3311', '#882211', '#551100', '#330800'],

    // Team colors (cybersecurity theme)
    blue: ['#aaddff', '#6ab4ff', '#4488ff', '#2266cc', '#1144aa', '#002288'],
    red: ['#ffaaaa', '#ff8866', '#ff6644', '#cc4422', '#aa2211', '#880011'],
    purple: ['#eeccff', '#cc66ff', '#aa44ff', '#7722cc', '#5511aa', '#330088'],
    yellow: ['#ffffaa', '#ffdd44', '#ffcc00', '#cc9900', '#aa7700', '#885500'],

    // Industrial/environment colors
    orange: ['#ffcc99', '#ffaa66', '#cc8844', '#996633', '#664422', '#442211'],
    green: ['#aaffcc', '#66cc99', '#44aa88', '#228866', '#116644', '#004422'],
    teal: ['#aaffff', '#66dddd', '#44cccc', '#229999', '#117777', '#005555'],
    white: ['#ffffff', '#eeeeee', '#ddddee', '#bbbbcc', '#999999', '#666666'],
    gray: ['#cccccc', '#aaaaaa', '#888888', '#666666', '#444444', '#222222'],

    // Special effects
    glow: ['#ffffff', '#aaffff', '#66ffff', '#00ffff', '#00cccc', '#008888'],
    danger: ['#ffffff', '#ffaaaa', '#ff6666', '#ff0000', '#cc0000', '#880000'],
    warning: ['#ffffff', '#ffffaa', '#ffff66', '#ffcc00', '#cc9900', '#886600']
};

// 32x48 Character Sprites (Chrono Trigger style)
// Much more detailed with proper body proportions
const CharacterSprites = {
    // CIPHER - Blue Team Lead, SOC Analyst
    // Professional look with jacket and headset
    CIPHER: {
        name: 'CIPHER',
        palette: {
            body: Palette.blue,
            skin: Palette.skin2,
            hair: Palette.hairBlack,
            accent: Palette.teal,
            boots: Palette.gray
        },
        width: 32,
        height: 48,
        frames: {
            down: [
                // Frame 0 - Standing
                [
                    [0,0,0,0,0,0,0,0,0,0,0,0,9,9,9,9,9,9,9,9,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,9,9,9,10,10,10,10,10,10,10,10,9,9,9,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,9,10,10,10,10,10,10,10,10,10,10,10,10,10,10,9,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,9,10,10,11,11,11,11,11,11,11,11,11,11,11,11,10,10,9,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,9,10,10,11,11,11,11,11,11,11,11,11,11,11,11,11,11,10,10,9,0,0,0,0,0,0],
                    [0,0,0,0,0,0,9,10,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,10,9,0,0,0,0,0],
                    [0,0,0,0,0,9,10,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,10,9,0,0,0,0],
                    [0,0,0,0,0,9,5,5,5,5,5,6,6,5,5,5,5,5,5,6,6,5,5,5,5,5,5,9,0,0,0,0],
                    [0,0,0,0,0,9,5,5,5,5,6,0,0,6,5,5,5,5,6,0,0,6,5,5,5,5,5,9,0,0,0,0],
                    [0,0,0,0,0,9,5,5,5,5,6,0,0,6,5,5,5,5,6,0,0,6,5,5,5,5,5,9,0,0,0,0],
                    [0,0,0,0,0,9,5,5,5,5,5,6,6,5,5,5,5,5,5,6,6,5,5,5,5,5,5,9,0,0,0,0],
                    [0,0,0,0,0,0,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,0,0,0,0,0],
                    [0,0,0,0,0,0,5,5,5,5,5,5,5,5,6,6,6,6,5,5,5,5,5,5,5,5,5,0,0,0,0,0],
                    [0,0,0,0,0,0,0,5,5,5,5,5,5,6,6,6,6,6,6,5,5,5,5,5,5,5,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,5,5,5,5,5,5,5,6,6,6,6,5,5,5,5,5,5,5,5,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,1,1,1,2,2,2,2,2,2,2,2,1,1,1,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,1,1,1,2,2,2,2,2,2,2,2,2,2,1,1,1,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,1,1,1,2,2,2,3,3,3,3,3,3,2,2,2,1,1,1,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,1,1,1,2,2,2,3,3,3,3,3,3,3,3,2,2,2,1,1,1,0,0,0,0,0,0],
                    [0,0,0,0,0,5,1,1,2,2,2,3,3,3,3,3,3,3,3,3,3,2,2,2,1,1,5,0,0,0,0,0],
                    [0,0,0,0,0,5,1,1,2,2,2,3,3,3,3,3,3,3,3,3,3,2,2,2,1,1,5,0,0,0,0,0],
                    [0,0,0,0,0,5,1,1,2,2,2,3,3,3,3,3,3,3,3,3,3,2,2,2,1,1,5,0,0,0,0,0],
                    [0,0,0,0,0,5,1,1,2,2,2,2,3,3,3,3,3,3,3,3,2,2,2,2,1,1,5,0,0,0,0,0],
                    [0,0,0,0,0,0,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,0,0,0,0,0,0],
                    [0,0,0,0,0,0,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,0,0,0,0,0,0],
                    [0,0,0,0,0,0,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,1,1,2,2,2,2,2,0,0,0,0,2,2,2,2,2,1,1,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,1,2,2,2,2,0,0,0,0,0,0,2,2,2,2,1,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,2,2,2,2,0,0,0,0,0,0,2,2,2,2,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,3,3,3,3,0,0,0,0,0,0,3,3,3,3,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,3,3,3,3,0,0,0,0,0,0,3,3,3,3,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,15,15,15,15,15,0,0,0,0,15,15,15,15,15,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,16,16,16,16,16,0,0,0,0,16,16,16,16,16,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,16,16,16,16,16,0,0,0,0,16,16,16,16,16,0,0,0,0,0,0,0,0]
                ],
                // Frame 1 - Walking
                [
                    [0,0,0,0,0,0,0,0,0,0,0,0,9,9,9,9,9,9,9,9,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,9,9,9,10,10,10,10,10,10,10,10,9,9,9,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,9,10,10,10,10,10,10,10,10,10,10,10,10,10,10,9,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,9,10,10,11,11,11,11,11,11,11,11,11,11,11,11,10,10,9,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,9,10,10,11,11,11,11,11,11,11,11,11,11,11,11,11,11,10,10,9,0,0,0,0,0,0],
                    [0,0,0,0,0,0,9,10,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,10,9,0,0,0,0,0],
                    [0,0,0,0,0,9,10,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,10,9,0,0,0,0],
                    [0,0,0,0,0,9,5,5,5,5,5,6,6,5,5,5,5,5,5,6,6,5,5,5,5,5,5,9,0,0,0,0],
                    [0,0,0,0,0,9,5,5,5,5,6,0,0,6,5,5,5,5,6,0,0,6,5,5,5,5,5,9,0,0,0,0],
                    [0,0,0,0,0,9,5,5,5,5,6,0,0,6,5,5,5,5,6,0,0,6,5,5,5,5,5,9,0,0,0,0],
                    [0,0,0,0,0,9,5,5,5,5,5,6,6,5,5,5,5,5,5,6,6,5,5,5,5,5,5,9,0,0,0,0],
                    [0,0,0,0,0,0,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,0,0,0,0,0],
                    [0,0,0,0,0,0,5,5,5,5,5,5,5,5,6,6,6,6,5,5,5,5,5,5,5,5,5,0,0,0,0,0],
                    [0,0,0,0,0,0,0,5,5,5,5,5,5,6,6,6,6,6,6,5,5,5,5,5,5,5,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,5,5,5,5,5,5,5,6,6,6,6,5,5,5,5,5,5,5,5,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,1,1,1,2,2,2,2,2,2,2,2,1,1,1,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,1,1,1,2,2,2,2,2,2,2,2,2,2,1,1,1,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,1,1,1,2,2,2,3,3,3,3,3,3,2,2,2,1,1,1,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,1,1,1,2,2,2,3,3,3,3,3,3,3,3,2,2,2,1,1,1,0,0,0,0,0,0],
                    [0,0,0,0,0,5,1,1,2,2,2,3,3,3,3,3,3,3,3,3,3,2,2,2,1,1,5,0,0,0,0,0],
                    [0,0,0,0,0,5,1,1,2,2,2,3,3,3,3,3,3,3,3,3,3,2,2,2,1,1,5,0,0,0,0,0],
                    [0,0,0,0,0,5,1,1,2,2,2,3,3,3,3,3,3,3,3,3,3,2,2,2,1,1,5,0,0,0,0,0],
                    [0,0,0,0,0,5,1,1,2,2,2,2,3,3,3,3,3,3,3,3,2,2,2,2,1,1,5,0,0,0,0,0],
                    [0,0,0,0,0,0,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,0,0,0,0,0,0],
                    [0,0,0,0,0,0,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,0,0,0,0,0,0],
                    [0,0,0,0,0,0,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,1,1,2,2,2,2,2,0,0,0,0,2,2,2,2,2,1,1,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,1,2,2,2,0,0,0,0,0,0,0,0,2,2,2,1,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,3,3,3,0,0,0,0,0,0,3,3,3,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,3,3,3,0,0,0,0,0,3,3,3,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,15,15,15,15,0,0,0,0,0,15,15,15,15,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,16,16,16,16,0,0,0,0,0,16,16,16,16,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,16,16,16,16,0,0,0,0,0,0,0,16,16,16,16,0,0,0,0,0,0,0]
                ]
            ],
            up: null, // Will mirror/modify down frames
            left: null,
            right: null
        },
        portrait: null // Will be generated from frames
    },

    // BLAZE - Incident Responder (Red theme, tactical gear)
    BLAZE: {
        name: 'BLAZE',
        palette: {
            body: Palette.red,
            skin: Palette.skin3,
            hair: Palette.hairBrown,
            accent: Palette.orange,
            boots: Palette.gray
        },
        width: 32,
        height: 48,
        frames: {
            down: [
                // Simplified - uses same base structure with different palette
                null // Will reference CIPHER frames with palette swap
            ],
            up: null, left: null, right: null
        }
    },

    // GHOST - Pen Tester (Purple theme, hooded)
    GHOST: {
        name: 'GHOST',
        palette: {
            body: Palette.purple,
            skin: Palette.skin1,
            hair: Palette.hairBlack,
            accent: Palette.teal,
            boots: Palette.gray
        },
        width: 32,
        height: 48,
        frames: { down: [null], up: null, left: null, right: null }
    },

    // VOLT - ICS Engineer (Yellow theme, hardhat)
    VOLT: {
        name: 'VOLT',
        palette: {
            body: Palette.yellow,
            skin: Palette.skin3,
            hair: Palette.hairBrown,
            accent: Palette.orange,
            boots: Palette.gray
        },
        width: 32,
        height: 48,
        frames: { down: [null], up: null, left: null, right: null }
    }
};

// NPC sprite definitions (24x32 - slightly smaller than heroes)
const NPCSprites = {
    martinez: {
        name: 'Chief Martinez',
        palette: { body: Palette.orange, skin: Palette.skin3, hair: Palette.hairBlack, accent: Palette.yellow },
        hasHelmet: true
    },
    park: {
        name: 'Technician Park',
        palette: { body: Palette.green, skin: Palette.skin1, hair: Palette.hairBlack, accent: Palette.teal }
    },
    santos: {
        name: 'Dr. Santos',
        palette: { body: Palette.white, skin: Palette.skin2, hair: Palette.hairBlack, accent: Palette.purple },
        hasLabcoat: true
    },
    chen: {
        name: 'Engineer Chen',
        palette: { body: Palette.blue, skin: Palette.skin1, hair: Palette.hairBlack, accent: Palette.teal }
    },
    okonkwo: {
        name: 'Analyst Okonkwo',
        palette: { body: Palette.red, skin: Palette.skin3, hair: Palette.hairBlack, accent: Palette.orange }
    },
    williams: {
        name: 'Tech Williams',
        palette: { body: Palette.green, skin: Palette.skin3, hair: Palette.hairBrown, accent: Palette.yellow }
    },
    kim: {
        name: 'Specialist Kim',
        palette: { body: Palette.teal, skin: Palette.skin1, hair: Palette.hairBlack, accent: Palette.blue }
    },
    rodriguez: {
        name: 'Operator Rodriguez',
        palette: { body: Palette.orange, skin: Palette.skin3, hair: Palette.hairBrown, accent: Palette.yellow },
        hasHelmet: true
    },
    morgan: {
        name: 'Director Morgan',
        palette: { body: Palette.purple, skin: Palette.skin2, hair: Palette.hairBrown, accent: Palette.blue }
    }
};

// Boss sprites (48x64 - larger and more imposing)
const BossSprites = {
    glitch: {
        name: 'GLITCH',
        title: 'The Script Kiddie',
        palette: {
            body: ['#ff88ff', '#ff44ff', '#ff00ff', '#cc00cc', '#880088', '#440044'],
            accent: ['#88ff88', '#44ff44', '#00ff00', '#00cc00', '#008800', '#004400'],
            glow: ['#ffffff', '#ffaaff', '#ff66ff']
        },
        effects: ['glitch', 'pixelate'],
        width: 48,
        height: 64
    },
    architect: {
        name: 'ARCHITECT',
        title: 'The Network Infiltrator',
        palette: {
            body: ['#88ffff', '#66ffff', '#00ffff', '#00cccc', '#008888', '#004444'],
            accent: ['#ff8888', '#ff6666', '#ff0000', '#cc0000', '#880000', '#440000'],
            glow: ['#ffffff', '#aaffff', '#66ffff']
        },
        effects: ['datastream', 'scan'],
        width: 48,
        height: 64
    },
    wiretap: {
        name: 'WIRETAP',
        title: 'The Protocol Exploiter',
        palette: {
            body: ['#ffff88', '#ffff66', '#ffff00', '#cccc00', '#888800', '#444400'],
            accent: ['#ff8888', '#ff6666', '#ff0000', '#cc0000', '#880000', '#440000'],
            glow: ['#ffffff', '#ffffaa', '#ffff66']
        },
        effects: ['electric', 'pulse'],
        width: 48,
        height: 64
    }
};

// Pre-rendered style background layers
const BackgroundLayers = {
    // Control room environment
    controlRoom: {
        parallaxLayers: [
            { name: 'back_wall', depth: 0.2, color: '#1a1a2e' },
            { name: 'monitors', depth: 0.4, color: '#2a2a4e' },
            { name: 'consoles', depth: 0.6, color: '#3a3a5e' },
            { name: 'floor', depth: 1.0, color: '#0a0a1a' }
        ],
        ambientLight: { color: '#003366', intensity: 0.3 },
        pointLights: [
            { x: 0.2, y: 0.3, color: '#00ff88', intensity: 0.5, radius: 100 },
            { x: 0.8, y: 0.3, color: '#00ff88', intensity: 0.5, radius: 100 },
            { x: 0.5, y: 0.5, color: '#0088ff', intensity: 0.4, radius: 150 }
        ]
    },
    // Industrial facility
    facility: {
        parallaxLayers: [
            { name: 'pipes', depth: 0.1, color: '#2a2a2a' },
            { name: 'machinery', depth: 0.3, color: '#3a3a3a' },
            { name: 'walkway', depth: 0.5, color: '#4a4a4a' },
            { name: 'floor', depth: 1.0, color: '#1a1a1a' }
        ],
        ambientLight: { color: '#332200', intensity: 0.4 },
        pointLights: [
            { x: 0.3, y: 0.2, color: '#ff8800', intensity: 0.6, radius: 80 },
            { x: 0.7, y: 0.2, color: '#ff8800', intensity: 0.6, radius: 80 }
        ]
    },
    // Server room
    serverRoom: {
        parallaxLayers: [
            { name: 'back_racks', depth: 0.2, color: '#0a0a2a' },
            { name: 'mid_racks', depth: 0.5, color: '#1a1a3a' },
            { name: 'front_racks', depth: 0.8, color: '#2a2a4a' },
            { name: 'floor', depth: 1.0, color: '#050515' }
        ],
        ambientLight: { color: '#001133', intensity: 0.5 },
        pointLights: [
            { x: 0.1, y: 0.5, color: '#00ff00', intensity: 0.3, radius: 40 },
            { x: 0.3, y: 0.5, color: '#00ff00', intensity: 0.3, radius: 40 },
            { x: 0.5, y: 0.5, color: '#ff0000', intensity: 0.5, radius: 60 },
            { x: 0.7, y: 0.5, color: '#00ff00', intensity: 0.3, radius: 40 },
            { x: 0.9, y: 0.5, color: '#00ff00', intensity: 0.3, radius: 40 }
        ]
    }
};

// Enhanced drawing functions for Chrono Trigger style
function drawCTSprite(ctx, pattern, x, y, pixelSize, palette, options = {}) {
    if (!pattern) return;

    const {
        flipX = false,
        flipY = false,
        alpha = 1.0,
        outline = false,
        outlineColor = '#000000',
        shadow = true
    } = options;

    const width = pattern[0].length;
    const height = pattern.length;

    // Draw shadow first
    if (shadow) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.beginPath();
        ctx.ellipse(
            x + (width * pixelSize) / 2,
            y + height * pixelSize + 4,
            (width * pixelSize) / 3,
            6,
            0, 0, Math.PI * 2
        );
        ctx.fill();
    }

    ctx.globalAlpha = alpha;

    // Draw outline first if enabled
    if (outline) {
        ctx.fillStyle = outlineColor;
        for (let py = 0; py < height; py++) {
            for (let px = 0; px < width; px++) {
                const colorIndex = pattern[py][px];
                if (colorIndex === 0) continue;

                const drawX = flipX ? x + (width - 1 - px) * pixelSize : x + px * pixelSize;
                const drawY = flipY ? y + (height - 1 - py) * pixelSize : y + py * pixelSize;

                // Draw outline pixels around the sprite
                ctx.fillRect(drawX - 1, drawY, pixelSize + 2, pixelSize);
                ctx.fillRect(drawX, drawY - 1, pixelSize, pixelSize + 2);
            }
        }
    }

    // Draw main sprite
    for (let py = 0; py < height; py++) {
        for (let px = 0; px < width; px++) {
            const colorIndex = pattern[py][px];
            if (colorIndex === 0) continue;

            const color = getColorFromPalette(colorIndex, palette);
            if (!color) continue;

            const drawX = flipX ? x + (width - 1 - px) * pixelSize : x + px * pixelSize;
            const drawY = flipY ? y + (height - 1 - py) * pixelSize : y + py * pixelSize;

            ctx.fillStyle = color;
            ctx.fillRect(drawX, drawY, pixelSize, pixelSize);
        }
    }

    ctx.globalAlpha = 1.0;
}

function getColorFromPalette(index, palette) {
    // Color index mapping:
    // 1-6: body colors (gradient)
    // 7-12: skin colors (gradient)
    // 9-11: hair colors (using 9,10,11 for hair highlights)
    // 15-16: boots/accessories

    if (index >= 1 && index <= 6 && palette.body) {
        return palette.body[index - 1];
    }
    if (index >= 5 && index <= 8 && palette.skin) {
        return palette.skin[index - 5];
    }
    if (index >= 9 && index <= 12 && palette.hair) {
        return palette.hair[index - 9];
    }
    if (index === 13 && (palette.labcoat || palette.helmet || palette.accent)) {
        return palette.labcoat?.[0] || palette.helmet?.[0] || palette.accent?.[0] || '#ffffff';
    }
    if (index === 14 && palette.accent) {
        return palette.accent[0];
    }
    if ((index === 15 || index === 16) && palette.boots) {
        return palette.boots[index - 15];
    }

    return null;
}

// Draw pre-rendered style background with parallax
function drawParallaxBackground(ctx, layerConfig, cameraX, cameraY, width, height, time) {
    const { parallaxLayers, ambientLight, pointLights } = layerConfig;

    // Draw base ambient
    ctx.fillStyle = ambientLight.color;
    ctx.globalAlpha = ambientLight.intensity;
    ctx.fillRect(0, 0, width, height);
    ctx.globalAlpha = 1.0;

    // Draw parallax layers
    for (const layer of parallaxLayers) {
        const offsetX = cameraX * layer.depth;
        const offsetY = cameraY * layer.depth;

        ctx.fillStyle = layer.color;

        // Draw layer with offset - this creates parallax effect
        // In a full implementation, this would draw actual tile graphics
        const layerY = height * (1 - layer.depth) * 0.5;
        ctx.fillRect(0, layerY - offsetY * 0.1, width, height * layer.depth);
    }

    // Draw point lights with glow effect
    for (const light of pointLights) {
        const lx = light.x * width;
        const ly = light.y * height;

        // Animated flicker
        const flicker = 1 + Math.sin(time * 3 + light.x * 10) * 0.1;

        const gradient = ctx.createRadialGradient(lx, ly, 0, lx, ly, light.radius * flicker);
        gradient.addColorStop(0, light.color);
        gradient.addColorStop(0.5, light.color + '44');
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.globalAlpha = light.intensity * flicker;
        ctx.beginPath();
        ctx.arc(lx, ly, light.radius * flicker, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.globalAlpha = 1.0;
}

// Draw environmental details (pipes, monitors, etc.)
function drawEnvironmentDetail(ctx, type, x, y, scale, time) {
    switch(type) {
        case 'monitor':
            // CRT monitor with scan lines
            ctx.fillStyle = '#1a1a2e';
            ctx.fillRect(x, y, 40 * scale, 32 * scale);
            ctx.fillStyle = '#003322';
            ctx.fillRect(x + 4 * scale, y + 4 * scale, 32 * scale, 24 * scale);

            // Scan line effect
            ctx.fillStyle = 'rgba(0, 255, 136, 0.1)';
            const scanY = ((time * 50) % (24 * scale));
            ctx.fillRect(x + 4 * scale, y + 4 * scale + scanY, 32 * scale, 2);

            // Random data
            ctx.fillStyle = '#00ff88';
            for (let i = 0; i < 5; i++) {
                const textY = y + 8 * scale + i * 4 * scale;
                ctx.fillRect(x + 6 * scale, textY, (Math.random() * 20 + 10) * scale, 2);
            }
            break;

        case 'pipe_horizontal':
            ctx.fillStyle = '#4a4a5a';
            ctx.fillRect(x, y, 64 * scale, 8 * scale);
            ctx.fillStyle = '#5a5a6a';
            ctx.fillRect(x, y, 64 * scale, 2 * scale);
            // Joints
            ctx.fillStyle = '#3a3a4a';
            ctx.fillRect(x, y - 2 * scale, 6 * scale, 12 * scale);
            ctx.fillRect(x + 58 * scale, y - 2 * scale, 6 * scale, 12 * scale);
            break;

        case 'pipe_vertical':
            ctx.fillStyle = '#4a4a5a';
            ctx.fillRect(x, y, 8 * scale, 64 * scale);
            ctx.fillStyle = '#5a5a6a';
            ctx.fillRect(x, y, 2 * scale, 64 * scale);
            break;

        case 'server_rack':
            // Main body
            ctx.fillStyle = '#2a2a3a';
            ctx.fillRect(x, y, 24 * scale, 48 * scale);
            // Vents
            ctx.fillStyle = '#1a1a2a';
            for (let i = 0; i < 8; i++) {
                ctx.fillRect(x + 2 * scale, y + 4 * scale + i * 5 * scale, 20 * scale, 3 * scale);
            }
            // Status LEDs
            const ledColors = ['#00ff00', '#00ff00', '#ff0000', '#00ff00'];
            for (let i = 0; i < 4; i++) {
                ctx.fillStyle = Math.random() > 0.1 ? ledColors[i] : '#333333';
                ctx.fillRect(x + 4 * scale + i * 5 * scale, y + 44 * scale, 3 * scale, 2 * scale);
            }
            break;

        case 'console':
            // Control console with buttons
            ctx.fillStyle = '#3a3a4a';
            ctx.fillRect(x, y, 48 * scale, 24 * scale);
            ctx.fillStyle = '#2a2a3a';
            ctx.fillRect(x + 4 * scale, y + 4 * scale, 24 * scale, 16 * scale);
            // Buttons
            const buttonColors = ['#ff4444', '#44ff44', '#4444ff', '#ffff44'];
            for (let i = 0; i < 4; i++) {
                ctx.fillStyle = buttonColors[i];
                ctx.beginPath();
                ctx.arc(x + 36 * scale, y + 6 * scale + i * 5 * scale, 2 * scale, 0, Math.PI * 2);
                ctx.fill();
            }
            break;

        case 'warning_light':
            // Rotating warning light
            const pulse = (Math.sin(time * 5) + 1) / 2;
            ctx.fillStyle = '#ffaa00';
            ctx.fillRect(x, y + 8 * scale, 12 * scale, 16 * scale);

            // Light dome
            const gradient = ctx.createRadialGradient(
                x + 6 * scale, y + 4 * scale, 0,
                x + 6 * scale, y + 4 * scale, 8 * scale
            );
            gradient.addColorStop(0, `rgba(255, ${Math.floor(170 + pulse * 85)}, 0, ${0.5 + pulse * 0.5})`);
            gradient.addColorStop(1, 'rgba(255, 170, 0, 0)');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x + 6 * scale, y + 4 * scale, 8 * scale, 0, Math.PI * 2);
            ctx.fill();
            break;
    }
}

// Enhanced boss drawing with effects
function drawBoss(ctx, bossId, x, y, time, hitFlash = 0) {
    const boss = BossSprites[bossId];
    if (!boss) return;

    const { palette, effects, width, height } = boss;
    const scale = 3;

    // Floating animation
    const floatY = Math.sin(time * 2) * 8;
    const drawY = y + floatY;

    // Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.beginPath();
    ctx.ellipse(x + (width * scale) / 2, y + height * scale + 20, width * scale / 2, 15, 0, 0, Math.PI * 2);
    ctx.fill();

    // Hit flash effect
    if (hitFlash > 0) {
        ctx.globalAlpha = 0.5 + Math.sin(hitFlash * 30) * 0.5;
    }

    // Draw boss body (simplified geometric shape for now)
    // Main body gradient
    const bodyGradient = ctx.createLinearGradient(x, drawY, x, drawY + height * scale);
    for (let i = 0; i < palette.body.length; i++) {
        bodyGradient.addColorStop(i / (palette.body.length - 1), palette.body[i]);
    }

    ctx.fillStyle = bodyGradient;

    // Menacing silhouette shape
    ctx.beginPath();
    ctx.moveTo(x + width * scale / 2, drawY); // Top center
    ctx.lineTo(x + width * scale, drawY + height * scale * 0.3); // Right shoulder
    ctx.lineTo(x + width * scale * 0.9, drawY + height * scale * 0.7); // Right body
    ctx.lineTo(x + width * scale * 0.7, drawY + height * scale); // Right leg
    ctx.lineTo(x + width * scale * 0.3, drawY + height * scale); // Left leg
    ctx.lineTo(x + width * scale * 0.1, drawY + height * scale * 0.7); // Left body
    ctx.lineTo(x, drawY + height * scale * 0.3); // Left shoulder
    ctx.closePath();
    ctx.fill();

    // Eyes
    const eyeY = drawY + height * scale * 0.25;
    const eyeGlow = (Math.sin(time * 4) + 1) / 2;

    ctx.fillStyle = palette.accent[0];
    ctx.shadowColor = palette.accent[0];
    ctx.shadowBlur = 20 * (0.5 + eyeGlow * 0.5);

    // Left eye
    ctx.beginPath();
    ctx.ellipse(x + width * scale * 0.35, eyeY, 8, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Right eye
    ctx.beginPath();
    ctx.ellipse(x + width * scale * 0.65, eyeY, 8, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1.0;

    // Apply effects
    if (effects) {
        for (const effect of effects) {
            drawBossEffect(ctx, effect, x, drawY, width * scale, height * scale, time, palette);
        }
    }

    // Glow outline
    ctx.strokeStyle = palette.glow ? palette.glow[1] : palette.body[0];
    ctx.lineWidth = 2;
    ctx.shadowColor = palette.glow ? palette.glow[0] : palette.body[0];
    ctx.shadowBlur = 15;
    ctx.stroke();
    ctx.shadowBlur = 0;
}

function drawBossEffect(ctx, effect, x, y, width, height, time, palette) {
    switch(effect) {
        case 'glitch':
            if (Math.random() > 0.92) {
                ctx.fillStyle = palette.accent[0];
                const glitchX = x + Math.random() * width;
                const glitchY = y + Math.random() * height;
                const glitchW = Math.random() * 30 + 10;
                ctx.fillRect(glitchX, glitchY, glitchW, 3);
            }
            break;

        case 'datastream':
            ctx.fillStyle = palette.body[0] + '33';
            for (let i = 0; i < 8; i++) {
                const streamY = ((time * 100 + i * 30) % height);
                ctx.fillRect(x, y + streamY, width, 2);
            }
            break;

        case 'electric':
            if (Math.random() > 0.9) {
                ctx.strokeStyle = palette.accent[0];
                ctx.lineWidth = 2;
                ctx.beginPath();
                let px = x + Math.random() * width;
                ctx.moveTo(px, y);
                for (let i = 0; i < 6; i++) {
                    px += (Math.random() - 0.5) * 30;
                    ctx.lineTo(px, y + (height / 6) * (i + 1));
                }
                ctx.stroke();
            }
            break;

        case 'pixelate':
            // Occasional pixel corruption
            if (Math.random() > 0.95) {
                const px = x + Math.floor(Math.random() * (width / 8)) * 8;
                const py = y + Math.floor(Math.random() * (height / 8)) * 8;
                ctx.fillStyle = palette.accent[Math.floor(Math.random() * palette.accent.length)];
                ctx.fillRect(px, py, 8, 8);
            }
            break;

        case 'pulse':
            // Pulsing energy rings
            const pulseRadius = ((time * 50) % 100);
            ctx.strokeStyle = palette.body[0] + Math.floor((1 - pulseRadius / 100) * 255).toString(16).padStart(2, '0');
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(x + width / 2, y + height / 2, pulseRadius, 0, Math.PI * 2);
            ctx.stroke();
            break;

        case 'scan':
            // Scanning line effect
            const scanY = (time * 80) % height;
            ctx.fillStyle = palette.accent[0] + '66';
            ctx.fillRect(x, y + scanY, width, 4);
            break;
    }
}

// Generic sprite pattern for NPCs (24x32)
const GenericNPCPattern = [
    [0,0,0,0,0,0,0,9,9,9,9,9,9,9,9,9,9,0,0,0,0,0,0,0],
    [0,0,0,0,0,9,9,10,10,10,10,10,10,10,10,9,9,0,0,0,0,0,0],
    [0,0,0,0,9,10,10,10,10,10,10,10,10,10,10,10,10,9,0,0,0,0,0],
    [0,0,0,9,10,10,5,5,5,5,5,5,5,5,5,5,10,10,9,0,0,0,0,0],
    [0,0,0,9,10,5,5,5,5,5,5,5,5,5,5,5,5,10,9,0,0,0,0,0],
    [0,0,0,9,5,5,5,6,6,5,5,5,5,6,6,5,5,5,9,0,0,0,0,0],
    [0,0,0,9,5,5,6,0,0,6,5,5,6,0,0,6,5,5,9,0,0,0,0,0],
    [0,0,0,9,5,5,6,0,0,6,5,5,6,0,0,6,5,5,9,0,0,0,0,0],
    [0,0,0,9,5,5,5,6,6,5,5,5,5,6,6,5,5,5,9,0,0,0,0,0],
    [0,0,0,0,5,5,5,5,5,5,5,5,5,5,5,5,5,5,0,0,0,0,0,0],
    [0,0,0,0,5,5,5,5,5,6,6,6,6,5,5,5,5,5,0,0,0,0,0,0],
    [0,0,0,0,0,5,5,5,6,6,6,6,6,6,5,5,5,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,5,5,5,5,5,5,5,5,5,5,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,1,1,2,2,2,2,2,2,2,2,1,1,0,0,0,0,0,0,0],
    [0,0,0,0,1,1,2,2,2,3,3,3,3,2,2,2,1,1,0,0,0,0,0,0],
    [0,0,0,0,1,2,2,2,3,3,3,3,3,3,2,2,2,1,0,0,0,0,0,0],
    [0,0,0,5,1,2,2,3,3,3,3,3,3,3,3,2,2,1,5,0,0,0,0,0],
    [0,0,0,5,1,2,2,3,3,3,3,3,3,3,3,2,2,1,5,0,0,0,0,0],
    [0,0,0,5,1,2,2,2,3,3,3,3,3,3,2,2,2,1,5,0,0,0,0,0],
    [0,0,0,0,1,2,2,2,2,2,2,2,2,2,2,2,2,1,0,0,0,0,0,0],
    [0,0,0,0,1,1,2,2,2,2,2,2,2,2,2,2,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,1,1,2,2,2,0,0,2,2,2,1,1,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,2,2,0,0,0,0,2,2,1,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,2,2,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,3,3,0,0,0,0,3,3,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,3,3,0,0,0,0,3,3,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,4,4,0,0,0,0,4,4,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,15,15,15,0,0,0,15,15,15,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,16,16,16,0,0,0,16,16,16,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,16,16,16,0,0,0,16,16,16,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,16,16,16,0,0,0,16,16,16,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,16,16,16,0,0,0,16,16,16,0,0,0,0,0,0,0]
];

// Player sprite class with Chrono Trigger style
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
        this.width = TILE_SIZE;
        this.height = TILE_SIZE * 1.5;
    }

    setPosition(tileX, tileY) {
        this.x = tileX;
        this.y = tileY;
        this.targetX = tileX;
        this.targetY = tileY;
    }

    moveTo(tileX, tileY, direction) {
        if (this.moving) return false;
        this.targetX = tileX;
        this.targetY = tileY;
        this.direction = direction;
        this.moving = true;
        return true;
    }

    update(deltaTime) {
        if (this.moving) {
            this.x += (this.targetX - this.x) * this.moveSpeed;
            this.y += (this.targetY - this.y) * this.moveSpeed;

            if (Math.abs(this.x - this.targetX) < 0.05 && Math.abs(this.y - this.targetY) < 0.05) {
                this.x = this.targetX;
                this.y = this.targetY;
                this.moving = false;
            }

            this.animTimer += deltaTime;
            if (this.animTimer > 0.1) {
                this.animTimer = 0;
                this.animFrame = (this.animFrame + 1) % 2;
            }
        } else {
            this.animFrame = 0;
        }
    }

    getPixelX() { return this.x * TILE_SIZE; }
    getPixelY() { return this.y * TILE_SIZE - TILE_SIZE * 0.5; }
    getTileX() { return Math.round(this.x); }
    getTileY() { return Math.round(this.y); }

    draw(ctx, offsetX = 0, offsetY = 0, time = 0) {
        const px = this.getPixelX() + offsetX;
        const py = this.getPixelY() + offsetY;

        const sprite = CharacterSprites.CIPHER;
        const pixelSize = 1.5;

        // Get direction key and flip state
        let dirKey = 'down';
        let flipX = false;
        if (this.direction === Direction.UP) dirKey = 'up';
        else if (this.direction === Direction.LEFT) { dirKey = 'down'; flipX = true; }
        else if (this.direction === Direction.RIGHT) dirKey = 'down';

        // Get frame
        let frames = sprite.frames[dirKey] || sprite.frames.down;
        let frame = frames?.[this.animFrame % (frames?.length || 1)];

        // Use first frame of CIPHER if specific frame not available
        if (!frame) {
            frame = CharacterSprites.CIPHER.frames.down[0];
        }

        if (frame) {
            drawCTSprite(ctx, frame, px, py, pixelSize, sprite.palette, {
                flipX: flipX,
                outline: true,
                outlineColor: '#000000',
                shadow: true
            });
        }

        // Player glow indicator
        ctx.shadowColor = sprite.palette.body[1];
        ctx.shadowBlur = 10;
        ctx.strokeStyle = sprite.palette.body[1] + '88';
        ctx.lineWidth = 2;
        ctx.strokeRect(px - 2, py - 2, sprite.width * pixelSize + 4, sprite.height * pixelSize + 4);
        ctx.shadowBlur = 0;
    }
}

// NPC sprite class with Chrono Trigger style
class NPCSprite {
    constructor(id, name, x, y, color, role) {
        this.id = id;
        this.name = name;
        this.x = x;
        this.y = y;
        this.color = color;
        this.role = role;
        this.direction = Direction.DOWN;
        this.width = TILE_SIZE;
        this.height = TILE_SIZE * 1.2;
        this.talked = false;
        this.animTimer = 0;
        this.idleFrame = 0;
    }

    getPixelX() { return this.x * TILE_SIZE; }
    getPixelY() { return this.y * TILE_SIZE - TILE_SIZE * 0.3; }

    update(deltaTime) {
        this.animTimer += deltaTime;
        if (this.animTimer > 0.5) {
            this.animTimer = 0;
            this.idleFrame = (this.idleFrame + 1) % 2;
        }
    }

    draw(ctx, offsetX = 0, offsetY = 0, time = 0) {
        const px = this.getPixelX() + offsetX;
        const py = this.getPixelY() + offsetY;

        const sprite = NPCSprites[this.id];
        const palette = sprite?.palette || { body: Palette.blue, skin: Palette.skin2, hair: Palette.hairBlack };
        const pixelSize = 1.2;

        // Idle bob animation
        const bobY = Math.sin(this.animTimer * 4 + this.x) * 2;

        if (this.talked) {
            ctx.globalAlpha = 0.6;
        }

        drawCTSprite(ctx, GenericNPCPattern, px, py + bobY, pixelSize, palette, {
            outline: true,
            outlineColor: '#000000',
            shadow: true
        });

        ctx.globalAlpha = 1.0;

        if (!this.talked) {
            // Exclamation bubble
            const bubbleX = px + (GenericNPCPattern[0].length * pixelSize) / 2;
            const bubbleY = py - 20 - Math.sin(time * 5) * 3;

            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.ellipse(bubbleX, bubbleY, 10, 10, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(bubbleX - 4, bubbleY + 8);
            ctx.lineTo(bubbleX, bubbleY + 16);
            ctx.lineTo(bubbleX + 4, bubbleY + 8);
            ctx.fill();

            ctx.fillStyle = Colors.WARNING;
            ctx.font = 'bold 14px "Courier New", monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('!', bubbleX, bubbleY);

            // Highlight glow
            ctx.shadowColor = palette.body[1];
            ctx.shadowBlur = 8;
            ctx.strokeStyle = palette.body[1];
            ctx.lineWidth = 1;
            ctx.strokeRect(px - 2, py + bobY - 2, GenericNPCPattern[0].length * pixelSize + 4, GenericNPCPattern.length * pixelSize + 4);
            ctx.shadowBlur = 0;
        }

        // Name tag
        ctx.fillStyle = this.talked ? Colors.TEXT_DIM : Colors.TEXT;
        ctx.font = '11px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(this.name.split(' ').pop(), px + (GenericNPCPattern[0].length * pixelSize) / 2, py + GenericNPCPattern.length * pixelSize + 12);
    }
}

// Enemy/Boss sprite class with Chrono Trigger style
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

    hit() {
        this.hitFlash = 1;
        this.shakeX = 15;
    }

    draw(ctx, time = 0) {
        const boss = BossSprites[this.id];
        if (!boss) return;

        const centerX = CANVAS_WIDTH / 2;
        const shakeOffset = Math.sin(this.shakeX * 10) * this.shakeX;
        const x = centerX - (boss.width * 3) / 2 + shakeOffset;
        const y = 30;

        drawBoss(ctx, this.id, x, y, time, this.hitFlash);

        // Name and title
        ctx.fillStyle = Colors.TEXT;
        ctx.font = 'bold 20px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(this.name, centerX, y + boss.height * 3 + 40);

        ctx.fillStyle = Colors.TEXT_DIM;
        ctx.font = '14px "Courier New", monospace';
        ctx.fillText(this.title, centerX, y + boss.height * 3 + 60);

        // HP Bar
        Renderer.drawHPBar(centerX - 100, y + boss.height * 3 + 75, 200, 20, this.hp, this.maxHP);

        ctx.fillStyle = Colors.TEXT;
        ctx.font = '12px "Courier New", monospace';
        ctx.fillText(`HP: ${this.hp}/${this.maxHP}`, centerX, y + boss.height * 3 + 110);
    }
}

// Export all sprites and functions
const Sprites = {
    PlayerSprite,
    NPCSprite,
    EnemySprite
};

// Also export for background rendering
const Backgrounds = {
    layers: BackgroundLayers,
    drawParallax: drawParallaxBackground,
    drawDetail: drawEnvironmentDetail
};
