export const showNotification = (message, onButtonClick = () => {}, onClose = () => {},id = 'reminder') => {
  console.log(onButtonClick);
  chrome.notifications.getPermissionLevel((level) => {
    if(level === 'granted') {
      const notificationOptions = {
        type: 'basic',
        title: message.title,
        message: message.message,
        iconUrl: message.icon || chrome.runtime.getURL("../assets/icon48.png"),
        buttons: id === 'reminder' ?
          [{title: '我有喝水哦！'}, {title: '手头有点事我过会再喝~'}] : [],
        requireInteraction: id === 'reminder'
      };
      chrome.notifications.create(id + Date.now(), notificationOptions);
      chrome.notifications.onButtonClicked.addListener((clickedId, buttonIndex) => {
        onButtonClick(clickedId, buttonIndex);
      });
      chrome.notifications.onClosed.addListener(() => {
        onClose();
      })
    } else {
      chrome.permissions.request('notifications', (granted) => {
        if(granted) {
          showNotification(message, onButtonClick, onClose, id);
        }
      });
    }
  })
};

export const clearNotification = () => {
  chrome.notifications.clear('reminder');
};