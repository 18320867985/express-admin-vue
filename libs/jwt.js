
let jwt= require("jsonwebtoken");

let secret="nodejs_hqs_secret_jwt"; // 自定义加密签名
let expires=60*30;                  // 有效30分钟

 // 不去检验token的req请求路由url列表
let notSignTokenUrlList=[
"/login",
"/login/data",
];  

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
    decode,
    notSignTokenUrlList
}