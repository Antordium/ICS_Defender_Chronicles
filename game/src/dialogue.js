// ============================================
// ICS DEFENDER CHRONICLES - DIALOGUE SYSTEM
// ============================================

const DialogueSystem = {
    // Current state
    active: false,
    currentDialogue: null,
    currentLine: 0,
    displayedText: '',
    charIndex: 0,
    textSpeed: 0.03,
    textTimer: 0,
    waitingForInput: false,

    // Callback when dialogue ends
    onComplete: null,

    // Start a dialogue sequence
    start(dialogue, onComplete = null) {
        this.active = true;
        this.currentDialogue = dialogue;
        this.currentLine = 0;
        this.displayedText = '';
        this.charIndex = 0;
        this.waitingForInput = false;
        this.onComplete = onComplete;

        Audio.playSFX('npc_talk');
    },

    // Update dialogue (text reveal)
    update(deltaTime) {
        if (!this.active || !this.currentDialogue) return;

        const line = this.currentDialogue.lines[this.currentLine];
        if (!line) {
            this.end();
            return;
        }

        if (!this.waitingForInput) {
            this.textTimer += deltaTime;

            if (this.textTimer >= this.textSpeed) {
                this.textTimer = 0;

                if (this.charIndex < line.text.length) {
                    this.displayedText += line.text[this.charIndex];
                    this.charIndex++;

                    // Play text sound occasionally
                    if (this.charIndex % 3 === 0) {
                        // Audio.playSFX('text_blip'); // Optional
                    }
                } else {
                    this.waitingForInput = true;
                }
            }
        }
    },

    // Handle input
    handleInput() {
        if (!this.active) return;

        if (Input.isPressed('a') || Input.isPressed('b')) {
            if (this.waitingForInput) {
                // Move to next line
                this.currentLine++;
                if (this.currentLine >= this.currentDialogue.lines.length) {
                    this.end();
                } else {
                    this.displayedText = '';
                    this.charIndex = 0;
                    this.waitingForInput = false;
                    Audio.playSFX('menu_confirm');
                }
            } else {
                // Skip to end of current line
                const line = this.currentDialogue.lines[this.currentLine];
                if (line) {
                    this.displayedText = line.text;
                    this.charIndex = line.text.length;
                    this.waitingForInput = true;
                }
            }
        }
    },

    // End dialogue
    end() {
        this.active = false;
        this.currentDialogue = null;

        if (this.onComplete) {
            this.onComplete();
            this.onComplete = null;
        }
    },

    // Draw dialogue box
    draw(time) {
        if (!this.active || !this.currentDialogue) return;

        const line = this.currentDialogue.lines[this.currentLine];
        if (!line) return;

        const boxX = 20;
        const boxY = CANVAS_HEIGHT - 140;
        const boxWidth = CANVAS_WIDTH - 40;
        const boxHeight = 120;

        // Draw dialogue box
        Renderer.drawBox(boxX, boxY, boxWidth, boxHeight);

        // Draw speaker portrait
        const portraitSize = 64;
        const portraitX = boxX + 15;
        const portraitY = boxY + (boxHeight - portraitSize) / 2;

        if (line.speaker) {
            // Get speaker info
            let speakerName = line.speaker;
            let speakerColor = Colors.PRIMARY;

            // Check if it's a character
            for (const charId in Characters) {
                if (Characters[charId].name === line.speaker) {
                    speakerColor = Characters[charId].color;
                    break;
                }
            }

            // Check if it's a boss
            for (const bossId in Bosses) {
                if (Bosses[bossId].name === line.speaker) {
                    speakerColor = Bosses[bossId].color;
                    break;
                }
            }

            // Check NPC colors
            const npcColors = {
                'Chief Martinez': '#cc8844',
                'Technician Park': '#44aa88',
                'Dr. Santos': '#8844aa'
            };
            if (npcColors[line.speaker]) {
                speakerColor = npcColors[line.speaker];
            }

            Renderer.drawPortrait(portraitX, portraitY, portraitSize, speakerColor, line.speaker);

            // Draw speaker name
            Renderer.ctx.fillStyle = speakerColor;
            Renderer.ctx.font = 'bold 14px "Courier New", monospace';
            Renderer.ctx.textAlign = 'left';
            Renderer.ctx.fillText(line.speaker, portraitX + portraitSize + 15, boxY + 15);
        }

        // Draw text
        const textX = portraitX + portraitSize + 15;
        const textY = boxY + 35;
        const maxWidth = boxWidth - portraitSize - 50;

        // Word wrap the displayed text
        const words = this.displayedText.split(' ');
        let currentLine = '';
        let lineY = textY;
        const lineHeight = 22;
        const maxCharsPerLine = Math.floor(maxWidth / 9);

        Renderer.ctx.fillStyle = Colors.TEXT;
        Renderer.ctx.font = '14px "Courier New", monospace';
        Renderer.ctx.textAlign = 'left';

        for (const word of words) {
            if ((currentLine + word).length > maxCharsPerLine) {
                Renderer.ctx.fillText(currentLine, textX, lineY);
                currentLine = word + ' ';
                lineY += lineHeight;
            } else {
                currentLine += word + ' ';
            }
        }
        Renderer.ctx.fillText(currentLine, textX, lineY);

        // Draw continue indicator
        if (this.waitingForInput) {
            const indicatorX = boxX + boxWidth - 30;
            const indicatorY = boxY + boxHeight - 25;
            const bounce = Math.sin(time * 5) * 3;

            Renderer.ctx.fillStyle = Colors.PRIMARY;
            Renderer.ctx.beginPath();
            Renderer.ctx.moveTo(indicatorX, indicatorY + bounce);
            Renderer.ctx.lineTo(indicatorX + 10, indicatorY + 10 + bounce);
            Renderer.ctx.lineTo(indicatorX - 10, indicatorY + 10 + bounce);
            Renderer.ctx.closePath();
            Renderer.ctx.fill();
        }

        // Draw line counter
        Renderer.ctx.fillStyle = Colors.TEXT_DIM;
        Renderer.ctx.font = '12px "Courier New", monospace';
        Renderer.ctx.textAlign = 'right';
        Renderer.ctx.fillText(
            `${this.currentLine + 1}/${this.currentDialogue.lines.length}`,
            boxX + boxWidth - 15,
            boxY + 15
        );
    }
};

