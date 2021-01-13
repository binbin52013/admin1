import Vue from 'vue';
import Vuex from 'vuex';
//引入vuex 数据持久化插件
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex);

export default new Vuex.Store({
    //vuex 数据持久化
    plugins: [createPersistedState({
        storage: window.sessionStorage,
        reducer(val) {
            return {
                // 只储存state中的user和tokon
                user: val.user,
                token: val.token,
                zb_cart: val.zb_cart,
                historyList: val.historyList,
            }
        }
    })],
    state: {
        user: '',//用户名
        token: "", //token值
        zb_cart: [], //存储加入购物车的数据
        historyList: [],//模糊搜索历史记录存储
        log:"啊撒旦看风景阿斯顿",
        num:100,
    },
    mutations: {
        //获取用户名
        zb_getUser(state, user) {
            state.user = user
        },
        //token保存vuex中
        zb_setToken(state, token) {
            state.token = token;
        },
        //商品加入购物车
        zb_addCart(state, obj) {
            state.zb_cart.push(obj);
        },
        //如果购物车有商品 数量++
        zb_addNum(state, index) {
            state.zb_cart[index].number++;
        },
        //数量减减
        zb_cutNum(state, key) {
            state.zb_cart[key].number--;
        },
        //删除商品
        zb_remove(state, key) {
            state.zb_cart.splice(key, 1)
        },
        //添加历史记录
        zb_addHistory(state, name) {
            console.log(name);
            //长度限制
            if (state.historyList.length >= 8) {
                state.historyList.pop();
            }
            state.historyList.unshift(name);
        },
        //删除历史记录
        zb_removeHistory(state, index = 0) {
            state.historyList = [];
        },


         //如果购物车有商品 数量++
         zb_add(state) {
            state.num+=10
        },

    }, //操作state的方法 类似vue中的methods
    getters: {
        //商品总价
        zb_count(state) {
            var zb_sum = 0;
            state.zb_cart.forEach((item, key) => {
                return zb_sum += item.price * item.number;
            })
            return zb_sum;
        },
        //商品总数量
        zb_nums(state){
            var num = 0;
            state.zb_cart.forEach(item=>{
                 num += item.number;
            })
            console.log(num);
            return num;
        }

    }, //类似计算属性，可以操作state的数据
    actions: {
        //用户名
        zb_getUser(ctx, user) {
            ctx.commit('zb_getUser', user)
        }

    }, //异步操作mutations中的值
    modules: {} //把vuex拆分几个模块，模块化

})