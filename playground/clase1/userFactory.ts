import type { LoginCredentials, LoginExpectedResult } from "./types";

/**
 * Construye un usuario de prueba para escenarios de login.
 */
export const buildUser = (
  username: string,
  password: string,
  expectedResult: LoginExpectedResult,
): LoginCredentials => {
  return {
    username,
    password,
    expectedResult,
  };
};

import type { LoginCredentials, LoginExpectedResult } from "./types";
/**
 * Construye un usuario de prueba para escenarios de login.
 */
export const buildUser = (
  username: string,
  password: string,
  expectedResult: LoginExpectedResult,
): LoginCredentials => {
  return {
    username,
    password,
    expectedResult,
  };
};
