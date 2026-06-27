import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import {
    generateStandup
} from "../../services/standupService";
export default function AIStandupTab() {

    const { projectId } =
        useParams();

    const {

        data,

        isLoading,

        refetch

    } = useQuery({

        queryKey: [

            "ai-standup",

            projectId

        ],

        queryFn: () =>
            generateStandup(
                projectId!
            ),

        enabled: false

    });
    return (

<div
className="space-y-6"
>

<button

onClick={() => refetch()}

className="
bg-blue-600
text-white
px-6
py-3
rounded-lg
font-semibold
hover:bg-blue-700
"

>

🤖 Generate AI Standup

</button>
{
isLoading &&

<div

className="
bg-white
rounded-xl
shadow
p-6
animate-pulse
"

>

<p className="text-lg">

🤖 AI Scrum Master is analysing your project...

</p>

</div>

}
{
data &&

<div
className="
grid
grid-cols-4
gap-4
"
>

<div className="bg-white rounded-xl shadow p-5">

<p className="text-gray-500">

Risk Score

</p>

<h2 className="text-3xl font-bold">

{data.riskScore}

</h2>

</div>

<div className="bg-white rounded-xl shadow p-5">

<p className="text-gray-500">

Completed

</p>

<h2 className="text-3xl font-bold">

{data.completedTasks}

</h2>

</div>

<div className="bg-white rounded-xl shadow p-5">

<p className="text-gray-500">

In Progress

</p>

<h2 className="text-3xl font-bold">

{data.inProgressTasks}

</h2>

</div>

<div className="bg-white rounded-xl shadow p-5">

<p className="text-gray-500">

Todo

</p>

<h2 className="text-3xl font-bold">

{data.todoTasks}

</h2>

</div>

</div>

}
{
data &&

<div

className="
bg-white
rounded-xl
shadow
p-8
"

>

<h2

className="
text-2xl
font-bold
mb-6
"

>

🤖 AI Scrum Master

</h2>

<pre

className="
whitespace-pre-wrap
leading-8
text-gray-700
font-sans
"

>

{data.standup}

</pre>

</div>

}
</div>

);
}