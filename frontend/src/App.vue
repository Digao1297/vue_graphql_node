<template>
  <div id="app">
    <div id="slogan" class="text-center">
      <h1>NameGator</h1>
      <br />
      <h6 class="text-secondary">Gerador de nomes utilizando Vue.js, GraphQL e Nodejs</h6>
    </div>
    <div id="main">
      <domain-list />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",

  components: {
    "domain-list": () => import("./components/DomainList")
  }
};
</script>

<style>
#slogan {
  margin: 30px 0 30px 0;
}
#main {
  background-color: #f1f1f1;
  padding: 30px 0 30px 0;
}
</style>
