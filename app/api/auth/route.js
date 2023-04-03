import prisma from '../../../prisma/prisma'


export async function POST(request){
    console.log("Server Post started here:")
    console.log(request)
    try{
        const user = await prisma.user.findUnique({
            where:{
                email: request.email,
            },
        })
    
        if(!user){
            return Response.json({status: 200, body: user, requestStatus: 'Email does not exist' })
        }
    
        if(user.password !== password){
            return Response.json({status: 200, body: user, requestStatus: 'Wrong password'})
        }
    
        return Response.json({status: 200, body: user, requestStatus: 'Matched'})
    }catch(e){
        return Response.json({status: 200, body: e.message, requestStatus: 'Server error'})
    }
   
}