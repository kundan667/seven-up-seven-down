const express = require("express");
const router = express.Router();

// Models
const User = require("../models/Users");
const Bet = require("../models/Bets");

router.post("/entergame", (req, res) =>{

    const name = ((req.body.name).trim()).toUpperCase();

    // Find the user
    User.findOne({ name: { $regex: '.*' + name + '.*' } })
    .then( user => {
        if( user ){
            //Return user if is exists
            res.json(user);
        }else{
            const newUser = new User({
                name: name
            });
    
            // Save New user
            newUser.save()
            .then(user => {res.json(user)})
        }
        
    })
    .catch( err => {res.json(err)});
});

router.post('/rolldice', ( req, res ) =>{
    
    // Find the user
    User.findById(req.body.id)
    .then( user => {
        let betNo = req.body.betNumber.toLowerCase();
        let betAmt = req.body.betAmount;
        let win = true;
    
        // Generate random number
        const r1 = Math.floor(Math.random() * 6) + 1;
        const r2 = Math.floor(Math.random() * 6) + 1;
        const sumDice = r1 + r2;
        
        if( sumDice === 7 && betNo === '7' ) {
            betAmt = (betAmt * 5) - betAmt
        }
        else if( (sumDice > 7 && betNo === '7 up') 
                ||  (sumDice < 7 && betNo === '7 down') ) {
            betAmt = betAmt
        }
        else{
            win = false;
            betAmt = betAmt
        }

        // Insert in Bet Model
        const betObj = new Bet({
            userId: req.body.id,
            betAmount: req.body.betAmount,
            betNumber: betNo,
            diceNo: r1 + r2,
            win : win,
            amount: betAmt
        });
        
        betObj.save()
        .then( bet => {
            const points = win ? (user.points + betAmt) : (user.points - betAmt);
            // Update user's points (Bet table)
            user.points = points;
            user.save()
            .then( us => {
                // Send dice response and points
                const random = {
                    dice1: r1,
                    dice2: r2,
                    win: bet.win,
                    amount: bet.amount,
                    points: us.points
                }
                res.json(random);
            })
        })
    })
    .catch( err => res.json(err) );
})

module.exports = router;

