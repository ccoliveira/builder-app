<script>
import {mapActions} from 'vuex';

import apiService from 'src/services/ApiService';

export default {
  name: "ConfigurationEditDialog",
  props: {
    value: {
      type: Boolean,
      default: false
    },
    payload: {
      type: Object,
      default: () => ({})
    },
    itemToEdit: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      instance: {}
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
      return this.instance.value;
    }
  },
  methods: {
    ...mapActions([
      'showLoader',
      'hideLoader'
    ]),
    resetData: function() {
      Object.assign(this.$data, this.$options.data());
    },
    close: function() {
      this.resetData();
    },
    saveSetting: function () {
      let payloadWithInstance = Object.assign({}, this.payload);
      payloadWithInstance.instance = this.instance;
      payloadWithInstance.context = this;

      apiService.save(payloadWithInstance).then(() => {
        this.$emit('changeSetting');
      });
    }
  },
  mounted: function () {
    this.instance = Object.assign({}, this.itemToEdit);
  }
}
</script>

<template>
  <el-dialog
    id="modal"
    :title="$t('edit')"
    :visible.sync="_value"
    size="small"
    @close="close"
  >
    <el-form label-position="top">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="instance.code">
            <el-input-number
              v-if="instance.code == 'attachment.clear.files.days.to.keep'"
              v-model="instance.value"
            />
            <el-input
              v-else
              id="value"
              v-model="instance.value"
            />

            <!--
              attachment.clear.files.days.to.keep
            -->
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-button
            size="small"
            type="primary"
            :disabled="!isValidToSubmit"
            @click.prevent="saveSetting()"
          >
            {{ $t('save') }}
          </el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>
