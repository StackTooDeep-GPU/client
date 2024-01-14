"use client"

import Image from "next/image"
import { Typography, Box, Button } from "@mui/material"
import React, { useState, useEffect } from "react"
import connect from "./utils/w3Connect"
import ScrollDownIndicator from "./components/scrollDownIndicator"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"

const ethers = require("ethers")

const styles = {
  hiddenVisibility: {
    visibility: "hidden",
  },
  textSlideInRight: {
    visibility: "visible",
    animation: "slide-in-anim-right 1.5s ease-out ",
    color: "#FFFFFF",
    textAlign: "justify",
    "@keyframes slide-in-anim-right": {
      "0%": {
        transform: "translateX(100%)",
      },
      "100%": {
        opacity: 1,
        transform: "translateX(0%)",
      },
    },
  },
  headingSlideInRight: {
    visibility: "visible",
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: "5rem",
    fontFamily: "Tektur",
    animation: "slide-in-anim-right 1.5s ease-out ",
    "@keyframes slide-in-anim-right": {
      "0%": {
        transform: "translateX(100%)",
      },
      "100%": {
        opacity: 1,
        transform: "translateX(0)",
      },
    },
  },
  textSlideInLeft: {
    transform: "translateX(-120%)",
    animation: "slide-in-anim 1.5s ease-out forwards",
    color: "#FFFFFF",
    textAlign: "justify",
    "@keyframes slide-in-anim": {
      "0%": {
        transform: "translateX(-100%)",
      },
      "100%": {
        opacity: 1,
        transform: "translateX(0)",
      },
    },
  },
  headingSlideInLeft: {
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: "5rem",
    fontFamily: "Tektur",
    transform: "translateX(-120%)",
    animation: "slide-in-anim 1.5s ease-out forwards",
    "@keyframes slide-in-anim": {
      "0%": {
        transform: "translateX(-100%)",
      },
      "100%": {
        opacity: 1,
        transform: "translateX(0)",
      },
    },
  },
}

