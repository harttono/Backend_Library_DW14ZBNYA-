const {Book,Category,User,Bookmark} = require('../../models');

// add new add book
exports.addBookmark = async (req,res) =>{
    try{
        const {bookId} = req.query;
        const added = await Bookmark.create({
            userId:req.user.id,
            bookId:bookId
        });
   
        if(added){
               const getDetail = await Book.findOne({
                   where:{
                       id:bookId
                   },
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
                   attributes:['id','title','author','publication','pages','ISBN','status','cover','file'],
               })
               if(getDetail){
                   res.status(200).send({
                       message:`you've bookmarked this Book !!!`,
                       data:getDetail
                   })
               }else{
                   res.status(400).status({
                       message:`you can't bookmark this Book..`
                })
            }
        }
        
    
    }catch(err){
        res.status(500).send({
            message:`error ${err}`
        }) 
    }
    
}


// deleted bookmark
exports.deleteBookmark = async (req,res) =>{
   try{
        const {bookId} = req.params;
        const deleted = await Bookmark.destroy({
            where:{
                userId:req.user.id,
                bookId:bookId
            }
        });
 
        if(deleted){
            const getDetail = await Book.findOne({
                where:{
                    id:bookId
                },
                attributes:['id','title','category','user','author','publication','pages','ISBN','status','cover','file'],
            })
            if(getDetail){
                res.status(200).send({
                    message:'your bookmark has been deleted successfully !!!',
                    data:getDetail
                })
            }
            
        }else{
            res.status(400).send({
                message:`You've not bookmarked yet !!!`
            })
        }
   }catch(err){
        res.status(500).send({
            message:`error ${err}`
        }) 
   }
}


// get MyBookmark
exports.getMyBookmark = async(req,res) =>{
    try{
        const myBookmarks = await Bookmark.findAll({
            where:{
                userId:req.user.id
            },
            include:[
                {
                    model:Book,
                    as:"books",
                    attributes:['id','title','author','publication','pages','ISBN','status','cover','file'],
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
                },
                {
                    model:User,
                    as:"users",
                    attributes:['id','email','fullname','gender','phone','address'],
                }
            ],
             attributes:['id']
        })
        if(myBookmarks){
            res.status(200).send({
                message:`list of Books has marked`,
                data:myBookmarks
            })
        }else{
            res.status(400).status({
                message:`No Book.`
            })
        }
    }catch(err){
        res.status(500).send({
            message:`error ${err}`
        }) 
    }
}