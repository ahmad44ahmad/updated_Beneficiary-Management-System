import React, { useState } from 'react';
import { Risk } from '../../types/quality';
import { AlertTriangle, CheckCircle, AlertOctagon, Plus } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface RiskRegisterProps {
    risks: Risk[];
    onAddRisk: (risk: Partial<Risk>) => void;
}

export const RiskRegister: React.FC<RiskRegisterProps> = ({ risks, onAddRisk }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [newRisk, setNewRisk] = useState<Partial<Risk>>({
        description: '',
        category: 'Operational',
        likelihood: 1,
        impact: 1,
        mitigationPlan: ''
    });

    const calculateScore = (l: number, i: number) => l * i;

    const handleSave = () => {
        if (newRisk.description) {
            onAddRisk({
                ...newRisk,
                score: calculateScore(newRisk.likelihood || 1, newRisk.impact || 1),
                level: (newRisk.likelihood! * newRisk.impact!) > 15 ? 'critical' :
                    (newRisk.likelihood! * newRisk.impact!) > 9 ? 'high' :
                        (newRisk.likelihood! * newRisk.impact!) > 4 ? 'medium' : 'low'
            });
            setIsAdding(false);
            setNewRisk({ description: '', category: 'Operational', likelihood: 1, impact: 1, mitigationPlan: '' });
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                    <AlertOctagon className="w-5 h-5 text-gray-600" />
                    سجل المخاطر الذكي (Smart Risk Register)
                </h3>
                <Button size="sm" onClick={() => setIsAdding(!isAdding)}>
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة خطر جديد
                </Button>
            </div>

            {/* Add Risk Form */}
            {isAdding && (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 animate-in fade-in slide-in-from-top-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <Input
                            label="وصف الخطر"
                            value={newRisk.description}
                            onChange={e => setNewRisk({ ...newRisk, description: e.target.value })}
                            placeholder="مثال: أرضية زلقة في الممر..."
                        />
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">الاحتمالية (1-5)</label>
                                <input
                                    type="range" min="1" max="5"
                                    className="w-full"
                                    value={newRisk.likelihood}
                                    onChange={e => setNewRisk({ ...newRisk, likelihood: parseInt(e.target.value) })}
                                />
                                <div className="text-center text-sm font-bold">{newRisk.likelihood}</div>
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">الأثر (1-5)</label>
                                <input
                                    type="range" min="1" max="5"
                                    className="w-full"
                                    value={newRisk.impact}
                                    onChange={e => setNewRisk({ ...newRisk, impact: parseInt(e.target.value) })}
                                />
                                <div className="text-center text-sm font-bold">{newRisk.impact}</div>
                            </div>
                        </div>
                        <Input
                            label="خطة التخفيف (Mitigation)"
                            value={newRisk.mitigationPlan}
                            onChange={e => setNewRisk({ ...newRisk, mitigationPlan: e.target.value })}
                            placeholder="الإجراءات الوقائية..."
                        />
                        <div className="flex items-end">
                            <div className={`w-full p-2 rounded text-center font-bold text-white ${(newRisk.likelihood! * newRisk.impact!) > 15 ? 'bg-red-600' :
                                    (newRisk.likelihood! * newRisk.impact!) > 9 ? 'bg-orange-500' :
                                        (newRisk.likelihood! * newRisk.impact!) > 4 ? 'bg-yellow-500' : 'bg-green-500'
                                }`}>
                                Score: {newRisk.likelihood! * newRisk.impact!}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => setIsAdding(false)}>إلغاء</Button>
                        <Button size="sm" onClick={handleSave}>حفظ وإدراج</Button>
                    </div>
                </div>
            )}

            {/* Risks Table */}
            <div className="overflow-hidden rounded-lg border shadow-sm">
                <table className="w-full text-sm text-right">
                    <thead className="bg-gray-50 text-gray-700">
                        <tr>
                            <th className="p-3">الخطر</th>
                            <th className="p-3">التصنيف</th>
                            <th className="p-3 text-center">التقييم (Score)</th>
                            <th className="p-3">خطة التخفيف</th>
                            <th className="p-3">المسؤول</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y bg-white">
                        {risks.map(risk => (
                            <tr key={risk.id} className={`hover:bg-gray-50 ${risk.score > 15 ? 'bg-red-50' : ''}`}>
                                <td className="p-3 font-medium">
                                    {risk.score > 15 && <AlertTriangle className="w-4 h-4 text-red-600 inline ml-2" />}
                                    {risk.description}
                                </td>
                                <td className="p-3 text-gray-500">{risk.category}</td>
                                <td className="p-3 text-center">
                                    <span className={`px-2 py-1 rounded font-bold text-xs ${risk.score > 15 ? 'bg-red-100 text-red-800' :
                                            risk.score > 9 ? 'bg-orange-100 text-orange-800' :
                                                risk.score > 4 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                                        }`}>
                                        {risk.score} ({risk.level})
                                    </span>
                                </td>
                                <td className="p-3 text-gray-600">{risk.mitigationPlan}</td>
                                <td className="p-3 text-gray-500">{risk.owner}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
