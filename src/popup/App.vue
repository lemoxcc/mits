<template>
  <div class="mits__container">
    <div class="mits__operation-button">
      <el-button @click="addTask">添加</el-button>
      <el-button @click="editTask">编辑</el-button>
    </div>
    <div class="mits__content">
      <task-list />
    </div>
    
    <!-- dialog -->
    <task-detail v-if="dialogInfo.visible" v-model:visible="dialogInfo.visible" :operation="dialogInfo.operation" />
  </div>
</template>

<script setup lang="ts">
  import TaskList from "./components/TaskList.vue"
  import TaskDetail from "./components/TaskDetail.vue"
  import { reactive } from 'vue'

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
