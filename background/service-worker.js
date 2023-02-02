chrome.notifications.getPermissionLevel((val) => {
  console.log(val);
})

chrome.notifications.create('title', {
  type: 'basic',
  iconUrl: "../assets/icon16.png",
  title: 'title',
  message: 'test'
})
