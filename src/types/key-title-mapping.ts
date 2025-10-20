/**
 * A key-value map from technical keys to human-readable titles.
 */
export interface KeyToTitleMap {
  [key: string]: string;
}

/**
 * The container for the key-to-title mapping.
 */
export interface KeyTitleMapping {
  keyToTitleMap: KeyToTitleMap;
}
