const express=require("express");
const mongoose=require("mongoose");
const ShortUrl=require("./models/shortUrl");
const app=express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017").then(() => {
    console.log("DB connected");
}).catch((error) => {
    console.log("something went wrong", error);
})


app.get("/", async (req, res) => {
    const shortUrl = await ShortUrl.find();
    res.render("index", { shortUrl });      
});


app.post("/shortUrls",async (req,res)=>{
   await ShortUrl.create({full: req.body.fullurl})
   res.redirect("/");
})

app.get("/:short", async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.short });
    if (shortUrl) {
        res.redirect(shortUrl.full);
    } else {
        res.send("URL not found!");
    }
});

app.listen(3000, () => {
    console.log("sever is lisenting");
});