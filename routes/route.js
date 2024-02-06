const express = require("express");
const router = express.Router();
const Employee = require("./../models/employee");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const multer = require('multer');

const upload = multer({
  storage:multer.diskStorage({
    destination: function(req,file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now(), ".jpg");
    }
  })
}).single("file");

router.post('/upload', upload,(req, res) => {
  res.send('File Uploaded Successfully !')
})

/**
 * Get all Employee Data
 */
router.get("/getEmp", async (req, res) => {
  try {
    const emp = await Employee.find();
    var response = emp;
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send(err);
  }
  res.send("Get");
});

router.post("/registerEmp", async (req, res) => {
  let hash = bcrypt.hashSync(req.body.password, saltRounds);
  const emp = new Employee({
    first_name: req.body.first_name,
    // last_name: req.body.last_name,
    // gender: req.body.gender,
    // email: req.body.email,
    // password: hash,
  });
  try {
    const data = await emp.save();
    var response = [
      { data: data, message: "User successfully register", status: 200 },
    ];
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * Get Employee by Id
 */
router.get("/getEmp/:id", async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) {
      res.status(400).send("Id not found");
    }
    var response = { data: emp, status: 200 };
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send(err);
  }
  res.send("Get");
});

/**
 * Function to update data by Id
 */
router.put("/getEmp/:id", async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    (emp.name = req.body.name), (emp.emp_status = req.body.emp_status);
    emp.employee_Id = req.body.employee_Id;

    const result = await emp.save();
    var response = [
      { data: result, message: "User updated successfulyy", status: 200 },
    ];
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send("Error" + err);
  }
  res.send("Get");
});
/**
 * Function to deleter employee by Id
 */
router.delete("/deleteEmp/:id", async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) {
      return res.status(400).send("Error to find Id");
    }
    const result = await emp.remove();
    var response = [
      { data: result, message: "User deleted successfully", status: 200 },
    ];
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/login", async (req, res) => {
    try{
        await Employee.findOne(
            { email: req.body.email, password: req.body.password },
            async (err, data) => {
            console.log(data);
            if (data) {
              // bcrypt.compareSync(myPlaintextPassword, hash);
                if (data.password == req.body.password) {
                    var response = [
                        { data: result, message: "User Found successfully", status: 200 },
                    ];
                    res.status(200).send(response);
                } else {
                res.send({ Success: "Wrong password!" });
                }
            } else {
                res.send({ Success: "This Email Is not regestered!" });
            }
            }
        );
    } catch(err) {
        res.status(500).send(err);
    }
});

module.exports = router;
