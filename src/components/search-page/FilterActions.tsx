import { ChangeEvent } from 'react'

import { FilterButton } from './FilterButton'
import { SearchField } from './SearchField'

interface Props {
  isOpen: boolean
  searchValue: string
  onClick: () => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}
export const FilterActions = ({
  isOpen,
  searchValue,
  onClick,
  onChange,
}: Props) => {
  return (
    <div className='fixed top-10 z-10 flex gap-5 pl-14 lg:pl-0'>
      <FilterButton
        onClick={onClick}
        className={`${isOpen ? 'hidden' : 'flex'}`}
      />
      <SearchField
        className={`${isOpen ? 'hidden' : 'flex'} hidden sm:flex`}
        value={searchValue}
        onChange={onChange}
      />
    </div>
  )
}
