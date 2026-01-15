import { requestApi } from "../service/request";

export default async function Home() {
  const users = await requestApi.user.listUsers();
  return (
    <div>
      <h1>Hello World</h1>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}
