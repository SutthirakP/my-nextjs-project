import { NextResponse } from 'next/server';
import prisma from '../../../utils/db';

// GET: ดึงข้อมูล Guitar ทั้งหมด
export async function GET() {
  const guitars = await prisma.guitar.findMany();
  return NextResponse.json(guitars);
}

// POST: เพิ่มข้อมูล Guitar ใหม่
export async function POST(request: Request) {
  const { name, brand, price } = await request.json();
  const newGuitar = await prisma.guitar.create({
    data: {
      name,
      brand,
      price: parseFloat(price),
    },
  });
  return NextResponse.json(newGuitar);
}
