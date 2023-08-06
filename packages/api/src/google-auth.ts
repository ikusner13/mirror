import "@total-typescript/ts-reset";
import fs from "fs/promises";
import { type Auth, google } from "googleapis";
import path from "path";
import process from "process";

const TOKEN_PATH = path.join(process.cwd(), "token.json");

export async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH, "utf-8");
    const credentials = JSON.parse(content) as Auth.JWTInput;
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

export async function getTokens() {
  const credentials = await loadSavedCredentialsIfExist();

  if (!credentials) {
    return null;
  }

  const token = await credentials.getAccessToken();

  if (!token.token) {
    return null;
  }

  return token;
}
