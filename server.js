// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
var jwt = require('jsonwebtoken');
var bodyParser=require('body-parser');
server.use(bodyParser.json())
server.use(middlewares)
server.use((req, res, next) => {
    console.log(req.headers)
    if(req.headers.token){
        next();
    }
    else{
        if(req.body.username){
            var token = jwt.sign(req.body, 'edosecretkey');
            res.header('X-Hello', 'World')
            res.header('token',token)
            res.json({msg:"loginsuccess",token})
        }
        else{
            res.json({msg:'pleaselogin'})
        }
    }

})
server.use(router)
server.listen(4000, () => {
  console.log('JSON Server is running')
})