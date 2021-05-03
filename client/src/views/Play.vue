<template>
    <div class="play">
        <div class="game-name">7 Up Down</div>
        <div class="point-box">
            <div><span @click="leaveGame()">Exit</span></div>
            <div><span><img :src="require('@/assets/icons/coin2.png')" alt="coins">{{ points }}</span></div>
        </div>
        <div class="select-options">Select Options</div>
        <div class="bet-cards">
            <BetCard 
                id="1" 
                bet-type="2 To 6"
                :win-amount="betAmount * 2"
                :checked="false"
                times="2x"
                @click="setBetNumber('7 Down')"/>
            <BetCard 
                id="2" 
                bet-type="7"
                :win-amount="betAmount * 5"
                :checked="true"
                times="5x"
                @click="setBetNumber('7')"/>
            <BetCard 
                id="3" 
                bet-type="8 To 12"
                :win-amount="betAmount * 2"
                :checked="false"
                times="2x"
                @click="setBetNumber('7 Up')"/>
        </div>
        <div class="bet-amount">
            <div class="bet-amount-container">
                <div @click="subAmount()"><img :src="require('@/assets/icons/minus.png')" alt="minus"></div>
                <div class="coin-amount">
                    <img :src="require('@/assets/icons/coin.png')" alt="minus">
                    <span><b>{{betAmount}}</b></span>
                </div>
                <div @click="addAmount()"><img :src="require('@/assets/icons/plus.png')" alt="plus"></div>
            </div>
        </div>
        <div class="dice-box" @click="rollDice()">

            <div class="scene">
                <div class="cube cube-1">
                    <div class="cube__face cube__face--front">
                        <div class="dice-1 roll-dice">
                            <div><span></span></div>
                        </div>
                    </div>
                    <div class="cube__face cube__face--back">
                        <div class="dice-1 roll-dice">
                            <div><span></span></div>
                            <div><span></span></div>
                        </div>
                    </div>
                    <div class="cube__face cube__face--right">
                        <div class="dice-1 roll-dice value-3">
                            <div><span></span></div>
                            <div><span></span></div>
                            <div><span></span></div>
                        </div>
                    </div>
                    <div class="cube__face cube__face--left">
                        <div class="dice-1 roll-dice">
                            <div><span></span></div>
                            <div><span></span></div>
                            <div><span></span></div>
                            <div><span></span></div>
                        </div>
                    </div>
                    <div class="cube__face cube__face--top">
                        <div class="dice-1 roll-dice value-5">
                            <div><span></span></div>
                            <div><span></span></div>
                            <div><span></span></div>
                            <div><span></span></div>
                            <div><span></span></div>
                        </div>
                    </div>
                    <div class="cube__face cube__face--bottom">
                        <div class="dice-1 roll-dice">
                            <div><span></span></div>
                            <div><span></span></div>
                            <div><span></span></div>
                            <div><span></span></div>
                            <div><span></span></div>
                            <div><span></span></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="scene">
                <div class="cube cube-2">
                    <div class="cube__face cube__face--front">
                        <div class="dice-1 roll-dice">
                            <div><span></span></div>
                        </div>
                    </div>
                    <div class="cube__face cube__face--back">
                        <div class="dice-1 roll-dice">
                            <div><span></span></div>
                            <div><span></span></div>
                        </div>
                    </div>
                    <div class="cube__face cube__face--right">
                        <div class="dice-1 roll-dice value-3">
                            <div><span></span></div>
                            <div><span></span></div>
                            <div><span></span></div>
                        </div>
                    </div>
                    <div class="cube__face cube__face--left">
                        <div class="dice-1 roll-dice">
                            <div><span></span></div>
                            <div><span></span></div>
                            <div><span></span></div>
                            <div><span></span></div>
                        </div>
                    </div>
                    <div class="cube__face cube__face--top">
                        <div class="dice-1 roll-dice value-5">
                            <div><span></span></div>
                            <div><span></span></div>
                            <div><span></span></div>
                            <div><span></span></div>
                            <div><span></span></div>
                        </div>
                    </div>
                    <div class="cube__face cube__face--bottom">
                        <div class="dice-1 roll-dice">
                            <div><span></span></div>
                            <div><span></span></div>
                            <div><span></span></div>
                            <div><span></span></div>
                            <div><span></span></div>
                            <div><span></span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- win loose modal -->
        <div v-if="viewModal" class="modal">
            <WinLoose 
                :win="win" 
                :amount="amount"
                @click="closeModal()"/>
        </div>
        
    </div>
