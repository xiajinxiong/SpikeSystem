<template>
  <el-form>
    <el-form-item label="Id">
      <el-input v-model.trim="user.sid" />
    </el-form-item>
    <el-form-item label="Password">
      <el-input type="password" v-model.trim="user.password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">Create Account</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          sid: '',
          password: ''
        }
      }
    }
  },
  methods: {
    submit() {
      this.$message({
        message: 'User information has been updated successfully',
        type: 'success',
        duration: 5 * 1000
      })
    }
  }
}
</script>
