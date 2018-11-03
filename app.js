let express = require("express")
let app = express()
let path = require("path")
app.use("/",express.static(path.join(__dirname,"static")))

app.listen(8080)
 