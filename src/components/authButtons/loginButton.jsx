// 'use client';

import React from 'react';
import { signIn } from '@/auth'
import { Button } from '../../components/ui/button'
import { handleLogin } from '@/app/server/actions';

async function LoginButton({ children, method, variant, className }) {

  return (

    <form action={
      async () => {
        "use server"
        await handleLogin(method)
    }
    }>
      <Button className={className} variant={variant} type='submit'>{children}</Button>
    </form>
  )

}


export default LoginButton