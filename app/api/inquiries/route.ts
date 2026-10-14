import { handleInquiry } from "@/lib/inquiries.mjs";
import { business } from "@/lib/business";
export const runtime = "nodejs";
export async function POST(request: Request) {
  return handleInquiry(request, { ...process.env, INQUIRY_TO: business.email });
}
