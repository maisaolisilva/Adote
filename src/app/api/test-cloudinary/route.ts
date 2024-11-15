import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const url = `${process.env.NEXTAUTH_URL}/api/sign-cloudinary-params`;
        const paramsToSign = {
            timestamp: Math.floor(Date.now() / 1000),
            upload_preset: 'ml_default',
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paramsToSign }),
        });

        const data = await response.json();
        return NextResponse.json({ signature: data.signature });
    } catch (error) {
        console.error('Erro na rota de teste do Cloudinary:', error);
        return NextResponse.json({ error: 'Falha na integração com Cloudinary.' }, { status: 500 });
    }
}
