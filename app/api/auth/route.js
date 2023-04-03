import prisma from '../../../prisma/prisma'


export async function POST(request){
    console.log("Server Post started D:")
    // const body = await request.formData()
    // const email = body.get('email')
    // const password = body.get('password')
    const body = await request.formData()
    const email = body.get('email')
    const password = body.get('password')
    try{
        const user = await prisma.user.findUnique({
            where:{
                email: email,
            },
        })
    
        if(!user){
            return Response.json({...user, requestStatus: 'Email does not exist'})
        }
    
        if(user.password !== password){
            return Response.json({...user, requestStatus: 'Wrong password'})
        }
    
        return Response.json({...user, requestStatus: 'Matched'})
    }catch(e){
        return Response.json({errorMessage: e.message, requestStatus: 'Server Error'})
    }
   
}