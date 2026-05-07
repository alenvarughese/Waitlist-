import type { Request, Response } from 'express';
import { Waitlist } from '../entities/waitlist.entity.js';
import { sendWaitlistConfirmation } from '../services/email.service.js';
import { formatResponse } from '../utils/responseHelper.js';

export const createWaitlistEntry = async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;

    const newUser = new Waitlist({ name, email, message });
    await newUser.save();

    try {
      await sendWaitlistConfirmation(name, email, message);
      console.log(`Confirmation email sent to ${email}`);
    } catch (emailError: any) {
      console.error('Failed to send email:', emailError.message);
    }

    res.status(201).json(formatResponse(true, 'Successfully joined the waitlist!', newUser));
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).json(formatResponse(false, 'Email already exists'));
    }
    res.status(500).json(formatResponse(false, error.message));
  }
};

export const getWaitlistEntries = async (_req: Request, res: Response) => {
  try {
    const list = await Waitlist.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: list.length, data: list });
  } catch (error: any) {
    res.status(500).json(formatResponse(false, error.message));
  }
};
