import React from 'react';
import { Beneficiary, InventoryItem } from '../types';

interface DashboardPanelProps {
    beneficiaries: Beneficiary[];
    inventory: InventoryItem[];
}

export const DashboardPanel: React.FC<DashboardPanelProps> = ({ beneficiaries, inventory }) => {
    // 1. KPI Calculations
    const totalBeneficiaries = beneficiaries.length;
    const activeCases = beneficiaries.filter(b => b.status !== 'exit').length; // Assuming 'exit' is the status for left
    const lowStockItems = inventory.filter(item => item.quantity < 10).length;

    // Mocking "External Visits" for now as we don't have a live status tracker for daily movement yet
    // In a real app, this would come from the DailyShiftRecord or a specific movement log
    const externalVisits = 3;

    // 2. Data for Distribution (Simple Grouping)
    const diagnosisDistribution = beneficiaries.reduce((acc, curr) => {
        const diagnosis = curr.medicalDiagnosis || 'غير محدد';
        acc[diagnosis] = (acc[diagnosis] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    // Sort diagnosis by count to show top 5
    const topDiagnoses = Object.entries(diagnosisDistribution)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5);

    // 3. Recent Activities (Mock derived from enrollments)
    const recentEnrollments = [...beneficiaries]
        .sort((a, b) => new Date(b.enrollmentDate).getTime() - new Date(a.enrollmentDate).getTime())
        .slice(0, 5);

    return (
        <div className="dashboard-panel fade-in">
            <div className="panel-header">
                <h2>لوحة القياس والتحكم</h2>
                <span className="date-display">{new Date().toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>

            {/* KPI Cards */}
            <div className="kpi-grid">
                <div className="kpi-card blue">
                    <div className="kpi-icon">👥</div>
                    <div className="kpi-content">
                        <h3>إجمالي المستفيدين</h3>
                        <p className="kpi-value">{totalBeneficiaries}</p>
                        <span className="kpi-label">ملف نشط</span>
                    </div>
                </div>
                <div className="kpi-card green">
                    <div className="kpi-icon">🏠</div>
                    <div className="kpi-content">
                        <h3>المتواجدون حالياً</h3>
                        <p className="kpi-value">{activeCases - externalVisits}</p>
                        <span className="kpi-label">داخل المركز</span>
                    </div>
                </div>
                <div className="kpi-card orange">
                    <div className="kpi-icon">🚗</div>
                    <div className="kpi-content">
                        <h3>زيارات خارجية</h3>
                        <p className="kpi-value">{externalVisits}</p>
                        <span className="kpi-label">إجازات / مستشفيات</span>
                    </div>
                </div>
                <div className="kpi-card red">
                    <div className="kpi-icon">⚠️</div>
                    <div className="kpi-content">
                        <h3>تنبيهات المخزون</h3>
                        <p className="kpi-value">{lowStockItems}</p>
                        <span className="kpi-label">أصناف قاربت على النفاذ</span>
                    </div>
                </div>
            </div>

            <div className="dashboard-content-grid">
                {/* Charts / Stats Section */}
                <div className="dashboard-section chart-section">
                    <h3>توزيع الحالات حسب التشخيص الطبي</h3>
                    <div className="simple-bar-chart">
                        {topDiagnoses.map(([label, value]) => (
                            <div key={label} className="chart-row">
                                <div className="chart-label">{label}</div>
                                <div className="chart-bar-container">
                                    <div
                                        className="chart-bar"
                                        style={{ width: `${(value / totalBeneficiaries) * 100}%` }}
                                    ></div>
                                </div>
                                <div className="chart-value">{value}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity Section */}
                <div className="dashboard-section activity-section">
                    <h3>آخر المستفيدين المسجلين</h3>
                    <ul className="activity-list">
                        {recentEnrollments.map(b => (
                            <li key={b.id} className="activity-item">
                                <div className="activity-icon">🆕</div>
                                <div className="activity-details">
                                    <span className="activity-title">تسجيل مستفيد جديد: {b.fullName}</span>
                                    <span className="activity-time">{b.enrollmentDate}</span>
                                </div>
                            </li>
                        ))}
                        {recentEnrollments.length === 0 && <li className="empty-state">لا توجد بيانات حديثة</li>}
                    </ul>
                </div>
            </div>
        </div>
    );
};
