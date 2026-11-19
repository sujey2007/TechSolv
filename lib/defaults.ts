import type { CompanySettings, Industry, Service } from "./types";

export const defaultSettings: CompanySettings = {
  name: "Techsolv",
  tagline: "Security, networking & communication systems for businesses in Chennai",
  contactPerson: "Hariprasad Padmanaban",
  primaryPhone: "90944 99449",
  secondaryPhone: "97109 09090",
  emails: ["zenithilkumar@gmail.com", "eventlakshmi@gmail.com"],
  address: "1, Pandian Street, Muthamil Nagar",
  city: "Chennai – 600 075",
  hours: "Mon – Sat, 9:30 AM – 7:00 PM",
  whatsapp: "919094499449",
  about:
    "Techsolv designs, installs and maintains the systems that keep a workplace connected and secure — structured cabling and fibre networks, CCTV surveillance, biometric access, alarms, vehicle tracking and EPABX telephony. We work with offices, schools, hospitals, retail stores, warehouses and residential communities across Chennai, and we stay with our clients long after installation through annual maintenance contracts.",
  industriesTitle: "Trusted across every kind of premises",
  industriesIntro:
    "Every site is different. We size and configure each solution for the way your space is used, the people in it and what needs protecting.",
};

export const defaultIndustries: Omit<Industry, "id">[] = [
  { label: "Government works", description: "Departments, public offices & tender projects", icon: "landmark", order: 1 },
  { label: "Corporate offices", description: "IT parks, co-working & business centres", icon: "building", order: 2 },
  { label: "Schools & colleges", description: "Campuses, labs, hostels & classrooms", icon: "school", order: 3 },
  { label: "Hospitals & clinics", description: "Wards, pharmacies & diagnostic centres", icon: "hospital", order: 4 },
  { label: "Retail & showrooms", description: "Shops, jewellers & supermarkets", icon: "store", order: 5 },
  { label: "Warehouses & factories", description: "Plants, godowns & logistics yards", icon: "warehouse", order: 6 },
  { label: "Hotels & hospitality", description: "Hotels, restaurants & banquet halls", icon: "bed", order: 7 },
  { label: "Apartments & villas", description: "Gated communities & independent homes", icon: "home", order: 8 },
];

export const defaultServices: Omit<Service, "id">[] = [
  {
    slug: "networking",
    title: "Networking",
    tagline: "Cat 6 & fibre optic infrastructure",
    summary:
      "Structured Cat 6 cabling, fibre optic backbones, racks and Wi-Fi built for speed and long-term reliability.",
    description:
      "A network is only as dependable as the cabling underneath it. We plan, lay, terminate and certify structured cabling for offices, campuses and industrial sites — from a single floor to multi-building fibre backbones. Every run is labelled, tested and documented so your IT team always knows what goes where.",
    features: [
      "Cat 6 / Cat 6A structured cabling with certified terminations",
      "Single-mode & multi-mode fibre optic laying, splicing and testing",
      "Network racks, patch panels and cable management",
      "Switches, routers, firewalls and enterprise Wi-Fi",
      "Labelling, test reports and as-built documentation",
    ],
    image: "/images/networking.jpg",
    icon: "network",
    order: 1,
    published: true,
  },
  {
    slug: "maintenance-printing",
    title: "Maintenance Contract & Printing Consumables",
    tagline: "AMC for IT & office equipment",
    summary:
      "Annual maintenance contracts for computers, printers and peripherals, plus genuine toner, ink and consumables.",
    description:
      "Downtime costs more than maintenance. Our annual maintenance contracts cover preventive check-ups, priority breakdown support and spare-part management for desktops, laptops, printers and peripherals. We also supply genuine and high-yield printing consumables, delivered when you need them.",
    features: [
      "Comprehensive & non-comprehensive AMC plans",
      "Scheduled preventive maintenance visits",
      "Priority breakdown support with defined response times",
      "Toner, ink cartridges, drums and printer spares",
      "Asset register and service history for every device",
    ],
    image: "/images/printer.jpg",
    icon: "wrench",
    order: 2,
    published: true,
  },
  {
    slug: "cctv",
    title: "CCTV Camera",
    tagline: "Installation & maintenance",
    summary:
      "HD and IP surveillance systems with remote mobile viewing, night vision and reliable recording.",
    description:
      "We design surveillance around how your premises are actually used — entrances, cash counters, parking, perimeters and blind spots. From a four-camera shop setup to a multi-site IP system with centralised monitoring, we handle survey, installation, configuration and ongoing maintenance.",
    features: [
      "HD analog & IP camera systems (dome, bullet, PTZ)",
      "DVR / NVR setup with optimised storage and retention",
      "Live viewing and playback on mobile and desktop",
      "Night vision, motion alerts and perimeter coverage",
      "Periodic health checks and maintenance contracts",
    ],
    image: "/images/cctv.jpg",
    icon: "camera",
    order: 3,
    published: true,
  },
  {
    slug: "alarm-tracking",
    title: "Burglar Alarm & Vehicle / Asset Tracking",
    tagline: "Intrusion alerts and live GPS tracking",
    summary:
      "Intrusion and burglar alarm systems, plus GPS tracking for vehicles, fleets and valuable assets.",
    description:
      "Know the moment something is wrong. Our wired and wireless alarm systems combine door sensors, motion detectors and sirens with instant phone alerts. For moving assets, our GPS tracking solutions give you live location, route history, geo-fencing and usage reports for every vehicle in your fleet.",
    features: [
      "Wired & wireless burglar / intrusion alarm panels",
      "Door, window, motion and glass-break sensors",
      "Instant SMS / app alerts and auto-dialler",
      "GPS vehicle tracking with live location and route history",
      "Geo-fencing, ignition alerts and asset tracking tags",
    ],
    image: "/images/tracking.jpg",
    icon: "alarm",
    order: 4,
    published: true,
  },
  {
    slug: "biometrics",
    title: "Biometrics",
    tagline: "Door access & attendance monitoring",
    summary:
      "Fingerprint, face and card-based access control and attendance systems with payroll-ready reports.",
    description:
      "Control who enters where, and record when. We deploy fingerprint, face recognition and RFID card systems for door access and time attendance, integrated with electromagnetic locks and exit buttons. Attendance data flows into clean reports your HR and payroll teams can use directly.",
    features: [
      "Fingerprint, face recognition & RFID card readers",
      "Door access control with EM locks and exit switches",
      "Time attendance with shift and overtime reports",
      "Multi-door, multi-site centralised management",
      "Software setup, data export and staff training",
    ],
    image: "/images/biometric.jpg",
    icon: "fingerprint",
    order: 5,
    published: true,
  },
  {
    slug: "epabx",
    title: "EPABX",
    tagline: "Installation & maintenance",
    summary:
      "Intercom and EPABX / IP-PBX telephone systems that connect every desk, floor and branch.",
    description:
      "Clear internal communication keeps a business moving. We install and maintain analog, hybrid and IP-based EPABX systems with extensions, call routing, auto-attendant and voicemail — sized for your team today and easy to expand tomorrow.",
    features: [
      "Analog, hybrid & IP-PBX systems",
      "Extension cabling, desk phones and intercom",
      "Auto-attendant (IVR), call routing and voicemail",
      "Integration with existing lines and SIP trunks",
      "Programming changes and maintenance support",
    ],
    image: "/images/epabx.jpg",
    icon: "phone",
    order: 6,
    published: true,
  },
];
