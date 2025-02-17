'use client';

import React, { useState } from 'react'
import { Orbitron } from 'next/font/google'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { auth } from '@/auth'
import LogOutButton from '@/components/authButtons/logoutButton'

import { PanelLeftClose, PanelRightClose, House, LucideLayoutDashboard, Gem, BookOpenCheck } from 'lucide-react'
import ModeToggle from '@/components/modeToogle';


const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '700'] })

function Sidebar({ session }) {

    const [extended, setExtended] = useState(false);

    const path = usePathname();

    const sidebarMenuOptions = [{ label: 'Home', icon: <House size={32} absoluteStrokeWidth />, link: '/' },
    { label: 'Dashboard', icon: <LucideLayoutDashboard size={32} absoluteStrokeWidth />, link: '/dashboard' },
    { label: 'Pricing', icon: <Gem size={32} absoluteStrokeWidth />, link: '/pricing' },
    { label: 'Tutorials', icon: <BookOpenCheck size={32} absoluteStrokeWidth />, link: '/tutorial' }]

    return (
        <aside className={`${extended ? 'w-[25rem] pl-8 pr-6' : 'w-[4.6rem] items-center'} border py-8 flex flex-col justify-between transition-all duration-200`}>
            <div className='flex items-center gap-x-12'>

                {extended &&
                    <div className={`${orbitron.className} text-3xl tracking-[0.6rem] text-primary`}><Link href='/'>GRAPHI</Link></div>
                }

                {!extended &&
                    <button className=' p-1 rounded-lg' onClick={() => { setExtended(!extended) }}><PanelRightClose size={32} absoluteStrokeWidth /></button>
                }

                {extended &&
                    <button className='bg-secondary p-1 rounded-lg' onClick={() => { setExtended(!extended) }}><PanelLeftClose size={32} absoluteStrokeWidth /></button>
                }

            </div>

            <ul className='flex flex-col gap-y-6'>
                {
                    sidebarMenuOptions.map((d, i) => (

                        <li key={i} className={`${ path == d.link ? 'bg-vibrant-2/30 border border-vibrant-3/50 shadow-2xl' : 'hover:bg-secondary'} p-2.5 rounded-lg `}>
                            <a href={d.link} className='text-lg flex gap-x-8 tracking-wider items-center' >

                                <div>{d.icon}</div>

                                {extended &&
                                    <span className={`${orbitron.className} tracking-widest`}>{d.label}</span>
                                }
                            </a>
                        </li>


                    ))
                }
            </ul>

            <div className='flex flex-col gap-y-6'>
                <ModeToggle className={`${extended ? 'w-full' : 'aspect-square'} `} />
                <div className='flex items-center gap-x-3'>
                    <img src={session.user.image} alt="" className='h-10 w-10 rounded-full aspect-square' />
                    {extended &&
                        <div className='flex flex-col'>
                            <span className='text-2xl font-bold tracking-widest'>{session.user.name}</span>
                            <span className='w-48 overflow-hidden text-ellipsis'>{session.user.email}</span>
                        </div>
                    }
                </div>

                <LogOutButton className={`${extended ? 'w-full' : 'w-0 invisible'}`}>Logout</LogOutButton>


            </div>
        </aside>
    )
}

export default Sidebar