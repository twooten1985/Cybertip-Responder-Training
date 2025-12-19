
import React, { useState } from 'react';
import { MOCK_REPORT_DATA } from '../constants';

interface HotspotProps {
  title: string;
  reason: string;
  relevance: string;
  children: React.ReactNode;
  className?: string;
}

const Hotspot: React.FC<HotspotProps> = ({ title, reason, relevance, children, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative group inline-block ${className}`}>
      <div 
        className={`cursor-pointer transition-all p-1 rounded border-2 ${isOpen ? 'bg-blue-50 border-blue-400' : 'hover:bg-yellow-50 border-transparent hover:border-yellow-200'}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {children}
        <div className="absolute right-0 top-0 translate-x-full ml-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
          <span className="bg-slate-800 text-white text-[10px] px-2 py-1 rounded-full whitespace-nowrap shadow-lg">Investigative Context</span>
        </div>
      </div>
      
      {isOpen && (
        <div 
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[450px] bg-white border-2 border-blue-600 rounded-2xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)] z-[200] p-6 animate-in fade-in zoom-in duration-200"
        >
          <div className="flex justify-between items-center mb-4 border-b border-blue-100 pb-3">
            <h5 className="font-bold text-blue-900 text-[11px] uppercase tracking-widest">{title}</h5>
            <button 
              onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} 
              className="text-slate-400 hover:text-red-500 w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 transition-colors"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Investigation Purpose</p>
              <p className="text-[14px] text-slate-800 leading-snug">{reason}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">Documentation Requirement</p>
              <p className="text-[14px] text-blue-900 leading-snug font-medium">{relevance}</p>
            </div>
          </div>
          <p className="mt-4 text-[10px] text-center text-slate-400 italic">Click outside or press X to close</p>
        </div>
      )}
      {isOpen && <div className="fixed inset-0 bg-black/40 z-[190]" onClick={() => setIsOpen(false)}></div>}
    </div>
  );
};

