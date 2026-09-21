import { jwtVerify } from "jose"
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export let middleware = async (req: NextRequest) => {
    let token: string = req.cookies.get('token')?.value;

    if(!token) {
        return NextResponse.redirect(new URL("/signin", req.url));
    }

    try {
        let { payLoad } = await jwtVerify(token, new TextEncoder().encode("sec"));
        return NextResponse.next();
    } catch(e) {
        return NextResponse.redirect(new URL("/signin", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard',
        '/logout'
    ]
}