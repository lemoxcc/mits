import { type TaskInfo, TaskList } from './types'

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