import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LetterSwapForward } from "@/components/ui/letter-swap";

type Obstacle = {
  x: number;
  w: number;
  h: number;
};

type GameState = {
  runnerY: number;
  runnerVy: number;
  runnerOnGround: boolean;
  jumpQueued: boolean;
  started: boolean;
  speed: number;
  score: number;
  crashed: boolean;
  productivityPromptShown: boolean;
  lightningTriggered: boolean;
  lightningTime: number;
  lightningSeed: number;
  cloudDrift: number;
  obstacles: Obstacle[];
  nextSpawnDistance: number;
};

type EndMode = "none" | "obstacle" | "lightning";

const CANVAS_WIDTH = 960;
const CANVAS_HEIGHT = 260;
const GROUND_Y = 208;
const RUNNER_X = 92;
const RUNNER_W = 24;
const RUNNER_H = 30;

const getRandomSpawnDistance = (speed: number) => {
  const minGap = Math.max(320, 430 - speed * 7);
  const maxGap = Math.max(470, 690 - speed * 5);
  return minGap + Math.random() * (maxGap - minGap);
};

const createInitialGameState = (): GameState => ({
  runnerY: GROUND_Y,
  runnerVy: 0,
  runnerOnGround: true,
  jumpQueued: false,
  started: false,
  speed: 4.25,
  score: 0,
  crashed: false,
  productivityPromptShown: false,
  lightningTriggered: false,
  lightningTime: 0,
  lightningSeed: Math.random() * 1000,
  cloudDrift: 0,
  obstacles: [],
  nextSpawnDistance: 240,
});

