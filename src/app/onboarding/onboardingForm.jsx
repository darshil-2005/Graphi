'use client';

import React from 'react';
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { isUsernameAvailable, usernameSetter } from '@/app/server/actions'
import { redirect } from 'next/navigation';
import { CircleCheck, CircleAlert } from 'lucide-react';

function OnboardingForm() {
  
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(data) {
    const response = await usernameSetter(data);
    if (response.username === data.username) {
      redirect('/dashboard');
    }
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      
          {/* <Label htmlFor='username' className='text-md'>Username</Label> */}
          <Input {...register('username', {
            required: 'Please fillout the field!',
            minLength: {
              value: 6,
              message: 'Username must have atleast 6 characters!'
            },
            maxLength: {
              value: 14,
              message: 'Username must have atmost 14 characters!'
            },
            validate: async (username) => {
              const isAvailable = await isUsernameAvailable(username);
              return isAvailable || "Username not available!!"
            },
          })} id='username' className='border-[1px] border-foreground/10 bg-secondary/30 mb-2' placeholder='Username'/>
          {
            errors.username && (
              <div className='text-[#ff0000] text-xs flex items-center gap-x-1'><CircleAlert size={15} color='#ff0000' />{errors.username.message}</div>
            )
          }
          <Button className='w-full mt-2' disabled={isSubmitting}>Set Username</Button>

        </form>

  )
}

export default OnboardingForm