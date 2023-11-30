export class UserRegister {
  name!: string
  email!: string
  phone!: number
  password!: string
  confirmPassword!: string
}
export interface ILoginResponse {
  id: any
  access_token: string;
  message: string;
  verified: boolean;
  email: string;
}
export interface ISignUpResponse {
  id: any
  access_token: string;
  message: string;
  email: string;
}

export interface IGoogleLoginResponse {
  access_token: string;
  message: string;
}

export interface IServicerListResponse {
  servicesFind: [];
}

export interface IOtpVerificationResponse {
  message: string;
  otp: string;
  access_token: string;
}

export interface IServicerDetailsResponse {
  servicesFind: {
    _id: string;
    companyName: string;
    email: string;
    phone: number;
  };
  wallet: number | undefined;
}

export interface IBookNowResponse {
  message: string;
  inserted: {};
  reducedAmt: number;
}

export interface IBookingsListResponse {
  bookings: [];
}

export interface IUserInboxResponse {
  message: string;
  inbox: [];
  service: []
}
export interface IVerifyPaymentResponse {
  message: string;
}
export interface IUserProfile {
  image: any
  _id: string;
  name: string;
  email: string;
  phone: number;
  password: string;
  isBlocked: boolean;
  isVerified: boolean;
  googleAuth: boolean;
  inbox: [];
  wallet: number;
  address: [];
  walletHistory: [];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IUserProfileResponse {
  user: IUserProfile;
}

interface IUser {
  _id: string;
}

interface IMessage {
  text: string;
  sender: any;
  receiver: any;
  senderType: string;
  receiverType: string;
  time: Date;
  _id: string;
}

interface IRoom {
  users: string[];
  userRead: boolean;
  professionalRead: boolean;
  _id: string;
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface IGetRecentChatsResponse {
  id: string
  message: IRoom | IUser;
  userId: string;
}

export interface IReview {
  _id: string;
  servicer: string;
  user: string;
  review: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  users: [];
}
