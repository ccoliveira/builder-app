<script>

export default {
  name: "ResultTableDialogForm",
  props: ["value", "fieldDesc", "field"],
  data() {
    return {
      payload: {
        id: '',
        position: '',
        visibleToPt: true,
        visibleToEs: true,
        visibleToEn: true
      },
      rules: {
      }
    }
  },
  computed: {
    _value: {
      get: function() {
        return this.value;
      },
      set: function(newValue) {
        this.$emit('input', newValue);
      }
    },
    isValidToSubmit: function () {
      let self = this;

      return self.payload.id &&
        self.payload.position
    },
    fields: function () {
      let list = [];

      _.differenceBy(
        this.fieldDesc.fields,
        [{'type': 'header'}, {'type': 'button'}, {'type': 'collapse'}, {'type': 'grid'},
          {'type': 'inputCSV'}, {'type': 'textEditor'}],
        'type'
      ).map(it => {
        list.push({
          id: it.id,
          label: it.name
        });
      });

      return list;
    }
  },
  methods: {
    resetData: function() {
      Object.assign(this.$data, this.$options.data());
    },
    close: function() {
      this.resetData();
    },
    salveField: function () {
      this.$refs['payload'].validate((valid) => {
        if (valid) {

          this._value = false;

          this.$emit('save-field', this.payload);

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
  watch: {
    "field": function(newValue) {
      if(newValue && newValue.id) {
        Object.assign(this.payload, newValue);
      }
    }
  }
}
</script>

<template>

  <el-dialog :title="$t('displayFields')" :visible.sync="_value" @close="close" size="large" id="modal">

    <el-form :model="payload" :rules="rules" ref="payload" label-position="top">

      <el-row :gutter="20">
        <el-col :span="9">
          <el-form-item :label="$t('field')">

            <el-select v-model="payload.id"
                       clearable
            >
              <el-option v-for="item in fields"
                         :key="item.id"
                         :label="item.label"
                         :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item :label="$t('position')">
            <el-input-number v-model="payload.position" id="position" ></el-input-number>
          </el-form-item>
        </el-col>

        <el-col :span="3">
          <el-form-item :label="$t('visibleToPt')">
            <el-switch v-model="payload.visibleToPt" :on-text="$t('yes')" :off-text="$t('no')"></el-switch>
          </el-form-item>
        </el-col>

        <el-col :span="3">
          <el-form-item :label="$t('visibleToEs')">
            <el-switch v-model="payload.visibleToEs" :on-text="$t('yes')" :off-text="$t('no')"></el-switch>
          </el-form-item>
        </el-col>

        <el-col :span="3">
          <el-form-item :label="$t('visibleToEn')">
            <el-switch v-model="payload.visibleToEn" :on-text="$t('yes')" :off-text="$t('no')"></el-switch>
          </el-form-item>
        </el-col>

      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-button size="small" @click.prevent="salveField()" type="primary" :disabled="!isValidToSubmit">
            {{ $t('save') }}
          </el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>
