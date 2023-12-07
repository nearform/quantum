import { Card, CardProps } from '@/components/Card'

export const CardDemo = ({
  selected,
  variant,
  headingText,
  description
}: CardProps): JSX.Element => {
  return (
    <Card
      className="max-w-md"
      variant={variant}
      selected={selected}
      headingText={headingText}
      description={description}
    />
  )
}
