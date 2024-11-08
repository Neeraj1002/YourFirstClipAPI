import prisma  from "../DB/db.config.js";

export const fetchAllUser = async(req,res) => {
    const allUser = await prisma.user.findMany({})
    return res.json({status:200, data:allUser, msg: "Fetched all user"})
}

// Add User
export const createUser = async (req,res) => {
    const {name, email, password, phone, role} = req.body;

    const findUser = await prisma.user.findUnique({
        where:{
            email:email
        }
    })

    if(findUser) {
        return res.json({status:400, message: "Email already exist"})
    }

    const newUser = await prisma.user.create({
        data:{
            name:name,
            email:email,
            password:password,
            phone:phone,
            role:role
        }
    })
    
    return res.json({status:200, data:newUser, msg: "User Created"})
}


// Update the user
export const  updateUser = async(req,res) => {
    const userId = req.params.id
    const {name, email, password} = req.body

    const newUser = await prisma.user.update({
        where:{
            id:Number(userId)
        },
        data:{
            name,
            email,
            password,
            phone,
            role
        }
    })

    return res.json({status: 200, data: newUser, msg: "User updated"})
}

export const userDetails = async (req,res) => {
    const userId = req.params.id
  

    const userDetail  = await prisma.user.findUnique({
        where:{
            id: Number(userId)
        }
    })

    return res.json({status:200, data: userDetail, msg:"User Detail"})
}

export const deleteUser = async(req,res) => {
    const userId = req.params.id

    await prisma.user.delete({
        where:{
            id: Number(userId)
        }
    })

    return res.json({status:200,  msg:"User Deleted"})
}