export const CybertipViewer: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="flex flex-col items-center bg-slate-200 p-4 md:p-8 rounded-2xl border border-slate-300 shadow-inner">
      <div className="mb-6 flex space-x-1 bg-white/80 backdrop-blur p-1 rounded-xl border border-slate-300 shadow-sm">
        {[1, 2, 3].map(p => (
          <button 
            key={p} 
            onClick={() => setCurrentPage(p)}
            className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${currentPage === p ? 'bg-blue-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            Page {p}
          </button>
        ))}
      </div>

      <div className="relative w-full max-w-[800px]">
        <div className="bg-white shadow-2xl w-full aspect-[1/1.3] border border-slate-400 relative font-['Arial'] text-[13px] leading-snug p-8 md:p-12 text-slate-900 overflow-y-auto overflow-x-hidden">
          
          {currentPage === 1 && (
            <div className="animate-in fade-in duration-500">
              <div className="flex flex-col items-center mb-10">
                 <div className="flex items-center space-x-3 mb-2">
                   <span className="text-[11px] uppercase font-bold text-slate-500 tracking-widest">National Center For</span>
                   <i className="fas fa-people-group text-red-600 text-3xl"></i>
                 </div>
                 <h1 className="text-red-600 font-extrabold text-2xl tracking-tighter uppercase leading-none text-center">
                   MISSING & EXPLOITED<br/><span className="text-black text-xl">CHILDREN®</span>
                 </h1>
                 <div className="w-full h-[2px] bg-slate-400 my-8"></div>
                 
                 <Hotspot 
                  title="NCMEC Report ID" 
                  reason="The unique tracking number assigned by NCMEC. It is the single source of truth for the tip."
                  relevance="In any affidavit, reference this as 'NCMEC CyberTipline Report 145592831' to connect your warrant to the reporting mandate."
                 >
                   <h2 className="text-2xl font-normal text-center mb-1">CyberTipline Report {MOCK_REPORT_DATA.reportId}</h2>
                 </Hotspot>
                 
                 <Hotspot 
                  title="Emergency Safety Triage" 
                  reason="Level 1 is an immediate threat to life. Level 2 (seen here) indicates a serious active offense requiring prompt attention."
                  relevance="This dictates how fast you must move. Priority 1 reports often allow for 'Exigent Circumstances' bypass of standard warrants in life-safety situations."
                 >
                   <h3 className="text-lg font-normal text-center mb-1 bg-yellow-50 px-3 py-1 border border-yellow-200 rounded inline-block mx-auto">
                     Priority Level: {MOCK_REPORT_DATA.priority}
                   </h3>
                 </Hotspot>
                 
                 <div className="text-center space-y-1 mb-12 text-slate-600">
                   <Hotspot 
                    title="UTC Reporting Standard" 
                    reason="All reports use Universal Coordinated Time to ensure global logging accuracy."
                    relevance="When serving a warrant to Viasat, you MUST specify this exact UTC time. If you use your local time, the ISP logs may not match, and you will get the wrong subscriber."
                   >
                    <p className="font-bold cursor-help hover:text-blue-700 underline decoration-dotted">Received by NCMEC on {MOCK_REPORT_DATA.received}</p>
                   </Hotspot>
                   <p>All dates are displayed as MM-DD-YYYY</p>
                 </div>
              </div>

              <div className="bg-slate-100 py-2 px-4 mb-6 text-center border-y border-slate-300">
                <h4 className="text-xl font-normal uppercase tracking-tight">Executive Summary</h4>
              </div>
              
              <div className="space-y-6">
                <Hotspot 
                  title="Electronic Service Provider (ESP)" 
                  reason="The company hosting the illicit behavior (ChatStream Pro). This is where the digital crime 'happened'."
                  relevance="This entity holds the 'Content' of the crime. You need a Search Warrant to get the full chat logs and files from this company."
                >
                  <p className="text-blue-900 font-bold bg-blue-50 p-2 rounded border border-blue-100">
                    <i className="fas fa-server mr-2"></i> Reporting ESP: {MOCK_REPORT_DATA.espName}
                  </p>
                </Hotspot>

                <Hotspot 
                  title="Internet Service Provider (ISP)" 
                  reason="The company providing network access to the suspect's hardware (Viasat Global)."
                  relevance="This entity holds the 'Subscriber Information'. You need a Subpoena to get the name and billing address of the person paying for the internet at the target IP."
                >
                  <p className="text-green-900 font-bold bg-green-50 p-2 rounded border border-green-100 mt-2">
                    <i className="fas fa-wifi mr-2"></i> Logged ISP: {MOCK_REPORT_DATA.ispName}
                  </p>
                </Hotspot>

                <div className="pt-4 border-t border-slate-100">
                  <Hotspot 
                    title="Incident Statutory Classification" 
                    reason="Defines the probable criminal statute (Possession, Distribution, or Enticement)."
                    relevance="Crucial for the 'Statement of Offense' section of your warrant affidavit."
                  >
                    <p className="font-bold text-red-700 uppercase tracking-tight">Incident Type: {MOCK_REPORT_DATA.incidentType}</p>
                  </Hotspot>
                </div>
              </div>
            </div>
          )}

          {currentPage === 2 && (
            <div className="animate-in fade-in duration-500">
               <div className="text-red-600 text-xl font-normal border-b-2 border-red-100 pb-2 mb-6 uppercase tracking-tight text-center">Section B: Technical Identification</div>
               
               <div className="bg-slate-100 py-2 px-4 mb-6 border-y border-slate-300 text-slate-700">
                  <h4 className="text-lg font-normal uppercase tracking-tight">Connection Data</h4>
               </div>
               
               <div className="grid grid-cols-12 gap-y-6 mb-10 text-sm">
                 <div className="col-span-4 font-bold text-slate-500 uppercase text-[10px]">Public IP:</div>
                 <div className="col-span-8">
                   <Hotspot 
                    title="Gateway IP Address" 
                    reason="The external-facing IP address of the household router."
                    relevance="This IP, combined with the exact UTC timestamp, is used to identify the physical service location."
                   >
                    <span className="font-mono bg-blue-50 px-2 py-1 border border-blue-200 rounded text-blue-800 font-bold">{MOCK_REPORT_DATA.publicIp}</span>
                   </Hotspot>
                 </div>

                 <div className="col-span-4 font-bold text-slate-500 uppercase text-[10px]">Source Port:</div>
                 <div className="col-span-8">
                   <Hotspot 
                    title="NAT Port Resolution" 
                    reason="Required for providers using Network Address Translation (NAT) to distinguish between multiple users sharing one IP."
                    relevance="You MUST include the Source Port ({MOCK_REPORT_DATA.sourcePort}) in your preservation or subpoena, otherwise the ISP may return 'No Records Found' for a shared IP."
                   >
                    <span className="font-mono bg-slate-50 px-2 py-1 border rounded">{MOCK_REPORT_DATA.sourcePort}</span>
                   </Hotspot>
                 </div>

                 <div className="col-span-4 font-bold text-slate-500 uppercase text-[10px]">Machine ID:</div>
                 <div className="col-span-8">
                   <Hotspot 
                    title="Hardware GUID" 
                    reason="A unique identifier assigned by the ESP software to that specific physical computer."
                    relevance="Used during forensic examination to prove that 'Device X' is the same 'Machine HW-B921' listed in the CyberTipline."
                   >
                    <span className="font-mono bg-slate-100 px-2 py-1 border rounded text-xs">{MOCK_REPORT_DATA.machineId}</span>
                   </Hotspot>
                 </div>

                 <div className="col-span-4 font-bold text-slate-500 uppercase text-[10px]">User Agent:</div>
                 <div className="col-span-8">
                   <Hotspot 
                    title="Browser & OS Fingerprint" 
                    reason="Identifies that the user was on Windows 10 using Chrome browser version 120."
                    relevance="If you raid a house and only find Macs/iPhones, you may have the wrong suspect or a hidden device. This string provides the 'Nexus' to the physical evidence."
                   >
                     <p className="text-[10px] font-mono bg-slate-50 p-2 border rounded leading-tight break-all cursor-help hover:bg-yellow-50">
                       {MOCK_REPORT_DATA.userAgent}
                     </p>
                   </Hotspot>
                 </div>
               </div>

               <div className="bg-slate-100 py-2 px-4 mb-6 border-y border-slate-300 text-slate-700">
                  <h4 className="text-lg font-normal uppercase tracking-tight">Reported Files</h4>
               </div>
               
               <div className="space-y-4">
                 {MOCK_REPORT_DATA.files.map((file, i) => (
                   <div key={i} className="border p-4 rounded bg-slate-50 relative overflow-hidden">
                     <div className="flex justify-between items-start mb-2">
                       <span className="font-bold text-blue-900">{file.name}</span>
                       <span className="text-[9px] bg-slate-200 px-2 py-0.5 rounded font-bold uppercase tracking-widest text-slate-500">Image Asset</span>
                     </div>
                     <div className="grid grid-cols-12 gap-y-2 text-[10px] font-mono">
                       <div className="col-span-2 font-bold text-slate-400">MD5:</div>
                       <div className="col-span-10 text-slate-600 break-all">{file.md5}</div>
                       <div className="col-span-2 font-bold text-slate-400">SHA1:</div>
                       <div className="col-span-10 text-slate-600 break-all">
                         <Hotspot 
                          title="Cryptographic Hash" 
                          reason="A unique 'digital fingerprint' of the file. If one bit changes, the hash changes."
                          relevance="Use these hashes to cross-reference with 'Known Contraband' databases (NCMEC Child Victim Identification Program)."
                         >
                          {file.sha1}
                         </Hotspot>
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          )}

          {currentPage === 3 && (
            <div className="animate-in fade-in duration-500">
               <div className="bg-slate-100 py-2 px-4 mb-6 border-y border-slate-300 text-slate-700">
                  <h4 className="text-lg font-normal uppercase tracking-tight">Investigative Narrative</h4>
               </div>
               
               <Hotspot 
                title="Narrative Analysis & Nexus" 
                reason="This section provides the 'Probable Cause' foundation. It links digital activity to a physical person or place."
                relevance="Specific details like 'neighbor' or 'backyard' allow you to establish geographic nexus in your search warrant affidavit. This is what 'connects the dots' from an IP to a person."
                className="w-full"
               >
                 <div className="bg-white border-2 border-dashed border-blue-300 p-8 leading-relaxed mb-12 text-slate-800 italic rounded shadow-inner">
                   "{MOCK_REPORT_DATA.narrative}"
                 </div>
               </Hotspot>

               <div className="text-red-600 text-xl font-normal border-b-2 border-red-100 pb-2 mb-6 uppercase tracking-tight">Section D: Law Enforcement Contact</div>
               <div className="grid grid-cols-12 gap-y-4 mb-12 text-sm">
                 <div className="col-span-4 font-bold text-slate-500 uppercase text-[10px]">Officer:</div>
                 <div className="col-span-8 font-bold">{MOCK_REPORT_DATA.leContact.officer}</div>
                 
                 <div className="col-span-4 font-bold text-slate-500 uppercase text-[10px]">Agency:</div>
                 <div className="col-span-8 text-slate-600">{MOCK_REPORT_DATA.leContact.agency}</div>

                 <div className="col-span-4 font-bold text-slate-500 uppercase text-[10px]">Official Email:</div>
                 <div className="col-span-8">
                    <Hotspot 
                      title="Direct LE Verification" 
                      reason="NCMEC uses this email to securely share unredacted versions of the report."
                      relevance="Only official agency emails are accepted. Communications sent to Gmail/Yahoo will be rejected by NCMEC for safety."
                    >
                      <span className="text-blue-700 underline font-mono text-xs">{MOCK_REPORT_DATA.leContact.email}</span>
                    </Hotspot>
                 </div>
               </div>
               
               <div className="mt-12 p-4 border rounded bg-red-50 border-red-100 text-[10px] text-red-800 leading-tight">
                 <strong>CONFIDENTIALITY NOTICE:</strong> This report is for law enforcement use only. Redistribution to unauthorized parties is a violation of federal guidelines and may jeopardize victim safety.
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
