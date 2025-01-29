'use server';

import { redirect } from 'next/navigation'
import { usernameSchema } from '@/zod/schemas';
import { auth, signIn, signOut } from '@/auth';

export async function isUsernameAvailable(username) {
  try {
    const response = await prisma.user.findUnique({
      where: {
        username: username,
      }
    })
    return response ? false : true

  } catch (error) {
    console.error('Something Wrong with username or Database')
    return false
  }
}

export async function usernameSetter(username) {
  const session = await auth();

  const result = usernameSchema.safeParse(username);
  if (!result.success) {
    console.log(result.error.issues)
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  try {
    const response = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        username: username.username,
      }
    })

    return response;

  } catch (error) {
    console.error('Something wrong with username!!')
    return false
  }
}

export async function hasCompletedOnboarding() {
  const session = await auth();
  const isUserOnBoarded = await prisma.user.findFirst({
    where: {
      email: session.user.email,
    },
    select: {
      username: true,
    }
  });
  if (!(isUserOnBoarded.username)) {
    redirect('/onboarding');
  }
  return 0
}

export async function handleLogin(method) {
    await signIn( method, {redirectTo: "/" })
  }

export async function handleLogout() {
    await signOut({redirectTo: "/" })
  }


  
