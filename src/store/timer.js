import { create } from 'zustand'
import { message } from 'antd'

export const useTimerStore = create((set, get) => ({
  // 存狀態: 顯示時間、計時器ID、事件ID、導回Event頁
  displayTime: '20:00',
  intervalId: null,
  eventId: null,
  navigateToEvent: null,

  // 方法: 開始計時、停止計時
  startTimer: (eventId, navigate) => {
    //  get()直接獲取當前狀態，如果有計時器先清除現有的計時器，重置為20:00
    const { intervalId } = get()
    if (intervalId) {
      clearInterval(intervalId)
    }
    set({ 
      displayTime: '20:00',
      eventId: eventId,
      navigateToEvent: navigate
    })
    
    // 計時器運行邏輯 → 每秒更新時間
    const newIntervalId = setInterval(() => {
      set((state) => {
        // 倒數計時
        const [minutes, seconds] = state.displayTime.split(':').map(Number)
        let totalSeconds = minutes * 60 + seconds - 1
        
        // 時間到，清除計時，antd提醒時間到
        if (totalSeconds <= 0) {
          clearInterval(newIntervalId)
          message.warning('時間到,請重新報名！')
          
          // 獲取當前狀態的 eventId 和 navigate 函數
          const { eventId, navigateToEvent } = get()
          
          // 2秒後自動導回 event 頁
          setTimeout(() => {
            if (navigateToEvent && eventId) {
              navigateToEvent(`/event/${eventId}`)
            }
          }, 2000)
          
          return { 
            displayTime: '00:00', 
            intervalId: null,
            eventId: null,
            navigateToEvent: null
          }
        }
        
        const newMinutes = Math.floor(totalSeconds / 60) //分：向下取整
        const newSeconds = totalSeconds % 60             //秒：取餘數
        const newDisplayTime = `${newMinutes.toString().padStart(2, '0')}:${newSeconds.toString().padStart(2, '0')}` //不足兩位數補0
        
        return { displayTime: newDisplayTime }
      })
    }, 1000)

    // fixed: 如果寫在一起會一直重複執行，故需創建計時器 → 保存 ID 更新為newIntervalId, 避免重複創建計時器
    set({ intervalId: newIntervalId })
  },

  stopTimer: () => {
    set((state) => {
      // 使用 state 參數獲取當前狀態
      if (state.intervalId) {
        clearInterval(state.intervalId)
      }
      return { displayTime: '20:00', intervalId: null }
    })
  },
})) 