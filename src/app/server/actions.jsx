'use server';

import { usernameSchema } from '@/zod/schemas';
import { auth, signIn, signOut } from '@/auth';
import { prisma } from '@/../../prisma/prisma'


export async function isUsernameAvailable(username) {
  try {
    const response = await prisma.user.findUnique({
      where: {
        username: username,
      }
    })
    return response ? false : true

  } catch (error) {
    console.error('Something Wrong with username or Database', error.message)
    return false
  }
}

export async function generateId() {
  return String(crypto.randomUUID().replace(/-/g, ''));
}

export async function isUserOnBoarded(email) {
  return await fetch(`${process.env.NEXTAUTH_URL}/api/checkOnboardingStatus`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (!(data.onBoarded)) {
        return false
      }
      return true
    })
    .catch((error) => console.error('Error:', error));
}


export async function usernameSetter(username) {
  const session = await auth();

  const result = usernameSchema.safeParse(username);
  if (!result.success) {
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
    console.error('Something wrong with username!!', error.message)
    return false
  }
}

// export async function hasCompletedOnboarding() {
//   const session = await auth();
//   const isUserOnBoarded = await prisma.user.findFirst({
//     where: {
//       email: session.user.email,
//     },
//     select: {
//       username: true,
//     }
//   });
//   if (!(isUserOnBoarded.username)) {
//     redirect('/onboarding');
//   }
//   return 0
// }

export async function handleLogin(method) {
  await signIn(method, { redirectTo: "/" })
}

export async function handleLogout() {
  await signOut({ redirectTo: "/" })
}

export async function handleCreatingProject() {

  const session = await auth();
  const projectId = crypto.randomUUID();

  const usernameObj = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    }
  })

  const response = await prisma.project.create({
    data: {
      projectId: String(projectId),
      updatedBy: usernameObj.username,
      projectMembers: {
        create: {
          memberId: session.user.id,
          userConfigUpdater: session.user.id,
          access: "ADMIN",
        },
      },
    },
    include: {
      projectMembers: true,
    },
  });

  return response;
}

export async function fetchAllProjectsForAParticularUser() {

  const session = await auth();
  const projectMemberResponse = await prisma.projectMember.findMany({
    where: {
      memberId: session.user.id,
    }
  });

  let projects = await Promise.all(
    projectMemberResponse.map(async (data) => {
      const response = await prisma.project.findUnique({
        where: {
          projectId: data.projectId,
        }
      })
      return { data, response }
    }
    ))
  return projects
}

export async function createProjectPlanes(newPlaneData) {
  const planeCreationResponse = await prisma.plane.create({
    data: newPlaneData,
  })

  return planeCreationResponse
}

export async function handleFetchingPlanesFromDatabase(projectId) {
  const planes = await prisma.plane.findMany({
    where: {
      projectId: projectId
    }
  })

  return planes
}

export async function handleAddingFileEntryInDb(dbEntryObject) {

  const session = await auth();

  const response = await prisma.fileDataAccess.create({
    data: {
      fileId: dbEntryObject.fileId,
      fileName: dbEntryObject.fileName,
      fileSize: dbEntryObject.fileSize,
      userId: session.user.id,
      fileKeys: dbEntryObject.fileKeys
    }
  })

  return response;
}


export async function fetchAllFilesUserHasAccessTo() {
  const session = await auth();

  return await prisma.fileDataAccess.findMany({
    where: {
      userId: session.user.id,
    }
  })

}

export async function DBSync(planeElements, graphElements) {

  try {

    for (let planeElement of planeElements) {

      if (planeElement.isdeleted == true) {
        await prisma.planeElement.delete({
          where: {
            planeElementId: planeElement.graphId,
          }
        })
      } else {
        await prisma.planeElement.upsert({
          where: {
            planeElementId: planeElement.graphId,
          },
          update: {
            planeElementId: planeElement.graphId,
            planeId: planeElement.planeId,
            planeElementJsonData: planeElement,
          },
          create: {
            planeElementId: planeElement.graphId,
            planeId: planeElement.planeId,
            planeElementJsonData: planeElement,
          }

        })
      }
    }


    for (let graphElement of graphElements) {


      if (graphElement.isdeleted == true) {
        await prisma.graphElement.delete({
          where: {
            elementId: graphElement.elementId,
          }
        })
      } else {
        await prisma.graphElement.upsert({
          where: {
            elementId: graphElement.elementId,
          },
          update: {
            elementId: graphElement.elementId,
            planeElementId: graphElement.graphId,
            graphElementsJsonData: graphElement,
          },
          create: {
            elementId: graphElement.elementId,
            planeElementId: graphElement.graphId,
            graphElementsJsonData: graphElement,
          }

        })
      }
    }

    return 1

  } catch (error) {

    console.error("Error Syncing Changes: ", error.message);
    return error

  }
}

export async function planeElementsAndGraphElementFetcher(planeIdArray) {

  const planeElements = [];
  const graphElements = [];

  for (let i = 0; i < planeIdArray.length; i++) {

    const temp = await prisma.planeElement.findMany({
      where: {
        planeId: planeIdArray[i],
      }

    })
    planeElements.push(...temp);
  }


  for (let i = 0; i < planeElements.length; i++) {

    const temp = await prisma.graphElement.findMany({
      where: {
        planeElementId: planeElements[i].planeElementId,
      }
    })

    graphElements.push(...temp);

  }

  return { planeElements, graphElements }

}