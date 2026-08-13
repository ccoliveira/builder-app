<script>

import utils from '../FormBuilderUtils';
import SelectForm from 'src/app/commons/components/SelectForm.vue';

export default {
  name: "ResultTableDialogForm",
  props: ["value", "fieldDesc", "field", "contractId"],
  data() {
    return {
      payload: {
        id: '',
        businessRules: {
          id: ''
        },
        form: {
          id: ''
        },
        name: '',
        icon: '',
        hintPt: '',
        backgroundColor: '',
        type: ''
      },
      rules: {}
    }
  },
  components: {
    SelectForm
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
      let hasBusinessRulesOrForm = false;
      if (self.payload.type === 'ACTION' && self.payload.businessRules.id) {
        hasBusinessRulesOrForm = true;
      } else if (self.payload.type === 'REPORT' && self.payload.form.id) {
        hasBusinessRulesOrForm = true;
      } else if (self.payload.type === 'LINK' && self.payload.form.id) {
        hasBusinessRulesOrForm = true;
      }

      return self.payload.name &&
        self.payload.backgroundColor &&
        self.payload.type &&
        self.payload.icon &&
        hasBusinessRulesOrForm &&
        self.payload.hintPt;
    },
    fields: function () {
      let list = [];

      _.differenceBy(
        this.fieldDesc.fields,
        [{'type': 'header'}, {'type': 'button'}, {'type': 'collapse'}],
        'type'
      ).map(it => {
        list.push({
          id: it.id,
          label: it.name
        });
      });

      return list;
    },
    typeList: function () {
      let options = [
        {
          value: '',
          label: ''
        },
        {
          value: 'ACTION',
          label: this.$t('action')
        },
        {
          value: 'REPORT',
          label: this.$t('report')
        },
        {
          value: 'LINK',
          label: this.$t('link')
        }
      ];

      return options;
    }
  },
  methods: {
    resetData: function() {
      Object.assign(this.$data, this.$options.data());
    },
    close: function() {
      this.resetData();
    },
    saveAction: function () {
      if (!this.payload.id) {
        this.payload.id = utils.generateId();
      }

      this.$emit('save-action', this.payload);
      this._value = false;
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

  <el-dialog :title="$t('actionButtons')" :visible.sync="_value" @close="close" size="large" id="modal">

    <el-form :model="payload" :rules="rules" ref="payload" label-position="top">

      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item :label="$t('name')">

            <el-input v-model="payload.name" id="name" ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item :label="$t('type')">
            <el-select v-model="payload.type" clearable :placeholder="$t('select')">
              <el-option
                v-for="item in typeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item :label="$t('businessRules')"
                        v-if="payload.type === 'ACTION'">
            <aio-select
              id="businessRules"
              v-model="payload.businessRules.id"
              uri="/businessRule"
              :formatLabel="(it) => { return it.code }"
            />
          </el-form-item>

          <el-form-item :label="$t('form')"
                        v-if="payload.type === 'REPORT'">

            <SelectForm
              id="formId"
              v-model="payload.form.id"
              formType="REPORT"
              :contractId="contractId"
            />

          </el-form-item>

          <el-form-item :label="$t('form')"
                        v-if="payload.type === 'LINK'">

            <SelectForm
              id="formId"
              v-model="payload.form.id"
              :contractId="contractId"
            />

          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item :label="$t('icon')">

            <el-input v-model="payload.icon" id="icon" ></el-input>
          </el-form-item>
        </el-col>

      </el-row>

      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item :label="$t('hintPt')">

            <el-input v-model="payload.hintPt" id="hintPt" ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item :label="$t('hintEs')">

            <el-input v-model="payload.hintEs" id="hintEs" ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item :label="$t('hintEn')">

            <el-input v-model="payload.hintEn" id="hintEn" ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item :label="$t('color')">
            <el-color-picker v-model="payload.backgroundColor" id="backgroundColor"></el-color-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-button size="small" @click.prevent="saveAction()" type="primary" :disabled="!isValidToSubmit">
            {{ $t('save') }}
          </el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>

</template>
