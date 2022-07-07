const express = require('express');
const mysql = require('mysql2/promise');
const randomName = require('random-name');

const getConnection = () => {
  const connectionConfig = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'app_db',
  };

  return mysql.createConnection(connectionConfig);
};

const savePerson = async (person) => {
  const connection = await getConnection();
  const sql = 'INSERT INTO people (name) VALUES(?)';
  const values = [person];

  await connection.execute(sql, values);
  await connection.end();

  console.log(`Pessoa adicionada com sucesso com o nome: ${person}`);
};

const listPeople = async () => {
  const connection = await getConnection();
  const sql = 'SELECT * FROM people';
  const [rows] = await connection.query(sql);

  await connection.end();

  return rows || [];
};

const fakeName = () => `${randomName.first()} ${randomName.last()}`;

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  await savePerson(fakeName());

  const people = await listPeople();
  const result = `
    <h1>Full Cycle Rocks!</h1>
    <ul>
      ${people.map(({ name }) => `<li>${name}</li>`).join('')}
    </ul>
  `;

  res.send(result);
});

app.listen(port, async () => {
  console.log(`Aplicação executando na porta ${port}.`);
});
