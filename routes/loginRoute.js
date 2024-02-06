const express = require('express');
const router = express.Router();
const Employee = require('./../models/employee');

router.post('/', async (req, res) => {
    Employee.findOne({
        email: req.body.email,
        password: req.body.password
    }, (err, user) => {
        if(err) throw err;
        if(!user) {
            res.status(401).send('Unauthorized access');
        }
        return res.status(200).send('User found successfully!')
    })
   
    // try {
    //     const data = await emp.save();
    //     res.status(200).send(data);
    // } catch (err) {
    //     res.status(500).send(err);
    // }
});

module.exports = router;