import React, { useState } from 'react';
import { mockRisks, mockIncidents, mockAudits, mockCAPAs } from '../data/quality';
import { RiskRegister } from '../components/quality/RiskRegister';
import { DigitalAuditTool } from '../components/quality/DigitalAuditTool';
import { Card } from '../components/ui/Card';
import {
    ShieldCheck,
    AlertTriangle,
    ClipboardCheck,
    Activity,
    PlusCircle,
    FileText
} from 'lucide-react';
import { Button } from '../components/ui/Button';

export const QualityDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'overview' | 'risks' | 'audit' | 'incidents'>('overview');
    const [risks, setRisks] = useState(mockRisks);
    const [audit, setAudit] = useState(mockAudits[0]); // Demo: Active Audit

    // Metrics
    const criticalRisks = risks.filter(r => r.score > 15).length;
    const openCAPAs = mockCAPAs.filter(c => c.status === 'open' || c.status === 'in_progress').length;
    const incidentCount = mockIncidents.length;

    // Handlers
    const handleAddRisk = (newRisk: any) => {
        setRisks([...risks, { ...newRisk, id: `r_${Date.now()}` }]);
    };

    const handleUpdateFinding = (id: string, isCompliant: boolean, evidence?: string) => {
        setAudit(prev => ({
            ...prev,
            findings: prev.findings.map(f => f.id === id ? { ...f, isCompliant, evidence } : f)
        }));
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans" dir="rtl">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <ShieldCheck className="w-8 h-8 text-teal-600" />
                    بوابة الجودة والسلامة (QSRM)
                </h1>
                <p className="text-gray-500 mt-1">نظام إدارة المخاطر، الامتثال، والسلامة المهنية (ISO 9001 & Safety Framework)</p>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-4 border-b mb-6 overflow-x-auto">
                <button
                    onClick={() => setActiveTab('overview')}
                    className={`pb-3 px-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${activeTab === 'overview' ? 'border-teal-600 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    لوحة القيادة
                </button>
                <button
                    onClick={() => setActiveTab('risks')}
                    className={`pb-3 px-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${activeTab === 'risks' ? 'border-teal-600 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    سجل المخاطر
                    {criticalRisks > 0 && <span className="mr-2 bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">{criticalRisks}</span>}
                </button>
                <button
                    onClick={() => setActiveTab('audit')}
                    className={`pb-3 px-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${activeTab === 'audit' ? 'border-teal-600 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    التدقيق الرقمي (Audit)
                </button>
                <button
                    onClick={() => setActiveTab('incidents')}
                    className={`pb-3 px-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${activeTab === 'incidents' ? 'border-teal-600 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    بلاغات الحوادث
                </button>
            </div>

            {/* Content Area */}
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">

                {/* 1. OVERVIEW TAB */}
                {activeTab === 'overview' && (
                    <div className="space-y-6">
                        {/* KPI Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card className="p-6 border-r-4 border-r-red-500 bg-white shadow-sm">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">المخاطر الحرجة</p>
                                        <h3 className="text-3xl font-bold text-red-600">{criticalRisks}</h3>
                                    </div>
                                    <AlertTriangle className="w-8 h-8 text-red-100" />
                                </div>
                                <div className="mt-4 text-xs text-red-500 font-medium">
                                    تتطلب إجراءات تخفيف فورية
                                </div>
                            </Card>

                            <Card className="p-6 border-r-4 border-r-orange-500 bg-white shadow-sm">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">الإجراءات التصحيحية (CAPA)</p>
                                        <h3 className="text-3xl font-bold text-gray-900">{openCAPAs}</h3>
                                    </div>
                                    <ClipboardCheck className="w-8 h-8 text-orange-100" />
                                </div>
                                <div className="mt-4 text-xs text-orange-600">
                                    مفتوحة وقيد المعالجة
                                </div>
                            </Card>

                            <Card className="p-6 border-r-4 border-r-blue-500 bg-white shadow-sm">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">الحوادث المسجلة (هذا الشهر)</p>
                                        <h3 className="text-3xl font-bold text-gray-900">{incidentCount}</h3>
                                    </div>
                                    <Activity className="w-8 h-8 text-blue-100" />
                                </div>
                                <div className="mt-4 text-xs text-blue-600">
                                    تمت الاستجابة لـ 100% منها
                                </div>
                            </Card>
                        </div>

                        {/* Recent CAPAs */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card className="p-6 bg-white shadow-sm">
                                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <ClipboardCheck className="w-5 h-5 text-gray-500" />
                                    الإجراءات التصحيحية المفتوحة
                                </h3>
                                <div className="space-y-4">
                                    {mockCAPAs.map(capa => (
                                        <div key={capa.id} className="p-3 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors">
                                            <div className="flex justify-between items-start mb-1">
                                                <span className="font-medium text-sm text-gray-900">{capa.description}</span>
                                                <span className="text-xs text-gray-500">{capa.dueDate}</span>
                                            </div>
                                            <div className="flex justify-between items-center mt-2">
                                                <span className="text-xs bg-white border px-2 py-0.5 rounded text-gray-600">المسؤول: {capa.assignedTo}</span>
                                                <span className={`text-[10px] px-2 py-0.5 rounded-full ${capa.status === 'open' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
                                                    {capa.status.toUpperCase()}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            {/* Quick Report */}
                            <Card className="p-6 bg-white shadow-sm flex flex-col justify-center items-center text-center">
                                <div className="bg-teal-50 p-4 rounded-full mb-4">
                                    <ShieldCheck className="w-12 h-12 text-teal-600" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">سلامة الموظفين والمستفيدين أولاً</h3>
                                <p className="text-sm text-gray-500 mb-6 max-w-xs">
                                    الإبلاغ الفوري عن الحوادث أو المخاطر يساعدنا في الحفاظ على بيئة آمنة للجميع.
                                </p>
                                <Button className="w-full max-w-xs bg-teal-600 hover:bg-teal-700" onClick={() => setActiveTab('incidents')}>
                                    <PlusCircle className="w-4 h-4 ml-2" />
                                    إبلاغ عن حادث / خطر
                                </Button>
                            </Card>
                        </div>
                    </div>
                )}

                {/* 2. RISKS TAB */}
                {activeTab === 'risks' && (
                    <RiskRegister risks={risks} onAddRisk={handleAddRisk} />
                )}

                {/* 3. AUDIT TAB */}
                {activeTab === 'audit' && (
                    <DigitalAuditTool
                        audit={audit}
                        onUpdateFinding={handleUpdateFinding}
                        onCompleteAudit={() => alert('Audit Completed! Report Generated.')}
                    />
                )}

                {/* 4. INCIDENTS TAB (Placeholder) */}
                {activeTab === 'incidents' && (
                    <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
                        <FileText className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">سجل الحوادث والإصابات</h3>
                        <p className="text-gray-500 mt-2 mb-6">يمكنك هنا استعراض سجل الحوادث السابق أو إضافة بلاغ جديد.</p>
                        <div className="flex justify-center gap-4">
                            <Button variant="outline">عرض السجل</Button>
                            <Button className="bg-red-600 hover:bg-red-700 text-white">
                                <AlertTriangle className="w-4 h-4 ml-2" />
                                بلاغ جديد
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
