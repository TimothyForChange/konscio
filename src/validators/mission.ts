import { MissionSchema } from '../schemas/mission';
import type { Mission } from '../types/mission';

/**
 * Validates the structure and types of the mission data object.
 * This function uses the `MissionSchema` to parse and validate the input data.
 * It returns a typed `Mission` object on success.
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
