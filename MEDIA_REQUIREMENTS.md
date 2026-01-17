# ICS Defender Chronicles
## Media Requirements Document

---

## Overview

This document specifies all video and image assets needed for the educational content portions of ICS Defender Chronicles. Each city requires a "cutscene" video that teaches the core concepts, plus supporting images for the Info Kiosk.

**Important:** All media must be either:
1. Licensed/purchased for use
2. Created original
3. Government/public domain sources (CISA, ICS-CERT, NIST)
4. Used with explicit permission

---

## Video Requirements

### Folder Structure
```
media/
└── videos/
    ├── tutorial/
    │   └── intro_ics_overview.mp4
    ├── purdue_city/
    │   └── network_architecture.mp4
    └── protocol_port/
        └── ics_protocols.mp4
```

---

### Tutorial Video: ICS/SCADA Overview

**Filename:** `intro_ics_overview.mp4`  
**Duration:** 8-12 minutes recommended  
**Content Required:**

1. What is ICS/SCADA? (definitions)
2. Where is ICS used? (power, water, oil/gas, manufacturing, transportation)
3. Key components (PLC, RTU, HMI, Historian)
4. IT vs OT differences (CIA triad priorities)
5. Why ICS security matters (consequences of attacks)
6. Brief history of ICS attacks (optional but impactful)

**Recommended Source Options:**

| Source | URL | Notes |
|--------|-----|-------|
| CISA ICS Training | https://www.cisa.gov/ics-training-available-through-cisa | Free, government source, may need to request |
| Dragos Webinars | https://www.dragos.com/resource-type/webinar/ | Request permission, excellent content |
| SANS ICS Summit Talks | https://www.youtube.com/user/SANSInstitute | Many free talks, contact for usage rights |
| Idaho National Laboratory | https://inl.gov/ics/ | Government lab, public resources |

**YouTube References (Contact for Rights):**

1. **"Introduction to Industrial Control Systems"** - SANS Institute  
   https://www.youtube.com/watch?v=example1  
   *Good overview, professional quality*

2. **"ICS Security 101"** - CISA  
   https://www.youtube.com/watch?v=example2  
   *Government source, likely public domain*

3. **"What is SCADA?"** - RealPars  
   https://www.youtube.com/watch?v=UcH65KdZr4o  
   *Excellent animations, contact for licensing*

**Custom Video Script (If Creating Original):**

```
INTRO (30 sec)
[Cyberpunk cityscape, critical infrastructure visible]
NARRATOR: "Every time you flip a light switch, turn on your tap, or fill 
your car with gas, you're relying on Industrial Control Systems..."

SECTION 1: WHAT IS ICS (2 min)
[Diagrams of ICS components]
- Define SCADA, DCS, ICS umbrella term
- Show relationship between systems

SECTION 2: WHERE ICS IS USED (2 min)
[Footage/images of each sector]
- Power generation and grid
- Water and wastewater treatment
- Oil and gas refining
- Manufacturing
- Transportation

SECTION 3: KEY COMPONENTS (3 min)
[Animated diagrams]
- PLC: "The brain that controls physical processes"
- RTU: "Remote monitoring and control"
- HMI: "The human interface"
- Historian: "Recording everything"

SECTION 4: IT VS OT (2 min)
[Side-by-side comparison]
- Confidentiality vs Availability priority
- Patch cycles (monthly vs yearly)
- System lifespans (5 years vs 20+ years)

SECTION 5: WHY IT MATTERS (2 min)
[Case studies - no graphic content]
- Ukraine power grid (2015, 2016)
- Oldsmar water treatment (2021)
- Colonial Pipeline (2021)
- Consequences: Safety, economics, national security

OUTRO (30 sec)
[Team CyberGuard assembling]
NARRATOR: "Now you understand what we're protecting. Let's learn how 
to defend it."
```

---

### Purdue City Video: Network Architecture

