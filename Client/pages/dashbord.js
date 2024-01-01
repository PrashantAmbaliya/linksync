import React, { useContext } from "react";

import LinkIcon from "@mui/icons-material/Link";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import DashboardHeader from "@/components/dashboardHeader";
import UserContext from "@/context/userContext";

export default function dashbord() {
  const { UserData, setUserData } = useContext(UserContext);

  return (
    <div className="h-screen flex flex-col gap-5 bg-gray-100 p-10">
      <DashboardHeader avatar={UserData?.avatar} handle={UserData?.name} />
      <main className="flex flex-col gap-5">
        <section className="cursor-pointer flex flex-wrap gap-5 justify-around">
          <div className="card flex flex-1 w-full items-center gap-8 p-8 shadow-md bg-white rounded-lg">
            <div>
              <LinkIcon fontSize="large" />
            </div>
            <div>
              <h3 className="font-bold">{UserData?.links?.length}</h3>
              <p>Links</p>
            </div>
          </div>
          <div className="cursor-pointer card flex flex-1 w-full items-center gap-8 p-8 shadow-md rounded-lg bg-white">
            <div>
              <TrendingUpIcon fontSize="large" />
            </div>
            <div>
              <h3 className=" font-bold">7%</h3>
              <p>Avrage Growth</p>
            </div>
          </div>
          <div className="cursor-pointer card flex flex-1 w-full items-center gap-8 p-8 shadow-md rounded-lg bg-white">
            <div>
              <TrendingDownIcon fontSize="large" />
            </div>
            <div>
              <h3 className="font-bold">23%</h3>
              <p>Growsth Down</p>
            </div>
          </div>
          <div className="cursor-pointer card flex flex-1 w-full items-center gap-8 p-8 pl-10 rounded-lg shadow-md bg-white">
            <div>
              <AutoGraphIcon fontSize="large" />
            </div>
            <div>
              <h3 className="font-bold">10</h3>
              <p>Booming Links</p>
            </div>
          </div>
        </section>
        <section></section>
      </main>
    </div>
  );
}
