<script>
  import utils from '../FormBuilderUtils'
  export default {
    name: 'BuilderRows',
    props: ['rows'],
    data() {
      return {
      }
    },
    components: {
    },
    methods: {
      addRow: function(quantity) {
        utils.addRow(this.rows, quantity);
      }
    }
  }
</script>

<template>
  <div>
    <div class="row">
      <div class="col-xs-6">
        <el-button @click="addRow(1)" size="small">
          {{ $t('column') }} 1
        </el-button>
      </div>
      <div class="col-xs-6">
        <el-button @click="addRow(2)" size="small">
          {{ $t('column') }} 2
        </el-button>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-6">
        <el-button @click="addRow(3)" size="small">
          {{ $t('column') }} 3
        </el-button>
      </div>
      <div class="col-xs-6">
        <el-button @click="addRow(4)" size="small">
          {{ $t('column') }} 4
        </el-button>
      </div>
    </div>
  </div>
</template>
