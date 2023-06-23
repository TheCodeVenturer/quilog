# Mere Ghar ka vlog
## hello
---
* first item
* second item
1. apple
2. fruit
```js
export async function POST(req){
    try {
        const {userId,title,content} = await req.json()
        // console.log(name, email, pass)
        await db.connect()
        const isExisting = await User.findOne({_id:userId})
        
        if(!isExisting){
            throw new Error("You are not authorized to create a post")
        }

        const newPost = await Post.create({userId,title,data:content})

        const postId = newPost._doc._id

        return new Response(JSON.stringify(postId), {status: 201})
    } catch (error) {
        console.log(error.message);
        return new Response(JSON.stringify(error.message), {status: 500})
    }
}
```
![Taj Mahal](https://media.istockphoto.com/id/1146517111/photo/taj-mahal-mausoleum-in-agra.jpg?s=612x612&w=0&k=20&c=vcIjhwUrNyjoKbGbAQ5sOcEzDUgOfCsm9ySmJ8gNeRk=)
*Good Bye*