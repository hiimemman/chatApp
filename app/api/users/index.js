import prisma from '../../../prisma/prisma'

export async function getUsers(){
    const drafts = await prisma.user.findMany()
    
    const response = {
        status: 200,
        body: drafts
    }
    return response
}

export async function createUsers(req, res){
    const user = await prisma.user.create({
        data: {
            name: req.name,
            username: req.username,
            email: req.email,
            hashedPassword: 'Random',
        },
})
const response = {
    status: 200
}
return response
}