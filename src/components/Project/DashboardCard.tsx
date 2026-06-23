type DashboardCardProps = {

    title: string;

    value: number | string;
};

export default function DashboardCard({

    title,

    value

}: DashboardCardProps) {

    return (

        <div
            className="
            bg-white
            rounded-xl
            shadow
            p-6
            border
            "
        >

            <p
                className="
                text-gray-500
                text-sm
                "
            >
                {title}
            </p>

            <h3
                className="
                text-3xl
                font-bold
                mt-2
                "
            >
                {value}
            </h3>

        </div>
    );
}