import { userApi } from "@xiaoqianshuo/api-v1/user.api";

export default async function Home() {
  const users = await userApi.listUsers();
  return (
    <div>
      <h1>Hello World</h1>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}
