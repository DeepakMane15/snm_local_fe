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

export class MemberFormModel {
  public name: string;
  public contactNo: string;
  public gender: number;
  public dob: string;
  public qualification: string;
  public occupation: string;
  public dateOfGyan: string;
  public bloodGroup: string;
  public isSewadal: boolean;
  public personalNo?: string;
  public sewadalNo?: string;
  public recruitmentDate?: string;
  public badgeBeltDate?: string;

  constructor() {
    this.name = "";
    this.contactNo = "";
    this.gender = 1;
    this.dob = "";
    this.qualification = "";
    this.occupation = "";
    this.dateOfGyan = "";
    this.bloodGroup = "";
    this.isSewadal = false;
  }
}

export class SadhSangatAddFormModel {
  public name: string;
  public unitNo: number;
  public area: string;
  public address: string;
  public pincode: string;
  public contactNo: string;
  public gender: number;
  public dob: string;
  public qualification: string;
  public occupation: string;
  public dateOfGyan: string;
  public bloodGroup: string;
  public isSewadal: boolean;
  public personalNo?: string;
  public sewadalNo?: string;
  public recruitmentDate?: string;
  public badgeBeltDate?: string;
  public members: MemberFormModel[];

  constructor() {
    this.name = "";
    this.unitNo = 0;
    this.area = "";
    this.address = "";
    this.pincode = "";
    this.contactNo = "";
    this.gender = 1;
    this.dob = "";
    this.qualification = "";
    this.occupation = "";
    this.dateOfGyan = "";
    this.bloodGroup = "";
    this.isSewadal = false;
    this.members = [new MemberFormModel()];
  }
}