**Filename:** `network_architecture.mp4`  
**Duration:** 10-15 minutes recommended  
**Content Required:**

1. The Purdue Enterprise Reference Architecture (detailed)
2. Level 0: Physical Process
3. Level 1: Basic Control (PLCs, RTUs)
4. Level 2: Area Supervisory Control
5. Level 3: Site Operations
6. Level 3.5 (DMZ): IT/OT Boundary
7. Level 4-5: Enterprise and Internet
8. Segmentation strategies
9. Common attack paths

**Recommended Source Options:**

| Source | URL | Notes |
|--------|-----|-------|
| SANS Purdue Model Whitepaper | https://www.sans.org/white-papers/ | Reference for accuracy |
| Fortinet ICS Architecture | https://www.fortinet.com/resources/cyberglossary/purdue-model | Good diagrams |
| Claroty Webinars | https://claroty.com/resources/ | Permission needed |

**YouTube References (Contact for Rights):**

1. **"Purdue Model Explained"** - Industrial Cybersecurity  
   https://www.youtube.com/watch?v=example3  
   *Clear explanation with diagrams*

2. **"ICS Network Segmentation"** - SANS ICS  
   https://www.youtube.com/watch?v=example4  
   *Detailed technical content*

---

### Protocol Port Video: ICS Protocols

**Filename:** `ics_protocols.mp4`  
**Duration:** 12-15 minutes recommended  
**Content Required:**

1. Why ICS protocols are different
2. Modbus (history, function, vulnerabilities)
3. DNP3 (purpose, where used, security additions)
4. OPC (classic vs UA, security improvements)
5. EtherNet/IP and CIP
6. Protocol vulnerabilities (no auth, no encryption)
7. Wireshark examples of ICS traffic
8. Secure protocol alternatives

**Recommended Source Options:**

| Source | URL | Notes |
|--------|-----|-------|
| Wireshark ICS Tutorials | https://wiki.wireshark.org/SampleCaptures | Free captures |
| CISA Protocol Advisories | https://www.cisa.gov/uscert/ics/advisories | Technical details |
| Nozomi Networks Webinars | https://www.nozominetworks.com/resources/ | Permission needed |

**YouTube References (Contact for Rights):**

1. **"Modbus Protocol Tutorial"** - Real Time Automation  
   https://www.youtube.com/watch?v=example5  
   *Technical but accessible*

2. **"Hacking ICS Protocols"** - DEF CON / S4 Talks  
   https://www.youtube.com/watch?v=example6  
   *Engaging, shows real attacks*

---

## Image Requirements

### Folder Structure
```
media/
└── images/
    ├── tutorial/
    │   ├── ics_overview_diagram.png
    │   ├── plc_example.png
    │   ├── hmi_screenshot.png
    │   ├── scada_architecture.png
    │   └── it_vs_ot_comparison.png
    ├── purdue_city/
    │   ├── purdue_model_full.png
    │   ├── purdue_level_0.png
    │   ├── purdue_level_1.png
    │   ├── purdue_level_2.png
    │   ├── purdue_level_3.png
    │   ├── dmz_diagram.png
    │   └── network_segmentation.png
    └── protocol_port/
        ├── modbus_frame.png
        ├── dnp3_structure.png
        ├── opc_architecture.png
        ├── wireshark_modbus.png
        └── protocol_comparison_table.png
```

---

### Tutorial Images

#### 1. ics_overview_diagram.png
**Description:** High-level diagram showing ICS components and their relationships  
**Source Options:**
- CISA ICS-CERT: https://www.cisa.gov/uscert/ics (public domain)
- NIST SP 800-82: https://csrc.nist.gov/publications/detail/sp/800-82/rev-2/final (public domain)
- CREATE CUSTOM: Recommended for consistent art style

**Specifications:**
- Resolution: 1920x1080 minimum
- Format: PNG with transparency
- Style: Clean, labeled, color-coded

