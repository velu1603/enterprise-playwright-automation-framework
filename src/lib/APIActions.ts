import { APIResponse, expect } from "@playwright/test";

export class APIActions{
  async verifyStatusCode(response: APIResponse):Promise<void>{
    await expect(response,`correct status code was not displayed`).toBeOK();
  }
}