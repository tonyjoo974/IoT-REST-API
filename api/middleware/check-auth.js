const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
       // get token from header authorization
       //const token = req.headers.authorization.split(" ")[1];
       const token = req.headers.authorization.split(" ")[1];
       const decoded = jwt.verify(token, process.env.JWT_KEY);
       req.userData = decoded;
       next();
   } catch (error) {
       return res.status(401).json({
           message: 'Auth failed'
       });

   }
};
