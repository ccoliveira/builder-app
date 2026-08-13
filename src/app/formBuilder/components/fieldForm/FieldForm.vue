<script>
  import FieldFormHeader from './FieldFormHeader.vue'
  import FieldFormText from './FieldFormText.vue'
  import FieldFormFilterBoolean from './FieldFormFilterBoolean.vue'
  import FieldFormNumeric from './FieldFormNumeric.vue'
  import FieldFormDate from './FieldFormDate.vue'
  import FieldFormDateTime from './FieldFormDateTime.vue'
  import FieldFormTime from './FieldFormTime.vue'
  import FieldFormTextArea from './FieldFormTextArea.vue'
  import FieldFormCnpj from './FieldFormCnpj.vue'
  import FieldFormCpf from './FieldFormCpf.vue'
  import FieldFormCurrency from './FieldFormCurrency.vue'
  import FieldFormEmail from './FieldFormEmail.vue'
  import FieldFormBoolean from './FieldFormBoolean.vue'
  import FieldFormSelect from './FieldFormSelect.vue'
  import FieldFormComposition from './FieldFormComposition.vue'
  import FieldFormAssociation from './FieldFormAssociation.vue'
  import FieldFormButton from './FieldFormButton.vue'
  import FieldFormButtonForm from './FieldFormButtonForm.vue'
  import FieldRenderErrorList from './FieldRenderErrorList.vue'
  import FieldFormPassword from './FieldFormPassword.vue'
  import FieldFormPhoneNumber from './FieldFormPhoneNumber.vue'
  import FieldFormCollapse from './FieldFormCollapse.vue'
  import FieldFormFile from './FieldFormFile.vue'
  import FieldFormImage from './FieldFormImage.vue'
  import FieldFormHidden from './FieldFormHidden.vue'
  import FieldFormDashboard from './FieldFormDashboard.vue'
  import FieldFormLabelComponent from './FieldFormLabelComponent.vue'
  import FieldFormGrid from './FieldFormGrid.vue'
  import FieldFormMap from './FieldFormMap.vue'
  import FieldFormDealership from './FieldFormDealership.vue'
  import FieldFormCharges from './FieldFormCharges.vue'
  import FieldFormButtonReport from './FieldFormButtonReport.vue'
  import FieldFormInputCsv from './FieldFormInputCsv.vue'
  import FieldFormTextEditor from './FieldFormTextEditor.vue'
  import FieldFormFloat from './FieldFormFloat.vue'
  import FieldFormButtonPrint from './FieldFormButtonPrint.vue'
  import FieldFormButtonPDF from './FieldFormButtonPDF.vue'
  import FieldFormCustomComponent from './FieldFormCustomComponent.vue'

  export default {
    name: 'FieldForm',
    props: ["type", "fieldData", "rules", "form", "viewSource", "contractId"],
    created() {
      Object.assign(this.rules, {});
    },
    components: {
      FieldFormHeader,
      FieldFormText,
      FieldFormFilterBoolean,
      FieldFormNumeric,
      FieldFormDate,
      FieldFormDateTime,
      FieldFormTime,
      FieldFormTextArea,
      FieldFormCnpj,
      FieldFormCpf,
      FieldFormCurrency,
      FieldFormEmail,
      FieldFormBoolean,
      FieldFormSelect,
      FieldFormComposition,
      FieldFormAssociation,
      FieldFormButton,
      FieldRenderErrorList,
      FieldFormPassword,
      FieldFormPhoneNumber,
      FieldFormCollapse,
      FieldFormFile,
      FieldFormImage,
      FieldFormHidden,
      FieldFormDashboard,
      FieldFormLabelComponent,
      FieldFormGrid,
      FieldFormMap,
      FieldFormDealership,
      FieldFormCharges,
      FieldFormButtonReport,
      FieldFormInputCsv,
      FieldFormTextEditor,
      FieldFormFloat,
      FieldFormButtonForm,
      FieldFormButtonPrint,
      FieldFormButtonPDF,
      FieldFormCustomComponent
    }
  }
</script>

