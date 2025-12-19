
import { TutorialModule } from './types';

export const TUTORIAL_MODULES: TutorialModule[] = [
  {
    id: 'intro',
    title: 'NCMEC & The Mandate',
    description: 'Understand the legal framework (18 U.S.C. § 2258A) and the reporting mandate.',
    icon: 'fa-building-columns'
  },
  {
    id: 'structure',
    title: 'Reading the Report',
    description: 'Interactive breakdown of the NCMEC standard report format.',
    icon: 'fa-file-invoice'
  },
  {
    id: 'evidence',
    title: 'Processing Evidence',
    description: 'Deep dive into IPs, User Agents, NAT, and persistent Device IDs.',
    icon: 'fa-microscope'
  },
  {
    id: 'media-hashes',
    title: 'Media Hashes & Fingerprints',
    description: 'Interactive simulation of MD5/SHA1 hashes and the digital fingerprint concept.',
    icon: 'fa-fingerprint'
  },
  {
    id: 'legal',
    title: 'Legal Process & Service',
    description: 'Interactive guide to Subpoenas, Warrants, Orders, and Title III.',
    icon: 'fa-gavel'
  },
  {
    id: 'assessment',
    title: 'Final Knowledge Check',
    description: 'Test your ability to extract actionable leads from a tip.',
    icon: 'fa-check-double'
  },
  {
    id: 'certification',
    title: 'Certification Exam',
    description: 'Complete the 20-question final test to earn your training certificate.',
    icon: 'fa-certificate'
  }
];

export const MOCK_REPORT_DATA = {
  reportId: "145592831",
  priority: "2",
  received: "11-12-2024 19:45:22 UTC",
  incidentType: "Apparent Child Sexual Abuse Material (CSAM)",
  espName: "ChatStream Pro",
  ispName: "Viasat Global",
  publicIp: "73.144.2.119",
  sourcePort: "54231",
  machineId: "HW-B921-X001",
  userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  advertiserId: "79A5B3E2-1A4C-4F91-B7D8-9A2E1C037073",
  files: [
    { name: "IMG_9281.jpg", md5: "e99a18c428cb38d5f260853678922e03", sha1: "7b502e6aa8593a2e37989921f003a2e3707334" }
  ],
  submitter: {
    name: "Samual Vance",
    location: "Cedar Rapids, IA US",
    phone: "319-555-0199",
    email: "svance.investigations@provider.net",
    ani: "319-555-0199"
  },
  victim: {
    name: "Taylor Quinn",
    relation: "Neighbor",
    age: "13",
    location: "Cedar Rapids, IA US"
  },
  narrative: "Reporting party states they observed a neighbor showing what appeared to be illicit images to a group of minors in a backyard setting. Reporting party took a photo of the suspect's device screen which appeared to be logged into a chat platform. Suspect was using a home Wi-Fi network provided by local ISP. The device appeared to be a newer model PC laptop.",
  leContact: {
    agency: "Iowa Department of Public Safety",
    officer: "Sarah Miller",
    location: "Des Moines, IA",
    email: "miller.s@dps.state.ia.us"
  }
};
