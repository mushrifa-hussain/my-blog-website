import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const data_arr = [];
let id = 0;

app.use(express.static("Public"));

app.use(bodyParser.urlencoded({extended: true}));

function getDate(){
   const today = new Date();
   const year = today.getFullYear();
   const month = String(today.getMonth()+1).padStart(2,'0');
   const day = String(today.getDate()).padStart(2,'0');
   return `${year}-${month}-${day}`;
}

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/create", (req, res) => {
    res.render("createPost.ejs");
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.get("/FAQs", (req, res) => {
    res.render("FAQs.ejs");
});

app.get("/contact", (req, res) => {
    res.render("contact.ejs");
});

app.post("/blogs", (req, res) => {
    id++;
    const data = {
        id: id,
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        author: req.body.author,
        date: getDate()
    }
    data_arr.push(data);
    console.log(data_arr);
    res.render("blogs.ejs", {
        data_arr
    });
});

app.get("/blogs", (req, res) => {
    res.render("blogs.ejs",{
        data_arr
    });
});

app.get("/view/:id", (req, res) => {
    const blogId = req.params.id;
    const curr_data = data_arr.find((post) => post.id == blogId);
    console.log(curr_data);
    res.render("view.ejs", {
        curr_data
    });
});

app.get("/edit/:id", (req, res) => {
    const blogId = req.params.id;
    const curr_data = data_arr.find((post) => post.id == blogId);
    console.log(curr_data);
    res.render("edit.ejs", {
        curr_data
    });
});

app.post("/edit/:id", (req, res) => {
    const blogId = req.params.id;
    const curr_data = data_arr.find((post) => post.id == blogId);
    curr_data.title = req.body.title;
    curr_data.description = req.body.description;
    curr_data.content = req.body.content;
    curr_data.author = req.body.author;
    curr_data.date = getDate();
    res.redirect("/blogs");
});

app.get("/delete/:id", (req, res) => {
    const blogId = req.params.id;
    const curr_data = data_arr.findIndex((post) => post.id == blogId);
    if(curr_data !== -1){
        data_arr.splice(curr_data,1);
    }
    res.redirect("/blogs");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});