import React from "react";
import { IconList, IconGift } from "@arco-design/web-react/icon";

export const defaultRoute = "welcome";

export const routes = [
  {
    name: "Home",
    key: "welcome",
    icon: <IconGift />,
    componentPath: "welcome",
  },
  {
    name: "App listing",
    key: "list",
    icon: <IconList />,
    componentPath: "search-table",
  },
];
