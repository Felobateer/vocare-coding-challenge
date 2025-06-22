export interface AppointmentResponse {
  id: string;
  created_at: string;
  updated_at: string;
  start: string;
  end: string;
  location: string;
  patient: string;
  attachments?: string[];
  category?: string;
  notes?: string;
  title: string;
}

export interface AppointmentRequest {
  start: string;
  end: string;
  location: string;
  patient: string;
  attachments?: string[];
  category?: string;
  notes?: string;
  title: string;
}
