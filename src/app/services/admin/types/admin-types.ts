export interface IServicer {
    approvals: any;
    _id: string;
    companyName: string;
    email: string;
    phone: number;
    password: string;
    images: string[];
    isBlocked: boolean;
    isApproved: boolean;
    isVerified: boolean;
    __v: number;
    address: string;
    amount: number;
    category: string;
    description: string;
    image: string;
    serviceName: string;
  }

  export interface IUser {
    users: any;
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
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  }

  export interface ICategory {
    categories: any;
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
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  }

export interface IBooking {
    bookings: any;
    _id: string;
    date: string;
    time: string;
    bookingId: string;
    user: string;
    service: string;
    approvalStatus: string;
    paymentStatus: string;
    total: number;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    services: {
      _id: string;
      companyName: string;
      email: string;
      phone: number;
      password: string;
      images: string[];
      isBlocked: boolean;
      isApproved: boolean;
      isVerified: boolean;
      __v: number;
      address: string;
      amount: number;
      category: string;
      description: string;
      image: string;
      serviceName: string;
    };
  }

  export interface IService {
    services: any;
    _id: string;
    companyName: string;
    email: string;
    phone: number;
    password: string;
    images: string[];
    isBlocked: boolean;
    isApproved: boolean;
    isVerified: boolean;
    __v: number;
    address: string;
    amount: number;
    category: string;
    description: string;
    image: string;
    serviceName: string;
  }

 export interface IDashboardReport {
    currentMonthEarnings: any;
    currentYearEarning: any;
    approvalStatus: any;
    year?: number | null;
    month?: number | null;
    totalEarnings: number;
    profitValue: number;
  }
  
 export interface IBanner {
    banners: any;
    _id: string;
    bannerName: string;
    description: string;
    images: string[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  }