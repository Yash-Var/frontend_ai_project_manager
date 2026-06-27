interface Props{

    ask:(q:string)=>void;

}

const questions=[

    "Summarize my project",

    "Why is Sprint delayed?",

    "Who is overloaded?",

    "Show project risks",

    "What should we do next?",

    "Give sprint health"

];

export default function SuggestedQuestions({

    ask

}:Props){

    return(

        <div className="flex flex-wrap gap-3 mb-6">

            {

                questions.map(q=>(

                    <button

                        key={q}

                        onClick={()=>ask(q)}

                        className="bg-blue-100 hover:bg-blue-200 rounded-full px-4 py-2"

                    >

                        {q}

                    </button>

                ))

            }

        </div>

    );

}