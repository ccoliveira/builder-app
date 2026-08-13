<script>
  import {mapActions, mapGetters} from 'vuex';
  import SpanEmailStatus from './SpanEmailStatus';

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
    components: {
      SpanEmailStatus
    },
    mounted() {
      this.fetch({
        context: this,
        uri: '/email/' + this.$route.params.id
      }).then(response => {
        this.instance = response.data;
      })
    },
    computed: {
      ...mapGetters([
        'apiUrl'
      ]),
      showDeleteButton: function () {
        if (this.instance.status !== 'TO_SEND') {
          return false
        } else {
          return true
        }
      }
    },
    methods: {
      ...mapActions([
        'fetch',
        'delete',
        'showLoader',
        'hideLoader'
      ]),
      goToBack: function () {
        this.$router.push('/email');
      },
      _delete: function () {
        this.delete({
          context: this,
          uri: "/email/" + this.instance.id,
          successRouterPush: '/email'
        });
      },
      /*render: function (createElement) {
        return createElement(
          'p',
          this.$slot.default
        )
      }*/
    }
  }

</script>

<template>
  <modulePanel>
    <div slot="body">
      <el-row :gutter="10">
        <el-col :span="8">
          <div>
            <label>{{ $t('from') }}</label>
            <p id="from">
              {{instance.from}}
            </p>
          </div>
        </el-col>

        <el-col :span="8">
          <div>
            <label>{{ $t('to') }}</label>
            <p id="to">
              {{instance.to}}
            </p>
          </div>
        </el-col>

        <el-col :span="8">
          <div>
            <label>{{ $t('subject') }}</label>
            <p id="subject">
              {{instance.subject}}
            </p>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="6">
          <div>
            <label>{{ $t('withCopy') }}</label>
            <p id="withCopy">
              {{instance.withCopy}}
            </p>
          </div>
        </el-col>

        <el-col :span="6">
          <div>
            <label>{{ $t('withHiddenCopy') }}</label>
            <p id="withHiddenCopy">
              {{instance.withHiddenCopy}}
            </p>
          </div>
        </el-col>

        <el-col :span="6">
          <div>
            <label>{{ $t('status') }}</label>
            <p id="status">
              <SpanEmailStatus :value="instance.status" id="status"/>
            </p>
          </div>
        </el-col>

        <el-col :span="6">
          <div>
            <label>{{ $t('createdDate') }}</label>
            <p id="createdDate">
              {{instance.createdDate}}
            </p>
          </div>
        </el-col>
      </el-row>

      <el-row v-if="instance.statusMessage">
        <el-col :span="24">
          <div>
            <label>{{ $t('error') }}</label>
            <pre>{{ instance.statusMessage }}</pre>
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <div>
            <label>{{ $t('message') }}</label>
            <pre>{{ instance.message }}</pre>
          </div>
        </el-col>
      </el-row>

    </div>

    <el-row :gutter="10" slot="footer">
      <el-col :span="24">
        <FooterShow
          :showEdit="false"
          :showDelete="showDeleteButton"
          @delete="_delete()"
          @back-to-search="goToBack()"
          class="pull-right"/>
      </el-col>
    </el-row>
  </modulePanel>
</template>
