import prisma from "@/utils/db";
import { redirect } from "next/navigation";

// CSS สไตล์
const STYLE = `border-2 border-black mx-1 p-1 drop-shadow-md rounded-md`;

export default function EditGuitar({ searchParams }: { searchParams: { id: string; name: string; brand: string; price: string } }) {
  const { id, name, brand, price } = searchParams;

  async function updateGuitar(formData: FormData) {
    "use server";

    const updatedName = formData.get("name") as string;
    const updatedBrand = formData.get("brand") as string;
    const updatedPrice = parseFloat(formData.get("price") as string);

    // อัปเดตข้อมูล Guitar ในฐานข้อมูล
    await prisma.guitar.update({
      where: { id },
      data: { name: updatedName, brand: updatedBrand, price: updatedPrice },
    });

    redirect("/sample_db/guitars");
  }

  return (
    <div>
      <h1>Edit Guitar</h1>
      <p>ID: {id}</p>

      {/* ฟอร์มสำหรับแก้ไข Guitar */}
      <form action={updateGuitar}>
        <div>
          <label>
            Name:
            <input
              className={STYLE}
              type="text"
              name="name"
              defaultValue={name}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Brand:
            <input
              className={STYLE}
              type="text"
              name="brand"
              defaultValue={brand}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Price:
            <input
              className={STYLE}
              type="number"
              name="price"
              defaultValue={price}
              step="0.01"
              required
            />
          </label>
        </div>

        <button type="submit" className={STYLE}>
          Update Guitar
        </button>
      </form>
    </div>
  );
}
