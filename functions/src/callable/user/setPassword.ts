import * as functions from "firebase-functions";
import { getAuthUser } from "../../auth/getAuthUser";
import { getResetPasswordRequestData } from "../../dbAdmin/getResetPasswordRequestData";
import { setUserNewPassword } from "../../dbAdmin/setUserNewPassword";

export interface SetPasswordRequest {
  email: string;
  password: string;
  resetPasswordUserHash: string;
}

export interface SetPasswordResponse {
  error: string;
}

export const setPassword = functions.https.onCall(
  async ({
    email,
    resetPasswordUserHash,
    password,
  }: SetPasswordRequest): Promise<SetPasswordResponse> => {
    const authUserData = await getAuthUser(email);

    if (!authUserData) {
      return {
        error: `User not found`,
      };
    }

    const restDoc = await getResetPasswordRequestData(email, resetPasswordUserHash);
    if (!restDoc) {
      return {
        error: `Incorrect url`,
      };
    }
    try {
      await setUserNewPassword(email, password);
    } catch (e) {
      return {
        error: "Unacceptable password. Change password",
      };
    }

    return {
      error: "",
    };
  }
);
