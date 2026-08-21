class SoundManager {
  private ctx: AudioContext | null = null;
  private bgmAudio: HTMLAudioElement | null = null;
  private erwinAudio: HTMLAudioElement | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          this.ctx = new AudioContextClass();
        }
      } catch {
        console.warn('AudioContext not supported');
      }

      this.bgmAudio = new Audio('/bgm.mp3');
      if (this.bgmAudio) {
        this.bgmAudio.loop = true;
        this.bgmAudio.volume = 1.0;
      }
      
      this.erwinAudio = new Audio('/erwin.mp3');
      if (this.erwinAudio) {
        this.erwinAudio.volume = 1.0;
      }
    }
  }

  private playTone(freq: number, type: OscillatorType, duration: number, vol = 0.1) {
    if (!this.ctx) return;
    
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    
    gainNode.gain.setValueAtTime(vol, this.ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
    
    osc.connect(gainNode);
    gainNode.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  flip() {
    // Sharp metallic swoosh
    this.playTone(300, 'triangle', 0.1, 0.2);
    setTimeout(() => this.playTone(600, 'sine', 0.1, 0.1), 50);
  }

  match() {
    // Heavy Titan impact
    this.playTone(150, 'square', 0.3, 0.3);
    setTimeout(() => this.playTone(300, 'sawtooth', 0.4, 0.2), 100);
  }

  mismatch() {
    // Blade clash
    this.playTone(800, 'sawtooth', 0.2, 0.1);
    setTimeout(() => this.playTone(400, 'square', 0.2, 0.1), 50);
  }

  slash() {
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    
    // Sword slash (High frequency drop)
    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.2);
    
    gainNode.gain.setValueAtTime(0.5, this.ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
    
    osc.connect(gainNode);
    gainNode.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.2);
  }

  vaporize() {
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    // Titan steam (White noise approximation using high rate oscillators)
    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(100, this.ctx.currentTime);
    // modulate frequency rapidly to create noise
    osc.frequency.linearRampToValueAtTime(800, this.ctx.currentTime + 0.5);
    
    gainNode.gain.setValueAtTime(0.4, this.ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.8);
    
    osc.connect(gainNode);
    gainNode.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.8);
  }

  win() {
    this.playTone(440, 'sine', 0.2, 0.2);
    setTimeout(() => this.playTone(554, 'sine', 0.2, 0.2), 200);
    setTimeout(() => this.playTone(659, 'sine', 0.4, 0.2), 400);
  }

  playBGM() {
    if (this.bgmAudio) {
      this.bgmAudio.play().catch(() => {});
    }
  }

  stopBGM() {
    if (this.bgmAudio) {
      this.bgmAudio.pause();
    }
  }

  playErwin() {
    if (this.erwinAudio) {
      this.erwinAudio.currentTime = 0;
      this.erwinAudio.play().catch(() => {});
    }
  }
}

export const SoundFX = new SoundManager();
