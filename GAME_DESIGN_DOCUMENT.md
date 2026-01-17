# ICS Defender Chronicles
## Game Design Document v1.0

---

## Executive Summary

**Title:** ICS Defender Chronicles  
**Genre:** Educational JRPG (Turn-Based Combat with Quiz Mechanics)  
**Platform:** SNES ROM (via JavaScript emulator on GitHub Pages)  
**Target Audience:** Cyber professionals learning ICS/SCADA security fundamentals  
**Learning Standard:** SANS ICS410 - ICS/SCADA Security Essentials  
**Estimated Play Time:** 4-6 hours (MVP: 3 cities)  
**LMS Integration:** cmi5 compliant for PCTE deployment  

---

## Story Synopsis

### Setting
The year is 2087. Critical infrastructure worldwide is controlled by the **Global Industrial Control Network (GICN)**—an interconnected system of power grids, water treatment facilities, and industrial plants. A shadowy hacker collective known as **The Null Syndicate** has launched coordinated attacks against GICN nodes, threatening to plunge civilization into chaos.

You command an elite team of **CyberGuard** operatives—the last line of defense between operational technology and total system collapse. Travel between besieged cities, learn the secrets of ICS/SCADA systems, and defeat The Null Syndicate's agents before they bring down critical infrastructure.

### Narrative Arc
1. **Tutorial (Power Plant Alpha)** - Team assembles, learns ICS basics
2. **Purdue City (Water Treatment)** - Uncover Syndicate's network infiltration tactics
3. **Protocol Port (Oil Refinery)** - Intercept communications, decode their protocols
4. **[Future: Supervisory Station]** - Windows/HMI systems compromised
5. **[Future: Governance Garrison]** - Policy and framework battle
6. **[Future: Final Fortress]** - Confront APT Overlord

---

## The CyberGuard Team (Playable Characters)

### 1. CIPHER (She/Her) - SOC Analyst / Blue Team Lead
**Role in Combat:** Tank/Support  
**Specialty:** Monitoring, detection, log analysis  
**Background:** Former CISA analyst who left government work after seeing critical infrastructure vulnerabilities ignored. Calm under pressure, analytical mind.  
**Visual Design:** Cyberpunk aesthetic—short silver hair, AR glasses that display scrolling log data, armored jacket with blue LED accents, holographic shields.  
**Combat Style:** High defense, can "detect" enemy weaknesses (reveals correct answers), buffs team.  
**Personality:** Methodical, dry humor, quotes log entries sarcastically.  
**Catchphrase:** "The logs don't lie."

### 2. BLAZE (He/Him) - Incident Responder
**Role in Combat:** DPS/Healer  
**Specialty:** Rapid response, containment, recovery  
**Background:** Former firefighter who transitioned to cyber after his city's water treatment plant was hacked. Fast-acting, sometimes impulsive.  
**Visual Design:** Red/orange color scheme, tactical vest with emergency patches, cybernetic arm with integrated tools, flame-styled hair (orange with red tips).  
**Combat Style:** High speed, can "contain" enemies (stun), heals team HP.  
**Personality:** Energetic, protective, uses firefighting metaphors.  
**Catchphrase:** "Containment first, questions later!"

### 3. GHOST (They/Them) - Penetration Tester / Red Team
**Role in Combat:** DPS/Debuffer  
**Specialty:** Offensive security, vulnerability assessment, thinking like the enemy  
**Background:** Reformed black-hat who was caught and offered a choice: prison or service. Knows how attackers think because they used to be one.  
**Visual Design:** Dark hooded cloak with circuit patterns, face partially obscured by glitching holographic mask, slender build, moves like a shadow.  
**Combat Style:** High critical hit chance, can "exploit" enemies (debuff defense), reveals attack patterns.  
**Personality:** Mysterious, speaks in hacker slang, morally complex but loyal.  
**Catchphrase:** "I've been on the other side. Trust me."

