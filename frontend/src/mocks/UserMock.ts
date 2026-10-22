export interface User {
  id: number,
  name: string,
  email: string,
  age: number,
  bio: string
}


export const usersMock: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john123@gmail.com",
    age: 30,
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea"
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane123@gmail.com",
    age: 23,
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."
  },
] 