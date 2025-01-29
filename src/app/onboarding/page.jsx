"use server";

import { prisma } from '@/../../prisma/prisma'
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '../../components/ui/card'
import { redirect } from 'next/navigation';
import { auth } from '@/auth'
import Navbar from '@/components/ui/navbar'
import OnboardingForm from '@/app/onboarding/onboardingForm'
import { Orbitron } from 'next/font/google';


const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '700'] })

export default async function Onboarding() {

  const user = await auth();
  const isUserOnBoarded = await prisma.user.findFirst({
    where: {
      email: user.user.email,
    },
    select: {
      username: true,
    }
  });

  if (isUserOnBoarded.username) {
    redirect('/dashboard');
  }

  return (
    <div className='flex flex-col h-screen'>
      <Navbar />
      <div className='flex-grow flex justify-center mt-32'>
        <Card className='w-[30rem] h-fit p-6'>
        <CardTitle className={`${orbitron.className} text-4xl tracking-[0.6rem] text-primary text-center my-4`}><div className={``}>GRAPHI</div></CardTitle>
        <CardDescription className='text-2xl tracking-widest mb-6 text-muted-foreground text-center'>Coomplete Onboarding...</CardDescription>
          <OnboardingForm />
        </Card>
      </div>
    </div>
  )
}