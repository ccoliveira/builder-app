<script>

  import FieldFormName from './FieldFormName'
  import FieldFormColumnName from './FieldFormColumnName'
  import FieldFormPersistent from './FieldFormPersistent'
  import FieldFormLabel from './FieldFormLabel'
  import FieldFormShowInDetails from './FieldFormShowInDetails'
  import FieldFormShowInForm from './FieldFormShowInForm'
  import FieldFormRequired from './FieldFormRequired.vue'
  import FieldFormHideOnPrint from './FieldFormHideOnPrint.vue'

  export default{
    props: ["fieldData", "rules"],
    data() {
      return{
      }
    },
    components: {
      FieldFormName,
      FieldFormColumnName,
      FieldFormPersistent,
      FieldFormLabel,
      FieldFormShowInDetails,
      FieldFormShowInForm,
      FieldFormRequired,
      FieldFormHideOnPrint
    },
  }
</script>

<template>
  <div>
    <div class="row">
      <FieldFormName :fieldData="fieldData" :rules="rules"/>
      <FieldFormColumnName :fieldData="fieldData" :rules="rules"/>
      <FieldFormRequired :fieldData="fieldData"></FieldFormRequired>
    </div>

    <div class="row">
      <FieldFormPersistent :fieldData="fieldData" :rules="rules" />
      <FieldFormShowInDetails :fieldData="fieldData" :rules="rules" />
      <FieldFormShowInForm :fieldData="fieldData" :rules="rules" />
    </div>

    <FieldFormLabel :fieldData="fieldData" :rules="rules"/>

    <div class="row">
      <FieldFormHideOnPrint :fieldData="fieldData" :rules="rules" />
    </div>
  </div>
</template>
