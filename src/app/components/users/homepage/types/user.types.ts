export interface serviceData {
categoryInfo: any;
    _id: string;
    name: string;
    email: string;
    phone: number;
    serviceName: String,
    description: String,
    category: string,
    amount: String,
    files: Array<File>,
    filter?: boolean
    isApproved: boolean
    isVerified?: boolean
    isBlocked: boolean
    images:Array<string>
}