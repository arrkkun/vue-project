<template>
  <div>
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="科目">
        <el-input
          v-model="editForm.subject"
          placeholder="请输入科目名称"
          @input="sanitizeSubjectInput"
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
        <el-button type="primary" @click="setTypeAndQuery('subject')">按科目排名</el-button>
      </el-form-item>
      <el-form-item class="add-student-btn">
        <el-button type="primary" @click="setTypeAndQuery('average')">按平均分排名</el-button>
      </el-form-item>
      <el-form-item class="add-student-btn">
        <el-button type="primary" @click="setTypeAndQuery('total')">按总分排名</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData">
      <el-table-column
        prop="studentId"
        label="学号"
        width="400"
      ></el-table-column>
      <el-table-column prop="studentName" label="姓名"></el-table-column>
      <el-table-column prop="score" label="成绩"></el-table-column>

      <!-- <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="editItem(scope.row)">修改成绩</el-button>
          <el-button type="danger" size="mini" @click="deleteItem(scope.row)">删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="total"
      @size-change="(size) => handleSizeChange(size, type)"
      @current-change="(currentPage) => handleCurrentChange(currentPage, type)"
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
        studentId: "",
        score: "" // 新增学号字段
        // region: "",//新增地区字段
        // entrydata: []
      },
      dialogVisible: false,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      editForm: {
        subject: ""
      },
      type:""
    };
  },
  methods: {
    sanitizeSubjectInput(val) {
      this.editForm.subject = val.trim();
    },
    sanitizeStudentIdInput(val) {
      this.searchForm.studentId = val.trim();
    },
    setTypeAndQuery(type) {
    this.type = type;
    this.pageQuer(type);
  },
    pageQuer(type ='subject',page = 1, pageSize = 20) {
      // const params = {
      //   page,
      //   pageSize,
      //   subject: this.editForm.subject,
      //   // studentId: this.searchForm.studentId, // 新增学号参数
      //   // region: this.searchForm.region
      // };
      let params;
      let endpoint;

      switch (type) {
        case 'subject':
          params = {
            page,
            pageSize,
            subject: this.editForm.subject,
          };
          endpoint = 'pageScore';
          break;
        case 'average':
          params = {
            page,
            pageSize,
            // 根据实际情况添加其他参数
            // 例如：averageScore: this.someAverageScoreValue
          };
          endpoint = 'AveragepageScore'; // 假设有一个按平均分排名的端点
          break;
        case 'total':
          params = {
            page,
            pageSize,
          };
          endpoint = 'SumpageScore';
          break;
        default:
          params = {
            page,
            pageSize,
          };
          endpoint = 'SumpageScore';
      }
      console.log('请求参数:', params);
      axios
         .get(`http://localhost:8000/api/Raking/${endpoint}/`, { params })
        .then((result) => {
          if (result.data.code === 1) {
            this.tableData = result.data.data.records;
            this.total = result.data.data.total;
          } else {
            console.log('请求失败:', result.data.msg);
          }
        })
        .catch((error) => {
          console.error("请求失败:", error);
        });
    },



    handleSizeChange(size) {
      this.pageSize = size;
      this.pageQuer(this.type,this.currentPage, size);
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.pageQuer(this.type,currentPage, this.pageSize);
    }
  },
  mounted() {
    this.pageQuer(this.type,this.currentPage, this.pageSize);
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