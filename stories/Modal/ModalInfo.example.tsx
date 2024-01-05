import {
  Modal,
  ModalContent,
  ModalClose,
  ModalFooter,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  ModalTrigger
} from '@/components/Modal'
import { Button } from '@/components'

export const ModalInfoDemo = () => {
  return (
    <Modal>
      <Button size="sm" variant="primary" asChild>
        <ModalTrigger>Open</ModalTrigger>
      </Button>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Title</ModalTitle>
          <ModalClose />
        </ModalHeader>
        <ModalDescription className="h-40 text-foreground text-base" asChild>
          <div>
            <p className="mb-6 mx-6">Test</p>
          </div>
        </ModalDescription>
        <ModalFooter>
          <div className="flex justify-start gap-2.5">
            <Button>Label</Button>
            <Button variant="secondary">Label</Button>
            <Button variant="tertiary">Label</Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