</template>

<script>

import axios from "@/axios";
import BetCard from '@/components/BetCard'
import WinLoose from '@/components/WinLoose'

export default {
    name: "Play",
    components: { BetCard, WinLoose },
    data(){
        return{
            name: '',
            points: '',
            betAmount: 100,
            betNumber: '7',
            dice1: 1,
            dice2: 1,
            win: false,
            viewModal: false,
            amount: 0,
            amountOnBoard: 100,
            currentClass1: '',
            currentClass2:'',
            audio:''
        }
    },
    created(){
        this.points = this.$store.getters.getPoints;
        this.audio = new Audio(require('@/assets/audio/roll.mp3'));
    },
    beforeCreate(){
        if( this.$store.getters.getUser === '' ){
            this.$router.history.push( { name: 'landing' } )
        }
    },
    methods: {
        addAmount(){
            if( this.betAmount == 100 ) this.betAmount = 200;
            else if( this.betAmount == 200 ) this.betAmount = 500;
        },
        subAmount(){
            if( this.betAmount == 200 ) this.betAmount = 100;
            else if( this.betAmount == 500 ) this.betAmount = 200;
        },
        setBetNumber(n){
            this.betNumber = n
        },
        closeModal(){
            this.viewModal = false;
        },
        rollDice: async function(){
            //let audio = new Audio(require('@/assets/audio/roll.mp3'));
            let playPromise = this.audio.play();
            //audio.play();
            if( this.$store.getters.getPoints < 100 ){
                this.info = "Error";
            }else{
                let interval = setInterval( () => {
                    let td1 = Math.floor(Math.random() * 6) + 1;
                    let td2 = Math.floor(Math.random() * 6) + 1;
                    this.audio.currentTime = 0.1 * td1;
                    this.changeSide(td1, td2);
                }, 200)
                let data = {
                    id: this.$store.getters.getUserId,
                    betNumber: this.betNumber,
                    betAmount: this.betAmount,
                }
                await axios.post("/rolldice", data)
                .then(res => {
                    let resData = res.data;
                    this.dice1 = resData.dice1;
                    this.dice2 = resData.dice2;
                    
                    setTimeout( () => {
                        clearInterval(interval);
                        setTimeout( () => {
                            this.changeSide(this.dice1, this.dice2);
                            this.audio.currentTime = 0.5;
                            this.audio.pause();
                            setTimeout( () => {
                                this.$store.commit('SET_POINTS', {points: resData.points}); 
                                this.amount = resData.amount;
                                this.betAmount = 100;
                                this.points = resData.points;
                                this.win = resData.win;
                                this.viewModal = true;
                            },1000)
                        },180)
                    },1000)
                })
                .catch( err => console.log( "err:", err ) )
            }
        },
        
        leaveGame(){
            this.$store.commit('LEAVE_GAME');
            this.$router.history.push({ name: 'landing' })
        },
        changeSide( d1, d2 ) {
            let cube1 = document.querySelector('.cube-1');
            let cube2 = document.querySelector('.cube-2');
            let showClass1 = 'show-' + d1;
            let showClass2 = 'show-' + d2;
            if( this.currentClass1 ) cube1.classList.remove( this.currentClass1 );
            if( this.currentClass2 ) cube2.classList.remove( this.currentClass2 );
            cube1.classList.add( 'show-' + d1 );
            cube2.classList.add( 'show-' + d2 );
            this.currentClass1 = showClass1;
            this.currentClass2 = showClass2;
        },
    },
    computed: {
        getName (){
            return this.$store.getters.getUser
        }
    }
}
</script>

