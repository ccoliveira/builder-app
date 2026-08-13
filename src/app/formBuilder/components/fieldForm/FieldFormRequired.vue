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
      <!-- eslint-disable-next-line vue/no-mutating-props -- fieldData is intentionally filled in by this component -->
      <el-switch v-model="fieldData.required"
        :on-text="$t('yes')"
        :off-text="$t('no')"
        :disabled="disable"
      >
      </el-switch>
    </el-form-item>
  </div>
</template>
