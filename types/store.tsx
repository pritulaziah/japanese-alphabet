import { Dispatch } from "react";
import { AlphabetTypes, AlphabetForms } from "types/alphabet";

export interface State {
  visibleTypes: AlphabetTypes[];
  form: AlphabetForms;
}

export enum ActionTypes {
  ChangeTypes = "CHANGE_VISIBLE_TYPES",
  ChangeForm = "CHANGE_FORM",
}

export type Action =
  | { type: ActionTypes.ChangeTypes; payload: AlphabetTypes[] }
  | { type: ActionTypes.ChangeForm; payload: AlphabetForms };

export interface Store {
  state: State;
  dispatch: Dispatch<Action>;
}
