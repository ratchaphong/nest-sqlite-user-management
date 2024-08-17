-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "History" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "action" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    CONSTRAINT "History_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OrderPolicy" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "policyNo" TEXT NOT NULL,
    "productCode" TEXT NOT NULL,
    "engineSize" INTEGER NOT NULL,
    "carTankNo" TEXT NOT NULL,
    "vehicleBrandCode" TEXT NOT NULL,
    "vehicleModelCode" TEXT NOT NULL,
    "vehicleColorCode" TEXT NOT NULL,
    "licensePlateTypeCode" TEXT NOT NULL,
    "licensePlateLetter" TEXT,
    "licensePlateNumber" TEXT,
    "startPolicyAt" DATETIME NOT NULL,
    "endPolicyAt" DATETIME NOT NULL,
    "currentAddressId" TEXT NOT NULL,
    "idCardAddressId" TEXT,
    CONSTRAINT "OrderPolicy_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrderPolicy_currentAddressId_fkey" FOREIGN KEY ("currentAddressId") REFERENCES "Address" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrderPolicy_idCardAddressId_fkey" FOREIGN KEY ("idCardAddressId") REFERENCES "Address" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "houseNo" TEXT NOT NULL,
    "mooNo" TEXT NOT NULL,
    "building" TEXT NOT NULL,
    "soi" TEXT NOT NULL,
    "roomNo" TEXT NOT NULL,
    "floorNo" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "subDistrictCode" TEXT NOT NULL,
    "subDistrictNameTh" TEXT NOT NULL,
    "subDistrictNameEn" TEXT,
    "districtCode" TEXT NOT NULL,
    "districtNameTh" TEXT NOT NULL,
    "districtNameEn" TEXT,
    "provinceCode" TEXT NOT NULL,
    "provinceNameTh" TEXT NOT NULL,
    "provinceNameEn" TEXT,
    "zipCode" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