#### 2. plc_example.png
**Description:** Photograph or illustration of a PLC with labeled parts  
**Source Options:**
- Wikimedia Commons: https://commons.wikimedia.org/wiki/Category:Programmable_logic_controllers
- Siemens Public Media: https://press.siemens.com/
- CREATE CUSTOM: Pixel art style for game consistency

#### 3. hmi_screenshot.png
**Description:** Example HMI screen showing typical industrial display  
**Source Options:**
- CISA Training Materials (request)
- Inductive Automation Ignition Demo: https://inductiveautomation.com/
- CREATE CUSTOM: Mock HMI that matches game aesthetic

#### 4. scada_architecture.png
**Description:** SCADA system architecture diagram  
**Source Options:**
- NIST 800-82 Figure 2-1 (public domain)
- CREATE CUSTOM: Simplified, game-style version

#### 5. it_vs_ot_comparison.png
**Description:** Table/infographic comparing IT and OT characteristics  
**Source Options:**
- CREATE CUSTOM RECOMMENDED

| Characteristic | IT | OT |
|---------------|----|----|
| Priority | Confidentiality | Availability |
| Patch Cycle | Monthly | Yearly or never |
| System Lifespan | 3-5 years | 15-25 years |
| Downtime Tolerance | Minutes | Seconds |

---

### Purdue City Images

#### 1. purdue_model_full.png
**Description:** Complete Purdue Reference Architecture diagram (Levels 0-5)  
**Source Options:**
- Original ISA-95/Purdue Model: Public standard, create derivative
- SANS ICS Poster: https://www.sans.org/posters/ (request permission)
- CREATE CUSTOM: Highly recommended for educational clarity

**Required Labels:**
- Level 0: Physical Process
- Level 1: Basic Control
- Level 2: Area Supervisory
- Level 3: Site Operations
- Level 3.5: DMZ
- Level 4: Enterprise
- Level 5: Internet/External

#### 2-5. purdue_level_X.png
**Description:** Individual detail diagrams for each Purdue level  
**Source:** CREATE CUSTOM - Show specific devices at each level

#### 6. dmz_diagram.png
**Description:** Detailed DMZ architecture showing jump servers, data diodes, firewalls  
**Source Options:**
- CISA Architecture Documents (public domain)
- CREATE CUSTOM

#### 7. network_segmentation.png
**Description:** Before/after showing flat network vs segmented network  
**Source:** CREATE CUSTOM

---

### Protocol Port Images

#### 1. modbus_frame.png
**Description:** Modbus TCP frame structure diagram  
**Source Options:**
- Modbus.org specification (open standard)
- CREATE CUSTOM: Clear, labeled diagram showing:
  - Transaction ID (2 bytes)
  - Protocol ID (2 bytes)
  - Length (2 bytes)
  - Unit ID (1 byte)
  - Function Code (1 byte)
  - Data (variable)

#### 2. dnp3_structure.png
**Description:** DNP3 protocol stack and frame structure  
**Source Options:**
- IEEE 1815 documentation (reference)
- CREATE CUSTOM

#### 3. opc_architecture.png
**Description:** OPC Classic vs OPC UA comparison diagram  
**Source Options:**
- OPC Foundation: https://opcfoundation.org/resources/
- CREATE CUSTOM

#### 4. wireshark_modbus.png
**Description:** Screenshot of Wireshark capturing Modbus traffic  
**Source Options:**
- Capture your own using Wireshark sample captures
- Sanitized/simulated capture (no real IP addresses)
- CREATE CUSTOM: Illustrated version

#### 5. protocol_comparison_table.png
**Description:** Table comparing ICS protocols  
**Source:** CREATE CUSTOM

| Protocol | Port | Authentication | Encryption | Common Use |
|----------|------|----------------|------------|------------|
| Modbus TCP | 502 | None | None | PLCs, RTUs |
| DNP3 | 20000 | Optional (SA) | Optional | Utilities |
| OPC UA | 4840 | Yes | Yes | Modern SCADA |
| EtherNet/IP | 44818 | Limited | No | Manufacturing |

