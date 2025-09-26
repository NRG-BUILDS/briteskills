export type User = {
  id: number;
  email: string;
  is_agent: boolean;
  is_landlord: boolean;
  first_name: string;
  last_name: string;
  profile: UserProfile;
};
export interface UserProfile {
  id: number;
  phone_number?: string;
  country?: string;
  state?: string;
  city?: string;
  street?: string;
  profile_picture?: string | null;
}
