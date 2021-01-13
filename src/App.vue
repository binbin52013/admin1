<template>
  <div id="zb_app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>


<style lang="scss">
* {
  padding: 0;
  margin: 0;
  list-style: none;
}
html,
body,
#zb_app {
  width: 100%;
  height: 100%;
}

</style>
