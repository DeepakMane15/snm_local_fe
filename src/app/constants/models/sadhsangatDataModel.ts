import { SewadalDataModel } from "./sewadalDataModel";

export interface SadhsangatDataModel extends SewadalDataModel {
  id: number;
  name: string;
  unitNo: number;
  unitName: string;
  area: string;
  address: string;
  pincode: string;
  contactNo: string;
  gender: number;
  dob: Date;
  age: number;
  qualification: string;
  occupation: string;
  dateOfGyan: Date;
  bloodGroup: string;
  familyId: number;
  isSewadal: boolean;
}

export class GetSadhsangatResultModel {
  public data: Partial<SadhsangatDataModel[]> = [];
  public count: number = 0;
}

export interface MemberFormModel {
  name: string;
  gender: string;
  dob: string;
  qualification: string;
  occupation: string;
  dateOfGyan: string;
  bloodGroup: string;
  isSewadal: boolean;
  personalNo?: string;
  sewadalNo?: string;
  recruitmentDate?: string;
  badgeBeltDate?: string;
}

export interface SadhSangatAddFormModel {
  name: string;
  unitNo:number;
  area: string;
  address: string;
  pincode: string;
  contactNo: string;
  gender: string;
  dob: string;
  qualification: string;
  occupation: string;
  dateOfGyan: string;
  bloodGroup: string;
  isSewadal: boolean;
  personalNo?: string;
  sewadalNo?: string;
  recruitmentDate?: string;
  badgeBeltDate?: string;
  password1: string;
  country: string;
  state: string;
  city: string;
  members: MemberFormModel[];
}

