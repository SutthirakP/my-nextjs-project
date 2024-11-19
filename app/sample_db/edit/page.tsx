import prisma from "@/utils/db";
import { redirect } from "next/navigation";
import { useSearchParams } from "next/navigation";

// CSS สไตล์
const STYLE = `border-2 border-black mx-1 p-1 drop-shadow-md rounded-md`;

export default function EditTitle() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const title = searchParams.get("title");

    if (!id || !title) {
        return <div className="text-red-500">Invalid parameters. Please try again.</div>;
    }

    async function updateTitle(formData: FormData) {
        "use server";
        const title = formData.get("title") as string;
        if (!id) {
            console.error("Error: ID is null or undefined");
            return;
        }
        try {
            await prisma.todo.update({
                data: { title },
                where: { id: id! },
            });
            redirect("/sample_db");
        } catch (error) {
            console.error("Error updating title: ", error);
        }
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Edit Title</h1>
            <div className="mb-4">
                <p><strong>ID:</strong> {id}</p>
                <p><strong>Current Title:</strong> {title}</p>
            </div>
            <form action={updateTitle} className="space-y-4">
                <input
                    className={`${STYLE} w-full`}
                    type="text"
                    name="title"
                    defaultValue={title}
                    required
                />
                <button
                    className={`${STYLE} bg-blue-500 text-white`}
                    type="submit"
                >
                    Update Title
                </button>
            </form>
        </div>
    );
}
