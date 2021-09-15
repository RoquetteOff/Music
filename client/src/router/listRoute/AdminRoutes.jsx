import MusicLayout from "../../components/admin/MusicLayout";
import EventLayout from "../../components/admin/EventLayout";
import PictureLayout from "../../components/admin/PictureLayout";

export var AdminRoutes = [
  {
    id: 1,
    path: "/dashboard/music",
    name: "Music",
    icon: "mdi mdi-pencil-circle",
    component: MusicLayout,
  },
  {
    id: 2,
    path: "/dashboard/picture",
    name: "Picture",
    icon: "mdi mdi-pencil-circle",
    component: PictureLayout,
  },
  {
    id: 3,
    path: "/dashboard/event",
    name: "Event",
    icon: "mdi mdi-pencil-circle",
    component: EventLayout,
  },
  //   {
  //     path: "/panel",
  //     pathTo: "/dashboard/",
  //     name: "Dashboard",
  //     redirect: true,
  //   },
];

export default AdminRoutes;
