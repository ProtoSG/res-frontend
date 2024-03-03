export default function Button({ name, onClick}) {
    return(

        <button
            onClick={onClick}
            className={` bg-primary-100 w-full py-4 text-accent-200 rounded-3xl hover:bg-primary-200 hover:scale-105 transition-all hover:font-bold text-2xl`}>
            {name}
        </button>
    )
}