<template>
  <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="label"
      label="属性"
      width="180">
    </el-table-column>
    <el-table-column
      prop="value"
      label="值">
    </el-table-column>
  </el-table>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      tableData: [],
      studentId: this.$route.query.id,
    };
  },
  created() {
    this.fetchStudentScores();
  },
  methods: {
    fetchStudentScores() {
      const url = `http://localhost:8000/api/Scores/${this.studentId}`;
      axios.get(url)
        .then(response => {
          if (response.data.code === 1) {
            const studentData = response.data.data;
            this.tableData = [
              { label: '姓名', value: studentData.studentName },
              { label: 'E1', value: studentData.e1 },
              { label: 'E2', value: studentData.e2 },
              { label: 'E3', value: studentData.e3 },
              { label: '微积分 1-1', value: studentData.calculus1_1 },
              { label: '微积分 1-2', value: studentData.calculus1_2 },
              { label: '线性代数', value: studentData.linearAlgebra },
              { label: '物理', value: studentData.physics },
              { label: '信息技术导论', value: studentData.introInfoTech },
              { label: '高级程序设计', value: studentData.advancedProgramDesign },
              { label: '高级程序设计实验', value: studentData.advancedProgramDesignLab },
              { label: '面向对象编程', value: studentData.objectOrientedProgramming },
              { label: '计算机组成原理', value: studentData.computerArchitecture },
              { label: '离散数学', value: studentData.discreteMath },
              { label: '汇编语言', value: studentData.assemblyLanguage },
              { label: '汇编语言实验', value: studentData.assemblyLanguageLab },
              { label: '编程训练', value: studentData.programmingTraining },
              { label: '计算机组成原理设计', value: studentData.computerArchitectureDesign },
              { label: '数字系统逻辑设计', value: studentData.digitalSystemsLogicDesign },
              { label: '数字系统逻辑实验', value: studentData.digitalSystemsLogicLab },
              { label: 'Java程序设计', value: studentData.javaProgramDesign },
              { label: '计算机专业认证', value: studentData.computerProfessionRecognition },
              { label: '思想道德与法治', value: studentData.moralAndLegalEducation },
              { label: '中国近现代史纲要', value: studentData.modernChineseHistory },
              { label: '马克思主义基本原理', value: studentData.marxistPrinciple },
              { label: '毛泽东思想和中国特色社会主义理论体系概论', value: studentData.maozedongThought },
              { label: '贵州概况', value: studentData.guizhouProvincialConditions },
              { label: '体育', value: studentData.physicalEducation },
              { label: '职业生涯规划', value: studentData.careerPlanning },
              { label: '军事理论与技能训练', value: studentData.militaryTheoryTraining },
              { label: '大学生心理健康教育', value: studentData.collegeMentalHealth },
            ];
          } else {
            console.error("请求失败:", response.data.msg);
          }
        })
        .catch(error => {
          console.error("请求失败:", error.response ? error.response.data : error.message);
        });
    }
  }
};
</script>