<template>
  <div id="zb_app">
    <div>
      <button
        v-for="(item,index) in arr"
        :key="index"
        :style="{background:item.isSelect?'red':''}"
        @click="item.isSelect = !item.isSelect"
      >{{item.name}}</button>
    </div>
    <button @click="sub">提交</button>
    <br>
    <!-- {{this.$store.state.log}} -->
    {{log}} {{num}}  <br>
    <button @click="add">++</button>


    <hr/>
    {{log}} {{num}}  <br>
    <button @click="zb_add">++</button>
  </div>
</template>

<script>
// import * as all from "vuex";
// console.log(all)
import {mapState,mapMutations} from "vuex"
//引入bottstrap样式
import "@/assets/bootstrap.css";
export default {
  // 组件名称
  name: "",
  // 组件参数 接收来自父组件的数据
  props: [],
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      arr: [
        { name: "吃饭", id: 1 },
        { name: "睡觉", id: 2 },
        { name: "打豆豆", id: 3 },
        { name: "玩闹闹", id: 4 }
      ]
    };
  },
  // 计算属性
  computed: {
    //vuex辅助函数
    ...mapState(["log","num"])
  },
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    //提交
    sub() {
      let newArr = [];
      this.arr
        .filter(item => {
          return item.isSelect;
        })
        .forEach(item => {
          newArr.push(item.id);
        });
      console.log(newArr);
      console.log(newArr.toString());
    },
    add(){
      this.$store.commit("zb_add",10);
    },
    ...mapMutations(["zb_add"])
  },
  // 以下是生命周期钩子   注：没用到的钩子请自行删除
  /**
   * 在实例初始化之后，组件属性计算之前，如data属性等
   */
  beforeCreate() {},
  /**
   * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
   */
  created() {
    this.arr = this.arr.map(item => {
      return {
        name: item.name,
        id: item.id,
        isSelect: false
      };
    });
  },
  /**
   * 在挂载开始之前被调用：相关的 render 函数首次被调用。
   */
  beforeMount() {},
  /**
   * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
   * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
   */
  mounted() {},
  /**
   * 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。
   * 你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。
   */
  beforeUpdate() {},
  /**
   * 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
   * 当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。
   */
  updated() {},
  /**
   * keep-alive 组件激活时调用。 仅针对keep-alive 组件有效
   */
  activated() {},
  /**
   * keep-alive 组件停用时调用。 仅针对keep-alive 组件有效
   */
  deactivated() {},
  /**
   * 实例销毁之前调用。在这一步，实例仍然完全可用。
   */
  beforeDestroy() {},
  /**
   * Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，
   * 所有的事件监听器会被移除，所有的子实例也会被销毁。
   */
  destroyed() {}
};
</script>

<style lang="scss" scoped>
</style>
