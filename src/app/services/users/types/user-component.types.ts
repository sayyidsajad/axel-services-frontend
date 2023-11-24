export interface IBooking {
  _id: string;
  date: string;
  time: string;
  bookingId: string;
  user: string;
  service: string;
  approvalStatus: string;
  paymentStatus: string;
  total: number;
  createdAt: string;
  updatedAt: string;
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