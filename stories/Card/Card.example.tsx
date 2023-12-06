import { Card, CardProps } from '@/components/Card'

export const CardDemo = ({
  variant,
  headingText,
  description
}: CardProps): JSX.Element => {
  return (
    <Card
      className="max-w-md"
      variant={variant}
      headingText={headingText}
      description={description}
    />
  )
}
