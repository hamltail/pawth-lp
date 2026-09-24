"use client";

import { CSSProperties, useEffect, useState } from "react";

type PawStep = {
  x: number;
  y: number;
  rotation: number;
};

type PawTrail = [PawStep, PawStep, PawStep];

type PawStepStyle = CSSProperties & {
  "--paw-x": string;
  "--paw-y": string;
  "--paw-rotation": string;
};

const TRAIL_DURATION = 5400;

const FIRST_TRAIL: PawTrail = [
  {
    x: 76,
    y: 138,
    rotation: 18,
  },
  {
    x: 88,
    y: 118,
    rotation: 23,
  },
  {
    x: 100,
    y: 98,
    rotation: 19,
  },
];

const randomBetween = (min: number, max: number) =>
  Math.random() * (max - min) + min;

function createRandomTrail(): PawTrail {
  const routes = [
    {
      startX: [4, 18],
      startY: [4, 22],
      angle: [25, 50],
    },
    {
      startX: [82, 96],
      startY: [4, 22],
      angle: [130, 155],
    },
    {
      startX: [4, 18],
      startY: [72, 94],
      angle: [-50, -25],
    },
    {
      startX: [82, 96],
      startY: [72, 94],
      angle: [-155, -130],
    },
    {
      startX: [4, 12],
      startY: [30, 70],
      angle: [-20, 20],
    },
    {
      startX: [88, 96],
      startY: [30, 70],
      angle: [160, 200],
    },
  ];

  const route = routes[Math.floor(Math.random() * routes.length)];

  const startX = randomBetween(route.startX[0], route.startX[1]);
  const startY = randomBetween(route.startY[0], route.startY[1]);
  const angle = randomBetween(route.angle[0], route.angle[1]);
  const stepLength = randomBetween(15, 20);

  const radians = (angle * Math.PI) / 180;

  const deltaX = Math.cos(radians) * stepLength;
  const deltaY = Math.sin(radians) * stepLength;

  const pawRotation = angle + 90;

  return [0, 1, 2].map((index) => ({
    x: startX + deltaX * index,
    y: startY + deltaY * index,
    rotation: pawRotation + randomBetween(-5, 5),
  })) as PawTrail;
}

function createStepStyle(step: PawStep): PawStepStyle {
  return {
    "--paw-x": `${step.x}%`,
    "--paw-y": `${step.y}%`,
    "--paw-rotation": `${step.rotation}deg`,
  };
}

export default function HeroPawTrail() {
  const [trail, setTrail] = useState<PawTrail>(FIRST_TRAIL);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTrail(createRandomTrail());
    }, TRAIL_DURATION);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return (
    <div className="hero-paw-trail" aria-hidden="true">
      {trail.map((step, index) => (
        <span
          key={`${index}-${step.x}-${step.y}-${step.rotation}`}
          className={`hero-paw-step hero-paw-step-${index + 1}`}
          style={createStepStyle(step)}
        />
      ))}
    </div>
  );
}
