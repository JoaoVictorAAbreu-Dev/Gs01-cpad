import { MissionData } from "@/types/mission";

export function getSimulatedMissionData(previousStability?: number): MissionData {
  const random = (min: number, max: number) => Number((Math.random() * (max - min) + min).toFixed(1));
  const nextStabilityBase = previousStability ?? random(82, 99);
  const stability = Math.max(45, Math.min(100, Number((nextStabilityBase + random(-3.2, 2.2)).toFixed(1))));
  const drift = Number((100 - stability + random(0.5, 5.5)).toFixed(1));

  return {
    missionName: "Asterion-09",
    crew: "Unmanned",
    orbit: "LEO 408km",
    sensors: {
      temperature: random(64, 92),
      pressure: random(98, 105),
      oxygen: random(92, 100),
      radiation: random(1.2, 4.8)
    },
    energy: {
      battery: random(15, 100),
      solarOutput: random(2.8, 7.6),
      consumption: random(2.0, 8.3)
    },
    communication: {
      signalStrength: random(24, 100),
      latency: random(110, 780),
      packetLoss: random(0.2, 5.6)
    },
    orbital: {
      stability,
      drift
    },
    updatedAt: new Date().toISOString()
  };
}
