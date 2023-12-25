const jwt  = require("jsonwebtoken");
const { Log } = require("../models/Log");
const uuid = require('uuid');




exports.logApiInfo = async (req, res, next) => {

    // req.reqId = uuid.v4();
    req.startTime = Date.now(); // Capture start time for response time calculation
    console.log(req.body)

    const logData = {
        logId: uuid.v4(),
        method: req.method,
        userAgent:req.headers['user-agent'],
        host:req.headers.host,
        url: req.originalUrl,
        statusCode: 'unknown',
        header: JSON.stringify(req.headers),
        payload: req.body,
        timestamp: new Date(),
        name: 'user',
        email: 'user@test.com',
        resTime: 'unknown'
    };

    // decrypt/decode login user

    const token = req.headers.authorization;
    try{
    if(token){
        const tokenValue = token.split(' ')[1];
        const decoded = jwt.verify(tokenValue, process.env.SECRET_KEY);
        
        logData.userEmail= decoded.email || 'user@test.com';

    }
} catch(error){
    console.error('Error in verifying JWT', error);
}

res.setHeader('logId', logData.logId);
const responseBodyChunks = [];

    // Intercept the response to log information about the outgoing response
    const originalSend = res.send;
  
    res.send = async function (body) {
      // Log information about the outgoing response
    //   logData.responseSize = res.get('Content-Length') || 'unknown';
    responseBodyChunks.push(Buffer.from(JSON.stringify(body)));

     // Call the original send method
     originalSend.call(res, body);

    }
    const route = req.url
    const activity = route.split('/');

    res.on('finish', async () => {

try {
      logData.statusCode = res.statusCode;
      logData.resHeader = JSON.stringify(res.getHeaders());
      logData.resTime = Date.now() - req.startTime;
  
  
        const responseBody = Buffer.concat(responseBodyChunks).toString("utf-8");
        const responseMessage = JSON.parse(responseBody)
        logData.activity = `${logData.userEmail} perform activity to ${activity[3]} and ${responseMessage.message}`

      // Store the log in the database
        await Log.create(logData);
      } catch (error) {
        console.error('Error storing log in the database:', error);
      }
  
      console.log(JSON.stringify(logData, null, 2));

     
    })
  
    next();
  };