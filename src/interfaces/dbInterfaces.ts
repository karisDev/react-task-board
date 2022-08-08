import { IBoard, Language } from "./appInterfaces";

export interface IDBUserBoardsStructure {
  boards?: IBoard[];
}

export interface IDBUserSettingsStructure {
  name: string;
  language: Language;
}