### 4. VOLT (She/Her) - ICS/OT Engineer
**Role in Combat:** Support/DPS  
**Specialty:** Industrial control systems, PLCs, field devices, physical processes  
**Background:** 20-year veteran of power plant operations who saw the IT/OT convergence coming and upskilled. The domain expert.  
**Visual Design:** Industrial aesthetic—hard hat with HUD display, reinforced coveralls with yellow safety accents, utility belt with PLC diagnostic tools, weathered hands.  
**Combat Style:** Balanced stats, "process knowledge" attacks deal bonus damage to ICS-themed enemies, can explain technical concepts.  
**Personality:** No-nonsense, practical, mentors the team on OT realities.  
**Catchphrase:** "That's not how it works in the real world."

---

## Enemy Faction: The Null Syndicate

### Hierarchy

**Foot Soldiers (Random Encounters)**
- **Script Kiddie** - Uses pre-made tools, low difficulty
- **Phisher** - Social engineering attacks
- **Malware Mule** - Delivers payloads
- **Recon Drone** - Network scanning

**Mini-Bosses (City NPCs)**
- **The Crawler** - Network reconnaissance specialist
- **Packet Rat** - Protocol manipulation expert
- **Spoofmaster** - Identity and credential theft

**City Bosses**
| City | Boss | Title | Specialty |
|------|------|-------|-----------|
| Tutorial | **Glitch** | The Script Kiddie | Basic attacks, learns alongside player |
| Purdue City | **Architect** | The Network Infiltrator | Purdue model exploitation, lateral movement |
| Protocol Port | **Wiretap** | The Protocol Exploiter | Modbus/DNP3 attacks, MITM |
| [Future] | **Hijacker** | The HMI Phantom | Windows/SCADA exploitation |
| [Future] | **Phantom** | The Policy Evader | Compliance manipulation |
| [Future] | **Null Prime** | APT Overlord | Nation-state level threat |

### Enemy Dialogue Philosophy
When player answers incorrectly, the boss **mocks them while teaching**:

> **Wiretap:** "WRONG! You thought Modbus had built-in authentication? Ha! That's exactly why I love this protocol—designed in 1979, zero security. The correct answer was 'Modbus has no native encryption or authentication.' Remember that when I'm reading all your register values!"

This reinforces learning through memorable negative feedback while maintaining the adversarial dynamic.

---

## World Map Design

```
                    ╔═══════════════════════════════════════════╗
                    ║           GLOBAL INDUSTRIAL               ║
                    ║           CONTROL NETWORK                 ║
                    ╚═══════════════════════════════════════════╝
                                        │
            ┌───────────────────────────┼───────────────────────────┐
            │                           │                           │
    ┌───────▼───────┐          ┌───────▼───────┐          ┌───────▼───────┐
    │   TUTORIAL    │          │  PURDUE CITY  │          │ PROTOCOL PORT │
    │  Power Plant  │───────── │    Water      │───────── │  Oil Refinery │
    │    Alpha      │          │   Treatment   │          │               │
    └───────────────┘          └───────────────┘          └───────────────┘
            │                           │                           │
            │    [LOCKED IN MVP]        │    [LOCKED IN MVP]        │
            │                           │                           │
    ┌───────▼───────┐          ┌───────▼───────┐          ┌───────▼───────┐
    │  SUPERVISORY  │          │  GOVERNANCE   │          │    FINAL      │
    │   STATION     │          │   GARRISON    │          │   FORTRESS    │
    │ Manufacturing │          │  Smart Grid   │          │   CI Hub      │
    └───────────────┘          └───────────────┘          └───────────────┘
```

**Navigation:** Player sprite moves freely on world map. Cities unlock sequentially after defeating previous boss. Locked cities show a "security barrier" visual.

---

## City Structure (Repeated per Location)

### Entry Sequence
1. **Cutscene Trigger** - Upon first entry, video placeholder activates
2. **Video Plays** - Educational content (5-10 min recommended)
3. **Team Commentary** - Characters react to what they learned
4. **City Opens** - Player can now explore freely

