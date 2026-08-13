<script>
  export default{
    props: ["fieldData", "disable"],
    data() {
      return{
      }
    },
    components: {
    }
  }
</script>
<template>
  <div class="col-xs-4">
    <el-form-item :label="$t('required')">
      <el-switch
        v-model="fieldData.required"
        :on-text="$t('yes')"
        :off-text="$t('no')"
        :disabled="disable"
      >
      </el-switch>
    </el-form-item>
  </div>
</template>
