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
        <el-option label="五分钟" :value="5" />
        <el-option label="十分钟" :value="10" />
        <el-option label="半个小时" :value="30" />
      </el-select>
    </el-form-item>
    <el-form-item label="提示时间" prop="promptTime">
      <el-time-picker
        v-model="taskInfoForm.promptTime"
        type="date"
        is-range
        range-separator="-"
        start-placeholder="请选择开始时间"
        end-placeholder="请选择结束时间"
        style="width: 100%"
      />
    </el-form-item>
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
  import { getChromeStorage, setChromeStorage } from '../utils/index'
  import type { FormInstance, FormRules } from 'element-plus'

  getChromeStorage('task').then(res => {
    console.log(res);
  })

  const taskInfoFormRef = ref<FormInstance>()

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
    promptTime: [
      new Date(new Date().setHours(0, 0, 0, 0)),
      new Date(new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000 - 1),
    ] as [Date, Date],
    customPromptInfo: ''
  })

  // task form rules
  const taskInfoFormRules = reactive<FormRules>({
    name: [{ required: true, message: '请输入任务名称', trigger: 'blur' }],
    // promptTime: [{ type: 'date', required: true, message: '请选择提示时间', trigger: 'change'}],
    customPromptInfo: [{ required: true, message: '请输入提示信息', trigger: 'blur' }]
  })

  const saveTask = async (formEl: FormInstance | undefined) => {
    if(!formEl) return
    await formEl.validate(async valid => {
      const { task: taskList } = await getChromeStorage('task')
      taskList.push(taskInfoForm)
      await setChromeStorage({ task: taskList })
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
