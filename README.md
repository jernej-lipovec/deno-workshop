# deno-workshop

Goal of workshop:
We will create a simple REST API, that will be able to accept parameters, call external API and log request inside the database.

1. Inside your function call https://swapi.dev/api/people?search=Luke and return name and gender for each character received (proxy request).
2. Add “/sw” GET route with using Oak library https://github.com/oakserver/oak and return same thing as before.
3. On that route accept query parameter “name” and use it dynamically use it in your request https://swapi.dev/api/people?search={name}. Try calling http://localhost:8000/sw?name=Leia
4. BONUS: Add https://deno.land/x/sqlite/ to project and load “database.sqlite” file
5. BONUS: Whenever search is triggered, save the data inside sqlite database.
6. BONUS: Add another GET route “/searches” where you return all queries that were searched so far.



------ 

Database structure:
table "searches":
id INTEGER PRIMARY KEY
date INTEGER NOT NULL
query TEXT NOT NULL

sample query:
db.query("SELECT query FROM searches")
db.query("INSERT INTO searches (query, date) VALUES (?, date('now'))", ["Luke"])
