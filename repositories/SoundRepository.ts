import { Audio } from 'expo-av';

interface SoundRepository {
    loadSound(fileName: string): Promise<void>
    playSound(): Promise<void>
    unloadSound(): Promise<void>
}

class ISoundRepository implements SoundRepository {
    private static instance: ISoundRepository;
    private sound?: Audio.Sound;

    private static soundFiles: Record<string, any> = {
        'action_sound': require('../assets/sounds/action_sound.mp3'),
    };

    static getInstance(): ISoundRepository {
        if (!ISoundRepository.instance) {
            ISoundRepository.instance = new ISoundRepository();
        }
        return ISoundRepository.instance;
    }

    async loadSound(fileName: string): Promise<void> {
        try {
            if (this.sound) {
                await this.unloadSound();
            }

            const audio = ISoundRepository.soundFiles[fileName];

            if (!audio) throw new Error(`Sound file '${fileName}' not found!`);

            const { sound } = await Audio.Sound.createAsync(audio);
            this.sound = sound;
        } catch (error) {
            console.error('Error loading sound:', error);
        }
    }

    async playSound(): Promise<void> {
        try {
            if (!this.sound) throw new Error('No sound loaded. Call loadSound() first.');
            await this.sound.replayAsync();
        } catch (error) {
            console.error('Error playing sound:', error);
        }
    }

    async unloadSound(): Promise<void> {
        try {
            if (this.sound) {
                await this.sound.unloadAsync();
                this.sound = undefined;
            }
        } catch (error) {
            console.error('Error unloading sound:', error);
        }
    }
}

export { SoundRepository, ISoundRepository }