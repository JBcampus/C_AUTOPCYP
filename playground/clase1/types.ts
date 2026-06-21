<<<<<<< HEAD
export type LoginExpectedResult = 'success' | 'locked' | 'invalid' 
 
export interface LoginCredentials { 
  username: string 
  password: string 
  expectedResult: LoginExpectedResult 
} 
=======
export type LoginExpectedResult = "success" | "locked" | "invalid";
export interface LoginCredentials {
  username: string;
  password: string;
  expectedResult: LoginExpectedResult;
}
>>>>>>> d4f3d6c (test: clase 1 - strutura base, configurvion inicial)
