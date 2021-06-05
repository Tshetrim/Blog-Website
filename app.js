 //requiring modules
require('dotenv').config();
const express = require("express");
const ejs = require("ejs");
const _ = require("lodash");

const mongoose = require("mongoose");

//creating to MongoDB database
mongoose.connect(process.env.MONGO_SRV+"blog-websiteDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
},(err)=> err ? console.log(err) : console.log("Connected to mongod server"));

//declaring Mongo schemas and models
const postSchema = new mongoose.Schema({
  author:{
    type: String
  },
  title: {
    type: String
  },
  content:{
    type:String
  },
});

const Post = mongoose.model("post",postSchema);
const postOne = new Post({
  author: "Tshetrim",
  title: "Day One - The Start of an Amazing Adventure",
  content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices neque ornare aenean euismod. Cras ornare arcu dui vivamus arcu felis bibendum. Vulputate odio ut enim blandit. Blandit volutpat maecenas volutpat blandit aliquam. Posuere sollicitudin aliquam ultrices sagittis. Non quam lacus suspendisse faucibus interdum posuere. Urna nec tincidunt praesent semper feugiat nibh. Faucibus nisl tincidunteget nullam non nisi est sit amet. Amet risus nullam eget felis eget nunc. Quisque sagittis purus sit amet. Eu sem integer vitae justo eget magna fermentum. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel. Aliquet eget sit amet tellus cras adipiscing enim. Nascetur ridiculus mus mauris vitae ultricies leo integer malesuada nunc. Id interdum velit laoreet id donec. Fringilla urna porttitor rhoncus dolor purus non. Quis auctor elit sed vulputate mi sit amet mauris."
});
const postTwo = new Post({
  author: "Tshetrim",
  title: "Day Two - Finding an Abandoned Cave",
  content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices neque ornare aenean euismod. Cras ornare arcu dui vivamus arcu felis bibendum. Vulputate odio ut enim blandit. Blandit volutpat maecenas volutpat blandit aliquam. Posuere sollicitudin aliquam ultrices sagittis. Non quam lacus suspendisse faucibus interdum posuere. Urna nec tincidunt praesent semper feugiat nibh. Faucibus nisl tincidunteget nullam non nisi est sit amet. Amet risus nullam eget felis eget nunc. Quisque sagittis purus sit amet. Eu sem integer vitae justo eget magna fermentum. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel. Aliquet eget sit amet tellus cras adipiscing enim. Nascetur ridiculus mus mauris vitae ultricies leo integer malesuada nunc. Id interdum velit laoreet id donec. Fringilla urna porttitor rhoncus dolor purus non. Quis auctor elit sed vulputate mi sit amet mauris."
});
const postThree = new Post({
  author: "Tshetrim",
  title: "Day Three - Basking under the Moonlight",
  content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices neque ornare aenean euismod. Cras ornare arcu dui vivamus arcu felis bibendum. Vulputate odio ut enim blandit. Blandit volutpat maecenas volutpat blandit aliquam. Posuere sollicitudin aliquam ultrices sagittis. Non quam lacus suspendisse faucibus interdum posuere. Urna nec tincidunt praesent semper feugiat nibh. Faucibus nisl tincidunteget nullam non nisi est sit amet. Amet risus nullam eget felis eget nunc. Quisque sagittis purus sit amet. Eu sem integer vitae justo eget magna fermentum. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel. Aliquet eget sit amet tellus cras adipiscing enim. Nascetur ridiculus mus mauris vitae ultricies leo integer malesuada nunc. Id interdum velit laoreet id donec. Fringilla urna porttitor rhoncus dolor purus non. Quis auctor elit sed vulputate mi sit amet mauris."
});

//declaring constants
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const defaultPosts = [postOne,postTwo,postThree];
//setting app to express
const app = express();

//setting app view engine to ejs
app.set('view engine', 'ejs');

//setting app to use parsing of url encoded and to serve up public statically
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));


