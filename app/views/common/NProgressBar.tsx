'use client'
import ProgressBar from 'next-nprogress-bar'

export default function NProgressBar() {
  return <ProgressBar height={'2px'} color={'#FFFD00'} options={{ showSpinner: false }} shallowRouting appDirectory />
}
