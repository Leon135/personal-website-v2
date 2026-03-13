export interface ParticleSettings {
  particlesMultiplier: number;
  particleVelocity: number;
  particleSize: number;
  connectionDistance: number;
  scrollProgressMultiplier: number;
}

export const defaultParticleSettings: ParticleSettings = {
  particlesMultiplier: 1.5,
  particleVelocity: 0.4,
  particleSize: 1,
  connectionDistance: 100,
  scrollProgressMultiplier: 1,
};