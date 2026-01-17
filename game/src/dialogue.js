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
                // Tutorial City NPCs
                'Chief Martinez': '#cc8844',
                'Technician Park': '#44aa88',
                'Dr. Santos': '#8844aa',
                // Purdue City NPCs
                'Network Admin Chen': '#4488cc',
                'Security Lead Okonkwo': '#cc4488',
                'Operator Williams': '#88cc44',
                // Protocol Port NPCs
                'Protocol Specialist Kim': '#44ccaa',
                'Field Tech Rodriguez': '#aa8844',
                'Analyst Morgan': '#8844cc'
            };
            if (npcColors[line.speaker]) {
                speakerColor = npcColors[line.speaker];
            }

            // Check Boss colors
            const bossColors = {
                'ARCHITECT': '#00ffff',
                'WIRETAP': '#ffff00'
            };
            if (bossColors[line.speaker]) {
                speakerColor = bossColors[line.speaker];
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

// NPC Dialogues for Tutorial City
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

// NPC Dialogues for Purdue City (Water Treatment Facility)
const PurdueDialogues = {
    [NPCID.NETWORK_ADMIN_CHEN]: {
        id: NPCID.NETWORK_ADMIN_CHEN,
        name: 'Network Admin Chen',
        role: 'IT/OT Network Engineer',
        lines: [
            { speaker: 'Network Admin Chen', text: "*surrounded by multiple monitors showing network diagrams* CyberGuard? Finally. I'm Chen, I manage both IT and OT networks here." },
            { speaker: 'Network Admin Chen', text: "That's rare, by the way. Most places have separate teams who don't talk to each other. Recipe for disaster." },
            { speaker: 'Network Admin Chen', text: "The Purdue Model! My favorite topic. Think of it as floors in a building." },
            { speaker: 'Network Admin Chen', text: "Level 0 - the basement. That's your physical process. Actual water, actual pipes, actual chemicals." },
            { speaker: 'Network Admin Chen', text: "Level 1 - ground floor. PLCs and RTUs. The controllers that directly touch Level 0." },
            { speaker: 'Network Admin Chen', text: "Level 2 - first floor. HMIs, local control rooms. Where operators watch their screens." },
            { speaker: 'VOLT', text: "That's where I spend most of my time. Level 2. Watching the process, making adjustments." },
            { speaker: 'Network Admin Chen', text: "Level 3 - site operations. SCADA servers, historians, engineering workstations. The brains of the operation." },
            { speaker: 'Network Admin Chen', text: "Level 3.5 - the DMZ. The security checkpoint between OT and IT." },
            { speaker: 'Network Admin Chen', text: "Levels 4 and 5 - IT land. Enterprise networks, business systems, and the scary internet." },
            { speaker: 'GHOST', text: "And attackers start at Level 5 and work their way down. Each level they cross gets them closer to causing physical damage." },
            { speaker: 'Network Admin Chen', text: "Exactly why we need proper segmentation between EVERY level. Not just at the perimeter." },
            { speaker: 'Network Admin Chen', text: "The Architect's been probing our network for weeks. Talk to Okonkwo in Security and Williams at SCADA." }
        ]
    },

    [NPCID.SECURITY_LEAD_OKONKWO]: {
        id: NPCID.SECURITY_LEAD_OKONKWO,
        name: 'Security Lead Okonkwo',
        role: 'ICS Security Architect',
        lines: [
            { speaker: 'Security Lead Okonkwo', text: "*studying threat feeds intently* CyberGuard. I'm Okonkwo. I've been tracking The Architect for three weeks." },
            { speaker: 'Security Lead Okonkwo', text: "They're good. Patient. Methodical. This isn't smash-and-grab. This is a targeted intrusion." },
            { speaker: 'Security Lead Okonkwo', text: "ICS attacks follow a pattern. Always. Understanding the pattern lets you predict their next move." },
            { speaker: 'Security Lead Okonkwo', text: "Stage 1: Reconnaissance. They research the target. Public info, job postings, vendor relationships." },
            { speaker: 'Security Lead Okonkwo', text: "Stage 2: Initial Access. Usually IT network. Phishing, compromised credentials, vulnerable external services." },
            { speaker: 'GHOST', text: "Phishing is still king. Send enough emails, someone always clicks." },
            { speaker: 'Security Lead Okonkwo', text: "Stage 3: Lateral Movement. They pivot through the network. IT to DMZ. DMZ to OT. Stealing credentials, exploiting trust relationships." },
            { speaker: 'Security Lead Okonkwo', text: "Stage 4: Persistence. They establish backdoors, scheduled tasks, hidden accounts. Ways to get back in if discovered." },
            { speaker: 'Security Lead Okonkwo', text: "Stage 5: Action on Objectives. Finally, they do what they came to do. Disrupt, destroy, ransom, steal." },
            { speaker: 'CIPHER', text: "And The Architect? What stage are they at?" },
            { speaker: 'Security Lead Okonkwo', text: "Late Stage 3. They're in OT. We've seen them querying the historian. They're learning the process before they act." },
            { speaker: 'Security Lead Okonkwo', text: "The Architect got in through a vendor VPN connection. The vendor was compromised first. Supply chain attack." },
            { speaker: 'Security Lead Okonkwo', text: "Make sure you've talked to Williams at SCADA. He's seen their queries firsthand." }
        ]
    },

    [NPCID.OPERATOR_WILLIAMS]: {
        id: NPCID.OPERATOR_WILLIAMS,
        name: 'Operator Williams',
        role: 'SCADA Operator',
        lines: [
            { speaker: 'Operator Williams', text: "*monitoring multiple SCADA screens* CyberGuard team? Good timing. Something's been querying my systems." },
            { speaker: 'Operator Williams', text: "I'm Williams, 12 years running SCADA here. I know what normal looks like. This ain't normal." },
            { speaker: 'Operator Williams', text: "Level 3 is Site Operations. The crown jewels of any ICS environment." },
            { speaker: 'Operator Williams', text: "SCADA servers - these coordinate everything. Collect data from all the PLCs, send commands, handle alarms." },
            { speaker: 'Operator Williams', text: "Historians - store months or years of process data. Trends, events, everything. Perfect for reconnaissance." },
            { speaker: 'BLAZE', text: "So an attacker with historian access can learn exactly how your process works?" },
            { speaker: 'Operator Williams', text: "Bingo. Normal operating ranges, timing of batch processes, which valves control what. It's all there." },
            { speaker: 'Operator Williams', text: "Engineering workstations are here too. The machines that can REPROGRAM the PLCs. Most powerful access in the plant." },
            { speaker: 'GHOST', text: "Control the engineering workstation, control the entire process. That's what The Architect wants." },
            { speaker: 'Operator Williams', text: "IEC 62443 talks about zones and conduits. Zones are groups of assets. Conduits are communication pathways between them." },
            { speaker: 'CIPHER', text: "So you define your zones, then lock down all the conduits between them?" },
            { speaker: 'Operator Williams', text: "Exactly. Each conduit gets security controls. Firewalls, authentication, monitoring." },
            { speaker: 'Operator Williams', text: "The Architect is in our Level 3 subnet. The boss arena should be unlocked now. Good luck, CyberGuard." }
        ]
    }
};

// NPC Dialogues for Protocol Port (Oil Refinery)
const ProtocolDialogues = {
    [NPCID.PROTOCOL_SPECIALIST_KIM]: {
        id: NPCID.PROTOCOL_SPECIALIST_KIM,
        name: 'Protocol Specialist Kim',
        role: 'Communications Engineer',
        lines: [
            { speaker: 'Protocol Specialist Kim', text: "*headset on, analyzing packet captures* CyberGuard? Perfect timing. I've been watching the strangest traffic patterns." },
            { speaker: 'Protocol Specialist Kim', text: "I'm Kim, communications engineer. If it moves bits in this refinery, I know about it." },
            { speaker: 'Protocol Specialist Kim', text: "Modbus! The granddaddy of ICS protocols. Developed by Modicon in 1979. Yes, 1979." },
            { speaker: 'Protocol Specialist Kim', text: "Simple, efficient, universal. Every PLC vendor supports it. That's why it's everywhere." },
            { speaker: 'Protocol Specialist Kim', text: "Modbus RTU runs over serial - RS-485 usually. Modbus TCP runs over Ethernet on port 502." },
            { speaker: 'GHOST', text: "Port 502. First thing I scan for when looking for ICS. Wide open on so many networks." },
            { speaker: 'Protocol Specialist Kim', text: "The problem? Modbus has ZERO security features. No authentication. No encryption. Nothing." },
            { speaker: 'Protocol Specialist Kim', text: "Anyone on the network can read coils, write registers, stop/start PLCs. Just need to send the right bytes." },
            { speaker: 'BLAZE', text: "And this controls REFINERIES? With no passwords?!" },
            { speaker: 'Protocol Specialist Kim', text: "In 1979, if you were in the control room, you were authorized. The network WAS the security. Now... not so much." },
            { speaker: 'Protocol Specialist Kim', text: "DNP3 is similar - Distributed Network Protocol. The utility industry's favorite. Standard port is 20000." },
            { speaker: 'Protocol Specialist Kim', text: "Talk to Rodriguez in the field and Morgan in the SOC. They can tell you more about Wiretap." }
        ]
    },

    [NPCID.FIELD_TECH_RODRIGUEZ]: {
        id: NPCID.FIELD_TECH_RODRIGUEZ,
        name: 'Field Tech Rodriguez',
        role: 'Instrument Technician',
        lines: [
            { speaker: 'Field Tech Rodriguez', text: "*wiping grease off hands* CyberGuard? Out here in the field? Must be serious." },
            { speaker: 'Field Tech Rodriguez', text: "I'm Rodriguez. I maintain the instruments and field devices. The stuff that actually touches the process." },
            { speaker: 'Field Tech Rodriguez', text: "Something's been messing with my equipment. Remote valves opening when they shouldn't. Setpoints changing." },
            { speaker: 'Field Tech Rodriguez', text: "Fieldbus protocols run at Levels 0 and 1. HART, Foundation Fieldbus, Profibus - connecting controllers to field devices." },
            { speaker: 'Field Tech Rodriguez', text: "Big shift happened over the last 20 years. Serial to Ethernet. Changed everything." },
            { speaker: 'GHOST', text: "Serial meant I had to be ON SITE. Physically connected to that cable. Hard to attack remotely." },
            { speaker: 'Field Tech Rodriguez', text: "Then Ethernet came to the plant floor. Same protocols - Modbus TCP, EtherNet/IP, Profinet - but over standard networking." },
            { speaker: 'Field Tech Rodriguez', text: "Benefits were huge. Standard cabling. Easy integration. Remote diagnostics. But now an attacker doesn't need physical access." },
            { speaker: 'BLAZE', text: "So we traded physical security for... convenience?" },
            { speaker: 'Field Tech Rodriguez', text: "Pretty much. And wireless makes it worse. WirelessHART, ISA100, regular WiFi with tablets." },
            { speaker: 'CIPHER', text: "Wireless means the attacker doesn't need to plug into anything. Just be in radio range." },
            { speaker: 'Field Tech Rodriguez', text: "Morgan in the SOC has packet captures. She can show you exactly what Wiretap's been doing." }
        ]
    },

    [NPCID.ANALYST_MORGAN]: {
        id: NPCID.ANALYST_MORGAN,
        name: 'Analyst Morgan',
        role: 'Network Security Analyst',
        lines: [
            { speaker: 'Analyst Morgan', text: "*surrounded by monitors, dark circles under eyes* CyberGuard. I've been tracking Wiretap for 72 hours straight." },
            { speaker: 'Analyst Morgan', text: "Morgan. Network security. I analyze traffic, hunt threats, and drink too much coffee." },
            { speaker: 'Analyst Morgan', text: "Wiretap is running the classics. Man-in-the-middle. Replay attacks. Protocol spoofing." },
            { speaker: 'Analyst Morgan', text: "Man-in-the-middle - they've positioned themselves between a PLC and the HMI. Reading all traffic, modifying what they want." },
            { speaker: 'GHOST', text: "Classic MITM. No encryption means they can read and modify anything in transit." },
            { speaker: 'Analyst Morgan', text: "Replay attacks too. They captured legitimate 'open valve' commands and replay them at will." },
            { speaker: 'Analyst Morgan', text: "The PLC doesn't know the command is a recording. No timestamps, no sequence numbers in Modbus." },
            { speaker: 'Analyst Morgan', text: "Wireshark is my best friend. Packet capture and protocol analysis. Has dissectors for Modbus, DNP3, most ICS protocols." },
            { speaker: 'CIPHER', text: "So you need to know what NORMAL traffic looks like to spot ABNORMAL?" },
            { speaker: 'Analyst Morgan', text: "Exactly. Baseline first. Know your normal. Then deviations jump out." },
            { speaker: 'Analyst Morgan', text: "Network segmentation, protocol-aware firewalls, encrypted tunnels, and monitoring. That's how we defend." },
            { speaker: 'Analyst Morgan', text: "Wiretap is on a compromised network switch in the process area. The boss arena is now unlocked. Good luck!" }
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
        "WRONG! You think you understand networks? I've mapped every connection in this facility!",
        "Pathetic! You don't understand network architecture at all!",
        "Incorrect! The Purdue Model isn't that complicated. Or is it too much for you?",
        "Ha! Wrong! I moved from Level 5 to Level 1 while you were guessing!",
        "No! Every wrong answer gives me more time to establish persistence...",
        "Wrong! Let me show you how a REAL infiltrator moves through networks...",
        "Incorrect! Zones and conduits? You clearly didn't pay attention to Williams!"
    ],
    [BossID.WIRETAP]: [
        "WRONG! You can't stop what you don't understand!",
        "*static crackle* Incorrect! I'm reading your traffic right now... all of it!",
        "Hah! Protocol analysis failure. Let me tap into your systems while you think...",
        "Wrong! Function code 6, write single register... and your HP is the register!",
        "Incorrect! Modbus, DNP3, OPC - they're all open books to me!",
        "No! These protocols were designed with no security. Just like your answers!",
        "Wrong! While you guess, I'm replaying commands to your PLCs...",
        "Incorrect! Man-in-the-middle complete. I see EVERYTHING between you and that answer."
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
    },
    [BossID.ARCHITECT]: {
        lines: [
            { speaker: 'ARCHITECT', text: "Impossible! I mapped every connection, every vulnerability, every..." },
            { speaker: 'VOLT', text: "You understood the network. But you didn't understand the PEOPLE who defend it." },
            { speaker: 'ARCHITECT', text: "*connection fragmenting* This changes nothing! Wiretap is already at Protocol Port. Already listening to your precious protocols..." },
            { speaker: 'ARCHITECT', text: "Modbus, DNP3 - no encryption, no authentication. Wiretap will read every command, forge every response..." },
            { speaker: 'BLAZE', text: "Protocol Port. The oil refinery. That's our next target." },
            { speaker: 'CIPHER', text: "Protocol-level attacks. This is getting more sophisticated. We need to understand how ICS protocols work - and why they're vulnerable." },
            { speaker: 'GHOST', text: "Purdue City is secure. Water treatment is safe. Let's move to Protocol Port." }
        ]
    },
    [BossID.WIRETAP]: {
        lines: [
            { speaker: 'WIRETAP', text: "No! The protocols were PERFECT attack vectors! No authentication! No encryption! How did you--" },
            { speaker: 'GHOST', text: "The protocols are weak. But the DEFENDERS aren't. Knowing the vulnerabilities means knowing how to watch for exploitation." },
            { speaker: 'WIRETAP', text: "*connection degrading* This isn't over... The Null Syndicate has greater plans... Null Prime is coming..." },
            { speaker: 'WIRETAP', text: "They don't just understand networks and protocols... they understand EVERYTHING... nation-state level..." },
            { speaker: 'VOLT', text: "Null Prime? That sounds like their leader. An APT-level threat." },
            { speaker: 'CIPHER', text: "We've stopped a script kiddie, a network infiltrator, and a protocol exploiter. If Null Prime is coming... we need to be ready for something much worse." },
            { speaker: 'BLAZE', text: "Then we train. We prepare. We learn everything we can about ICS security." },
            { speaker: 'CIPHER', text: "Protocol Port secured. Three cities down. The Null Syndicate is weakening." }
        ]
    }
};

// Boss intro dialogues
const BossIntroDialogues = {
    [BossID.GLITCH]: {
        lines: [
            { speaker: 'GLITCH', text: "Well, well, well... the famous CyberGuard team." },
            { speaker: 'GLITCH', text: "I'm GLITCH! The Null Syndicate's newest recruit. Sure, I'm just getting started..." },
            { speaker: 'GLITCH', text: "But I've learned enough to mess with your precious power plant!" },
            { speaker: 'CIPHER', text: "A script kiddie? You're using other people's tools without understanding them." },
            { speaker: 'GLITCH', text: "Hey! I know plenty! Let's see if YOU know your ICS basics. Answer wrong and suffer!" }
        ]
    },
    [BossID.ARCHITECT]: {
        lines: [
            { speaker: 'ARCHITECT', text: "*appears on multiple screens simultaneously* CyberGuard. I was wondering when you'd trace my path." },
            { speaker: 'ARCHITECT', text: "I am THE ARCHITECT. I don't break into networks. I UNDERSTAND them. Every zone. Every conduit. Every trust relationship." },
            { speaker: 'GHOST', text: "You came through the vendor VPN. Supply chain compromise. Took your time." },
            { speaker: 'ARCHITECT', text: "Patience is a virtue. I've spent three weeks learning this environment. Every PLC, every setpoint, every operator habit." },
            { speaker: 'ARCHITECT', text: "Your flat network segments were helpful. Your poorly configured DMZ, even more so." },
            { speaker: 'CIPHER', text: "Then let's see if you understand it as well as you think." }
        ]
    },
    [BossID.WIRETAP]: {
        lines: [
            { speaker: 'WIRETAP', text: "*voice crackling through speakers* Sssssh. Did you hear that? That was your pump station sending me its secrets." },
            { speaker: 'WIRETAP', text: "I am WIRETAP. I don't need to break encryption - there isn't any. I just... listen. And speak." },
            { speaker: 'BLAZE', text: "You've been manipulating equipment. Playing with an oil refinery like it's a toy!" },
            { speaker: 'WIRETAP', text: "Playing? I've been LEARNING. Every Modbus register. Every DNP3 point. I know your process better than your operators." },
            { speaker: 'WIRETAP', text: "Function code 5 - write single coil. Function code 6 - write single register. Function code 16 - write multiple registers. Shall I demonstrate?" },
            { speaker: 'CIPHER', text: "You know protocols. Let's see if you know how to defend against someone who understands them too." }
        ]
    }
};

// City intro dialogues (shown when entering a city for the first time)
const CityIntroDialogues = {
    [CityID.PURDUE]: {
        lines: [
            { speaker: 'CIPHER', text: "The Purdue Model. Six levels separating your enterprise network from your physical processes. When it works." },
            { speaker: 'BLAZE', text: "And when it doesn't work?" },
            { speaker: 'GHOST', text: "Then someone like The Architect walks right through. Level by level. IT to OT. I've seen the reconnaissance patterns - they're already inside." },
            { speaker: 'VOLT', text: "This facility treats water for 200,000 people. If they reach the process controls..." },
            { speaker: 'CIPHER', text: "Then we need to understand how they're moving. Talk to the staff - Chen handles the network, Okonkwo runs security, Williams operates the SCADA systems." }
        ]
    },
    [CityID.PROTOCOL]: {
        lines: [
            { speaker: 'VOLT', text: "Modbus. DNP3. Protocols designed in the '70s and '90s. No authentication. No encryption. Just... trust." },
            { speaker: 'GHOST', text: "I used to love these protocols. Get on the network, and you can read anything, write anything. No credentials needed." },
            { speaker: 'BLAZE', text: "Wait, these protocols are still in use? In 2087? Controlling an OIL REFINERY?" },
            { speaker: 'CIPHER', text: "Legacy systems. Can't replace them without rebuilding the entire facility. So we compensate with network controls." },
            { speaker: 'CIPHER', text: "But Wiretap specializes in protocol exploitation. They're not breaking INTO the network - they're speaking the protocols' own language." }
        ]
    }
};
