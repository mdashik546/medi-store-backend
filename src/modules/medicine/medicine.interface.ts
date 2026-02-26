/*
model Medicine {
  id         String    @id @default(uuid())
  name       String    @db.VarChar(100)
  slug       String?   @db.VarChar(100)
  price      Int       @default(0)
  stock      Int       @default(0)
  sellerId   String
  categoryId  String
  categoryDetails Category     @relation(fields: [categoryId], references: [id], onDelete: Cascade)
  reviews    Review[]
  carts          Cart[]
  items          OrderItem[]

  imageURL    String?
  description String?        @db.Text
  status      MedicineStatus @default(ACTIVE)
  expiryDate  DateTime
  createdAt   DateTime       @default(now())
  updatedAt   DateTime       @updatedAt

  @@index([sellerId])
  @@index([categoryId])
  @@map("medicines")
}
*/
export interface ICategoryAndMedicinePayload {
  categoryName: string;  
  name: string;
  price: number;
  stock: number;
  expiryDate: string;
  imageURL?: string;
  description?: string;
}
