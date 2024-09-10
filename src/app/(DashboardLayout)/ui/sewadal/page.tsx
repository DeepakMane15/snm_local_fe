"use client"

import Filter from "@/app/components/common/filter";
import PopularProducts from "../table/page";

const Sewadal = () => {

    return (
        <div className="rounded-lg dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
            <Filter />
            <div className="mt-3">
                <PopularProducts />
            </div>
        </div>
    )
}

export default Sewadal;