<script>
  import {mapActions} from 'vuex';

  import SpanNoLinkOrForm from './SpanNoLinkOrForm';

  export default{
    components: {
        SpanNoLinkOrForm
    },
    data () {
      return {
        instance: {
          businessLine: {},
          type: {},
          contract: {},
          form: {},
          parent: {}
        }
      }
    },
    mounted() {
      this.fetch({
        context: this,
        uri: '/menu/' + this.$route.params.id
      }).then(response => {
        this.instance = response.data;
      })
    },
    methods: {
      ...mapActions([
        'fetch',
        'delete',
        'showLoader',
        'hideLoader'
      ]),
      goToEdit: function () {
        this.$router.push('/menu/edit/' + this.instance.id);
      },
      goToBack: function () {
        this.$router.push('/menu');
      },
      menuBuilder: function() {
        this.$router.push('/menuBuilder/' + this.instance.id);
      },
      _delete: function () {
        this.delete({
          context: this,
          uri: "/menu/" + this.instance.id,
          successRouterPush: '/menu'
        });
      }
    }
  }
</script>

<template>
  <modulePanel>
    <div slot="body">
      <el-row :gutter="10">
        <el-col :span="24">

          <el-row :gutter="10">
            <el-col :span="8">
              <div>
                <label>{{ $t('name') }}</label>
                <p id="name">
                  {{instance.name}}
                </p>
              </div>
            </el-col>

            <el-col :span="8">
              <div>
                <label>{{ $t('position') }}</label>
                <p id="position">
                  {{instance.position}}
                </p>
              </div>
            </el-col>

            <el-col :span="8">
              <div>
                <label>{{ $t('menuType') }}</label>
                <p id="type">
                  <SpanNoLinkOrForm :value="instance.type"/>
                </p>
              </div>
            </el-col>


          </el-row>


          <el-row :gutter="10">

            <el-col :span="8">
              <div>
                <label>{{ $t('contract') }}</label>
                <p id="contract">
                  {{instance.contract.label}}
                </p>
              </div>
            </el-col>

            <el-col :span="8">
              <div>
                <label>{{ $t('parentMenu') }}</label>
                <p id="parentMenu">
                  {{instance.parent.label}}
                </p>
              </div>
            </el-col>

            <el-col :span="8">
              <div>
                <label>{{ $t('form') }}</label>
                <p id="form">
                  {{instance.form.label}}
                </p>
              </div>
            </el-col>
          </el-row>


          <el-row :gutter="10">

            <el-col :span="8">
              <div>
                <label>{{ $t('labelInPortuguese') }}</label>
                <p id="labelPt">
                  {{instance.labelPt}}
                </p>
              </div>
            </el-col>

            <el-col :span="8">
              <div>
                <label>{{ $t('labelInSpanish') }}</label>
                <p id="labelEs">
                  {{instance.labelEs}}
                </p>
              </div>
            </el-col>

            <el-col :span="8">
              <div>
                <label>{{ $t('labelInEnglish') }}</label>
                <p id="labelEn">
                  {{instance.labelEn}}
                </p>
              </div>
            </el-col>
          </el-row>

        </el-col>
      </el-row>
    </div>

    <el-row :gutter="10" slot="footer">
      <el-col :span="24">
        <FooterShow
          :showEdit="true"
          class="pull-right"
          :showDelete="true"
          @delete="_delete()"
          @edit="goToEdit()"
          @back-to-search="goToBack()"/>
      </el-col>
    </el-row>
  </modulePanel>
</template>
