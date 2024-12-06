<template>
  <div>
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input
          v-model="searchForm.studentName"
          placeholder="请输入学生姓名"
          @input="sanitizeUserInput"
        ></el-input>
      </el-form-item>
      <!-- <el-form-item label="学号">
        <el-input
          v-model="searchForm.studentId"
          placeholder="学号"
          @input="sanitizeStudentIdInput"
        ></el-input>
      </el-form-item> -->
      <!-- 查询按钮 -->
      <el-form-item>
        <el-button type="primary" @click="pageQuer()">查询</el-button>
      </el-form-item>
      <el-form-item class="add-student-btn">
        <el-button type="primary" @click="handlesaveStudent()">添加学生</el-button>
      </el-form-item>
      
    </el-form>

    <el-table :data="tableData">
      <el-table-column
        prop="studentId"
        label="学号"
        width="400"
      ></el-table-column>
      <el-table-column prop="studentName" label="姓名" ></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleStudent(scope.row)"
            >查看</el-button
          >
          <el-button type="primary" size="mini" @click="editItem(scope.row)"
            >修改成绩</el-button
          >
          <el-button type="danger" size="mini" @click="deleteItem(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>

  
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      tableData: [],
      searchForm: {
        studentName: "",
        studentId: "" // 新增学号字段
        // region: "",//新增地区字段
        // entrydata: []
      },
       dialogVisible: false,
      currentPage: 1,
      pageSize: 20,
      total: 0,

    };
  },
  methods: {
    sanitizeUserInput(val) {
      this.searchForm.studentName = val.trim();
    },
    sanitizeStudentIdInput(val) {
      this.searchForm.studentId = val.trim();
    },
    pageQuer(page = 1, pageSize = 20) {
      const params = {
        page,
        pageSize,
        studentName: this.searchForm.studentName,
        // studentId: this.searchForm.studentId, // 新增学号参数
        // region: this.searchForm.region
      };
      console.log('请求参数:', params);
      axios
        .get("http://localhost:8000/api/Scores/page/", { params })
        .then((result) => {
          if (result.data.code === 1) {
            this.tableData = result.data.data.records;
            this.total = result.data.data.total;
          }
          else {
            console.log('请求失败:', result.data.msg);
          }
        })
        .catch((error) => {
          console.error("请求失败:", error);
        });
    },
    editItem(row) {
      console.log(row);
      this.$router.push({
        path: '/Scores/UpdateScores',
        query:{id:row.studentId}
      });
      
    },
    
  
    deleteItem(row) {
      console.log(row);
      this.$confirm('此操作将永久删除该学生, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.delete(`http://localhost:8000/api/Scores/${row.studentId}`)
          .then((result) => {
            if (result.data.code === 1) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.pageQuer(this.currentPage, this.pageSize);
            }
            else {
              this.$message({
                type: 'error',
                message: '删除失败!'
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.pageQuer(this.currentPage, size);
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.pageQuer(currentPage, this.pageSize);
    }
    ,
    //跳转至添加学生页面
    handlesaveStudent() {
      //alert('添加学生');
      this.$router.push('/Scores/SaveStudent');
    },
    handleStudent(row){
      this.$router.push({
        path: '/Scores/Student',
        query:{id:row.studentId}
      });
    }
  },
  mounted() {
    this.pageQuer(this.currentPage, this.pageSize);
  }
};
</script>

<style scoped>
.demo-form-inline {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.add-student-btn {
  margin-left: auto;
}
</style>