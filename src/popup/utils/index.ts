import { StorageType } from '../types/chrome'

export function getChromeStorage(key: string | string[]) {
  return chrome.storage.local.get(key)
}

export async function setChromeStorage(value: StorageType) {
  chrome.storage.local.set(value).then(res => {
    console.log(res);
  })
}
