const express = require('express');

const router = express.Router();
const db = require('../data/database');
const mongodb = require('mongodb');

const ObjectId = mongodb.ObjectId;

router.get('/',function (req,res){

    res.redirect('/posts');
});

router.get('/posts', async function (req,res){
    const posts = await db.getDb().collection('posts').find( {}, {_id: 1 , title: 1, summary: 1, 'author.name': 1} ).toArray();
    res.render('posts-list',{
        posts: posts
    });
});
router.get('/new-post', async function (req,res){
    const authors = await db.getDb().collection('authors').find().toArray();
    res.render('create-post',{
        authors: authors
    });
});

router.post('/store-data', async  function (req, res){
    const authorId = new ObjectId(req.body.author);
    const author= await db.getDb().collection('authors').findOne({_id: authorId});
   const data = {
     title: req.body.title,
     summary: req.body.summary,
     body: req.body.content,
     date: new Date(),
     author: {
         id: authorId ,
         name: author.name,
         email: author.email
     }
    };
   const result = await db.getDb().collection('posts').insertOne(data);
   res.redirect('/posts');
});

router.get('/post-details/:id',async function (req,res){
    const postId = new ObjectId(req.params.id);
    const post = await db.getDb().collection('posts').findOne({_id: postId },{ summary:0});
    if( !post ){
        return res.status(404).render('404');
    }
    post.humanReadDate = post.date.toLocaleDateString('en-US',{
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    post.date = post.date.toISOString();

    res.render('post-detail',{
        post: post
    });
});
router.get('/posts/edit/:id',async function (req, res){
    const postId = req.params.id;
    const [posts] = await db.query('SELECT * FROM posts WHERE posts.id = ?',[postId]);

    if( !posts || posts.length ==0){
        return res.status(404).render('404');
    }
    res.render('update-post',{
        post: posts[0]
    });
});
router.post('/posts/update/:id',async function (req,res){
    const data = {

    };
     await db.query('UPDATE posts SET title = ? , summary = ?, body = ? WHERE id = ?',[ req.body.title, req.body.summary, req.body.content, req.params.id,]);
     res.redirect('/posts');
});

router.post('/posts/delete/:id',async function (req,res){
    const data = {

    };
    await db.query('Delete FROM posts  WHERE id = ?',[req.params.id,]);
    res.redirect('/posts');
});


module.exports = router;

//end of folder 23