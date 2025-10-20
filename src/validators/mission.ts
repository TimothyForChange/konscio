import { MissionSchema } from '../schemas/mission';
import type { Mission } from '../types/mission';

/**
 * Validates the mission data object using the MissionSchema.
 *
 * @param missionData - The mission data object to validate.
 * @returns The validated mission object.
 * @throws If validation fails.
 */
export function validateMission(missionData: unknown): Mission {
  const result = MissionSchema.safeParse(missionData);

  if (!result.success) {
    throw new Error(`Mission validation failed: ${result.error.message}`);
  }

  return result.data;
}
