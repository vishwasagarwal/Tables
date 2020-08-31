const express=require('express');
const {requireSignin,authMiddleware}= require('../controller/auth');
const router = express.Router()
const {Listall,CreateRow,DeleteRow,UpdateRow} = require('../controller/table');
router.get('/table/allRows',requireSignin,authMiddleware,Listall);
router.post('/table/createRow',requireSignin,authMiddleware,CreateRow);
router.delete('/table/deleteRow',requireSignin,authMiddleware,DeleteRow);
router.put('/table/updateRow',requireSignin,authMiddleware,UpdateRow);

module.exports = router;