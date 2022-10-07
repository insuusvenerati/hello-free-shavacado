import { withClerkMiddleware } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// export default withClerkMiddleware((req) => {
//   console.log("middleware", req.headers);
//   return NextResponse.next();
// });

function middleware(req: NextRequest) {
  return NextResponse.next();
}

export default withClerkMiddleware(middleware);
