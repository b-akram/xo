let express = require("express")
let app = express()
let path = require("path")
app.use("/",express.static(path.join(__dirname,"static")))
const port=process.env.PORT || 3000
app.get("aj",function (req,res) {
    port=process.env.PORT
    res.send("port : "+port)
})
app.listen(port)
 