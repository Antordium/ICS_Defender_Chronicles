// ============================================
// ICS DEFENDER CHRONICLES - 16-BIT SPRITE SYSTEM
// ============================================

// 16-bit color palettes for characters
const Palette = {
    // Skin tones
    skin1: ['#ffd5b5', '#e8b48a', '#c98860', '#8b5a3c'],
    skin2: ['#ffe0c4', '#d4a574', '#a67c52', '#6b4423'],
    skin3: ['#c68642', '#8d5524', '#5c3a1a', '#3a2410'],
    // Hair colors
    hairBlack: ['#2a2a3a', '#1a1a2e', '#0a0a1a', '#050510'],
    hairBrown: ['#8b6914', '#6b4910', '#4a3728', '#2a1a10'],
    hairBlonde: ['#e8c040', '#c8a030', '#a88020', '#886010'],
    // Cybersecurity team colors
    blue: ['#6ab4ff', '#4488ff', '#2266cc', '#1144aa'],
    red: ['#ff8866', '#ff6644', '#cc4422', '#aa2211'],
    purple: ['#cc66ff', '#aa44ff', '#7722cc', '#5511aa'],
    yellow: ['#ffdd44', '#ffcc00', '#cc9900', '#aa7700'],
    // Industrial/NPC colors
    orange: ['#ffaa66', '#cc8844', '#996633', '#664422'],
    green: ['#66cc99', '#44aa88', '#228866', '#116644'],
    teal: ['#66dddd', '#44cccc', '#229999', '#117777'],
    white: ['#ffffff', '#ddddee', '#bbbbcc', '#999999']
};

