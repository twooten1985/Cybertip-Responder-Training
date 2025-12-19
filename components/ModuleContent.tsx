
import React, { useState, useMemo } from 'react';
import { CybertipViewer } from './CybertipViewer';

interface ModuleContentProps {
  moduleId: string;
}

export const ModuleContent: React.FC<ModuleContentProps> = ({ moduleId }) => {
  const [octetValue, setOctetValue] = useState(192);
  const [calcInput, setCalcInput] = useState('192');
  const [selectedStatue, setSelectedStatue] = useState<string | null>(null);
  const [legalDoc, setLegalDoc] = useState<string | null>(null);
  const [uaTab, setUaTab] = useState('os');
  
  // Hash Demo State
  const [hashInput, setHashInput] = useState("Evidence_File_9281.jpg");
  
  // Interactive Pixel Grid State for Hash Simulation
  const [pixels, setPixels] = useState<string[]>(Array(16).fill('#3b82f6')); // 4x4 blue grid
  
  // Certification State
  const [examAnswers, setExamAnswers] = useState<Record<number, number>>({});
  const [isExamSubmitted, setIsExamSubmitted] = useState(false);
  const [showNamePopup, setShowNamePopup] = useState(false);
  const [userName, setUserName] = useState('');

  // Simple deterministic string hash for demo purposes
  const getSimpleHash = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, '0');
    // Salt it for longer realistic appearance
    return hex + "e99a18c428cb38d5f2608536";
  };

  const gridHash = useMemo(() => {
    return getSimpleHash(pixels.join(''));
  }, [pixels]);

  const togglePixel = (index: number) => {
    const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#000000'];
    const current = pixels[index];
    const nextIndex = (colors.indexOf(current) + 1) % colors.length;
    const newPixels = [...pixels];
    newPixels[index] = colors[nextIndex];
    setPixels(newPixels);
  };

  const questions = [
    { q: "Which US Code mandates service providers report apparent CSAM to NCMEC?", options: ["18 U.S.C. § 2703", "18 U.S.C. § 2258A", "18 U.S.C. § 2252", "18 U.S.C. § 1030"], correct: 1 },
    { q: "What is the primary function of a User Agent string?", options: ["Identify physical address", "Identify OS and browser version", "Identify billing info", "Identify suspect's legal name"], correct: 1 },
    { q: "Which legal instrument is used to immediately freeze ISP logs for 90 days?", options: ["Administrative Subpoena", "Search Warrant", "Preservation Letter (2703f)", "Title III Wiretap"], correct: 2 },
    { q: "NCMEC reports timestamps are standardized in what time zone?", options: ["Local time", "Eastern Time (EST)", "UTC (Universal Time)", "Central Time (CST)"], correct: 2 },
    { q: "A 'Priority Level 1' NCMEC report typically indicates:", options: ["Historical evidence", "Administrative review", "Life Safety / Immediate Threat", "Financial fraud"], correct: 2 },
    { q: "An Advertiser ID (IDFA/AAID) is unique to what?", options: ["The ISP account", "The physical mobile device hardware", "The email address profile", "The home WiFi router"], correct: 1 },
    { q: "What does NAT stand for in networking?", options: ["Network Access Tool", "National Agency Tracking", "Network Address Translation", "Normal Access Terminal"], correct: 2 },
    { q: "In a standard Cybertip, the provided IP address is usually the:", options: ["Private Local IP", "Public Gateway IP", "Router Internal IP", "MAC Hardware Address"], correct: 1 },
    { q: "Which legal standard is required for a Search Warrant for email content?", options: ["Relevance", "Specific and Articulable Facts", "Probable Cause", "Super Probable Cause"], correct: 2 },
    { q: "Which entity holds the subscriber records (Name/Address) for an IP address?", options: ["NCMEC Clearinghouse", "The App Developer (ESP)", "The Network Provider (ISP)", "The ICAC Task Force"], correct: 2 },
    { q: "What information can be obtained with a basic administrative subpoena?", options: ["Private chat messages", "Real-time location data", "Basic subscriber info (BSI)", "Search engine history"], correct: 2 },
    { q: "NCMEC acts as a ___ for law enforcement tips.", options: ["Private detective firm", "Centralized clearinghouse", "Federal court system", "ISP server provider"], correct: 1 },
    { q: "How many bits are in a single IPv4 octet?", options: ["4 bits", "8 bits", "16 bits", "32 bits"], correct: 1 },
    { q: "A MAC address is a permanent identifier for what?", options: ["The user's login profile", "The hardware network interface", "The encrypted email account", "The cloud storage bucket"], correct: 1 },
    { q: "Why is a Source Port critical when investigating a shared Public IP?", options: ["It identifies the building", "It identifies the specific session", "It identifies the ISP technician", "It identifies the victim's name"], correct: 1 },
    { q: "Which priority level indicates 'Serious risk/Investigation in progress'?", options: ["Level 1", "Level 2", "Level 5", "Emergency 911"], correct: 1 },
    { q: "A Trap and Trace / Pen Register order provides what data?", options: ["Email content", "Incoming/Outgoing addressing info", "GPS coordinates", "Financial bank records"], correct: 1 },
    { q: "The 'Machine ID' in a report is typically assigned by whom?", options: ["The ISP", "The OS Manufacturer (Microsoft/Apple)", "The App Provider (ESP)", "The Investigator"], correct: 2 },
    { q: "What is the maximum decimal value of an IPv4 octet?", options: ["128", "255", "256", "512"], correct: 1 },
    { q: "True or False: A preservation letter (2703f) requires a judge's signature.", options: ["True", "False"], correct: 1 }
  ];

  const handleExamSubmit = () => {
    setIsExamSubmitted(true);
    const score = Object.entries(examAnswers).filter(([idx, ans]) => questions[parseInt(idx)].correct === ans).length;
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) {
      setShowNamePopup(true);
    }
  };

  const generateCertificate = () => {
    const certWindow = window.open('', '_blank');
    if (!certWindow) return;
    certWindow.document.write(`
      <html>
        <head><title>Certificate - ${userName}</title><style>
          body { font-family: 'Arial'; display: flex; align-items: center; justify-content: center; height: 100vh; background: #f1f5f9; }
          .cert { width: 850px; padding: 60px; border: 15px solid #1e3a8a; background: white; text-align: center; box-shadow: 0 10px 40px rgba(0,0,0,0.1); position: relative; }
          h1 { color: #1e3a8a; font-size: 55px; margin-bottom: 5px; text-transform: uppercase; }
          h2 { color: #64748b; font-size: 24px; font-weight: normal; margin-bottom: 50px; letter-spacing: 2px; }
          .name { font-size: 42px; font-weight: bold; border-bottom: 2px solid #e2e8f0; display: inline-block; padding: 0 50px; margin: 30px 0; color: #0f172a; }
          p { font-size: 20px; line-height: 1.6; color: #334155; }
          .footer { display: flex; justify-content: space-around; margin-top: 50px; font-size: 14px; color: #94a3b8; }
        </style></head>
        <body><div class="cert">
          <h1>Certificate of Completion</h1><h2>Cybertip Investigator Training</h2>
          <p>This is to certify that</p>
          <div class="name">${userName || 'Investigator'}</div>
          <p>has successfully completed the comprehensive professional training module</p>
          <p><strong>Basic Cybertip Training and awareness</strong></p>
          <div class="footer">
            <div>Certification ID: ${Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
            <div>Issued: ${new Date().toLocaleDateString()}</div>
          </div>
        </div><script>window.print();</script></body></html>
    `);
    certWindow.document.close();
  };

  const handleCalcChange = (val: string) => {
    const num = parseInt(val);
    if (!isNaN(num) && num >= 0 && num <= 255) {
      setCalcInput(val);
      setOctetValue(num);
    } else if (val === '') {
      setCalcInput('');
    }
  };

  switch (moduleId) {
    case 'intro':
      return (
        <div className="space-y-8 p-4">
          <h2 className="text-2xl font-bold text-blue-900 border-b pb-2">The Mandatory Reporting Framework</h2>
          
          <section className="bg-white border rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex items-center space-x-3 text-red-600 mb-2">
              <i className="fas fa-people-group text-3xl"></i>
              <h3 className="text-xl font-bold">What is NCMEC?</h3>
            </div>
            <p className="text-slate-700 leading-relaxed">
              The <strong>National Center for Missing & Exploited Children (NCMEC)</strong> is a private, non-profit 501(c)(3) corporation established by Congress in 1984. 
              It serves as the nation’s <strong>clearinghouse</strong> and resource center for information about missing and exploited children.
            </p>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded text-xs text-amber-900">
              <strong>CRITICAL LEGAL DISTINCTION:</strong> NCMEC reports represent <em>allegations</em> of <strong>apparent</strong> child exploitation. NCMEC does NOT legally verify the reports for accuracy. It is the responsibility of Law Enforcement to investigate and confirm the facts.
            </div>
          </section>

          {/* New ISP vs ESP Relationship Section */}
          <section className="bg-slate-50 border rounded-2xl p-6 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center">
              <i className="fas fa-network-wired mr-2 text-blue-600"></i> ISP vs. ESP: Roles in Investigations
            </h3>
            <p className="text-sm text-slate-600">Understanding the difference between where the activity happened (ESP) and who provided the connection (ISP) is critical for targeting legal process correctly.</p>
            
            <div className="grid md:grid-cols-2 gap-6 relative">
              <div className="absolute inset-x-0 top-1/2 hidden md:flex justify-center -translate-y-1/2 pointer-events-none z-0">
                <i className="fas fa-arrows-left-right text-slate-300 text-3xl"></i>
              </div>
              
              <div className="bg-white p-5 rounded-xl border border-blue-100 shadow-sm z-10">
                <div className="flex items-center space-x-2 mb-3 text-blue-900">
                  <i className="fas fa-server"></i>
                  <h4 className="font-bold text-xs uppercase tracking-wider">ESP (Electronic Service Provider)</h4>
                </div>
                <p className="text-[11px] text-slate-500 mb-4 italic">Examples: Google, Meta, Snapchat, Dropbox</p>
                <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
                  <p className="text-[11px] font-bold text-blue-900 uppercase mb-1">Investigation Role:</p>
                  <p className="text-[11px] text-blue-800">Holds the <strong>CONTENT</strong> of the crime. This includes private messages, photos, and account activity. You warrant the ESP to see the files reported by NCMEC.</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-green-100 shadow-sm z-10">
                <div className="flex items-center space-x-2 mb-3 text-green-900">
                  <i className="fas fa-wifi"></i>
                  <h4 className="font-bold text-xs uppercase tracking-wider">ISP (Internet Service Provider)</h4>
                </div>
                <p className="text-[11px] text-slate-500 mb-4 italic">Examples: Comcast, AT&T, Verizon, Viasat</p>
                <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-400">
                  <p className="text-[11px] font-bold text-green-900 uppercase mb-1">Investigation Role:</p>
                  <p className="text-[11px] text-green-800">Holds the <strong>IDENTITY</strong>. The ISP links the reported IP address to a physical subscriber (Name and Street Address). You subpoena the ISP to find the house.</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-slate-900 text-white rounded-xl text-[11px] leading-relaxed">
              <i className="fas fa-info-circle mr-2 text-blue-400"></i>
              <strong>INVESTIGATIVE TIP:</strong> Most Cybertips are generated by the <strong>ESP</strong>. Law enforcement uses the connection data in the tip to identify the <strong>ISP</strong>, then subpoenas that ISP to unmask the subscriber.
            </div>
          </section>

          <section className="bg-blue-900 text-white rounded-2xl p-6 shadow-lg space-y-4 relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 opacity-10">
              <i className="fas fa-shield-halved text-[120px]"></i>
            </div>
            <h3 className="text-xl font-bold flex items-center">
              <i className="fas fa-diagram-project mr-3 text-blue-400"></i> The Reporting Lifecycle
            </h3>
            <p className="text-sm opacity-90 leading-relaxed">
              ESPs utilize NCMEC as a legal bridge between private industry and public law enforcement. 
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center border-2 border-blue-400">
                  <i className="fas fa-server"></i>
                </div>
                <div className="font-bold text-xs uppercase">1. The ESP</div>
                <p className="text-[10px] opacity-70">Reports "Apparent" CSAM under 18 U.S.C. § 2258A.</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center border-2 border-blue-400">
                  <i className="fas fa-building-shield"></i>
                </div>
                <div className="font-bold text-xs uppercase">2. NCMEC</div>
                <p className="text-[10px] opacity-70">Acts as a clearinghouse, categorizing and routing tips to LE.</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center border-2 border-blue-400">
                  <i className="fas fa-handcuffs"></i>
                </div>
                <div className="font-bold text-xs uppercase">3. Law Enforcement</div>
                <p className="text-[10px] opacity-70">Performs independent investigation and legal verification.</p>
              </div>
            </div>
          </section>

          <section className="bg-white border rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 flex items-center">
              <i className="fas fa-book-scale mr-2 text-blue-600"></i> Mandatory Reporting Statute
            </h3>
            <p className="text-slate-700 leading-relaxed">
              <strong>18 U.S.C. § 2258A</strong>: Mandatory reporting of child exploitation. This is the bedrock of the CyberTipline.
            </p>
          </section>
        </div>
      );

    case 'structure':
      return (
        <div className="space-y-6 p-4">
          <h2 className="text-2xl font-bold text-blue-900 border-b pb-2">Reading the Report</h2>
          <CybertipViewer />
        </div>
      );

    case 'evidence':
      return (
        <div className="space-y-10 p-4">
          <h2 className="text-2xl font-bold text-blue-900 border-b pb-2">Technical Evidence Deep Dive</h2>
          
          <section className="bg-white border rounded-2xl p-6 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-slate-800 flex items-center">
              <i className="fas fa-house-laptop mr-2 text-blue-600"></i> Networking Identifiers
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-blue-900 text-white p-4 rounded-xl">
                <h4 className="text-[10px] font-bold uppercase opacity-70">Public IP</h4>
                <div className="text-xl font-mono font-bold">73.144.2.119</div>
                <p className="text-[10px] mt-1 opacity-80">The <strong>Gateway</strong> IP visible to the ESP.</p>
              </div>
              <div className="bg-slate-100 p-4 rounded-xl border">
                <h4 className="text-[10px] font-bold uppercase text-slate-500">Private IP</h4>
                <div className="text-xl font-mono font-bold text-slate-800">192.168.1.45</div>
                <p className="text-[10px] mt-1 text-slate-600">Internal address assigned by a router.</p>
              </div>
              <div className="bg-amber-100 p-4 rounded-xl border border-amber-200">
                <h4 className="text-[10px] font-bold uppercase text-amber-600">MAC Address</h4>
                <div className="text-xl font-mono font-bold text-amber-900 italic">00:1A:2B:3C:4D:5E</div>
                <p className="text-[10px] mt-1 text-amber-700 leading-tight">A <strong>permanent hardware</strong> identifier for a network interface.</p>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border-l-4 border-blue-600 rounded text-xs leading-relaxed">
              <p className="font-bold mb-1">What is NAT (Network Address Translation)?</p>
              NAT allows multiple devices in a household to share a single <strong>Public Gateway IP</strong>. Because of NAT, you MUST have the <strong>Source Port</strong> and <strong>Exact UTC Timestamp</strong> to correctly identify the specific subscriber from the ISP's logs.
            </div>
          </section>

          {/* New IP Architecture Section (IPv4 vs IPv6) */}
          <section className="bg-white border rounded-2xl p-6 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-slate-800 flex items-center">
              <i className="fas fa-route mr-2 text-blue-600"></i> IP Architecture: IPv4 vs. IPv6
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              As the internet expanded, the world ran out of IPv4 addresses. <strong>IPv6</strong> was created to provide a virtually limitless supply of addresses, but it looks and behaves differently in reports.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* IPv4 Diagram */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold text-blue-900 uppercase tracking-widest flex items-center">
                   <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div> IPv4: 32-Bit Decimal
                </h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="flex justify-between font-mono text-center mb-2">
                    <div className="w-1/4 px-1"><div className="bg-blue-100 rounded py-2 border border-blue-300">192</div><div className="text-[8px] mt-1 text-slate-400 uppercase">Octet 1</div></div>
                    <div className="w-1/4 px-1"><div className="bg-blue-100 rounded py-2 border border-blue-300">168</div><div className="text-[8px] mt-1 text-slate-400 uppercase">Octet 2</div></div>
                    <div className="w-1/4 px-1"><div className="bg-blue-100 rounded py-2 border border-blue-300">1</div><div className="text-[8px] mt-1 text-slate-400 uppercase">Octet 3</div></div>
                    <div className="w-1/4 px-1"><div className="bg-blue-100 rounded py-2 border border-blue-300">25</div><div className="text-[8px] mt-1 text-slate-400 uppercase">Octet 4</div></div>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    Uses <strong>4 Octets</strong> (8 bits each). Numbers range from <strong>0 to 255</strong>. Total combinations: ~4.3 Billion.
                  </p>
                </div>
              </div>

              {/* IPv6 Diagram */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold text-purple-900 uppercase tracking-widest flex items-center">
                   <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div> IPv6: 128-Bit Hexadecimal
                </h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 overflow-hidden">
                  <div className="flex flex-wrap justify-center font-mono text-center mb-2 gap-1">
                    <div className="w-[23%] px-1 py-1 bg-purple-100 rounded border border-purple-300 text-[10px]">2001</div>
                    <div className="w-[23%] px-1 py-1 bg-purple-100 rounded border border-purple-300 text-[10px]">0db8</div>
                    <div className="w-[23%] px-1 py-1 bg-purple-100 rounded border border-purple-300 text-[10px]">85a3</div>
                    <div className="w-[23%] px-1 py-1 bg-purple-100 rounded border border-purple-300 text-[10px]">0000</div>
                    <div className="w-[23%] px-1 py-1 bg-purple-100 rounded border border-purple-300 text-[10px]">0000</div>
                    <div className="w-[23%] px-1 py-1 bg-purple-100 rounded border border-purple-300 text-[10px]">8a2e</div>
                    <div className="w-[23%] px-1 py-1 bg-purple-100 rounded border border-purple-300 text-[10px]">0370</div>
                    <div className="w-[23%] px-1 py-1 bg-purple-100 rounded border border-purple-300 text-[10px]">7334</div>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    Uses <strong>Hexadecimal</strong> (0-9 and A-F). 8 groups of 4 characters. Total combinations: Undecillions (infinite for practical use).
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 bg-slate-50 p-5 rounded-2xl border border-slate-200">
               <div>
                 <h5 className="font-bold text-[10px] uppercase text-blue-900 mb-2">IPv4 Binary Root</h5>
                 <p className="text-[11px] text-slate-600 leading-relaxed">
                   In IPv4, we see <strong>decimal numbers</strong>, but the computer only sees <strong>binary</strong> (0s and 1s). Each octet is 8 bits.
                   <br/><span className="font-mono text-[9px] text-blue-500">11000000.10101000.00000001.00011001</span>
                 </p>
               </div>
               <div>
                 <h5 className="font-bold text-[10px] uppercase text-purple-900 mb-2">IPv6 Hexadecimal Transition</h5>
                 <p className="text-[11px] text-slate-600 leading-relaxed">
                   In IPv6, we transition to <strong>Hexadecimal</strong> because writing out 128 binary bits would be too long. Hex allows us to represent 4 bits of data with a single character (0-F).
                   <br/><span className="font-mono text-[9px] text-purple-500">2001:0DB8:AC10:FE01...</span>
                 </p>
               </div>
            </div>
            
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded text-xs text-amber-900">
               <i className="fas fa-triangle-exclamation mr-2"></i>
               <strong>INVESTIGATIVE ALERT:</strong> Many mobile carriers (like T-Mobile) use IPv6 exclusively. If you see an IP address with letters (a-f), you are looking at IPv6. Subpoenas for IPv6 often return more accurate data as they are less likely to be shared behind a standard NAT gateway.
            </div>
          </section>

          {/* Binary Octet Calculator Section */}
          <section className="bg-slate-900 text-white rounded-3xl p-8 shadow-2xl relative">
            <h3 className="text-xl font-bold mb-6 flex items-center text-blue-400">
              <i className="fas fa-binary mr-3 bg-slate-800 p-2 rounded-lg"></i> Binary Octet Review
            </h3>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
               <div className="space-y-4">
                 <p className="text-xs text-slate-400">An IPv4 address consists of 4 octets. Each octet contains <strong>8 bits</strong>.</p>
                 <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 text-sm">
                   <div className="flex justify-between border-b border-slate-700 pb-2 mb-2">
                     <span className="text-slate-500 uppercase text-[10px] font-bold">Octet Max Value</span>
                     <span className="font-mono text-blue-400 font-bold">255</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-slate-500 uppercase text-[10px] font-bold">Bits per Octet</span>
                     <span className="font-mono text-blue-400 font-bold">8</span>
                   </div>
                 </div>
               </div>
               
               <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 text-center">
                 <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Decimal to Binary</span>
                 <div className="flex items-center justify-center space-x-4">
                    <input 
                      type="number" min="0" max="255" 
                      value={calcInput} 
                      onChange={(e) => handleCalcChange(e.target.value)}
                      className="bg-slate-700 border border-slate-600 rounded-lg px-2 py-1 text-xl font-bold text-white w-20 text-center"
                    />
                    <i className="fas fa-arrow-right text-slate-600"></i>
                    <div className="text-xl font-mono text-blue-400 font-bold tracking-widest bg-slate-900 px-4 py-1 rounded-lg border border-slate-700">
                      {octetValue.toString(2).padStart(8, '0')}
                    </div>
                 </div>
               </div>
            </div>
          </section>

          {/* New Subsection for Media Security */}
          <section className="bg-white border rounded-2xl p-6 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-slate-800 flex items-center">
              <i className="fas fa-vault mr-2 text-red-600"></i> Safely Storing and Securing Sensitive Media for Case Work
            </h3>
            <div className="p-4 bg-red-50 border-l-4 border-red-600 rounded-r text-sm text-red-900 leading-relaxed">
              Investigative media, especially CSAM, is extremely sensitive. Improper handling can lead to legal dismissal of evidence or, more importantly, a second-victimization of the children involved.
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center space-x-2 mb-3 text-blue-900">
                  <i className="fas fa-clipboard-list"></i>
                  <h4 className="font-bold text-xs uppercase tracking-wider">Chain of Custody</h4>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Every person who touches the evidence must be logged. Use a formal "Chain of Custody" form to document the transfer of digital media from the point of seizure to the final storage in the evidence locker.
                </p>
              </div>

              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center space-x-2 mb-3 text-blue-900">
                  <i className="fas fa-key"></i>
                  <h4 className="font-bold text-xs uppercase tracking-wider">Encryption</h4>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  All digital evidence should be stored on encrypted hardware (e.g., BitLocker, Veracrypt, or hardware-encrypted drives). Encryption ensures that even if a drive is stolen, the sensitive media remains unviewable.
                </p>
              </div>

              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center space-x-2 mb-3 text-blue-900">
                  <i className="fas fa-unlink"></i>
                  <h4 className="font-bold text-xs uppercase tracking-wider">Air-Gapped Systems</h4>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Process all sensitive media on "Air-Gapped" workstations—computers that are physically disconnected from any network (Internet or LAN). This prevents accidental uploads or remote hacking.
                </p>
              </div>
            </div>
          </section>
        </div>
      );

    case 'media-hashes':
      return (
        <div className="space-y-10 p-4">
          <h2 className="text-2xl font-bold text-blue-900 border-b pb-2">Media Hashes & Fingerprints</h2>
          
          <section className="bg-white border rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center">
              <i className="fas fa-fingerprint mr-2 text-blue-600"></i> The "Digital Fingerprint" Concept
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              A <strong>Hash</strong> is a mathematical representation of a file's data. 
              In the context of NCMEC reports, hashes allow investigators to identify known illegal material without human analysts having to view the same trauma repeatedly. 
              <br/><br/>
              This is called the <strong>Avalanche Effect</strong>: changing just one bit of data results in a completely different, unpredictable hash output.
            </p>
          </section>

          {/* Interactive Pixel Hash Simulation */}
          <section className="bg-slate-900 text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <i className="fas fa-image text-[200px]"></i>
            </div>
            <h3 className="text-xl font-bold mb-6 flex items-center text-blue-400">
              <i className="fas fa-microscope mr-3 bg-slate-800 p-2 rounded-lg"></i> Interactive Hash Simulation
            </h3>
            
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="flex flex-col items-center space-y-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mock 4x4 Image Data (Click Pixels)</span>
                <div className="grid grid-cols-4 gap-1 p-2 bg-slate-800 rounded-lg border border-slate-700 shadow-xl">
                  {pixels.map((color, i) => (
                    <button 
                      key={i} 
                      onClick={() => togglePixel(i)}
                      style={{ backgroundColor: color }}
                      className="w-12 h-12 rounded-sm border border-black/20 hover:scale-105 active:scale-95 transition-all"
                    />
                  ))}
                </div>
                <p className="text-[10px] text-slate-500 italic">Changing one pixel changes the binary data of the "file".</p>
              </div>

              <div className="space-y-6">
                <div className="p-5 bg-slate-800 border border-slate-700 rounded-2xl shadow-inner">
                  <h4 className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-3">Live MD5 Hash Calculation</h4>
                  <div className="bg-black/50 p-4 rounded-lg border border-slate-600 font-mono text-blue-300 text-sm break-all animate-in fade-in slide-in-from-left duration-300">
                    {gridHash}
                  </div>
                </div>
                
                <div className="p-4 bg-blue-900/40 border border-blue-500/30 rounded-xl">
                  <h5 className="text-[10px] font-bold text-white uppercase tracking-widest mb-1">Investigation Point:</h5>
                  <p className="text-xs text-blue-200 leading-relaxed">
                    If this hash matches a <strong>Hash Set</strong> (like Project Vic or NCMEC's internal database), you have <strong>Probable Cause</strong> to believe the file contains known illegal content before ever opening it.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white border rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center">
              <i className="fas fa-shield-halved mr-2 text-blue-600"></i> Why Hashes Matter for Affidavits
            </h3>
            <ul className="space-y-3">
              {[
                { icon: 'fa-check-circle', title: 'File Integrity', desc: 'Proves the file hasn\'t been altered by law enforcement during processing.' },
                { icon: 'fa-search', title: 'Victim Identification', desc: 'Allows specialized units to match victims across different tips and jurisdictions.' },
                { icon: 'fa-gavel', title: 'Probable Cause', desc: 'A match on a "Known Contraband" hash set provides a strong foundation for search warrants.' }
              ].map((item, i) => (
                <li key={i} className="flex items-start space-x-3 text-xs text-slate-700">
                  <i className={`fas ${item.icon} mt-0.5 text-blue-500`}></i>
                  <div>
                    <span className="font-bold text-slate-900">{item.title}:</span> {item.desc}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      );

    case 'legal':
      return (
        <div className="space-y-6 p-4">
          <h2 className="text-2xl font-bold text-blue-900 border-b pb-2">Legal Process & Statutory Framework</h2>
          <div className="p-4 bg-slate-100 rounded-xl mb-6 text-xs text-slate-700 leading-relaxed border-l-4 border-slate-900">
            Digital investigations are governed by the <strong>Stored Communications Act (SCA) - 18 U.S.C. § 2703</strong>. This defines what legal process is needed for different levels of data.
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { id: 'preservation', title: 'Preservation', icon: 'fa-snowflake' },
              { id: 'subpoena', title: 'Subpoena', icon: 'fa-file-signature' },
              { id: 'warrant', title: 'Search Warrant', icon: 'fa-gavel' },
              { id: 'titleiii', title: 'Title III / Trap', icon: 'fa-phone-volume' }
            ].map(doc => (
              <button key={doc.id} onClick={() => setLegalDoc(doc.id)} className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center space-y-2 ${legalDoc === doc.id ? 'bg-blue-900 border-blue-900 text-white shadow-xl scale-105' : 'bg-white border-slate-200 text-slate-600 hover:border-blue-400'}`}>
                <i className={`fas ${doc.icon} text-xl`}></i>
                <span className="text-[10px] font-bold uppercase tracking-widest">{doc.title}</span>
              </button>
            ))}
          </div>

          <div className="min-h-[300px] bg-white border-2 border-slate-100 rounded-3xl p-8 shadow-inner">
            {!legalDoc ? <div className="flex flex-col items-center justify-center h-full text-slate-400"><p className="font-bold uppercase text-xs">Select a legal instrument to study</p></div> : (
              <div className="space-y-6 animate-in fade-in duration-300">
                {legalDoc === 'preservation' && (
                  <>
                    <div className="flex items-center space-x-3 text-blue-900">
                      <i className="fas fa-snowflake text-2xl"></i>
                      <h3 className="text-xl font-bold uppercase">18 U.S.C. § 2703(f) Preservation</h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      A preservation letter is a good-faith request to an ISP or ESP to freeze all account logs and content. 
                      <br/><br/>
                      <strong>Timeline:</strong> Data is held for <strong>90 days</strong> and can be renewed for an additional 90 days. 
                      <br/><strong>Standard:</strong> No judge's signature required. Send immediately to prevent log rotation.
                    </p>
                  </>
                )}
                {legalDoc === 'subpoena' && (
                  <>
                    <div className="flex items-center space-x-3 text-blue-900">
                      <i className="fas fa-file-signature text-2xl"></i>
                      <h3 className="text-xl font-bold uppercase">Administrative Subpoena (BSI)</h3>
                    </div>
                    <div className="space-y-4">
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Used to obtain <strong>Basic Subscriber Information (BSI)</strong> from an ISP or ESP. This is the first step in "unmasking" a digital user.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                          <h5 className="font-bold text-[10px] uppercase text-blue-900 mb-2">Subscriber Information</h5>
                          <ul className="text-[11px] space-y-1 text-blue-800 list-disc list-inside">
                            <li>Account Holder Name</li>
                            <li>Physical Street Address</li>
                            <li>Telephone Number</li>
                            <li>Length of Service (Start/End dates)</li>
                            <li>Means of Payment (Bank account or Credit Card info)</li>
                          </ul>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                          <h5 className="font-bold text-[10px] uppercase text-slate-900 mb-2">Network Data</h5>
                          <ul className="text-[11px] space-y-1 text-slate-800 list-disc list-inside">
                            <li><strong>IP Login History:</strong> A historical log of what IP addresses were assigned to the account.</li>
                            <li>Connection Timestamps (UTC)</li>
                            <li>Source Port logs (if available)</li>
                          </ul>
                        </div>
                      </div>
                      <p className="text-[11px] italic text-slate-500">
                        <strong>Legal Standard:</strong> Relevance to an ongoing criminal investigation. Does NOT require probable cause or a magistrate's signature in many jurisdictions (varies by local law).
                      </p>
                    </div>
                  </>
                )}
                {legalDoc === 'warrant' && (
                  <>
                    <div className="flex items-center space-x-3 text-blue-900">
                      <i className="fas fa-gavel text-2xl"></i>
                      <h3 className="text-xl font-bold uppercase">Search Warrant (Content)</h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Required for any <strong>Content</strong> (private messages, photos, cloud storage). 
                      <br/><br/>
                      <strong>Standard: Probable Cause</strong>. Must be signed by a neutral magistrate. 
                      <br/><strong>Investigative Nexus:</strong> You must link the digital evidence to a specific physical person or residence in the affidavit.
                    </p>
                  </>
                )}
                {legalDoc === 'titleiii' && (
                  <>
                    <div className="flex items-center space-x-3 text-blue-900">
                      <i className="fas fa-phone-volume text-2xl"></i>
                      <h3 className="text-xl font-bold uppercase">Title III / Trap and Trace</h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      <strong>Trap and Trace / Pen Register:</strong> Captures incoming/outgoing addressing info in <strong>real-time</strong>. Standard: Relevance.
                      <br/><br/>
                      <strong>Title III (Wiretap):</strong> Live interception of voice/data content. Requires <strong>Super Probable Cause</strong> and "Necessity" (showing that standard methods failed).
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      );

    case 'assessment':
      return (
        <div className="space-y-6 p-4 text-center">
          <i className="fas fa-comments text-7xl text-blue-900 mb-4 animate-bounce"></i>
          <h2 className="text-3xl font-extrabold text-blue-900 tracking-tight">Final Knowledge Simulation</h2>
          <p className="text-slate-600 max-w-xl mx-auto text-lg leading-relaxed">
            Practice your investigative logic by asking the <strong>Investigative Advisor AI</strong> specific questions about <strong>Report 145592831</strong>.
          </p>
          <div className="bg-blue-50 p-8 rounded-3xl border-2 border-blue-100 max-w-md mx-auto mt-8 shadow-sm text-left">
             <h4 className="font-bold text-blue-900 mb-2 uppercase text-xs tracking-widest">Training Exercise:</h4>
             <div className="space-y-3">
               <div className="bg-white p-4 rounded-xl border border-blue-200 font-mono text-[10px] text-blue-800 hover:border-blue-400 transition-all cursor-help">
                 "Advisor, what is the 'Nexus' in Report 145592831 that allows me to search the residence?"
               </div>
               <div className="bg-white p-4 rounded-xl border border-blue-200 font-mono text-[10px] text-blue-800 hover:border-blue-400 transition-all cursor-help">
                 "Which legal process should I use to get the unredacted files from ChatStream Pro?"
               </div>
               <div className="bg-white p-4 rounded-xl border border-blue-200 font-mono text-[10px] text-blue-800 hover:border-blue-400 transition-all cursor-help">
                 "Explain why NAT makes the source port critical for my Viasat subpoena."
               </div>
             </div>
          </div>
        </div>
      );

    case 'certification':
      return (
        <div className="space-y-6 p-4">
          <h2 className="text-2xl font-bold text-blue-900 border-b pb-2">Certification Exam (20 Questions)</h2>
          <div className="bg-white border-2 border-blue-50 rounded-2xl p-8 shadow-md">
            {!isExamSubmitted ? (
              <div className="space-y-8">
                {questions.map((q, idx) => (
                  <div key={idx} className="space-y-3 p-4 hover:bg-slate-50 rounded-xl transition-colors">
                    <p className="font-bold text-slate-800 text-sm">{idx + 1}. {q.q}</p>
                    <div className="grid gap-2">
                      {q.options.map((opt, oIdx) => (
                        <button key={oIdx} onClick={() => setExamAnswers({ ...examAnswers, [idx]: oIdx })} className={`p-3 text-left rounded-lg border text-xs transition-all ${examAnswers[idx] === oIdx ? 'bg-blue-600 text-white border-blue-600 shadow-md translate-x-1' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'}`}>{opt}</button>
                      ))}
                    </div>
                  </div>
                ))}
                <button onClick={handleExamSubmit} disabled={Object.keys(examAnswers).length < questions.length} className="w-full py-4 bg-blue-900 text-white rounded-xl font-bold shadow-lg disabled:opacity-50 hover:bg-blue-800 transition-all">Submit Final Exam</button>
              </div>
            ) : (
              <div className="text-center space-y-6 py-8">
                {(() => {
                  const score = Object.entries(examAnswers).filter(([idx, ans]) => questions[parseInt(idx)].correct === ans).length;
                  const percentage = (score / questions.length) * 100;
                  const passed = percentage >= 80;
                  return (
                    <>
                      <div className={`text-7xl ${passed ? 'text-green-500 animate-bounce' : 'text-red-500'}`}><i className={`fas ${passed ? 'fa-circle-check' : 'fa-circle-xmark'}`}></i></div>
                      <h3 className="text-3xl font-extrabold">{passed ? 'Training Passed!' : 'Exam Not Passed'}</h3>
                      <p className="text-xl text-slate-600">Final Score: <span className="font-bold text-slate-900">{score}/20 (${percentage}%)</span></p>
                      {!passed && <button onClick={() => { setIsExamSubmitted(false); setExamAnswers({}); }} className="px-10 py-3 bg-slate-900 text-white rounded-xl font-bold">Retake Exam</button>}
                    </>
                  );
                })()}
              </div>
            )}
          </div>
          {showNamePopup && (
            <div className="fixed inset-0 bg-slate-900/80 flex items-center justify-center z-[300] p-4 backdrop-blur-sm">
              <div className="bg-white rounded-3xl p-10 max-w-md w-full shadow-2xl space-y-6 border-t-8 border-blue-900 animate-in zoom-in duration-300">
                <div className="text-center"><i className="fas fa-medal text-6xl text-yellow-500 mb-4"></i><h3 className="text-2xl font-extrabold text-blue-900">Training Complete!</h3></div>
                <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Investigator Name & Title" className="w-full p-4 border-2 border-slate-200 rounded-2xl outline-none focus:border-blue-900 text-center font-bold text-lg" />
                <button onClick={generateCertificate} className="w-full py-4 bg-blue-900 text-white rounded-2xl font-bold text-lg shadow-xl hover:bg-blue-800 transition-all">Download Certificate</button>
              </div>
            </div>
          )}
        </div>
      );
    default:
      return <div>Select a module to begin.</div>;
  }
};
