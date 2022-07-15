import * as crypto from "crypto";
import { configData } from "../configData/configData";

export const hashPwd = (p: string): string => {
  const hmac = crypto.createHmac('sha512', configData.SALT)
  hmac.update(p)
  return hmac.digest('hex')
}
