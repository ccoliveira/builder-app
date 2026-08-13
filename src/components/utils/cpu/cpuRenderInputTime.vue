<script>
  //TODO - QUANDO O VALOR É VAZIO O BANCO SALVA UM NUMERO
  import util from './cpuUtils';

  var moment = require('moment');

  export default{
    props: [
      "attr", "fieldValue", "rules", "placeholder", "label",
      "showHint", "hintValue", "moduleType"
    ],
    methods: {
      convertDate: function(val) {
        if(val) {
          return moment(val).format('HH:mm');
        }
        return '';
      }
    },
    computed: {
      updateFieldValue: {
        get: function() {
          let date = new Date();

          if (this.fieldValue) {
            let time = this.fieldValue.split(":");
            return new Date(date.getFullYear(), date.getMonth(), date.getDate(), time[0], time[1]);
          }

          return '';
        },
        set: function(newValue) {
          if (newValue && newValue !== undefined && newValue !== '') {
            this.$emit(
              'updateFieldValue',
              this.attr.columnName,
              newValue.getHours() + ":" + newValue.getMinutes()
            );
          } else {
            this.$emit(
              'updateFieldValue',
              this.attr.columnName,
              ""
            );
          }
        }
      }
    },
    created() {
      util.resolveRules(this.attr, this.rules);
    }
  }

</script>
<template>
  <div>
    <el-popover
      ref="popover"
      v-show="showHint"
      placement="top-start"
      width="200"
      trigger="hover"
      :content="hintValue">
    </el-popover>

    <el-form-item label="temp" :prop="attr.columnName" v-if="moduleType === 'form'">

      <span slot="label">
        {{label}} <i v-if="showHint && moduleType === 'form'" class="glyphicon glyphicon-question-sign" v-popover:popover />
      </span>

      <div class="block">
        <el-time-picker
          style="width: 100%;"
          v-model="updateFieldValue"
          format="HH:mm"
          :placeholder="placeholder">
        </el-time-picker>
      </div>
    </el-form-item>
    <div v-if="moduleType === 'show'">
      <label>{{label}}</label>
      <p>
        <span
          class="el-icon-time"
          aria-hidden="true"
          v-if="convertDate(updateFieldValue)"
        ></span>
        {{convertDate(updateFieldValue)}}
      </p>
    </div>
    <span v-if="moduleType === 'list'">
      <span>
        <span
          class="el-icon-time"
          aria-hidden="true"
          v-if="convertDate(updateFieldValue)"
        ></span>
        {{convertDate(updateFieldValue)}}
      </span>
    </span>
  </div>
</template>
