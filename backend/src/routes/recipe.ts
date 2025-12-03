import express from 'express';

const router = express.Router();

router.get('/recipe',(req,res) => {
    res.send('Recipe endpoint');
})

export default router;