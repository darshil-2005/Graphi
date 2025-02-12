'use client';;
import { handleLogout } from '@/app/server/actions'
import { Button } from '@/components/ui/shadcnComponent/button'

const LogOutButton = ({ children, variant, className }) => {

  return (
    <form action={handleLogout}>
        <Button className={className} variant={variant} type='submit'>{children}</Button>
    </form>
  )
}

export default LogOutButton