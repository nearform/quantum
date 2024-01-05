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

export const ModalCustomDemo = () => {
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
        <ModalDescription asChild>
          <div>
            <div className="bg-blue-50 dark:bg-blue-900 dark:text-foreground-inverse h-40 text-lg font-semibold items-center flex justify-center mb-6 mx-6">
              Replace this component with your content
            </div>
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
