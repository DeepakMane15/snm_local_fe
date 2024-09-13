import { GetSadhsangatResultModel, SadhsangatDataModel } from "./sadhsangatDataModel";

export interface SewadalDataModel {
  sewadalId: number;
  personalNo: number;
  sewadalNo: string;
  recruitmentDate: Date;
  badgeBeltDate: Date;
}

export class GetSewadalResultModel {
  public data: GetSadhsangatResultModel[] = [];
  public count: number = 0;
}
