<template>
  <div class="mits__container">
    <div class="mits__operation-button">
      <el-button type="primary" size="large" :icon="Plus" circle @click="addTask" />
    </div>
    <div class="mits__content" v-loading="loading" style="height: 200px;">
      <task-list
        :task-list="taskList"
        @refresh-task-list="queryTaskList"
      />
      <el-pagination
        class="mits__pagination"
        background
        hide-on-single-page
        layout="prev, pager, next"
        v-model:page-size="page.pageSize"
        v-model:current-page="page.pageNo"
        :total="total"
        @current-change="queryTaskList"
      />
    </div>
    
    <!-- dialog -->
    <task-detail
      v-if="dialogInfo.visible"
      v-model:visible="dialogInfo.visible"
      :operation="dialogInfo.operation"
      @refresh-task-list="queryTaskList"
    />
  </div>
</template>

<script setup lang="ts">
  import { Plus } from '@element-plus/icons-vue'
  import TaskList from "./components/TaskList.vue"
  import TaskDetail from "./components/TaskDetail.vue"
  import { reactive, onMounted, ref } from 'vue'
  import { getTaskList } from './utils/index'

  // 分页信息
  const page = reactive({
    pageNo: 1,
    pageSize: 5
  })
  let total = ref(0)

  let taskList = reactive([])
  let loading = ref(false)
  onMounted(async () => {
    await queryTaskList()
  })
  
  const queryTaskList = async () => {
    try {
      loading.value = true
      const { task } = await getTaskList()
      const start = (page.pageNo - 1) * page.pageSize
      const end = start + page.pageSize
      total = task.length
      taskList = task.slice(start, end)
    } finally {
      loading.value = false
    }
  }

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

    &__operation-button {
      position: fixed;
      bottom: 80px;
      width: 100%;
      text-align: center;
    }
    
    &__pagination {
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
