import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Stethoscope,
    Package,
    Shirt,
    CalendarCheck,
    Activity,
    Settings,
    FileText
} from 'lucide-react';
import { cn } from '../ui/Button';

export const Sidebar = () => {
    const navItems = [
        { to: '/dashboard', icon: LayoutDashboard, label: 'لوحة القيادة' },
        { to: '/beneficiaries', icon: Users, label: 'المستفيدين' },
        { to: '/medical', icon: Stethoscope, label: 'القسم الطبي' },
        { to: '/social', icon: Activity, label: 'الخدمات الاجتماعية' },
        { to: '/reports/strategic', icon: FileText, label: 'التقارير الاستراتيجية' },
        { to: '/inventory', icon: Package, label: 'المستودع' },
        { to: '/clothing', icon: Shirt, label: 'الكسوة' },
        { to: '/daily-follow-up', icon: CalendarCheck, label: 'المتابعة اليومية' },
    ];

    return (
        <aside className="w-64 bg-slate-900 text-white flex flex-col h-screen fixed right-0 top-0 border-l border-slate-800">
            <div className="p-6 border-b border-slate-800 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold">
                    RC
                </div>
                <h1 className="font-bold text-lg">مركز التأهيل</h1>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            cn(
                                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium',
                                isActive
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            )
                        }
                    >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <NavLink
                    to="/settings"
                    className={({ isActive }) =>
                        cn(
                            'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium',
                            isActive
                                ? 'bg-slate-800 text-white'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                        )
                    }
                >
                    <Settings className="w-5 h-5" />
                    الإعدادات
                </NavLink>
            </div>
        </aside>
    );
};
