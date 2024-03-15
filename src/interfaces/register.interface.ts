export interface RegisterForm {
  name: string;
  firstLastName: string;
  secondLastName: string;
  email: string;
  phoneNumber: string;
  user: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterInterface {
  TransactionId: string;
  Body: boolean;
  EncryptedBody: null;
  SecurityData: null;
  IsOK: boolean;
  Messages: null;
  ResponseCode: number;
}
