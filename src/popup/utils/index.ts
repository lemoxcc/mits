import { StorageType } from '../types/chrome'

export function getChromeStorage(key: string | string[]) {
  return chrome.storage.local.get(key)
}

export async function setChromeStorage(value: StorageType) {
  await chrome.storage.local.set(value)
}
