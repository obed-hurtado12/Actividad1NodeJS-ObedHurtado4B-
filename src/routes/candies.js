const express = require('express');
const { route } = require('.');
const router = express.Router();
const pool = require('../database.js');

router.get('/' , async (re , res) => {
   let listCandies = await pool.query('SELECT * FROM candies');
   res.json({
       status: 200,
       message: "Se ha listado correctamente",
       listCandies: listCandies
   });
});

router.get('/:id',async(req, res)=>{
    const{id} = req.params;
    let candie = await pool.query('SELECT * FROM candies WHERE id = ?', [id]);
    res.json({
        status:200,
        message: "Se han obtenido correctamente el dulce",
        candie:candie
    });
});

router.post('/create',async(req, res) => {
    const {name, price,expiration,isSalad,date_registered,date_created,status} = req.body;
    const candie = {
        name, price,expiration,isSalad,date_registered,date_created, status: 1
    };

    await pool.query('INSERT INTO candies set ?' , [candie]);
    res.json({
        status: 200,
        message: "Se ha registrado correctamente el dulce",
        candie:candie
    });
});

router.post('/update/:id' , async (req, res) =>{
    const { id } = req.params;
    const { name, price,expiration,isSalad } = req.body;

    const candie = { name, price,expiration,isSalad};

    await pool.query('UPDATE candies SET ? WHERE id = ?', [candie, id]);
    res.json({
        status: 200,
        message: "Se ha actualizado correctamente el dulce",
        candie:candie
    });
});

router.post('/delete/:id', async (req, res) =>{
    const{id} = req.params;

    await pool.query('UPDATE candies SET status = 0 WHERE idProduct = ?',[id]);
    res.json({
        status: 200,
        message: "Se ha eliminado correctamente el dulce"
    });
});
module.exports = router;