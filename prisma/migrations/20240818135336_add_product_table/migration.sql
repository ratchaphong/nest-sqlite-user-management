-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "nameTh" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "minEnginSize" INTEGER NOT NULL,
    "maxEnginSize" INTEGER NOT NULL,
    "imageBase64" TEXT NOT NULL,
    "imageBase64En" TEXT NOT NULL,
    "effectiveStartAt" DATETIME NOT NULL,
    "effectiveEndAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OrderPolicy" (
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
    CONSTRAINT "OrderPolicy_productCode_fkey" FOREIGN KEY ("productCode") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrderPolicy_currentAddressId_fkey" FOREIGN KEY ("currentAddressId") REFERENCES "Address" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrderPolicy_idCardAddressId_fkey" FOREIGN KEY ("idCardAddressId") REFERENCES "Address" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_OrderPolicy" ("carTankNo", "currentAddressId", "endPolicyAt", "engineSize", "id", "idCardAddressId", "licensePlateLetter", "licensePlateNumber", "licensePlateTypeCode", "policyNo", "productCode", "startPolicyAt", "userId", "vehicleBrandCode", "vehicleColorCode", "vehicleModelCode") SELECT "carTankNo", "currentAddressId", "endPolicyAt", "engineSize", "id", "idCardAddressId", "licensePlateLetter", "licensePlateNumber", "licensePlateTypeCode", "policyNo", "productCode", "startPolicyAt", "userId", "vehicleBrandCode", "vehicleColorCode", "vehicleModelCode" FROM "OrderPolicy";
DROP TABLE "OrderPolicy";
ALTER TABLE "new_OrderPolicy" RENAME TO "OrderPolicy";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
