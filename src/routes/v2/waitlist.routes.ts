import { Router } from 'express';
import { createWaitlistEntry, getWaitlistEntries } from '../../controllers/v2/waitlist.controller.js';
import { validateWaitlistInput } from '../../validations/waitlist.validation.js';

const router = Router();

router.post('/', validateWaitlistInput, createWaitlistEntry);
router.get('/', getWaitlistEntries);

export default router;
