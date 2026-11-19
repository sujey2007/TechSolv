export type IconName =
  | "network"
  | "wrench"
  | "camera"
  | "alarm"
  | "fingerprint"
  | "phone";

export interface Service {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  description: string;
  features: string[];
  image: string;
  icon: IconName;
  order: number;
  published: boolean;
}

export interface CompanySettings {
  name: string;
  tagline: string;
  contactPerson: string;
  primaryPhone: string;
  secondaryPhone: string;
  emails: string[];
  address: string;
  city: string;
  hours: string;
  whatsapp: string;
  about: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  quote: string;
  order: number;
}

export type EnquiryStatus = "new" | "contacted" | "closed";

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  status: EnquiryStatus;
  createdAt: number;
}
