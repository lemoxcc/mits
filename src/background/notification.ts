import { type TaskNotificationsMessage } from './types'

export const showNotification = (message: TaskNotificationsMessage, onButtonClick = () => {}, onClose = () => {}) => {
  console.log(onButtonClick);
  chrome.notifications.getPermissionLevel((level) => {
    if(level === 'granted') {
      const notificationOptions = {
        type: 'basic',
        title: message.title,
        message: message.message,
        iconUrl: chrome.runtime.getURL("../assets/icon48.png"),
        buttons: [ {title: '已完成！'}, {title: '稍后再做~'} ],
        requireInteraction: true
      };
      chrome.notifications.create(message.title, notificationOptions);
      chrome.notifications.onButtonClicked.addListener((clickedId, buttonIndex) => {
        onButtonClick(clickedId, buttonIndex);
      });
      chrome.notifications.onClosed.addListener(() => {
        onClose();
      })
    } else {
      chrome.permissions.request({ permissions: ['notifications'] }, (granted) => {
        if(granted) {
          showNotification(message, onButtonClick, onClose);
        }
      })
    }
  })
};

export const clearNotification = () => {
  chrome.notifications.clear('reminder');
};
