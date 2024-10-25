export async function GET() {
  const response = await fetch('https://api.vercel.app/blog'); // ดึงข้อมูลจาก Vercel API
  const data = await response.json();
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}
