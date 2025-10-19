import { MissionSchema } from '../schemas/mission';
import type { Mission } from '../types/mission';

export function validateMission(missionData: unknown): Mission {
  const result = MissionSchema.safeParse(missionData);

  if (!result.success) {
    throw new Error(`Mission validation failed: ${result.error.message}`);
  }

  return result.data;
}
