import { SadhsangatDataModel } from "./models/sadhsangatDataModel";

export enum FilterType {
  NONE,
  SEWADAL,
}

export interface TableColumnModel {
  key: keyof SadhsangatDataModel;
  value: string;
  child?: TableColumnModel;
  tootltip?: boolean;
  isSortable: boolean;
}

export enum SortByMaster {
  NAME = "name",
}

export enum SortType {
  ASC = "asc",
  DESC = "desc",
}

export const SearchPlaceholders = {
  NAME: "Search by name"
}
