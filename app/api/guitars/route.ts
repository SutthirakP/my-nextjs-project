import { NextResponse } from 'next/server'
import prisma from '@/utils/db'
import { z } from 'zod'

// สร้าง Schema
const GuitarSchema = z.object({
  name: z.string().min(1),
  brand: z.string().min(1),
  price: z.number().positive(),
})

// GET: ดึงข้อมูล Guitar ทั้งหมด
export async function GET() {
  const guitars = await prisma.guitar.findMany()
  return NextResponse.json(guitars)
}

// POST: เพิ่มข้อมูล Guitar ใหม่
export async function POST(request: Request) {
  const body = await request.json()

  // ตรวจสอบข้อมูลด้วย Zod
  const parsed = GuitarSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors }, { status: 400 })
  }

  const newGuitar = await prisma.guitar.create({
    data: parsed.data,
  })

  return NextResponse.json(newGuitar)
}
