import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  generateSprintPlan,
  approveSprintPlan,
  getProjectSprints
} from "../../services/sprintService";

export default function SprintTab() {

  const { projectId } = useParams();

  const [capacity, setCapacity] =
    useState(60);

  const [loading, setLoading] =
    useState(false);

  const [approving, setApproving] =
    useState(false);

  const [savedLoading, setSavedLoading] =
    useState(true);

  const [plan, setPlan] =
    useState<any[]>([]);

  const [approvedSprints, setApprovedSprints] =
    useState<any[]>([]);

  useEffect(() => {

    loadApprovedSprints();

  }, [projectId]);

  const loadApprovedSprints =
    async () => {

      try {

        setSavedLoading(true);

        const data =
          await getProjectSprints(
            projectId!
          );

        setApprovedSprints(data);

      } catch (error) {

        console.error(error);

      } finally {

        setSavedLoading(false);
      }
    };

  const handleGenerate =
    async () => {

      try {

        setLoading(true);

        const response =
          await generateSprintPlan(
            projectId!,
            capacity
          );

        setPlan(response);

      } catch (error) {

        console.error(error);

        alert(
          "Failed to generate sprint plan"
        );

      } finally {

        setLoading(false);
      }
    };

  const handleApprove =
    async () => {

      try {

        setApproving(true);

        const response =
          await approveSprintPlan({

            projectId,

            sprints: plan

          });

        alert(
          `Created ${response.totalSprintsCreated} sprints and mapped ${response.totalTasksMapped} tasks`
        );

        setPlan([]);

        await loadApprovedSprints();

      } catch (error) {

        console.error(error);

        alert(
          "Failed to approve sprint plan"
        );

      } finally {

        setApproving(false);
      }
    };

  if (savedLoading) {

    return (

      <div
        className="
        bg-white
        p-6
        rounded-xl
        shadow
        "
      >
        Loading Sprints...
      </div>
    );
  }

  /*
   * APPROVED SPRINTS VIEW
   */
  if (approvedSprints.length > 0) {

    return (

      <div>

        <div
          className="
          flex
          justify-between
          items-center
          mb-6
          "
        >

          <h2
            className="
            text-2xl
            font-bold
            "
          >
            Approved Sprints
          </h2>

        </div>

        <div
          className="
          grid
          gap-4
          "
        >

          {
            approvedSprints.map(
              (sprint: any) => (

                <div
                  key={
                    sprint.sprintId
                  }
                  className="
                  bg-white
                  border
                  rounded-xl
                  shadow
                  p-6
                  "
                >

                  <div
                    className="
                    flex
                    justify-between
                    items-start
                    "
                  >

                    <div>

                      <h3
                        className="
                        text-xl
                        font-bold
                        "
                      >
                        {
                          sprint.sprintName
                        }
                      </h3>

                      <p
                        className="
                        text-gray-600
                        mt-2
                        "
                      >
                        Goal:
                        {" "}
                        {
                          sprint.goal
                        }
                      </p>

                    </div>

                    <span
                      className="
                      bg-green-100
                      text-green-700
                      px-3
                      py-1
                      rounded-full
                      text-sm
                      "
                    >
                      Approved
                    </span>

                  </div>

                  <div
                    className="
                    grid
                    grid-cols-3
                    gap-4
                    mt-5
                    "
                  >

                    <div>

                      <p
                        className="
                        text-sm
                        text-gray-500
                        "
                      >
                        Start Date
                      </p>

                      <p
                        className="
                        font-medium
                        "
                      >
                        {
                          sprint.startDate
                        }
                      </p>

                    </div>

                    <div>

                      <p
                        className="
                        text-sm
                        text-gray-500
                        "
                      >
                        End Date
                      </p>

                      <p
                        className="
                        font-medium
                        "
                      >
                        {
                          sprint.endDate
                        }
                      </p>

                    </div>

                    <div>

                      <p
                        className="
                        text-sm
                        text-gray-500
                        "
                      >
                        Tasks
                      </p>

                      <p
                        className="
                        font-medium
                        "
                      >
                        {
                          sprint.taskCount
                        }
                      </p>

                    </div>

                  </div>

                </div>
              )
            )
          }

        </div>

      </div>
    );
  }

  /*
   * SPRINT PLANNER VIEW
   */
  return (

    <div>

      <div
        className="
        bg-white
        rounded-xl
        shadow
        border
        p-6
        mb-6
        "
      >

        <h2
          className="
          text-2xl
          font-bold
          mb-5
          "
        >
          AI Sprint Planner
        </h2>

        <div
          className="
          flex
          gap-4
          items-end
          "
        >

          <div>

            <label
              className="
              block
              text-sm
              text-gray-600
              mb-2
              "
            >
              Sprint Capacity
            </label>

            <input
              type="number"
              value={capacity}
              onChange={(e) =>
                setCapacity(
                  Number(
                    e.target.value
                  )
                )
              }
              className="
              border
              rounded-lg
              px-3
              py-2
              w-40
              "
            />

          </div>

          <button
            onClick={
              handleGenerate
            }
            disabled={loading}
            className="
            bg-blue-600
            text-white
            px-6
            py-2
            rounded-lg
            hover:bg-blue-700
            disabled:bg-gray-400
            "
          >
            {
              loading
                ? "Generating..."
                : "Generate Sprint Plan"
            }
          </button>

        </div>

      </div>

      {
        plan.length > 0 && (

          <>

            <div
              className="
              flex
              justify-between
              items-center
              mb-4
              "
            >

              <h2
                className="
                text-2xl
                font-bold
                "
              >
                Recommended Sprints
              </h2>

              <button
                onClick={
                  handleApprove
                }
                disabled={
                  approving
                }
                className="
                bg-green-600
                text-white
                px-6
                py-2
                rounded-lg
                hover:bg-green-700
                disabled:bg-gray-400
                "
              >
                {
                  approving
                    ? "Approving..."
                    : "Approve Sprint Plan"
                }
              </button>

            </div>

            {
              plan.map(
                (
                  sprint: any,
                  index
                ) => (

                  <div
                    key={index}
                    className="
                    bg-white
                    border
                    rounded-xl
                    shadow
                    mb-5
                    "
                  >

                    <div
                      className="
                      p-5
                      border-b
                      "
                    >

                      <div
                        className="
                        flex
                        justify-between
                        items-center
                        "
                      >

                        <h3
                          className="
                          text-xl
                          font-bold
                          "
                        >
                          {
                            sprint.sprintName
                          }
                        </h3>

                        <span
                          className="
                          bg-blue-100
                          text-blue-700
                          px-3
                          py-1
                          rounded-full
                          "
                        >
                          {
                            sprint.totalStoryPoints
                          }
                          {" "}
                          SP
                        </span>

                      </div>

                    </div>

                    <div
                      className="
                      p-4
                      "
                    >

                      <table
                        className="
                        w-full
                        "
                      >

                        <thead>

                          <tr
                            className="
                            border-b
                            "
                          >

                            <th className="text-left py-3">
                              Task
                            </th>

                            <th className="text-left py-3">
                              SP
                            </th>

                            <th className="text-left py-3">
                              Skill
                            </th>

                            <th className="text-left py-3">
                              Assignee
                            </th>

                          </tr>

                        </thead>

                        <tbody>

                          {
                            sprint.tasks?.map(
                              (
                                task: any
                              ) => (

                                <tr
                                  key={
                                    task.taskId
                                  }
                                  className="
                                  border-b
                                  "
                                >

                                  <td className="py-3">
                                    {
                                      task.title
                                    }
                                  </td>

                                  <td className="py-3">
                                    {
                                      task.storyPoints
                                    }
                                  </td>

                                  <td className="py-3">
                                    {
                                      task.requiredSkill
                                    }
                                  </td>

                                  <td className="py-3">
                                    {
                                      task.assignee
                                    }
                                  </td>

                                </tr>
                              )
                            )
                          }

                        </tbody>

                      </table>

                    </div>

                  </div>
                )
              )
            }

          </>
        )
      }

    </div>
  );
}