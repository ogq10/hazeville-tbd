const router = require('express').Router();
const User = require('../models/User');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('../routes/verifyToken');

//UPDATE USER ID (CRUD)
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body, //take everything in req.body and set it again
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
}); //middleware to verify jwtoken

//DELETE METHOD
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json('User has been deleted');
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET METHOD
router.get('/find/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ALL USERS METHOD
router.get('/', verifyTokenAndAdmin, async (req, res) => {
  try {
    const query = req.query.new;
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});



//GET USER STATS PER MONTH
router.get('/stats', verifyTokenAndAdmin, async (req, res) => {
    //total # of users per month 
    const date = new Date(); //creates current date
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1 ));

    try {
        const data = await User.aggregate([
            {$match: {createdAt: {$gte: lastYear}}},
            {
                $project: {
                    month: {$month: "$createdAt"} //create a month variable , take the month number inside the 'createdat' 
                },
            },
            {
                $group: {
                    _id: "$month", 
                    total: {$sum: 1}, 
                }
            }
        ])        

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json();
    }
})
module.exports = router;
