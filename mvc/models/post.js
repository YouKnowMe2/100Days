const mongodb = require('mongodb');
const db = require("../data/database");

const ObjectId = mongodb.ObjectId;

class Post {
    constructor(title,content,id) {
       this.title = title;
       this.content = content;
       this.id = new ObjectId(id);

    }
     static async fetchAll(){
        const posts = await db.getDb().collection('posts').find().toArray();
        return posts;
    }
    async fetch(){
        if(!this.id){
            return;
        }
        const post = await db.getDb().collection('posts').findOne({ _id: this.id });
        this.title = post.title;
        this.content = post.content;
    }
   async insert(){

        await db.getDb().collection('posts').insertOne({
            title: this.title,
            content: this.content,
        });
    }

    async update(){

        if(!this.id){
           return;
        }
        await db.getDb().collection('posts').updateOne(
            { _id: this.id },
            { $set: { title: this.title, content: this.content } }
        );
    }
    async delete(){
        if(!this.id){
            return;
        }
        await db.getDb().collection('posts').deleteOne(
            { _id: this.id });
    }




}


module.exports = Post;