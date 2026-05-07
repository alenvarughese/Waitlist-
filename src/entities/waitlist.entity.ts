import { Schema, model, type Document } from 'mongoose';

export interface IWaitlist extends Document {
  name: string;
  email: string;
  message?: string;
  createdAt: Date;
}

const waitlistSchema = new Schema<IWaitlist>(
  {
    name: { 
      type: String, 
      required: [true, 'Name is required'],
      trim: true 
    },
    email: { 
      type: String, 
      required: [true, 'Email is required'], 
      unique: true, 
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'] 
    },
    message: { 
      type: String, 
      maxlength: [500, 'Message cannot exceed 500 characters'] 
    }
  },
  { timestamps: true }
);

export const Waitlist = model<IWaitlist>('Waitlist', waitlistSchema);
