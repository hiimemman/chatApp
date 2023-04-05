
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
export default function Loading (){
    const nextCookies = cookies()

    if(nextCookies.has('user_')){
        console.log('d')
        redirect('/chat')
    }
    return(
        <div>
            <h1>Loading...</h1>
        </div>
        
    )
}