export const formatDate = (timestamp) => {
	const now = timestamp ? new Date(timestamp * 1000) : new Date();
  // 完整的時間戳是13位數 *1000變為10位數
	// 取得年份、月份和日期
  const year = now.getFullYear()
  // 月份從0開始，所以需要+1
  const month = String(now.getMonth() + 1).padStart(2, '0') // 月份从0开始
  const day = String(now.getDate()).padStart(2, '0')
  
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  // const seconds = String(now.getSeconds()).padStart(2, '0')
  
  return `${year}-${month}-${day} ${hours}:${minutes}`
}