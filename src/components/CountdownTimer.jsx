import { useTimerStore } from '@/store/timer'

const CountdownTimer = () => {
  const { displayTime } = useTimerStore()

  return (
    <span className='timer-tick'>
      {displayTime}
    </span>
  )
}

export default CountdownTimer 