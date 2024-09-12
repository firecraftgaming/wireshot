export function GET(request: Request) {
    return Response.redirect(new URL('/desktop', request.url), 301);
}
