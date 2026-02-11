
import React, { useState } from 'react';
import { TUTORIAL_MODULES } from './constants';
import { ModuleContent } from './components/ModuleContent';
import { ChatAdvisor } from './components/ChatAdvisor';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState(TUTORIAL_MODULES[0].id);
  const [hasAgreed, setHasAgreed] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  const currentIndex = TUTORIAL_MODULES.findIndex(m => m.id === activeModule);
  const progress = ((currentIndex + 1) / TUTORIAL_MODULES.length) * 100;

  if (!hasAgreed) {
    return (
      <div className="fixed inset-0 bg-slate-900 flex items-center justify-center p-4 z-[500] overflow-y-auto">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500">
          <div className="bg-blue-900 p-8 text-center text-white">
            <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <i className="fas fa-shield-halved text-3xl"></i>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight uppercase">Cybertip Investigator Training</h1>
            <p className="text-blue-300 text-sm font-mono mt-2 tracking-widest uppercase">Official Training Portal</p>
          </div>
          
          <div className="p-8 md:p-12 space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 border-b pb-2">Program Overview</h2>
              <p className="text-slate-600 leading-relaxed text-sm">
                This interactive tutorial platform is designed to provide law enforcement officers with a comprehensive understanding of the 
                <strong> NCMEC CyberTipline</strong> ecosystem.
              </p>
            </div>

            <div className="bg-red-50 border-2 border-red-100 p-6 rounded-2xl space-y-3">
              <div className="flex items-center space-x-2 text-red-700 font-bold uppercase text-xs tracking-tighter">
                <i className="fas fa-triangle-exclamation text-lg"></i>
                <span>Restricted Access Warning</span>
              </div>
              <p className="text-xs text-red-900 leading-relaxed">
                <strong>FOR OFFICIAL LAW ENFORCEMENT USE ONLY.</strong> The materials, mock reports, and forensic strategies 
                contained within this portal are sensitive in nature. Unauthorized access, distribution, or reproduction 
                of this training material is strictly prohibited and may violate agency policy or federal guidelines.
              </p>
            </div>

            <div className="pt-4 flex flex-col space-y-6">
              <label className="flex items-start space-x-4 cursor-pointer group">
                <div className="relative flex items-center">
                  <input 
                    type="checkbox" 
                    checked={checkboxChecked}
                    onChange={(e) => setCheckboxChecked(e.target.checked)}
                    className="peer h-6 w-6 cursor-pointer appearance-none rounded-md border-2 border-slate-300 transition-all checked:bg-blue-600 checked:border-blue-600"
                  />
                  <i className="fas fa-check absolute w-6 h-6 text-white text-[10px] flex items-center justify-center pointer-events-none hidden peer-checked:flex"></i>
                </div>
                <span className="text-[11px] text-slate-500 leading-tight select-none pt-0.5">
                  I acknowledge that I am a sworn law enforcement officer or authorized personnel and agree to handle all training data according to sensitive information protocols and agency guidelines.
                </span>
              </label>

              <button 
                disabled={!checkboxChecked}
                onClick={() => setHasAgreed(true)}
                className="w-full py-4 bg-blue-900 text-white rounded-xl font-bold text-lg shadow-xl hover:bg-blue-800 transition-all active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed uppercase tracking-widest"
              >
                Enter Training Portal
              </button>
            </div>
          </div>
          <div className="bg-slate-50 p-4 text-center border-t">
            <p className="text-[9px] text-slate-400 font-medium">© 2025 DIGITAL FORENSICS TRAINING DIVISION | SECURE ACCESS LOGGED</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden animate-in fade-in duration-700">
      {/* Navigation Header */}
      <header className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shadow-md z-10">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded">
            <i className="fas fa-shield-halved text-white text-xl"></i>
          </div>
          <div>
            <h1 className="text-lg font-bold uppercase tracking-tight">Cybertip Responder Training</h1>
            <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">Law Enforcement Training Portal</p>
          </div>
        </div>
        <div className="hidden md:flex flex-col items-end">
          <div className="text-xs font-bold text-slate-400 mb-1">PROGRAM PROGRESS</div>
          <div className="w-48 h-2 bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col overflow-y-auto">
          <nav className="p-4 space-y-2">
            {TUTORIAL_MODULES.map((module) => (
              <button
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                className={`w-full text-left p-3 rounded-lg transition-all flex items-start space-x-3 group ${
                  activeModule === module.id 
                    ? 'bg-blue-50 border-blue-200 border text-blue-900 shadow-sm' 
                    : 'hover:bg-slate-50 text-slate-600'
                }`}
              >
                <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded flex items-center justify-center ${
                  activeModule === module.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                }`}>
                  <i className={`fas ${module.icon}`}></i>
                </div>
                <div>
                  <div className="font-bold text-sm">{module.title}</div>
                  <p className="text-[10px] leading-tight opacity-70 line-clamp-2">{module.description}</p>
                </div>
              </button>
            ))}
          </nav>
          <div className="mt-auto p-4 border-t border-slate-100">
            <div className="bg-slate-50 p-3 rounded-lg text-[10px] text-slate-500">
              <p className="font-bold mb-1">REMINDER</p>
              Under ICAC (Internet Crimes Against Children) task force guidelines, all CSAM materials must be handled via secure evidence protocols.
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-slate-50 p-6">
          <div className="max-w-4xl mx-auto">
            <ModuleContent moduleId={activeModule} />
            
            <div className="mt-12 flex justify-between items-center border-t border-slate-200 pt-6">
              <button 
                onClick={() => {
                  const idx = TUTORIAL_MODULES.findIndex(m => m.id === activeModule);
                  if (idx > 0) setActiveModule(TUTORIAL_MODULES[idx - 1].id);
                }}
                disabled={currentIndex === 0}
                className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-slate-900 disabled:opacity-30 flex items-center"
              >
                <i className="fas fa-arrow-left mr-2"></i> Previous Module
              </button>
              <button 
                onClick={() => {
                  const idx = TUTORIAL_MODULES.findIndex(m => m.id === activeModule);
                  if (idx < TUTORIAL_MODULES.length - 1) setActiveModule(TUTORIAL_MODULES[idx + 1].id);
                }}
                disabled={currentIndex === TUTORIAL_MODULES.length - 1}
                className="px-6 py-2 bg-blue-900 text-white rounded-lg text-sm font-bold hover:bg-blue-800 disabled:opacity-30 shadow-lg flex items-center"
              >
                Next Module <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </div>
          </div>
        </main>

        {/* Advisor Chat Panel */}
        <aside className="w-80 bg-slate-100 hidden xl:block p-4">
          <ChatAdvisor />
        </aside>
      </div>

      {/* Mobile Footer Toggle (Mock) */}
      <footer className="lg:hidden bg-white border-t p-2 flex justify-around items-center">
         <button className="text-blue-900 flex flex-col items-center">
            <i className="fas fa-list-ul mb-1"></i>
            <span className="text-[10px]">Modules</span>
         </button>
         <button className="text-slate-400 flex flex-col items-center">
            <i className="fas fa-comments mb-1"></i>
            <span className="text-[10px]">Advisor</span>
         </button>
      </footer>
    </div>
  );
};

export default App;
