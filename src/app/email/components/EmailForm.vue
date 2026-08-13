<script>
  import SpanEmailStatus from './SpanEmailStatus';
  import apiService from 'src/services/ApiService';
  import {mapActions, mapGetters} from 'vuex';

  export default {
    data() {
      return {
        payload: {
          instance: {
            id: '',
            from: '',
            to: '',
            message: '',
            subject: '',
            withCopy: '',
            withHiddenCopy: '',
            attachmentZipName: '',
            files: []
          },
          uri: '/email',
          showRouter: '/email/show',
          errors: [],
          context: this
        },
        config: {
          placeholderText: '',
          quickInsertButtons: ['embedly', 'table', 'ul', 'ol', 'hr'],
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
          ]
        }
      }
    },
    computed: {
      isValidToSubmit: function () {
        if (this.payload.instance.status !== 'SENT' && this.payload.instance.status !== 'ERROR'){
          return this.payload.instance.from &&
            this.payload.instance.to &&
            this.payload.instance.subject &&
            this.payload.instance.message
        } else {
          this.$message.error(this.$t('cannotBeUpdatedTheEmail'))
          return false
        }

      },
      statusShow: function () {
        if (this.payload.instance.id == '' ) {
          return false;
        } else {
          return true;
        }
      }
    },
    mounted () {

      let id = this.$route.params.id;

      if (id) {
        this.fetch({
          context: this,
          uri: '/email/' + this.$route.params.id
        }).then(response => {
          this.payload.instance = response.data;
        })
      }
    },
    methods: {
      ...mapActions([
        'fetch',
        'save',
        'showLoader',
        'hideLoader'
      ]),
      backToSearch: function () {
        this.$router.push('/email');
      },
      backToShow: function () {
        this.$router.push('/email/show/' + this.$route.params.id);
      },
      openFile: function (event) {
        var input = event.target;
        var file = input.files[0];

        this.payload.instance.files.push(file)

        console.log("file -> ", file);

        var formData = new FormData(this);

        formData.append('file', file);

        $.ajax({
          url: 'http://localhost:8080/api/email',
          type: 'POST',
          data: formData,
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJwcmluY2lwYWwiOiJINHNJQUFBQUFBQUFBSldXTzI4Y1ZSU0E3enEyZ2hRVUVpU1FLRUpENk5CNjdqenZ5RlVTQlNTMFNoREdUWkJBOXpXYlNXWm5Oak96aWQwZ1YxQ2tDQUlpSWZnTCtTZlE4QU1RRkxTcGFibjNPdlo2enpsU2hDdnIyXC9OK3pYM3hrdTBNUFV2bXZheWJZYnBzVnZPNm5RN0x2bTduZzlXcnZoNlBwcXZCOXNhT1FlS1RJSGpnQ0R2NW0yeXh5WXh0MVdaa2I4OGV5TWR5dDVIdGZQZXVlbUQxdUhmWXM3anI1NjhzVnIxYzJDZGRcLzNCNlpsdDN2ZDF3c0RZOStXV0xYYnpIcmtxdHUxVTczdW5hMjRmTHVyZm1IcnV5WnJOT1BcL1RvSGUxK3NlMVl5Mlk0TDNyUnRsSTExc3pZSmJrYTczZk9hMjJIa2IxMUV1eHFySnZkZlR2dXpkZ2JTemtNTGpxUXlmN29RXC9lXC8rekJibDhFajlnM2JQbHhPM0orcjNZZGVkT3J0VEc5MVRlT3lycnQydUg3UUxqcFRWN1YzN3V3ZlhcL3ZoajJlXC9IaDlzTWVacTh0SHJkZGI4dlp2cytMZXZcL24wXC9GSHFpUlwvYnV1ZERYWW51SFN4Zk4xYlhsTDNyclBmXC81ODJjXC9QblwvNTNaY1huR2N2OGZIXC83OGYxRzY4cWQzU3JXeXhsTDhmdVhJK2MyU2ZiN3Y5SHp2ak4xeHNcLzdjTFJkTDllTEJ2ckpxb2RyVGx6c1RiczB0M3V1K2EwM2lONzhcL083czl0ZlI3eUlvaWdlUEw1OEJwUFl3UWpBUEhGTUExaVVrVE94Q1RsM2doeW94M0h1cUFJd1VkaFJuR29jVXB3N1IzRU9vUEp4aWsyWXhCN21FRllFekNyc1wvUVFtQUFwdlUyN0NOTXF3elpSTGx6dVU5TG5EZ3FSSmdSMmxpU0ZnVHNTWkZxN0tIT1NlQ2s2b0N4OW5BYUhBUlU0cjM0NXNFMlkrVFY1Q21HUDFMQ0s2bVhHQnZXZXB6NzJDME9YT29jMk1FeUZseElSa3VjYnptUW1OZTVTVk9SR25KaFloQ3dVQjNjeVRCS3ZudnNZSUZrUTljMEZKU2tNNDBzVEc1Y1lIbndKWStlQkxDQW52QlMreDl5S21ZT1pUNGhBYVFsS1V1SFJGbVRwdG9DNGlpVzBLN3BmTFFFajBTTVFHcHltOElJZnFPWEhCaEN3SXFCSzhzRUtuK0xBSUxYSGxoYzBKU1d1SU5DdGlpOHZZVDRNRk1KeGZVTTh5NVlSNldlTGdTMVhpUzF0V0VoOXFHYW9FSktVZzBwUmxqRE9TbG1Pb01tTGZWYWJ3dnF1d0NTbUVGbytORWlrdWlCTEVTVmRTNGdPb2pKUGtZQkUwVFwvRFVhWCs5NFlEcFdPRWU2ZGdkRmc1S0ZcL1lWcVlmUEdaZ1E3VWVSSnhCYVhEcGRKZGk3Q2JNQSttNFM0czRiYW90TitLQ0FPSTFNOFVmS1dHTHFUTGcyd0x1TkJKYTBJU1FJYzBsQVNWeEZLeldlRUd0VHdudlFCN25iaXJnMnRqTDRLbGJob3c4R3JGTEV6RmRWU05NXC9vSGFrV2RTdGU2ZGREczlFXC83NmR6anIzdW4zNnpcL2VcL1BcL3ZnTFwvZm0rcFR0UEpiTnlycFg2cFcxMEozVlF0bisyeGZQcjEzNjZlK240YzEzK3Y3XC9EMW9ERzRGRERBQUEiLCJzdWIiOiJhZG1pbiIsInJvbGVzIjpbIlJPTEVfMDE3MDAwMiIsIlJPTEVfMDMyMDAwMCIsIlJPTEVfMDYzMDAwYyIsIlJPTEVfMDc5MDAxNyIsIlJPTEVfMTEwMDAxMCIsIlJPTEVfMjI2MDAwYiIsIlJPTEVfMjNiMDAwMCIsIlJPTEVfMjRjMDAwMiIsIlJPTEVfMjY5MDAyNiIsIlJPTEVfMmIyMDAwOCIsIlJPTEVfMzIyMDAwNiIsIlJPTEVfMzJmMDAwNiIsIlJPTEVfMzVmMDAwMCIsIlJPTEVfMzVmMDAwMyIsIlJPTEVfMzgyMDAwYSIsIlJPTEVfNDA1MDAwNiIsIlJPTEVfNDFhMDAxYSIsIlJPTEVfNDI2MDAxMCIsIlJPTEVfNDM3MDAwMyIsIlJPTEVfNDNkMDAwMyIsIlJPTEVfNDZmMDAwMCIsIlJPTEVfNDcxMDAxOCIsIlJPTEVfNDgxMDAwMyIsIlJPTEVfNDg1MDAwNyIsIlJPTEVfNDg4MDAwMiIsIlJPTEVfNGZiMDAwNSIsIlJPTEVfNTA1MDAxOSIsIlJPTEVfNTA2MDAwMiIsIlJPTEVfNTBiMDAwMCIsIlJPTEVfNTE4MDAwNyIsIlJPTEVfNTQ3MDAwZiIsIlJPTEVfNTRkMDAxMiIsIlJPTEVfNTUxMDAwNSIsIlJPTEVfNTVjMDAwMiIsIlJPTEVfNTZjMDAwYyIsIlJPTEVfNThjMDAwNiIsIlJPTEVfNTk2MDAwMCIsIlJPTEVfNWM3MDAwMiIsIlJPTEVfNWZiMDAwYSIsIlJPTEVfNjMzMDAwMCIsIlJPTEVfNjUwMDAwMCIsIlJPTEVfNjdiMDAwNSIsIlJPTEVfNjgwMDAwMCIsIlJPTEVfNmFkMDAwYSIsIlJPTEVfNmMzMDAwYyIsIlJPTEVfNmQ2MDAwNCIsIlJPTEVfNmY3MDAwOSIsIlJPTEVfNmZiMDAwNSIsIlJPTEVfNzE5MDAwMCIsIlJPTEVfNzI5MDAwMCIsIlJPTEVfNzU1MDAwMSIsIlJPTEVfNzVkMDAwMCIsIlJPTEVfNzg5MDAwMiIsIlJPTEVfNzk0MDAxMSIsIlJPTEVfODBhMDAwMSIsIlJPTEVfODEyMDAwZCIsIlJPTEVfODE2MDAwMCIsIlJPTEVfODJkMDAwOSIsIlJPTEVfODYwMDAxZCIsIlJPTEVfODYyMDAwMCIsIlJPTEVfOGE3MDAwMCIsIlJPTEVfOGIzMDAxYSIsIlJPTEVfOGM0MDAwOCIsIlJPTEVfOGNhMDAwNCIsIlJPTEVfOGU2MDAwOCIsIlJPTEVfOGVkMDAwMSIsIlJPTEVfOGZmMDAwMCIsIlJPTEVfOTI4MDAwZSIsIlJPTEVfOTMyMDAwMiIsIlJPTEVfOTQxMDAwMCIsIlJPTEVfOTk5MDAxYSIsIlJPTEVfOWI5MDAwYiIsIlJPTEVfOWZhMDAxNyIsIlJPTEVfYTYyMDAwYiIsIlJPTEVfYThhMDAwNCIsIlJPTEVfYTkyMDAwMSIsIlJPTEVfYWUxMDAwMSIsIlJPTEVfYjU4MDAwNyIsIlJPTEVfYjViMDAwZiIsIlJPTEVfYjY4MDAwNCIsIlJPTEVfYjZlMDAxMSIsIlJPTEVfYjg0MDAwMiIsIlJPTEVfYjhmMDAwNiIsIlJPTEVfYmFhMDAwMyIsIlJPTEVfYmRmMDAxNSIsIlJPTEVfYzEzMDAwZCIsIlJPTEVfYzFhMDAwOSIsIlJPTEVfYzJiMDAwZSIsIlJPTEVfYzJjMDAxYiIsIlJPTEVfYzMwMDAwOSIsIlJPTEVfYzRjMDAwOCIsIlJPTEVfY2E3MDAxMyIsIlJPTEVfY2FlMDAwNyIsIlJPTEVfY2YzMDAwZSIsIlJPTEVfZDEwMDAwYSIsIlJPTEVfZDM1MDAwNyIsIlJPTEVfZDU1MDAwMSIsIlJPTEVfZDZmMDAwOSIsIlJPTEVfZGE0MDAxMCIsIlJPTEVfZGUxMDAwMCIsIlJPTEVfZGY3MDAwYSIsIlJPTEVfZTA4MDAwMCIsIlJPTEVfZTM1MDAwMCIsIlJPTEVfZTZhMDAwMCIsIlJPTEVfZWEwMDAwMCIsIlJPTEVfZWFjMDAwNCIsIlJPTEVfZWU0MDAwYSIsIlJPTEVfZWVhMDAwNyIsIlJPTEVfZWZhMDAwMSIsIlJPTEVfZWZkMDAwNSIsIlJPTEVfZjVmMDAwMiIsIlJPTEVfZmIyMDAwMSIsIlJPTEVfZmY4MDAwMCJdLCJleHAiOjE1MTMzNjQyMjIsImlhdCI6MTUxMzM0NjIyMn0.DiC5bdU06pFkdjf1VidlbRTK4uXioRuTeYSZaT8B9Qw',
            'Content-Type': 'application/json'
          },
          success: function (data) {
              alert(data)
          },
          cache: false,
          contentType: false,
          processData: false,
          xhr: function() {  // Custom XMLHttpRequest
              var myXhr = $.ajaxSettings.xhr();
              if (myXhr.upload) { // Avalia se tem suporte a propriedade upload
                  myXhr.upload.addEventListener('progress', function () {
                      /* faz alguma coisa durante o progresso do upload */
                  }, false);
              }
          return myXhr;
          }
      });
      }
    },
    components: {
      SpanEmailStatus
    }
  }
