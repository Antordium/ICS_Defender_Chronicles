# ICS Defender Chronicles - Assets Structure

## Folder Structure

```
assets/
├── audio/           # Sound effects (WAV, MP3)
│   ├── sfx/         # Sound effects
│   └── ambient/     # Ambient sounds
├── music/           # Background music (MP3, MP4 audio)
│   ├── title.mp3
│   ├── world_map.mp3
│   ├── city.mp3
│   ├── combat.mp3
│   ├── boss.mp3
│   └── victory.mp3
├── videos/          # Cutscene videos (MP4)
│   ├── intro.mp4
│   ├── tutorial_city/
│   │   └── intro.mp4
│   ├── purdue_city/
│   │   └── network_architecture.mp4
│   ├── protocol_port/
│   │   └── ics_protocols.mp4
│   └── endings/
│       └── victory.mp4
├── sprites/         # Character and NPC sprites (PNG)
│   ├── characters/
│   ├── npcs/
│   ├── bosses/
│   └── ui/
└── tilesets/        # Map tilesets (PNG)
    ├── world_map.png
    ├── power_plant.png
    ├── water_treatment.png
    └── oil_refinery.png
```

## Video Specifications

For PCTE cmi5 player compatibility:

- **Format**: MP4 (H.264 codec)
- **Resolution**: 512x448 (game resolution) or 1024x896 (2x scaled)
- **Frame Rate**: 30fps recommended
- **Audio**: AAC codec, stereo

## Music Specifications

- **Format**: MP3 or MP4 (audio only)
- **Bitrate**: 128-192 kbps recommended
- **Looping**: Files should be designed to loop seamlessly

## Git LFS

Large media files (MP4s over 50MB) should use Git LFS:

```bash
git lfs track "*.mp4"
git lfs track "game/assets/videos/**"
git lfs track "game/assets/music/**"
```

## Adding Assets

1. Place files in the appropriate folder
2. Update the corresponding JS file to reference the asset
3. For videos: Update `src/audio.js` or cutscene handlers
4. For music: Update `src/audio.js` audio manager
5. Commit and push - GitHub Actions will deploy automatically
