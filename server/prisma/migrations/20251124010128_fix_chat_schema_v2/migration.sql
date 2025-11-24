/*
  Warnings:

  - You are about to drop the column `autorId` on the `Mensagem` table. All the data in the column will be lost.
  - You are about to drop the column `reservaId` on the `Mensagem` table. All the data in the column will be lost.
  - Added the required column `destinatarioId` to the `Mensagem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `moradiaId` to the `Mensagem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `remetenteId` to the `Mensagem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Mensagem" DROP CONSTRAINT "Mensagem_autorId_fkey";

-- DropForeignKey
ALTER TABLE "Mensagem" DROP CONSTRAINT "Mensagem_reservaId_fkey";

-- AlterTable
ALTER TABLE "Mensagem" DROP COLUMN "autorId",
DROP COLUMN "reservaId",
ADD COLUMN     "destinatarioId" INTEGER NOT NULL,
ADD COLUMN     "moradiaId" INTEGER NOT NULL,
ADD COLUMN     "remetenteId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Mensagem" ADD CONSTRAINT "Mensagem_remetenteId_fkey" FOREIGN KEY ("remetenteId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mensagem" ADD CONSTRAINT "Mensagem_destinatarioId_fkey" FOREIGN KEY ("destinatarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mensagem" ADD CONSTRAINT "Mensagem_moradiaId_fkey" FOREIGN KEY ("moradiaId") REFERENCES "Moradia"("id") ON DELETE CASCADE ON UPDATE CASCADE;
