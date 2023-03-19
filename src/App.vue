<script setup lang="ts">
import './assets/css/all.css'
import { useRoute, useRouter } from 'vue-router';
const router = useRouter()

type Data = {
  date: string;
}

router.push({
  path: '/calendar',
  // name: url, 用name会报错
  query: {
    // date: '2023.04.01'
    date: new Date().toDateString()
  },
})



</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <span style="color: #007bff ;font-family: SimSun;font-weight:900;">查看今天是什么班</span>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer><span style="color: #f00;">红色</span>白班<br/>
        <span style="color: #0f0;">绿色</span>夜班<br/>
        <span style="color: #ffc107;">黄色</span>中班</el-footer>
    </el-container>
  </div>
</template>


<style scoped>
#title {
  color: #007bff;
}

.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
  text-align: center;
  font-size: 20px
}
</style>
