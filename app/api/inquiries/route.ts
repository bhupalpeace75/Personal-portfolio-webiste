import { handleInquiry } from "@/lib/inquiries.mjs";
export const runtime = "nodejs";
export async function POST(request: Request) {
  return handleInquiry(request, process.env);
}