### City Layout (Each City)
```
┌─────────────────────────────────────────────────────────────────┐
│                         CITY MAP                                │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐      │
│  │  ENTRY  │    │  NPC 1  │    │  NPC 2  │    │  NPC 3  │      │
│  │  POINT  │    │  Zone   │    │  Zone   │    │  Zone   │      │
│  └────┬────┘    └────┬────┘    └────┬────┘    └────┬────┘      │
│       │              │              │              │            │
│       └──────────────┴──────┬───────┴──────────────┘            │
│                             │                                   │
│                      ┌──────▼──────┐                            │
│                      │   CENTRAL   │                            │
│                      │    PLAZA    │                            │
│                      └──────┬──────┘                            │
│                             │                                   │
│       ┌─────────────────────┼─────────────────────┐             │
│       │                     │                     │             │
│  ┌────▼────┐          ┌─────▼─────┐         ┌────▼────┐        │
│  │  INFO   │          │   BOSS    │         │  SAVE   │        │
│  │ KIOSK   │          │  ARENA    │         │  POINT  │        │
│  │(images) │          │ (locked)  │         │         │        │
│  └─────────┘          └───────────┘         └─────────┘        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### NPC Interaction Flow
1. Player approaches NPC → Dialogue initiates
2. NPC introduces themselves and their role
3. NPC teaches 2-3 key concepts through dialogue
4. NPC offers optional "quiz check" (1-2 practice questions)
5. Success → Hint about boss weakness
6. Failure → NPC re-explains concept, can retry

### Boss Arena Unlock
- Must talk to all 3 NPCs minimum
- Optional: Answer practice questions correctly for combat buffs
- Arena door opens when prerequisites met

---

## Combat System

### Turn Structure
```
┌─────────────────────────────────────────────────────────────────┐
│                      COMBAT SCREEN                              │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    ENEMY SPRITE                         │   │
│  │                    [BOSS NAME]                          │   │
│  │                    HP: ████████░░ 80/100                │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  ╔═══════════════════════════════════════════════════╗  │   │
│  │  ║  QUESTION:                                        ║  │   │
│  │  ║  What protocol operates at Purdue Level 0-1 and   ║  │   │
│  │  ║  communicates directly with field devices?        ║  │   │
│  │  ╠═══════════════════════════════════════════════════╣  │   │
│  │  ║  A) HTTP        B) Modbus                         ║  │   │
│  │  ║  C) SMTP        D) FTP                            ║  │   │
│  │  ╚═══════════════════════════════════════════════════╝  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  CIPHER      BLAZE       GHOST       VOLT              │   │
│  │  HP:90/100   HP:75/100   HP:60/100   HP:85/100         │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### Combat Flow
1. **Question Presented** - Random from city's question bank
2. **Timer** (Optional) - 30 seconds for added pressure
3. **Player Selects Answer** - D-pad + A button
4. **Resolution:**
   - **Correct:** Team attacks, damage based on active character + streak bonus
   - **Incorrect:** Enemy attacks, player loses HP, enemy delivers teaching dialogue
5. **Streak System:**
   - 3 correct in a row = 1.5x damage
   - 5 correct in a row = 2x damage + special attack animation
   - Incorrect answer resets streak
6. **Victory:** Defeat boss HP → Cutscene → City cleared → Next city unlocks
7. **Defeat:** Team HP reaches 0 → Restart at city save point (retains NPC progress)

### Question Types

**Multiple Choice (60%)**
```
What is the primary purpose of a DMZ in ICS architecture?
A) Increase network speed
B) Provide a buffer zone between IT and OT networks  ← Correct
C) Store backup data
D) Monitor employee activity
```

**Matching (20%)**
```
Match the Purdue Level to its function:
Level 0  →  [Physical Process]
Level 1  →  [Basic Control]
Level 2  →  [Area Supervisory]
Level 3  →  [Site Operations]
```

**Sequence (15%)**
```
Order the incident response steps correctly:
[ ] Containment
[ ] Identification  
[ ] Eradication
[ ] Preparation
[ ] Recovery
[ ] Lessons Learned

Correct: Preparation → Identification → Containment → Eradication → Recovery → Lessons Learned
```

**True/False (5%)**
```
PLCs can typically be reprogrammed remotely without authentication.
[TRUE] ← Correct (unfortunately)  [FALSE]
```

---

## Learning Objectives by City

### City 1: Tutorial - Power Plant Alpha (SANS Section 1)

**Theme:** ICS Overview - Understanding the Basics

