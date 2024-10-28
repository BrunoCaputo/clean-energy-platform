import Image from 'next/image'

export function Header() {
  return (
    <header className="flex h-full w-full items-center bg-violet-300 p-4">
      <Image
        src="/logo.svg"
        alt=""
        height={50}
        width={170}
        className="h-auto w-auto"
        loading="lazy"
      />
    </header>
  )
}
