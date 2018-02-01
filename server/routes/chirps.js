const express = require('express');
const chirpStore = require('../chirpsstore');
let router = express.Router();


router.get('/:id?', (req , res) => {
    let id = req.params.id;
    if(id){
        res.json(chirpStore.GetChirp(id));
    }
    else{
        res.json(chirpStore.GetChirps());
    }
});


router.post('/', (req , res) => { 
    chirpStore.CreateChirp(req.body);
    res.sendStatus(200);
});


router.delete('/:id?', (req ,res) => {
    let id = req.params.id;
    if(id){
chirpStore.DeleteChirp(id);
res.send(`Chirp ${id} has been removed.`);
    }
else{
    res.send(`Please designate a Chirp ID to be removed.`);
}
});


router.put('/:id?', (req,res)=>{
    let id = req.params.id;
    let chirp = req.body;
if(id){
chirpStore.UpdateChirp(id,chirp)
res.send(`Chirp ${id} has been updated.`)

}
 else{
     res.send(`Please designate a Chirp ID to be updated.`)
 }   
});


module.exports = router;