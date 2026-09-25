import { useState } from 'react'

import { StepsIndicator } from '@/index'

export const StepsIndicatorDemo: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(1)
  const onClick = (i: number) => setSelectedIndex(i)

  return (
    <StepsIndicator
      length={10}
      selectedIndex={selectedIndex}
      onClick={onClick}
    />
  )
}
