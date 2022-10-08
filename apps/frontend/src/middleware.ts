import { withClerkMiddleware } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export default withClerkMiddleware((req: NextRequest) => {
  return NextResponse.next();
});

export const config = { matcher: "/((?!.*\\.).*)" };
