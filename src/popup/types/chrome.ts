interface TaskInfo {
  name: string,
  interval: number
}

export interface StorageType {
  [key: string]: TaskInfo
}