---

## Game Sprites and Art

### Character Portraits (CREATE CUSTOM)

All portraits should be created in a consistent cyberpunk pixel art style.

**Specifications:**
- Size: 64x64 pixels (in-game), 128x128 for dialogue boxes
- Color palette: Limited (16-32 colors for SNES compatibility)
- Style: Detailed 8-bit/16-bit era aesthetic

**Required Portraits:**

| Character | Expression Variants | Notes |
|-----------|---------------------|-------|
| CIPHER | Neutral, Thinking, Alert, Pleased | Silver hair, AR glasses, blue accents |
| BLAZE | Neutral, Determined, Worried, Excited | Orange hair, cybernetic arm |
| GHOST | Neutral, Mysterious, Suspicious, Smirk | Hooded, glitching mask |
| VOLT | Neutral, Stern, Teaching, Satisfied | Hard hat, yellow safety accents |
| Chief Martinez | Neutral, Concerned | Older, authority figure |
| Technician Park | Neutral, Explaining | Young, eager |
| Dr. Santos | Neutral, Worried | Lab coat, serious |
| Network Admin Chen | Neutral, Focused | Glasses, multiple monitors |
| Security Lead Okonkwo | Neutral, Alert | Military bearing |
| Operator Williams | Neutral, Helpful | Control room uniform |
| Protocol Specialist Kim | Neutral, Technical | Headset, analyzing |
| Field Tech Rodriguez | Neutral, Practical | Safety gear |
| Analyst Morgan | Neutral, Suspicious | Dark circles, coffee |
| GLITCH (Boss) | Taunting, Damaged | Script kiddie aesthetic |
| ARCHITECT (Boss) | Confident, Angry | Network diagrams motif |
| WIRETAP (Boss) | Sneaky, Frustrated | Cables/wires aesthetic |

---

## Audio Assets (MakeBestMusic.com)

### Setup
1. Create account at https://makebestmusic.com/
2. Subscribe to Basic plan ($14.9/mo) for commercial license
3. Generate tracks using prompts below
4. Download as MP3 (or WAV for higher quality)
5. Place in `media/audio/` folder structure

### Folder Structure
```
media/
└── audio/
    ├── music/
    │   ├── title_theme.mp3
    │   ├── world_map.mp3
    │   ├── city_tutorial.mp3
    │   ├── city_purdue.mp3
    │   ├── city_protocol.mp3
    │   ├── battle.mp3
    │   ├── boss_battle.mp3
    │   ├── cutscene.mp3
    │   ├── victory.mp3
    │   └── defeat.mp3
    └── sfx/
        ├── menu_select.mp3
        ├── menu_confirm.mp3
        ├── menu_cancel.mp3
        ├── attack_correct.mp3
        ├── attack_critical.mp3
        ├── damage_taken.mp3
        ├── boss_taunt.mp3
        ├── npc_talk.mp3
        ├── city_enter.mp3
        └── save_point.mp3
```

---

### Music Generation Prompts

Copy these prompts directly into MakeBestMusic.com's text-to-music generator:

#### Title Theme
```
Epic synthwave hero theme, cyberpunk atmosphere, dramatic orchestral elements, 
16-bit retro gaming inspired, triumphant melody, electronic drums, 
synth arpeggios, builds to powerful climax, 90 BPM
```
**Duration:** Generate 1:30, set to loop  
**Style tags:** synthwave, cyberpunk, gaming, epic

#### World Map Theme
```
Ambient industrial cyberpunk, atmospheric and mysterious, gentle synth pads, 
distant machinery sounds, contemplative mood, subtle electronic pulse, 
spacious mix, dark but hopeful undertones, 70 BPM
```
**Duration:** Generate 2:00, set to loop  
**Style tags:** ambient, industrial, cyberpunk, atmospheric

