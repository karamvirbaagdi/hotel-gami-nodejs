const mongoose = require("mongoose")
mongoose.set("strictQuery", true);
mongoose.connect("mongodb://localhost:27017/HotelGami", { useNewUrlParser: true, useUnifiedTopology: true, })
    .then(() => { console.log("Database connect sucessfully...") }).catch((err) => { console.log(err) })
   