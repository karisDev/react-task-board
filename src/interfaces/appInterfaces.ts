// for now as an ID use unix timestamp
// since we don't create many tasks on a single user at once
export interface ITask {
  id?: number; // not required because we generate it before sending in Firestore.ts
  title: string;
  body?: string;
  isFinnished?: boolean;
}
// create enum of languages
export enum Language {
  en = "English",
  ru = "Russian",
}
export interface IBoard {
  id: number;
  title: string;
  tasks?: ITask[];
}
