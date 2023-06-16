export function durationTime(duration: number) {
  if (duration < 0) {
    return '00:00:00'
  } else {
    const hour = Math.floor(duration / 3600)
      .toString()
      .padStart(2, '0')
    const min = Math.floor((duration % 3600) / 60)
      .toString()
      .padStart(2, '0')
    const sec = (duration % 60).toString().padStart(2, '0')
    return `${hour}:${min}:${sec}`
  }
}
