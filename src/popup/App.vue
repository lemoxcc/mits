<template>
  <div class="mits__container">
    <div class="mits__operation-button">
      <el-button @click="addTask">添加</el-button>
      <el-button @click="editTask">编辑</el-button>
    </div>
    <div class="mits__content" v-loading="loading" style="height: 200px;">
      <task-list :list="taskList" />
    </div>
    
    <!-- dialog -->
    <task-detail v-if="dialogInfo.visible" v-model:visible="dialogInfo.visible" :operation="dialogInfo.operation" />
  </div>
</template>

<script setup lang="ts">
  import TaskList from "./components/TaskList.vue"
  import TaskDetail from "./components/TaskDetail.vue"
  import { reactive, onMounted, ref } from 'vue'
  import { getChromeStorage } from './utils/index'

  
  let taskList = reactive([])
  let loading = ref(false)
  onMounted(async () => {
    try {
      loading.value = true
      const { task } = await getChromeStorage('task')
      taskList = task
    } finally {
      loading.value = false
    }
  })

  const dialogInfo = reactive({
    visible: false,
    operation: ''
  })

  const addTask = () => {
    dialogInfo.operation = '添加'
    dialogInfo.visible = true
  }

  const editTask = () => {
    dialogInfo.operation = '编辑'
    dialogInfo.visible = true
  }

</script>

<style lang="scss">
  .mits {
    &__container {
      width: 680px;
      height: 520px;
    }
  }
</style>
