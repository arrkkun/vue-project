<template>
  <el-form :model="searchForm" label-width="100px" class="save-student">
    <el-form-item label="科目">
      <el-input v-model="editForm.subject"></el-input>
    </el-form-item>
    <el-form-item label="成绩">
      <el-input v-model="editForm.score"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">保存</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm2">保存并继续修改</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
       editForm: {
        studentId: this.$route.query.id,
        subject: '',
        score: ''
      }
    };
  },

  methods: {
    submitForm() {
      // 这里可以添加保存学生信息的逻辑
      console.log('学号:', this.editForm.studentId);
      console.log('科目:', this.editForm.subject);
      console.log('成绩:', this.editForm.score);
      const score = parseInt(this.editForm.score, 10);
      axios.put('http://localhost:8000/api/Scores/', {
        studentId: this.editForm.studentId,
        subject: this.editForm.subject,
        score: score
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
      
    },
    submitForm2() {
      // 这里可以添加保存学生信息的逻辑
      console.log('学号:', this.editForm.studentId);
      console.log('科目:', this.editForm.subject);
      console.log('成绩:', this.editForm.score);
      const score = parseInt(this.editForm.score, 10);
      axios.put('http://localhost:8000/api/Scores/', {
        studentId: this.editForm.studentId,
        subject: this.editForm.subject,
        score: score
      })
      .then((result) => {
        if (result.data.code === 1) {
          this.$message({
            type: 'success',
            message: '保存成功!'
          });
        
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