// ============================================
// ICS DEFENDER CHRONICLES - SAVE SYSTEM
// ============================================

const SaveManager = {
    DB_NAME: 'ICSDefenderSaves',
    DB_VERSION: 1,
    STORE_NAME: 'saves',
    db: null,

    // Initialize IndexedDB
    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);

            request.onerror = () => {
                console.error('Failed to open IndexedDB');
                reject(request.error);
            };

            request.onsuccess = () => {
                this.db = request.result;
                console.log('Save system initialized');
                resolve();
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(this.STORE_NAME)) {
                    const store = db.createObjectStore(this.STORE_NAME, {
                        keyPath: 'id',
                        autoIncrement: true
                    });
                    store.createIndex('timestamp', 'timestamp', { unique: false });
                    store.createIndex('slot', 'slot', { unique: false });
                }
            };
        });
    },

    // Create default save data
    createDefaultSaveData() {
        return {
            version: '1.0',
            timestamp: new Date().toISOString(),
            slot: 1,

            // Player location
            currentCity: CityID.NONE,
            currentMap: 'worldMap',
            playerPosition: { x: 7, y: 5 },

            // Progress
            citiesCompleted: [],
            citiesUnlocked: [CityID.TUTORIAL],
            currentCityNPCsCompleted: [],
            bossArenaUnlocked: false,

            // Party
            partyHP: Combat.MAX_PARTY_HP,
            characters: {
                [CharacterID.CIPHER]: { hp: 100 },
                [CharacterID.BLAZE]: { hp: 100 },
                [CharacterID.GHOST]: { hp: 100 },
                [CharacterID.VOLT]: { hp: 100 }
            },

            // Statistics
            statistics: {
                totalPlayTime: 0,
                totalQuestionsAnswered: 0,
                totalCorrect: 0,
                bestStreak: 0
            },

            // Per-city progress
            cityProgress: {
                [CityID.TUTORIAL]: {
                    npcsCompleted: [],
                    bossDefeated: false,
                    questionsAnswered: 0,
                    questionsCorrect: 0
                },
                [CityID.PURDUE]: {
                    npcsCompleted: [],
                    bossDefeated: false,
                    questionsAnswered: 0,
                    questionsCorrect: 0
                },
                [CityID.PROTOCOL]: {
                    npcsCompleted: [],
                    bossDefeated: false,
                    questionsAnswered: 0,
                    questionsCorrect: 0
                }
            }
        };
    },

    // Save game data
    async save(saveData, slot = 1) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('Database not initialized'));
                return;
            }

            const tx = this.db.transaction(this.STORE_NAME, 'readwrite');
            const store = tx.objectStore(this.STORE_NAME);

            // Update timestamp and slot
            saveData.timestamp = new Date().toISOString();
            saveData.slot = slot;

            // First, try to find existing save for this slot
            const slotIndex = store.index('slot');
            const getRequest = slotIndex.getAll(slot);

            getRequest.onsuccess = () => {
                const existing = getRequest.result;
                if (existing.length > 0) {
                    // Update existing save
                    saveData.id = existing[0].id;
                    const putRequest = store.put(saveData);
                    putRequest.onsuccess = () => resolve(putRequest.result);
                    putRequest.onerror = () => reject(putRequest.error);
                } else {
                    // Add new save
                    const addRequest = store.add(saveData);
                    addRequest.onsuccess = () => resolve(addRequest.result);
                    addRequest.onerror = () => reject(addRequest.error);
                }
            };
        });
    },

    // Load save from slot
    async load(slot = 1) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('Database not initialized'));
                return;
            }

            const tx = this.db.transaction(this.STORE_NAME, 'readonly');
            const store = tx.objectStore(this.STORE_NAME);
            const index = store.index('slot');
            const request = index.getAll(slot);

            request.onsuccess = () => {
                const results = request.result;
                if (results.length > 0) {
                    resolve(results[0]);
                } else {
                    resolve(null);
                }
            };

            request.onerror = () => reject(request.error);
        });
    },

    // Check if save exists
    async hasSave(slot = 1) {
        const save = await this.load(slot);
        return save !== null;
    },

    // Delete save
    async deleteSave(slot = 1) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('Database not initialized'));
                return;
            }

            const tx = this.db.transaction(this.STORE_NAME, 'readwrite');
            const store = tx.objectStore(this.STORE_NAME);
            const index = store.index('slot');
            const request = index.getAll(slot);

            request.onsuccess = () => {
                const results = request.result;
                if (results.length > 0) {
                    store.delete(results[0].id);
                }
                resolve();
            };

            request.onerror = () => reject(request.error);
        });
    },

    // Export save as JSON
    async exportSave(slot = 1) {
        const saveData = await this.load(slot);
        if (saveData) {
            const blob = new Blob([JSON.stringify(saveData, null, 2)], {
                type: 'application/json'
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `ics_defender_save_slot${slot}_${Date.now()}.json`;
            a.click();
            URL.revokeObjectURL(url);
        }
    },

    // Import save from file
    async importSave(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const saveData = JSON.parse(e.target.result);
                    // Remove id to create new entry
                    delete saveData.id;
                    await this.save(saveData, saveData.slot || 1);
                    resolve(saveData);
                } catch (err) {
                    reject(err);
                }
            };
            reader.onerror = () => reject(reader.error);
            reader.readAsText(file);
        });
    }
};