#### Tutorial City (Power Plant Alpha)
```
Hopeful electronic music, industrial power plant atmosphere, learning and 
discovery mood, clean synths, steady beat, professional training video feel, 
optimistic but focused, 100 BPM
```
**Duration:** Generate 1:30, set to loop  
**Style tags:** electronic, hopeful, industrial, educational

#### Purdue City (Water Treatment)
```
Mysterious tech noir, water and digital sounds, flowing synthesizers, 
detective investigation mood, subtle tension, clean production, 
cyberpunk noir atmosphere, 85 BPM
```
**Duration:** Generate 1:30, set to loop  
**Style tags:** tech noir, mysterious, water, cyberpunk

#### Protocol Port (Oil Refinery)
```
Dark industrial refinery atmosphere, oil and steel sounds, ominous undertones, 
heavy bass, mechanical rhythms, danger lurking, oppressive but rhythmic, 
factory machinery feel, 90 BPM
```
**Duration:** Generate 1:30, set to loop  
**Style tags:** industrial, dark, mechanical, ominous

#### Battle Theme
```
Intense 16-bit battle music, fast electronic beats, urgent synth melody, 
retro gaming combat feel, energetic and driving, chip-tune influenced, 
adrenaline pumping, 140 BPM
```
**Duration:** Generate 1:30, set to loop  
**Style tags:** battle, intense, retro, electronic, gaming

#### Boss Battle Theme
```
Dark synthwave boss fight music, menacing and dramatic, heavy bass drops, 
villain theme feel, intense pressure, dark synth leads, dramatic builds, 
final confrontation energy, 130 BPM
```
**Duration:** Generate 2:00, set to loop  
**Style tags:** boss, synthwave, dark, dramatic, intense

#### Cutscene/Learning Theme
```
Ambient educational background music, calm focus atmosphere, subtle cyberpunk 
elements, non-distracting, professional documentary feel, gentle electronic, 
concentration friendly, 60 BPM
```
**Duration:** Generate 2:00, set to loop  
**Style tags:** ambient, educational, calm, focus

#### Victory Jingle
```
Triumphant 16-bit victory fanfare, short celebration, retro gaming win sound, 
cheerful synths, ascending melody, achievement unlocked feel
```
**Duration:** Generate 8-10 seconds, no loop  
**Style tags:** victory, fanfare, retro, celebration

#### Defeat Jingle
```
Somber game over music, short melancholy phrase, 16-bit style, 
descending melody, try again feel, not too depressing
```
**Duration:** Generate 8-10 seconds, no loop  
**Style tags:** defeat, somber, retro, game over

---

### Sound Effects Generation

For SFX, use shorter generation settings or the "sound effects" mode if available.
Alternatively, source from free SFX libraries:

| SFX | MakeBestMusic Prompt | Alternative Source |
|-----|---------------------|-------------------|
| menu_select | "UI click sound, digital beep, clean" | freesound.org |
| menu_confirm | "Positive confirmation chime, success" | freesound.org |
| menu_cancel | "Cancel sound, back button, soft reject" | freesound.org |
| attack_correct | "Powerful hit impact, correct answer, satisfying" | freesound.org |
| attack_critical | "Critical hit explosion, combo bonus, epic" | freesound.org |
| damage_taken | "Hurt sound effect, damage received, ouch" | freesound.org |
| boss_taunt | "Ominous villain stinger, dark laugh hint" | freesound.org |
| npc_talk | "Dialogue blip, text appearing, retro" | freesound.org |
| city_enter | "Location arrival fanfare, short triumph" | freesound.org |
| save_point | "Checkpoint saved chime, secure sound" | freesound.org |

**Free SFX Alternative Sources:**
- Freesound.org (CC0/Attribution licenses)
- OpenGameArt.org audio section
- Kenney.nl game assets (CC0)

---

### Audio Implementation Notes

