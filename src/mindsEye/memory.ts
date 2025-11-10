const store = new Map();

export function get(key: string) {
  return store.get(key);
}

export function set(key: string, value: any) {
  store.set(key, value);
}
