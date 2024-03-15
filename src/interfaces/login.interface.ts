export interface LoginInterface {
  TransactionId: string;
  Body: Body;
  EncryptedBody: null;
  SecurityData: null;
  IsOK: boolean;
  Messages: null;
  ResponseCode: number;
}

export interface Body {
  UserLoginData: UserLoginData;
  JWTExpireTimeOfflineMinutes: number;
  Token: string;
}

export interface UserLoginData {
  Id: number;
  Username: string;
  Name: string;
  FatherLastName: string;
  MotherLastName: string;
  Email: string;
  PhoneNumber: string;
  Metadata: Metadatum[];
  SecurityLoginData: SecurityLoginData;
  CurrentFileId: number;
}

export interface Metadatum {
  Name: string;
  GroupName: string;
  Value: string;
}

export interface SecurityLoginData {
  Roles: Role[];
  Applications: Application[];
}

export interface Application {
  Id: number;
  Name: string;
  Modules: Module[];
}

export interface Module {
  Id: number;
  Name: string;
  Functions: Role[];
}

export interface Role {
  Id: number;
  Name: string;
}

export interface LoginForm {
  email: string;
  password: string;
}
