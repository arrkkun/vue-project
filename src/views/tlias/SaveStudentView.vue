<template>
  <el-form :model="searchForm" label-width="100px" class="save-student">
    <el-form-item label="姓名">
      <el-input v-model="searchForm.studentName" @input="sanitizeUserInput"></el-input>
    </el-form-item>
    <el-form-item label="学号">
      <el-input v-model="searchForm.studentId"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      searchForm: {
        studentName: "",
        studentId: ""
      }
    };
  },

  methods: {
    sanitizeUserInput(val) {
      this.searchForm.studentName = val.trim();
    },
    submitForm() {
      // 这里可以添加保存学生信息的逻辑
      console.log('学生姓名:', this.searchForm.studentName);
      console.log('学号:', this.searchForm.studentId);
      axios.post('http://localhost:8000/api/Scores/', {
        studentName: this.searchForm.studentName,
        studentId: this.searchForm.studentId
      })
      .then((result) => {
        if (result.data.code === 1) {
          this.$message({
            type: 'success',
            message: '保存成功!'
          });
         this.$router.push('/Scores');
        }
      })
      
    }
  }
};
</script>

<style scoped>
.save-student {
  max-width: 400px; /* 设置最大宽度 */
  margin: 0 auto; /* 水平居中 */
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.el-input {
  max-width: 200px; /* 限制输入框的最大宽度 */
}
</style>