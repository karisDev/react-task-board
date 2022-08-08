import { doc, getDoc, setDoc } from "@firebase/firestore";
import { auth, db } from "./firebaseConfig";
import { IBoard, ITask, Language } from "../interfaces/appInterfaces";
import {
  IDBUserSettingsStructure,
  IDBUserBoardsStructure,
} from "../interfaces/dbInterfaces";
import { useContext } from "react";
import { AuthUserContext } from "./AuthUserContext";

export const createNewBoard = async (boardName: string): Promise<IBoard> => {
  const board: IBoard = {
    title: boardName,
    tasks: [] as ITask[],
    id: Date.now(),
  };
  if (auth.currentUser) {
    const boardsRef = doc(db, "users/" + auth.currentUser.uid + "/data/boards");
    // ты остановился тут
    let currentBoards = (
      await getDoc(boardsRef)
    ).data() as IDBUserBoardsStructure;
    if (!currentBoards) {
      currentBoards = {
        boards: [],
      };
    }
    currentBoards.boards!.push(board);
    await setDoc(boardsRef, currentBoards);
  }
  return board;
};

export const createUserSettings = async (name: string, language: Language) => {
  if (auth.currentUser) {
    const userRef = doc(db, "users/" + auth.currentUser.uid + "/data/settings");
    const newSettings: IDBUserSettingsStructure = {
      name: name,
      language: language,
    };
    await setDoc(userRef, newSettings);
  }
};

export const getUserBoards = async () => {
  if (auth.currentUser) {
    const userRef = doc(db, "users/" + auth.currentUser.uid + "/data/boards");
    const boards = (await getDoc(userRef)).data() as IDBUserBoardsStructure;
    return boards;
  }
  return null;
};

export const getUserSettings = async () => {
  if (auth.currentUser) {
    const userRef = doc(db, "users/" + auth.currentUser.uid + "/data/settings");
    const settings = (await getDoc(userRef)).data() as IDBUserSettingsStructure;
    return settings;
  }
  return null;
};

export const updateTask = async (boardId: number, updatedTask: ITask) => {
  if (auth.currentUser) {
    const boardsRef = doc(db, "users/" + auth.currentUser.uid + '/data/boards');
    const boards = (await getDoc(boardsRef)).data() as IDBUserBoardsStructure;

    const boardIndex = boards.boards?.findIndex((board) => board.id == boardId);

    if (boardIndex == undefined || !boards.boards) {
      throw "Board with this ID doesn't exist";
    }
    if (!boards.boards[boardIndex].tasks) {
      boards.boards[boardIndex].tasks = [];
    }

    boards.boards[boardIndex].tasks! = boards.boards[boardIndex].tasks!.filter(task => task.id != updatedTask.id);
    boards.boards[boardIndex].tasks!.push(updatedTask);

    await setDoc(boardsRef, boards);
}
};

export const createNewTask = async (boardId:number, title:string, description?:string) => {
    if (auth.currentUser) {
        const boardsRef = doc(db, "users/" + auth.currentUser.uid + '/data/boards');
        const boards = (await getDoc(boardsRef)).data() as IDBUserBoardsStructure;

        const boardIndex = boards.boards?.findIndex((board) => board.id == boardId);

        if (boardIndex == undefined || !boards.boards) {
          throw "Board with this ID doesn't exist";
        }
        if (!boards.boards[boardIndex].tasks) {
          boards.boards[boardIndex].tasks = [];
        }

        const task:ITask = {
          id: Date.now(),
          isFinnished: false,
          title: title,
          body: description
        }
        boards.boards[boardIndex].tasks!.push(task);

        // add new task to db
        await setDoc(boardsRef, boards);
    }
}

export const deleteTask = async (taskId: number, boardId: number) => {
  if (auth.currentUser) {
    const boardsRef = doc(db, "users/" + auth.currentUser.uid + '/data/boards');
    const boards = (await getDoc(boardsRef)).data() as IDBUserBoardsStructure;
    const boardIndex = boards.boards?.findIndex((board) => board.id == boardId);
    
    if (boardIndex == undefined || !boards.boards) {
      throw "Board with this ID doesn't exist";
    }
    boards.boards[boardIndex].tasks! = boards.boards[boardIndex].tasks!.filter(task => task.id != taskId);
    await setDoc(boardsRef, boards);
  }
}
