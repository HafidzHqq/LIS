import React, { useState } from 'react';
import { User, UserRole } from '../../types';
import { DEMO_USERS } from '../../data/initialData';
import { Capacitor } from '@capacitor/core';
import {
  ShieldCheck,
  UserCheck,
  FlaskConical,
  Activity,
  Users,
  ChevronRight,
  Lock,
  Mail,
  Eye,
  EyeOff,
  Building2
} from 'lucide-react';

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const isNative = Capacitor.isNativePlatform();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginMode, setLoginMode] = useState<'form' | 'demo'>('demo');
  const [error, setError] = useState('');

  const getRoleInfo = (role: UserRole) => {
    switch (role) {
      case 'SUPER_ADMIN': return { icon: ShieldCheck, color: '#0066cc', label: 'Super Admin' };
      case 'LAB_MANAGER': return { icon: UserCheck, color: '#af52de', label: 'Lab Manager' };
      case 'ANALYST': return { icon: FlaskConical, color: '#34c759', label: 'Analis Lab' };
      case 'QC_OFFICER': return { icon: Activity, color: '#ff9f0a', label: 'QC Officer' };
      case 'CUSTOMER': return { icon: Users, color: '#5ac8fa', label: 'Customer' };
      default: return { icon: Users, color: '#7a7a7a', label: 'User' };
    }
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const found = DEMO_USERS.find(u => u.email === email);
    if (found) {
      onLogin(found);
    } else {
      setError('Email tidak ditemukan. Gunakan akun demo atau pilih peran di bawah.');
    }
  };

  return (
    <div className={`min-h-screen bg-[#0b0b0c] flex flex-col ${isNative ? 'pt-12' : ''}`}>
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        {/* Logo & Brand */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#0066cc] rounded-[4px] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#0066cc]/30">
            <FlaskConical className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white font-apple-display tracking-tight mb-1">
            LIMY
          </h1>
          <p className="text-sm text-[#cccccc]">
            Laboratory Information Management System
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex bg-[#272729] rounded-[4px] p-0.5 mb-6 w-full max-w-xs border border-[#3a3a3c]">
          <button
            onClick={() => { setLoginMode('demo'); setError(''); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-[4px] transition-all ${
              loginMode === 'demo'
                ? 'bg-[#0066cc] text-white shadow-sm'
                : 'text-[#7a7a7a]'
            }`}
          >
            Demo Login
          </button>
          <button
            onClick={() => { setLoginMode('form'); setError(''); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-[4px] transition-all ${
              loginMode === 'form'
                ? 'bg-[#0066cc] text-white shadow-sm'
                : 'text-[#7a7a7a]'
            }`}
          >
            Email & Password
          </button>
        </div>

        {loginMode === 'form' ? (
          /* Email/Password Form */
          <form onSubmit={handleEmailLogin} className="w-full max-w-xs space-y-3">
            <div className="relative">
              <Mail className="w-4 h-4 text-[#7a7a7a] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                placeholder="Email"
                className="w-full pl-10 pr-4 py-3 bg-[#272729] text-white text-sm rounded-[4px] border border-[#3a3a3c] focus:outline-none focus:ring-2 focus:ring-[#0066cc] placeholder-[#7a7a7a]"
                autoComplete="email"
              />
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#7a7a7a] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-10 pr-10 py-3 bg-[#272729] text-white text-sm rounded-[4px] border border-[#3a3a3c] focus:outline-none focus:ring-2 focus:ring-[#0066cc] placeholder-[#7a7a7a]"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7a7a7a]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            
            {error && (
              <p className="text-[11px] text-[#ff3b30] text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#0066cc] hover:bg-[#0071e3] text-white text-sm font-semibold rounded-[4px] transition-all active:scale-95 shadow-md shadow-[#0066cc]/30"
            >
              Masuk
            </button>

            <p className="text-[11px] text-[#7a7a7a] text-center">
              Demo: gunakan email dari daftar peran di bawah
            </p>
          </form>
        ) : (
          /* Demo Role Selector */
          <div className="w-full max-w-xs space-y-2">
            <p className="text-[11px] text-[#7a7a7a] text-center mb-3">
              Pilih peran untuk masuk sebagai demo user
            </p>
            {DEMO_USERS.map(user => {
              const roleInfo = getRoleInfo(user.role);
              const RoleIcon = roleInfo.icon;
              return (
                <button
                  key={user.id}
                  onClick={() => onLogin(user)}
                  className="w-full flex items-center gap-3 bg-[#272729] hover:bg-[#333335] border border-[#3a3a3c] rounded-[4px] p-3 transition-all active:scale-[0.97] group"
                >
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-offset-2 ring-offset-[#272729]"
                    style={{ ringColor: roleInfo.color } as any}
                  />
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center gap-1.5">
                      <RoleIcon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: roleInfo.color }} />
                      <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: roleInfo.color }}>
                        {roleInfo.label}
                      </span>
                    </div>
                    <h4 className="text-xs font-semibold text-white truncate mt-0.5">
                      {user.name}
                    </h4>
                    <p className="text-[10px] text-[#7a7a7a] truncate">
                      {user.email}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#7a7a7a] group-hover:text-white transition-colors flex-shrink-0" />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center pb-8 px-6">
        <div className="flex items-center justify-center gap-1.5 text-[#7a7a7a] mb-2">
          <Building2 className="w-3 h-3" />
          <span className="text-[10px]">LIMY Laboratory Information Management System</span>
        </div>
        <p className="text-[10px] text-[#555555]">
          ISO/IEC 17025 Compliant • v2.0
        </p>
      </div>
    </div>
  );
};
