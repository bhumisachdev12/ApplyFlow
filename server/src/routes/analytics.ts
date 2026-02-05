import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import { getAnalyticsSummary } from '../controllers/analyticsController';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

// Routes
router.get('/summary', getAnalyticsSummary);

export default router;