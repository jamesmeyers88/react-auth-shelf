const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * Get all of the items on the shelf
 */
router.get('/', (req, res) => {
    let queryText = `SELECT * FROM item ORDER BY id DESC;`;
    pool.query(queryText)
      .then((result) => {
        console.log(`Finished GET server side for items`, result.rows);
        res.send(result.rows);
      })
      .catch((error) => {
        console.log(`Error handling GET for items`, error);
        res.sendStatus(500);
      })
    // res.sendStatus(200); // For testing only, can be removed
});


/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', (req, res) => {
    console.log('req.body in router:', req.body);
    const queryText = `INSERT INTO item (description, image_url, person_id)
    Values ($1, $2, $3);`;
    pool.query(queryText, [req.body.description, req.body.image, req.body.person_id])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`Error handling POST for /feedback`, error);
            res.sendStatus(500);                   
        })
});


/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', (req, res) => {
    if (req.isAuthenticated()){
        let queryText = `SELECT * FROM item by id desc;`;
        pool.query(queryText).then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});


/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {
    if (req.isAuthenticated()){
        let queryText = `UPDATE item SET description = $1, image_url = $2, person_id = $3 WHERE id = $4;`;
        pool.query(queryText, [req.body.description, req.body.image, req.body.person_id, req.body.item.id]).then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});


/**
 * Return all users along with the total number of items 
 * they have added to the shelf
 */
router.get('/count', (req, res) => {

});


/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {

});

module.exports = router;