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
    pool.query(queryText, [req.body.description, req.body.image_url, req.body.person_id])
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
    const id = req.params.id;
    if (req.isAuthenticated()){
        let queryText = `DELETE FROM item WHERE id = $1`;
        pool.query(queryText, [id]).then((result) => {
            res.sendStatus(200);
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
    const id = req.params.id;
    if (req.isAuthenticated()){
        let queryText = `UPDATE item SET description = $1, image_url = $2, person_id = $3 WHERE id = $4;`;
        pool.query(queryText, [req.body.description, req.body.image, req.body.person_id, id]).then((result) => {
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
    let queryText = `SELECT person.id AS userid, count(item.id) AS count, array_agg(item.description) AS description FROM person
    LEFT JOIN item ON person_id = person.id
    GROUP BY person.id;`;
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        res.sendStatus(500);
    })
});


/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {
    const id = req.params.id;
    let queryText = `SELECT * FROM item WHERE id = $1;`;
    pool.query(queryText, [id]).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        res.sendStatus(500);
    })
});

module.exports = router;