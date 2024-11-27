-- CreateTable
CREATE TABLE "tasks" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "activity" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,
    "urgent" BOOLEAN NOT NULL DEFAULT false,
    "important" BOOLEAN NOT NULL DEFAULT false,
    "timeUnder5Min" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "tasks" ADD CONSTRAINT "priority_check" CHECK ("priority" >= 1 AND "priority" <= 10);