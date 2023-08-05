-- AlterTable
ALTER TABLE "Ingredient" ADD COLUMN     "description" TEXT,
ALTER COLUMN "calories" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "RecipeIngredient" ALTER COLUMN "quantity" SET DATA TYPE DOUBLE PRECISION;
