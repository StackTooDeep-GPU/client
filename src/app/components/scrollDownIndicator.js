import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import {useState, useEffect} from "react"

export default function ScrollDownIndicator() {
  const [isVisible, setIsVisible] = useState(true)
  useEffect(() => {
    console.log("visible", isVisible)
  }, [isVisible])

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 2000) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
  }, [])

  return (
    <KeyboardArrowDownIcon
      sx={{
        color: "#FFFFFF",
        position: "fixed",
        bottom: "1rem",
        left: "50%",
        transform: "translateX(-50%)",
        animation: "$fadeIn 1.5s ease-in-out infinite",
        fontSize: "5rem",
        "@keyframes fadeIn": {
          "0%, 100%": {
            opacity: 0,
          },
          "50%": {
            opacity: 1,
          },
        },
      }}
      style={{display: isVisible ? "block" : "none"}}
    />
  )
}
