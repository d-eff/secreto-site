import express from 'express'; 
import db from './db';
import routes from './routes'
const app = express();
const port = 3000;

db.authenticate().then(() => {
  console.log('Connection has been established successfully.');
  
  db.sync()

  app.use(express.json());
  app.use('/api', routes);

  app.get('/', (req, res) => {
    //todo: serve app from here
    res.send('Hello World!');
  });

  app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
  });

});


