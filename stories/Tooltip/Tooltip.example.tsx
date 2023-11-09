import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  TooltipArrow
} from '@/index'
import { Button } from '@/index'

export const ToolTipDemo = () => {
  return (
    <div className="h-40 w-40 bg-white flex items-center justify-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button>Tooltip test</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add to library</p>
            <TooltipArrow />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
