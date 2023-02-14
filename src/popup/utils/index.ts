import { TaskList, TaskInfo } from '../types'

export async function getChromeStorage(key: string | string[]) {
  return chrome.storage.local.get(key)
}

export async function setChromeStorage(value: TaskList) {
  chrome.storage.local.set(value)
}

export async function getTaskList(): Promise<TaskList> {
  return getChromeStorage('task')
}

export async function setTaskList(taskList: TaskInfo[]) {
  setChromeStorage({ task: taskList })
}


export function generateUUID() {
  if(typeof crypto === 'object') {
    if(typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID()
    }

    if(typeof crypto.getRandomValues === 'function' && typeof Uint8Array === 'function') {
      // @ts-ignore
      return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, (character) => {
        return (Number(character) ^ crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (character / 4))).toString(16)
      })
    }
  }

  let timestamp = new Date().getTime()
  let perforNow = (typeof performance !== 'undefined' && performance.now && performance.now() * 1000) || 0
  
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (character) => {
    let random = Math.random()
    if(timestamp > 0) {
      random = (timestamp * random) % 16 | 0
      timestamp = Math.floor(timestamp / 16)
    } else {
      random = (perforNow + random) % 16 | 0
      perforNow = Math.floor(perforNow / 16)
    }
    return (character === 'x' ? random : (random & 0x3) | 0x8).toString(16)
  })
}
