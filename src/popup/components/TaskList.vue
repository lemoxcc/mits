<template>
  <div class="task-list">
    <el-table :data="taskList" height="285px" style="width: 100%">
      <el-table-column prop="name" label="任务名称" align="center" />
      <el-table-column prop="interval" label="提示间隔" align="center">
        <template #default="{ row }">
          {{ promptIntervalFormat[row.interval] }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" align="center">
        <template #default="{ row }">
          <el-switch v-model="row.status" @change="changeTaskStatus(row)" />
        </template>
      </el-table-column>
      <el-table-column prop="customPromptInfo" label="提示信息" align="center" show-overflow-tooltip />
      <el-table-column label="操作" width="120" align="center">
        <template #default="{ row }">
          <el-button size="small" type="primary" @click="editTask(row)">编辑</el-button>
          <el-button size="small" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { getTaskList, setTaskList } from '../utils/index'

defineProps({
  taskList: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['editTask', 'refreshTaskList'])

const promptIntervalFormat: { [index: number]: string } = reactive({
  5: '五分钟',
  10: '十分钟',
  30: '三十分钟'
})

// 切换任务状态
const changeTaskStatus = async (row: any) => {  
  const { task: taskList = []} = await getTaskList()

  taskList.forEach(task => {
    if(task.id === row.id) {
      task.status = row.status
    }
  })

  setTaskList(taskList)
}

// 编辑任务
const editTask = (row: any) => {
  emit('editTask', row)
}
</script>

<style lang="scss" scoped>

</style>
