import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { open, save } from "https://deno.land/x/sqlite/mod.ts";

const db = await open("database.sqlite");

db.query(`CREATE TABLE IF NOT EXISTS searches  (
    id INTEGER PRIMARY KEY,
    date INTEGER NOT NULL,
	query TEXT NOT NULL
);`);

const app = new Application();
const router = new Router();

router
  .get("/searches", async (context) => {
    let res = await db.query("SELECT * FROM searches");
    context.response.body = JSON.stringify(res.map((search) => search[1]));
  })
  .get("/sw", async (context) => {
    const query = context.request.url.searchParams.get("search");
    await fetch(`https://swapi.dev/api/people?search=${query}`)
      .then((res) => res.json())
      .then(async (res) => {
        await db.query(
          "INSERT INTO searches (query, date) VALUES (?, date('now'))",
          [query]
        );
        await save(db);

        context.response.body = JSON.stringify(
          res.results.map((a: any) => ({ name: a.name, gender: a.gender }))
        );
      })
      .catch((a) => console.log(a));
  });

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
