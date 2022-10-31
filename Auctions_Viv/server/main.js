const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    port: '3360',
    user: 'root',
    password: 'root',
    database: 'react_crud',
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create
app.post('/api/auctions', (req, res) => {
    const sellerEmail = req.body.email;
    const itemName = req.body.itemName;
    const itemDescription = req.body.itemDescription;
    const price = req.body.lastPrice;
    // FIXME: add validation - generate 400 errors

    const sqlInsert = "INSERT INTO auctions (sellerEmail, itemName, itemDescription, lastPrice) VALUES (?, ?, ?, ?)"
    db.query(sqlInsert, [sellerEmail, itemName, itemDescription, price], (err, result) => {
        if (err) {
            console.log(err);
            res.sendStatus(500)
        }
        else {
            // console.log(result); // debug only
            res.sendStatus(201);
        }
    })
});

// Retrieve
app.get('/api/auctions', (req, res) => {
    const sqlQuery = "SELECT * FROM auctions"
    db.query(sqlQuery, (err, auctions) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
        else {
            // console.log(auctions); // for debugging only
            res.send(auctions);
        }
    })
});

app.get('/api/auction/:itemID', (req, res) => {
    const id = req.params.itemID;
    console.log("ID " + id);
    const sqlQuery = "SELECT * FROM auctions where id=?";
    db.query(sqlQuery, id, (err, auctionItem) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
        else {
            console.log(auctionItem);
            res.send(auctionItem);
        }
    })
});

// Patch
app.patch('/api/auctions/:itemID', (req, res) => {
    const id = req.params.itemID;

    const bidderEmail = req.body.bidderEmail;
    const bidderPrice = req.body.bidderPrice;

    db.getConnection(function(err, connection) {
        connection.beginTransaction(function(err) {
            if (err){
                connection.rollback(function() {
                    connection.release();
                });
            }
            else {
                const sqlQuery = "SELECT lastPrice FROM auctions where id=?"
                connection.query(sqlQuery, id, (err, auctionItem) => {
                    if(err) {
                        console.log(err);
                        res.sendStatus(500);
                    } 
                    else {
                        console.log(auctionItem);
                        if (bidderPrice <= auctionItem[0].lastPrice){
                            res.sendStatus(409); // price too low
                            connection.rollback(function() {
                                connection.release();
                            });
                        }
                        else {
                            const sqlPatch = "UPDATE auctions SET lastPrice = ?, lastBidderEmail = ? WHERE id = ?"
                            connection.query(sqlPatch, [bidderPrice, bidderEmail, id], (err, result) => {
                                if(err){
                                    console.log(err);
                                    res.sendStatus(500)
                                    connection.rollback(function() {
                                        connection.release();
                                    });
                                } 
                                else {
                                    console.log(result);
                                    res.sendStatus(200);
                                    connection.commit(function(err){
                                        if (err){
                                            connection.rollback(function() {
                                                connection.release();
                                            });
                                        }
                                        else {
                                            connection.release();
                                        }
                                    })
                                }
                            })
                        }
                    }
                })
            }

        });
    })


                // const sqlQuery = "SELECT lastPrice FROM auctions where id=?"
                // db.query(sqlQuery, id, (err, auctionItem) => {
                //     if(err){
                //         console.log(err);
                //     } 
                //     else {
                //         console.log(auctionItem);
                //         if (bidderPrice <= auctionItem[0].lastPrice){
                //             res.sendStatus(409); // price too low
                //         }
                //         else {
                //             const sqlPatch = "UPDATE auctions SET lastPrice = ?, lastBidderEmail = ? WHERE id = ?"
                //             db.query(sqlPatch, [bidderPrice, bidderEmail, id], (err, result) => {
                //                 if(err){
                //                     console.log(err);
                //                     res.sendStatus(400)
                //                 } 
                //                 else {
                //                     console.log(result);
                //                     res.sendStatus(200);
                //                 }
                //             })
                //         }
                //     }
                // })

            });

        // Delete
        app.delete('/api/delete/:itemID', (req, res) => {
            const id = req.params.itemID;
            const sqlDelete = "DELETE FROM auctions where id=?"
            db.query(sqlDelete, id, (err, auctions) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500)
                }
                else {
                    console.log(auctions);
                    res.send(auctions);
                }
            })
        });

        app.listen(3001, () => {
            console.log("running on port 3001")
        });