// NPC Dialogues for Tutorial City (Placeholder content)
const TutorialDialogues = {
    [NPCID.CHIEF_MARTINEZ]: {
        id: NPCID.CHIEF_MARTINEZ,
        name: 'Chief Martinez',
        role: 'Plant Manager',
        lines: [
            { speaker: 'Chief Martinez', text: "Welcome to Power Plant Alpha, CyberGuard team. I'm Chief Martinez, the plant manager here." },
            { speaker: 'Chief Martinez', text: "Before you face any threats, you need to understand what we're protecting." },
            { speaker: 'Chief Martinez', text: "ICS stands for Industrial Control Systems - they're the backbone of critical infrastructure." },
            { speaker: 'Chief Martinez', text: "Unlike IT systems that prioritize confidentiality, OT systems prioritize AVAILABILITY. If this plant goes down, people lose power." },
            { speaker: 'Chief Martinez', text: "SCADA, DCS, PLCs - these aren't just acronyms. They're the systems keeping civilization running." },
            { speaker: 'CIPHER', text: "The logs don't lie. We need to understand these systems to protect them." },
            { speaker: 'Chief Martinez', text: "Exactly. Talk to my team - Park and Santos. They'll teach you the technical details." },
            { speaker: 'Chief Martinez', text: "Once you've learned from everyone, you'll be ready to face whatever's lurking in our systems." }
        ]
    },

    [NPCID.TECHNICIAN_PARK]: {
        id: NPCID.TECHNICIAN_PARK,
        name: 'Technician Park',
        role: 'Control Room Operator',
        lines: [
            { speaker: 'Technician Park', text: "Hey there! I'm Park, the control room operator. Let me show you the basics!" },
            { speaker: 'Technician Park', text: "See this panel? That's an HMI - Human Machine Interface. It's how we monitor and control the plant." },
            { speaker: 'Technician Park', text: "But the real magic happens with PLCs - Programmable Logic Controllers." },
            { speaker: 'Technician Park', text: "PLCs are like the brains of the operation. They read sensor data and control physical processes." },
            { speaker: 'BLAZE', text: "Containment first, questions later! What happens if a PLC gets compromised?" },
            { speaker: 'Technician Park', text: "Good question! A compromised PLC could open valves, stop pumps, or even cause physical damage." },
            { speaker: 'Technician Park', text: "That's why ICS security is so critical. We're not just protecting data - we're protecting physical processes." },
            { speaker: 'Technician Park', text: "Remember: PLCs control the physical world. Protect them at all costs!" }
        ]
    },

    [NPCID.DR_SANTOS]: {
        id: NPCID.DR_SANTOS,
        name: 'Dr. Santos',
        role: 'Process Engineer',
        lines: [
            { speaker: 'Dr. Santos', text: "Ah, the CyberGuard team. I'm Dr. Santos, process engineer. Let me explain what's at stake." },
            { speaker: 'Dr. Santos', text: "Power plants, water treatment, oil refineries - they all use ICS/SCADA systems." },
            { speaker: 'Dr. Santos', text: "An attack on these systems isn't just a data breach. It can have PHYSICAL consequences." },
            { speaker: 'GHOST', text: "I've been on the other side. Trust me, attackers know how valuable these targets are." },
            { speaker: 'Dr. Santos', text: "Indeed. Remember Ukraine 2015? Attackers took down the power grid. 230,000 people lost electricity." },
            { speaker: 'Dr. Santos', text: "Or Oldsmar 2021 - someone tried to poison a water supply by changing chemical levels remotely." },
            { speaker: 'VOLT', text: "That's not how it works in the real world. We need defense in depth." },
            { speaker: 'Dr. Santos', text: "Exactly! Safety systems, network segmentation, monitoring - layers of protection." },
            { speaker: 'Dr. Santos', text: "You've learned well. The boss arena should be unlocked now. Good luck, CyberGuard." }
        ]
    }
};

