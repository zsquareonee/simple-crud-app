import type { User } from "@/mocks/UserMock";
import { createContext } from "react";

export const userContext = createContext<{
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  update: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>
} |
  null>(null)