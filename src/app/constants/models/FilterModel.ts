import { KeyValuePair } from "tailwindcss/types/config";
import { FilterType } from "../AppEnum";

export class FilterModel {
  public label: string;
  public type: FilterType;
  public options: FilterOption[];
  public selectedData: FilterOption | undefined
  public isMandatory: boolean;

  constructor() {
    this.label = "";
    this.type = FilterType.NONE;
    this.options = [];
    this.selectedData = undefined;
    this.isMandatory = false;
  }
}

export interface FilterOption {
  label: string;
  id: number
}
