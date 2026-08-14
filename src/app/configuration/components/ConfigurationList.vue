<template>
  <div>
    <modulePanel>
      <div slot="body">
        <el-table
          :data="list(payload)"
          stripe
        >
          <el-table-column width="50">
            <template scope="scope">
              <el-button
                size="mini"
                icon="el-icon-edit"
                @click.prevent="openDialog(scope.row)"
              />
            </template>
          </el-table-column>

          <el-table-column
            prop="code"
            :label="$t('code')"
            width="300"
          />
          <el-table-column
            prop="value"
            :label="$t('value')"
          />
        </el-table>
      </div>
    </modulePanel>

    <ConfigurationEditDialog
      v-if="showDialog"
      v-model="showDialog"
      :payload="payload"
      :item-to-edit="itemToEdit"
      @changeSetting="changeSetting"
    />
  </div>
</template>