/*
//setting global variables
const posts = [];

//just for display
const postOne = {title: "Day One - The Start of an Amazing Adventure", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices neque ornare aenean euismod. Cras ornare arcu dui vivamus arcu felis bibendum. Vulputate odio ut enim blandit. Blandit volutpat maecenas volutpat blandit aliquam. Posuere sollicitudin aliquam ultrices sagittis. Non quam lacus suspendisse faucibus interdum posuere. Urna nec tincidunt praesent semper feugiat nibh. Faucibus nisl tincidunteget nullam non nisi est sit amet. Amet risus nullam eget felis eget nunc. Quisque sagittis purus sit amet. Eu sem integer vitae justo eget magna fermentum. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel. Aliquet eget sit amet tellus cras adipiscing enim. Nascetur ridiculus mus mauris vitae ultricies leo integer malesuada nunc. Id interdum velit laoreet id donec. Fringilla urna porttitor rhoncus dolor purus non. Quis auctor elit sed vulputate mi sit amet mauris."}

const postTwo = {title:"Day Two - Finding an Abandoned Cave", content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices neque ornare aenean euismod. Cras ornare arcu dui vivamus arcu felis bibendum. Vulputate odio ut enim blandit. Blandit volutpat maecenas volutpat blandit aliquam. Posuere sollicitudin aliquam ultrices sagittis. Non quam lacus suspendisse faucibus interdum posuere. Urna nec tincidunt praesent semper feugiat nibh. Faucibus nisl tincidunt eget nullam non nisi est sit amet. Amet risus nullam eget felis eget nunc. Quisque sagittis purus sit amet. Eu sem integer vitae justo eget magna fermentum. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel. Aliquet eget sit amet tellus cras adipiscing enim. Nascetur ridiculus mus mauris vitae ultricies leo integer malesuada nunc. Id interdum velit laoreet id donec. Fringilla urna porttitor rhoncus dolor purus non. Quis auctor elit sed vulputate mi sit amet mauris."}

const postThree = {title:"Day Three - Basking under the Moonlight",content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices neque ornare aenean euismod. Cras ornare arcu dui vivamus arcu felis bibendum. Vulputate odio ut enim blandit. Blandit volutpat maecenas volutpat blandit aliquam. Posuere sollicitudin aliquam ultrices sagittis. Non quam lacus suspendisse faucibus interdum posuere. Urna nec tincidunt praesent semper feugiat nibh. Faucibus nisl tincidunt eget nullam non nisi est sit amet. Amet risus nullam eget felis eget nunc. Quisque sagittis purus sit amet. Eu sem integer vitae justo eget magna fermentum. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel. Aliquet eget sit amet tellus cras adipiscing enim. Nascetur ridiculus mus mauris vitae ultricies leo integer malesuada nunc. Id interdum velit laoreet id donec. Fringilla urna porttitor rhoncus dolor purus non. Quis auctor elit sed vulputate mi sit amet mauris."}


posts.push(postOne,postTwo,postThree);
*/

//setting the get routes for the website
app.get("/",(req,res)=>{
  Post.find({},(err,posts)=>{
    if(err)
      console.log(err);
    else{
      if(posts.length === 0){
        Post.insertMany(defaultPosts,(err)=>{
          if(err)
            console.log(err);
          else
            res.redirect("/");
        });
      }
      else{
        res.render("home",{
          starterContent:homeStartingContent,
          posts:posts,
        });
      }
    }
  })
});

app.get("/about",(req,res)=>{
  res.render("about",{aboutContent:aboutContent,});
});

app.get("/contact",(req,res)=>{
  res.render("contact",{contactContent:contactContent});
});

app.get("/compose",(req,res)=>{
  res.render("compose",{});
});

//setting dynamic routes using route parameters
app.get("/posts/:postID"||"/posts",(req,res)=>{
  const requestedPostID = _.lowerCase(req.params.postID);
  let foundMatch = false;
  Post.find({},(err,foundPosts)=>{
    if(err)
      console.log(err);
    else{
      for(const post of foundPosts){
        const storedTitle = _.lowerCase(post.title);

        if(storedTitle===requestedPostID){
          foundMatch = true;
          console.log("Match Found");
          res.render("post",{post:post});
        }
      }
      if(!foundMatch)
        res.render("postNotFound");
    }
  });
});

//setting the post routes for our website
app.post("/compose",(req,res)=>{
  const postAddition = new Post({
    author: req.body.postAuthor,
    title: req.body.postTitle,
    content: req.body.postBody,
  });
  postAddition.save((err)=> err ? console.log(err) : res.redirect("/"))
  //console.log(post);
});


app.listen(process.env.PORT||3000, function() {
  console.log("Server started on port 3000");
});
