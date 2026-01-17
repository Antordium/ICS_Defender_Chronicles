// ============================================
// ICS DEFENDER CHRONICLES - COMBAT SYSTEM
// ============================================

const CombatSystem = {
    // Combat state
    active: false,
    isBoss: false,
    bossId: null,

    // Combat phases
    phase: 'intro', // intro, question, waiting, result_correct, result_wrong, enemy_speak, victory, defeat

    // Enemy data
    enemy: null,

    // Question data
    currentQuestion: null,
    selectedAnswer: 0,
    questions: [],
    usedQuestions: [],

    // Timer (boss only)
    timerActive: false,
    timeLeft: 0,
    maxTime: Combat.BOSS_TIMER_SECONDS,

    // Stats
    streak: 0,
    questionsAnswered: 0,
    questionsCorrect: 0,
    detectUsed: false,
    detectHighlight: -1,

    // Animation
    resultTimer: 0,
    resultDuration: 1.5,

    // Callbacks
    onVictory: null,
    onDefeat: null,

    // Start combat
    start(bossId, questions, partyHP, isBoss = true, onVictory = null, onDefeat = null) {
        this.active = true;
        this.isBoss = isBoss;
        this.bossId = bossId;
        this.phase = 'intro';

        // Get boss data
        const bossData = Bosses[bossId];
        this.enemy = new Sprites.EnemySprite(
            bossId,
            bossData.name,
            bossData.title,
            bossData.hp,
            bossData.hp,
            bossData.color
        );

        // Setup questions
        this.questions = [...questions];
        this.usedQuestions = [];

        // Reset stats
        this.streak = 0;
        this.questionsAnswered = 0;
        this.questionsCorrect = 0;
        this.detectUsed = false;
        this.detectHighlight = -1;
        this.selectedAnswer = 0;

        // Timer for boss only
        this.timerActive = isBoss;
        this.timeLeft = this.maxTime;

        // Callbacks
        this.onVictory = onVictory;
        this.onDefeat = onDefeat;

        // Play boss music
        Audio.playMusic(isBoss ? 'boss_battle' : 'battle');
    },

    // Load next question
    loadNextQuestion() {
        // Get unused questions
        const available = this.questions.filter((q, i) => !this.usedQuestions.includes(i));

        if (available.length === 0) {
            // Reuse questions if we run out
            this.usedQuestions = [];
        }

        // Pick random question
        const availableIndices = this.questions
            .map((q, i) => i)
            .filter(i => !this.usedQuestions.includes(i));

        const questionIndex = Utils.randomChoice(availableIndices);
        this.usedQuestions.push(questionIndex);

        const question = Utils.deepClone(this.questions[questionIndex]);

        // Shuffle answer order
        const correctAnswer = question.options[question.correctIndex];
        const shuffledOptions = Utils.shuffle(question.options);
        question.options = shuffledOptions;
        question.correctIndex = shuffledOptions.indexOf(correctAnswer);

        this.currentQuestion = question;
        this.selectedAnswer = 0;
        this.detectHighlight = -1;
        this.timeLeft = this.maxTime;
    },

    // Process correct answer
    processCorrectAnswer(gameState) {
        this.streak++;
        this.questionsCorrect++;
        this.questionsAnswered++;

        // Calculate damage with streak bonus
        let damage = Combat.BASE_DAMAGE;
        if (this.streak >= 5) {
            damage *= Combat.STREAK_BONUS_5;
            Audio.playSFX('critical');
        } else if (this.streak >= 3) {
            damage *= Combat.STREAK_BONUS_3;
            Audio.playSFX('correct');
        } else {
            Audio.playSFX('correct');
        }

        // Deal damage to enemy
        this.enemy.hp -= Math.floor(damage);
        this.enemy.hit();
        if (this.enemy.hp < 0) this.enemy.hp = 0;

        // Update game stats
        gameState.statistics.totalCorrect++;
        if (this.streak > gameState.statistics.bestStreak) {
            gameState.statistics.bestStreak = this.streak;
        }

        this.phase = 'result_correct';
        this.resultTimer = 0;

        Renderer.shake(5);
    },

    // Process wrong answer
    processWrongAnswer(gameState) {
        this.streak = 0;
        this.questionsAnswered++;

        // Take damage
        gameState.partyHP -= Combat.PLAYER_DAMAGE;
        if (gameState.partyHP < 0) gameState.partyHP = 0;

        Audio.playSFX('damage');
        Renderer.shake(10);

        this.phase = 'result_wrong';
        this.resultTimer = 0;
    },

    // Use Cipher's Detect ability
    useDetect() {
        if (!this.detectUsed && this.phase === 'question') {
            this.detectUsed = true;
            this.detectHighlight = this.currentQuestion.correctIndex;
            Audio.playSFX('menu_confirm');
            return true;
        }
        return false;
    },

    // Update combat
    update(deltaTime, gameState) {
        if (!this.active) return;

        this.enemy.update(deltaTime);

        switch (this.phase) {
            case 'intro':
                // Wait for player input to start
                if (Input.isPressed('a')) {
                    this.loadNextQuestion();
                    this.phase = 'question';
                    Audio.playSFX('menu_confirm');
                }
                break;

            case 'question':
                // Timer countdown (boss only)
                if (this.timerActive) {
                    this.timeLeft -= deltaTime;
                    if (this.timeLeft <= 0) {
                        this.timeLeft = 0;
                        this.processWrongAnswer(gameState);
                    }
                }

                // Navigate answers
                if (Input.isPressed('up')) {
                    this.selectedAnswer = (this.selectedAnswer - 1 + 4) % 4;
                    Audio.playSFX('menu_select');
                }
                if (Input.isPressed('down')) {
                    this.selectedAnswer = (this.selectedAnswer + 1) % 4;
                    Audio.playSFX('menu_select');
                }

                // Submit answer
                if (Input.isPressed('a')) {
                    if (this.selectedAnswer === this.currentQuestion.correctIndex) {
                        this.processCorrectAnswer(gameState);
                    } else {
                        this.processWrongAnswer(gameState);
                    }
                }

                // Cipher's Detect ability (L button)
                if (Input.isPressed('l')) {
                    this.useDetect();
                }
                break;

            case 'result_correct':
                this.resultTimer += deltaTime;
                if (this.resultTimer >= this.resultDuration) {
                    if (this.enemy.hp <= 0) {
                        this.phase = 'victory';
                    } else {
                        this.loadNextQuestion();
                        this.phase = 'question';
                    }
                }
                break;

            case 'result_wrong':
                this.resultTimer += deltaTime;
                if (this.resultTimer >= this.resultDuration) {
                    if (gameState.partyHP <= 0) {
                        this.phase = 'defeat';
                    } else {
                        this.phase = 'enemy_speak';
                    }
                }
                break;

            case 'enemy_speak':
                if (Input.isPressed('a')) {
                    if (gameState.partyHP <= 0) {
                        this.phase = 'defeat';
                    } else {
                        this.loadNextQuestion();
                        this.phase = 'question';
                    }
                    Audio.playSFX('menu_confirm');
                }
                break;

            case 'victory':
                if (Input.isPressed('a')) {
                    this.end(true, gameState);
                }
                break;

            case 'defeat':
                if (Input.isPressed('a')) {
                    this.end(false, gameState);
                }
                break;
        }
    },

    // End combat
    end(victory, gameState) {
        this.active = false;

        if (victory && this.onVictory) {
            this.onVictory(gameState);
        } else if (!victory && this.onDefeat) {
            this.onDefeat(gameState);
        }
    },

    // Draw combat screen
    draw(time, gameState) {
        if (!this.active) return;

        // Background
        Renderer.clear('#0a0a1a');

        // Grid pattern background
        Renderer.ctx.strokeStyle = 'rgba(0, 255, 136, 0.1)';
        Renderer.ctx.lineWidth = 1;
        for (let i = 0; i < CANVAS_WIDTH; i += 32) {
            Renderer.ctx.beginPath();
            Renderer.ctx.moveTo(i, 0);
            Renderer.ctx.lineTo(i, CANVAS_HEIGHT);
            Renderer.ctx.stroke();
        }
        for (let i = 0; i < CANVAS_HEIGHT; i += 32) {
            Renderer.ctx.beginPath();
            Renderer.ctx.moveTo(0, i);
            Renderer.ctx.lineTo(CANVAS_WIDTH, i);
            Renderer.ctx.stroke();
        }

        // Draw enemy
        this.enemy.draw(Renderer.ctx, time);

        // Draw based on phase
        switch (this.phase) {
            case 'intro':
                this.drawIntro(time);
                break;

            case 'question':
                this.drawQuestion(time, gameState);
                break;

            case 'result_correct':
                this.drawResultCorrect(time, gameState);
                break;

            case 'result_wrong':
                this.drawResultWrong(time, gameState);
                break;

            case 'enemy_speak':
                this.drawEnemySpeak(time);
                break;

            case 'victory':
                this.drawVictory(time);
                break;

            case 'defeat':
                this.drawDefeat(time);
                break;
        }

        // Draw party HP
        this.drawPartyHP(gameState);

        // Draw streak
        if (this.streak > 0) {
            Renderer.ctx.fillStyle = this.streak >= 5 ? Colors.WARNING : Colors.PRIMARY;
            Renderer.ctx.font = 'bold 16px "Courier New", monospace';
            Renderer.ctx.textAlign = 'right';
            Renderer.ctx.fillText(`STREAK: ${this.streak}x`, CANVAS_WIDTH - 20, 20);
        }

        // Draw Detect indicator
        if (!this.detectUsed && this.phase === 'question') {
            Renderer.ctx.fillStyle = Colors.SECONDARY;
            Renderer.ctx.font = '12px "Courier New", monospace';
            Renderer.ctx.textAlign = 'left';
            Renderer.ctx.fillText('[L] DETECT (CIPHER)', 20, 20);
        } else if (this.detectUsed) {
            Renderer.ctx.fillStyle = Colors.TEXT_DIM;
            Renderer.ctx.font = '12px "Courier New", monospace';
            Renderer.ctx.textAlign = 'left';
            Renderer.ctx.fillText('[DETECT USED]', 20, 20);
        }
    },

    // Draw intro phase
    drawIntro(time) {
        const boxY = CANVAS_HEIGHT - 150;

        Renderer.drawBox(20, boxY, CANVAS_WIDTH - 40, 130);

        Renderer.ctx.fillStyle = Colors.DANGER;
        Renderer.ctx.font = 'bold 20px "Courier New", monospace';
        Renderer.ctx.textAlign = 'center';
        Renderer.ctx.fillText('THREAT DETECTED!', CANVAS_WIDTH / 2, boxY + 30);

        Renderer.ctx.fillStyle = Colors.TEXT;
        Renderer.ctx.font = '14px "Courier New", monospace';
        Renderer.ctx.fillText(`${this.enemy.name} - ${this.enemy.title}`, CANVAS_WIDTH / 2, boxY + 60);
        Renderer.ctx.fillText('Answer questions correctly to defeat the enemy!', CANVAS_WIDTH / 2, boxY + 85);

        Renderer.ctx.fillStyle = Colors.PRIMARY;
        const bounce = Math.sin(time * 5) * 3;
        Renderer.ctx.fillText('Press [Z] to begin', CANVAS_WIDTH / 2, boxY + 110 + bounce);
    },

    // Draw question phase
    drawQuestion(time, gameState) {
        const q = this.currentQuestion;
        if (!q) return;

        // Timer bar (boss only)
        if (this.timerActive) {
            Renderer.drawTimerBar(20, 195, CANVAS_WIDTH - 40, 12, this.timeLeft, this.maxTime);
            Renderer.ctx.fillStyle = this.timeLeft < 10 ? Colors.DANGER : Colors.TEXT;
            Renderer.ctx.font = '14px "Courier New", monospace';
            Renderer.ctx.textAlign = 'center';
            Renderer.ctx.fillText(`TIME: ${this.timeLeft.toFixed(1)}s`, CANVAS_WIDTH / 2, 180);
        }

        // Question box
        const qBoxY = 215;
        Renderer.drawBox(20, qBoxY, CANVAS_WIDTH - 40, 80);

        // Question text
        Renderer.ctx.fillStyle = Colors.TEXT;
        Renderer.ctx.font = '14px "Courier New", monospace';
        Renderer.ctx.textAlign = 'left';

        const lines = Utils.wrapText(q.question, 50);
        for (let i = 0; i < lines.length; i++) {
            Renderer.ctx.fillText(lines[i], 40, qBoxY + 20 + i * 20);
        }

        // Answer options (positioned above HP bar area)
        const optY = 300;
        const optHeight = 28;

        for (let i = 0; i < q.options.length; i++) {
            const y = optY + i * (optHeight + 5);
            const isSelected = i === this.selectedAnswer;
            const isDetectHighlight = i === this.detectHighlight;

            // Background
            if (isSelected) {
                Renderer.drawSelectionHighlight(30, y, CANVAS_WIDTH - 60, optHeight, time);
            } else if (isDetectHighlight) {
                Renderer.ctx.fillStyle = 'rgba(0, 200, 255, 0.3)';
                Renderer.ctx.fillRect(30, y, CANVAS_WIDTH - 60, optHeight);
            }

            // Option text
            const letter = String.fromCharCode(65 + i);
            Renderer.ctx.fillStyle = isSelected ? Colors.PRIMARY : Colors.TEXT;
            Renderer.ctx.font = isSelected ? 'bold 14px "Courier New", monospace' : '14px "Courier New", monospace';
            Renderer.ctx.textAlign = 'left';
            Renderer.ctx.fillText(`${letter}) ${q.options[i]}`, 50, y + 10);

            // Detect highlight indicator
            if (isDetectHighlight) {
                Renderer.ctx.fillStyle = Colors.SECONDARY;
                Renderer.ctx.fillText(' [DETECTED]', 430, y + 10);
            }
        }

        // Cursor
        const cursorY = optY + this.selectedAnswer * (optHeight + 5);
        Renderer.drawCursor(25, cursorY - 5, time);
    },

    // Draw correct result
    drawResultCorrect(time, gameState) {
        Renderer.drawBox(100, 200, CANVAS_WIDTH - 200, 100);

        Renderer.ctx.fillStyle = Colors.CORRECT;
        Renderer.ctx.font = 'bold 24px "Courier New", monospace';
        Renderer.ctx.textAlign = 'center';
        Renderer.ctx.fillText('CORRECT!', CANVAS_WIDTH / 2, 235);

        let damageText = `${Combat.BASE_DAMAGE} damage`;
        if (this.streak >= 5) {
            damageText = `${Math.floor(Combat.BASE_DAMAGE * Combat.STREAK_BONUS_5)} damage (2x STREAK!)`;
            Renderer.ctx.fillStyle = Colors.WARNING;
        } else if (this.streak >= 3) {
            damageText = `${Math.floor(Combat.BASE_DAMAGE * Combat.STREAK_BONUS_3)} damage (1.5x streak)`;
        }

        Renderer.ctx.font = '16px "Courier New", monospace';
        Renderer.ctx.fillText(damageText, CANVAS_WIDTH / 2, 270);
    },

    // Draw wrong result
    drawResultWrong(time, gameState) {
        Renderer.drawBox(100, 200, CANVAS_WIDTH - 200, 120);

        Renderer.ctx.fillStyle = Colors.DANGER;
        Renderer.ctx.font = 'bold 24px "Courier New", monospace';
        Renderer.ctx.textAlign = 'center';
        Renderer.ctx.fillText('WRONG!', CANVAS_WIDTH / 2, 235);

        Renderer.ctx.fillStyle = Colors.TEXT;
        Renderer.ctx.font = '14px "Courier New", monospace';
        Renderer.ctx.fillText(`The correct answer was:`, CANVAS_WIDTH / 2, 265);

        Renderer.ctx.fillStyle = Colors.CORRECT;
        const correctAnswer = this.currentQuestion.options[this.currentQuestion.correctIndex];
        Renderer.ctx.fillText(correctAnswer, CANVAS_WIDTH / 2, 290);
    },

    // Draw enemy taunt
    drawEnemySpeak(time) {
        const boxY = CANVAS_HEIGHT - 140;

        Renderer.drawBox(20, boxY, CANVAS_WIDTH - 40, 120);

        // Get random taunt
        const taunts = BossTaunts[this.bossId] || ['Wrong answer!'];
        const taunt = taunts[this.questionsAnswered % taunts.length];

        // Draw enemy portrait
        Renderer.drawPortrait(35, boxY + 15, 64, this.enemy.color, this.enemy.name);

        // Draw taunt text
        Renderer.ctx.fillStyle = this.enemy.color;
        Renderer.ctx.font = 'bold 14px "Courier New", monospace';
        Renderer.ctx.textAlign = 'left';
        Renderer.ctx.fillText(this.enemy.name, 115, boxY + 20);

        Renderer.ctx.fillStyle = Colors.TEXT;
        Renderer.ctx.font = '12px "Courier New", monospace';

        const lines = Utils.wrapText(taunt, 40);
        for (let i = 0; i < lines.length; i++) {
            Renderer.ctx.fillText(lines[i], 115, boxY + 45 + i * 18);
        }

        // Continue prompt
        Renderer.ctx.fillStyle = Colors.PRIMARY;
        Renderer.ctx.textAlign = 'center';
        const bounce = Math.sin(time * 5) * 2;
        Renderer.ctx.fillText('Press [Z] to continue', CANVAS_WIDTH / 2, boxY + 105 + bounce);
    },

    // Draw victory
    drawVictory(time) {
        Renderer.drawBox(80, 150, CANVAS_WIDTH - 160, 180);

        Renderer.ctx.fillStyle = Colors.PRIMARY;
        Renderer.ctx.font = 'bold 28px "Courier New", monospace';
        Renderer.ctx.textAlign = 'center';
        Renderer.ctx.fillText('VICTORY!', CANVAS_WIDTH / 2, 195);

        Renderer.ctx.fillStyle = Colors.TEXT;
        Renderer.ctx.font = '16px "Courier New", monospace';
        Renderer.ctx.fillText(`${this.enemy.name} defeated!`, CANVAS_WIDTH / 2, 235);

        Renderer.ctx.font = '14px "Courier New", monospace';
        Renderer.ctx.fillText(`Questions: ${this.questionsCorrect}/${this.questionsAnswered} correct`, CANVAS_WIDTH / 2, 270);
        Renderer.ctx.fillText(`Best Streak: ${this.streak}`, CANVAS_WIDTH / 2, 295);

        Renderer.ctx.fillStyle = Colors.PRIMARY;
        const bounce = Math.sin(time * 5) * 2;
        Renderer.ctx.fillText('Press [Z] to continue', CANVAS_WIDTH / 2, 320 + bounce);
    },

    // Draw defeat
    drawDefeat(time) {
        Renderer.drawBox(80, 150, CANVAS_WIDTH - 160, 150);

        Renderer.ctx.fillStyle = Colors.DANGER;
        Renderer.ctx.font = 'bold 28px "Courier New", monospace';
        Renderer.ctx.textAlign = 'center';
        Renderer.ctx.fillText('DEFEATED', CANVAS_WIDTH / 2, 195);

        Renderer.ctx.fillStyle = Colors.TEXT;
        Renderer.ctx.font = '14px "Courier New", monospace';
        Renderer.ctx.fillText('Your team has fallen...', CANVAS_WIDTH / 2, 235);
        Renderer.ctx.fillText('But the mission continues.', CANVAS_WIDTH / 2, 260);

        Renderer.ctx.fillStyle = Colors.PRIMARY;
        const bounce = Math.sin(time * 5) * 2;
        Renderer.ctx.fillText('Press [Z] to return to city', CANVAS_WIDTH / 2, 290 + bounce);
    },

    // Draw party HP (positioned at very bottom to avoid overlap with answers)
    drawPartyHP(gameState) {
        const x = 20;
        const y = CANVAS_HEIGHT - 8;

        Renderer.ctx.fillStyle = Colors.TEXT;
        Renderer.ctx.font = '12px "Courier New", monospace';
        Renderer.ctx.textAlign = 'left';
        Renderer.ctx.fillText('PARTY HP:', x, y - 10);

        Renderer.drawHPBar(x + 80, y - 12, 140, 14, gameState.partyHP, Combat.MAX_PARTY_HP);

        Renderer.ctx.fillText(`${gameState.partyHP}/${Combat.MAX_PARTY_HP}`, x + 230, y - 10);
    }
};

