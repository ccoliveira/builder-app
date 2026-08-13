<script>
  import {mapActions, mapGetters} from 'vuex';

  export default {
    data() {
      return {
        instance: {},
        config: {
          placeholderText: '',
          toolbarSticky: false,
          toolbarButtons: [
            'fullscreen',
            'undo',
            'redo', '|',
            'bold',
            'italic',
            'underline',
            'strikeThrough',
            'subscript',
            'superscript', '|',
            'fontFamily',
            'fontSize',
            'color',
            'inlineStyle',
            'paragraphStyle', '|',
            'paragraphFormat',
            'align',
            'formatOL',
            'formatUL',
            'outdent',
            'indent', '-',
            'quote',
            'insertLink',
            'insertTable', '|',
            'specialCharacters',
            'emoticons',
            'insertHR',
            'clearFormatting',
            'selectAll',
            'applyFormat',
            'removeFormat', '|',
            'html',
            'help'
          ],
          events : {
            'froalaEditor.initialized': function (e, editor) {
              editor.edit.off();
            }
          }
        }
      }
    },
    mounted() {
      this.fetch({
        context: this,
        uri: '/template/' + this.$route.params.id
      }).then(response => {
        this.instance = response.data;
      })
    },
    computed: {
      ...mapGetters([
        'apiUrl'
      ])
    },
    methods: {
      ...mapActions([
        'fetch',
        'delete',
        'showLoader',
        'hideLoader'
      ]),
      goToEdit: function () {
        this.$router.push('/template/edit/' + this.instance.id);
      },
      goToBack: function () {
        this.$router.push('/template');
      },
      _delete: function () {
        this.delete({
          context: this,
          uri: "/template/" + this.instance.id,
          successRouterPush: '/template'
        });
      }
    }
  }
</script>

<template>
  <modulePanel>
    <div slot="body">
      <el-row :gutter="10">
        <el-col :span="8">
          <div>
            <label>{{ $t('code') }}</label>
            <p id="code">
              {{instance.code}}
            </p>
          </div>
        </el-col>

        <el-col :span="8">
          <div>
            <label>{{ $t('name') }}</label>
            <p id="name">
              {{instance.name}}
            </p>
          </div>
        </el-col>
      </el-row>

      <el-row>
      <el-col :span="24">
        <div>
          <label>{{ $t('body') }}</label>
          <p id="body">
            <froala :config="config" v-model="instance.body"></froala>
          </p>
        </div>
      </el-col>
      </el-row>
    </div>

    <el-row :gutter="10" slot="footer">
      <el-col :span="24">
        <FooterShow
          :showEdit="true"
          @edit="goToEdit()"
          :showDelete="true"
          @delete="_delete()"
          @back-to-search="goToBack()"
          class="pull-right" />
      </el-col>
    </el-row>
  </modulePanel>
</template>
