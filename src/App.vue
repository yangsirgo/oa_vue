<template>
  <div id="app">
    <hello></hello>
  </div>
</template>

<script>
import Hello from './components/Login'

export default {
  components: {
    'hello':Hello
  }
}
</script>

<style>
html {
  height: 100%;
}

body{
    background: url(./assets/loginImage/bg.png) no-repeat center top;
}

</style>