const PixelRunnerGame = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const gameRef = useRef<GameState>(createInitialGameState());
  const [bestScore, setBestScore] = useState(0);
  const [lastScore, setLastScore] = useState(0);
  const [endMode, setEndMode] = useState<EndMode>("none");
  const [redirectSeconds, setRedirectSeconds] = useState<number | null>(null);

  const resetGame = () => {
    gameRef.current = createInitialGameState();
    setEndMode("none");
    setRedirectSeconds(null);
  };

  const startGame = () => {
    const game = gameRef.current;
    if (!game.started) {
      game.started = true;
      game.nextSpawnDistance = getRandomSpawnDistance(game.speed);
    }
  };

  useEffect(() => {
    const handleJump = () => {
      const game = gameRef.current;
      if (!game.started) {
        startGame();
      }
      if (game.productivityPromptShown) {
        return;
      }
      if (game.crashed) {
        resetGame();
        return;
      }
      game.jumpQueued = true;
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code !== "Space" && event.code !== "ArrowUp") {
        return;
      }
      event.preventDefault();
      handleJump();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (endMode !== "lightning") {
      return;
    }

    const countdownStart = 5 + Math.floor(Math.random() * 3);
    setRedirectSeconds(countdownStart);
    const interval = window.setInterval(() => {
      setRedirectSeconds((current) => {
        if (current === null) {
          return current;
        }
        if (current <= 1) {
          window.clearInterval(interval);
          window.location.assign("/");
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [endMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    let lastTimestamp = 0;

    const isColliding = (obstacle: Obstacle, runnerY: number) => {
      const runnerLeft = RUNNER_X;
      const runnerRight = RUNNER_X + RUNNER_W;
      const runnerTop = runnerY - RUNNER_H;
      const runnerBottom = runnerY;

      const obstacleLeft = obstacle.x;
      const obstacleRight = obstacle.x + obstacle.w;
      const obstacleTop = GROUND_Y - obstacle.h;
      const obstacleBottom = GROUND_Y;

      return !(runnerRight < obstacleLeft || runnerLeft > obstacleRight || runnerBottom < obstacleTop || runnerTop > obstacleBottom);
    };

    const drawPixelRunner = (runnerY: number) => {
      const top = runnerY - RUNNER_H;
      context.fillStyle = "hsl(195 18% 24%)";
      context.fillRect(RUNNER_X + 4, top + 5, 15, 14);
      context.fillRect(RUNNER_X + 8, top + 1, 9, 7);
      context.fillRect(RUNNER_X + 16, top + 10, 7, 5);
      context.fillRect(RUNNER_X + 6, top + 19, 5, 11);
      context.fillRect(RUNNER_X + 14, top + 19, 5, 11);
      context.fillStyle = "hsl(195 14% 92%)";
      context.fillRect(RUNNER_X + 14, top + 4, 2, 2);
    };

    const drawTreeObstacle = (obstacle: Obstacle) => {
      const trunkW = Math.max(4, Math.floor(obstacle.w * 0.34));
      const trunkH = Math.max(8, Math.floor(obstacle.h * 0.32));
      const trunkX = obstacle.x + Math.floor((obstacle.w - trunkW) / 2);
      const trunkY = GROUND_Y - trunkH;

      const crownW = obstacle.w + 10;
      const crownH = obstacle.h - trunkH;
      const crownX = obstacle.x - Math.floor((crownW - obstacle.w) / 2);
      const crownY = GROUND_Y - obstacle.h;

      context.fillStyle = "hsl(152 20% 34%)";
      context.fillRect(crownX, crownY + 6, crownW, Math.max(8, crownH - 6));
      context.fillStyle = "hsl(152 24% 40%)";
      context.fillRect(crownX + 4, crownY, Math.max(8, crownW - 8), Math.max(6, crownH - 6));

      context.fillStyle = "hsl(195 14% 48%)";
      context.fillRect(trunkX, trunkY, trunkW, trunkH);

      context.fillStyle = "hsl(195 22% 94%)";
      context.fillRect(crownX + 6, crownY + 5, 2, 2);
      context.fillRect(crownX + 12, crownY + 9, 2, 2);
    };

    const drawCloud = (x: number, y: number, scale = 1) => {
      const w = 12 * scale;
      const h = 6 * scale;

      context.fillStyle = "hsl(195 10% 84%)";
      context.fillRect(x, y + h, w * 2.8, h * 1.3);
      context.fillRect(x + w * 0.7, y, w * 1.6, h * 1.4);
      context.fillRect(x + w * 1.8, y + h * 0.4, w * 1.4, h * 1.2);

      context.fillStyle = "hsl(195 12% 92%)";
      context.fillRect(x + w * 0.35, y + h * 1.2, w * 0.8, h * 0.55);
      context.fillRect(x + w * 1.15, y + h * 0.25, w * 0.75, h * 0.55);
    };

    const drawLightningBolt = (startX: number, startY: number, endX: number, endY: number, t: number, seed: number) => {
      const progress = Math.min(1, t / 16);
      const visibleEndY = startY + (endY - startY) * progress;
      const segments = 12;
      const phase = t * 0.35 + seed;

      context.strokeStyle = "hsla(152, 90%, 52%, 0.92)";
      context.lineWidth = 2.4;
      context.beginPath();
      context.moveTo(startX, startY);

      for (let i = 1; i < segments; i += 1) {
        const p = i / segments;
        const y = startY + (visibleEndY - startY) * p;
        const sway = Math.sin(phase + i * 1.4) * (5 + (1 - p) * 2);
        const x = startX + sway;
        context.lineTo(x, y);
      }
      context.lineTo(endX, visibleEndY);
      context.stroke();

      context.strokeStyle = "hsla(195, 100%, 98%, 0.98)";
      context.lineWidth = 1.1;
      context.stroke();

      if (progress >= 1) {
        const pulse = 0.3 + Math.abs(Math.sin(t * 0.42)) * 0.35;
        context.fillStyle = `hsla(152, 95%, 55%, ${pulse.toFixed(3)})`;
        context.fillRect(endX - 10, endY - 8, 20, 12);
      }
    };

    const drawPixelatedCenterText = (text: string, y: number, color: string, size = 44) => {
      const scale = 3;
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = Math.floor(CANVAS_WIDTH / scale);
      tempCanvas.height = Math.floor(CANVAS_HEIGHT / scale);
      const tempContext = tempCanvas.getContext("2d");
      if (!tempContext) {
        return;
      }

      tempContext.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
      tempContext.fillStyle = color;
      tempContext.font = `900 ${Math.max(12, Math.floor(size / scale))}px monospace`;
      tempContext.textAlign = "center";
      tempContext.textBaseline = "middle";
      tempContext.fillText(text, tempCanvas.width / 2, y / scale);

      context.save();
      context.imageSmoothingEnabled = false;
      context.drawImage(tempCanvas, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      context.restore();
    };

    const drawFrame = (timestamp: number) => {
      const game = gameRef.current;
      if (!lastTimestamp) {
        lastTimestamp = timestamp;
      }
      const dt = Math.min(1.75, (timestamp - lastTimestamp) / 16.67);
      lastTimestamp = timestamp;

      game.cloudDrift += game.speed * dt;

      if (game.started && !game.crashed && !game.productivityPromptShown && !game.lightningTriggered) {
        if (game.jumpQueued && game.runnerOnGround) {
          game.runnerVy = -11;
          game.runnerOnGround = false;
        }
        game.jumpQueued = false;

        game.runnerVy += 0.58 * dt;
        game.runnerY += game.runnerVy * dt;

        if (game.runnerY >= GROUND_Y) {
          game.runnerY = GROUND_Y;
          game.runnerVy = 0;
          game.runnerOnGround = true;
        }

        game.nextSpawnDistance -= game.speed * dt;
        if (game.nextSpawnDistance <= 0) {
          game.obstacles.push({
            x: CANVAS_WIDTH + 10,
            w: Math.random() > 0.5 ? 22 : 18,
            h: 36 + Math.floor(Math.random() * 24),
          });
          game.nextSpawnDistance = getRandomSpawnDistance(game.speed);
        }

        game.obstacles = game.obstacles
          .map((obstacle) => ({ ...obstacle, x: obstacle.x - game.speed * dt }))
          .filter((obstacle) => obstacle.x + obstacle.w > -20);

        if (game.obstacles.some((obstacle) => isColliding(obstacle, game.runnerY))) {
          game.crashed = true;
          setEndMode("obstacle");
          const roundedScore = Math.floor(game.score);
          setLastScore(roundedScore);
          setBestScore((currentBest) => Math.max(currentBest, roundedScore));
        }

        game.score += 0.14 * dt;
        game.speed = Math.min(8.0, game.speed + 0.001 * dt);

        if (game.score >= 250 && !game.lightningTriggered) {
          game.lightningTriggered = true;
          game.lightningTime = 0;
          game.lightningSeed = Math.random() * 1000;
          game.jumpQueued = false;
        }
      }

      if (game.lightningTriggered && !game.productivityPromptShown) {
        game.lightningTime += dt;
        if (game.lightningTime >= 55) {
          game.productivityPromptShown = true;
          game.started = false;
          game.crashed = true;
          setEndMode("lightning");
          const roundedScore = Math.floor(game.score);
          setLastScore(roundedScore);
          setBestScore((currentBest) => Math.max(currentBest, roundedScore));
        }
      }

      context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      context.fillStyle = "hsl(0 0% 100%)";
      context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      const cloudDrift = game.cloudDrift % (CANVAS_WIDTH + 260);
      for (let i = 0; i < 4; i += 1) {
        const cloudX = CANVAS_WIDTH - ((cloudDrift + i * 280) % (CANVAS_WIDTH + 260));
        const cloudY = 34 + (i % 2) * 28;
        drawCloud(cloudX, cloudY, i % 2 === 0 ? 1.1 : 0.95);
      }

      const stormCloudX = RUNNER_X - 6;
      const stormCloudY = 38;
      if (game.lightningTriggered || game.productivityPromptShown) {
        drawCloud(stormCloudX, stormCloudY, 1.18);
        context.fillStyle = "hsla(195, 16%, 42%, 0.35)";
        context.fillRect(stormCloudX + 2, stormCloudY + 10, 34, 12);
      }

      context.fillStyle = "hsl(195 10% 88%)";
      context.fillRect(0, GROUND_Y, CANVAS_WIDTH, CANVAS_HEIGHT - GROUND_Y);
      context.fillStyle = "hsl(195 12% 78%)";
      context.fillRect(0, GROUND_Y - 2, CANVAS_WIDTH, 2);

      drawPixelRunner(game.runnerY);

      game.obstacles.forEach((obstacle) => {
        drawTreeObstacle(obstacle);
      });

      context.fillStyle = "hsl(195 16% 24%)";
      context.font = "700 18px ui-sans-serif, system-ui, sans-serif";
      context.fillText(`Score: ${Math.floor(game.score)}`, 20, 30);
      context.fillText(`Best: ${Math.max(bestScore, Math.floor(game.score))}`, 20, 54);

      if (game.lightningTriggered) {
        const strikeStartX = RUNNER_X + 14;
        const strikeStartY = stormCloudY + 18;
        const strikeEndX = RUNNER_X + 12;
        const strikeEndY = game.runnerY - 5;
        drawLightningBolt(strikeStartX, strikeStartY, strikeEndX, strikeEndY, game.lightningTime, game.lightningSeed);
      }

      if (game.crashed && !game.productivityPromptShown) {
        context.fillStyle = "hsla(195, 22%, 96%, 0.84)";
        context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        context.fillStyle = "hsl(195 16% 20%)";
        context.font = "700 34px ui-sans-serif, system-ui, sans-serif";
        context.textAlign = "center";
        context.fillText("UNDER CONSTRUCTION", CANVAS_WIDTH / 2, 96);
        context.textAlign = "start";
      }

      if (game.productivityPromptShown) {
        context.fillStyle = "hsla(195, 22%, 96%, 0.88)";
        context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        drawPixelatedCenterText("GAME OVER", 110, "hsl(195 16% 20%)", 50);
        context.fillStyle = "hsl(195 16% 20%)";
        context.font = "600 20px ui-sans-serif, system-ui, sans-serif";
        context.textAlign = "center";
        context.fillText("Now why dont we get back to being productive", CANVAS_WIDTH / 2, 154);
        context.textAlign = "start";
      } else if (!game.started) {
        context.fillStyle = "hsla(195, 22%, 96%, 0.7)";
        context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        context.fillStyle = "hsl(195 16% 24%)";
        context.font = "700 28px ui-sans-serif, system-ui, sans-serif";
        context.textAlign = "center";
        context.fillText("TAP TO PLAY", CANVAS_WIDTH / 2, 122);
        context.font = "500 15px ui-sans-serif, system-ui, sans-serif";
        context.fillText("Tap anywhere or press Space/Arrow Up", CANVAS_WIDTH / 2, 150);
        context.textAlign = "start";
      }

      frameRef.current = window.requestAnimationFrame(drawFrame);
    };

    frameRef.current = window.requestAnimationFrame(drawFrame);

    return () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [bestScore]);

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          onPointerDown={() => {
            const game = gameRef.current;
            if (game.productivityPromptShown) {
              return;
            }
            if (!game.started) {
              startGame();
              return;
            }
            if (game.crashed) {
              resetGame();
            } else {
              game.jumpQueued = true;
            }
          }}
          className="h-64 w-full cursor-pointer rounded-xl border border-border/60 bg-[hsl(195_18%_92%_/_0.95)] [image-rendering:pixelated]"
        />
      </div>
      {endMode === "lightning" ? (
        <p className="mt-4 text-xl md:text-2xl text-muted-foreground text-center font-semibold">
          Redirecting to Home Page {redirectSeconds !== null ? `in ${redirectSeconds}` : ""}
        </p>
      ) : (
        <>
          <p className="mt-3 text-xs text-muted-foreground text-center">
            Tap the game area or press Space/Arrow Up to play.
          </p>
          <p className="mt-1 text-xs text-muted-foreground text-center">
            Latest run: {lastScore} | Best: {bestScore}
          </p>
          <p className="mt-8 text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto text-center">
            While we're working on the app, you can work on a new high score.
          </p>
        </>
      )}
    </div>
  );
};

const IkigaiTeenApp = () => {
  return (
    <>
      <Navbar />
      <main className="pt-16 bg-background min-h-screen">
        <section className="footer-theme-legacy py-12 md:py-20 bg-card border-b border-border/50 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4">
                <LetterSwapForward label="IkigaiTeen App" className="justify-center" />
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground font-medium">
                Under construction
              </p>
            </div>
          </div>
        </section>

        <section className="footer-theme-legacy py-12">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(195_25%_96%_/_0.8)] p-8 md:p-10 text-center">
              <PixelRunnerGame />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default IkigaiTeenApp;