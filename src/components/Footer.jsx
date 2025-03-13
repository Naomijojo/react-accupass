import { useUserStore } from '@/store/user'
import clsx from 'clsx'


const Footer = () => {
  const { darkMode } = useUserStore()

  return (
    <div className={clsx("footer-wrapper pt-[122px]", { darkMode }) }>
         <footer className="footer">
            <div className="footer-inner">
                <p>© Copyright jojo</p>
            </div>
        </footer>
    </div>

  )
}

export default Footer