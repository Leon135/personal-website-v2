export function calculateRefreshRate(): Promise<number> {
  return new Promise((resolve) => {
    let frameTimes: number[] = [];
    let lastFrameTime: number | null = null;
    let animationId: number | null = null;

    function onFrame(time: number) {
      if (lastFrameTime !== null) {
        const delta = time - lastFrameTime;
        frameTimes.push(delta);
        if (frameTimes.length > 100) {
          frameTimes.shift();
        }

        // Once we have enough samples, calculate and resolve
        if (frameTimes.length >= 100) {
          const averageDelta =
            frameTimes.reduce((sum, dt) => sum + dt, 0) / frameTimes.length;
          const fps = Math.round(1000 / averageDelta);

          // Cancel any pending animation frame and stop the loop
          if (animationId !== null) {
            cancelAnimationFrame(animationId);
          }

          // Clean up references to let GC collect them
          frameTimes = [];
          lastFrameTime = null;

          resolve(fps);
          return;
        }
      }
      lastFrameTime = time;
      animationId = requestAnimationFrame(onFrame);
    }

    animationId = requestAnimationFrame(onFrame);
  });
}

export function calculateFrameInterval(frameRate: number): number {
  return 1000 / frameRate;
}