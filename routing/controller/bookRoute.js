const {Book,Category,User} = require('../../models');
const category = require('../../models/category');

// Get All Books
exports.getBooks = async(req,res) =>{
    try{
    const Books = await Book.findAll({
        order:[["id","ASC"]],
        attributes:['id','title','publication','pages','ISBN','description','file','status'],
        include:[
            {
                model:Category,
                attributes:['id','name']
            },
            {
                model:User,
                attributes:['id','email','fullname','gender','phone','address']
            }
        ]
    });
    res.send({data:Books})
    }catch(err){
        res.status(500).send({
            message:`error ${err}`
        })
    }
}

// Add Book 

exports.add_Book = async(req,res) =>{
   try{
    const {title,publication,categoryId,userId,pages,ISBN,description} = req.body;
    const BookData = {
        title:title,
        publication:publication,
        categoryId:categoryId.id,
        userId:userId.id,
        pages:pages,
        ISBN:ISBN,
        description:description,
        file:'http://localhost:5000/source-file/book1.epub',
        status:'waiting to be verificated'
    }
    const savedBook = await Book.create(BookData,{
        order:[["id","ASC"]],
        attributes:['id','title','publication','pages','ISBN','description','file','status'],
        include:[
            {
                model:Category,
                attributes:['id','name']
            },
            {
                model:User,
                attributes:['id','email','fullname','gender','phone','address']
            }
        ]
    });
    if(savedBook){
        res.status(200).send({
            message:'Your book has been added successfully.',
            data:savedBook
        })
    }
   }catch(err){
        res.status(500).send({
            message:`error ${err}`
        })
   } 
}

// update Book
exports.edit_Book = async(req,res) =>{
    try{
        const {id} = req.params;
        const {status} = req.body;
        const updateStatusBook = {
            status
        }
        const update = await Book.update(updateStatusBook,{
            where:{id}
        });
        if(update){
            const GetDetailBook = await Book.findOne({
                where:{id},
                attributes:['id','title','publication','categoryId','userId','pages','ISBN','description','file','status']
            })
            res.send({
                message:`Your book with id ${id} has been updated successfully.`,
                data:GetDetailBook
            })
        }
    }catch(err){
        res.status(500).send({
            message:`error ${err}`
        })
    }
 }

//  Delete Book
exports.delete_Book = async(req,res) =>{
    try{
       const {id} = req.params;
       const DeletedBook = await Book.destroy({
            where:{id}
       })
       if(DeletedBook){
            res.send({
               message:`Your book with Id ${id} has been deleted.`,
               data:id
           })
       }


    }catch(err){
        res.status(500).send({
            message:`error ${err}`
        })
    }
}