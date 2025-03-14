import { TGym } from '@/@@/types'

interface Props {
  gyms: TGym[]
  onClick: (gymSlug: TGym['slug']) => void
  onClose: () => void
}

export const GymSelectOverlay = ({ gyms, onClick, onClose }: Props) => {
  const handleClick = (gymSlug: TGym['slug']) => {
    onClick(gymSlug)
    onClose()
  }
  return (
    <div className='fixed bottom-0 left-0 right-0 top-0 z-50 flex flex-col items-center justify-center overflow-y-hidden bg-black'>
      <div className='flex flex-col items-center justify-center gap-7 px-5 md:px-10'>
        <p className='text-2xl font-bold uppercase text-white'>Select gym</p>
        <div>
          {gyms.map((gym) => (
            <div
              key={gym.slug}
              className={`cursor-pointer border border-[#2d2d2d] px-10 py-2 first:border-b-0 last:border-t-0 sm:px-20`}
              onClick={() => handleClick(gym.slug)}
            >
              <p className='text-center text-sm text-white transition duration-300 ease-in-out hover:text-orange'>
                {gym.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
