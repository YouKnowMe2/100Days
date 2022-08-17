const Post = require("../models/post");
const sessionData = require("../utili/validation-sessions");
const validation = require("../utili/validation");

function getHome (req, res) {
    res.render('welcome');
}

async function getAdmin(req, res) {
    if (!res.locals.isAuth) {
        return res.status(401).render('401');
    }

    const posts = await Post.fetchAll();

    sessionInputData = sessionData.getSessionErrorData(req,{
        title: '',
        content: ''
    });

    res.render('admin', {
        posts: posts,
        inputData: sessionInputData,
    });
}

async function createPost(req, res) {
    const enteredTitle = req.body.title;
    const enteredContent = req.body.content;

    if (
        !validation.validateInput(enteredTitle,enteredContent)
    ) {
        sessionData.flasErrosToSessions(req,{
            message: 'Invalid input = please check your data',
            title: enteredTitle,
            content: enteredContent,
        }, function (){
            res.redirect('/admin');
        });


        return; // or return res.redirect('/admin'); => Has the same effect
    }

    const newPost = new Post(enteredTitle,enteredContent);
    await newPost.insert();

    res.redirect('/admin');
}

async function getSinglePost(req, res) {
    const post = new Post(null,null,req.params.id);
    await post.fetch();

    if (!post.title || !post.content) {
        return res.render('404'); // 404.ejs is missing at this point - it will be added later!
    }

   sessionInputData = sessionData.getSessionErrorData(req,{
       title: post.title,
       content: post.content
   });

    res.render('single-post', {
        post: post,
        inputData: sessionInputData,
    });
}

async function updatePost(req, res) {
    const enteredTitle = req.body.title;
    const enteredContent = req.body.content;

    if (
       !validation.validateInput(enteredTitle,enteredContent)
    ) {
      sessionData.flasErrosToSessions(req,{
          message: 'Invalid input - please check your data.',
          title: enteredTitle,
          content: enteredContent,
      },function (){
          res.redirect(`/posts/${req.params.id}/edit`);
      });


        return;
    }

    const updatePost = new Post(enteredTitle,enteredContent,req.params.id);
    await updatePost.update();
    res.redirect('/admin');
}

async function deletePost (req, res) {
    const deletePost = new Post(null,null,req.params.id);
    await deletePost.delete();

    res.redirect('/admin');
}

module.exports = {
    getHome: getHome,
    getAdmin: getAdmin,
    createPost: createPost,
    getSinglePost: getSinglePost,
    updatePost: updatePost,
    deletePost: deletePost,

}