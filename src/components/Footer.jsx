import { useUserStore } from '@/store/user'
import clsx from 'clsx'


const Footer = () => {
  const { darkMode } = useUserStore()

  return (
    <footer className={clsx("mt-auto bg-[#1a1f23] text-white flex-shrink-0", { darkMode })}>
      <div className="w-full max-w-[1080px] flex items-center justify-center mx-auto px-4 py-10 lg:py-16 text-center">
        <p className="text-sm text-gray-300">
          © Copyright jojo
        </p>
      </div>
    </footer>
  )
}

export default Footer