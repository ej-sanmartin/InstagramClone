const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send("Hola");
});

router.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  if(!email || !password || !name){
    return res.status(422).json({ error: "Please Fill in All Fields" });
  }

  res.json({ message: "Successfully Sent!" });
});

module.exports = router;
