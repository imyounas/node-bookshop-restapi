# My Book Shop - Node Rest API

- This Node App uses TypeScript, Express and Mongo DB and runs on Port 4000
- Please make sure to change the MongoDB connection settings from here e

<b>app &gt; .env </b>

- App built using Separation of Concerns principals
- I have added the <b> /api </b> from suggested API endpoints to make it more conventional
-                 Here are some features of this app

* Docker Compose to run MongoDB Server

* TypeScript for types protection

* Proper Classes, Interfaces and DTOs

* Error and DTO Validation Middlewares

* Protection against HTTP Parameter Pollution attacks

* Securing app by adding additional HTTP headers

* <b>Author API Endpoints</b>

  - <b>GET /api/authors</b> =&gt; To get all the authors in DB

  - <b>GET /api/author/lookup</b> =&gt; To get all the authors Lookup, to be shown in Book's Add/Edit Form

  - <b>GET /api/author/:id</b> =&gt; To get a author by Id from DB

  - <b>POST /api/author</b> =&gt; To create a author in DB

  - <b>PUT /api/author</b> =&gt; To update a author in DB

* <b>Book API Endpoints</b>

  - <b>GET /api/books</b> =&gt; To get all the books in DB

  - <b>GET /api/book/:id</b> =&gt; To get a book by Id from DB

  - <b>POST /api/book</b> =&gt; To create a book in DB

  - <b>PUT /api/book</b> =&gt; To update a book in DB
