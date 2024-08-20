import { App } from './App';
import router from './router';

const app = new App().getExpress();

app.get('/health-check', async (req, res) => {
  return res.status(200).send({ message: 'OK' });
});

app.use('/api', router);
