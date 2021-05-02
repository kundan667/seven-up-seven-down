<template>
    <div class="modal-box">
        <div :class="getWinLoose" class="box">
            <img v-if="win" :src="require('@/assets/icons/winner.png')" alt="winner">
            <img v-if="!win" :src="require('@/assets/icons/bad.png')" alt="losser">
            <h3 v-if="win">You won</h3>
            <h3 v-if="!win">You loose</h3>
            <h4><img :src="require('@/assets/icons/coin.png')" alt="winner"> {{ amount }}</h4>
            <button @click="okClick()"><b>Ok</b></button>
        </div>
        
    </div>
</template>

<script>
export default {
    name: "winloose",
    props: {
        win: {
            type: Boolean,
            default: false
        },
        amount: {
            type: Number,
            default: 0
        },
        click: {
            type: Function,
            default: null
        }
    },
    computed: {
        getWinLoose (){
            return this.win ? 'win' : 'loose' ;
        }
    },
    methods: {
        okClick(){
            if(this.click){
                this.click();
            }
            this.$emit("click");
        }
    }
}
</script>

<style scoped>

.modal-box{
    box-shadow: 5px 12px 80px 35px #000000;
    border: 10px solid yellow;
    border-radius: 8px;
    width: 90%;
}
.modal-box .box{
    padding: 1em;
}
.modal-box .win{
    background: linear-gradient(to bottom, #f31f81 0%, #e40015 150%);
}
.modal-box .loose{
        background: linear-gradient(to bottom, #057cb4 0%, #01862a 150%);
}
.modal-box button{
    border: none;
    background: #FFD700;
    padding: .6em 1em;
    border-radius: 4px;
    margin: .5em 0;
}
.modal-box h3{
    margin: 0;
}
.modal-box h4{
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
}
</style>