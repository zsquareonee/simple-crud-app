import HomeLayout from "@/layouts/HomeLayout";
import HomePage from "@/pages/HomePage";
import type { RouteObject } from "react-router";

export const routes: RouteObject[] = [
  {
    Component: HomeLayout,
    children: [
      {
        index: true, Component: HomePage
      }
    ]
  }
]