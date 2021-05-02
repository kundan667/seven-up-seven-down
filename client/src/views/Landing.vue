<template>
    <div class="container">
      <div class="start-game">
        <input type="text" 
          v-model="name" 
          placeholder="Enter Your Name">
        <button @click="enterGame()">Enter Game</button>
      </div>
    </div>
</template>

<script>

import axios from '@/axios'

export default {
  name: "Landing",
  data() {
    return {
      name:'',
    }
  },
  beforeCreate(){
      if( this.$store.getters.getUser != '' ){
        this.$router.history.push({name:'play-game'}) ;
      }
  },
  methods: {
    enterGame: async function(){
      if( this.name !== '' ){
        await axios.post("/entergame", { name: this.name })
        .then(res => {
          console.log("res::",res)
          if( res.status == 200 ){
            this.name = '';
            this.$store.commit('SET_USER',{name:res.data.name, id:res.data._id})
            this.$store.commit('SET_POINTS',{points:res.data.points})
            this.$router.history.push({name:'play-game'}) 
          }
        })
        .catch(err => console.log("err:",err))
      }
    }
  }
}
</script>

<style lang="css">
.container{
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1em;
  background-image: url("../assets/images/pattern_2.webp");
}
.start-game{
  display: grid;
  gap: .2em;
}
.start-game input{
  border: none;
  padding: .8em 1em;
}
.start-game button{
    border: none;
    padding: .8em 1em;
    background: #00e5e5;
}
</style>