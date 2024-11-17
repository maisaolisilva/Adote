import cloudinary from "@/lib/cloudinary";

//endpoint que assina as imagens para o cloudinary
export async function POST(request: Request) {
  const body = await request.json();
  const { paramsToSign } = body;

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET!
  );

  return new Response(JSON.stringify({ signature }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
