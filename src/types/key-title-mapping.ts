/**
 * Represents a key-value map where technical keys (strings) are mapped to human-readable titles (strings).
 */
export interface KeyToTitleMap {
  [key: string]: string;
}

/**
 * Represents the container for the key-to-title mapping.
 */
export interface KeyTitleMapping {
  keyToTitleMap: KeyToTitleMap;
}
