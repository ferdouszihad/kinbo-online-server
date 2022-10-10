const jwt = require('jsonwebtoken');

module.exports = function(req,res) {
    let token = req.header('Authorization')
    if(!token) return res.status(400).send({status:false});
    token = token.split(" ")[1];

 
    try {
        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        return res.status(400).send({status:true});
    } catch (error) {
        return res.status(400).send({status:false});
    }
    
}