<style scoped>
.play{
    max-width: 400px;
    margin: 0 auto;
    padding: 3em 1em;
    background: #1b1b1b;
    box-shadow: 1px 3px 24px 0px rgb(0 0 0 / 75%);
    height: 100%;
    color: #d5d5d5;
    overflow: hidden;
    background-image: url("../assets/images/pattern_2.webp");
    background-repeat: no-repeat;
    background-size: cover;
}
.game-name{
    padding: 1em;
}
.select-options{
    padding: 1em;
}
.bet-cards{
    display: flex;
    margin-top: 30px;
}
.bet-cards > *{
    flex: 1 1 33%;
    z-index: 1;
    position: relative;
}
.bet-amount{
    width: 180px;
    margin: 2em auto;  
    display: flex;
    justify-content: center;
}
.bet-amount-container{
    display: flex;
    align-items: center;
    width: 100%;
}
.coin-amount{
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    background: #520931;
}
.bet-amount-container > *:nth-child(odd){
    flex: 1 1 10%;
    background: #ff0260;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    border: 5px solid #FFD700;
    box-shadow: 0px 2px 1px 0px rgb(0 0 0 / 75%);
    padding: 0.3em 0.3em;
}
.bet-amount-container > *:nth-child(odd) div{
    display: flex; 
    align-items: center;
}
.bet-amount-container > *:nth-child(even){
    flex: 1 1 80%;
}
.bet-amount-container > *:nth-child(even) input{
    outline: none;
    border: none;
    padding: .4em 0;
    text-align: center;
}
.point-box, .play-area{
    display: flex;
}
.point-box > *{
    flex: 1 1 50%;
}
.point-box > *:nth-child(1){
    text-align: left;
}
.point-box > *:nth-child(1) span{
    background-color: #033247;
    font-weight: 900;
}
.point-box > *:nth-child(2) span{
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
.point-box > *:nth-child(2){
    text-align: right;
}
.point-box > *:nth-child(2) span img{
    width: 16px;
    margin-right: 4px;
}
.point-box > * span{
     padding: .5em;
     border-radius: 2px;
     cursor: pointer;
     display: inline-block;
}


.dice-box{
    display: flex;
    justify-content: center;
}
.roll-dice{
    height: 100%;
    width: 100%;
    background-color: #fff;
    border-radius: 4px;
    display: flex;
    flex-wrap: wrap;
    padding: .2em .1em;
    box-shadow: inset -0.35rem 0.35rem 0.75rem rgba(0, 0, 0, 0.3),
    inset 0.5rem -0.25rem 0.5rem rgba(0, 0, 0, 0.15);
}
.value-3 > *{
    flex: 1 1 100% !important;
}
.value-3 > *:nth-child(1){
    justify-content: end;
}
.value-3 > *:nth-child(3){
    justify-content: flex-end;
}
.value-5 > * {
    flex: 1 1 50% !important;
}
.value-5 > *:nth-child(3){
    flex: 1 1 100% !important;
}


.roll-dice > *{
    flex: 1 1 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.roll-dice > * span{
    display: inline-block;
    width: 10px;
    height: 10px;
    background-color: red;
    border-radius: 50%;
}


/* Rolling Dice */
* { box-sizing: border-box; }

body { font-family: sans-serif; }

.scene {
    width: 60px;
    height: 60px;
    margin: 10px;
    perspective: 400px;
    box-shadow: 1px 30px 40px -2px #000000;
    transform: rotate3d(1, 0, 0, 15deg);
    transform-style: preserve-3d;
}

.cube {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transform: translateZ(-30px);
  transition: transform .2s;
}

.cube.show-1 { transform: translateZ(-30px) rotateY(   0deg); }
.cube.show-2 { transform: translateZ(-30px) rotateY(-180deg); }
.cube.show-3 { transform: translateZ(-30px) rotateY( -90deg); }
.cube.show-4 { transform: translateZ(-30px) rotateY(  90deg); }
.cube.show-5 { transform: translateZ(-30px) rotateX( -90deg); }
.cube.show-6 { transform: translateZ(-30px) rotateX(  90deg); }

.cube__face {
  position: absolute;
  width: 100%;
  height: 100%;
  line-height: 100%;
  font-size: 40px;
  font-weight: bold;
  color: white;
  text-align: center;
}

/* .cube__face--front  { background: hsla(  0, 100%, 50%, 0.7); }
.cube__face--right  { background: hsla( 60, 100%, 50%, 0.7); }
.cube__face--back   { background: hsla(120, 100%, 50%, 0.7); }
.cube__face--left   { background: hsla(180, 100%, 50%, 0.7); }
.cube__face--top    { background: hsla(240, 100%, 50%, 0.7); }
.cube__face--bottom { background: hsla(300, 100%, 50%, 0.7); } */

.cube__face--front  { transform: rotateY(  0deg) translateZ(30px); }
.cube__face--right  { transform: rotateY( 90deg) translateZ(30px); }
.cube__face--back   { transform: rotateY(180deg) translateZ(30px); }
.cube__face--left   { transform: rotateY(-90deg) translateZ(30px); }
.cube__face--top    { transform: rotateX( 90deg) translateZ(30px); }
.cube__face--bottom { transform: rotateX(-90deg) translateZ(30px); }


.modal{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    padding: 2em;
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>