import React, { useMemo } from 'react';
import { Card } from '../ui/Card';
import {
    PieChart,
    BarChart,
    Activity,
    TrendingUp,
    Users,
    CheckCircle,
    AlertCircle,
    FileText,
    Award
} from 'lucide-react';

// --- Mock Data Generator (Simulating the "Brain's" Memory) ---
const generateMockData = () => {
    const departments = ['Medical', 'Social', 'Physiotherapy', 'Psychological'];
    const plans = Array.from({ length: 50 }).map((_, i) => {
        const progress = Math.floor(Math.random() * 100);
        return {
            id: i,
            beneficiaryName: `Beneficiary ${i + 1}`,
            department: departments[Math.floor(Math.random() * departments.length)],
            progress: progress,
            status: progress === 100 ? 'Completed' : progress > 0 ? 'In Progress' : 'Pending',
            riskLevel: Math.random() > 0.8 ? 'High' : 'Low'
        };
    });
    return plans;
};

export const StrategicDashboard: React.FC = () => {
    const data = useMemo(() => generateMockData(), []);

    // --- KPI Calculations ---
    const totalBeneficiaries = data.length;
    const averageProgress = Math.round(data.reduce((acc, curr) => acc + curr.progress, 0) / totalBeneficiaries);
    const completedGoals = data.filter(d => d.progress === 100).length;
    const highRiskCases = data.filter(d => d.riskLevel === 'High').length;

    // Department Performance
    const deptPerformance = ['Medical', 'Social', 'Physiotherapy', 'Psychological'].map(dept => {
        const deptPlans = data.filter(d => d.department === dept);
        const avg = Math.round(deptPlans.reduce((acc, curr) => acc + curr.progress, 0) / deptPlans.length) || 0;
        return { name: dept, value: avg, count: deptPlans.length };
    });

    return (
        <div className="p-8 space-y-8 animate-in fade-in bg-slate-50 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                        <Activity className="w-8 h-8 text-blue-600" />
                        لوحة القياس الاستراتيجية (Strategic Dashboard)
                    </h1>
                    <p className="text-slate-500 mt-2">
                        تقرير الاستدامة والتميز المؤسسي (ISO 9001) - قياس الأثر التأهيلي
                    </p>
                </div>
                <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200 text-sm text-slate-600">
                    آخر تحديث: {new Date().toLocaleDateString()}
                </div>
            </div>

            {/* Executive Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="p-6 border-t-4 border-t-blue-500 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-slate-500">متوسط الإنجاز العام</p>
                            <h3 className="text-3xl font-bold text-slate-900 mt-2">{averageProgress}%</h3>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-full">
                            <TrendingUp className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                    <div className="mt-4 w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${averageProgress}%` }}></div>
                    </div>
                </Card>

                <Card className="p-6 border-t-4 border-t-green-500 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-slate-500">الأهداف المحققة (100%)</p>
                            <h3 className="text-3xl font-bold text-slate-900 mt-2">{completedGoals}</h3>
                        </div>
                        <div className="p-3 bg-green-50 rounded-full">
                            <Award className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                    <p className="text-xs text-green-600 mt-4 flex items-center">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {Math.round((completedGoals / totalBeneficiaries) * 100)}% من إجمالي الخطط
                    </p>
                </Card>

                <Card className="p-6 border-t-4 border-t-purple-500 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-slate-500">إجمالي المستفيدين</p>
                            <h3 className="text-3xl font-bold text-slate-900 mt-2">{totalBeneficiaries}</h3>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-full">
                            <Users className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                    <p className="text-xs text-slate-400 mt-4">خطة تأهيلية نشطة</p>
                </Card>

                <Card className="p-6 border-t-4 border-t-red-500 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-slate-500">حالات عالية الخطورة</p>
                            <h3 className="text-3xl font-bold text-slate-900 mt-2">{highRiskCases}</h3>
                        </div>
                        <div className="p-3 bg-red-50 rounded-full">
                            <AlertCircle className="w-6 h-6 text-red-600" />
                        </div>
                    </div>
                    <p className="text-xs text-red-600 mt-4">تتطلب تدخلاً عاجلاً</p>
                </Card>
            </div>

            {/* Strategic Analysis Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Department Performance Chart */}
                <Card className="p-6 shadow-md">
                    <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <BarChart className="w-5 h-5 text-slate-500" />
                        مؤشر الأداء حسب القسم (Department KPIs)
                    </h3>
                    <div className="space-y-6">
                        {deptPerformance.map((dept) => (
                            <div key={dept.name}>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="font-medium text-slate-700">{dept.name}</span>
                                    <span className="font-bold text-slate-900">{dept.value}%</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-1000 ${dept.value > 80 ? 'bg-green-500' :
                                                dept.value > 50 ? 'bg-blue-500' : 'bg-yellow-500'
                                            }`}
                                        style={{ width: `${dept.value}%` }}
                                    ></div>
                                </div>
                                <p className="text-xs text-slate-400 mt-1">{dept.count} خطط نشطة</p>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Sustainability & Impact Report */}
                <Card className="p-6 shadow-md bg-gradient-to-br from-slate-900 to-slate-800 text-white">
                    <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-400" />
                        تقرير الاستدامة (Sustainability Insight)
                    </h3>
                    <div className="space-y-6">
                        <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                            <h4 className="text-blue-300 text-sm font-medium mb-2">قصة نجاح (Success Story)</h4>
                            <p className="text-sm leading-relaxed opacity-90">
                                "تم تحقيق ارتفاع بنسبة <span className="font-bold text-green-400">15%</span> في معدل الاستقلالية الحركية للمستفيدين ذوي الشلل الدماغي (CP) مقارنة بالربع السابق، وذلك بفضل دمج جلسات العلاج الطبيعي المكثفة مع الدعم الاجتماعي."
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                <div className="text-2xl font-bold text-yellow-400 mb-1">85%</div>
                                <div className="text-xs text-slate-300">رضا المستفيدين</div>
                            </div>
                            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                <div className="text-2xl font-bold text-purple-400 mb-1">12</div>
                                <div className="text-xs text-slate-300">مبادرة مجتمعية</div>
                            </div>
                        </div>

                        <button className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium text-sm transition-colors mt-4">
                            تصدير التقرير السنوي (PDF)
                        </button>
                    </div>
                </Card>
            </div>
        </div>
    );
};
