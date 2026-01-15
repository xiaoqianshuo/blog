import { users } from "./constant";

export async function GET() {
  return Response.json(users);
}