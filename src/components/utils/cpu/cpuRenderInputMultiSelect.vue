<script>
    export default{
    props: ["attr", "fieldValue"],
        data(){
            return{
            options: [{
                value: 'Option1',
                label: 'Option1'
              }, {
                value: 'Option2',
                label: 'Option2'
              }, {
                value: 'Option3',
                label: 'Option3'
              }, {
                value: 'Option4',
                label: 'Option4'
              }, {
                value: 'Option5',
                label: 'Option5'
              }],
            value5: ''
            }
        },
        components:{
        },
    computed: {
      updateFieldValue: {
        get: function() {
          return this.fieldValue;
        },
        set: function(newValue) {
          this.$emit('updateFieldValue', this.attr.columnName, newValue);
        }
      }
    }
    }

</script>
<template>
  <div>
    <el-form-item label="Label">
      <el-select v-model="updateFieldValue" multiple :placeholder="$t('select')">
        <el-option
          v-for="item in options"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
  </div>
</template>
