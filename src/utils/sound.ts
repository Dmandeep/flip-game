/**
 * Sound effects for Memory Flip using the Web Audio API.
 * No external audio files needed — all sounds are synthesized.
 */

let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

function playTone(
  frequency: number,
  type: OscillatorType,
  duration: number,
  gainStart: number,
  gainEnd: number,
  delay = 0
): void {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, ctx.currentTime + delay);

  gain.gain.setValueAtTime(gainStart, ctx.currentTime + delay);
  gain.gain.exponentialRampToValueAtTime(
    Math.max(gainEnd, 0.0001),
    ctx.currentTime + delay + duration
  );

  osc.start(ctx.currentTime + delay);
  osc.stop(ctx.currentTime + delay + duration);
}

export const SoundFX = {
  /** Card flip — soft click */
  flip(): void {
    playTone(600, 'sine', 0.08, 0.2, 0.01);
  },

  /** Successful match — cheerful ascending chime */
  match(): void {
    playTone(523, 'triangle', 0.12, 0.3, 0.01, 0);
    playTone(659, 'triangle', 0.12, 0.3, 0.01, 0.1);
    playTone(784, 'triangle', 0.15, 0.3, 0.01, 0.2);
  },

  /** Wrong pair — low thud */
  mismatch(): void {
    playTone(150, 'sawtooth', 0.15, 0.25, 0.01);
  },

  /** All pairs matched — victory fanfare */
  win(): void {
    const notes = [523, 659, 784, 1047];
    notes.forEach((freq, i) => {
      playTone(freq, 'triangle', 0.2, 0.35, 0.01, i * 0.12);
    });
    // Final chord
    playTone(523, 'sine', 0.5, 0.2, 0.01, 0.6);
    playTone(659, 'sine', 0.5, 0.2, 0.01, 0.6);
    playTone(784, 'sine', 0.5, 0.2, 0.01, 0.6);
  },
};
