import React, { useState } from 'react';
import { Audit, AuditFinding } from '../../types/quality';
import { CheckCircle, XCircle, FileText, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';

interface DigitalAuditToolProps {
    audit: Audit;
    onUpdateFinding: (findingId: string, isCompliant: boolean, evidence?: string) => void;
    onCompleteAudit: () => void;
}

export const DigitalAuditTool: React.FC<DigitalAuditToolProps> = ({ audit, onUpdateFinding, onCompleteAudit }) => {
    const [expandedArea, setExpandedArea] = useState<string | null>(null);

    // Group findings by Area
    const findingsByArea = audit.findings.reduce((acc, finding) => {
        if (!acc[finding.area]) acc[finding.area] = [];
        acc[finding.area].push(finding);
        return acc;
    }, {} as Record<string, AuditFinding[]>);

    const areas = Object.keys(findingsByArea);

    const progress = Math.round((audit.findings.filter(f => f.evidence).length / audit.findings.length) * 100);

    return (
        <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <FileText className="w-6 h-6 text-blue-600" />
                        {audit.title}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">المجال: {audit.scope} | المدقق: {audit.auditorName}</p>
                </div>
                <div className="text-left">
                    <div className="text-sm font-medium text-gray-600 mb-1">نسبة الإنجاز</div>
                    <div className="w-32 bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                    </div>
                    <div className="text-xs text-right mt-1">{progress}%</div>
                </div>
            </div>

            <div className="space-y-4">
                {areas.map(area => (
                    <div key={area} className="border rounded-lg overflow-hidden">
                        <button
                            className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                            onClick={() => setExpandedArea(expandedArea === area ? null : area)}
                        >
                            <span className="font-bold text-gray-800">{area}</span>
                            {expandedArea === area ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>

                        {expandedArea === area && (
                            <div className="p-4 bg-white space-y-4 animate-in slide-in-from-top-2">
                                {findingsByArea[area].map(finding => (
                                    <div key={finding.id} className="border-b last:border-0 pb-4 last:pb-0">
                                        <p className="font-medium text-gray-900 mb-2">{finding.criterion}</p>

                                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                                            <div className="flex gap-2">
                                                <button
                                                    className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm transition-colors ${finding.isCompliant ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-gray-100 text-gray-500 border border-transparent'}`}
                                                    onClick={() => onUpdateFinding(finding.id, true)}
                                                >
                                                    <CheckCircle className="w-4 h-4" />
                                                    مطابق
                                                </button>
                                                <button
                                                    className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm transition-colors ${!finding.isCompliant ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-gray-100 text-gray-500 border border-transparent'}`}
                                                    onClick={() => onUpdateFinding(finding.id, false)}
                                                >
                                                    <XCircle className="w-4 h-4" />
                                                    غير مطابق
                                                </button>
                                            </div>

                                            <input
                                                type="text"
                                                placeholder="الدليل / الملاحظات (Evidence)..."
                                                className="flex-1 text-sm border rounded px-3 py-1.5 w-full"
                                                value={finding.evidence || ''}
                                                onChange={(e) => onUpdateFinding(finding.id, finding.isCompliant, e.target.value)}
                                            />
                                        </div>

                                        {!finding.isCompliant && (
                                            <div className="mt-2 text-xs text-red-600 flex items-center gap-1 bg-red-50 p-2 rounded">
                                                <AlertCircle className="w-3 h-3" />
                                                سيتم إنشاء إجراء تصحيحي (CAPA) تلقائياً لهذه الملاحظة.
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-6 pt-4 border-t flex justify-end">
                <Button onClick={onCompleteAudit} disabled={progress < 100} className={progress < 100 ? 'opacity-50 cursor-not-allowed' : ''}>
                    إتمام التدقيق وإصدار التقرير
                </Button>
            </div>
        </div>
    );
};
