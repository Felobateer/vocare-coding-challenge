-- CreateTable
CREATE TABLE "Activities" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "appointment" TEXT,
    "type" TEXT,
    "content" TEXT,

    CONSTRAINT "Activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppointmentAssignee" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "appointment" TEXT,
    "user" TEXT,
    "user_type" TEXT DEFAULT 'relatives',

    CONSTRAINT "AppointmentAssignee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointments" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "start" TIMESTAMP(3),
    "end" TIMESTAMP(3),
    "location" TEXT,
    "patient" TEXT,
    "attachements" JSONB,
    "category" TEXT,
    "notes" TEXT,
    "title" TEXT,

    CONSTRAINT "Appointments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "label" TEXT,
    "description" TEXT,
    "color" TEXT DEFAULT '#00ff00',
    "icon" TEXT,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patients" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "firstname" TEXT,
    "lastname" TEXT,
    "birth_date" TIMESTAMP(3),
    "care_level" DOUBLE PRECISION,
    "pronoun" TEXT,
    "email" TEXT,
    "active" BOOLEAN,
    "active_since" TIMESTAMP(3),

    CONSTRAINT "Patients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Relatives" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pronoun" TEXT,
    "firstname" TEXT,
    "lastname" TEXT,
    "notes" TEXT,

    CONSTRAINT "Relatives_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Activities" ADD CONSTRAINT "Activities_appointment_fkey" FOREIGN KEY ("appointment") REFERENCES "Appointments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentAssignee" ADD CONSTRAINT "AppointmentAssignee_appointment_fkey" FOREIGN KEY ("appointment") REFERENCES "Appointments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_category_fkey" FOREIGN KEY ("category") REFERENCES "Categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_patient_fkey" FOREIGN KEY ("patient") REFERENCES "Patients"("id") ON DELETE SET NULL ON UPDATE CASCADE;
