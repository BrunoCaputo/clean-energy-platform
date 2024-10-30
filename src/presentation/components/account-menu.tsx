/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { ChevronDown, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { AdminUser } from '@/@types/admin'

import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export function AccountMenu() {
  const [user, setUser] = useState<AdminUser>()
  const router = useRouter()

  useEffect(() => {
    const loggedUser = localStorage.getItem('cleanenergy:loggedUser')
    if (loggedUser) {
      setUser(JSON.parse(loggedUser))
    } else {
      router.push('/sign-in')
    }
  }, [])

  function signOut() {
    localStorage.removeItem('cleanenergy:loggedUser')
    router.push('/sign-in')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex select-none items-center gap-2"
        >
          {user?.name}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col">
          <>
            <span>{user?.name}</span>
            <span className="text-xs font-normal text-muted-foreground">
              {user?.email}
            </span>
          </>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className="text-rose-500 hover:text-rose-600 dark:text-rose-400"
        >
          <button className="w-full cursor-pointer" onClick={() => signOut()}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
