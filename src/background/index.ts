import { getTaskList } from './utils'
import { showNotification, clearNotification } from './notification.js'
import { TaskInfo } from './types';

const timer: { [index: string]: any } = {}

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
    const { task: TaskList = [] } = await getTaskList()
    TaskList.forEach(item => {
      if(item.status) {
        initializeTimer(item.id, item.interval, item)
      }
    })
  }
})

const onNotificationButtonClick = (clickedId: string, buttonIndex: number) => {
  console.log(clickedId, buttonIndex);
}

const onNotificationClose = () => {
  console.log('close');
}

const initializeTimer = (timerId: string, interval: number, task: TaskInfo) => {
  timer[timerId] = setInterval(() => {
    console.log(task.name)
    showNotification(
      {
        title: task.name,
        message: task.customPromptInfo
      }
    )
  }, interval * 1000)
}

const clearTimer = (timerId: string) => {
  debugger
  clearInterval(timer[timerId])
  delete timer?.[timerId]
}

chrome.runtime.onMessage.addListener((message, sender, sendRespons) => {
  showNotification(message)
  if(message.type === 'add' && message.task.status) {
    console.log('add timer', timer)
    initializeTimer(message.task.id, message.task.interval, message.task)
  } else if (message.type === 'delete') {
    console.log('del timer', timer)
    clearTimer(message.task.id)
  }
  
  sendRespons({ status: 'ok' })
})
