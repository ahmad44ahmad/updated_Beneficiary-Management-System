import { useMemo } from 'react';
import { beneficiaries } from '../data/beneficiaries';
import { rehabPlans } from '../data/rehabPlans';
import { GoalType } from '../types/rehab';

export const useDashboardMetrics = () => {
    return useMemo(() => {
        // 1. Real-Time KPIs
        const totalBeneficiaries = beneficiaries.length;
        const activeBeneficiaries = beneficiaries.filter(b => b.status === 'active').length; // Assuming 'active' status exists or logic needed

        // Plan Compliance: % of beneficiaries with an Approved (Active) Rehab Plan vs Total Beneficiaries (or vs Draft)
        // Let's calculate it as: (Active Plans / Total Beneficiaries) * 100 to show coverage
        const activePlansCount = rehabPlans.filter(p => p.status === 'active').length;
        const draftPlansCount = rehabPlans.filter(p => p.status === 'draft').length;
        const planComplianceRate = totalBeneficiaries > 0 ? Math.round((activePlansCount / totalBeneficiaries) * 100) : 0;

        // Goal Achievement Rate
        let totalGoals = 0;
        let totalProgress = 0;
        const goalsByType: Record<GoalType, { total: number; completed: number; progressSum: number }> = {
            medical: { total: 0, completed: 0, progressSum: 0 },
            social: { total: 0, completed: 0, progressSum: 0 },
            psychological: { total: 0, completed: 0, progressSum: 0 },
            physiotherapy: { total: 0, completed: 0, progressSum: 0 },
            occupational: { total: 0, completed: 0, progressSum: 0 }
        };

        rehabPlans.forEach(plan => {
            plan.goals.forEach(goal => {
                totalGoals++;
                totalProgress += goal.progress;

                if (goalsByType[goal.type]) {
                    goalsByType[goal.type].total++;
                    goalsByType[goal.type].progressSum += goal.progress;
                    if (goal.status === 'achieved' || goal.progress === 100) {
                        goalsByType[goal.type].completed++;
                    }
                }
            });
        });

        const overallGoalAchievementRate = totalGoals > 0 ? Math.round(totalProgress / totalGoals) : 0;

        // 2. Department Performance (Average Progress by Type)
        const departmentPerformance = Object.entries(goalsByType).map(([type, data]) => ({
            type,
            avgProgress: data.total > 0 ? Math.round(data.progressSum / data.total) : 0,
            totalGoals: data.total
        })).filter(d => d.totalGoals > 0); // Only show departments with goals

        // 3. Operational Alerts
        // Pending Approvals: Plans waiting for Director
        const pendingDirectorApprovals = rehabPlans.filter(p =>
            p.approvals.some(a => a.role === 'director' && a.status === 'pending')
        ).length;

        // Critical Cases: High Risk Level
        // We look at the socialContext.riskLevel in the plans
        const criticalCasesCount = rehabPlans.filter(p => p.socialContext.riskLevel === 'high').length;

        return {
            kpis: {
                totalBeneficiaries,
                activeBeneficiaries,
                planComplianceRate,
                overallGoalAchievementRate,
                activePlansCount,
                draftPlansCount
            },
            departmentPerformance,
            alerts: {
                pendingDirectorApprovals,
                criticalCasesCount
            }
        };
    }, []);
};
