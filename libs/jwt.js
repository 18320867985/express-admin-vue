
let jwt= require("jsonwebtoken");

let secret="nodejs_hqs_secret_jwt"; // 自定义加密签名
let expires=60*60;                  // token有效时间60分钟

function sign(signData,expiresIn=expires)
{
   return jwt.sign({data:signData},secret,{expiresIn});
}

function verify(token,fn)
{
  return  jwt.verify(token,secret,fn);
}

function decode(...args)
{
  return  jwt.decode(...args);
}

module.exports={
    sign,
    verify,
    decode
}