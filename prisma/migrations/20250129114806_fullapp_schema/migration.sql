-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL,
    "username" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,
    "isDeleted" BOOLEAN NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,
    "isDeleted" BOOLEAN NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("projectId")
);

-- CreateTable
CREATE TABLE "ProjectMember" (
    "id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "access" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "ProjectMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlaneElement" (
    "planeId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,
    "isDeleted" BOOLEAN NOT NULL,

    CONSTRAINT "PlaneElement_pkey" PRIMARY KEY ("planeId")
);

-- CreateTable
CREATE TABLE "GraphElement" (
    "elementId" TEXT NOT NULL,
    "planeId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,
    "isDeleted" BOOLEAN NOT NULL,

    CONSTRAINT "GraphElement_pkey" PRIMARY KEY ("elementId")
);

-- CreateTable
CREATE TABLE "PlaneElementData" (
    "dataId" TEXT NOT NULL,
    "planeId" TEXT NOT NULL,
    "planeElementsJsonData" JSONB NOT NULL,

    CONSTRAINT "PlaneElementData_pkey" PRIMARY KEY ("dataId")
);

-- CreateTable
CREATE TABLE "GraphElementData" (
    "dataId" TEXT NOT NULL,
    "elementId" TEXT NOT NULL,
    "graphElementsJsonData" JSONB NOT NULL,

    CONSTRAINT "GraphElementData_pkey" PRIMARY KEY ("dataId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "PlaneElementData_planeId_key" ON "PlaneElementData"("planeId");

-- CreateIndex
CREATE UNIQUE INDEX "GraphElementData_elementId_key" ON "GraphElementData"("elementId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectMember" ADD CONSTRAINT "ProjectMember_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("projectId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectMember" ADD CONSTRAINT "ProjectMember_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaneElement" ADD CONSTRAINT "PlaneElement_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("projectId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GraphElement" ADD CONSTRAINT "GraphElement_planeId_fkey" FOREIGN KEY ("planeId") REFERENCES "PlaneElement"("planeId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaneElementData" ADD CONSTRAINT "PlaneElementData_planeId_fkey" FOREIGN KEY ("planeId") REFERENCES "PlaneElement"("planeId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GraphElementData" ADD CONSTRAINT "GraphElementData_elementId_fkey" FOREIGN KEY ("elementId") REFERENCES "GraphElement"("elementId") ON DELETE CASCADE ON UPDATE CASCADE;