<template>
  <div>
    <FieldFormHeader v-if="type == 'header'" :fieldData="fieldData" :rules="rules"></FieldFormHeader>
    <FieldFormCollapse v-if="type == 'collapse'" :fieldData="fieldData" :rules="rules"></FieldFormCollapse>
    <FieldFormText v-if="type == 'text' || type == 'filterText'" :fieldData="fieldData" :rules="rules"></FieldFormText>
    <FieldFormFilterBoolean v-if="type == 'filterBoolean'" :fieldData="fieldData" :rules="rules"></FieldFormFilterBoolean>
    <FieldFormPhoneNumber v-if="type == 'phone'" :fieldData="fieldData" :rules="rules"></FieldFormPhoneNumber>
    <FieldFormPassword v-if="type == 'password'" :fieldData="fieldData" :rules="rules"></FieldFormPassword>
    <FieldFormNumeric v-if="type == 'numeric' || type == 'filterNumeric'" :fieldData="fieldData" :rules="rules"></FieldFormNumeric>
    <FieldFormDate v-if="type == 'date' || type == 'filterDate'" :fieldData="fieldData" :rules="rules" />
    <FieldFormDateTime v-if="type == 'dateTime'" :fieldData="fieldData" :rules="rules"></FieldFormDateTime>
    <FieldFormTime v-if="type == 'time'" :fieldData="fieldData" :rules="rules"></FieldFormTime>
    <FieldFormTextArea v-if="type == 'textArea'" :fieldData="fieldData" :rules="rules"></FieldFormTextArea>
    <FieldFormCnpj v-if="type == 'cnpj'" :fieldData="fieldData" :rules="rules"></FieldFormCnpj>
    <FieldFormCpf v-if="type == 'cpf'" :fieldData="fieldData" :rules="rules"></FieldFormCpf>
    <FieldFormCurrency v-if="type == 'currency'" :fieldData="fieldData" :rules="rules"></FieldFormCurrency>
    <FieldFormEmail v-if="type == 'email'" :fieldData="fieldData" :rules="rules"></FieldFormEmail>
    <FieldFormBoolean v-if="type == 'boolean'" :fieldData="fieldData" :rules="rules"></FieldFormBoolean>
    <FieldFormSelect v-if="type == 'select'" :fieldData="fieldData" :rules="rules"></FieldFormSelect>
    <FieldFormComposition v-if="type == 'composition'" :viewSource="viewSource" :fieldData="fieldData" :rules="rules" :form="form"/>
    <FieldFormAssociation v-if="type == 'association'" :viewSource="viewSource" :fieldData="fieldData" :rules="rules" :form="form"/>
    <FieldFormButton v-if="type == 'button'" :fieldData="fieldData" :rules="rules"/>
    <FieldFormButtonPDF v-if="type == 'buttonPDF'" :fieldData="fieldData" :rules="rules"/>
    <FieldRenderErrorList v-if="type == 'errorList'" :fieldData="fieldData" :rules="rules"/>
    <FieldFormFile v-if="type == 'file'" :fieldData="fieldData" :rules="rules"/>
    <FieldFormImage v-if="type == 'image'" :fieldData="fieldData" :rules="rules"></FieldFormImage>
    <FieldFormHidden v-if="type == 'hidden'" :fieldData="fieldData" :rules="rules"></FieldFormHidden>
    <FieldFormDashboard v-if="type == 'dashboard'" :fieldData="fieldData" :rules="rules"></FieldFormDashboard>
    <FieldFormLabelComponent v-if="type == 'label'" :fieldData="fieldData" :rules="rules"></FieldFormLabelComponent>
    <FieldFormGrid v-if="type == 'grid'" :fieldData="fieldData" :contractId="form.contract.id" :rules="rules"></FieldFormGrid>
    <FieldFormMap v-if="type == 'map'" :fieldData="fieldData" :rules="rules"></FieldFormMap>
    <FieldFormDealership v-if="type == 'dealership'" :fieldData="fieldData" :rules="rules"></FieldFormDealership>
    <FieldFormCharges v-if="type == 'charges'" :fieldData="fieldData" :rules="rules"></FieldFormCharges>
    <FieldFormButtonReport v-if="type == 'buttonReport'" :fieldData="fieldData" :rules="rules" :contractId="contractId"></FieldFormButtonReport>
    <FieldFormInputCsv v-if="type == 'inputCSV'" :fieldData="fieldData" :rules="rules"></FieldFormInputCsv>
    <FieldFormTextEditor v-if="type == 'textEditor'" :fieldData="fieldData" :rules="rules"></FieldFormTextEditor>
    <FieldFormFloat v-if="type == 'float'" :fieldData="fieldData" :rules="rules"></FieldFormFloat>
    <FieldFormButtonForm v-if="type == 'buttonForm'" :fieldData="fieldData" :rules="rules" :contractId="contractId"></FieldFormButtonForm>
    <FieldFormButtonPrint v-if="type == 'buttonPrint'" :fieldData="fieldData" :rules="rules" :contractId="contractId"></FieldFormButtonPrint>
    <FieldFormCustomComponent v-if="type == 'customComponent'" :fieldData="fieldData" :rules="rules" :contractId="contractId"></FieldFormCustomComponent>
  </div>
</template>
