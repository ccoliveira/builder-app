<script>
import { mapActions } from 'vuex';
import appConfig from '../../../services/AppConfigService';

export default {
  data() {
    return {
      instance: {
        id: '',
        type: 'background',
        instance: 'businessLine'
      },
      imageUrl: ''
    }
  },
  computed: {
    isValidToSubmit: function() {
      return this.instance.imageUrl != '';
    },
  },
  mounted() {
    this.instance.id = this.$route.params.id;
  },
  methods: {
    ...mapActions([
      'showLoader',
      'hideLoader',
      'businessLineDoSearch'
    ]),
    serverUrl: function() {
      return appConfig.apiUrl() + '/api/upload';
    },
    onChange: function(file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {

      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size < 950000;

      if (!isJPG) {
        this.$message.error(this.$t('imgFormat'));
        this.hideLoader();
        return false
      }
      if (!isLt2M) {
        this.$message.error(this.$t('imgLarger'));
        this.hideLoader();
        return false
      }
      return isJPG && isLt2M;
    },
    submitUpload() {
      this.showLoader();
      this.$refs.upload.submit();
    },
    handleAvatarSuccess(res, file) {
      this.businessLineDoSearch();
      this.hideLoader();
      this.$notify({
        title: this.$t('success'),
        message: this.$t('updatedSuccessfully'),
        type: 'success'
      });
      this.$router.push('/business-line/show/' + this.instance.id);
    },
    backToDetails: function() {
      this.$router.push('/business-line/show/' + this.instance.id);
    }
  }
}
</script>

<template>
  <modulePanel>
    <div slot="body">
      <el-form label-position="top">
        <el-row :gutter="10">
          <el-col
            id="uploadPicture"
            :span="12"
          >
            <el-upload
              ref="upload"
              :data="instance"
              :auto-upload="false"
              class="avatar-uploader"
              :action="serverUrl()"
              :show-file-list="false"
              :on-change="onChange"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="imageUrl"
                :src="imageUrl"
                class="avatar"
              >
              <i
                v-else
                class="line-height avatar-uploader-icon el-icon-plus"
              />
            </el-upload>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <el-row
      slot="footer"
      :gutter="10"
    >
      <el-col :span="24">
        <el-button
          id="buttonBackToDetails"
          size="small"
          @click.prevent="backToDetails()"
        >
          <i class="glyphicon glyphicon-chevron-left" />
          {{ $t('backToDetails') }}
        </el-button>
        <el-button
          id="buttonSaveUpload"
          type="primary"
          size="small"
          :disabled="!imageUrl"
          @click.prevent="submitUpload()"
        >
          <i class="glyphicon glyphicon-ok" /> {{ $t('save') }}
        </el-button>
      </el-col>
    </el-row>
  </modulePanel>
</template>
