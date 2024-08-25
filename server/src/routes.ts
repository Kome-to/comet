import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import express from 'express';
import morgan from 'morgan';

import authRoutes from './routes/Auth';
import userRoutes from './routes/User';
import workspaceRoutes from './routes/Workspace';

dayjs.extend(utc);

const router = express.Router();

router.get('/health-check', (_req, res) => {
  res.send('Comet server OK !!');
});

if (process.env.NODE_ENV === 'development') {
  router.use(morgan('dev'));
}

router.use(
  express.json({
    limit: '1mb',
  }),
);
router.use(express.urlencoded({ extended: true, limit: '1mb' }));

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/workspace', workspaceRoutes);

export default router;
