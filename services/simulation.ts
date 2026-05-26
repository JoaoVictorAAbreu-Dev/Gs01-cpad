import { MissionData } from "@/types/mission";

export function getSimulatedMissionData(): MissionData {
  const random = (min: number, max: number) => Number((Math.random() * (max - min) + min).toFixed(1));
  return {
    missionName: "Asterion-09",
    crew: "Unmanned",
    orbit: "LEO 408km",
    sensors: {
      temperature: random(64, 88),
      pressure: random(98, 105),
      oxygen: random(92, 100),
      radiation: random(1.2, 4.2)
    },
    energy: {
      battery: random(18, 100),
      solarOutput: random(2.8, 7.6),
      consumption: random(2.0, 8.1)
    },
    communication: {
      signalStrength: random(28, 100),
      latency: random(110, 780),
      packetLoss: random(0.2, 4.8)
    },
    updatedAt: new Date().toISOString()
  };
}