export default function Home() {
  const [showFeature1, setShowFeature1] = useState(false)
  const [showFeature2, setShowFeature2] = useState(false)
  const [showFeature3, setShowFeature3] = useState(false)
  const [showFeature4, setShowFeature4] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()
  const account = useSelector((state) => state.account.account)
  useEffect(() => {
    if (account != "") {
      router.push("/dashboard")
      console.log("user found", account)
    }
  }, [account])

  useEffect(() => {
    const handleScroll2 = () => {
      if (window.scrollY > 250) {
        setShowFeature1(true)
      } else {
        setShowFeature1(false)
      }
      if (window.scrollY > 850) {
        setShowFeature2(true)
      } else {
        setShowFeature2(false)
      }
      if (window.scrollY > 1550) {
        setShowFeature3(true)
      } else {
        setShowFeature3(false)
      }
      if (window.scrollY > 2300) {
        setShowFeature4(true)
      } else {
        setShowFeature4(false)
      }
    }

    window.addEventListener("scroll", handleScroll2)
  }, [])

  return (
    <Box sx={{ padding: "3rem", width: "100%" }}>
      <Box>
        <Typography variant="h2" sx={{ color: "#FFFFFF", fontFamily: "Tektur" }}>
          GPU-IP
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              position: "relative",
              color: "#FFFFFF",
              overflow: "hidden",
              textAlign: "left",
              borderRight: ".15em solid orange",
              whiteSpace: "nowrap",
              margin: "0 auto",
              letterSpacing: ".15em",
              animation:
                "typing 3.5s steps(40, end), blink-caret .75s step-end infinite",
              "@keyframes typing": {
                from: { width: "0%" },
                to: { width: "100%" },
              },
              "@keyframes blink-caret": {
                from: { borderColor: "transparent" },
                to: { borderColor: "transparent" },
                "50%": { borderColor: "orange" },
              },
            }}
          >
            To get your own GPU instance, Link your MetaMask wallet
          </Typography>
          <Button
            variant="outlined"
            sx={{
              marginTop: "3rem",
              display: "flex",
              gap: "0.5rem",
              alignSelf: "center",
              borderWidth: "3px",
            }}
            onClick={() => {
              connect(dispatch)
            }}
          >
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
              width="50"
              height="50"
            ></Image>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Link metamask wallet
            </Typography>
          </Button>
        </Box>
        <Image src="/illustration2.png" width="700" height="700" />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10rem",
          alignItems: "center",
        }}
      >
        <Image
          src="/game.webp"
          width="750"
          height="500"
          style={{ borderRadius: "1rem", marginRight: "6rem" }}
        />
        <Box>
          <Typography
            variant="h2"
            sx={
              showFeature1
                ? styles.headingSlideInRight
                : styles.hiddenVisibility
            }
          >
            Elevate your gaming
          </Typography>
          <Typography
            variant="h5"
            sx={
              showFeature1 ? styles.textSlideInRight : styles.hiddenVisibility
            }
          >
            Experience high-end gaming without a high-end PC! Our app transforms
            your gaming experience by leveraging the power of your own GPU,
            eliminating the need for costly hardware upgrades. Play
            graphic-intensive games smoothly on your low-spec computer as our
            technology optimizes and utilizes your GPU's capabilities. Enjoy
            visually stunning and immersive gaming without compromise.
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10rem",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            variant="h2"
            sx={
              showFeature2 ? styles.headingSlideInLeft : styles.hiddenVisibility
            }
          >
            On-Demand Power for Your Machine Learning
          </Typography>
          <Typography
            variant="h5"
            sx={showFeature2 ? styles.textSlideInLeft : styles.hiddenVisibility}
          >
            Accelerate your machine learning projects with our GPU as a Service!
            Harness the strength of dedicated GPUs without the hassle of
            ownership. Run complex ML models seamlessly on our powerful GPU
            servers, providing the computational muscle you need, precisely when
            you need it. No upfront investments just on-demand access to
            high-performance GPU resources. Streamline your machine learning
            workflow with ease, leveraging our service's simplified setup and
            user-friendly interface. Transform the way you approach ML projects
            with dedicated GPU power available at your fingertips.
          </Typography>
        </Box>
        <Image
          src="/ml.jpg"
          width="750"
          height="500"
          style={{ borderRadius: "1rem", marginLeft: "6rem" }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10rem",
          alignItems: "center",
        }}
      >
        <Image
          src="/rendering.webp"
          width="750"
          height="500"
          style={{ borderRadius: "1rem", marginRight: "6rem" }}
        />
        <Box>
          <Typography
            variant="h2"
            sx={
              showFeature3
                ? styles.headingSlideInRight
                : styles.hiddenVisibility
            }
          >
            Unleash Boundless Creativity with Remote GPU Rendering
          </Typography>
          <Typography
            variant="h5"
            sx={
              showFeature3 ? styles.textSlideInRight : styles.hiddenVisibility
            }
          >
            Elevate your 3D rendering and animation projects to new heights with
            RenderFlex, our cutting-edge service that grants you access to
            powerful remote GPUs. Say goodbye to rendering bottlenecks and hello
            to seamless, high-performance graphics processing. Whether you're a
            designer, animator, or architect, RenderFlex empowers you to bring
            your visions to life with unparalleled speed and precision. Enjoy
            the freedom to create without constraints, harnessing the full
            potential of remote GPU rendering for a truly immersive and
            efficient design experience.
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10rem",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            variant="h2"
            sx={
              showFeature4 ? styles.headingSlideInLeft : styles.hiddenVisibility
            }
          >
            Mine cryptocurrency on our remote GPU
          </Typography>
          <Typography
            variant="h5"
            sx={
              showFeature4 ? styles.headingSlideInLeft : styles.hiddenVisibility
            }
          >
            Harness the formidable power of our dedicated GPUs for efficient and
            profitable cryptocurrency mining. No more worrying about hardware
            upkeep simply run your mining procedures on our remote GPUs.
            Experience optimal hash rates, seamless operations, and a
            hassle-free mining journey. Join MineMasters today to unlock the
            full potential of remote GPU mining and amplify your crypto earnings
            effortlessly.
          </Typography>
        </Box>
        <Image
          src="/crypto.jpg"
          width="750"
          height="500"
          style={{ borderRadius: "1rem", marginLeft: "6rem" }}
        />
      </Box>
      <ScrollDownIndicator />
    </Box>
  )
}
