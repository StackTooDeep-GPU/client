import React, {useState, useEffect} from "react"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

const Timer = ({isActive, setIsActive, time, setTimeInSeconds}) => {
  useEffect(() => {
    let interval

    if (isActive) {
      interval = setInterval(() => {
        setTimeInSeconds((prevTime) => prevTime + 1)
      }, 1000)
    } else {
      setTimeInSeconds(0)
      clearInterval(interval)
    }

    return () => {
      clearInterval(interval)
    }
  }, [isActive, time])

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(remainingSeconds).padStart(2, "0")}`
  }

  return (
    <div>
      <Typography variant="h4" sx={{color: "#FFFFFF", fontSize: "5rem"}}>
        {formatTime(time)}
      </Typography>
    </div>
  )
}

export default Timer