1. **File Format:** MP3 at 192kbps minimum (128kbps acceptable for SFX)
2. **Normalization:** Normalize all tracks to -3dB peak to avoid clipping
3. **Loop Points:** Ensure music tracks loop seamlessly (no pops/clicks)
4. **Loading:** Preload all audio on game start for instant playback
5. **Volume Levels:** 
   - Music: 70% default
   - SFX: 100% default
   - Provide volume sliders in options menu

---

## Audio Assets

### Music (OpenGameArt or Custom)

**Recommended Sources:**
- OpenGameArt.org: https://opengameart.org/art-search-advanced?keys=&field_art_type_tid%5B%5D=12&field_art_tags_tid_op=or&field_art_tags_tid=synthwave
- Free Music Archive: https://freemusicarchive.org/ (check licenses)
- Incompetech: https://incompetech.com/ (CC attribution)

**Required Tracks:**

| Track | Filename | Style | Source Recommendation |
|-------|----------|-------|----------------------|
| Title Theme | title.spc | Epic synthwave | Custom or Incompetech |
| World Map | worldmap.spc | Ambient industrial | OpenGameArt |
| Tutorial City | city_tutorial.spc | Hopeful electronic | OpenGameArt |
| Purdue City | city_purdue.spc | Mysterious tech | OpenGameArt |
| Protocol Port | city_protocol.spc | Industrial dark | OpenGameArt |
| Battle Normal | battle.spc | Intense electronic | Custom or OpenGameArt |
| Boss Battle | boss.spc | Dark synthwave | Custom |
| Victory | victory.spc | Triumphant jingle | OpenGameArt |
| Defeat | defeat.spc | Somber jingle | OpenGameArt |
| Cutscene | cutscene.spc | Dramatic | OpenGameArt |

---

## Licensing Checklist

Before including any asset, verify:

- [ ] License allows commercial/educational use
- [ ] License allows modification if needed
- [ ] Attribution requirements documented
- [ ] License file included in repository
- [ ] No trademark issues

**License Types (Preferred):**
1. Public Domain / CC0
2. Creative Commons Attribution (CC-BY)
3. Creative Commons Attribution-ShareAlike (CC-BY-SA)
4. Government works (CISA, NIST, DOE)

**Avoid:**
- CC-NC (Non-Commercial) if any monetization planned
- CC-ND (No Derivatives) if modifications needed
- All Rights Reserved without explicit permission

---

## Asset Creation Priority

### High Priority (Blocking)
1. [ ] Tutorial video or script
2. [ ] Purdue model diagram
3. [ ] Character sprites (basic movement)
4. [ ] Battle backgrounds

### Medium Priority (MVP)
5. [ ] Character portraits
6. [ ] Remaining diagrams
7. [ ] Music tracks
8. [ ] City tilesets

### Lower Priority (Polish)
9. [ ] Additional expression variants
10. [ ] Sound effects
11. [ ] Animated cutscenes
12. [ ] Bonus content

---

## Contact Templates

### Video Permission Request

```
Subject: Educational Use Permission Request - ICS Training Game

Dear [Organization/Creator],

I am developing an educational game called "ICS Defender Chronicles" designed 
to teach Industrial Control System security fundamentals to cyber professionals, 
aligned with SANS ICS410 curriculum.

I would like to request permission to use [specific video title/URL] as 
educational content within the game. The game will be:
- Deployed on a government training platform (PCTE)
- Non-commercial / educational use only
- Properly attributed per your requirements

Would you be able to grant permission for this use? I'm happy to discuss 
attribution, licensing terms, or any modifications needed.

Thank you for your consideration.

[Your name/organization]
```

### Image Permission Request

```
Subject: Educational Use Permission - ICS Security Diagram

Dear [Organization],

I am creating an educational ICS security training game and would like to 
request permission to use [specific image/diagram] from [source].

The image would be used to teach [specific concept] within an interactive 
training environment. Full attribution will be provided.

Please let me know if this use is permitted and any requirements for attribution.

Thank you,
[Your name]
```

---

*Document Version: 1.0*  
*Last Updated: [Current Date]*
