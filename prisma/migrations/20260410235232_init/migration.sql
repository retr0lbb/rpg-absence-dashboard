-- CreateTable
CREATE TABLE "Absence" (
    "id" TEXT NOT NULL,
    "player_name" TEXT NOT NULL,
    "reason" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Absence_pkey" PRIMARY KEY ("id")
);
