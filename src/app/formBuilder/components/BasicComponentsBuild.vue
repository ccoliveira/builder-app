<script>
  export default{
    props: ["type"]
  }
</script>
<template>
  <div>

    <!--Básicos-->
    <div v-if="type == 'header'">
      <i class="glyphicon glyphicon-header"></i>
      {{ $t('header') }}
    </div>
    <div v-if="type == 'text'">
      <i class="glyphicon glyphicon-text-width"></i>
      {{ $t('text') }}
    </div>
    <div v-if="type == 'numeric'">
      <i class="glyphicon glyphicon-certificate"></i>
      {{ $t('numeric') }}
    </div>
    <div v-if="type == 'date'">
      <i class="glyphicon glyphicon-calendar"></i>
      {{ $t('date') }}
    </div>
    <div v-if="type == 'dateTime'">
      <i class="glyphicon glyphicon-calendar"></i>
      {{ $t('dateTime') }}
    </div>
    <div v-if="type == 'time'">
      <i class="glyphicon glyphicon-time"></i>
      {{ $t('time') }}
    </div>
    <div v-if="type == 'textArea'">
      <i class="glyphicon glyphicon-text-height"></i>
      {{ $t('textArea') }}
    </div>
    <div v-if="type == 'select'">
      <i class="glyphicon glyphicon-certificate"></i>
      {{ $t('comboBox') }}
    </div>
    <div v-if="type == 'boolean'">
      <i class="glyphicon glyphicon-adjust"></i>
      {{ $t('boolean') }}
    </div>
    <div v-if="type == 'composition'">
      <i class="glyphicon glyphicon-certificate"></i>
      {{ $t('composition') }}
    </div>
    <div v-if="type == 'association'">
      <i class="glyphicon glyphicon-font"></i>
      {{ $t('association') }}
    </div>
    <div v-if="type == 'button'">
      <i class="glyphicon glyphicon-certificate"></i>
      {{ $t('button') }}
    </div>
    <div v-if="type == 'password'">
      <i class="glyphicon glyphicon-lock"></i>
      {{ $t('password') }}
    </div>
    <div v-if="type == 'phone'">
      <i class="glyphicon glyphicon-phone-alt"></i>
      {{ $t('phone') }}
    </div>
    <div v-if="type == 'image'">
      <i class="glyphicon glyphicon-picture"></i>
      {{ $t('image') }}
    </div>
    <div v-if="type == 'label'">
      <i class="glyphicon glyphicon-certificate"></i>
      {{ $t('label') }}
    </div>

    <!--Custom-->
    <div v-if="type == 'cnpj'">
      <i class="glyphicon glyphicon-certificate"></i>
      {{ $t('cnpj') }}
    </div>
    <div v-if="type == 'cpf'">
      <i class="glyphicon glyphicon-certificate"></i>
      {{ $t('cpf') }}
    </div>
    <div v-if="type == 'currency'">
      <i class="glyphicon glyphicon-usd"></i>
      {{ $t('currency') }}
    </div>
    <div v-if="type == 'email'">
      <i class="glyphicon glyphicon-envelope"></i>
      {{ $t('email') }}
    </div>
    <div v-if="type == 'errorList'">
      <i class="glyphicon glyphicon-remove-circle"></i>
      {{ $t('errorList') }}
    </div>
    <div v-if="type == 'collapse'">
      <i class="glyphicon glyphicon-menu-down"></i>
      {{ $t('collapse') }}
    </div>
    <div v-if="type == 'file'">
      <i class="glyphicon glyphicon-cloud-upload"></i>
      {{ $t('file') }}
    </div>
    <div v-if="type == 'hidden'">
      <i class="glyphicon glyphicon-eye-close"></i>
      {{ $t('hidden') }}
    </div>
    <div v-if="type == 'dashboard'">
      <i class="glyphicon glyphicon-dashboard"></i>
      {{ $t('dashboard') }}
    </div>
    <div v-if="type == 'grid'">
      <i class="glyphicon glyphicon-th-list"></i>
      {{ $t('grid') }}
    </div>
    <div v-if="type == 'map'">
      <i class="glyphicon glyphicon-map-marker" />
      {{$t('map')}}
    </div>
    <div v-if="type == 'charges'">
      <i class="glyphicon glyphicon-barcode"></i>
      {{ $t('charges') }}
    </div>
    <div v-if="type == 'dealership'">
      <i class="glyphicon glyphicon-barcode"></i>
      {{ $t('dealership') }}
    </div>
    <div v-if="type == 'buttonReport'">
      <i class="glyphicon glyphicon-inbox"></i>
      {{ $t('buttonReport') }}
    </div>
    <div v-if="type == 'inputCSV'">
      <i class="glyphicon glyphicon-copy"></i>
      {{ $t('inputCSV') }}
    </div>
    <div v-if="type == 'textEditor'">
      <i class="glyphicon glyphicon-pencil"></i>
      {{ $t('textEditor') }}
    </div>

    <div v-if="type == 'float'">
      <i class="glyphicon glyphicon-certificate"></i>
      {{ $t('float') }}
    </div>

    <div v-if="type == 'buttonForm'">
      <i class="glyphicon glyphicon-list-alt"></i>
      {{ $t('buttonForm') }}
    </div>

    <!--Filter Design-->
    <div v-if="type == 'filterText'">
      <i class="glyphicon glyphicon-text-width"></i>
      {{ $t('filterText') }}
    </div>
    <div v-if="type == 'filterNumeric'">
      <i class="glyphicon glyphicon-certificate"></i>
      {{ $t('filterNumeric') }}
    </div>
    <div v-if="type == 'filterDate'">
      <i class="glyphicon glyphicon-calendar" />
      {{ $t('filterDate') }}
    </div>
    <div v-if="type == 'filterBoolean'">
      <i class="glyphicon glyphicon-adjust" />
      {{ $t('boolean') }}
    </div>
    <div v-if="type == 'buttonPrint'">
      <i class="glyphicon glyphicon-print"></i>
      {{ $t('buttonPrint') }}
    </div>
    <div v-if="type == 'buttonPDF'">
      <i class="glyphicon glyphicon-file"></i>
      {{ $t('buttonPDF') }}
    </div>
    <div v-if="type == 'customComponent'">
      <i class="glyphicon glyphicon-certificate"></i>
      {{ $t('customComponent') }}
    </div>

    <!--<div v-if="type == 'multiSelect'">Multi-Select</div>-->
    <!--<div v-if="type == 'upload'">Upload</div>-->
    <!--<div v-if="type == 'password'">Password</div>-->
    <!--<div v-if="type == 'button'">Button</div>-->
  </div>
</template>
<style scoped>
  div {
    margin: 0 2px 2px 0;
  }
  div.el-collapse-item__content {
    padding: 5px;
  }
</style>
