import { useEffect, useState } from "react"

const useDebounce = (fn: () => void, delay: number = 1000) => {
    useEffect(() => {
        const handler = setTimeout(() => {
            fn();
        }, delay)
        return (() => {
            clearTimeout(handler)
        });

    },[fn, delay]);
}

export default useDebounce