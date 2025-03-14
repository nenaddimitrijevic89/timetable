import Link from 'next/link'

export const Header = () => {
  return (
    <header className='fixed z-10 flex w-full items-center justify-between bg-gradient-to-t from-transparent to-black px-5 py-10 text-white sm:px-10'>
      <Link href='/'>
        <div className='h-10 w-10 bg-white-logo bg-cover transition-all duration-200 ease-in-out hover:bg-orange-logo' />
      </Link>
      <nav>
        <ul className='flex gap-4'>
          <li className='text-sm font-semibold uppercase leading-[13px] tracking-[1px] shadow-custom'>
            <Link href='/'>Join Now</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
