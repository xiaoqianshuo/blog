import { User, UserId } from "@xiaoqianshuo/types";

const users: User[] = [
  {
    "id": "baff7611-25c3-4e2a-895e-c3b02a869baa" as UserId,
    "email": "xiaoqianshuo@example.com",
    "name": "Xiao Qianshuo",
    "detail": {
      "age": 25,
      "gender": "male"
    }
  },
  {
    "id": "60e51a7a-258c-4398-ad4b-eb2c7109a457" as UserId,
    "email": "xiaoqianshuo@example.com",
    "name": "qianqian",
    "detail": {
      "age": 25,
      "gender": "female"
    }
  },
  {
    "id": "ac2bd7a5-c976-4ebd-9db9-1b1cd8bb1958" as UserId,
    "email": "xiaoqianshuo@example.com",
    "name": "xiaoqian",
    "detail": {
      "age": 25,
      "gender": "male"
    }
  }
];

export {users}
