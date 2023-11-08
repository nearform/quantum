import { ButtonGroup, type ButtonGroupProps } from '@/index'
import { Button } from '@/index'

export const ButtonGroupDemo = ({ orientation }: ButtonGroupProps) => {
  return (
    <ButtonGroup orientation={orientation}>
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
      <Button>Four</Button>
      <Button>Five</Button>
      <Button>Six</Button>
    </ButtonGroup>
  )
}
