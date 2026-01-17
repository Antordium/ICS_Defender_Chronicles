// ============================================
// ICS DEFENDER CHRONICLES - AUDIO MANAGER
// ============================================

const Audio = {
    // Audio elements
    music: {},
    sfx: {},

    // Current state
    currentMusic: null,
    musicVolume: 0.7,
    sfxVolume: 1.0,
    muted: false,

    // Track definitions (placeholder paths - replace with real audio later)
    musicTracks: {
        'title': 'assets/audio/title_theme.mp3',
        'world_map': 'assets/audio/world_map.mp3',
        'city_tutorial': 'assets/audio/city_tutorial.mp3',
        'city_purdue': 'assets/audio/city_purdue.mp3',
        'city_protocol': 'assets/audio/city_protocol.mp3',
        'battle': 'assets/audio/battle.mp3',
        'boss_battle': 'assets/audio/boss_battle.mp3',
        'victory': 'assets/audio/victory.mp3',
        'defeat': 'assets/audio/defeat.mp3',
        'cutscene': 'assets/audio/cutscene.mp3'
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

        // Stop current music
        this.stopMusic();

        // In placeholder mode, just log
        console.log(`[Audio] Playing music: ${trackName}`);
        this.currentMusic = trackName;

        // When real audio is added:
        /*
        const track = this.music[trackName];
        if (track) {
            track.volume = this.musicVolume;
            track.currentTime = 0;
            track.play().catch(e => console.warn('Music autoplay blocked:', e));
            this.currentMusic = track;
        }
        */
    },

    // Stop current music
    stopMusic() {
        if (this.currentMusic && typeof this.currentMusic !== 'string') {
            this.currentMusic.pause();
            this.currentMusic.currentTime = 0;
        }
        this.currentMusic = null;
    },

    // Pause music
    pauseMusic() {
        if (this.currentMusic && typeof this.currentMusic !== 'string') {
            this.currentMusic.pause();
        }
    },

    // Resume music
    resumeMusic() {
        if (this.currentMusic && typeof this.currentMusic !== 'string') {
            this.currentMusic.play().catch(e => console.warn('Resume failed:', e));
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
        if (this.currentMusic && typeof this.currentMusic !== 'string') {
            this.currentMusic.volume = this.musicVolume;
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
