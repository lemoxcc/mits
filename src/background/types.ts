export interface TaskNotificationsMessage {
  title: string,
  message: string,
  buttons?: chrome.notifications.ButtonOptions []
}