// 16-bit character sprite definitions (16x16 pixels with animation frames)
const CharacterSprites = {
    // CIPHER - Blue Team Lead, SOC Analyst
    CIPHER: {
        name: 'CIPHER',
        palette: { body: Palette.blue, skin: Palette.skin2, hair: Palette.hairBlack },
        // 16x16 sprite patterns for each direction and frame
        // 0=transparent, 1-4=body gradient, 5-8=skin gradient, 9-12=hair gradient, 13=white, 14=accent
        frames: {
            down: [
                // Frame 0 (idle/walk1)
                [
                    [0,0,0,0,0,9,9,9,9,9,9,0,0,0,0,0],
                    [0,0,0,9,9,10,10,10,10,10,10,9,9,0,0,0],
                    [0,0,9,10,5,5,5,5,5,5,5,5,10,9,0,0],
                    [0,0,9,5,5,6,5,5,5,5,6,5,5,9,0,0],
                    [0,0,9,5,5,0,6,5,5,6,0,5,5,9,0,0],
                    [0,0,0,5,5,5,5,6,6,5,5,5,5,0,0,0],
                    [0,0,0,5,5,5,6,6,6,6,5,5,5,0,0,0],
                    [0,0,0,0,5,5,5,5,5,5,5,5,0,0,0,0],
                    [0,0,0,1,1,2,2,2,2,2,2,1,1,0,0,0],
                    [0,0,1,1,2,2,3,3,3,3,2,2,1,1,0,0],
                    [0,0,1,2,2,3,3,3,3,3,3,2,2,1,0,0],
                    [0,0,1,2,2,2,2,2,2,2,2,2,2,1,0,0],
                    [0,0,0,2,2,2,2,0,0,2,2,2,2,0,0,0],
                    [0,0,0,2,2,2,0,0,0,0,2,2,2,0,0,0],
                    [0,0,0,3,3,3,0,0,0,0,3,3,3,0,0,0],
                    [0,0,0,4,4,4,0,0,0,0,4,4,4,0,0,0]
                ],
                // Frame 1 (walk2)
                [
                    [0,0,0,0,0,9,9,9,9,9,9,0,0,0,0,0],
                    [0,0,0,9,9,10,10,10,10,10,10,9,9,0,0,0],
                    [0,0,9,10,5,5,5,5,5,5,5,5,10,9,0,0],
                    [0,0,9,5,5,6,5,5,5,5,6,5,5,9,0,0],
                    [0,0,9,5,5,0,6,5,5,6,0,5,5,9,0,0],
                    [0,0,0,5,5,5,5,6,6,5,5,5,5,0,0,0],
                    [0,0,0,5,5,5,6,6,6,6,5,5,5,0,0,0],
                    [0,0,0,0,5,5,5,5,5,5,5,5,0,0,0,0],
                    [0,0,0,1,1,2,2,2,2,2,2,1,1,0,0,0],
                    [0,0,1,1,2,2,3,3,3,3,2,2,1,1,0,0],
                    [0,0,1,2,2,3,3,3,3,3,3,2,2,1,0,0],
                    [0,0,1,2,2,2,2,2,2,2,2,2,2,1,0,0],
                    [0,0,0,2,2,2,0,0,0,2,2,2,2,0,0,0],
                    [0,0,0,0,2,2,2,0,0,0,2,2,0,0,0,0],
                    [0,0,0,0,3,3,3,0,0,3,3,3,0,0,0,0],
                    [0,0,0,4,4,4,0,0,0,0,4,4,4,0,0,0]
                ]
            ],
            up: [
                [
                    [0,0,0,0,0,9,9,9,9,9,9,0,0,0,0,0],
                    [0,0,0,9,9,10,10,10,10,10,10,9,9,0,0,0],
                    [0,0,9,10,10,10,10,10,10,10,10,10,10,9,0,0],
                    [0,0,9,10,10,10,10,10,10,10,10,10,10,9,0,0],
                    [0,0,9,10,10,10,10,10,10,10,10,10,10,9,0,0],
                    [0,0,0,9,9,9,9,9,9,9,9,9,9,0,0,0],
                    [0,0,0,0,9,9,9,9,9,9,9,9,0,0,0,0],
                    [0,0,0,0,5,5,5,5,5,5,5,5,0,0,0,0],
                    [0,0,0,1,1,2,2,2,2,2,2,1,1,0,0,0],
                    [0,0,1,1,2,2,3,3,3,3,2,2,1,1,0,0],
                    [0,0,1,2,2,3,3,3,3,3,3,2,2,1,0,0],
                    [0,0,1,2,2,2,2,2,2,2,2,2,2,1,0,0],
                    [0,0,0,2,2,2,2,0,0,2,2,2,2,0,0,0],
                    [0,0,0,2,2,2,0,0,0,0,2,2,2,0,0,0],
                    [0,0,0,3,3,3,0,0,0,0,3,3,3,0,0,0],
                    [0,0,0,4,4,4,0,0,0,0,4,4,4,0,0,0]
                ],
                [
                    [0,0,0,0,0,9,9,9,9,9,9,0,0,0,0,0],
                    [0,0,0,9,9,10,10,10,10,10,10,9,9,0,0,0],
                    [0,0,9,10,10,10,10,10,10,10,10,10,10,9,0,0],
                    [0,0,9,10,10,10,10,10,10,10,10,10,10,9,0,0],
                    [0,0,9,10,10,10,10,10,10,10,10,10,10,9,0,0],
                    [0,0,0,9,9,9,9,9,9,9,9,9,9,0,0,0],
                    [0,0,0,0,9,9,9,9,9,9,9,9,0,0,0,0],
                    [0,0,0,0,5,5,5,5,5,5,5,5,0,0,0,0],
                    [0,0,0,1,1,2,2,2,2,2,2,1,1,0,0,0],
                    [0,0,1,1,2,2,3,3,3,3,2,2,1,1,0,0],
                    [0,0,1,2,2,3,3,3,3,3,3,2,2,1,0,0],
                    [0,0,1,2,2,2,2,2,2,2,2,2,2,1,0,0],
                    [0,0,0,2,2,2,0,0,0,2,2,2,2,0,0,0],
                    [0,0,0,0,2,2,2,0,0,0,2,2,0,0,0,0],
                    [0,0,0,0,3,3,3,0,0,3,3,3,0,0,0,0],
                    [0,0,0,4,4,4,0,0,0,0,4,4,4,0,0,0]
                ]
            ],
            left: [
                [
                    [0,0,0,0,9,9,9,9,9,9,0,0,0,0,0,0],
                    [0,0,0,9,10,10,10,10,10,10,9,0,0,0,0,0],
                    [0,0,9,10,5,5,5,5,5,10,10,9,0,0,0,0],
                    [0,0,9,5,5,5,5,5,5,5,10,9,0,0,0,0],
                    [0,9,5,5,0,6,5,5,5,5,9,0,0,0,0,0],
                    [0,0,5,5,5,5,6,6,5,5,0,0,0,0,0,0],
                    [0,0,0,5,5,6,6,6,6,5,0,0,0,0,0,0],
                    [0,0,0,0,5,5,5,5,5,0,0,0,0,0,0,0],
                    [0,0,0,1,1,2,2,2,2,1,1,0,0,0,0,0],
                    [0,0,1,1,2,2,3,3,2,2,1,1,0,0,0,0],
                    [0,0,1,2,2,3,3,3,3,2,2,1,0,0,0,0],
                    [0,0,1,2,2,2,2,2,2,2,2,1,0,0,0,0],
                    [0,0,0,2,2,2,2,0,2,2,2,0,0,0,0,0],
                    [0,0,0,2,2,2,0,0,0,2,2,2,0,0,0,0],
                    [0,0,0,3,3,3,0,0,0,0,3,3,0,0,0,0],
                    [0,0,0,4,4,4,0,0,0,0,4,4,0,0,0,0]
                ],
                [
                    [0,0,0,0,9,9,9,9,9,9,0,0,0,0,0,0],
                    [0,0,0,9,10,10,10,10,10,10,9,0,0,0,0,0],
                    [0,0,9,10,5,5,5,5,5,10,10,9,0,0,0,0],
                    [0,0,9,5,5,5,5,5,5,5,10,9,0,0,0,0],
                    [0,9,5,5,0,6,5,5,5,5,9,0,0,0,0,0],
                    [0,0,5,5,5,5,6,6,5,5,0,0,0,0,0,0],
                    [0,0,0,5,5,6,6,6,6,5,0,0,0,0,0,0],
                    [0,0,0,0,5,5,5,5,5,0,0,0,0,0,0,0],
                    [0,0,0,1,1,2,2,2,2,1,1,0,0,0,0,0],
                    [0,0,1,1,2,2,3,3,2,2,1,1,0,0,0,0],
                    [0,0,1,2,2,3,3,3,3,2,2,1,0,0,0,0],
                    [0,0,1,2,2,2,2,2,2,2,2,1,0,0,0,0],
                    [0,0,0,0,2,2,2,0,2,2,2,2,0,0,0,0],
                    [0,0,0,0,0,2,2,0,0,2,2,0,0,0,0,0],
                    [0,0,0,0,3,3,3,0,0,3,3,0,0,0,0,0],
                    [0,0,0,0,4,4,0,0,0,0,4,4,0,0,0,0]
                ]
            ],
            right: [
                [
                    [0,0,0,0,0,0,9,9,9,9,9,9,0,0,0,0],
                    [0,0,0,0,0,9,10,10,10,10,10,10,9,0,0,0],
                    [0,0,0,0,9,10,10,5,5,5,5,5,10,9,0,0],
                    [0,0,0,0,9,10,5,5,5,5,5,5,5,9,0,0],
                    [0,0,0,0,0,9,5,5,5,5,6,0,5,5,9,0],
                    [0,0,0,0,0,0,5,5,6,6,5,5,5,5,0,0],
                    [0,0,0,0,0,0,5,6,6,6,6,5,5,0,0,0],
                    [0,0,0,0,0,0,0,5,5,5,5,5,0,0,0,0],
                    [0,0,0,0,0,1,1,2,2,2,2,1,1,0,0,0],
                    [0,0,0,0,1,1,2,2,3,3,2,2,1,1,0,0],
                    [0,0,0,0,1,2,2,3,3,3,3,2,2,1,0,0],
                    [0,0,0,0,1,2,2,2,2,2,2,2,2,1,0,0],
                    [0,0,0,0,0,2,2,2,0,2,2,2,2,0,0,0],
                    [0,0,0,0,2,2,2,0,0,0,2,2,2,0,0,0],
                    [0,0,0,0,3,3,0,0,0,0,3,3,3,0,0,0],
                    [0,0,0,0,4,4,0,0,0,0,4,4,4,0,0,0]
                ],
                [
                    [0,0,0,0,0,0,9,9,9,9,9,9,0,0,0,0],
                    [0,0,0,0,0,9,10,10,10,10,10,10,9,0,0,0],
                    [0,0,0,0,9,10,10,5,5,5,5,5,10,9,0,0],
                    [0,0,0,0,9,10,5,5,5,5,5,5,5,9,0,0],
                    [0,0,0,0,0,9,5,5,5,5,6,0,5,5,9,0],
                    [0,0,0,0,0,0,5,5,6,6,5,5,5,5,0,0],
                    [0,0,0,0,0,0,5,6,6,6,6,5,5,0,0,0],
                    [0,0,0,0,0,0,0,5,5,5,5,5,0,0,0,0],
                    [0,0,0,0,0,1,1,2,2,2,2,1,1,0,0,0],
                    [0,0,0,0,1,1,2,2,3,3,2,2,1,1,0,0],
                    [0,0,0,0,1,2,2,3,3,3,3,2,2,1,0,0],
                    [0,0,0,0,1,2,2,2,2,2,2,2,2,1,0,0],
                    [0,0,0,0,2,2,2,2,0,2,2,2,0,0,0,0],
                    [0,0,0,0,0,2,2,0,0,2,2,0,0,0,0,0],
                    [0,0,0,0,0,3,3,0,0,3,3,3,0,0,0,0],
                    [0,0,0,0,4,4,0,0,0,0,4,4,0,0,0,0]
                ]
            ]
        },
        // Portrait for dialogue (24x24)
        portrait: [
            [0,0,0,0,0,0,9,9,9,9,9,9,9,9,9,9,9,9,0,0,0,0,0,0],
            [0,0,0,0,9,9,10,10,10,10,10,10,10,10,10,10,9,9,0,0,0,0],
            [0,0,0,9,10,10,10,10,10,10,10,10,10,10,10,10,10,10,9,0,0,0],
            [0,0,9,10,10,5,5,5,5,5,5,5,5,5,5,5,5,10,10,9,0,0],
            [0,0,9,10,5,5,5,5,5,5,5,5,5,5,5,5,5,5,10,9,0,0],
            [0,0,9,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,9,0,0],
            [0,9,5,5,5,5,6,6,5,5,5,5,5,5,6,6,5,5,5,5,9,0],
            [0,9,5,5,5,6,0,0,6,5,5,5,5,6,0,0,6,5,5,5,9,0],
            [0,9,5,5,5,5,0,0,5,5,5,5,5,5,0,0,5,5,5,5,9,0],
            [0,9,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,9,0],
            [0,0,5,5,5,5,5,5,5,6,6,6,6,5,5,5,5,5,5,0,0,0],
            [0,0,5,5,5,5,5,5,6,6,6,6,6,6,5,5,5,5,5,0,0,0],
            [0,0,0,5,5,5,5,5,5,6,6,6,6,5,5,5,5,5,0,0,0,0],
            [0,0,0,0,5,5,5,5,5,5,5,5,5,5,5,5,5,0,0,0,0,0],
            [0,0,0,0,0,1,1,2,2,2,2,2,2,2,2,1,1,0,0,0,0,0],
            [0,0,0,0,1,1,2,2,2,3,3,3,3,2,2,2,1,1,0,0,0,0],
            [0,0,0,1,1,2,2,2,3,3,3,3,3,3,2,2,2,1,1,0,0,0],
            [0,0,0,1,2,2,2,3,3,3,3,3,3,3,3,2,2,2,1,0,0,0],
            [0,0,0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0,0,0],
            [0,0,0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0,0,0],
            [0,0,0,0,1,1,2,2,2,2,2,2,2,2,2,2,1,1,0,0,0,0],
            [0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ]
    },
    // BLAZE - Incident Responder
    BLAZE: {
        name: 'BLAZE',
        palette: { body: Palette.red, skin: Palette.skin3, hair: Palette.hairBrown },
        frames: {
            down: [
                [
                    [0,0,0,0,0,9,9,9,9,9,9,0,0,0,0,0],
                    [0,0,0,9,9,10,10,10,10,10,10,9,9,0,0,0],
                    [0,0,9,10,5,5,5,5,5,5,5,5,10,9,0,0],
                    [0,0,9,5,5,6,5,5,5,5,6,5,5,9,0,0],
                    [0,0,9,5,5,0,6,5,5,6,0,5,5,9,0,0],
                    [0,0,0,5,5,5,5,6,6,5,5,5,5,0,0,0],
                    [0,0,0,5,5,5,6,6,6,6,5,5,5,0,0,0],
                    [0,0,0,0,5,5,5,5,5,5,5,5,0,0,0,0],
                    [0,0,0,1,1,2,2,2,2,2,2,1,1,0,0,0],
                    [0,0,1,1,2,2,3,3,3,3,2,2,1,1,0,0],
                    [0,0,1,2,2,3,3,3,3,3,3,2,2,1,0,0],
                    [0,0,1,2,2,2,2,2,2,2,2,2,2,1,0,0],
                    [0,0,0,2,2,2,2,0,0,2,2,2,2,0,0,0],
                    [0,0,0,2,2,2,0,0,0,0,2,2,2,0,0,0],
                    [0,0,0,3,3,3,0,0,0,0,3,3,3,0,0,0],
                    [0,0,0,4,4,4,0,0,0,0,4,4,4,0,0,0]
                ],
                [
                    [0,0,0,0,0,9,9,9,9,9,9,0,0,0,0,0],
                    [0,0,0,9,9,10,10,10,10,10,10,9,9,0,0,0],
                    [0,0,9,10,5,5,5,5,5,5,5,5,10,9,0,0],
                    [0,0,9,5,5,6,5,5,5,5,6,5,5,9,0,0],
                    [0,0,9,5,5,0,6,5,5,6,0,5,5,9,0,0],
                    [0,0,0,5,5,5,5,6,6,5,5,5,5,0,0,0],
                    [0,0,0,5,5,5,6,6,6,6,5,5,5,0,0,0],
                    [0,0,0,0,5,5,5,5,5,5,5,5,0,0,0,0],
                    [0,0,0,1,1,2,2,2,2,2,2,1,1,0,0,0],
                    [0,0,1,1,2,2,3,3,3,3,2,2,1,1,0,0],
                    [0,0,1,2,2,3,3,3,3,3,3,2,2,1,0,0],
                    [0,0,1,2,2,2,2,2,2,2,2,2,2,1,0,0],
                    [0,0,0,2,2,2,0,0,0,2,2,2,2,0,0,0],
                    [0,0,0,0,2,2,2,0,0,0,2,2,0,0,0,0],
                    [0,0,0,0,3,3,3,0,0,3,3,3,0,0,0,0],
                    [0,0,0,4,4,4,0,0,0,0,4,4,4,0,0,0]
                ]
            ],
            up: null, left: null, right: null // Will use down frames mirrored
        },
        portrait: null // Uses generic portrait rendering
    },
    // GHOST - Pen Tester
    GHOST: {
        name: 'GHOST',
        palette: { body: Palette.purple, skin: Palette.skin1, hair: Palette.hairBlack },
        frames: {
            down: [
                [
                    [0,0,0,0,0,9,9,9,9,9,9,0,0,0,0,0],
                    [0,0,0,9,9,10,10,10,10,10,10,9,9,0,0,0],
                    [0,0,9,10,5,5,5,5,5,5,5,5,10,9,0,0],
                    [0,0,9,5,5,6,5,5,5,5,6,5,5,9,0,0],
                    [0,0,9,5,5,0,6,5,5,6,0,5,5,9,0,0],
                    [0,0,0,5,5,5,5,6,6,5,5,5,5,0,0,0],
                    [0,0,0,5,5,5,6,6,6,6,5,5,5,0,0,0],
                    [0,0,0,0,5,5,5,5,5,5,5,5,0,0,0,0],
                    [0,0,0,1,1,2,2,2,2,2,2,1,1,0,0,0],
                    [0,0,1,1,2,2,3,3,3,3,2,2,1,1,0,0],
                    [0,0,1,2,2,3,3,3,3,3,3,2,2,1,0,0],
                    [0,0,1,2,2,2,2,2,2,2,2,2,2,1,0,0],
                    [0,0,0,2,2,2,2,0,0,2,2,2,2,0,0,0],
                    [0,0,0,2,2,2,0,0,0,0,2,2,2,0,0,0],
                    [0,0,0,3,3,3,0,0,0,0,3,3,3,0,0,0],
                    [0,0,0,4,4,4,0,0,0,0,4,4,4,0,0,0]
                ],
                [
                    [0,0,0,0,0,9,9,9,9,9,9,0,0,0,0,0],
                    [0,0,0,9,9,10,10,10,10,10,10,9,9,0,0,0],
                    [0,0,9,10,5,5,5,5,5,5,5,5,10,9,0,0],
                    [0,0,9,5,5,6,5,5,5,5,6,5,5,9,0,0],
                    [0,0,9,5,5,0,6,5,5,6,0,5,5,9,0,0],
                    [0,0,0,5,5,5,5,6,6,5,5,5,5,0,0,0],
                    [0,0,0,5,5,5,6,6,6,6,5,5,5,0,0,0],
                    [0,0,0,0,5,5,5,5,5,5,5,5,0,0,0,0],
                    [0,0,0,1,1,2,2,2,2,2,2,1,1,0,0,0],
                    [0,0,1,1,2,2,3,3,3,3,2,2,1,1,0,0],
                    [0,0,1,2,2,3,3,3,3,3,3,2,2,1,0,0],
                    [0,0,1,2,2,2,2,2,2,2,2,2,2,1,0,0],
                    [0,0,0,2,2,2,0,0,0,2,2,2,2,0,0,0],
                    [0,0,0,0,2,2,2,0,0,0,2,2,0,0,0,0],
                    [0,0,0,0,3,3,3,0,0,3,3,3,0,0,0,0],
                    [0,0,0,4,4,4,0,0,0,0,4,4,4,0,0,0]
                ]
            ],
            up: null, left: null, right: null
        },
        portrait: null
    },
    // VOLT - ICS Engineer
    VOLT: {
        name: 'VOLT',
        palette: { body: Palette.yellow, skin: Palette.skin3, hair: Palette.hairBrown },
        frames: {
            down: [
                [
                    [0,0,0,0,0,9,9,9,9,9,9,0,0,0,0,0],
                    [0,0,0,9,9,10,10,10,10,10,10,9,9,0,0,0],
                    [0,0,9,10,5,5,5,5,5,5,5,5,10,9,0,0],
                    [0,0,9,5,5,6,5,5,5,5,6,5,5,9,0,0],
                    [0,0,9,5,5,0,6,5,5,6,0,5,5,9,0,0],
                    [0,0,0,5,5,5,5,6,6,5,5,5,5,0,0,0],
                    [0,0,0,5,5,5,6,6,6,6,5,5,5,0,0,0],
                    [0,0,0,0,5,5,5,5,5,5,5,5,0,0,0,0],
                    [0,0,0,1,1,2,2,2,2,2,2,1,1,0,0,0],
                    [0,0,1,1,2,2,3,3,3,3,2,2,1,1,0,0],
                    [0,0,1,2,2,3,3,3,3,3,3,2,2,1,0,0],
                    [0,0,1,2,2,2,2,2,2,2,2,2,2,1,0,0],
                    [0,0,0,2,2,2,2,0,0,2,2,2,2,0,0,0],
                    [0,0,0,2,2,2,0,0,0,0,2,2,2,0,0,0],
                    [0,0,0,3,3,3,0,0,0,0,3,3,3,0,0,0],
                    [0,0,0,4,4,4,0,0,0,0,4,4,4,0,0,0]
                ],
                [
                    [0,0,0,0,0,9,9,9,9,9,9,0,0,0,0,0],
                    [0,0,0,9,9,10,10,10,10,10,10,9,9,0,0,0],
                    [0,0,9,10,5,5,5,5,5,5,5,5,10,9,0,0],
                    [0,0,9,5,5,6,5,5,5,5,6,5,5,9,0,0],
                    [0,0,9,5,5,0,6,5,5,6,0,5,5,9,0,0],
                    [0,0,0,5,5,5,5,6,6,5,5,5,5,0,0,0],
                    [0,0,0,5,5,5,6,6,6,6,5,5,5,0,0,0],
                    [0,0,0,0,5,5,5,5,5,5,5,5,0,0,0,0],
                    [0,0,0,1,1,2,2,2,2,2,2,1,1,0,0,0],
                    [0,0,1,1,2,2,3,3,3,3,2,2,1,1,0,0],
                    [0,0,1,2,2,3,3,3,3,3,3,2,2,1,0,0],
                    [0,0,1,2,2,2,2,2,2,2,2,2,2,1,0,0],
                    [0,0,0,2,2,2,0,0,0,2,2,2,2,0,0,0],
                    [0,0,0,0,2,2,2,0,0,0,2,2,0,0,0,0],
                    [0,0,0,0,3,3,3,0,0,3,3,3,0,0,0,0],
                    [0,0,0,4,4,4,0,0,0,0,4,4,4,0,0,0]
                ]
            ],
            up: null, left: null, right: null
        },
        portrait: null
    }
};

// NPC sprite definitions (16x16)
const NPCSprites = {
    martinez: {
        name: 'Chief Martinez',
        palette: { body: Palette.orange, skin: Palette.skin3, hair: Palette.hairBlack, helmet: Palette.yellow },
        hasHelmet: true,
        pattern: [
            [0,0,0,0,13,13,13,13,13,13,13,13,0,0,0,0],
            [0,0,0,13,13,13,13,13,13,13,13,13,13,0,0,0],
            [0,0,13,13,5,5,5,5,5,5,5,5,13,13,0,0],
            [0,0,9,5,5,6,5,5,5,5,6,5,5,9,0,0],
            [0,0,9,5,5,0,6,5,5,6,0,5,5,9,0,0],
            [0,0,0,5,5,5,5,6,6,5,5,5,5,0,0,0],
            [0,0,0,5,5,5,6,6,6,6,5,5,5,0,0,0],
            [0,0,0,0,5,5,5,5,5,5,5,5,0,0,0,0],
            [0,0,0,1,1,2,2,2,2,2,2,1,1,0,0,0],
            [0,0,1,1,2,2,3,3,3,3,2,2,1,1,0,0],
            [0,0,1,2,2,3,3,3,3,3,3,2,2,1,0,0],
            [0,0,1,2,2,2,2,2,2,2,2,2,2,1,0,0],
            [0,0,0,2,2,2,2,0,0,2,2,2,2,0,0,0],
            [0,0,0,2,2,2,0,0,0,0,2,2,2,0,0,0],
            [0,0,0,3,3,3,0,0,0,0,3,3,3,0,0,0],
            [0,0,0,4,4,4,0,0,0,0,4,4,4,0,0,0]
        ]
    },
    park: {
        name: 'Technician Park',
        palette: { body: Palette.green, skin: Palette.skin1, hair: Palette.hairBlack },
        pattern: [
            [0,0,0,0,0,9,9,9,9,9,9,0,0,0,0,0],
            [0,0,0,9,9,10,10,10,10,10,10,9,9,0,0,0],
            [0,0,9,10,5,5,5,5,5,5,5,5,10,9,0,0],
            [0,0,9,5,5,6,5,5,5,5,6,5,5,9,0,0],
            [0,0,9,5,5,0,6,5,5,6,0,5,5,9,0,0],
            [0,0,0,5,5,5,5,6,6,5,5,5,5,0,0,0],
            [0,0,0,5,5,5,6,6,6,6,5,5,5,0,0,0],
            [0,0,0,0,5,5,5,5,5,5,5,5,0,0,0,0],
            [0,0,0,1,1,2,2,2,2,2,2,1,1,0,0,0],
            [0,0,1,1,2,2,3,3,3,3,2,2,1,1,0,0],
            [0,0,1,2,2,3,3,3,3,3,3,2,2,1,0,0],
            [0,0,1,2,2,2,2,2,2,2,2,2,2,1,0,0],
            [0,0,0,2,2,2,2,0,0,2,2,2,2,0,0,0],
            [0,0,0,2,2,2,0,0,0,0,2,2,2,0,0,0],
            [0,0,0,3,3,3,0,0,0,0,3,3,3,0,0,0],
            [0,0,0,4,4,4,0,0,0,0,4,4,4,0,0,0]
        ]
    },
    santos: {
        name: 'Dr. Santos',
        palette: { body: Palette.purple, skin: Palette.skin2, hair: Palette.hairBlack, labcoat: Palette.white },
        hasLabcoat: true,
        pattern: [
            [0,0,0,0,0,9,9,9,9,9,9,0,0,0,0,0],
            [0,0,0,9,9,10,10,10,10,10,10,9,9,0,0,0],
            [0,0,9,10,5,5,5,5,5,5,5,5,10,9,0,0],
            [0,0,9,5,5,6,5,5,5,5,6,5,5,9,0,0],
            [0,0,9,5,5,0,6,5,5,6,0,5,5,9,0,0],
            [0,0,0,5,5,5,5,6,6,5,5,5,5,0,0,0],
            [0,0,0,5,5,5,6,6,6,6,5,5,5,0,0,0],
            [0,0,0,0,5,5,5,5,5,5,5,5,0,0,0,0],
            [0,0,13,13,13,13,13,13,13,13,13,13,13,13,0,0],
            [0,13,13,13,13,1,1,1,1,1,1,13,13,13,13,0],
            [0,13,13,13,1,1,1,1,1,1,1,1,13,13,13,0],
            [0,13,13,13,13,13,13,13,13,13,13,13,13,13,13,0],
            [0,0,13,13,13,13,0,0,13,13,13,13,0,0,0,0],
            [0,0,0,2,2,2,0,0,0,0,2,2,2,0,0,0],
            [0,0,0,3,3,3,0,0,0,0,3,3,3,0,0,0],
            [0,0,0,4,4,4,0,0,0,0,4,4,4,0,0,0]
        ]
    },
    chen: {
        name: 'Engineer Chen',
        palette: { body: Palette.blue, skin: Palette.skin1, hair: Palette.hairBlack },
        pattern: null // Uses generic pattern with palette
    },
    okonkwo: {
        name: 'Analyst Okonkwo',
        palette: { body: Palette.red, skin: Palette.skin3, hair: Palette.hairBlack },
        pattern: null
    },
    williams: {
        name: 'Tech Williams',
        palette: { body: Palette.green, skin: Palette.skin3, hair: Palette.hairBrown },
        pattern: null
    },
    kim: {
        name: 'Specialist Kim',
        palette: { body: Palette.teal, skin: Palette.skin1, hair: Palette.hairBlack },
        pattern: null
    },
    rodriguez: {
        name: 'Operator Rodriguez',
        palette: { body: Palette.orange, skin: Palette.skin3, hair: Palette.hairBrown, helmet: Palette.yellow },
        hasHelmet: true,
        pattern: null
    },
    morgan: {
        name: 'Director Morgan',
        palette: { body: Palette.purple, skin: Palette.skin2, hair: Palette.hairBrown },
        pattern: null
    }
};

// Boss sprite definitions (24x24)
const BossSprites = {
    glitch: {
        name: 'GLITCH',
        title: 'The Script Kiddie',
        palette: { body: ['#ff44ff', '#ff00ff', '#cc00cc', '#880088'], accent: ['#44ff44', '#00ff00', '#00cc00', '#008800'] },
        pattern: [
            [0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
            [0,0,0,0,1,1,1,2,2,2,2,2,2,2,2,2,2,1,1,1,0,0,0,0],
            [0,0,0,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,0,0,0],
            [0,0,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,0,0],
            [0,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,0],
            [0,1,2,2,2,3,3,3,2,2,2,2,2,2,2,2,3,3,3,2,2,2,1,0],
            [1,1,2,2,2,3,5,5,3,2,2,2,2,2,2,3,5,5,3,2,2,2,1,1],
            [1,2,2,2,2,3,5,5,3,2,2,2,2,2,2,3,5,5,3,2,2,2,2,1],
            [1,2,2,2,2,3,3,3,2,2,2,2,2,2,2,2,3,3,3,2,2,2,2,1],
            [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
            [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
            [1,2,2,2,2,2,2,2,4,4,4,4,4,4,4,4,2,2,2,2,2,2,2,1],
            [1,2,2,2,2,2,2,2,4,4,4,4,4,4,4,4,2,2,2,2,2,2,2,1],
            [0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0],
            [0,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,0],
            [0,0,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,0,0],
            [0,0,0,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,0,0,0],
            [0,0,0,0,1,1,2,2,2,0,0,0,0,0,0,2,2,2,1,1,0,0,0,0],
            [0,0,0,0,0,1,1,2,2,0,0,0,0,0,0,2,2,1,1,0,0,0,0,0],
            [0,0,0,0,0,0,1,2,2,0,0,0,0,0,0,2,2,1,0,0,0,0,0,0],
            [0,0,0,0,0,0,1,3,3,0,0,0,0,0,0,3,3,1,0,0,0,0,0,0],
            [0,0,0,0,0,0,1,3,3,0,0,0,0,0,0,3,3,1,0,0,0,0,0,0],
            [0,0,0,0,0,0,1,4,4,0,0,0,0,0,0,4,4,1,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,4,4,0,0,0,0,0,0,4,4,0,0,0,0,0,0,0]
        ],
        effects: ['glitch']
    },
    architect: {
        name: 'ARCHITECT',
        title: 'The Network Infiltrator',
        palette: { body: ['#66ffff', '#00ffff', '#00cccc', '#008888'], accent: ['#ff6666', '#ff0000', '#cc0000', '#880000'] },
        pattern: [
            [0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
            [0,0,0,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,0,0,0],
            [0,0,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,0,0],
            [0,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,0],
            [0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0],
            [1,1,2,2,2,3,3,3,3,2,2,2,2,2,2,3,3,3,3,2,2,2,1,1],
            [1,2,2,2,3,5,5,5,5,3,2,2,2,2,3,5,5,5,5,3,2,2,2,1],
            [1,2,2,2,3,5,5,5,5,3,2,2,2,2,3,5,5,5,5,3,2,2,2,1],
            [1,2,2,2,2,3,3,3,3,2,2,2,2,2,2,3,3,3,3,2,2,2,2,1],
            [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
            [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
            [1,2,2,2,2,2,2,2,2,4,4,4,4,4,4,2,2,2,2,2,2,2,2,1],
            [1,2,2,2,2,2,2,2,4,4,4,4,4,4,4,4,2,2,2,2,2,2,2,1],
            [0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0],
            [0,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,0],
            [0,0,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,0,0],
            [0,0,0,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,0,0,0],
            [0,0,0,0,1,1,2,2,2,0,0,0,0,0,0,2,2,2,1,1,0,0,0,0],
            [0,0,0,0,0,1,1,2,2,0,0,0,0,0,0,2,2,1,1,0,0,0,0,0],
            [0,0,0,0,0,0,1,2,2,0,0,0,0,0,0,2,2,1,0,0,0,0,0,0],
            [0,0,0,0,0,0,1,3,3,0,0,0,0,0,0,3,3,1,0,0,0,0,0,0],
            [0,0,0,0,0,0,1,3,3,0,0,0,0,0,0,3,3,1,0,0,0,0,0,0],
            [0,0,0,0,0,0,1,4,4,0,0,0,0,0,0,4,4,1,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,4,4,0,0,0,0,0,0,4,4,0,0,0,0,0,0,0]
        ],
        effects: ['datastream']
    },
    wiretap: {
        name: 'WIRETAP',
        title: 'The Protocol Exploiter',
        palette: { body: ['#ffff66', '#ffff00', '#cccc00', '#888800'], accent: ['#ff6666', '#ff0000', '#cc0000', '#880000'] },
        pattern: [
            [0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0],
            [0,0,0,0,3,3,3,1,1,1,1,1,1,1,1,1,1,3,3,3,0,0,0,0],
            [0,0,0,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,0,0,0],
            [0,0,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,0,0],
            [0,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,0],
            [0,3,1,1,1,4,4,4,4,1,1,1,1,1,1,4,4,4,4,1,1,1,3,0],
            [3,3,1,1,1,4,5,5,4,1,1,1,1,1,1,4,5,5,4,1,1,1,3,3],
            [3,1,1,1,1,4,5,5,4,1,1,1,1,1,1,4,5,5,4,1,1,1,1,3],
            [3,1,1,1,1,4,4,4,4,1,1,1,1,1,1,4,4,4,4,1,1,1,1,3],
            [3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3],
            [3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3],
            [3,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,3],
            [3,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,3],
            [0,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,0],
            [0,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,0],
            [0,0,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,0,0],
            [0,0,0,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,0,0,0],
            [0,0,0,0,3,3,1,1,1,0,0,0,0,0,0,1,1,1,3,3,0,0,0,0],
            [0,0,0,0,0,3,3,1,1,0,0,0,0,0,0,1,1,3,3,0,0,0,0,0],
            [0,0,0,0,0,0,3,1,1,0,0,0,0,0,0,1,1,3,0,0,0,0,0,0],
            [0,0,0,0,0,0,3,2,2,0,0,0,0,0,0,2,2,3,0,0,0,0,0,0],
            [0,0,0,0,0,0,3,2,2,0,0,0,0,0,0,2,2,3,0,0,0,0,0,0],
            [0,0,0,0,0,0,3,4,4,0,0,0,0,0,0,4,4,3,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,4,4,0,0,0,0,0,0,4,4,0,0,0,0,0,0,0]
        ],
        effects: ['electric']
    }
};

// Generic NPC pattern (16x16)
const GenericNPCPattern = [
    [0,0,0,0,0,9,9,9,9,9,9,0,0,0,0,0],
    [0,0,0,9,9,10,10,10,10,10,10,9,9,0,0,0],
    [0,0,9,10,5,5,5,5,5,5,5,5,10,9,0,0],
    [0,0,9,5,5,6,5,5,5,5,6,5,5,9,0,0],
    [0,0,9,5,5,0,6,5,5,6,0,5,5,9,0,0],
    [0,0,0,5,5,5,5,6,6,5,5,5,5,0,0,0],
    [0,0,0,5,5,5,6,6,6,6,5,5,5,0,0,0],
    [0,0,0,0,5,5,5,5,5,5,5,5,0,0,0,0],
    [0,0,0,1,1,2,2,2,2,2,2,1,1,0,0,0],
    [0,0,1,1,2,2,3,3,3,3,2,2,1,1,0,0],
    [0,0,1,2,2,3,3,3,3,3,3,2,2,1,0,0],
    [0,0,1,2,2,2,2,2,2,2,2,2,2,1,0,0],
    [0,0,0,2,2,2,2,0,0,2,2,2,2,0,0,0],
    [0,0,0,2,2,2,0,0,0,0,2,2,2,0,0,0],
    [0,0,0,3,3,3,0,0,0,0,3,3,3,0,0,0],
    [0,0,0,4,4,4,0,0,0,0,4,4,4,0,0,0]
];

// Helper function to draw 16-bit pixel art pattern with palette
function draw16BitPattern(ctx, pattern, x, y, pixelSize, palette) {
    for (let py = 0; py < pattern.length; py++) {
        for (let px = 0; px < pattern[py].length; px++) {
            const colorIndex = pattern[py][px];
            if (colorIndex === 0) continue;

            let color;
            if (palette.body && colorIndex >= 1 && colorIndex <= 4) {
                color = palette.body[colorIndex - 1];
            } else if (palette.skin && colorIndex >= 5 && colorIndex <= 8) {
                color = palette.skin[colorIndex - 5];
            } else if (palette.hair && colorIndex >= 9 && colorIndex <= 12) {
                color = palette.hair[colorIndex - 9];
            } else if (colorIndex === 13) {
                color = palette.labcoat ? palette.labcoat[0] : (palette.helmet ? palette.helmet[0] : '#ffffff');
            } else if (colorIndex === 14) {
                color = palette.accent ? palette.accent[0] : '#ffffff';
            } else {
                color = '#ffffff';
            }

            ctx.fillStyle = color;
            ctx.fillRect(x + px * pixelSize, y + py * pixelSize, pixelSize, pixelSize);
        }
    }
}

// Draw boss pattern with special palettes
function drawBossPattern(ctx, pattern, x, y, pixelSize, palette) {
    for (let py = 0; py < pattern.length; py++) {
        for (let px = 0; px < pattern[py].length; px++) {
            const colorIndex = pattern[py][px];
            if (colorIndex === 0) continue;

            let color;
            if (colorIndex >= 1 && colorIndex <= 4) {
                color = palette.body[colorIndex - 1];
            } else if (colorIndex === 5) {
                color = palette.accent ? palette.accent[0] : '#ff0000';
            } else {
                color = '#ffffff';
            }

            ctx.fillStyle = color;
            ctx.fillRect(x + px * pixelSize, y + py * pixelSize, pixelSize, pixelSize);
        }
    }
}

// Player sprite class with 16-bit animations
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
        this.width = TILE_SIZE - 4;
        this.height = TILE_SIZE - 2;
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
            if (this.animTimer > 0.12) {
                this.animTimer = 0;
                this.animFrame = (this.animFrame + 1) % 2;
            }
        } else {
            this.animFrame = 0;
        }
    }

    getPixelX() { return this.x * TILE_SIZE + 2; }
    getPixelY() { return this.y * TILE_SIZE + 1; }
    getTileX() { return Math.round(this.x); }
    getTileY() { return Math.round(this.y); }

    draw(ctx, offsetX = 0, offsetY = 0, time = 0) {
        const px = this.getPixelX() + offsetX;
        const py = this.getPixelY() + offsetY;

        const sprite = CharacterSprites.CIPHER;
        const pixelSize = 2;

        // Get direction key
        let dirKey = 'down';
        if (this.direction === Direction.UP) dirKey = 'up';
        else if (this.direction === Direction.LEFT) dirKey = 'left';
        else if (this.direction === Direction.RIGHT) dirKey = 'right';

        // Get frame (use down if direction not available)
        let frames = sprite.frames[dirKey] || sprite.frames.down;
        let frame = frames[this.animFrame % frames.length];

        const spriteWidth = frame[0].length * pixelSize;
        const spriteHeight = frame.length * pixelSize;
        const spriteX = px + (this.width - spriteWidth) / 2;
        const spriteY = py + (this.height - spriteHeight) / 2;

        // Draw shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.ellipse(spriteX + spriteWidth / 2, py + this.height, spriteWidth / 3, 4, 0, 0, Math.PI * 2);
        ctx.fill();

        // Draw sprite
        draw16BitPattern(ctx, frame, spriteX, spriteY, pixelSize, sprite.palette);

        // Player indicator glow
        ctx.shadowColor = sprite.palette.body[1];
        ctx.shadowBlur = 8;
        ctx.strokeStyle = sprite.palette.body[1];
        ctx.lineWidth = 1;
        ctx.strokeRect(spriteX - 1, spriteY - 1, spriteWidth + 2, spriteHeight + 2);
        ctx.shadowBlur = 0;
    }
}

// NPC sprite class with 16-bit graphics
class NPCSprite {
    constructor(id, name, x, y, color, role) {
        this.id = id;
        this.name = name;
        this.x = x;
        this.y = y;
        this.color = color;
        this.role = role;
        this.direction = Direction.DOWN;
        this.width = TILE_SIZE - 4;
        this.height = TILE_SIZE - 2;
        this.talked = false;
        this.animTimer = 0;
        this.idleFrame = 0;
    }

    getPixelX() { return this.x * TILE_SIZE + 2; }
    getPixelY() { return this.y * TILE_SIZE + 1; }

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
        const pixelSize = 2;
        const pattern = sprite?.pattern || GenericNPCPattern;
        const palette = sprite?.palette || { body: Palette.blue, skin: Palette.skin2, hair: Palette.hairBlack };

        const bobY = Math.sin(this.animTimer * 4 + this.x) * 1;
        const spriteWidth = pattern[0].length * pixelSize;
        const spriteHeight = pattern.length * pixelSize;
        const spriteX = px + (this.width - spriteWidth) / 2;
        const spriteY = py + (this.height - spriteHeight) / 2 - bobY;

        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.ellipse(spriteX + spriteWidth / 2, py + this.height, spriteWidth / 3, 4, 0, 0, Math.PI * 2);
        ctx.fill();

        if (this.talked) {
            ctx.globalAlpha = 0.6;
        }

        draw16BitPattern(ctx, pattern, spriteX, spriteY, pixelSize, palette);
        ctx.globalAlpha = 1.0;

        if (!this.talked) {
            // Exclamation bubble
            const bubbleX = spriteX + spriteWidth / 2;
            const bubbleY = spriteY - 16 - Math.sin(time * 5) * 3;

            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.ellipse(bubbleX, bubbleY, 8, 8, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(bubbleX - 3, bubbleY + 6);
            ctx.lineTo(bubbleX, bubbleY + 12);
            ctx.lineTo(bubbleX + 3, bubbleY + 6);
            ctx.fill();

            ctx.fillStyle = Colors.WARNING;
            ctx.font = 'bold 12px "Courier New", monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('!', bubbleX, bubbleY);

            // Glow
            ctx.shadowColor = palette.body[1];
            ctx.shadowBlur = 6;
            ctx.strokeStyle = palette.body[1];
            ctx.lineWidth = 1;
            ctx.strokeRect(spriteX - 1, spriteY - 1, spriteWidth + 2, spriteHeight + 2);
            ctx.shadowBlur = 0;
        }

        // Name tag
        ctx.fillStyle = this.talked ? Colors.TEXT_DIM : Colors.TEXT;
        ctx.font = '10px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(this.name.split(' ').pop(), spriteX + spriteWidth / 2, py + this.height + 10);
    }
}

// Enemy/Boss sprite class with 16-bit graphics
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
        this.shakeX = 10;
    }

    draw(ctx, time = 0) {
        const centerX = CANVAS_WIDTH / 2;
        const y = 50;

        const sprite = BossSprites[this.id];
        if (!sprite) return;

        const pixelSize = 5;
        const bobY = Math.sin(this.animTimer * 2) * 4;
        const shakeOffset = Math.sin(this.shakeX * 10) * this.shakeX;

        const spriteWidth = sprite.pattern[0].length * pixelSize;
        const spriteHeight = sprite.pattern.length * pixelSize;
        const px = centerX - spriteWidth / 2 + shakeOffset;
        const py = y + bobY;

        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.beginPath();
        ctx.ellipse(centerX, py + spriteHeight + 10, spriteWidth / 2, 10, 0, 0, Math.PI * 2);
        ctx.fill();

        if (this.hitFlash > 0) {
            ctx.globalAlpha = 0.5 + Math.sin(this.hitFlash * 20) * 0.5;
        }

        drawBossPattern(ctx, sprite.pattern, px, py, pixelSize, sprite.palette);
        ctx.globalAlpha = 1.0;

        // Boss effects
        if (sprite.effects) {
            for (const effect of sprite.effects) {
                if (effect === 'glitch' && Math.random() > 0.9) {
                    ctx.fillStyle = '#00ff00';
                    const glitchX = px + Math.random() * spriteWidth;
                    const glitchY = py + Math.random() * spriteHeight;
                    ctx.fillRect(glitchX, glitchY, pixelSize * 3, pixelSize);
                }
                if (effect === 'datastream') {
                    ctx.fillStyle = 'rgba(0, 255, 255, 0.2)';
                    for (let i = 0; i < 6; i++) {
                        const streamY = (time * 80 + i * 25) % spriteHeight;
                        ctx.fillRect(px, py + streamY, spriteWidth, 3);
                    }
                }
                if (effect === 'electric' && Math.random() > 0.85) {
                    ctx.strokeStyle = '#ffff00';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(px + Math.random() * spriteWidth, py);
                    for (let i = 0; i < 5; i++) {
                        ctx.lineTo(px + Math.random() * spriteWidth, py + (spriteHeight / 5) * (i + 1));
                    }
                    ctx.stroke();
                }
            }
        }

        // Border glow
        ctx.shadowColor = sprite.palette.body[1];
        ctx.shadowBlur = 15;
        ctx.strokeStyle = this.hitFlash > 0 ? '#ffffff' : sprite.palette.body[1];
        ctx.lineWidth = 2;
        ctx.strokeRect(px - 2, py - 2, spriteWidth + 4, spriteHeight + 4);
        ctx.shadowBlur = 0;

        // Name and title
        ctx.fillStyle = Colors.TEXT;
        ctx.font = 'bold 18px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(this.name, centerX, py + spriteHeight + 30);

        ctx.fillStyle = Colors.TEXT_DIM;
        ctx.font = '14px "Courier New", monospace';
        ctx.fillText(this.title, centerX, py + spriteHeight + 50);

        // HP Bar
        Renderer.drawHPBar(centerX - 80, py + spriteHeight + 60, 160, 16, this.hp, this.maxHP);
        ctx.fillStyle = Colors.TEXT;
        ctx.font = '12px "Courier New", monospace';
        ctx.fillText(`HP: ${this.hp}/${this.maxHP}`, centerX, py + spriteHeight + 90);
    }
}

// Export for use
const Sprites = {
    PlayerSprite,
    NPCSprite,
    EnemySprite
};
