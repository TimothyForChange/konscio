import { MissionSchema } from '../schemas/mission';
import type { Mission } from '../types/mission';

/**
 * Validates mission data using the MissionSchema.
 *
 * @param missionData - Mission data object to validate
 * @returns Validated mission object
 * @throws If validation fails
 */
export function validateMission(missionData: unknown): Mission {
  const result = MissionSchema.safeParse(missionData);

  if (!result.success) {
    throw new Error(`Mission validation failed: ${result.error.message}`);
  }

  return result.data;
}
