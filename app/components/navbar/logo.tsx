'use client'

import Image from "next/image"

import logo from '@/public/images/logo.png'
import { useRouter } from "next/navigation"

const Logo = () => {
    const router = useRouter()
  return (
   <Image
   onClick={() => router.push('/')}
    src={logo}
    alt="Logo"
    className="hidden md:block cursor-pointer"
    priority
    width={100}
    height={100}
   />
  )
}

export default Logo