**Video Placeholder:** Introductory video on ICS/SCADA fundamentals
- Recommended source: CISA ICS-CERT training videos or custom content

**Learning Objectives (GICSP Domain 1):**
1. Define ICS, SCADA, DCS, and PLC terminology
2. Identify differences between IT and OT environments
3. Recognize common ICS components (HMI, Historian, RTU, PLC)
4. Understand the cyber-physical relationship
5. Identify ICS industries (power, water, oil/gas, manufacturing)

**NPCs:**
| NPC | Role | Teaches |
|-----|------|---------|
| **Chief Martinez** | Plant Manager | ICS overview, IT vs OT differences, why ICS matters |
| **Technician Park** | Control Room Operator | PLCs, HMIs, basic control loops |
| **Dr. Santos** | Process Engineer | Physical processes, safety systems, consequences of attacks |

**Boss: Glitch (Script Kiddie)**
- HP: 100
- Difficulty: Easy (training boss)
- Questions: 15 from bank, basic recall
- Special mechanic: First 3 questions have hints enabled

**Sample Questions:**
1. What does SCADA stand for?
2. Which device directly controls physical processes like valves and motors?
3. True/False: ICS networks typically prioritize availability over confidentiality.
4. What is the main function of an HMI?
5. Which industry would NOT typically use ICS/SCADA systems?

---

### City 2: Purdue City - Water Treatment (SANS Section 2)

**Theme:** Architectures and Processes - Network Defense

**Video Placeholder:** Purdue Model and ICS network architecture
- Recommended source: SANS ICS curriculum diagrams, Dragos webinars

**Learning Objectives (GICSP Domain 2):**
1. Explain the Purdue Enterprise Reference Architecture (Levels 0-5)
2. Identify attack surfaces in ICS environments
3. Design secure network segmentation for ICS
4. Understand DMZ placement and function
5. Recognize common attack vectors (IT to OT pivot, direct OT access)

**NPCs:**
| NPC | Role | Teaches |
|-----|------|---------|
| **Network Admin Chen** | IT/OT Network Engineer | Purdue model, network segmentation, firewalls |
| **Security Lead Okonkwo** | ICS Security Architect | DMZ design, attack surface analysis |
| **Operator Williams** | SCADA Operator | Level 0-1 technologies, fieldbus basics |

**Boss: Architect (Network Infiltrator)**
- HP: 150
- Difficulty: Medium
- Questions: 20 from bank
- Special mechanic: "Lateral Movement" - boss heals if player gets 2 wrong in a row

**Sample Questions:**
1. At which Purdue level do PLCs and RTUs operate?
2. What is the primary purpose of a DMZ in ICS architecture?
3. Which attack technique involves moving from IT network to OT network?
4. Match: Purdue levels to their functions
5. What should NEVER directly connect Level 4 (Enterprise) to Level 1 (Control)?

---

### City 3: Protocol Port - Oil Refinery (SANS Section 3)

**Theme:** Communications and Protocols - Understanding ICS Traffic

**Video Placeholder:** ICS protocols deep dive (Modbus, DNP3, OPC)
- Recommended source: SANS ICS webinars, Wireshark ICS tutorials

**Learning Objectives (GICSP Domain 3):**
1. Identify common ICS protocols (Modbus, DNP3, OPC, EtherNet/IP)
2. Understand protocol vulnerabilities (lack of authentication/encryption)
3. Recognize network traffic patterns in ICS environments
4. Explain the role of serial vs. Ethernet communications
5. Understand wireless technologies in ICS and their risks

**NPCs:**
| NPC | Role | Teaches |
|-----|------|---------|
| **Protocol Specialist Kim** | Communications Engineer | Modbus, DNP3 basics, why they're insecure |
| **Field Tech Rodriguez** | Instrument Technician | Serial communications, fieldbus, wireless |
| **Analyst Morgan** | Network Security Analyst | Traffic analysis, anomaly detection |

**Boss: Wiretap (Protocol Exploiter)**
- HP: 200
- Difficulty: Hard
- Questions: 25 from bank
- Special mechanic: "Man-in-the-Middle" - can intercept and change a question once per fight

