import React from 'react'
import { Orbitron } from 'next/font/google'
import { auth } from '../../auth'
import Link from 'next/link'
import ModeToggle from '../modeToogle'
import { Button } from './button'
import LogoutButton from '@/components/authButtons/logoutButton'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '700'] })

async function Navbar() {

  const session = await auth();
  
  return (
    <div className='flex justify-between py-6 items-center px-10 h-24'>
      <div className={`${orbitron.className} text-3xl tracking-[0.6rem] text-primary`}><Link href='/'>GRAPHI</Link></div>
      <div className='mt-1'>
        <ul className={`flex gap-x-16 px-6 py-1 rounded-full text-primary bg-secondary/60 border-2 border-border overflow-hidden`}>
          <Link href='/templates'><li className='relative before:absolute before:content-[""] before:top-1/2 before:-translate-y-1/2 before:left-1/2 before:-translate-x-1/2 before:bg-chart-4/0 hover:before:bg-chart-4/40 before:transition-all duration-5000 before:h-[60%] before:w-[120%] before:blur-[10px]'>Templates</li></Link>
          <Link href='/dashboard'><li className='relative before:absolute before:content-[""] before:top-1/2 before:-translate-y-1/2 before:left-1/2 before:-translate-x-1/2 before:bg-chart-4/0 hover:before:bg-chart-4/40 before:transition-all duration-5000 before:h-[60%] before:w-[120%] before:blur-[10px]'>Dashboard</li></Link>
          <Link href='/pricing'><li className='relative before:absolute before:content-[""] before:top-1/2 before:-translate-y-1/2 before:left-1/2 before:-translate-x-1/2 before:bg-chart-4/0 hover:before:bg-chart-4/40 before:transition-all duration-5000 before:h-[60%] before:w-[120%] before:blur-[10px]'>Pricing</li></Link>
        </ul>
      </div>
      <div className='flex gap-x-8'>
        <ModeToggle />

        {!session &&
          <Button variant='secondary' className='w-36'><Link href='/login'>Log In</Link></Button>
        }
        {session &&
          <LogoutButton className='w-36'>Logout</LogoutButton>
          // <DropdownMenu>
          //   <DropdownMenuTrigger asChild>
          //     <img src={session?.user.image} alt="" className='h-10 aspect-square rounded-full' />
          //   </DropdownMenuTrigger>
          //   <DropdownMenuContent className='w-fit p-2'>
          //     <DropdownMenuLabel>My Account</DropdownMenuLabel>
          //     <DropdownMenuSeparator />
          //     <div>{session?.user.name}</div>
          //     <DropdownMenuItem>Billing</DropdownMenuItem>
          //     <DropdownMenuItem>Team</DropdownMenuItem>
          //     {/* <DropdownMenuItem className='bg-yellow-300 w-full'>  {session && */}
          //       <LogoutButton className='mt-2 w-full'>Logout</LogoutButton>
          //     {/* }</DropdownMenuItem> */}
          //   </DropdownMenuContent>
          // </DropdownMenu>
        }
      </div>
    </div>
  )
}

export default Navbar