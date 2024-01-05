import {
  Modal,
  ModalContent,
  ModalClose,
  ModalCloseFooter,
  ModalFooter,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  ModalTrigger
} from '@/components/Modal'
import { Button } from '@/components'

export const ModalFormDemo = () => {
  return (
    <Modal>
      <Button size="sm" variant="primary" asChild>
        <ModalTrigger>Open</ModalTrigger>
      </Button>
      <ModalContent>
        <ModalHeader variant="form">
          <ModalTitle>Title</ModalTitle>
          <ModalClose />
        </ModalHeader>
        <ModalDescription variant="form" asChild>
          <div>
            <div className="bg-blue-50 dark:bg-blue-900 dark:text-foreground-inverse h-40 text-lg font-semibold items-center flex justify-center mb-6 mx-6">
              Replace this component with your form
            </div>
          </div>
        </ModalDescription>
        <ModalFooter>
          <Button size="lg" variant="primary" asChild>
            <ModalCloseFooter className="w-full grid gap-2">
              Close
            </ModalCloseFooter>
          </Button>
          <div className="flex justify-center gap-4">
            <div className="text-foreground-muted">Additional text line</div>
            <div className="dark:text-primary-300 underline text-primary-600">
              Additional text line
            </div>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
