import { useEffect, useState } from "react"

export const useDynamicScreen = () => {
    const [dynamicScreen, setDynamicScreen] = useState(window.innerWidth)
    useEffect(() => {
        const handleResize = () => {
          setDynamicScreen(window.innerWidth)
        }
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
      
    }, [])
    return dynamicScreen
}

 