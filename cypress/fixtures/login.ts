export interface LoginCase {
  caseName: string;
  type: "positive" | "negative";
  username: string;
  password: string;
  expectedPath: string;
  expectedMessage: string;
}