// Boss taunts for wrong answers
const BossTaunts = {
    [BossID.GLITCH]: [
        "WRONG! Haha, you call yourself CyberGuard? Even I knew that one!",
        "Nope! Basic ICS knowledge fail. Let me educate you while I hack your systems...",
        "Incorrect! Did you even pay attention to the NPCs? This is FUNDAMENTAL stuff!",
        "Ha! Wrong answer. Maybe stick to IT systems if ICS is too hard for you.",
        "Bzzt! Wrong! Here's a free lesson while your HP drops..."
    ],
    [BossID.ARCHITECT]: [
        "Pathetic! You don't understand network architecture at all!",
        "Wrong! Let me show you how a REAL infiltrator moves through networks...",
        "Incorrect! The Purdue Model isn't that complicated. Or is it too much for you?"
    ],
    [BossID.WIRETAP]: [
        "WRONG! You can't stop what you don't understand!",
        "Hah! Protocol analysis failure. Let me tap into your systems while you think...",
        "Incorrect! Modbus, DNP3, OPC - they're all open books to me!"
    ]
};

// Boss victory dialogues
const BossVictoryDialogues = {
    [BossID.GLITCH]: {
        lines: [
            { speaker: 'GLITCH', text: "No... impossible! How did you know all that?!" },
            { speaker: 'CIPHER', text: "The logs don't lie. You never stood a chance against real knowledge." },
            { speaker: 'GLITCH', text: "This isn't over! The Null Syndicate has bigger plans... you'll see!" },
            { speaker: 'VOLT', text: "Power Plant Alpha is secure. One city down, more to go." },
            { speaker: 'BLAZE', text: "Good work team! But this was just a script kiddie. The real threats are still out there." }
        ]
    }
};
