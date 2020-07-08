import { http } from "./axios";

class Methods {
  async POST(_data) {
    return await http.post("", _data);
  }
}

export const methods = new Methods();
