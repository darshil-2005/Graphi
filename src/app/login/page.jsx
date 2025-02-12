

import React from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/shadcnComponent/card'
import { Orbitron } from 'next/font/google';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { Separator } from '@/components/ui/shadcnComponent/separator';
import LoginButton from '../../components/authButtons/loginButton'
import Navbar from '@/components/ui/navbar'

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '700'] })

async function Login() {

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar/>
      <Card className='w-[30rem] mx-auto mt-20'>
        <CardHeader className={`grid gap-y-2`}>
          <CardTitle className={`${orbitron.className} text-4xl tracking-[0.6rem] text-primary text-center mt-4`}><div className={``}>GRAPHI</div></CardTitle>
          <CardDescription className={`text-center text-xl`}> Get Started...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-y-6'>
            <Separator className='h-1'></Separator>
            <div className='grid gap-y-4'>
              <LoginButton method={'google'} className='flex items-center w-full text-md' variant='secondary'><FcGoogle/>Google</LoginButton>
              <LoginButton method={'github'} className='flex items-center w-full text-md' variant='secondary'><FaGithub/>Github</LoginButton>
              <LoginButton method={'discord'} className='flex items-center w-full text-md' variant='secondary'><FaDiscord/>Discord</LoginButton>
              <LoginButton method={'facebook'} className='flex items-center w-full text-md' variant='secondary'><FaFacebook/>Facebook</LoginButton>
            </div>
            <Separator className='h-1'></Separator>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login