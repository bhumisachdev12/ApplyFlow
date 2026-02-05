import { Response } from 'express';
import Application from '../models/Application';
import { AuthRequest, ApplicationStatus, AnalyticsSummary } from '../types';

export const getAnalyticsSummary = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    // Get all applications for the user
    const applications = await Application.find({ userId });

    // Calculate total applications
    const totalApplications = applications.length;

    // Calculate offers received
    const offersReceived = applications.filter(app => app.status === ApplicationStatus.OFFER).length;

    // Calculate rejection rate
    const rejectedApplications = applications.filter(app => app.status === ApplicationStatus.REJECTED).length;
    const rejectionRate = totalApplications > 0 ? (rejectedApplications / totalApplications) * 100 : 0;

    // Calculate average response time (days from applied to status change)
    const respondedApplications = applications.filter(app => 
      app.status !== ApplicationStatus.APPLIED && app.updatedAt && app.appliedDate
    );
    
    let averageResponseTime = 0;
    if (respondedApplications.length > 0) {
      const totalResponseTime = respondedApplications.reduce((sum, app) => {
        const responseTime = Math.floor((app.updatedAt.getTime() - app.appliedDate.getTime()) / (1000 * 60 * 60 * 24));
        return sum + responseTime;
      }, 0);
      averageResponseTime = Math.round(totalResponseTime / respondedApplications.length);
    }

    // Calculate applications per week (last 8 weeks)
    const eightWeeksAgo = new Date();
    eightWeeksAgo.setDate(eightWeeksAgo.getDate() - 56);

    const recentApplications = applications.filter(app => app.appliedDate >= eightWeeksAgo);
    
    const applicationsPerWeek = [];
    for (let i = 7; i >= 0; i--) {
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - (i * 7 + 6));
      const weekEnd = new Date();
      weekEnd.setDate(weekEnd.getDate() - (i * 7));

      const weekApplications = recentApplications.filter(app => 
        app.appliedDate >= weekStart && app.appliedDate <= weekEnd
      );

      applicationsPerWeek.push({
        week: `Week ${8 - i}`,
        count: weekApplications.length
      });
    }

    // Calculate status distribution
    const statusDistribution = Object.values(ApplicationStatus).map(status => ({
      status,
      count: applications.filter(app => app.status === status).length
    }));

    const summary: AnalyticsSummary = {
      totalApplications,
      offersReceived,
      rejectionRate: Math.round(rejectionRate * 100) / 100,
      averageResponseTime,
      applicationsPerWeek,
      statusDistribution
    };

    res.json({
      success: true,
      data: summary
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};