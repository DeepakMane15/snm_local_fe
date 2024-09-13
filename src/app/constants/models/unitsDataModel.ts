export interface UnitsMasterDataModel {
    name: string;
    unitNo: string;
  }

export class GetUnitsMasterResultModel {
  data: UnitsMasterDataModel[] = [];
  count: number = 0;
}