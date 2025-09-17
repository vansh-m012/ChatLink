// instead of blank page on 404 error, we will show this notFound.tsx
// File name must be "not-found.tsx" only

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import Image from "next/image";

function notFound() {
  return (

    <div className="flex justify-center items-center flex-col h-screen">
        
    {/* Image tag is provided by the nextJS */}
      <Image src="/images/404.svg" width={500} height={500} alt="404" />
      <Link href="/"> <Button>Return Home</Button> </Link>

    </div>
  )
}

export default notFound