import { e2e } from "../index";

export const login = (userId: string, password: string) => {
  e2e().logToConsole("Loggin with userId", userId);
};