</script>

<template>

  <div>
    <modulePanel>
      <div slot="body">
        <bootstrap-alert-errors :errors="payload.errors"></bootstrap-alert-errors>

        <el-form label-position="top">
          <el-row :gutter="10">

            <el-col :md="8">
              <el-form-item :label="$t('from')">
                <el-input :placeholder="$t('from')" v-model="payload.instance.from" id="from"/>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item :label="$t('to')">
                <el-input :placeholder="$t('to')" v-model="payload.instance.to" id="to"/>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item :label="$t('subject')">
                <el-input :placeholder="$t('subject')" v-model="payload.instance.subject" id="subject"/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="10">
            <el-col :md="6">
              <el-form-item :label="$t('withCopy')">
                <el-input :placeholder="$t('withCopy')" v-model="payload.instance.withCopy" id="withCopy"/>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item :label="$t('withHiddenCopy')">
                <el-input :placeholder="$t('withHiddenCopy')" v-model="payload.instance.withHiddenCopy" id="withHiddenCopy"/>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <div v-if="statusShow">
                <label>{{ $t('status') }}</label>
                <p id="status">
                  <SpanEmailStatus :value="payload.instance.status" id="status"/>
                </p>
              </div>
            </el-col>

            <el-col :md="6">
              <el-form-item :label="$t('createdDate')">
                <el-input :placeholder="$t('createdDate')" v-model="payload.instance.createdDate" id="createdDate"/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="10">
            <el-col :span="24">
              <el-form-item :label="$t('message')">
                <froala v-model="payload.instance.message"
                        :class="{ 'has-error' : payload.errors.message }"
                        :config="config"
                        id="message">
                </froala>
              </el-form-item>
            </el-col>
          </el-row>

          <input type='file'
                 id="file"
                 @change='openFile'>

          <el-upload
            :headers="{'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJwcmluY2lwYWwiOiJINHNJQUFBQUFBQUFBSldXTzI4Y1ZSU0E3enEyZ2hRVUVpU1FLRUpENk5CNjdqenZ5RlVTQlNTMFNoREdUWkJBOXpXYlNXWm5Oak96aWQwZ1YxQ2tDQUlpSWZnTCtTZlE4QU1RRkxTcGFibjNPdlo2enpsU2hDdnIyXC9OK3pYM3hrdTBNUFV2bXZheWJZYnBzVnZPNm5RN0x2bTduZzlXcnZoNlBwcXZCOXNhT1FlS1RJSGpnQ0R2NW0yeXh5WXh0MVdaa2I4OGV5TWR5dDVIdGZQZXVlbUQxdUhmWXM3anI1NjhzVnIxYzJDZGRcLzNCNlpsdDN2ZDF3c0RZOStXV0xYYnpIcmtxdHUxVTczdW5hMjRmTHVyZm1IcnV5WnJOT1BcL1RvSGUxK3NlMVl5Mlk0TDNyUnRsSTExc3pZSmJrYTczZk9hMjJIa2IxMUV1eHFySnZkZlR2dXpkZ2JTemtNTGpxUXlmN29RXC9lXC8rekJibDhFajlnM2JQbHhPM0orcjNZZGVkT3J0VEc5MVRlT3lycnQydUg3UUxqcFRWN1YzN3V3ZlhcL3ZoajJlXC9IaDlzTWVacTh0SHJkZGI4dlp2cytMZXZcL24wXC9GSHFpUlwvYnV1ZERYWW51SFN4Zk4xYlhsTDNyclBmXC81ODJjXC9QblwvNTNaY1huR2N2OGZIXC83OGYxRzY4cWQzU3JXeXhsTDhmdVhJK2MyU2ZiN3Y5SHp2ak4xeHNcLzdjTFJkTDllTEJ2ckpxb2RyVGx6c1RiczB0M3V1K2EwM2lONzhcL083czl0ZlI3eUlvaWdlUEw1OEJwUFl3UWpBUEhGTUExaVVrVE94Q1RsM2doeW94M0h1cUFJd1VkaFJuR29jVXB3N1IzRU9vUEp4aWsyWXhCN21FRllFekNyc1wvUVFtQUFwdlUyN0NOTXF3elpSTGx6dVU5TG5EZ3FSSmdSMmxpU0ZnVHNTWkZxN0tIT1NlQ2s2b0N4OW5BYUhBUlU0cjM0NXNFMlkrVFY1Q21HUDFMQ0s2bVhHQnZXZXB6NzJDME9YT29jMk1FeUZseElSa3VjYnptUW1OZTVTVk9SR25KaFloQ3dVQjNjeVRCS3ZudnNZSUZrUTljMEZKU2tNNDBzVEc1Y1lIbndKWStlQkxDQW52QlMreDl5S21ZT1pUNGhBYVFsS1V1SFJGbVRwdG9DNGlpVzBLN3BmTFFFajBTTVFHcHltOElJZnFPWEhCaEN3SXFCSzhzRUtuK0xBSUxYSGxoYzBKU1d1SU5DdGlpOHZZVDRNRk1KeGZVTTh5NVlSNldlTGdTMVhpUzF0V0VoOXFHYW9FSktVZzBwUmxqRE9TbG1Pb01tTGZWYWJ3dnF1d0NTbUVGbytORWlrdWlCTEVTVmRTNGdPb2pKUGtZQkUwVFwvRFVhWCs5NFlEcFdPRWU2ZGdkRmc1S0ZcL1lWcVlmUEdaZ1E3VWVSSnhCYVhEcGRKZGk3Q2JNQSttNFM0czRiYW90TitLQ0FPSTFNOFVmS1dHTHFUTGcyd0x1TkJKYTBJU1FJYzBsQVNWeEZLeldlRUd0VHdudlFCN25iaXJnMnRqTDRLbGJob3c4R3JGTEV6RmRWU05NXC9vSGFrV2RTdGU2ZGREczlFXC83NmR6anIzdW4zNnpcL2VcL1BcL3ZnTFwvZm0rcFR0UEpiTnlycFg2cFcxMEozVlF0bisyeGZQcjEzNjZlK240YzEzK3Y3XC9EMW9ERzRGRERBQUEiLCJzdWIiOiJhZG1pbiIsInJvbGVzIjpbIlJPTEVfMDE3MDAwMiIsIlJPTEVfMDMyMDAwMCIsIlJPTEVfMDYzMDAwYyIsIlJPTEVfMDc5MDAxNyIsIlJPTEVfMTEwMDAxMCIsIlJPTEVfMjI2MDAwYiIsIlJPTEVfMjNiMDAwMCIsIlJPTEVfMjRjMDAwMiIsIlJPTEVfMjY5MDAyNiIsIlJPTEVfMmIyMDAwOCIsIlJPTEVfMzIyMDAwNiIsIlJPTEVfMzJmMDAwNiIsIlJPTEVfMzVmMDAwMCIsIlJPTEVfMzVmMDAwMyIsIlJPTEVfMzgyMDAwYSIsIlJPTEVfNDA1MDAwNiIsIlJPTEVfNDFhMDAxYSIsIlJPTEVfNDI2MDAxMCIsIlJPTEVfNDM3MDAwMyIsIlJPTEVfNDNkMDAwMyIsIlJPTEVfNDZmMDAwMCIsIlJPTEVfNDcxMDAxOCIsIlJPTEVfNDgxMDAwMyIsIlJPTEVfNDg1MDAwNyIsIlJPTEVfNDg4MDAwMiIsIlJPTEVfNGZiMDAwNSIsIlJPTEVfNTA1MDAxOSIsIlJPTEVfNTA2MDAwMiIsIlJPTEVfNTBiMDAwMCIsIlJPTEVfNTE4MDAwNyIsIlJPTEVfNTQ3MDAwZiIsIlJPTEVfNTRkMDAxMiIsIlJPTEVfNTUxMDAwNSIsIlJPTEVfNTVjMDAwMiIsIlJPTEVfNTZjMDAwYyIsIlJPTEVfNThjMDAwNiIsIlJPTEVfNTk2MDAwMCIsIlJPTEVfNWM3MDAwMiIsIlJPTEVfNWZiMDAwYSIsIlJPTEVfNjMzMDAwMCIsIlJPTEVfNjUwMDAwMCIsIlJPTEVfNjdiMDAwNSIsIlJPTEVfNjgwMDAwMCIsIlJPTEVfNmFkMDAwYSIsIlJPTEVfNmMzMDAwYyIsIlJPTEVfNmQ2MDAwNCIsIlJPTEVfNmY3MDAwOSIsIlJPTEVfNmZiMDAwNSIsIlJPTEVfNzE5MDAwMCIsIlJPTEVfNzI5MDAwMCIsIlJPTEVfNzU1MDAwMSIsIlJPTEVfNzVkMDAwMCIsIlJPTEVfNzg5MDAwMiIsIlJPTEVfNzk0MDAxMSIsIlJPTEVfODBhMDAwMSIsIlJPTEVfODEyMDAwZCIsIlJPTEVfODE2MDAwMCIsIlJPTEVfODJkMDAwOSIsIlJPTEVfODYwMDAxZCIsIlJPTEVfODYyMDAwMCIsIlJPTEVfOGE3MDAwMCIsIlJPTEVfOGIzMDAxYSIsIlJPTEVfOGM0MDAwOCIsIlJPTEVfOGNhMDAwNCIsIlJPTEVfOGU2MDAwOCIsIlJPTEVfOGVkMDAwMSIsIlJPTEVfOGZmMDAwMCIsIlJPTEVfOTI4MDAwZSIsIlJPTEVfOTMyMDAwMiIsIlJPTEVfOTQxMDAwMCIsIlJPTEVfOTk5MDAxYSIsIlJPTEVfOWI5MDAwYiIsIlJPTEVfOWZhMDAxNyIsIlJPTEVfYTYyMDAwYiIsIlJPTEVfYThhMDAwNCIsIlJPTEVfYTkyMDAwMSIsIlJPTEVfYWUxMDAwMSIsIlJPTEVfYjU4MDAwNyIsIlJPTEVfYjViMDAwZiIsIlJPTEVfYjY4MDAwNCIsIlJPTEVfYjZlMDAxMSIsIlJPTEVfYjg0MDAwMiIsIlJPTEVfYjhmMDAwNiIsIlJPTEVfYmFhMDAwMyIsIlJPTEVfYmRmMDAxNSIsIlJPTEVfYzEzMDAwZCIsIlJPTEVfYzFhMDAwOSIsIlJPTEVfYzJiMDAwZSIsIlJPTEVfYzJjMDAxYiIsIlJPTEVfYzMwMDAwOSIsIlJPTEVfYzRjMDAwOCIsIlJPTEVfY2E3MDAxMyIsIlJPTEVfY2FlMDAwNyIsIlJPTEVfY2YzMDAwZSIsIlJPTEVfZDEwMDAwYSIsIlJPTEVfZDM1MDAwNyIsIlJPTEVfZDU1MDAwMSIsIlJPTEVfZDZmMDAwOSIsIlJPTEVfZGE0MDAxMCIsIlJPTEVfZGUxMDAwMCIsIlJPTEVfZGY3MDAwYSIsIlJPTEVfZTA4MDAwMCIsIlJPTEVfZTM1MDAwMCIsIlJPTEVfZTZhMDAwMCIsIlJPTEVfZWEwMDAwMCIsIlJPTEVfZWFjMDAwNCIsIlJPTEVfZWU0MDAwYSIsIlJPTEVfZWVhMDAwNyIsIlJPTEVfZWZhMDAwMSIsIlJPTEVfZWZkMDAwNSIsIlJPTEVfZjVmMDAwMiIsIlJPTEVfZmIyMDAwMSIsIlJPTEVfZmY4MDAwMCJdLCJleHAiOjE1MTMzNjQyMjIsImlhdCI6MTUxMzM0NjIyMn0.DiC5bdU06pFkdjf1VidlbRTK4uXioRuTeYSZaT8B9Qw', 'Content-Type': 'application/json'}"
            action="http://localhost:8080/api/email"

            multiple>
            <el-button size="small" type="primary">{{$t("file")}}</el-button>
          </el-upload>
          <!--

          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item :label="$t('zipName')">
                <el-input :placeholder="$t('zipName')" v-model="payload.instance.attachmentZipName" id="attachmentZipName"/>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item :label="$t('file')">
                <el-upload
                  multiple>
                  <el-button size="small" type="primary">{{$t("file")}}</el-button>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          -->
        </el-form>
      </div>

      <el-row :gutter="10" slot="footer">
        <el-col :span="24">
          <FooterCreateEdit
            :sendEnabled="isValidToSubmit"
            :detailsShow="payload.instance.id ? true : false"
            @do-send="save(payload)"
            @back-to-search="backToSearch()"
            @back-to-show="backToShow()" />
        </el-col>
      </el-row>
    </modulePanel>
  </div>
</template>
