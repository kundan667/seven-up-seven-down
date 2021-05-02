<template>
    <label :for="id" class="bet-card" @click="cardClick">
        <input type="radio" :id="id" name="card" :checked="checked">
        <div class="multiply"><b>{{times}}</b></div>
        <div class="main-card">
            <div class="card">
                <div><b>{{betType}}</b></div>
                <div class="check-box">
                    <div class="check">
                        <img :src="require('@/assets/icons/check.png')" alt=""> 
                    </div>
                </div>
                <div class="win-box">
                    <div class="win">
                        <div><b>Win Amount</b></div>
                        <div class="win-amount">
                            <img :src="require('@/assets/icons/coin.png')" alt="">
                            <span><b>{{winAmount}}</b></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </label>
</template>

<script>
export default {
    name: "bet-card",
    props: {
        id: {
            type: String,
            default: 'card-1'
        },
        betType: {
            type: String,
            default: null
        },
        winAmount: {
            type: Number,
            default: 0
        },
        checked: {
            type: Boolean,
            default: false
        },
        times: {
            type: String,
            default: "2 X"
        },
        click: {
            type: Function,
            default: null
        }
    },
    methods: {
        cardClick(){
            if(this.click){
                this.click();
            }
            this.$emit("click");
        }
    }
}
</script>

<style>

.bet-card{
    position: relative;
}
.bet-card .multiply{
    width: 25px;
    margin: auto;
    height: 25px;
    background: blue;
    padding: .32em;;
    border-radius: 50%;
    display: flex;
    align-items: baseline;
    justify-content: center;
    font-size: 12px;
    z-index: -1;
    position: absolute;
    top: -25px;
    left: 50%;
    transform: translate(-50%, 0px);
    transition: .2s;
    box-shadow: 0px 0px 5px 0px rgb(30 30 30);
}
.bet-card input[type="radio"]{
    position: absolute;
    left: 0;
    opacity: 0  ;
}
.bet-card .main-card{
    height: 130px;
    border-radius: 4px;
    border: 6px solid #ff8b14;
    margin: 0 .2em;
    transition: .1s ease-in-out;
    box-shadow: 0px 0px 5px 0px rgb(30 30 30);
}
.bet-card .card{
    height: 100%;
    color: #793301;
}
.bet-card .card > *{
    height: calc( 100% / 3);
    display: flex;
    align-items: center;
    justify-content: center;
}
.bet-card input[type="radio"]:checked ~ .main-card{
    box-shadow: 0px 0px 5px 4px rgb(30 30 30);
}
.bet-card input[type="radio"]:checked ~ .multiply{
    box-shadow: 0px 0px 5px 4px rgb(30 30 30);
}
.bet-card .card > *:nth-child(odd){
    background: #f2f50b;
}
.bet-card .card > *:nth-child(even){
    background: #eeff5f;
}
.bet-card .check-box .check{
    height: 16px;
    width: 16px;
    overflow: hidden;
    border-radius: 50%;
    border: 4px solid #ff8b14;
    padding: .2em;
    background: #ffc6ee;
}
.bet-card .check-box .check img{
    width: 100%;
    display: none;
}
.bet-card input[type="radio"]:checked ~ .main-card .card .check img{
    display: block;
}
.bet-card .win{
    font-size: .6em;
}
.bet-card .win b{
    font-size: 1em;
}
.bet-card .win-amount{
    background: #fff;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: .3em 0;
}
.bet-card .win-amount img{
    width: 15px;
}
</style>