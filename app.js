let express = require("express")
let app = express()
let path = require("path")
app.use("/",express.static(path.join(__dirname,"static")))
const port=process.env.PORT || 3000

app.listen(port)
 