import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  TooltipArrow
} from '@/index'
import { Button } from '@/index'
type TooltipDemoProps = {
  side?: 'left' | 'right' | 'bottom' | 'top'
}

export const ToolTipDemo = ({ side }: TooltipDemoProps) => {
  return (
    <div className="h-40 w-40 bg-transparent flex items-center justify-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button variant={'secondary'}>
              {side ? side + ' side' : 'default'}
            </Button>
          </TooltipTrigger>
          <TooltipContent side={side} data-side={'left'}>
            <p>The tooltip content</p>
            <TooltipArrow />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
