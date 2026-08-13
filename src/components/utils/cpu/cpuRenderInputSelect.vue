<script>
  export default{
    props: ["attr", "fieldValue"],
    data() {
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
        value: ''
      }
    },

    methods: {
      getLabel: function (){
        if (this.attr != undefined){
          if (this.attr.labelPt != undefined && this.attr.labelPt != ""){
            return this.attr.labelPt
          }
        }
        return "Label"
      },
      getPlaceholder: function (){
        if (this.attr != undefined){
          if(this.attr.placeholderPt != undefined && this.attr.placeholderPt != ""){
            return this.attr.placeholderPt
          }
        }
        return ""
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
  <el-form-item :label="getLabel()">
    <el-select v-model="updateFieldValue" :placeholder="getPlaceholder()">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </el-form-item>
</template>
