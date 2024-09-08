import { Box, Button, useColorModeValue } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import Homepage from "./Pages/Homepage"
import Createpage from "./Pages/Createpage"
import Navbar from "./Components/Navbar"

function App() {
  return (
    <>
      <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/create" element={<Createpage />} />
        </Routes>
      </Box>
    </>
  )
}

export default App
