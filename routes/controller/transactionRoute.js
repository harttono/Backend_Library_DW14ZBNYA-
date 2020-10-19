const {Book,Category,User} = require('../../models');
// list of books by Admin
exports.list_Books = async(req,res) =>{
    try{
    const listBooks = await Book.findAll({
        attributes:['id','title','publication','pages','ISBN','description','file','status'],
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
    });
    if(listBooks.length > 0){
        return res.send({data:listBooks})
    }else{
        return res.status(400).send({
            message:'list of book is empty.'
        })
    }
    }catch(err){
        res.status(500).send({
            message:`error ${err}`
        })
    }
}

// update Book's User by Admin
exports.edit_BookUser = async(req,res) =>{
    try{
        const {id} = req.params;
        const {status} = req.body;
        const updateStatusBook = {
            status:status
        }
        const update = await Book.update(updateStatusBook,{
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
                attributes:['id','title','publication','category','user','pages','ISBN','description','file','status']
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


// get books's user by User
exports.get_bookUser = async(req,res) =>{
    try{
        const bookUser = await Book.findAll({
            attributes:['id','title','author','publication','pages','ISBN','description','file','status','cover'],
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
            where:{user:req.user.id}
        })
        if(bookUser.length > 0){
            res.status(200).send({
                message:'here are your books.',
                data:bookUser
            })
        }else{
            res.status(400).send({
                message:`you don't have a book.`
            })
        }
    }catch(err){
        res.status(500).send({
            message:`error ${err}`
        })
    }
}

// show book's user by user.
exports.get_approvedBook_user = async(req,res) =>{
    try{
        const bookUser = await Book.findAll({
            where:{user:req.user.id,status:'approved'},
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
        if(bookUser.length > 0){
            return res.status(200).send({
                message:'here are your books.',
                data:bookUser
            })
        }else{
           return res.status(400).send({
                message:`your library is empty.`
            })
        }
    }catch(err){
        res.status(500).send({
            message:`error ${err}`
        })
    }
}