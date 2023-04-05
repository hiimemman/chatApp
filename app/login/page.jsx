"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import {succesStatus, errorStatus, defaultStatus, successStatusLabel, errorStatusLabel, defaultStatusLabel} from '../design/button'
import Link from "next/link"
import { useRouter } from 'next/navigation';

export default function Login(){
  const router = useRouter();

  const [emailStatus, setEmailStatus] = useState('blank')
  const [passwordStatus, setPasswordStatus] = useState('blank')
  const [submitting, setSubmitting] = useState(false)

  const frmSubmitAuth = async (event) =>{
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    try{
    setSubmitting(true)//set loading
    const response = await axios.post('/api/auth/login', formData)
    
    console.log(response)
    if(response.statusText === 'OK'){
      setSubmitting(false)// turn off loading
    }
    if(response.data.requestStatus === 'Email does not exist'){
      setEmailStatus('error')
    }
    if(response.data.requestStatus === 'Wrong password'){
      setPasswordStatus('error')
    }
    if(response.status !== 200){
      console.log(response.data)
    }

    if(response.data.requestStatus === 'Match'){

      // middleware(user.id)
      let cookie = `user_=true`;
      cookie += "path=/;";
      cookie += `max-age=${
        60 * 60* 24 * 365 //one year
      }`
      document.cookie = cookie;
      router.push('/chat')
    }
    }catch(e){
      console.log(e)
    }
   
  }

    return( 
<>
<div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
    <form className="space-y-6" action="POST" onSubmit={frmSubmitAuth}>
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h5>
        <div>
            <label for="email" className={emailStatus === 'blank' ? defaultStatusLabel : emailStatus === 'success' ? successStatusLabel : errorStatusLabel}>Your email</label>
            <input type="email" name="email" id="email" className={emailStatus === 'blank' ? defaultStatus : emailStatus === 'success' ? succesStatus : errorStatus} placeholder="name@company.com" required onChange = {() => setEmailStatus('blank')}/>
            {emailStatus === 'error' ? (<p class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oh, snapp!</span> Email does not exist.</p>) : (<div></div>)}
        </div>
        <div>
            <label for="password" className={passwordStatus === 'blank' ? defaultStatusLabel : passwordStatus === 'success' ? successStatusLabel : errorStatusLabel}>Your password</label>
            <input type="password" name="password" id="password" placeholder="••••••••" className={passwordStatus === 'blank' ? defaultStatus : passwordStatus === 'success' ? succesStatus : errorStatus} required  onChange = {() => setPasswordStatus('blank')}/>
            {passwordStatus === 'error' ? (<p class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oh, snapp!</span> Incorrect Password.</p>) : (<div></div>)}
        </div>
        <div className="flex items-start">
            <div className="flex items-start">
                <div className="flex items-center h-5">
                    <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                </div>
                <label for="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
            </div>
            <Link href="#" className="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</Link>
        </div>
        {submitting === true ? (<button disabled type="button" class="w-full text-white bg-blue-950 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#FFFFFF"/>
    </svg>
    Loading...
  </button>
  ) : (<button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>)}
        
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered? <Link href="#" className="text-blue-700 hover:underline dark:text-blue-500">Create account</Link>
        </div>
    </form>
</div>

   </>
    )
}