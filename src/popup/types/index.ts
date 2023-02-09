export interface TaskInfo {
  id: string
  name: string
  status: boolean
  interval: number
  customPromptInfo: string
}

export interface TaskList {
  [key: string]: TaskInfo[]
}
