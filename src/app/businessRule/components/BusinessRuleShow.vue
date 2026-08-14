<template>
  <modulePanel>
    <div slot="body">
      <el-row :gutter="10">
        <el-col :span="12">
          <div>
            <label>{{ $t('code') }}</label>
            <p id="code">
              {{ instance.code }}
            </p>
          </div>
        </el-col>

        <el-col :span="12">
          <div>
            <label>{{ $t('type') }}</label>
            <p id="type">
              <SpanServerOrClient :value="instance.type" />
            </p>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="24">
          <div>
            <label>{{ $t('description') }}</label>
            <p id="description">
              {{ instance.description }}
            </p>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="24">
          <div>
            <label>{{ $t('script') }}</label>
            <pre id="script">{{ instance.script }}</pre>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-row
      slot="footer"
      :gutter="10"
    >
      <el-col :span="24">
        <FooterShow
          :show-edit="true"
          :show-delete="true"
          class="pull-right"
          @edit="goToEdit()"
          @delete="_delete()"
          @back-to-search="goToBack()"
        />
      </el-col>
    </el-row>
  </modulePanel>
</template>
