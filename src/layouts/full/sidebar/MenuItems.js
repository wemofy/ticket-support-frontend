import { IconLayoutDashboard } from "@tabler/icons";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "All Tickets",
    icon: IconLayoutDashboard,
    href: "/dashboard",
  },
];

export default Menuitems;
