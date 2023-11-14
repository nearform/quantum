import { Tooltip, TooltipProps } from '@/index'
import { Button } from '@/index'

interface TooltipDemoProps extends TooltipProps {
  componentAsContent?: boolean
}

export const ToolTipDemo = ({
  side,
  sideOffset,
  className,
  componentAsContent
}: TooltipDemoProps) => {
  return (
    <div className="h-40 w-40 bg-transparent flex items-center justify-center">
      <Tooltip
        content={
          componentAsContent ? TooltipContentComponent() : 'here is a tooltip'
        }
        side={side}
        sideOffset={sideOffset}
        className={className}
      >
        <Button className="dark:hover:bg-white dark:hover:text-foreground-inverse-dark">
          Hover over me
        </Button>
      </Tooltip>
    </div>
  )
}

export const TooltipContentComponent = () => {
  //Demonstrating that components can be passed in to the content of the Tooltip.

  return (
    <p>
      Here is a{' '}
      <a
        className="text-secondary-400 underline"
        href={'https://www.example.com/'}
      >
        link
      </a>
    </p>
  )
}
