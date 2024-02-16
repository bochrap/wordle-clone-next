import { sql } from "@vercel/postgres";

export default async function Home() {
  const test = await sql`
  SELECT * FROM test;
`;
  return (
    <>
    <h1>Posts</h1>
      <ul>
        {test.rows.map((item) => (
          <li key={item.id}>{item.content}</li>
        ))}
      </ul>
    </>
  );
}
