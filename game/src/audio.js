// ============================================
// ICS DEFENDER CHRONICLES - AUDIO MANAGER
// ============================================

const Audio = {
    // Audio elements
    music: {},
    sfx: {},
    currentAudio: null,
    currentTrackName: null,

    // Current state
    currentMusic: null,
    musicVolume: 0.7,
    sfxVolume: 1.0,
    muted: false,

    // Track definitions - using actual MP4 audio files
    musicTracks: {
        'title': '../audio/Intro.mp4',
        'world_map': '../audio/World Map - Clockwork Ashes.mp4',
        'city_tutorial': '../audio/Intro.mp4',
        'city_purdue': '../audio/Intro.mp4',
        'city_protocol': '../audio/Intro.mp4',
        'battle': '../audio/Intro.mp4',
        'boss_battle': '../audio/Intro.mp4',
        'victory': '../audio/Intro.mp4',
        'defeat': '../audio/Intro.mp4',
        'cutscene': '../audio/Intro.mp4'
    },

    sfxSounds: {
        'menu_select': 'assets/audio/menu_select.mp3',
        'menu_confirm': 'assets/audio/menu_confirm.mp3',
        'menu_cancel': 'assets/audio/menu_cancel.mp3',
        'correct': 'assets/audio/attack_correct.mp3',
        'critical': 'assets/audio/attack_critical.mp3',
        'damage': 'assets/audio/damage_taken.mp3',
        'boss_taunt': 'assets/audio/boss_taunt.mp3',
        'npc_talk': 'assets/audio/npc_talk.mp3',
        'city_enter': 'assets/audio/city_enter.mp3',
        'save': 'assets/audio/save_point.mp3'
    },

    // Initialize audio system
    async init() {
        // For now, we'll use placeholder audio (silent)
        // Real audio files can be added later
        console.log('Audio system initialized (placeholder mode)');
        return true;
    },

    // Preload all audio (optional - for real audio)
    async preload() {
        // In placeholder mode, we don't load anything
        // When real audio is added, uncomment this:
        /*
        const loadPromises = [];

        for (const [name, path] of Object.entries(this.musicTracks)) {
            const audio = new window.Audio();
            audio.src = path;
            audio.loop = !['victory', 'defeat'].includes(name);
            this.music[name] = audio;
            loadPromises.push(new Promise((resolve) => {
                audio.addEventListener('canplaythrough', resolve, { once: true });
                audio.load();
            }));
        }

        for (const [name, path] of Object.entries(this.sfxSounds)) {
            const audio = new window.Audio();
            audio.src = path;
            this.sfx[name] = audio;
            loadPromises.push(new Promise((resolve) => {
                audio.addEventListener('canplaythrough', resolve, { once: true });
                audio.load();
            }));
        }

        await Promise.all(loadPromises);
        */
        return true;
    },

    // Play music track
    playMusic(trackName) {
        if (this.muted) return;

        // Don't restart if already playing the same track
        if (this.currentTrackName === trackName && this.currentAudio && !this.currentAudio.paused) {
            return;
        }

        // Stop current music
        this.stopMusic();

        const trackPath = this.musicTracks[trackName];
        if (trackPath) {
            console.log(`[Audio] Playing music: ${trackName} from ${trackPath}`);

            this.currentAudio = new window.Audio(trackPath);
            this.currentAudio.volume = this.musicVolume;
            this.currentAudio.loop = true;
            this.currentTrackName = trackName;

            this.currentAudio.play().catch(e => {
                console.warn('Music autoplay blocked:', e);
                // Add click listener to start music on user interaction
                const startMusic = () => {
                    if (this.currentAudio) {
                        this.currentAudio.play().catch(() => {});
                    }
                    document.removeEventListener('click', startMusic);
                    document.removeEventListener('keydown', startMusic);
                };
                document.addEventListener('click', startMusic);
                document.addEventListener('keydown', startMusic);
            });

            this.currentMusic = trackName;
        } else {
            console.log(`[Audio] Track not found: ${trackName}`);
        }
    },

    // Stop current music
    stopMusic() {
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
            this.currentAudio = null;
        }
        this.currentMusic = null;
        this.currentTrackName = null;
    },

    // Pause music
    pauseMusic() {
        if (this.currentAudio) {
            this.currentAudio.pause();
        }
    },

    // Resume music
    resumeMusic() {
        if (this.currentAudio) {
            this.currentAudio.play().catch(e => console.warn('Resume failed:', e));
        }
    },

    // Play sound effect
    playSFX(sfxName) {
        if (this.muted) return;

        // In placeholder mode, just log
        console.log(`[Audio] Playing SFX: ${sfxName}`);

        // When real audio is added:
        /*
        const sfx = this.sfx[sfxName];
        if (sfx) {
            const sound = sfx.cloneNode();
            sound.volume = this.sfxVolume;
            sound.play().catch(e => console.warn('SFX play failed:', e));
        }
        */
    },

    // Set music volume (0-1)
    setMusicVolume(volume) {
        this.musicVolume = Utils.clamp(volume, 0, 1);
        if (this.currentAudio) {
            this.currentAudio.volume = this.musicVolume;
        }
    },

    // Set SFX volume (0-1)
    setSFXVolume(volume) {
        this.sfxVolume = Utils.clamp(volume, 0, 1);
    },

    // Toggle mute
    toggleMute() {
        this.muted = !this.muted;
        if (this.muted) {
            this.pauseMusic();
        } else {
            this.resumeMusic();
        }
        return this.muted;
    }
};
