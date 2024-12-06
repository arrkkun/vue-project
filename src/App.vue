// 
<template>
  <div>
    <el-container style="height: 700px; border: 1px solid #eee">
      <!-- <el-header style="font-size: 40px; background-color: rgb(238, 241, 246)">
        Arona学生管理系统
      </el-header> -->
      <el-container>
        <!-- 状态栏 -->
        <el-aside width="200px">
          <el-menu :default-openeds="['1', '3']">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-message"></i>学生信息管理系统
              </template>
              <router-link to="/Ranking" tag="div">
                <el-menu-item index="1-1">成绩排名</el-menu-item>
              </router-link>
              <router-link to="/Scores" tag="div">
                <el-menu-item index="1-2">成绩管理</el-menu-item>
              </router-link>
            </el-submenu>
          </el-menu>
        </el-aside>
        

        <!-- 主体 -->
        <el-main>
          <router-view></router-view>
        </el-main>  
      </el-container>
    </el-container>
  </div>
</template>

<script>
// import EmpView from './views/tlias/EmpView.vue'

export default {
  // components: { EmpView },
  data(){
    return {
      message: "Hello World"
    }
  },
    methods: {

  }
}
</script>

<style>

</style>
