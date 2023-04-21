import express from 'express'; 
import { Sequelize } from 'sequelize';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  require('dotenv').config()
  dbConnect();
  return console.log(`Express is listening at http://localhost:${port}`);
});

async function dbConnect() {
  const sequelize = new Sequelize(process.env.DATABASE_URL);
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}