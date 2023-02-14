import { TaskInfo } from "../types";

export function IPCServiceWorker(message: any) {
  return chrome.runtime.sendMessage(message)
}

export function addTaskNotice(task: TaskInfo, buttons: chrome.notifications.ButtonOptions []) {
  const message = {
    title: '提示',
    message: `添加任务"${task.name}"成功~`,
    buttons
  }
  return IPCServiceWorker(message)
}

export function updateTaskNotice(task: TaskInfo, buttons: chrome.notifications.ButtonOptions []) {
  const message = {
    title: '提示',
    message: `更新任务"${task.name}"成功~`,
    buttons
  }
  return IPCServiceWorker(message)
}
