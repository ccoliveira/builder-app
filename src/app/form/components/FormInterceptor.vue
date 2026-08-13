<script>

import { mapActions } from 'vuex';
import apiService from 'src/services/ApiService'

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    formSource: {
      type: Object,
      default: () => ({})
    },
    formInterceptor: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      payload: {
        instance: {
          id: '',
          name: '',
          type: '',
          businessRule: { id: '' },
          active: true,
          form: { id: '' }
        },
        errors: []
      },
      typeList: [
        {
          value: '',
          label: ''
        },
        {
          value: 'BEFORE_VIEW',
          label: 'Before View'
        },
        {
          value: 'BEFORE_INSERT',
          label: 'Before Insert'
        },
        {
          value: 'BEFORE_UPDATE',
          label: 'Before Update'
        },
        {
          value: 'BEFORE_DELETE',
          label: 'Before Delete'
        },
        {
          value: 'AFTER_INSERT',
          label: 'After Insert'
        },
        {
          value: 'AFTER_UPDATE',
          label: 'After Update'
        },
        {
          value: 'AFTER_DELETE',
          label: 'After Delete'
        }
      ],
      typeFilter: {
        type: "SERVER"
      }
    }
  },
  watch: {
    formInterceptor: function(newValue) {
      if(newValue && newValue.id) {
        Object.assign(this.payload.instance, newValue);
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
    modalTitle: function() {
      if (this.payload.instance.id) {
        return this.$t('editInterceptor')
      }
      return this.$t('newInterceptor')
    }
  },
  methods: {
    ...mapActions([
      'showLoader',
      'hideLoader'
    ]),
    _save: function() {

      this.payload.instance.form.id = this.formSource.id;
      this.payload.uri = '/formInterceptor'
      this.payload.context = this;

      apiService.save(this.payload).then(() => {
        this._value = false;
        this.resetData();
        this.$emit('reload-form-interceptor');
      });
    },
    resetData: function() {
      Object.assign(this.$data, this.$options.data());
    },
    close: function() {
      this.resetData();
    }
  }
}
</script>

<template>
  <div>
    <el-dialog
      id="modal"
      :title="modalTitle"
      :visible.sync="_value"
      size="large"
      @close="close()"
    >

      <bootstrap-alert-errors :errors="payload.errors" />

      <el-form label-position="top">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item :label="$t('name')">
              <el-input
                id="name"
                v-model="payload.instance.name"
              />
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item :label="$t('type')">
              <el-select
                id="type"
                v-model="payload.instance.type"
                :placeholder="$t('select')"
                :class="{ 'has-error' : payload.errors.type }"
                clearable
                filterable
              >
                <el-option
                  v-for="item in typeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item :label="$t('businessRules')">
              <aio-select
                id="businessRule"
                v-model="payload.instance.businessRule.id"
                uri="/businessRule"
                :uri-filter="typeFilter"
                :format-label="(it) => { return it.code }"
              />
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item :label="$t('active')">
              <el-switch
                id="active"
                v-model="payload.instance.active"
                :on-text="$t('yes')"
                :off-text="$t('no')"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <template #footer>
        <el-button-group>
          <el-button
            id="buttonSave"
            type="primary"
            size="small"
            @click.prevent="_save()"
          >
            <i class="glyphicon glyphicon-ok" />
            {{ $t('save') }}
          </el-button>
          <el-button
            id="buttonClose"
            size="small"
            @click="_value = false"
          >
            <i class="glyphicon glyphicon-remove" />
            {{ $t('close') }}
          </el-button>
        </el-button-group>
      </template>
    </el-dialog>
  </div>
</template>
