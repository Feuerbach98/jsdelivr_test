<template>
  <div class="content bg-dark">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'Content',
}
</script>

<style scoped>
.content {
  min-height: 100vh;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
