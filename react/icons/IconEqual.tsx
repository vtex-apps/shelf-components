import React, { FC } from 'react'

interface Props {
  size?: number
  color?: string
}

const IconEqual: FC<Props> = ({ size = 16, color = 'currentColor' }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" version="1.1">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g fill={color}>
          <path d="M0,3 L0,5 C6.76353751e-17,5.55228475 0.44771525,6 1,6 L15,6 C15.5522847,6 16,5.55228475 16,5 L16,3 C16,2.44771525 15.5522847,2 15,2 L1,2 C0.44771525,2 -6.76353751e-17,2.44771525 0,3 Z" />
          <path d="M0,11 L0,13 C6.76353751e-17,13.5522847 0.44771525,14 1,14 L15,14 C15.5522847,14 16,13.5522847 16,13 L16,11 C16,10.4477153 15.5522847,10 15,10 L1,10 C0.44771525,10 -6.76353751e-17,10.4477153 0,11 Z" />
        </g>
      </g>
    </svg>
  )
}

export default IconEqual
