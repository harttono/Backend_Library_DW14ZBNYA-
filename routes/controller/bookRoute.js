const {Book,Category,User} = require('../../models');
const {Op} = require('sequelize')

// Add Book 
exports.add_Book = async(req,res) =>{
    try{
         const {title,author,publication,category,pages,ISBN,file,cover,description,status} = req.body;
         const BookData = {
             title:title,
             author:author,
             publication:publication,
             category:category.id,
             user:req.user.id,
             pages:pages,
             ISBN:ISBN,
             status:status,
             description:description,
             file:file,
             cover:cover
         }
         const savedBook = await Book.create(BookData);
         if(savedBook){
             const newBookId = savedBook.id;
             const GetDetailBook = await Book.findOne({
                 where:{id:newBookId},
                 include:[
                     {
                         model:Category,
                         as:"categoryId",
                         attributes:['id','name']
                     },
                     {
                        model:User,
                        as:"userId",
                        attributes:['id','email','fullname','gender','phone','address']
                     }
                 ],
                 attributes:['id','title','author','publication','pages','ISBN','description','file','cover','status']
             })
             if(GetDetailBook){
                  res.status(200).send({
                    message:'Your book has been added successfully.',
                    data:GetDetailBook
                })
             }else{
                  res.status(400).send({
                    message:'there was an error in saving data.'
                })
             }
         }
    }catch(err){
         res.status(500).send({
             message:`error ${err}`
         })
    } 
 }

//  Detail a book
exports.detail_Book = async(req,res) =>{
    try{
        const {id} = req.params;
        const GetDetailBook = await Book.findOne({
            where:{id},
            include:[
                {
                    model:Category,
                    as:"categoryId",
                    attributes:['id','name']
                },
                {
                    model:User,
                    as:"userId",
                    attributes:['id','email','fullname','gender','phone','address']
                }
            ],
            attributes:['id','title','author','publication','pages','ISBN','description','file','cover','status']
        })

        if(GetDetailBook){
            res.status(200).send({
                message:`Your book with id ${id} has been updated successfully.`,
                data:GetDetailBook
            })
        }else{
            res.status(400).send({
                message:`Your book with Id ${id} has been deleted.`,
            })
        }
  
            
    }catch(err){
        res.status(500).send({
            message:`error ${err}`
        })
    }
}

// list books of book's user approved
exports.getBooks_ByCategory = async(req,res) =>{
    try{
    const {status,categoryId} = req.query;
    if(status){
        const listBooks = await Book.findAll({
            attributes:['id','title','author','publication','pages','ISBN','description','file','cover','status'],
            include:[
                {
                    model:Category,
                    as:"categoryId",
                    attributes:['id','name']
                },
                {
                    model:User,
                    as:"userId",
                    attributes:['id','email','fullname','gender','phone','address']
                }
            ]
            ,where:{
                status:status
            }
        });
        if(listBooks){
            res.send({data:listBooks})
        }else{
            res.status(400).send({
                message:'list of book is empty.'
            })
        }
    }else if(categoryId){
        const Listcategory = await Book.findAll({
            attributes:['id','title','author','publication','pages','ISBN','description','file','cover','status'],
            include:[
                {
                    model:Category,
                    as:"categoryId",
                    attributes:['id','name'],
                    where:{'$categoryId.id$':categoryId}
                },
                {
                    model:User,
                    as:"userId",
                    attributes:['id','email','fullname','gender','phone','address']
                }
            ]
        });
        
        if(Listcategory){
            res.status(200).send({
                message:'list of books loaded',
                data:Listcategory
            })
        }else{
            res.status(400).send({
                message:'list of book is empty.'
            })
        }
    }
    }catch(err){
        res.status(500).send({
            message:`error ${err}`
        })
    }
}

exports.edit_Book = async(req,res) =>{
    try{
        const {id} = req.params;
        const {title,author,publication,pages,ISBN} = req.body;
        const updatedData = {
            title,
            author,
            publication,
            pages,
            ISBN
        }
        const update = await Book.update(updatedData,{
            where:{id}
        });
        if(update){
            const GetDetailBook = await Book.findOne({
                where:{id},
                include:[
                    {
                        model:Category,
                        as:"categoryId",
                        attributes:['id','name']
                    },
                    {
                        model:User,
                        as:"userId",
                        attributes:['id','email','fullname','gender','phone','address']
                    }
                ],
                attributes:['id','title','publication','pages','ISBN','description','file','status']
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

//  Delete book user
exports.delete_Book = async(req,res) =>{
    try{
        const {id} = req.params;
        const deletedBook = await Book.destroy({
                where:{id}
       })
        if(deletedBook){
             res.status(200).send({
                   message:`Your book with Id ${id} has been deleted.`
               })
        }else{
             res.status(400).send({
                 message:`no book with id ${id},`
             })       
        }
       
    }catch(err){
        res.status(500).send({
            message:`error ${err}`
        })
    }
}