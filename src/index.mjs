import express, { response } from "express";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

const mockUsers = [
  { id: 1, username: "serdar", displayName: "SERDAR" },
  { id: 2, username: "nisa", displayName: "NİSA" },
  { id: 3, username: "omer", displayName: "ÖMER" },
  { id: 4, username: "sennur", displayName: "SENNUR" },
  { id: 5, username: "sevgi", displayName: "SEVGI" },
  { id: 6, username: "oguz", displayName: "OGUZ" },
  { id: 7, username: "hamza", displayName: "HAMZA" },
];

app.get("/", (request, response) => {
  response.status(201).send({ msg: "Hello" });
});

app.get("/api/users", (request, response) => {
  console.log(request.query);
  const {
    query: { filter, value },
  } = request;
  if (!filter && !value) response.send(mockUsers);
  if (filter && value)
    response.send(mockUsers.filter((user) => user[filter].includes(value)));
  return response.send(mockUsers);
});

app.post("/api/users", (request, response) => {
  console.log(request.body);
  const { body } = request;
  const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body };
  mockUsers.push(newUser);
  return response.send(newUser);
});

app.get("/api/users/:id", (request, response) => {
  console.log(request.params);
  const parsedId = parseInt(request.params.id);
  if (isNaN(parsedId))
    return response.status(400).send({ msg: "Bad request. Invalid ID." });
  const findUser = mockUsers.find((user) => user.id === parsedId);
  if (!findUser) return response.sendStatus(404);
  return response.status(201).send(findUser);
});

app.get("/api/products", (request, response) => {
  response.send([{ id: 123, name: "elmalı pasta", price: 12.5 }]);
});

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});

app.put("/api/users/:id", (request, response) => {
  const {
    body,
    params: { id },
  } = request;
  const parsedId = parseInt(id);

  if (isNaN(parsedId)) return response.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return response.sendStatus(404);
  mockUsers[findUserIndex] = { id: parsedId, ...body };
  return response.sendStatus(200);
});

app.patch('/api/users/:id', (request, response) => {
  const {
    body,
    params: { id },
  } = request;
  const parsedId = parseInt(id);

  if (isNaN(parsedId)) return response.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return response.sendStatus(404);
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
  return response.sendStatus(200);
})

app.delete("/api/users/:id", (request, response) => {
  const { params: { id}, } = request
   const parsedId = parseInt(id);

   if (isNaN(parsedId)) return response.sendStatus(400)
   const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId)
  if (findUserIndex === -1) return response.sendStatus(404);
  mockUsers.splice(findUserIndex, 1)
  return response.sendStatus(200)
})


//localhost:3000
//localhost:3000/users
//localhost:3000/products
