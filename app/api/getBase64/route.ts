import { NextResponse, NextRequest } from "next/server";
import { getPlaiceholder } from "plaiceholder";

export async function GET(request: NextRequest) {
    const url = request.nextUrl.searchParams.get('url')

    const src = `${process.env.PUBLIC_URL}/${url}`

    try {
        const buffer = await fetch(src).then(async (res) =>
            Buffer.from(await res.arrayBuffer())
        );
        
        const { base64 } = await getPlaiceholder(buffer);
        
        return NextResponse.json(base64)
    } catch (err: any) {
        return NextResponse.json({'message': `Failed to get base64 for src: ${src}`})
    }
}