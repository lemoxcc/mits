<template>
  <el-dialog
    class="task-detail"
    v-model="dialogVisible"
    :title="dialogTitle"
    width="70%"
    align-center
  >
    <el-form
      ref="taskInfoFormRef"
      :model="taskInfoForm"
      :rules="taskInfoFormRules"
      label-width="80px"
    >
      <el-form-item label="任务名称" prop="name">
        <el-input v-model="taskInfoForm.name" :maxlength="10" show-word-limit />
      </el-form-item>
      <el-form-item label="提示间隔">
      <el-select v-model="taskInfoForm.interval" placeholder="请选择提示间隔">
        <el-option v-for="option in promptIntervalOption" :label="option.label" :value="option.value" />
      </el-select>
    </el-form-item>
    <el-form-item label="状态">
      <el-switch v-model="taskInfoForm.status" />
    </el-form-item>
    <!-- <el-form-item label="提示时间" prop="promptTime">
      <el-time-picker
        v-model="taskInfoForm.promptTime"
        type="date"
        is-range
        range-separator="-"
        start-placeholder="请选择开始时间"
        end-placeholder="请选择结束时间"
        style="width: 100%"
      />
    </el-form-item> -->
    <el-form-item label="提示信息" prop="customPromptInfo">
      <el-input v-model="taskInfoForm.customPromptInfo" :autosize="{ minRows: 2, maxRows: 4 }" resize="none" :maxlength="50" show-word-limit type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="saveTask(taskInfoFormRef)">保存</el-button>
      <el-button  @click="closeDialog">取消</el-button>
    </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { computed, reactive, ref } from "vue"
  import { getTaskList, setTaskList, generateUUID } from '../utils/index'
  import type { FormInstance, FormRules } from 'element-plus'
  import { TaskInfo } from "../types";
  import { addTaskNotice, updateTaskNotice } from '../utils/ipc'

  const taskInfoFormRef = ref<FormInstance>()

  const props = defineProps({
    visible: Boolean,
    operation: {
      type: Number,
      default: 0
    }
  })
  
  const emit = defineEmits(['update:visible', 'refreshTaskList'])

  const dialogVisible = computed({
    get: () => {
      return props.visible
    },
    set: (status) => {
      emit('update:visible', status)
    }
  })

  const dialogTitle = computed(() => {
    return `${props.operation ? '编辑' : '添加'}任务`
  })

  let taskInfoForm = reactive({
    id: generateUUID(),
    name: '',
    status: true,
    interval: 5,
    // promptTime: [
    //   new Date(new Date().setHours(0, 0, 0, 0)),
    //   new Date(new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000 - 1),
    // ] as [Date, Date],
    customPromptInfo: ''
  })

  const promptIntervalOption = reactive([
    { label: '五分钟', value: 5 },
    { label: '十分钟', value: 10 },
    { label: '三十分钟', value: 30 },
  ])

  // task form rules
  const taskInfoFormRules = reactive<FormRules>({
    name: [{ required: true, message: '请输入任务名称', trigger: 'blur' }],
    // promptTime: [{ type: 'date', required: true, message: '请选择提示时间', trigger: 'change'}],
    customPromptInfo: [{ required: true, message: '请输入提示信息', trigger: 'blur' }]
  })

  const editDataInit = (taskInfo: TaskInfo) => {
    Object.assign(taskInfoForm, taskInfo)    
  }

  defineExpose({ editDataInit })

  const saveTask = async (formEl: FormInstance | undefined) => {
    if(!formEl) return
    await formEl.validate(async valid => {
      let { task: taskList } = await getTaskList()
      if(!Array.isArray(taskList)) {
        taskList = []
      }
      if(props.operation) {
        // 编辑
        taskList.forEach(item => {
          if(item.id === taskInfoForm.id) {
            Object.assign(item, taskInfoForm)
          }
        })
        await updateTaskNotice(taskInfoForm, [{ title: '确认' }])
      } else {
        // 新增
        taskList.push(taskInfoForm)
        await addTaskNotice(taskInfoForm, [{ title: '确认' }])
      }
      await setTaskList(taskList)
      emit('refreshTaskList')
      closeDialog()
    })
  }

  const closeDialog = () => {
    dialogVisible.value = false
  }

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
