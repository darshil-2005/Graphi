// 'use client';

import React from 'react';
import { signIn } from '@/auth'
import { Button } from '../../components/ui/button'
import { handleLogin } from '@/app/server/actions'
import { redirect } from 'next/dist/server/api-utils';

async function LoginButton({ children, method, variant, className }) {

  return (
    // <form action={handleLogin(method)}>
    //   <Button className={className} variant={variant} type='submit'>{children}</Button>
    // </form>

    <form action={async () => {
      "use server"
      await signIn(method, {redirectTo: '/dashboard'})
    }}>
      <Button className={className} variant={variant} type='submit'>{children}</Button>
    </form>
  )

}


export default LoginButton