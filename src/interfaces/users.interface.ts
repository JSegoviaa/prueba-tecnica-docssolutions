export interface SearchForm {
  name: string;
}

export interface GetUsers {
  TransactionId: string;
  Body: UserBody[];
  EncryptedBody: null;
  SecurityData: null;
  IsOK: boolean;
  Messages: null;
  ResponseCode: number;
}

export interface UserBody {
  Id: number;
  Username: string;
  Password: null;
  Name: string;
  FatherLastName: string;
  MotherLastName: string;
  Active: boolean;
  Locked: boolean;
  CreationDate: string;
  Tenant_Id: null;
  Email: null | string;
  PhoneNumber: string;
  Metadata: Metadatum[];
  Roles: Role[];
}

export interface Metadatum {
  Name: string;
  GroupName: string;
  Value: string;
}

export interface Role {
  Id: number;
  Name: Name;
}

export enum Name {
  Agente = 'Agente',
  UsuarioAutoconsumo = 'Usuario Autoconsumo',
  UsuarioTradicional = 'Usuario Tradicional',
}
