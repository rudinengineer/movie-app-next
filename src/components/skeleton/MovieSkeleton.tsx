type Props = {}

export default function MovieSkeleton({}: Props) {
  return (
    <div>
        <div className='w-full aspect-[9/12] skeleton rounded-sm'></div>
        <div className="mt-4">
            <div className="w-full h-4 rounded-sm skeleton"></div>
            <div className="mt-2 w-full flex-between-center">
                <div className="w-16 h-3 rounded-sm skeleton"></div>
                <div className="w-12 h-3 rounded-sm skeleton"></div>
            </div>
        </div>
    </div>
  )
}