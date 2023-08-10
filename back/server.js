// backend depandances 

// import express from 'express'
// import mysql from 'mysql'
// import cors from 'cors'
// import multer from 'multer'
// import path from 'path'
const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const multer = require('multer')
const path = require('path')



const app = express()
app.use(express.json());
app.use(cors());
app.use(express.static("public/images"))


// its for storaging images and giveng the file path to uplodada images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
})


const upload = multer({
    storage: storage
})

// its for MySql databases connection 
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'naveen',
    database: 'photos'
})

// its for postin images to databases
app.post('/upload', upload.single('image'),(req, res) => {
    const image = req.file.filename;
    const sql = "UPDATE photo SET image = ?";
    // const sql ="insert into photo(image) values(?)"
    db.query(sql, [image], (err, result) => {
         if(err) return res.json({Message: 'Error'});
        return res.json({Status: 'Success'});
     })
    console.log(req.file)
})


app.get("/", (req, res) => {
    const sql = "select * from photo";
    db.query(sql, (err, result) => {
        if(err) return res.json("Error");
        return res.json(result);
    })
})


// its for localhost ouer updates
app.listen(777, () => {
    console.log('Hello kevin i am 777')
}) 

