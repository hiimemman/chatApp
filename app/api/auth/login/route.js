import prisma from '../../../../prisma/prisma'
import { cookies } from 'next/headers'; // Import cookies
import { NextRequest, NextResponse } from "next/server";

export async function POST(request){
    const cookiesList = cookies()

    
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

     


    //    if(cookiesList.has('isAuth') === true){
    //     return Response.json({ requestStatus: 'Aborted', requestStatus: 'Cookies still exist'})
    //    }
    
        if(!user){
            return Response.json({...user, requestStatus: 'Email does not exist'})
        }
    
        if(user.hashedPassword !== password){
            return Response.json({...user, requestStatus: 'Wrong password'})
        }
        // middleware(user.id)
        return Response.json({cookiesList, requestStatus: 'Matched', requestStatus: 'Match'})
       
    }catch(e){
        return Response.json({errorMessage: e.message, requestStatus: 'Server Error'})
    }
   
}

//set cookies middleware
export async function middleware(req) {
    const res = NextResponse.next();
    //Setting cookies in response.
    //This will be sent back to the browser.

    // res.cookies.set("isAuth", NextRequest, {
    //   path: "/",
    //   httpOnly: true,
    // });

    res.cookies.set('isAuth', req);

  
    // Setting cookies in the request.
    // This will be forwarded to api handler or getServerSideProps
    // depending on the route.

    // req.cookies.set({
    //   name: "isAuth",
    //   value: NextRequest,
    // });
    return res;
  }