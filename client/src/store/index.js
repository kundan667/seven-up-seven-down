import Vue from "vue"
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        name:'',
        points:'', 
        id: '',
        win: false,
    },

    // Sync
    mutations:{
        SET_USER(state, payload){
            state.id = payload.id;
            state.name = payload.name;
        },
        SET_POINTS(state, payload){
            state.points = payload.points;
        },
        LEAVE_GAME(state, payload){
            state.name = '';
            state.points = '';
        },
        WIN_LOOSE(state, payload){
            state.win = payload.win;
        }
    },
    actions:{
        setUser(state, payload){
            
        }
    },
    modules:{},
    getters:{
        getUser(state){
            return state.name
        },
        getUserId(state){
            return state.id
        },
        getPoints(state){
            return state.points
        },
        getWin(state){
            return state.win
        }
    },
    setters:{},
    plugins: [createPersistedState()],
});