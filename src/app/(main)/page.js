import { sql } from "@vercel/postgres";
import Link from "next/link";

export default async function Home() {
  const test = await sql`
  SELECT * FROM test;
`;
  return (
    <>
    <Link href="/play">Play</Link>
    <h1>Posts</h1>
      <ul>
        {test.rows.map((item) => (
          <li key={item.id}>{item.content}</li>
        ))}
      </ul>
    </>
  );
}
