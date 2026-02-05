import { Router } from 'express';
import { body } from 'express-validator';
import { authenticateToken } from '../middleware/auth';
import { 
  getApplications, 
  createApplication, 
  updateApplication, 
  deleteApplication 
} from '../controllers/applicationController';
import { ApplicationStatus } from '../types';

const router = Router();

// Validation rules
const createApplicationValidation = [
  body('company')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Company name is required and must be less than 100 characters'),
  body('role')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Role is required and must be less than 100 characters'),
  body('location')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Location is required and must be less than 100 characters'),
  body('applicationLink')
    .optional()
    .isURL()
    .withMessage('Application link must be a valid URL'),
  body('appliedDate')
    .isISO8601()
    .withMessage('Applied date must be a valid date'),
  body('status')
    .isIn(Object.values(ApplicationStatus))
    .withMessage('Status must be a valid application status'),
  body('notes')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Notes cannot exceed 1000 characters')
];

const updateApplicationValidation = [
  body('company')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Company name must be less than 100 characters'),
  body('role')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Role must be less than 100 characters'),
  body('location')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Location must be less than 100 characters'),
  body('applicationLink')
    .optional()
    .isURL()
    .withMessage('Application link must be a valid URL'),
  body('appliedDate')
    .optional()
    .isISO8601()
    .withMessage('Applied date must be a valid date'),
  body('status')
    .optional()
    .isIn(Object.values(ApplicationStatus))
    .withMessage('Status must be a valid application status'),
  body('notes')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Notes cannot exceed 1000 characters')
];

// All routes require authentication
router.use(authenticateToken);

// Routes
router.get('/', getApplications);
router.post('/', createApplicationValidation, createApplication);
router.put('/:id', updateApplicationValidation, updateApplication);
router.delete('/:id', deleteApplication);

export default router;