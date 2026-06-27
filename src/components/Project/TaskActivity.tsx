export default function TaskActivity({

    activity

}: any) {

    return (

        <div>

            <h2
                className="
text-xl
font-bold
mb-5
"
            >

                Activity

            </h2>

            {

                activity?.map(

                    (log: any) => (

                        <div
                            key={log.id}
                            className="
border-l-4
border-blue-500
pl-4
mb-6
"
                        >

                            <p>

                                {log.action}

                            </p>

                            <p
                                className="
text-gray-500
text-sm
"
                            >

                                {new Date(

                                    log.createdAt

                                ).toLocaleString()}

                            </p>

                        </div>

                    )

                )

            }

        </div>

    );

}