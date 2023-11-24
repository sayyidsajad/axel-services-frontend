export interface ChatData {
    receiverType: string
    senderType: string
    text: string
    receiver: string
    serviceName: string
    companyName: string
}
export interface Data {
    _id: string;
    users: string[];
    userRead: boolean;
    professionalRead: boolean;
    messages: [];
    createdAt: string;
    updatedAt: string;
    __v: number;
  }