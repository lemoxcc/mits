import { showNotification, clearNotification } from './notification.js'

const config = {
  frequency: 3600000,
  botherFrequency: 300000,
  drinkDate: new Date("11 11,2011 11:11:11"),
  nextReminder: 233,
  version: '0.0.1'
};

const message = {
  installWelcomeTitle: 'Welcome to Mits',
  installWelcomeContent: 'Mits是一个基于系统级提示的Chrome插件',
  updateWelcomeTitle: 'Mits更新完成',
  updateWelcomeContent: '本次更新的内容可在Chrome Web Stroe中查看',
  todayTitle: '开启今天的喝水之旅了哟！',
  todayContent: `从现在开始，每过${Math.round(config.frequency/60000)}分钟我就会提醒你喝水！(。・\`ω´・)`,
  beginTitle: '我又开始运作了！',
  beginContent: `从现在开始，每过${Math.round(config.frequency/60000)}分钟我就会提醒你喝水！(。・\`ω´・)`,
  drinkTitle: '多喝热水！',
  drinkContent: '又到了喝水的时候啦，快快去接水喝！(≖ ‿ ≖)✧ ',
  drinkConfirm: '你有喝水嘛？',
  botherTitle: '怎么还不喝水！',
  botherContent: '信不信我烦死你，快去喝水！(/= _ =)/~┴┴',
  closeContent: '关了我今天就没人提醒你喝水了QAQ'
};


chrome.runtime.onInstalled.addListener((details) => {
  if(details.reason === 'install') {
    showNotification(
      {
        title: message.installWelcomeTitle,
        message: message.installWelcomeContent
      },
      onNotificationButtonClick,
      onNotificationClose,
    )
  } else if(details.reason === 'update') {
    showNotification(
      {
        title: message.updateWelcomeTitle,
        message: message.updateWelcomeContent
      },
      onNotificationButtonClick,
      onNotificationClose,
    )
  }
})

const onNotificationButtonClick = (clickedId: string, buttonIndex: number) => {
  console.log(clickedId, buttonIndex);
}

const onNotificationClose = () => {
  console.log('close');
}


// chrome.storage.onChanged.addListener((changes) => {
//   console.log(changes);
//   if(changes.drinkKong.newValue) {
//     Object.assign(config, changes.drinkKong.newValue);
//   }
// });

// chrome.runtime.onMessage.addListener((message, sender, sendRespons) => {
//   console.log(message, sender)
//   sendRespons({ status: 'ok' })
// })


// let status = 0; // 0: 已喝水状态  1: 打扰状态
// let timer = null;

// // 监听储存变化
// chrome.storage.onChanged.addListener((changes) => {
//   if(changes.drinkKong.newValue) {
//     Object.assign(config, changes.drinkKong.newValue);
//   }
// });

// chrome.storage.sync.get('drinkKong', (items) => {
//   const today = new Date();
//   if(items.drinkKong) {
//     const { drinkDate } = items.drinkKong;
//     // 初始化
//     if(drinkDate && Object.prototype.toString.call(drinkDate) === "[object Array]" &&
//       drinkDate.getDate() === today.getDate() && drinkDate.getMonth() === today.getMonth()) {
//       showNotification({
//         title: text.todayTitle,
//         message: text.todayContent
//       });
//     } else {
//       showNotification({
//         title: text.beginTitle,
//         message: text.beginContent
//       });
//       chrome.storage.sync.set({drinkKong:Object.assign(items,{drinkDate:today})});
//     }
//   } else {
//     chrome.storage.sync.set({drinkKong:Object.assign(config,{drinkDate:today})});
//   }
//   console.log(items);

//   // 断点续传（实际功能并未实现，仍需改进）
//   // let intervalLeft = config.frequency;
//   // if(items.nextReminder && items.nextReminder > Date.now()) {
//   //   intervalLeft = items.nextReminder - Date.now();
//   //   console.log('intervalLeft',intervalLeft);
//   // } else if(status === 0){
//   //   console.log(items.nextReminder, Date.now());
//   //   const nextReminder = Date.now() + config.frequency;
//   //   const nextItems = Object.assign(items.drinkKong, {nextReminder, drinkDate: new Date()});
//   //   chrome.storage.sync.set({drinkKong: nextItems});
//   // }
//   // timer = setTimeout(() => showReminder(status),intervalLeft);
//   showReminder(status);
// });

// // 根据status获取设定
// const timerConfig = (type) => {
//   const intervalConfig = [{
//     // 0 drink config
//       title: text.drinkTitle,
//       message: text.drinkContent,
//     },{
//     // 1 bother config
//       title: text.botherTitle,
//       message: text.botherContent
//     }
//   ];
//   return intervalConfig[type];
// };

// // 显示带按钮交互的提醒框
// const showReminder = (type) => {
//   const setting = timerConfig(type);
//   const onButtonClick = (buttonIndex) => {
//     status = buttonIndex;
//     const interval = status === 0 ? config.frequency : config.botherFrequency;
//     chrome.storage.sync.get('drinkKong', (items) => {
//       let intervalLeft = interval;
//       if(items.nextReminder && items.nextReminder > Date.now()) {
//         intervalLeft = items.nextReminder - Date.now();
//       } else if(status === 0){
//         const nextReminder = Date.now() + interval;
//         const nextItems = Object.assign(items.drinkKong, {nextReminder, drinkDate: new Date()});
//         chrome.storage.sync.set({drinkKong: nextItems});
//         console.log('nextItems', nextItems);
//       }
//       console.log(intervalLeft);
//       timer = setTimeout(() => showReminder(status),intervalLeft);
//     });
//     clearNotification();
//   };
//   const onClose = () => {
//     console.log('1');
//     if(confirm(text.closeContent)) {
//       clearTimeout(timer);
//     } else {
//       timer = setTimeout(() => showReminder(0),config.frequency);
//     }
//   };
//   showNotification(setting, onButtonClick, onClose, 'reminder');
// };
