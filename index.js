const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
// require the method override package
const methodOverride =  require("method-override");

//require a uuid (universally unique identifire) package
const {v4 : uuidv4} = require("uuid");
// uuidv4(); this method are use to generate the unique IDs
app.use(express.urlencoded({extended : true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
// express ko pta hona chahiye ki use ye bhi check krna h ki kahi _method naam ka kuch aa to nhi rha h 
app.use(methodOverride('_method'));

let posts = [
    {
        id: uuidv4(),
        username : "jeevan440",
        img : "https://media.geeksforgeeks.org/wp-content/uploads/20241218123950915513/JavaScript-Frameworks-and-Libraries.webp",
        content : "JavaScript is a powerful programming language used to create dynamic and interactive web pages."
    },
     {
        id: uuidv4(),
        username : "anita440",
        img : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMl9wV4PK3dAAemDmVxyQi4sldU2zQJX0DdQ&s",
        content : "REST aPIs allow different software systems to communicate using standard HTTP methods like GET, POST, PUT, and DELET."
    },
    {
        id: uuidv4(),
        username : "janvi001",
        img : "https://sourcebae.com/blog/wp-content/uploads/2023/09/Top-10-Uses-Of-Node-js.jpg",
        content : "Node.js is a runtime environment that allows you torun JavaScript code outside the browser."
    }
]
app.listen(port, ()=>{
    console.log("Listening the port no : 8080");
});
//get request for main post page
app.get("/posts", (req, res)=>{
    res.render("index.ejs", {posts});
});
//get request for new post
app.get("/posts/new", (req, res)=>{
    res.render("new.ejs");
});
//new posts details add in index
app.post("/posts", (req, res)=>{
    // console.log(req.body);
    let {username, img, content} = req.body;
    let id = uuidv4();
    posts.push({id, username, img, content});
    res.redirect("/posts");
})
//request for show post details
app.get("/posts/:id", (req, res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    // console.log(post);
    res.render("show.ejs", {post});
})
// Now we are sending a PATCH request for update the individual post we can also use PUT  request
app.patch("/posts/:id", (req, res)=> {
    let {id} = req.params;
    let newContent = req.body.content;
    let newImg =req.body.img;
    let post = posts.find((p) => id == p.id);
    post.content = newContent;
    post.img = newImg;
    // console.log(post);
    res.redirect("/posts");
})
// send get request and redirect to the edit form
app.get("/posts/:id/edit", (req, res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("edit.ejs", {post});
})
// now create the route for delete the post
app.delete("/posts/:id", (req, res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=> id !== p.id);
    res.redirect("/posts");
})