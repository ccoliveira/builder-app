<script>

import draggable from 'vuedraggable';
import DialogEditColsSize from './DialogEditColsSize.vue';
import DialogEditComponentData from './DialogEditComponentData.vue';
import cpuRender from 'src/components/utils/cpu/cpuRender.vue';

import utils from '../FormBuilderUtils'

export default {
  name: 'ShowRows',
  props: ['value', 'form', 'viewSource'],
  data() {
    return {
      dialogEditRowData: {
        visible: false,
        data: []
      },
      dialogEditComponentData: {
        visible: false,
        data: []
      },
      rules: []
    }
  },
  computed: {
    _value: {
      get: function() {
        return this.value ? this.value : {};
      },
      set: function(newValue) {
        this.$emit('input', newValue);
      }
    },
    rows: function() {
      return this._value.rows;
    },
    fields: function() {
      return this._value.fields;
    }
  },
  components: {
    draggable, DialogEditColsSize, cpuRender, DialogEditComponentData
  },
  methods: {
    addRow: function(quantity) {
      utils.addRow(this.rows, quantity);
    },
    rowRemove: function(rowIndex) {
      if(!utils.rowRemove(rowIndex, this.rows)) {
        this.$message({
          type: 'error',
          message: this.$t('unableToRemoveTheLine')
        });
      } else {
        this.$message({
          type: 'success',
          message: this.$t('lineRemoved')
        });
      }
    },
    dialogEditRowOpen: function(cols) {
      this.dialogEditRowData.visible = true;
      this.dialogEditRowData.cols = cols;
    },
    getField: function(id) {
      return utils.findField(id, this.fields);
    },
    fieldRemove: function(fields, fieldPosition) {

      this.$confirm(this.$t('confirmRemoveTheComponent'), this.$t('warning'), {
        confirmButtonText: this.$t('yes'),
        cancelButtonText: this.$t('no'),
        type: 'error'
      }).then(() => {

        var elRemove = fields[fieldPosition];
        fields.splice(fieldPosition, 1);

        var indexRemove = utils.findFieldIndex(elRemove.id, this.fields);
        if (indexRemove >= 0) {
          this.fields.splice(indexRemove, 1);
        }

        this.$message({
          type: 'success',
          message: this.$t('componentRemoved')
        });
      });
    },
    fieldEdit: function(field) {
      this.dialogEditComponentData.data = utils.fieldBuildObject(field, this.fields);
      this.dialogEditComponentData.visible = true;
    }
  }
}

</script>

<style scoped>

div.row {
  margin-bottom: 15px;
}

div.col {
  border: 1px dotted #ccc;
  min-height: 45px;
}

.row-actions {
  clear: left;
  border: 1px dotted #ccc;
}

.dragArea {
  min-height: 35px;
}


</style>

<template>
  <div>
    <el-form label-position="top" label-width="100px">

      <draggable v-model="rows" :options="{group:'rows'}" class="dragArea">

        <div class="row" v-for="(row, index) in rows" :key="index">

          <div v-for="(col, colIndex) in row.cols" :key="colIndex" :class="'col col-xs-' + col.width">

            <draggable v-model="col.fields" :options="{group: { name: 'fields'} }" class="dragArea">
              <template v-for="(field, fieldIndex) in col.fields">
                <div :key="fieldIndex">
                  <div class="field-actions pull-right">
                    <span class="primary">{{$t(field.type)}}</span>
                    <el-button type="text" icon="setting" size="mini" :plain="true" @click="fieldEdit(field)" />
                    <el-button type="text" icon="delete" size="mini" :plain="true" @click="fieldRemove(col.fields, fieldIndex)" />
                  </div>
                  <cpuRender :type="field.type" :attr="getField(field.id)" :rules="rules"/>
                </div>
              </template>
            </draggable>

          </div>

          <div class="row-actions">
            <el-button type="text" icon="delete" size="mini" :plain="true" @click="rowRemove(index)"></el-button>
            <el-button type="text" icon="setting" size="mini" :plain="true"
                       @click="dialogEditRowOpen(row.cols)"></el-button>
          </div>

        </div>
      </draggable>

    </el-form>

    <DialogEditColsSize :dialogEditRowData="dialogEditRowData" />
    <DialogEditComponentData
      :dialogData="dialogEditComponentData"
      :fields="fields"
      :form="form"
      :viewSource="viewSource">
    </DialogEditComponentData>

  </div>
</template>
