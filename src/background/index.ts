import { getTaskList } from './utils'
import { showNotification, clearNotification } from './notification.js'
import { TaskInfo } from './types';

// 保存所有任务的计时器
const timer: { [index: string]: any } = {}

// 提示信息
const message = {
  installWelcomeTitle: 'Welcome to Mits',
  installWelcomeContent: 'Mits是一个基于系统级提示的Chrome插件',
  updateWelcomeTitle: 'Mits update completed',
  updateWelcomeContent: '本次更新的内容可在Chrome Web Stroe中查看'
}


chrome.runtime.onInstalled.addListener(async (details) => {
  if(details.reason === 'install') {
    showNotification(
      {
        title: message.installWelcomeTitle,
        message: message.installWelcomeContent
      }
    )
  } else if(details.reason === 'update') {
    showNotification(
      {
        title: message.updateWelcomeTitle,
        message: message.updateWelcomeContent
      }
    )
  }

  const { task: taskList = [] } = await getTaskList()
  taskList.forEach(task => {
    if(task.status) {
      initializeTimer(task.id, task.interval, task)
    }
  })
})

const onNotificationButtonClick = (clickedId: string, buttonIndex: number) => {
  console.log(clickedId, buttonIndex);
}

const onNotificationClose = () => {
  console.log('close');
}

const initializeTimer = (timerId: string, interval: number, task: TaskInfo) => {
  timer[timerId] = setInterval(() => {
    const message = {
      title: task.name,
      message: task.customPromptInfo
    }
    showNotification(message)
  }, interval * 60 * 1000)
}

const clearTimer = (timerId: string) => {
  if(timer[timerId]) {
    clearInterval(timer[timerId])
    delete timer?.[timerId]
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendRespons) => {
  showNotification(message)
  if(message.type === 'add') {
    if(message.task.status) {
      initializeTimer(message.task.id, message.task.interval, message.task)
    }
  } else if (message.type === 'update') {
    clearTimer(message.task.id)
    if(message.task.status) {
      initializeTimer(message.task.id, message.task.interval, message.task)
    }
  } else if (message.type === 'delete') {
    clearTimer(message.task.id)
  }

  sendRespons({ status: 'ok' })
})
