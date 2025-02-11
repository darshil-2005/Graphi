'use client';

import React from 'react';
import { handleLogout } from '@/app/server/actions'
import { signOut } from '@/auth'
import { Button } from '@/components/ui/shadcnComponent/button'

const LogOutButton = ({ children, variant, className }) => {

  return (
    <form action={handleLogout}>
        <Button className={className} variant={variant} type='submit'>{children}</Button>
    </form>
  )
}

export default LogOutButton