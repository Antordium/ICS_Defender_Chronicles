# ICS Defender Chronicles - Developer Handoff Document

**Purpose:** Technical specification for Claude Code to build the ROM and web emulator wrapper  
**Version:** 1.0  
**Date:** January 2025

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture Diagram](#architecture-diagram)
3. [File Structure to Create](#file-structure-to-create)
4. [ROM Development (PVSnesLib)](#rom-development-pvsneslib)
5. [Web Emulator Wrapper](#web-emulator-wrapper)
6. [Data Contracts](#data-contracts)
7. [Key Algorithms](#key-algorithms)
8. [cmi5/xAPI Integration](#cmi5xapi-integration)
9. [Build & Deploy](#build--deploy)
10. [Testing Checklist](#testing-checklist)

---

## Project Overview

**What We're Building:**
An educational SNES JRPG that teaches ICS/SCADA security. The ROM runs in a JavaScript emulator on GitHub Pages, wrapped with cmi5 code for LMS integration.

**Tech Stack:**
- **ROM:** PVSnesLib (C) → SNES ROM
- **Emulator:** bsnes-wasm or Snes9x.js
- **Wrapper:** Vanilla JavaScript + HTML5
- **Audio:** HTML5 Audio API (external to ROM)
- **Storage:** IndexedDB for saves
- **LMS:** cmi5/xAPI to PCTE

**Key Constraints:**
- ROM handles game logic, graphics, input
- Web wrapper handles audio, saves, LMS communication
- Communication via emulator memory reads or message passing

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              BROWSER                                        │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                         WEB WRAPPER (JavaScript)                      │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │  │
│  │  │   cmi5.js   │  │  audio.js   │  │  saves.js   │  │  events.js  │  │  │
│  │  │             │  │             │  │             │  │             │  │  │
│  │  │ -Launch     │  │ -Music      │  │ -IndexedDB  │  │ -Memory     │  │  │
│  │  │ -xAPI       │  │ -SFX        │  │ -Export     │  │  polling    │  │  │
│  │  │ -Session    │  │ -Volume     │  │ -Import     │  │ -Triggers   │  │  │
│  │  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  │  │
│  │         │                │                │                │         │  │
│  │         └────────────────┴────────┬───────┴────────────────┘         │  │
│  │                                   │                                   │  │
│  │  ┌────────────────────────────────▼────────────────────────────────┐  │  │
│  │  │                     EMULATOR (bsnes-wasm)                       │  │  │
│  │  │  ┌──────────────────────────────────────────────────────────┐  │  │  │
│  │  │  │                    SNES ROM                               │  │  │  │
│  │  │  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐    │  │  │  │
│  │  │  │  │  main.c  │ │ combat.c │ │dialogue.c│ │  map.c   │    │  │  │  │
│  │  │  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘    │  │  │  │
│  │  │  │  ┌──────────┐ ┌──────────┐ ┌──────────┐                 │  │  │  │
│  │  │  │  │questions.c│ │ save.c  │ │ ui.c     │                 │  │  │  │
│  │  │  │  └──────────┘ └──────────┘ └──────────┘                 │  │  │  │
│  │  │  └──────────────────────────────────────────────────────────┘  │  │  │
│  │  └─────────────────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────────┐  │
│  │   index.html    │  │   style.css     │  │   /media/audio/*.mp3        │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ xAPI Statements
                                    ▼
                          ┌─────────────────┐
                          │   LRS (PCTE)    │
                          └─────────────────┘
```

---

## File Structure to Create

```
ics-defender-chronicles/
├── rom/
│   ├── src/
│   │   ├── main.c              # Entry point, game loop, state machine
│   │   ├── main.h              # Global defines, game states enum
│   │   ├── map.c               # World map and city navigation
│   │   ├── map.h
│   │   ├── combat.c            # Battle system, quiz mechanics
│   │   ├── combat.h
│   │   ├── dialogue.c          # NPC dialogue, text rendering
│   │   ├── dialogue.h
│   │   ├── questions.c         # Question loading, randomization
│   │   ├── questions.h
│   │   ├── save.c              # Save/load to SRAM
│   │   ├── save.h
│   │   ├── ui.c                # Menus, HUD, text boxes
│   │   ├── ui.h
│   │   ├── sprites.c           # Sprite management
│   │   ├── sprites.h
│   │   ├── input.c             # Controller input handling
│   │   └── input.h
│   ├── assets/
│   │   ├── sprites/
│   │   │   ├── heroes.png      # 4 hero sprites (walk cycles)
│   │   │   ├── npcs.png        # NPC sprites
│   │   │   ├── enemies.png     # Enemy/boss sprites
│   │   │   └── portraits.png   # Character portraits
│   │   ├── tilesets/
│   │   │   ├── worldmap.png    # World map tiles
│   │   │   ├── city_interior.png
│   │   │   └── battle_bg.png   # Battle backgrounds
│   │   ├── maps/
│   │   │   ├── worldmap.tmx    # Tiled map files
│   │   │   ├── tutorial.tmx
│   │   │   ├── purdue.tmx
│   │   │   └── protocol.tmx
│   │   └── fonts/
│   │       └── game_font.png   # 8x8 font tileset
│   ├── data/
│   │   ├── questions_tutorial.bin  # Compiled question data
│   │   ├── questions_purdue.bin
│   │   ├── questions_protocol.bin
│   │   ├── dialogue_tutorial.bin   # Compiled dialogue data
│   │   ├── dialogue_purdue.bin
│   │   └── dialogue_protocol.bin
│   ├── tools/
│   │   ├── json_to_bin.py      # Convert JSON questions to binary
│   │   └── dialogue_compiler.py # Convert JSON dialogue to binary
│   ├── Makefile
│   └── pvsneslib.cfg           # PVSnesLib configuration
│
├── emulator/
│   ├── index.html              # Main page
│   ├── css/
│   │   └── style.css           # Game styling
│   ├── js/
│   │   ├── main.js             # Entry point
│   │   ├── emulator.js         # Emulator wrapper
│   │   ├── cmi5.js             # cmi5/xAPI handling
│   │   ├── audio.js            # Music and SFX
│   │   ├── saves.js            # IndexedDB save management
│   │   └── events.js           # Game event detection
│   ├── lib/
│   │   └── bsnes.js            # Emulator library (download)
│   └── rom/
│       └── ics_defender.sfc    # Compiled ROM (build output)
│
├── media/
│   ├── audio/
│   │   ├── music/
│   │   │   ├── title_theme.mp3
│   │   │   ├── world_map.mp3
│   │   │   ├── city_tutorial.mp3
│   │   │   ├── city_purdue.mp3
│   │   │   ├── city_protocol.mp3
│   │   │   ├── battle.mp3
│   │   │   ├── boss_battle.mp3
│   │   │   ├── cutscene.mp3
│   │   │   ├── victory.mp3
│   │   │   └── defeat.mp3
│   │   └── sfx/
│   │       ├── menu_select.mp3
│   │       ├── menu_confirm.mp3
│   │       ├── attack_correct.mp3
│   │       ├── attack_critical.mp3
│   │       ├── damage_taken.mp3
│   │       └── [etc.]
│   ├── videos/
│   │   ├── tutorial/
│   │   │   └── intro_ics_overview.mp4
│   │   ├── purdue_city/
│   │   │   └── network_architecture.mp4
│   │   └── protocol_port/
│   │       └── ics_protocols.mp4
│   └── images/
│       └── [educational diagrams]
│
├── lms/
│   ├── cmi5.xml                # Course manifest (EXISTS)
│   └── course-structure.json   # Additional metadata
│
├── docs/
│   ├── GAME_DESIGN_DOCUMENT.md     # (EXISTS)
│   ├── MEDIA_REQUIREMENTS.md       # (EXISTS)
│   ├── DEVELOPER_HANDOFF.md        # (THIS FILE)
│   ├── QUESTION_BANKS/             # (EXISTS - JSON source)
│   │   ├── tutorial_questions.json
│   │   ├── purdue_city_questions.json
│   │   └── protocol_port_questions.json
│   └── DIALOGUE/                   # (EXISTS - JSON source)
│       ├── tutorial_dialogue.json
│       ├── purdue_dialogue.json
│       └── protocol_dialogue.json
│
├── README.md                   # (EXISTS)
├── package.json                # For emulator npm dependencies
└── .github/
    └── workflows/
        └── deploy.yml          # GitHub Pages deployment
```

---

## ROM Development (PVSnesLib)

### Setup Instructions

```bash
# Install PVSnesLib (Linux/WSL)
git clone https://github.com/alekmaul/pvsneslib.git
cd pvsneslib
export PVSNESLIB_HOME=$(pwd)

# Add to PATH
export PATH=$PATH:$PVSNESLIB_HOME/devkitsnes/tools

# Verify installation
816-tcc --version
```

### main.h - Core Definitions

```c
#ifndef MAIN_H
#define MAIN_H

#include <snes.h>

// Game States
typedef enum {
    STATE_TITLE,
    STATE_WORLD_MAP,
    STATE_CITY,
    STATE_DIALOGUE,
    STATE_COMBAT,
    STATE_BOSS_COMBAT,
    STATE_CUTSCENE,
    STATE_MENU,
    STATE_GAME_OVER,
    STATE_VICTORY
} GameState;

// Cities
typedef enum {
    CITY_NONE = 0,
    CITY_TUTORIAL = 1,
    CITY_PURDUE = 2,
    CITY_PROTOCOL = 3
} CityID;

// Party Member IDs
typedef enum {
    CHAR_CIPHER = 0,
    CHAR_BLAZE = 1,
    CHAR_GHOST = 2,
    CHAR_VOLT = 3
} CharacterID;

// Combat constants
#define MAX_PARTY_HP 400
#define TUTORIAL_BOSS_HP 100
#define PURDUE_BOSS_HP 150
#define PROTOCOL_BOSS_HP 200

#define BOSS_TIMER_FRAMES 1800  // 30 seconds at 60fps
#define STREAK_BONUS_3 150      // 1.5x damage at 3 streak
#define STREAK_BONUS_5 200      // 2x damage at 5 streak

// Memory addresses for web wrapper communication
#define MEM_GAME_STATE      0x7E0100
#define MEM_CURRENT_CITY    0x7E0101
#define MEM_IN_COMBAT       0x7E0102
#define MEM_IS_BOSS         0x7E0103
#define MEM_LAST_ANSWER     0x7E0104  // 0=none, 1=correct, 2=wrong
#define MEM_PARTY_HP        0x7E0106  // 2 bytes
#define MEM_BOSS_HP         0x7E0108  // 2 bytes
#define MEM_STREAK          0x7E010A
#define MEM_CITY_COMPLETE   0x7E010B  // Bitmask of completed cities
#define MEM_TRIGGER_SAVE    0x7E010C  // Set to 1 to trigger save
#define MEM_TRIGGER_VIDEO   0x7E010D  // Set to city ID to play video

// Save data location in SRAM
#define SRAM_START          0x700000
#define SRAM_MAGIC          0x4943  // "IC" - ICS Defender

#endif
```

### main.c - Game Loop Structure

```c
#include "main.h"
#include "map.h"
#include "combat.h"
#include "dialogue.h"
#include "ui.h"
#include "save.h"
#include "input.h"

GameState currentState;
GameState previousState;
CityID currentCity;
u16 partyHP;
u16 bossHP;
u8 streak;
u8 citiesCompleted;
u8 detectUsed;  // Cipher's ability

void initGame(void) {
    // Initialize SNES
    consoleInit();
    
    // Set video mode
    setMode(BG_MODE1, 0);
    
    // Initialize subsystems
    initSprites();
    initUI();
    initInput();
    
    // Load save or start new game
    if (saveExists()) {
        loadGame();
    } else {
        newGame();
    }
    
    // Start at title
    currentState = STATE_TITLE;
    
    // Update memory for web wrapper
    *((u8*)MEM_GAME_STATE) = currentState;
}

void newGame(void) {
    partyHP = MAX_PARTY_HP;
    currentCity = CITY_NONE;
    citiesCompleted = 0;
    streak = 0;
}

void gameLoop(void) {
    while(1) {
        // Update memory addresses for web wrapper
        updateSharedMemory();
        
        // Process input
        scanPads();
        u16 keys = padsCurrent(0);
        u16 keysDown = padsDown(0);
        
        // State machine
        switch(currentState) {
            case STATE_TITLE:
                updateTitle(keysDown);
                break;
            case STATE_WORLD_MAP:
                updateWorldMap(keys, keysDown);
                break;
            case STATE_CITY:
                updateCity(keys, keysDown);
                break;
            case STATE_DIALOGUE:
                updateDialogue(keysDown);
                break;
            case STATE_COMBAT:
                updateCombat(keysDown, false);  // Not boss
                break;
            case STATE_BOSS_COMBAT:
                updateCombat(keysDown, true);   // Is boss
                break;
            case STATE_CUTSCENE:
                updateCutscene(keysDown);
                break;
            case STATE_MENU:
                updateMenu(keysDown);
                break;
            case STATE_GAME_OVER:
                updateGameOver(keysDown);
                break;
            case STATE_VICTORY:
                updateVictory(keysDown);
                break;
        }
        
        // VBlank wait
        WaitForVBlank();
    }
}

void updateSharedMemory(void) {
    *((u8*)MEM_GAME_STATE) = currentState;
    *((u8*)MEM_CURRENT_CITY) = currentCity;
    *((u8*)MEM_IN_COMBAT) = (currentState == STATE_COMBAT || currentState == STATE_BOSS_COMBAT);
    *((u8*)MEM_IS_BOSS) = (currentState == STATE_BOSS_COMBAT);
    *((u16*)MEM_PARTY_HP) = partyHP;
    *((u16*)MEM_BOSS_HP) = bossHP;
    *((u8*)MEM_STREAK) = streak;
    *((u8*)MEM_CITY_COMPLETE) = citiesCompleted;
}

void changeState(GameState newState) {
    previousState = currentState;
    currentState = newState;
    *((u8*)MEM_GAME_STATE) = currentState;
}

int main(void) {
    initGame();
    gameLoop();
    return 0;
}
```

### combat.c - Quiz Combat System

```c
#include "main.h"
#include "combat.h"
#include "questions.h"
#include "ui.h"

// Current question data
Question currentQuestion;
u8 selectedAnswer;
u16 timerFrames;
bool timerActive;
u8 questionCount;
u8 correctCount;

// Combat state
typedef enum {
    COMBAT_INTRO,
    COMBAT_QUESTION,
    COMBAT_WAITING,
    COMBAT_RESULT_CORRECT,
    COMBAT_RESULT_WRONG,
    COMBAT_ENEMY_SPEAK,
    COMBAT_VICTORY,
    COMBAT_DEFEAT
} CombatPhase;

CombatPhase combatPhase;

void initCombat(bool isBoss) {
    combatPhase = COMBAT_INTRO;
    questionCount = 0;
    correctCount = 0;
    selectedAnswer = 0;
    detectUsed = 0;
    
    // Set boss HP based on city
    if (isBoss) {
        switch(currentCity) {
            case CITY_TUTORIAL: bossHP = TUTORIAL_BOSS_HP; break;
            case CITY_PURDUE: bossHP = PURDUE_BOSS_HP; break;
            case CITY_PROTOCOL: bossHP = PROTOCOL_BOSS_HP; break;
            default: bossHP = 100;
        }
        timerActive = true;
    } else {
        bossHP = 50;  // Regular enemies
        timerActive = false;
    }
    
    // Reset last answer indicator
    *((u8*)MEM_LAST_ANSWER) = 0;
}

void updateCombat(u16 keysDown, bool isBoss) {
    switch(combatPhase) {
        case COMBAT_INTRO:
            // Show enemy intro, wait for button
            drawCombatIntro();
            if (keysDown & KEY_A) {
                loadNextQuestion();
                combatPhase = COMBAT_QUESTION;
            }
            break;
            
        case COMBAT_QUESTION:
            // Display question and options
            drawQuestion(&currentQuestion);
            drawAnswerOptions(selectedAnswer);
            
            // Timer for boss battles
            if (isBoss && timerActive) {
                timerFrames--;
                drawTimer(timerFrames);
                if (timerFrames == 0) {
                    // Time out = wrong answer
                    processWrongAnswer();
                }
            }
            
            // Navigate answers
            if (keysDown & KEY_UP) {
                if (selectedAnswer > 0) selectedAnswer--;
            }
            if (keysDown & KEY_DOWN) {
                if (selectedAnswer < 3) selectedAnswer++;
            }
            
            // Cipher's Detect ability (L button)
            if ((keysDown & KEY_L) && !detectUsed) {
                detectUsed = 1;
                highlightCorrectAnswer(currentQuestion.correctIndex);
            }
            
            // Submit answer
            if (keysDown & KEY_A) {
                if (selectedAnswer == currentQuestion.correctIndex) {
                    processCorrectAnswer();
                } else {
                    processWrongAnswer();
                }
            }
            break;
            
        case COMBAT_RESULT_CORRECT:
            drawCorrectFeedback();
            if (keysDown & KEY_A) {
                if (bossHP <= 0) {
                    combatPhase = COMBAT_VICTORY;
                } else {
                    loadNextQuestion();
                    combatPhase = COMBAT_QUESTION;
                }
            }
            break;
            
        case COMBAT_RESULT_WRONG:
            drawWrongFeedback();
            if (keysDown & KEY_A) {
                combatPhase = COMBAT_ENEMY_SPEAK;
            }
            break;
            
        case COMBAT_ENEMY_SPEAK:
            // Display enemy's teaching taunt
            drawEnemyDialogue(currentQuestion.enemyTaunt);
            if (keysDown & KEY_A) {
                if (partyHP <= 0) {
                    combatPhase = COMBAT_DEFEAT;
                } else {
                    loadNextQuestion();
                    combatPhase = COMBAT_QUESTION;
                }
            }
            break;
            
        case COMBAT_VICTORY:
            handleVictory(isBoss);
            break;
            
        case COMBAT_DEFEAT:
            handleDefeat();
            break;
    }
}

void processCorrectAnswer(void) {
    streak++;
    correctCount++;
    questionCount++;
    
    // Calculate damage
    u16 damage = 10;
    if (streak >= 5) {
        damage = 20;  // 2x
    } else if (streak >= 3) {
        damage = 15;  // 1.5x
    }
    
    bossHP -= damage;
    if (bossHP < 0) bossHP = 0;
    
    // Update shared memory
    *((u8*)MEM_LAST_ANSWER) = 1;  // Correct
    *((u16*)MEM_BOSS_HP) = bossHP;
    *((u8*)MEM_STREAK) = streak;
    
    // Reset timer for next question
    timerFrames = BOSS_TIMER_FRAMES;
    
    combatPhase = COMBAT_RESULT_CORRECT;
}

void processWrongAnswer(void) {
    streak = 0;
    questionCount++;
    
    // Take damage
    u16 damage = 25;
    partyHP -= damage;
    if (partyHP < 0) partyHP = 0;
    
    // Update shared memory
    *((u8*)MEM_LAST_ANSWER) = 2;  // Wrong
    *((u16*)MEM_PARTY_HP) = partyHP;
    *((u8*)MEM_STREAK) = 0;
    
    // Reset timer
    timerFrames = BOSS_TIMER_FRAMES;
    
    combatPhase = COMBAT_RESULT_WRONG;
}

void handleVictory(bool isBoss) {
    if (isBoss) {
        // Mark city complete
        citiesCompleted |= (1 << currentCity);
        *((u8*)MEM_CITY_COMPLETE) = citiesCompleted;
        
        // Trigger save
        *((u8*)MEM_TRIGGER_SAVE) = 1;
    }
    
    // Return to appropriate state
    changeState(isBoss ? STATE_VICTORY : STATE_CITY);
}

void handleDefeat(void) {
    // Reset to city entrance (not full game over)
    partyHP = MAX_PARTY_HP;
    changeState(STATE_CITY);
}
```

### questions.c - Question Management

```c
#include "main.h"
#include "questions.h"

// Question bank pointers (loaded from ROM data)
extern const u8 questions_tutorial[];
extern const u8 questions_purdue[];
extern const u8 questions_protocol[];

// Tracking which questions have been used
u32 usedQuestionsMask;
u8 questionsInBank;

void initQuestionBank(CityID city) {
    usedQuestionsMask = 0;
    
    switch(city) {
        case CITY_TUTORIAL:
            questionsInBank = 25;
            break;
        case CITY_PURDUE:
            questionsInBank = 25;
            break;
        case CITY_PROTOCOL:
            questionsInBank = 25;
            break;
        default:
            questionsInBank = 0;
    }
}

void loadNextQuestion(void) {
    // Simple PRNG for randomization
    static u16 seed = 12345;
    seed = seed * 1103515245 + 12345;
    
    // Find unused question
    u8 attempts = 0;
    u8 index;
    do {
        index = (seed >> 8) % questionsInBank;
        attempts++;
    } while ((usedQuestionsMask & (1 << index)) && attempts < 50);
    
    // Mark as used
    usedQuestionsMask |= (1 << index);
    
    // Load question from ROM data
    loadQuestionByIndex(index, &currentQuestion);
    
    // Randomize answer order
    randomizeAnswers(&currentQuestion);
    
    // Reset selection
    selectedAnswer = 0;
    timerFrames = BOSS_TIMER_FRAMES;
}

void randomizeAnswers(Question* q) {
    // Fisher-Yates shuffle on answer indices
    u8 indices[4] = {0, 1, 2, 3};
    
    for (int i = 3; i > 0; i--) {
        // Simple random
        u8 j = (seed >> 4) % (i + 1);
        seed = seed * 1103515245 + 12345;
        
        // Swap
        u8 temp = indices[i];
        indices[i] = indices[j];
        indices[j] = temp;
    }
    
    // Reorder answers and update correct index
    char* tempAnswers[4];
    u8 newCorrectIndex;
    
    for (int i = 0; i < 4; i++) {
        tempAnswers[i] = q->answers[indices[i]];
        if (indices[i] == q->correctIndex) {
            newCorrectIndex = i;
        }
    }
    
    for (int i = 0; i < 4; i++) {
        q->answers[i] = tempAnswers[i];
    }
    q->correctIndex = newCorrectIndex;
}
```

### save.c - Save System

```c
#include "main.h"
#include "save.h"

// Save data structure (must match web wrapper)
typedef struct {
    u16 magic;              // 0x4943 "IC"
    u8 version;             // Save format version
    u8 currentCity;
    u8 citiesCompleted;     // Bitmask
    u16 partyHP;
    u8 padding[2];
    
    // Per-city progress
    struct {
        u8 npcsCompleted;   // Bitmask
        u8 bossDefeated;
        u16 questionsAnswered;
        u16 questionsCorrect;
    } cityProgress[4];
    
    // Statistics
    u32 totalPlayTime;      // In frames
    u16 totalQuestionsAnswered;
    u16 totalCorrect;
    u8 bestStreak;
    
    // Checksum
    u16 checksum;
} SaveData;

SaveData saveData;

bool saveExists(void) {
    u16* sramMagic = (u16*)SRAM_START;
    return (*sramMagic == SRAM_MAGIC);
}

void loadGame(void) {
    // Copy from SRAM to RAM
    u8* src = (u8*)SRAM_START;
    u8* dst = (u8*)&saveData;
    
    for (int i = 0; i < sizeof(SaveData); i++) {
        dst[i] = src[i];
    }
    
    // Verify checksum
    if (!verifySaveChecksum()) {
        // Corrupted save, start new
        newGame();
        return;
    }
    
    // Restore game state
    currentCity = saveData.currentCity;
    citiesCompleted = saveData.citiesCompleted;
    partyHP = saveData.partyHP;
}

void saveGame(void) {
    // Update save data
    saveData.magic = SRAM_MAGIC;
    saveData.version = 1;
    saveData.currentCity = currentCity;
    saveData.citiesCompleted = citiesCompleted;
    saveData.partyHP = partyHP;
    
    // Calculate checksum
    saveData.checksum = calculateChecksum();
    
    // Copy to SRAM
    u8* src = (u8*)&saveData;
    u8* dst = (u8*)SRAM_START;
    
    for (int i = 0; i < sizeof(SaveData); i++) {
        dst[i] = src[i];
    }
    
    // Clear trigger
    *((u8*)MEM_TRIGGER_SAVE) = 0;
}

u16 calculateChecksum(void) {
    u16 sum = 0;
    u8* data = (u8*)&saveData;
    
    // Sum all bytes except checksum field
    for (int i = 0; i < sizeof(SaveData) - 2; i++) {
        sum += data[i];
    }
    
    return sum ^ 0x5A5A;  // XOR with magic
}

bool verifySaveChecksum(void) {
    u16 stored = saveData.checksum;
    u16 calculated = calculateChecksum();
    return (stored == calculated);
}
```

### Makefile

```makefile
# PVSnesLib Makefile for ICS Defender Chronicles

include ${PVSNESLIB_HOME}/devkitsnes/snes_rules

# Project name
TARGET = ics_defender

# Source files
SOURCES = src/main.c src/map.c src/combat.c src/dialogue.c \
          src/questions.c src/save.c src/ui.c src/sprites.c src/input.c

# Graphics
GRAPHICS = assets/sprites/heroes.png assets/sprites/npcs.png \
           assets/sprites/enemies.png assets/tilesets/worldmap.png \
           assets/tilesets/city_interior.png

# ROM configuration
ROMSIZE = 4  # 4 Mbit (512KB)
SRAMSIZE = 64  # 64KB SRAM for saves

# Build ROM
all: $(TARGET).sfc
	@echo "Build complete: $(TARGET).sfc"

$(TARGET).sfc: $(SOURCES) $(GRAPHICS)
	$(CC) $(CFLAGS) -o $(TARGET).sfc $(SOURCES)

# Convert graphics
gfx:
	gfx4snes -i assets/sprites/heroes.png -o data/heroes
	gfx4snes -i assets/tilesets/worldmap.png -o data/worldmap

# Convert questions JSON to binary
data:
	python tools/json_to_bin.py docs/QUESTION_BANKS/tutorial_questions.json data/questions_tutorial.bin
	python tools/json_to_bin.py docs/QUESTION_BANKS/purdue_city_questions.json data/questions_purdue.bin
	python tools/json_to_bin.py docs/QUESTION_BANKS/protocol_port_questions.json data/questions_protocol.bin

# Clean
clean:
	rm -f $(TARGET).sfc *.o data/*.bin

# Copy to emulator folder
deploy: $(TARGET).sfc
	cp $(TARGET).sfc ../emulator/rom/

.PHONY: all gfx data clean deploy
```

---

## Web Emulator Wrapper

### index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ICS Defender Chronicles</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <!-- Video overlay for cutscenes -->
    <div id="video-overlay" class="hidden">
        <video id="cutscene-video" controls>
            <source src="" type="video/mp4">
        </video>
        <button id="skip-video">Skip</button>
    </div>
    
    <!-- Main game container -->
    <div id="game-container">
        <canvas id="game-canvas" width="512" height="448"></canvas>
        
        <!-- HUD overlay -->
        <div id="hud">
            <div id="hp-display">Party HP: <span id="hp-value">400</span>/400</div>
            <div id="streak-display">Streak: <span id="streak-value">0</span></div>
        </div>
    </div>
    
    <!-- Controls -->
    <div id="controls">
        <button id="fullscreen-btn">Fullscreen</button>
        <button id="save-btn">Export Save</button>
        <button id="load-btn">Import Save</button>
        <input type="file" id="save-file-input" accept=".json" class="hidden">
        
        <div id="volume-controls">
            <label>Music: <input type="range" id="music-volume" min="0" max="100" value="70"></label>
            <label>SFX: <input type="range" id="sfx-volume" min="0" max="100" value="100"></label>
        </div>
    </div>
    
    <!-- Loading screen -->
    <div id="loading-screen">
        <h1>ICS Defender Chronicles</h1>
        <p>Loading...</p>
        <progress id="load-progress" max="100" value="0"></progress>
    </div>
    
    <!-- Scripts -->
    <script src="lib/bsnes.js"></script>
    <script type="module" src="js/main.js"></script>
</body>
</html>
```

### js/main.js

```javascript
// Main entry point
import { Emulator } from './emulator.js';
import { AudioManager } from './audio.js';
import { SaveManager } from './saves.js';
import { EventManager } from './events.js';
import { CMI5Manager } from './cmi5.js';

class ICSDefenderGame {
    constructor() {
        this.emulator = null;
        this.audio = null;
        this.saves = null;
        this.events = null;
        this.cmi5 = null;
        
        this.init();
    }
    
    async init() {
        try {
            // Parse cmi5 launch parameters if present
            this.cmi5 = new CMI5Manager();
            await this.cmi5.initialize();
            
            // Initialize save manager
            this.saves = new SaveManager();
            await this.saves.init();
            
            // Initialize audio
            this.audio = new AudioManager();
            await this.audio.preloadAll();
            
            // Initialize emulator
            this.emulator = new Emulator('game-canvas');
            await this.emulator.loadROM('rom/ics_defender.sfc');
            
            // Initialize event manager (polls emulator memory)
            this.events = new EventManager(this.emulator, this.audio, this.saves, this.cmi5);
            this.events.startPolling();
            
            // Load save if exists
            const saveData = await this.saves.loadLatest();
            if (saveData) {
                this.emulator.loadSRAM(saveData);
            }
            
            // Check for city parameter (from cmi5 launch)
            const urlParams = new URLSearchParams(window.location.search);
            const targetCity = urlParams.get('city');
            if (targetCity) {
                // Could set emulator to start at specific city
                console.log(`Launching to city: ${targetCity}`);
            }
            
            // Hide loading screen
            document.getElementById('loading-screen').classList.add('hidden');
            
            // Start emulator
            this.emulator.start();
            
            // Start background music
            this.audio.playMusic('title_theme');
            
            // Send cmi5 initialized statement
            await this.cmi5.sendInitialized();
            
            // Setup UI handlers
            this.setupUIHandlers();
            
        } catch (error) {
            console.error('Failed to initialize game:', error);
            this.showError(error.message);
        }
    }
    
    setupUIHandlers() {
        // Fullscreen
        document.getElementById('fullscreen-btn').addEventListener('click', () => {
            document.getElementById('game-container').requestFullscreen();
        });
        
        // Export save
        document.getElementById('save-btn').addEventListener('click', async () => {
            const saveData = await this.saves.exportSave();
            const blob = new Blob([JSON.stringify(saveData, null, 2)], {type: 'application/json'});
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `ics_defender_save_${Date.now()}.json`;
            a.click();
        });
        
        // Import save
        document.getElementById('load-btn').addEventListener('click', () => {
            document.getElementById('save-file-input').click();
        });
        
        document.getElementById('save-file-input').addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (file) {
                const text = await file.text();
                const saveData = JSON.parse(text);
                await this.saves.importSave(saveData);
                this.emulator.loadSRAM(saveData.sram);
            }
        });
        
        // Volume controls
        document.getElementById('music-volume').addEventListener('input', (e) => {
            this.audio.setMusicVolume(e.target.value / 100);
        });
        
        document.getElementById('sfx-volume').addEventListener('input', (e) => {
            this.audio.setSFXVolume(e.target.value / 100);
        });
        
        // Video skip
        document.getElementById('skip-video').addEventListener('click', () => {
            this.events.skipVideo();
        });
    }
    
    showError(message) {
        document.getElementById('loading-screen').innerHTML = `
            <h1>Error</h1>
            <p>${message}</p>
            <button onclick="location.reload()">Retry</button>
        `;
    }
}

// Start game when DOM ready
document.addEventListener('DOMContentLoaded', () => {
    window.game = new ICSDefenderGame();
});
```

### js/emulator.js

```javascript
// Emulator wrapper for bsnes-wasm or Snes9x.js

export class Emulator {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.core = null;
        this.running = false;
        this.frameCallback = null;
    }
    
    async loadROM(romPath) {
        // Fetch ROM file
        const response = await fetch(romPath);
        const romData = await response.arrayBuffer();
        
        // Initialize emulator core
        // Using bsnes-wasm as example - adjust for chosen emulator
        this.core = await Bsnes.create({
            canvas: this.canvas,
            rom: new Uint8Array(romData)
        });
        
        return true;
    }
    
    start() {
        this.running = true;
        this.runFrame();
    }
    
    stop() {
        this.running = false;
    }
    
    runFrame() {
        if (!this.running) return;
        
        this.core.runFrame();
        
        if (this.frameCallback) {
            this.frameCallback();
        }
        
        requestAnimationFrame(() => this.runFrame());
    }
    
    // Read memory address from emulator
    readMemory(address) {
        return this.core.readMemory(address);
    }
    
    readMemory16(address) {
        const low = this.core.readMemory(address);
        const high = this.core.readMemory(address + 1);
        return (high << 8) | low;
    }
    
    // Load SRAM data
    loadSRAM(data) {
        if (data && data.length > 0) {
            this.core.loadSRAM(new Uint8Array(data));
        }
    }
    
    // Get SRAM data for saving
    getSRAM() {
        return Array.from(this.core.getSRAM());
    }
    
    // Set frame callback for event polling
    onFrame(callback) {
        this.frameCallback = callback;
    }
    
    // Input handling
    setButton(player, button, pressed) {
        this.core.setButton(player, button, pressed);
    }
}

// Button mapping
export const SNES_BUTTONS = {
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3,
    A: 4,
    B: 5,
    X: 6,
    Y: 7,
    L: 8,
    R: 9,
    START: 10,
    SELECT: 11
};
```

### js/events.js

```javascript
// Event manager - polls emulator memory and triggers actions

// Memory addresses (must match ROM)
const MEM = {
    GAME_STATE: 0x7E0100,
    CURRENT_CITY: 0x7E0101,
    IN_COMBAT: 0x7E0102,
    IS_BOSS: 0x7E0103,
    LAST_ANSWER: 0x7E0104,
    PARTY_HP: 0x7E0106,
    BOSS_HP: 0x7E0108,
    STREAK: 0x7E010A,
    CITY_COMPLETE: 0x7E010B,
    TRIGGER_SAVE: 0x7E010C,
    TRIGGER_VIDEO: 0x7E010D
};

// Game states (must match ROM)
const STATES = {
    TITLE: 0,
    WORLD_MAP: 1,
    CITY: 2,
    DIALOGUE: 3,
    COMBAT: 4,
    BOSS_COMBAT: 5,
    CUTSCENE: 6,
    MENU: 7,
    GAME_OVER: 8,
    VICTORY: 9
};

// City IDs
const CITIES = {
    NONE: 0,
    TUTORIAL: 1,
    PURDUE: 2,
    PROTOCOL: 3
};

const CITY_NAMES = ['none', 'tutorial', 'purdue_city', 'protocol_port'];

export class EventManager {
    constructor(emulator, audio, saves, cmi5) {
        this.emulator = emulator;
        this.audio = audio;
        this.saves = saves;
        this.cmi5 = cmi5;
        
        this.lastState = -1;
        this.lastCity = -1;
        this.lastCombat = false;
        this.lastBoss = false;
        this.lastAnswer = 0;
        this.videoPlaying = false;
        
        this.cityVideos = {
            1: 'media/videos/tutorial/intro_ics_overview.mp4',
            2: 'media/videos/purdue_city/network_architecture.mp4',
            3: 'media/videos/protocol_port/ics_protocols.mp4'
        };
        
        this.cityMusic = {
            1: 'city_tutorial',
            2: 'city_purdue',
            3: 'city_protocol'
        };
    }
    
    startPolling() {
        this.emulator.onFrame(() => this.poll());
    }
    
    poll() {
        if (this.videoPlaying) return;
        
        const state = this.emulator.readMemory(MEM.GAME_STATE);
        const city = this.emulator.readMemory(MEM.CURRENT_CITY);
        const inCombat = this.emulator.readMemory(MEM.IN_COMBAT);
        const isBoss = this.emulator.readMemory(MEM.IS_BOSS);
        const lastAnswer = this.emulator.readMemory(MEM.LAST_ANSWER);
        const triggerSave = this.emulator.readMemory(MEM.TRIGGER_SAVE);
        const triggerVideo = this.emulator.readMemory(MEM.TRIGGER_VIDEO);
        
        // Update HUD
        this.updateHUD();
        
        // Check for video trigger
        if (triggerVideo > 0) {
            this.playVideo(triggerVideo);
            return;
        }
        
        // Check for save trigger
        if (triggerSave === 1) {
            this.triggerSave();
        }
        
        // State change detection
        if (state !== this.lastState) {
            this.onStateChange(this.lastState, state);
            this.lastState = state;
        }
        
        // City change detection
        if (city !== this.lastCity && city > 0) {
            this.onCityChange(this.lastCity, city);
            this.lastCity = city;
        }
        
        // Combat change detection
        if (inCombat !== this.lastCombat) {
            this.onCombatChange(inCombat, isBoss);
            this.lastCombat = inCombat;
            this.lastBoss = isBoss;
        }
        
        // Answer detection (for xAPI)
        if (lastAnswer !== this.lastAnswer && lastAnswer > 0) {
            this.onAnswer(lastAnswer === 1);
            this.lastAnswer = lastAnswer;
        }
    }
    
    updateHUD() {
        const partyHP = this.emulator.readMemory16(MEM.PARTY_HP);
        const streak = this.emulator.readMemory(MEM.STREAK);
        
        document.getElementById('hp-value').textContent = partyHP;
        document.getElementById('streak-value').textContent = streak;
    }
    
    onStateChange(oldState, newState) {
        console.log(`State change: ${oldState} -> ${newState}`);
        
        switch (newState) {
            case STATES.TITLE:
                this.audio.playMusic('title_theme');
                break;
            case STATES.WORLD_MAP:
                this.audio.playMusic('world_map');
                break;
            case STATES.VICTORY:
                this.audio.playSFX('victory');
                this.onCityComplete();
                break;
            case STATES.GAME_OVER:
                this.audio.playSFX('defeat');
                break;
        }
    }
    
    onCityChange(oldCity, newCity) {
        console.log(`City change: ${oldCity} -> ${newCity}`);
        
        this.audio.playSFX('city_enter');
        
        // Play city music
        const musicTrack = this.cityMusic[newCity];
        if (musicTrack) {
            this.audio.playMusic(musicTrack);
        }
    }
    
    onCombatChange(inCombat, isBoss) {
        if (inCombat) {
            if (isBoss) {
                this.audio.playMusic('boss_battle');
            } else {
                this.audio.playMusic('battle');
            }
        } else {
            // Return to city music
            const city = this.emulator.readMemory(MEM.CURRENT_CITY);
            const musicTrack = this.cityMusic[city];
            if (musicTrack) {
                this.audio.playMusic(musicTrack);
            }
        }
    }
    
    onAnswer(correct) {
        if (correct) {
            this.audio.playSFX('attack_correct');
            const streak = this.emulator.readMemory(MEM.STREAK);
            if (streak >= 5) {
                this.audio.playSFX('attack_critical');
            }
        } else {
            this.audio.playSFX('damage_taken');
        }
        
        // Send xAPI statement
        this.cmi5.sendAnswered(correct);
        
        // Reset answer flag will happen in ROM
    }
    
    async onCityComplete() {
        const city = this.emulator.readMemory(MEM.CURRENT_CITY);
        const cityName = CITY_NAMES[city];
        
        // Calculate score
        const partyHP = this.emulator.readMemory16(MEM.PARTY_HP);
        const scorePercent = partyHP / 400;  // Based on remaining HP
        
        // Send cmi5 completion
        await this.cmi5.sendCompleted(cityName, scorePercent);
        
        // Trigger save
        this.triggerSave();
    }
    
    async triggerSave() {
        const sram = this.emulator.getSRAM();
        const city = this.emulator.readMemory(MEM.CURRENT_CITY);
        const citiesComplete = this.emulator.readMemory(MEM.CITY_COMPLETE);
        
        await this.saves.save({
            sram: sram,
            currentCity: city,
            citiesComplete: citiesComplete,
            timestamp: new Date().toISOString()
        });
    }
    
    playVideo(cityId) {
        const videoPath = this.cityVideos[cityId];
        if (!videoPath) return;
        
        this.videoPlaying = true;
        this.emulator.stop();
        this.audio.pauseMusic();
        
        const overlay = document.getElementById('video-overlay');
        const video = document.getElementById('cutscene-video');
        
        video.src = videoPath;
        overlay.classList.remove('hidden');
        
        video.play();
        
        video.onended = () => {
            this.skipVideo();
        };
    }
    
    skipVideo() {
        const overlay = document.getElementById('video-overlay');
        const video = document.getElementById('cutscene-video');
        
        video.pause();
        overlay.classList.add('hidden');
        
        this.videoPlaying = false;
        this.emulator.start();
        this.audio.resumeMusic();
    }
}
```

### js/audio.js

```javascript
// Audio manager for music and SFX

export class AudioManager {
    constructor() {
        this.musicTracks = {};
        this.sfxSounds = {};
        this.currentMusic = null;
        this.musicVolume = 0.7;
        this.sfxVolume = 1.0;
    }
    
    async preloadAll() {
        // Music tracks
        const musicFiles = [
            'title_theme', 'world_map', 'city_tutorial', 'city_purdue',
            'city_protocol', 'battle', 'boss_battle', 'cutscene',
            'victory', 'defeat'
        ];
        
        for (const name of musicFiles) {
            this.musicTracks[name] = new Audio(`media/audio/music/${name}.mp3`);
            this.musicTracks[name].loop = !['victory', 'defeat'].includes(name);
            this.musicTracks[name].volume = this.musicVolume;
        }
        
        // SFX
        const sfxFiles = [
            'menu_select', 'menu_confirm', 'menu_cancel',
            'attack_correct', 'attack_critical', 'damage_taken',
            'boss_taunt', 'npc_talk', 'city_enter', 'save_point'
        ];
        
        for (const name of sfxFiles) {
            this.sfxSounds[name] = new Audio(`media/audio/sfx/${name}.mp3`);
            this.sfxSounds[name].volume = this.sfxVolume;
        }
        
        // Wait for all to load
        await Promise.all([
            ...Object.values(this.musicTracks).map(a => this.waitForLoad(a)),
            ...Object.values(this.sfxSounds).map(a => this.waitForLoad(a))
        ]);
    }
    
    waitForLoad(audio) {
        return new Promise((resolve, reject) => {
            audio.addEventListener('canplaythrough', resolve, { once: true });
            audio.addEventListener('error', reject, { once: true });
            audio.load();
        });
    }
    
    playMusic(name) {
        // Stop current music
        if (this.currentMusic) {
            this.currentMusic.pause();
            this.currentMusic.currentTime = 0;
        }
        
        const track = this.musicTracks[name];
        if (track) {
            track.volume = this.musicVolume;
            track.play().catch(e => console.warn('Music autoplay blocked:', e));
            this.currentMusic = track;
        }
    }
    
    pauseMusic() {
        if (this.currentMusic) {
            this.currentMusic.pause();
        }
    }
    
    resumeMusic() {
        if (this.currentMusic) {
            this.currentMusic.play().catch(e => console.warn('Music resume blocked:', e));
        }
    }
    
    playSFX(name) {
        const sfx = this.sfxSounds[name];
        if (sfx) {
            // Clone to allow overlapping sounds
            const sound = sfx.cloneNode();
            sound.volume = this.sfxVolume;
            sound.play().catch(e => console.warn('SFX play failed:', e));
        }
    }
    
    setMusicVolume(vol) {
        this.musicVolume = vol;
        if (this.currentMusic) {
            this.currentMusic.volume = vol;
        }
    }
    
    setSFXVolume(vol) {
        this.sfxVolume = vol;
    }
}
```

### js/cmi5.js

```javascript
// cmi5/xAPI integration

export class CMI5Manager {
    constructor() {
        this.endpoint = null;
        this.fetchUrl = null;
        this.actor = null;
        this.registration = null;
        this.activityId = null;
        this.authToken = null;
        this.sessionId = null;
        this.initialized = false;
        
        this.questionsAnswered = 0;
        this.questionsCorrect = 0;
        this.sessionStart = null;
    }
    
    async initialize() {
        // Parse launch parameters from URL
        const params = new URLSearchParams(window.location.search);
        
        this.endpoint = params.get('endpoint');
        this.fetchUrl = params.get('fetch');
        this.actor = params.get('actor');
        this.registration = params.get('registration');
        this.activityId = params.get('activityId');
        
        // If no cmi5 params, run in standalone mode
        if (!this.endpoint || !this.fetchUrl) {
            console.log('Running in standalone mode (no LMS)');
            return;
        }
        
        // Fetch auth token
        try {
            const response = await fetch(this.fetchUrl);
            const data = await response.json();
            this.authToken = data['auth-token'];
            this.sessionId = this.generateUUID();
            this.sessionStart = new Date();
            this.initialized = true;
            console.log('cmi5 initialized');
        } catch (e) {
            console.error('Failed to fetch cmi5 auth token:', e);
        }
    }
    
    async sendStatement(statement) {
        if (!this.initialized) return;
        
        // Add required cmi5 context
        statement.actor = JSON.parse(this.actor);
        statement.context = {
            registration: this.registration,
            contextActivities: {
                category: [{
                    id: 'https://w3id.org/xapi/cmi5/context/categories/cmi5'
                }]
            },
            extensions: {
                'https://w3id.org/xapi/cmi5/context/extensions/sessionid': this.sessionId
            }
        };
        
        try {
            await fetch(`${this.endpoint}statements`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${this.authToken}`,
                    'X-Experience-API-Version': '1.0.3'
                },
                body: JSON.stringify(statement)
            });
        } catch (e) {
            console.error('Failed to send xAPI statement:', e);
        }
    }
    
    async sendInitialized() {
        await this.sendStatement({
            verb: {
                id: 'http://adlnet.gov/expapi/verbs/initialized',
                display: { 'en-US': 'initialized' }
            },
            object: {
                id: this.activityId,
                objectType: 'Activity'
            }
        });
    }
    
    async sendAnswered(correct) {
        this.questionsAnswered++;
        if (correct) this.questionsCorrect++;
        
        await this.sendStatement({
            verb: {
                id: 'http://adlnet.gov/expapi/verbs/answered',
                display: { 'en-US': 'answered' }
            },
            object: {
                id: `${this.activityId}/question/${this.questionsAnswered}`,
                objectType: 'Activity',
                definition: {
                    type: 'http://adlnet.gov/expapi/activities/cmi.interaction',
                    interactionType: 'choice'
                }
            },
            result: {
                success: correct,
                extensions: {
                    'https://cyberguard.training/xapi/extensions/streak': 0  // Could track actual streak
                }
            }
        });
    }
    
    async sendCompleted(cityName, scorePercent) {
        const passed = scorePercent >= 0.7;
        const duration = this.getISODuration();
        
        await this.sendStatement({
            verb: {
                id: passed 
                    ? 'http://adlnet.gov/expapi/verbs/passed'
                    : 'http://adlnet.gov/expapi/verbs/failed',
                display: { 'en-US': passed ? 'passed' : 'failed' }
            },
            object: {
                id: `${this.activityId}/city/${cityName}`,
                objectType: 'Activity'
            },
            result: {
                success: passed,
                completion: true,
                score: {
                    scaled: scorePercent,
                    raw: this.questionsCorrect,
                    max: this.questionsAnswered
                },
                duration: duration
            }
        });
    }
    
    async sendTerminated() {
        if (!this.initialized) return;
        
        await this.sendStatement({
            verb: {
                id: 'http://adlnet.gov/expapi/verbs/terminated',
                display: { 'en-US': 'terminated' }
            },
            object: {
                id: this.activityId,
                objectType: 'Activity'
            },
            result: {
                duration: this.getISODuration()
            }
        });
    }
    
    getISODuration() {
        if (!this.sessionStart) return 'PT0S';
        const ms = Date.now() - this.sessionStart.getTime();
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        
        if (hours > 0) {
            return `PT${hours}H${minutes % 60}M${seconds % 60}S`;
        } else if (minutes > 0) {
            return `PT${minutes}M${seconds % 60}S`;
        } else {
            return `PT${seconds}S`;
        }
    }
    
    generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}

// Send terminated on page unload
window.addEventListener('beforeunload', () => {
    if (window.game && window.game.cmi5) {
        window.game.cmi5.sendTerminated();
    }
});
```

### js/saves.js

```javascript
// Save manager using IndexedDB

const DB_NAME = 'ICSDefenderSaves';
const DB_VERSION = 1;
const STORE_NAME = 'saves';

export class SaveManager {
    constructor() {
        this.db = null;
    }
    
    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve();
            };
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
                    store.createIndex('timestamp', 'timestamp', { unique: false });
                }
            };
        });
    }
    
    async save(data) {
        return new Promise((resolve, reject) => {
            const tx = this.db.transaction(STORE_NAME, 'readwrite');
            const store = tx.objectStore(STORE_NAME);
            
            const saveData = {
                ...data,
                timestamp: new Date().toISOString()
            };
            
            const request = store.add(saveData);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }
    
    async loadLatest() {
        return new Promise((resolve, reject) => {
            const tx = this.db.transaction(STORE_NAME, 'readonly');
            const store = tx.objectStore(STORE_NAME);
            const index = store.index('timestamp');
            
            const request = index.openCursor(null, 'prev');
            request.onsuccess = () => {
                const cursor = request.result;
                if (cursor) {
                    resolve(cursor.value);
                } else {
                    resolve(null);
                }
            };
            request.onerror = () => reject(request.error);
        });
    }
    
    async exportSave() {
        const latest = await this.loadLatest();
        return latest;
    }
    
    async importSave(data) {
        await this.save(data);
    }
    
    async clearAll() {
        return new Promise((resolve, reject) => {
            const tx = this.db.transaction(STORE_NAME, 'readwrite');
            const store = tx.objectStore(STORE_NAME);
            const request = store.clear();
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }
}
```

---

## Data Contracts

### Save Data Format (ROM ↔ Web Wrapper)

```javascript
// Save data JSON structure (for export/import)
{
    "version": "1.0",
    "timestamp": "2025-01-17T10:30:00Z",
    "sram": [/* Array of bytes from SRAM */],
    "currentCity": 2,
    "citiesComplete": 3,  // Bitmask: 0b011 = tutorial + purdue
    "player": {
        "partyHP": 350
    },
    "progress": {
        "tutorial": {
            "npcsCompleted": 7,  // Bitmask
            "bossDefeated": true,
            "questionsAnswered": 15,
            "questionsCorrect": 12
        },
        "purdue_city": {
            "npcsCompleted": 3,
            "bossDefeated": false,
            "questionsAnswered": 8,
            "questionsCorrect": 5
        }
    },
    "statistics": {
        "totalPlayTime": 7200,
        "totalQuestionsAnswered": 23,
        "totalCorrect": 17,
        "bestStreak": 5
    }
}
```

### Question JSON Format (Source)

Located in `docs/QUESTION_BANKS/*.json` - these get compiled to binary for ROM.

```javascript
{
    "id": "TUT001",
    "type": "multiple_choice",  // or "true_false", "matching", "sequence"
    "difficulty": 2,
    "concept": "ICS Definition",
    "question": "What does ICS stand for?",
    "options": [
        "Internet Control Systems",
        "Industrial Control Systems",  // Index 1 = correct
        "Integrated Computer Services",
        "Internal Communication Standards"
    ],
    "correctIndex": 1,
    "explanation": "ICS stands for Industrial Control Systems...",
    "enemyTaunt": "You don't even know what ICS stands for?..."
}
```

### Memory Address Map (ROM ↔ Web Wrapper)

| Address | Size | Name | Description |
|---------|------|------|-------------|
| 0x7E0100 | 1 | GAME_STATE | Current game state enum |
| 0x7E0101 | 1 | CURRENT_CITY | Current city ID |
| 0x7E0102 | 1 | IN_COMBAT | 1 if in combat |
| 0x7E0103 | 1 | IS_BOSS | 1 if boss battle |
| 0x7E0104 | 1 | LAST_ANSWER | 0=none, 1=correct, 2=wrong |
| 0x7E0106 | 2 | PARTY_HP | Party HP (little-endian) |
| 0x7E0108 | 2 | BOSS_HP | Enemy HP (little-endian) |
| 0x7E010A | 1 | STREAK | Current correct streak |
| 0x7E010B | 1 | CITY_COMPLETE | Bitmask of completed cities |
| 0x7E010C | 1 | TRIGGER_SAVE | Set to 1 to request save |
| 0x7E010D | 1 | TRIGGER_VIDEO | Set to city ID to play video |

---

## Key Algorithms

### Question Randomization

```python
# tools/json_to_bin.py - Convert JSON questions to ROM binary

import json
import struct

def compile_questions(json_path, bin_path):
    with open(json_path, 'r') as f:
        data = json.load(f)
    
    questions = data['questions']
    
    with open(bin_path, 'wb') as f:
        # Header: question count
        f.write(struct.pack('<B', len(questions)))
        
        for q in questions:
            # Question type (1 byte)
            type_map = {'multiple_choice': 0, 'true_false': 1, 'matching': 2, 'sequence': 3}
            f.write(struct.pack('<B', type_map.get(q['type'], 0)))
            
            # Difficulty (1 byte)
            f.write(struct.pack('<B', q['difficulty']))
            
            # Correct index (1 byte)
            f.write(struct.pack('<B', q['correctIndex']))
            
            # Question text (null-terminated, max 200 chars)
            q_text = q['question'][:199].encode('ascii', 'replace') + b'\x00'
            f.write(q_text.ljust(200, b'\x00'))
            
            # Options (4 x 60 chars each)
            for i in range(4):
                opt = q['options'][i] if i < len(q['options']) else ''
                opt_bytes = opt[:59].encode('ascii', 'replace') + b'\x00'
                f.write(opt_bytes.ljust(60, b'\x00'))
            
            # Enemy taunt (null-terminated, max 300 chars)
            taunt = q.get('enemyTaunt', '')[:299].encode('ascii', 'replace') + b'\x00'
            f.write(taunt.ljust(300, b'\x00'))

if __name__ == '__main__':
    import sys
    compile_questions(sys.argv[1], sys.argv[2])
```

### Damage Calculation

```c
// In combat.c
u16 calculateDamage(u8 streak, bool isBoss) {
    u16 baseDamage = isBoss ? 10 : 15;
    
    if (streak >= 5) {
        return baseDamage * 2;    // 2x damage
    } else if (streak >= 3) {
        return (baseDamage * 3) / 2;  // 1.5x damage
    }
    
    return baseDamage;
}

u16 calculatePlayerDamage(bool isBoss) {
    return isBoss ? 30 : 20;  // Bosses hit harder
}
```

### Mastery Score Calculation

```javascript
// In cmi5.js
function calculateMasteryScore(questionsCorrect, questionsTotal, remainingHP, maxHP) {
    // 60% weight on accuracy, 40% on efficiency (HP remaining)
    const accuracy = questionsCorrect / questionsTotal;
    const efficiency = remainingHP / maxHP;
    
    return (accuracy * 0.6) + (efficiency * 0.4);
}

// Pass threshold: 0.7 (70%)
// Master threshold: 0.9 (90%)
```

---

## Build & Deploy

### Build ROM

```bash
cd rom
make data    # Compile question JSON to binary
make gfx     # Convert graphics
make         # Build ROM
make deploy  # Copy to emulator folder
```

### Build Web Wrapper

```bash
cd emulator
npm install   # Install dependencies (if using bundler)
npm run build # Build for production
```

### Deploy to GitHub Pages

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18
      
      - name: Install dependencies
        run: |
          cd emulator
          npm install
      
      - name: Build
        run: |
          cd emulator
          npm run build
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./emulator/dist
```

---

## Testing Checklist

### ROM Testing
- [ ] Game boots to title screen
- [ ] New game initializes correctly
- [ ] World map navigation works
- [ ] City entry triggers correctly
- [ ] NPC dialogue displays properly
- [ ] Combat starts and ends correctly
- [ ] Questions display with all 4 options
- [ ] Timer works in boss battles only
- [ ] Correct/wrong answers process properly
- [ ] Streak tracking works
- [ ] Cipher's Detect ability works (once per battle)
- [ ] Victory/defeat states trigger
- [ ] Save/load works via SRAM
- [ ] Memory addresses update correctly

### Web Wrapper Testing
- [ ] ROM loads and runs
- [ ] Audio preloads successfully
- [ ] Music plays on state changes
- [ ] SFX play on events
- [ ] Video overlay works
- [ ] Save export/import works
- [ ] IndexedDB persistence works
- [ ] Volume controls work
- [ ] Fullscreen works

### cmi5 Testing
- [ ] Launch parameters parse correctly
- [ ] Auth token fetches successfully
- [ ] Initialized statement sends
- [ ] Answered statements send on each question
- [ ] Completed statement sends on city clear
- [ ] Terminated statement sends on page unload
- [ ] Statements have correct actor/context
- [ ] Score calculations are accurate

### Integration Testing
- [ ] Full playthrough Tutorial city
- [ ] Full playthrough Purdue City
- [ ] Full playthrough Protocol Port
- [ ] Save persists across sessions
- [ ] LMS receives all expected statements

---

## Contact / Questions

Content questions → Continue with Claude.ai (this conversation)
Technical blockers → Document in repo issues

**Existing Data Files:**
- `docs/QUESTION_BANKS/tutorial_questions.json` (25 questions)
- `docs/QUESTION_BANKS/purdue_city_questions.json` (25 questions)
- `docs/QUESTION_BANKS/protocol_port_questions.json` (25 questions)
- `docs/DIALOGUE/tutorial_dialogue.json` (full NPC dialogues)
- `lms/cmi5.xml` (course manifest)

**To Be Created by Claude.ai:**
- `docs/DIALOGUE/purdue_dialogue.json`
- `docs/DIALOGUE/protocol_dialogue.json`
- Additional questions if needed
- Asset sourcing recommendations

---

*End of Developer Handoff Document*
