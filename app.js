const express = require("express")
const https=require("https")
const bodyParser= require("body-parser")

const app = express();
app.use(bodyParser.urlencoded({extended: true}))


app.get('/',function(req,res){
    res.sendFile (__dirname+"/index.html")
    
})

app.post('/',function(req,res){
    const query = req.body.cityname
    const appkey="6a48227366b14061b5d70654242111"

    const url="https://api.weatherapi.com/v1/current.json?key="+appkey+"&q= "+query +"&aqi=no"
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on('data',function(data){
            const wdata= JSON.parse(data);
            const place=wdata.location.name
            const temp=wdata.current.temp_c
            const cond=wdata.current.condition.text
            res.write("<h1>the tempurature on "+place+" is :"+temp+"degree celcius </h1>");
            res.write("<h2>the day is a "+cond+" day</h2>");
            res.send()
        })
    
    })
})




app.listen(3000, function(){
    console.log("port 3000 is listening");
})