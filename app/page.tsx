"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Home: React.FC = () => {
  const router = useRouter()
  useEffect(() => {
    router.push("/login")
  }, [])
  return null
}

export default Home