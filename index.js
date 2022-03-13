const express = require("express");
const { path } = require("express/lib/application");
const mongoose = require("mongoose")
const app = express()

app.use(express.json())

const connect  = ()=> mongoose.connect(
    "mongodb+srv://web15:web15@cluster0.zieim.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

// section schema

const sectionSchema = new mongoose.Schema({
    id:{type:Number,required:true},
    section_name:{type:String,required:true},
    bookId:[{type:mongoose.Schema.Types.ObjectId,ref:"books",required:false}]
},
{
    timestamps:true,
    versionKey:false
}
)


// author schema 

const authorSchema = new mongoose.Schema({
    first_name:{type:String,required:true},
    last_name:{type:String,required:true}
},
{
    timestamps:true,
    versionKey:false
}
);

// book schema

const bookSchema = new mongoose.Schema({
    book_name:{type:String,required:true},
    authorId:{type:mongoose.Schema.Types.ObjectId,ref:"authors",required:true},
    sectionId:{type:mongoose.Schema.Types.ObjectId,ref:"sections",required:true}
},
{
    timestamps:true,
    versionKey:false
}
)

// section model

const Section =new mongoose.model("sections",sectionSchema)

// section model

const Author =new mongoose.model("authors",authorSchema)

// section model

const Book =new mongoose.model("books",bookSchema)


// author controller
app.get("/author/:id",async (req,res)=>{
    console.log("get at author")
    const author =await Author.findById(req.params.id).lean().exec();
    return res.send(author);
})


app.get("/author",async (req,res)=>{
    console.log("get at author")
    const author =await Author.find().lean().exec();
    return res.send(author);
})

app.post("/author",async(req,res)=>{
    try {
        console.log(req.body);
        const author =await Author.create(req.body)
        return res.status(201).send(author)
    } catch (error) {
        return res.status(500).send(error.message);
    }
})

app.patch("/author/:id",async (req,res)=>{
    const author = await Author.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
    return res.send(author)
})

app.delete("/author/:id",async (req,res)=>{
    const author = await Author.findByIdAndDelete(req.params.id).lean().exec();
    return res.send(author)
})



// book controller


app.get("/books/:id",async (req,res)=>{
    console.log("get at author")
    const books =await Book.findById(req.params.id).populate({path:"authorId",select:["first_name","last_name"]}).lean().exec();
    return res.send(books);
})

app.get("/books",async (req,res)=>{
    console.log("get at author")
    const books =await Book.find().populate({path:"authorId",select:["first_name","last_name"]}).lean().exec();
    return res.send(books);
})

app.post("/books",async(req,res)=>{
    try {
        console.log(req.body);
        const books =await Book.create(req.body)
        return res.status(201).send(books)
    } catch (error) {
        return res.status(500).send(error.message);
    }
})

app.patch("/books/:id",async (req,res)=>{
    const books = await Book.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
    return res.send(books)
})

app.delete("/books/:id",async (req,res)=>{
    const books = await Book.findByIdAndDelete(req.params.id).lean().exec();
    return res.send(books)
})

// section controller


app.get("/sections/:id",async (req,res)=>{
    console.log("get at author")
    
    const sections =await Section.findById(req.params.id).populate({path:"bookId", populate:{path:"authorId",select:["first_name"]}  }).lean().exec();
    return res.send(sections);
})

app.get("/sections",async (req,res)=>{
    console.log("get at author")
    
    const sections =await Section.find().populate({path:"bookId", populate:{path:"authorId",select:["first_name"]}  }).lean().exec();
    return res.send(sections);
})

app.post("/sections",async(req,res)=>{
    try {
        console.log(req.body);
        const sections =await Section.create(req.body)
        return res.status(201).send(sections)
    } catch (error) {
        return res.status(500).send(error.message);
    }
})

app.patch("/sections/:id",async (req,res)=>{
    const sections = await Section.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
    return res.send(sections)
})

app.delete("/sections/:id",async (req,res)=>{
    const sections = await Section.findByIdAndDelete(req.params.id).lean().exec();
    return res.send(sections)
})



app.listen(5000,()=>{
    connect()
    console.log("port listening 5000 and connected successfully");
})