import {
  useQuery
} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import MainLayout
from "../../layouts/MainLayout";

import {
  getProjects
} from "../../services/projectService";

export default function Projects() {

  const {

      data,
      isLoading,
      error

  } = useQuery({

      queryKey: ["projects"],

      queryFn:
          getProjects
  });

  const navigate = useNavigate();

  if (isLoading) {

      return (
          <MainLayout>
              Loading...
          </MainLayout>
      );
  }

  if (error) {

      return (
          <MainLayout>
              Error Loading Projects
          </MainLayout>
      );
  }

  return (

      <MainLayout>

          <h1
              className="
              text-3xl
              font-bold
              mb-6
              "
          >
              Projects
          </h1>

          <div
              className="
              grid
              grid-cols-3
              gap-4
              "
          >

              {data?.map(
                  (project:any) => (

                  <div
    key={project.id}
    className="
    bg-white
    p-5
    rounded-xl
    shadow
    border
    hover:shadow-lg
    transition
    "
>

    <h2
        className="
        text-xl
        font-semibold
        "
    >
        {project.name}
    </h2>

    <p
        className="
        text-slate-500
        mt-2
        "
    >
        {project.description}
    </p>

    <button
        onClick={() =>
            navigate(
                `/projects/${project.id}`
            )
        }
        className="
        mt-4
        bg-blue-600
        text-white
        px-4
        py-2
        rounded-lg
        hover:bg-blue-700
        "
    >
        View Project
    </button>

</div>
              ))}
          </div>

      </MainLayout>
  );
}