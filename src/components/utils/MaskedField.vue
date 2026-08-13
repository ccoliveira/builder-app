<script>
  export default{
    props: ["mask", "placeholder", "value"],
    computed: {
      _value: {
        get: function() {
          return this.value;
        },
        set: function(newValue) {
          this.$emit('input', newValue);
        }
      }
    }
  }

</script>

<template>
  <div>
    <div class="el-form-item__content">
      <div class="el-input">
        <input class="form-control el-input__inner"
               v-mask="mask"
               v-model="_value"
               :placeholder="placeholder" />
      </div>
    </div>
  </div>
</template>
