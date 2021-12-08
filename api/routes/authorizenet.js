const router = require('express').Router();
const merchantAuthenticationType = new ApiContract.MerchantAuthenticationType();
merchantAuthenticationType.setName(process.env.AUTH_API_LOGIN_ID);
merchantAuthenticationType.setTransactionKey(process.env.AUTH_TRANSACTION_KEY);

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('../routes/verifyToken');

router.post('/checkout_action', (req, res) => {
  const chargeJson = {
    createTransactionRequest: {
      merchantAuthentication: {
        name: merchantAuthenticationType.setName,
        transactionKey: merchantAuthenticationType.transactionKey,
      },
      transactionRequest: {
        transactionType: 'authCaptureTransaction',
        amount: req.body.amount,
        payment: {
          opaqueData: {
            dataDescriptor: req.body.opaqueData.dataDescriptor,
            dataValue: req.body.opaqueData.dataValue,
          },
        },
      },
    },
  };

  if (chargeJson) {
    res.status(200).json(chargeJson);
  } else {
    res.status(500).json('payment declined');
  }
});
module.exports = router;
