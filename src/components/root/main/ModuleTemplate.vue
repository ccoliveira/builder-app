
<template>
  <main>

    <div class="container-fluid" v-show="title">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-6">
            <div class="page-header">
              <h3 align="left">{{ title }}</h3>
            </div>
          </div>
          <div class="col-md-6 headerActions" v-show="showHeaderActions">
            <div class="pull-right">
              <slot name="headerActions"></slot>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--<div style="height: 50px; background-color: #ccc" v-show="subtitle">
      <h2>
        {{ subtitle }}
      </h2>
    </div>-->

    <section class="container-fluid">
      <slot></slot>
    </section>

  </main>
</template>
<style>
  .headerActions {
    margin-top: 20px;
  }
</style>
<script>
  export default{
    props: ['title', 'subtitle', 'fluid'],
    data() {
      return {
        showHeaderActions: true
      }
    },
    components: {
    },
    methods: {
      isFluid: function() {
        if (this.fluid == "true") {
          return "container-fluid"
        }
        return "container"
      }
    },
    mounted () {
      this.showHeaderActions = this.$slots['headerActions'] ? true : false;
    }
  }
</script>
