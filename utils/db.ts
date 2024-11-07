import { PrismaClient } from '@prisma/client';

declare global {
    // เพิ่มการประกาศตัวแปร prismaGlobal ลงใน globalThis
    var prismaGlobal: PrismaClient | undefined;
}

// ฟังก์ชันสำหรับสร้าง Prisma Client
const prismaClientSingleton = () => {
    return new PrismaClient();
};

// ตรวจสอบและสร้าง Prisma Client ตามสภาพแวดล้อมการพัฒนา
const prisma = globalThis.prismaGlobal || prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
    globalThis.prismaGlobal = prisma;
}

export default prisma;
