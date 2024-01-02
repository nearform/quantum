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

export const ModalDemo = () => {
  return (
    <Modal>
      <ModalTrigger>
        <Button size="sm" variant="primary">
          Open
        </Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Title</ModalTitle>
          <ModalClose />
        </ModalHeader>
        <ModalDescription>
          <div className="bg-blue-50 dark:bg-blue-900 dark:text-foreground-inverse h-40 text-lg font-semibold items-center flex justify-center">
            Replace this component with your content
          </div>
        </ModalDescription>
        <ModalFooter>
          <ModalCloseFooter className="w-full grid gap-2">
            <Button
              size="lg"
              variant="primary"
              className="w-full dark:bg-blue-300 dark:border-blue-300 dark:text-foreground"
            >
              Close
            </Button>
            <div className="flex justify-center gap-4">
              <div className="text-foreground-muted">Additional text line</div>
              <div className="dark:text-primary-300 underline text-primary-600">
                Additional text line
              </div>
            </div>
          </ModalCloseFooter>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
