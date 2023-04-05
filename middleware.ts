import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, res: NextResponse){
    const cookie  = req.cookies.get('isAuth')
    console.log('cookie', cookie)

    return NextResponse.next()
}