**Sample Questions:**
1. Which protocol has NO built-in authentication or encryption?
2. What port does Modbus TCP typically use?
3. What type of attack intercepts and potentially modifies communication between two parties?
4. Sequence: Order the OSI layers from physical to application
5. True/False: DNP3 Secure Authentication was part of the original DNP3 specification

---

## Autosave System

### Save Points
- **World Map:** Autosave on city entry/exit
- **City:** Manual save at Save Point NPC
- **Combat:** No mid-combat saves (intentional - must complete battle)

### Save Data Structure
```json
{
  "version": "1.0",
  "timestamp": "2024-01-15T10:30:00Z",
  "player": {
    "currentCity": "purdue_city",
    "completedCities": ["tutorial"],
    "worldMapPosition": { "x": 120, "y": 85 }
  },
  "party": {
    "cipher": { "hp": 100, "maxHp": 100 },
    "blaze": { "hp": 85, "maxHp": 100 },
    "ghost": { "hp": 90, "maxHp": 100 },
    "volt": { "hp": 95, "maxHp": 100 }
  },
  "progress": {
    "tutorial": {
      "npcsCompleted": ["martinez", "park", "santos"],
      "bossDefeated": true,
      "questionsAnswered": 15,
      "questionsCorrect": 12
    },
    "purdue_city": {
      "npcsCompleted": ["chen"],
      "bossDefeated": false,
      "questionsAnswered": 5,
      "questionsCorrect": 3
    }
  },
  "statistics": {
    "totalPlayTime": 3600,
    "totalQuestionsAnswered": 20,
    "totalCorrect": 15,
    "currentStreak": 2,
    "bestStreak": 5
  }
}
```

### Browser Storage
- Primary: IndexedDB (for larger save files)
- Fallback: localStorage (compressed JSON)
- Export: Download save as .json file option

---

## cmi5 Integration Design

### AU (Assignable Unit) Structure
```
Course: ICS Defender Chronicles
├── AU 1: Tutorial - Power Plant Alpha (Section 1)
├── AU 2: Purdue City - Water Treatment (Section 2)
├── AU 3: Protocol Port - Oil Refinery (Section 3)
├── [Future] AU 4: Supervisory Station (Section 4)
├── [Future] AU 5: Governance Garrison (Section 5)
└── [Future] AU 6: Final Fortress (Section 6 - Capstone)
```

### xAPI Statements

**Session Statements:**
- `initialized` - Game/AU launched
- `completed` - City/AU finished
- `passed` / `failed` - Based on mastery threshold
- `terminated` - Session ended

**Progress Statements:**
```json
{
  "verb": { "id": "http://adlnet.gov/expapi/verbs/answered" },
  "object": {
    "id": "https://ics-defender.example/questions/purdue-level-1",
    "definition": {
      "name": { "en-US": "Purdue Level 1 Function" },
      "type": "http://adlnet.gov/expapi/activities/cmi.interaction",
      "interactionType": "choice"
    }
  },
  "result": {
    "success": true,
    "duration": "PT25S",
    "response": "B",
    "extensions": {
      "https://ics-defender.example/xapi/streak": 3,
      "https://ics-defender.example/xapi/city": "purdue_city"
    }
  }
}
```

### Tracking Metrics

| Metric | xAPI Extension | Description |
|--------|----------------|-------------|
| City Completion | `completed` verb | AU marked complete |
| Question Performance | `answered` verb with `success` | Per-question tracking |
| Time on Task | `duration` in result | Per-question and per-AU |
| Mastery Score | `scaled` score (0-1) | % correct in city |
| Streak Performance | Custom extension | Consecutive correct answers |

### Mastery Thresholds
- **Passed:** ≥70% correct in city
- **Mastered:** ≥90% correct in city
- **Failed:** <70% correct AND boss defeated (can still progress but marked incomplete)

---

## Technical Architecture

### ROM Specifications
- **Target:** SNES/Super Famicom (NTSC)
- **Mapper:** LoROM (for simplicity)
- **ROM Size:** 4MB (32Mbit) - sufficient for 3 cities + expansion room
- **SRAM:** 64KB (for save data)

