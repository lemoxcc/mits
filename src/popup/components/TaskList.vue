<template>
  <el-table :data="taskList" style="width: 100%">
    <el-table-column prop="name" label="任务名称" width="180" align="center" />
    <el-table-column prop="interval" label="提示间隔" width="80" align="center" />
    <el-table-column prop="customPromptInfo" label="提示信息" align="center" show-overflow-tooltip />
    <el-table-column label="操作" width="180" align="center">
      <template #>
        <el-button size="small">查看</el-button>
        <el-button size="small" type="primary">编辑</el-button>
        <el-button size="small" type="danger">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
  defineProps({
    taskList: {
      type: Array,
      default: () => []
    }
  })

  defineEmits(['refreshTaskList'])
</script>