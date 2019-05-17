var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const User = require('../../../models/users');

module.exports = router;

router.get('/', (req, res, next)=>{
  res.send('Hello');
})

router.post('/signup', function(req, res, next){
    const { UserId, UserPw, UserName, UserAge } = req.body
    const u = new User({ id: UserId,pw: UserPw,name: UserName,age: UserAge })
      u.save()
        .then(r => {
          res.send({ success: true, msg: r })
        })
        .catch(e => {
          console.log(e)
          res.send({ success: false, msg: e.message })
        })
  })
router.post('/findone', (req, res, next)=>{
  console.log(req.body.id)
  User.findOne({id: req.body.id}, function(err, obj){
    console.log(obj)
    res.send(obj)
  })
})