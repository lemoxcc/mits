<template>
  <el-dialog
    class="task-detail"
    v-model="dialogVisible"
    :title="dialogTitle"
    width="70%"
    align-center
  >
    <el-form :model="taskInfoForm" label-width="70px">
      <el-form-item label="任务名称">
        <el-input v-model="taskInfoForm.name" :maxlength="10" show-word-limit />
      </el-form-item>
      <el-form-item label="提示间隔">
      <el-select v-model="taskInfoForm.interval" placeholder="请选择提示间隔">
        <el-option label="五分钟" :value="5" />
        <el-option label="十分钟" :value="10" />
        <el-option label="半个小时" :value="30" />
      </el-select>
    </el-form-item>
    <el-form-item label="提示时间">
      <el-col :span="11">
        <el-time-picker
          v-model="taskInfoForm.startTime"
          type="date"
          placeholder="请选择开始时间"
          style="width: 100%"
        />
      </el-col>
      <el-col :span="2" class="task-detail--tcenter">
        <span class="task-detail--gray-500">-</span>
      </el-col>
      <el-col :span="11">
        <el-time-picker
          v-model="taskInfoForm.endTime"
          placeholder="请选择结束时间"
          style="width: 100%"
        />
      </el-col>
    </el-form-item>
    <el-form-item label="提示信息">
      <el-input v-model="taskInfoForm.customPromptInfo" :autosize="{ minRows: 2, maxRows: 4 }" resize="none" :maxlength="50" show-word-limit type="textarea" />
    </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { computed, reactive } from "vue"

  const props = defineProps({
    visible: Boolean,
    operation: {
      type: String,
      default: ''
    }
  })
  
  const emit = defineEmits(['update:visible'])

  const dialogVisible = computed({
    get: () => {
      return props.visible
    },
    set: (status) => {
      emit('update:visible', status)
    }
  })

  const dialogTitle = computed(() => {
    return `${props.operation}任务`
  })

  const taskInfoForm = reactive({
    name: '',
    interval: 5,
    startTime: '',
    endTime: '',
    customPromptInfo: ''
  })

</script>

<style lang="scss" scoped>
  .task-detail {
    .el-input, .el-select {
      width: 240px;
    }

    // modify
    &--tcenter {
      text-align: center;
    }

    &--gray-500 {
      color: rgb(158, 149, 137);
    }
  }
</style>
