"use client"
import {Box, Button, IconButton, Typography} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import {useState} from "react"
import {useSelector} from "react-redux"
import {ABI, CONTRACT_ADDRESS} from "../abi"
import {useRouter} from "next/navigation"
const ethers = require("ethers")

const rippleAnimationStyle = {
  backgroundColor: "#FFFFFF",
  width: "10rem",
  height: "10rem",
  transition: "transform 0.5s",
  animation: "ripple 1.5s linear infinite",
  "@keyframes ripple": {
    "0%": {
      boxhadow:
        "0 0 0 .7rem rgba(255,255,255, 0.2),0 0 0 1.5rem rgba(255,255,255, 0.2),0 0 0 5rem rgba(255,255,255, 0.2)",
    },
    "100%": {
      boxShadow:
        "0 0 0 1.5rem rgba(255,255,255, 0.2),0 0 0 4rem rgba(255,255,255, 0.2),0 0 0 8rem rgba(255,255,255, 0)",
    },
  },
  "&:hover": {
    backgroundColor: "#FFFFFF",
    transform: "Scale(1.1)",
  },
}

export default function GetInstance() {
  const [loading, setLoading] = useState(false)
  const provider = useSelector((state) => state.account.provider)
  const account = useSelector((state) => state.account.account)
  const router = useRouter()
  return (
    <Box
      sx={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <IconButton
        sx={
          loading
            ? rippleAnimationStyle
            : {
                backgroundColor: "#FFFFFF",
                width: "10rem",
                height: "10rem",
                transition: "transform 0.5s",
                "&:hover": {
                  backgroundColor: "#FFFFFF",
                  transform: "Scale(1.1)",
                },
              }
        }
        onClick={async () => {
          setLoading(true)
          console.log(provider)
          const signer = provider.getSigner(account)
          console.log(signer)
          // const superSigner = sf.createSigner({signer: signer})
          const gpuRouter = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider)
          console.log(gpuRouter)
          await gpuRouter
            .connect(signer)
            .allocateGPU("0x926c6731de79ab807e3e7a099f8091e7dd7372d7")
            .then(function (tx) {
              console.log(`
          Congrats! You just successfully created a flow from the money router contract. 
          Tx Hash: ${tx.hash}
      `)
              gpuRouter.on(
                "GPUAllocated",
                (from, allocationTimestamp, event) => {
                  router.push("/dashboard")
                  console.log("GPUAllocated Event:", {
                    from,
                    allocationTimestamp,
                  })
                }
              )
            })
        }}
      >
        <AddIcon sx={{fontSize: "10rem", color: "#000000"}} />
      </IconButton>
      <Typography
        variant="h3"
        sx={{color: "#FFFFFF", marginTop: "6rem"}}
        textAlign="center"
      >
        Get GPU Instance
      </Typography>
    </Box>
  )
}
