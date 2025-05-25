export interface UserData {
  id: string;
  name: string;
  email: string;
  totalAverageWeightRatings: number;
  numberOfRents: number;
  recentlyActive: number;
  userToken: string;
}

export interface UpdateUserData {
  name: string;
  email: string;
  totalAverageWeightRatings: number;
  numberOfRents: number;
  userToken?: string;
}
