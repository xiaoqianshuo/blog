import { UserId } from "@xiaoqianshuo/types";
import { users } from "../constant";

export async function GET(_req: Request, { params }: { params: Promise<{ id: UserId }> }) {
  const { id } = await params;
  const user = users.find((u) => u.id === id);
  if (!user) {
    return Response.json({ message: 'User not found' }, { status: 404 });
  }
  return Response.json(user);
}
