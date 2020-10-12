<template>
  <a-row type="flex" justify="center">
    <a-col :span="14" class="bg">
      <router-view />
    </a-col>
  </a-row>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.bg{
  background: #eee;
}
.rowStyle{
  margin: 15px 0;
}
</style>
