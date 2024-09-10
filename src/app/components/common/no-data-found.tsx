import { TbMoodEmpty } from "react-icons/tb";

const NoDataFound = () => {
    return (
        <div className="p-6 text-center flex flex-row justify-center align-center gap-1">
            <span className="w-9 rounded-full flex justify-center justify-center">
                <TbMoodEmpty color="#d72626"  size={22} />
            </span>
            <p className="card-subtitle">
                No data to display.
            </p>
        </div>
    )
}

export default NoDataFound;