// Tutorial City Questions (Placeholder - to be replaced with real content)
const TutorialQuestions = [
    {
        id: 'TUT001',
        question: 'What does ICS stand for?',
        options: [
            'Industrial Control Systems',
            'Internet Control Services',
            'Integrated Computer Security',
            'Internal Communication Standards'
        ],
        correctIndex: 0,
        explanation: 'ICS stands for Industrial Control Systems - the systems that control physical processes in critical infrastructure.'
    },
    {
        id: 'TUT002',
        question: 'What does SCADA stand for?',
        options: [
            'Supervisory Control and Data Acquisition',
            'System Control and Data Analysis',
            'Security Control and Data Authentication',
            'Standard Computer and Data Architecture'
        ],
        correctIndex: 0,
        explanation: 'SCADA = Supervisory Control and Data Acquisition'
    },
    {
        id: 'TUT003',
        question: 'Which device directly controls physical processes like valves and motors?',
        options: [
            'PLC (Programmable Logic Controller)',
            'HMI (Human Machine Interface)',
            'Firewall',
            'Database Server'
        ],
        correctIndex: 0,
        explanation: 'PLCs are the "brains" that directly control physical processes.'
    },
    {
        id: 'TUT004',
        question: 'In OT environments, which priority is typically MOST important?',
        options: [
            'Availability',
            'Confidentiality',
            'Integrity',
            'Authentication'
        ],
        correctIndex: 0,
        explanation: 'OT prioritizes Availability - systems must stay running to prevent physical consequences.'
    },
    {
        id: 'TUT005',
        question: 'What is the main function of an HMI?',
        options: [
            'Provide a visual interface for operators to monitor and control systems',
            'Store historical process data',
            'Connect networks together',
            'Generate electricity'
        ],
        correctIndex: 0,
        explanation: 'HMI = Human Machine Interface - the screens operators use to monitor and control processes.'
    },
    {
        id: 'TUT006',
        question: 'True or False: ICS networks typically prioritize availability over confidentiality.',
        options: [
            'True',
            'False',
            'It depends on the industry',
            'They prioritize equally'
        ],
        correctIndex: 0,
        explanation: 'TRUE - Unlike IT systems, OT systems must stay running. Downtime can have physical consequences.'
    },
    {
        id: 'TUT007',
        question: 'Which attack targeted Ukrainian power grid in 2015?',
        options: [
            'BlackEnergy',
            'Stuxnet',
            'WannaCry',
            'NotPetya'
        ],
        correctIndex: 0,
        explanation: 'BlackEnergy malware was used in the 2015 Ukraine power grid attack, cutting power to 230,000 people.'
    },
    {
        id: 'TUT008',
        question: 'What type of system records historical process data for analysis?',
        options: [
            'Historian',
            'PLC',
            'RTU',
            'Firewall'
        ],
        correctIndex: 0,
        explanation: 'A Historian server stores time-series data from ICS/SCADA systems for trending and analysis.'
    },
    {
        id: 'TUT009',
        question: 'RTU stands for:',
        options: [
            'Remote Terminal Unit',
            'Real Time Update',
            'Router Transfer Unit',
            'Registered Technical User'
        ],
        correctIndex: 0,
        explanation: 'RTU = Remote Terminal Unit - used for remote monitoring and control, especially in utilities.'
    },
    {
        id: 'TUT010',
        question: 'Which industry would NOT typically use ICS/SCADA systems?',
        options: [
            'Retail point-of-sale',
            'Power generation',
            'Water treatment',
            'Oil and gas'
        ],
        correctIndex: 0,
        explanation: 'Retail POS is IT, not OT. ICS/SCADA is used in industries with physical processes.'
    }
];