### Toolchain
```
PVSnesLib (C compiler for SNES)
├── tcc (C compiler backend)
├── wla-dx (65816 assembler)
├── gfx4snes (graphics converter)
└── smconv (audio converter)
```

### Folder Structure
```
ics-defender-chronicles/
├── docs/
│   ├── GAME_DESIGN_DOCUMENT.md
│   ├── MEDIA_REQUIREMENTS.md
│   └── QUESTION_BANKS/
│       ├── tutorial_questions.json
│       ├── purdue_city_questions.json
│       └── protocol_port_questions.json
├── rom/
│   ├── src/
│   │   ├── main.c
│   │   ├── combat.c
│   │   ├── dialogue.c
│   │   ├── map.c
│   │   ├── questions.c
│   │   └── save.c
│   ├── assets/
│   │   ├── sprites/
│   │   ├── tilesets/
│   │   ├── maps/
│   │   └── music/
│   ├── data/
│   │   ├── questions/
│   │   └── dialogue/
│   └── Makefile
├── emulator/
│   ├── index.html
│   ├── js/
│   │   ├── emulator.js
│   │   ├── cmi5.js
│   │   └── save-manager.js
│   └── css/
│       └── style.css
├── lms/
│   ├── cmi5.xml
│   └── course-structure.json
├── media/
│   ├── videos/
│   │   └── [placeholder folders]
│   └── images/
│       └── [placeholder folders]
└── README.md
```

---

## Asset Requirements Summary

### Sprites Needed
| Asset | Count | Source Strategy |
|-------|-------|-----------------|
| Hero sprites (4 chars × 8 directions × 3 frames) | 96 | OpenGameArt + custom |
| Enemy sprites (10 enemies × idle + attack) | 20 | OpenGameArt + custom |
| NPC sprites (9 NPCs × 4 directions) | 36 | OpenGameArt + custom |
| Character portraits (4 heroes + 9 NPCs + 6 bosses) | 19 | Custom pixel art |

### Tilesets Needed
| Tileset | Size | Source |
|---------|------|--------|
| World map (cyberpunk industrial) | 256 tiles | OpenGameArt |
| City interior (each city themed) | 256 tiles × 3 | OpenGameArt |
| Battle backgrounds (3 unique) | 3 screens | OpenGameArt + custom |

### Audio Needed
| Track | Duration | Style |
|-------|----------|-------|
| Title theme | 1:30 loop | Synthwave/cyberpunk |
| World map | 2:00 loop | Ambient industrial |
| City theme (×3) | 1:30 loop each | Varies by city |
| Battle theme | 1:30 loop | Intense electronic |
| Boss theme | 2:00 loop | Dark synthwave |
| Victory jingle | 0:10 | Triumphant |
| Defeat jingle | 0:10 | Somber |

---

## Development Phases

### Phase 1: Foundation (Current)
- [x] Game Design Document
- [ ] Question bank creation (all 3 cities)
- [ ] Media requirements finalization
- [ ] Asset sourcing/creation

### Phase 2: ROM Development
- [ ] PVSnesLib environment setup
- [ ] Core engine (movement, dialogue, menus)
- [ ] Combat system
- [ ] Question loading and randomization
- [ ] Save/load system
- [ ] Tutorial city complete

### Phase 3: Content Expansion
- [ ] Purdue City complete
- [ ] Protocol Port complete
- [ ] All NPCs and dialogue
- [ ] Boss battles tuned

### Phase 4: Integration
- [ ] JavaScript emulator wrapper
- [ ] cmi5 integration
- [ ] GitHub Pages deployment
- [ ] PCTE testing

### Phase 5: Polish
- [ ] Playtesting and balance
- [ ] Bug fixes
- [ ] Documentation
- [ ] Release

---

## Design Decisions (Finalized)

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Video Format** | MP4 | Web standard, broad compatibility |
| **Combat Timer** | 30 seconds for bosses only | Adds pressure to boss fights, underlings untimed for learning |
| **Difficulty** | Progressive, single setting | Difficulty scales naturally through cities |
| **Hint System** | Cipher's "Detect" - 1 use per battle | Strategic resource, not a crutch |
| **Audio Source** | MakeBestMusic.com (AI-generated) | Commercial license, synthwave/cyberpunk style |
| **Audio Method** | Web wrapper playback (not ROM-embedded) | Higher quality, easier updates |

