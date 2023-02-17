import { type TaskNotificationsMessage } from './types'

export const showNotification = (message: TaskNotificationsMessage, onButtonClick = (id: string, buttonIndex: number) => {}, onClose = () => {}) => {
  chrome.notifications.getPermissionLevel((level) => {
    if(level === 'granted') {
      const notificationOptions = {
        type: 'basic' as const,
        title: message.title,
        message: message.message,
        appIconMaskUrl: chrome.runtime.getURL("../assets/icon16.png"),
        iconUrl: chrome.runtime.getURL("../assets/icon48.png"),
        buttons: message.buttons ?? [ { title: '已完成！' }, { title: '稍后再做~' } ],
        requireInteraction: true
      }

      // 创建通知
      chrome.notifications.create(message.title + Date.now(), notificationOptions)
      // 交互回调
      chrome.notifications.onButtonClicked.addListener((clickedId, buttonIndex) => {
        onButtonClick(clickedId, buttonIndex)
      })
      // 关闭回调
      chrome.notifications.onClosed.addListener(() => {
        onClose()
      })
    } else {
      chrome.permissions.request({ permissions: ['notifications'] }, (granted) => {
        if(granted) {
          showNotification(message, onButtonClick, onClose)
        }
      })
    }
  })
}

export const clearNotification = () => {
  chrome.notifications.clear('reminder')
}
