import { Response } from 'express';
import { validationResult } from 'express-validator';
import Application from '../models/Application';
import { AuthRequest, CreateApplicationData, UpdateApplicationData } from '../types';

export const getApplications = async (req: AuthRequest, res: Response) => {
  try {
    const { status, search } = req.query;
    const userId = req.user!.id;

    // Build query
    let query: any = { userId };
    
    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { company: { $regex: search, $options: 'i' } },
        { role: { $regex: search, $options: 'i' } }
      ];
    }

    const applications = await Application.find(query)
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: applications
    });
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const createApplication = async (req: AuthRequest, res: Response) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const userId = req.user!.id;
    const applicationData: CreateApplicationData = req.body;

    const application = new Application({
      ...applicationData,
      userId
    });

    await application.save();

    res.status(201).json({
      success: true,
      message: 'Application created successfully',
      data: application
    });
  } catch (error) {
    console.error('Create application error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const updateApplication = async (req: AuthRequest, res: Response) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { id } = req.params;
    const userId = req.user!.id;
    const updateData: UpdateApplicationData = req.body;

    const application = await Application.findOneAndUpdate(
      { _id: id, userId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    res.json({
      success: true,
      message: 'Application updated successfully',
      data: application
    });
  } catch (error) {
    console.error('Update application error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const deleteApplication = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    const application = await Application.findOneAndDelete({ _id: id, userId });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    res.json({
      success: true,
      message: 'Application deleted successfully'
    });
  } catch (error) {
    console.error('Delete application error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};