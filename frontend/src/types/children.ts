export interface ChildFormValues {
  _id?: string;
  name: string;
  age: number | "";
  allergies: string[];
  medicalNotes: string[];
  emergencyPhone: string;
  avatarUrl: string | null;
  // isLost?: boolean;
  badgeId: string | null; // обов'язково
}
