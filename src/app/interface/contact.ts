  import { Methods } from "../enums/enums";


  export interface Contact {
    id?: number;
    name: string;
    image: File | string; 
    role: string;
    poleName: string;
    poleId?: number;
  }

  export interface MetaData {
    created_at: Date;
    updated_at: Date;
  }

  export interface IContactDialogData {
    method?: Methods,
    contact?: Contact
  }