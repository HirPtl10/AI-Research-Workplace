-- DropForeignKey
ALTER TABLE "Department" DROP CONSTRAINT "Department_projectId_fkey";

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