---

## Audio Design

### Audio Architecture
Audio is handled by the JavaScript web wrapper, NOT embedded in the SNES ROM. This allows:
- High-quality MP3/MP4 playback
- Easy track swapping without ROM rebuilds
- Video cutscenes with embedded audio
- Dynamic music transitions

### Music Requirements (Generate via MakeBestMusic.com)

| Track | Style Prompt | Duration | Loop |
|-------|--------------|----------|------|
| **Title Theme** | "Epic synthwave cyberpunk hero theme, dramatic, 16-bit inspired" | 1:30 | Yes |
| **World Map** | "Ambient industrial cyberpunk, atmospheric, mysterious" | 2:00 | Yes |
| **Tutorial City** | "Hopeful electronic, power plant industrial, learning" | 1:30 | Yes |
| **Purdue City** | "Mysterious tech noir, water sounds, digital" | 1:30 | Yes |
| **Protocol Port** | "Dark industrial refinery, oil and steel, ominous" | 1:30 | Yes |
| **Battle Theme** | "Intense 16-bit battle music, electronic, fast-paced" | 1:30 | Yes |
| **Boss Battle** | "Dark synthwave boss fight, menacing, dramatic" | 2:00 | Yes |
| **Victory Jingle** | "Triumphant 16-bit victory fanfare, short" | 0:08 | No |
| **Defeat Jingle** | "Somber game over, 16-bit style, short" | 0:08 | No |
| **Cutscene/Learning** | "Ambient educational, calm focus, cyberpunk subtle" | 2:00 | Yes |

### Sound Effects (Generate or Source)

| SFX | Description | Trigger |
|-----|-------------|---------|
| menu_select | UI click/beep | Menu navigation |
| menu_confirm | Positive confirmation | Selection made |
| menu_cancel | Back/cancel sound | Cancel action |
| attack_correct | Powerful hit sound | Correct answer |
| attack_critical | Extra powerful hit | Streak bonus attack |
| damage_taken | Party hurt sound | Wrong answer |
| boss_taunt | Ominous stinger | Boss speaks |
| npc_talk | Dialogue blip | NPC dialogue |
| city_enter | Arrival fanfare | Entering city |
| save_point | Checkpoint chime | Game saved |

### Audio Trigger Events
The emulator wrapper listens for specific memory addresses or events:
```javascript
// Example audio trigger mapping
const audioTriggers = {
  CITY_TUTORIAL_ENTER: 'city_tutorial.mp3',
  CITY_PURDUE_ENTER: 'city_purdue.mp3',
  BATTLE_START: 'battle.mp3',
  BOSS_START: 'boss_battle.mp3',
  CORRECT_ANSWER: 'attack_correct.mp3',
  WRONG_ANSWER: 'damage_taken.mp3',
  VICTORY: 'victory.mp3',
  DEFEAT: 'defeat.mp3'
};
```

---

## Combat System Updates

### Timer Rules
- **Regular Encounters:** No timer (learning-focused)
- **Boss Battles:** 30-second timer per question
  - Timer visible as depleting bar
  - Running out of time = wrong answer
  - Creates urgency without being punishing during learning

### Cipher's "Detect" Ability
- **Uses per battle:** 1
- **Effect:** Highlights the correct answer for 3 seconds, then fades
- **Strategic use:** Save for difficult questions or when HP is low
- **Visual:** Answer option glows blue briefly
- **Cannot be used on final question of boss fight**

### Difficulty Progression

| City | Base Question Difficulty | Boss Timer | Enemy HP | Party HP |
|------|-------------------------|------------|----------|----------|
| Tutorial | 1-2 (Easy) | 30 sec | 100 | 400 |
| Purdue City | 2-3 (Medium) | 30 sec | 150 | 400 |
| Protocol Port | 3-4 (Hard) | 30 sec | 200 | 400 |

Questions are tagged with difficulty 1-5. Each city pulls from appropriate difficulty range with occasional harder questions mixed in.

---

*Document Version: 1.1*  
*Last Updated: January 2025*  
*Status: Design Complete - Ready for Development*
