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

export const ModalCustomDemo = () => (
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
          <div className="text-foreground bg-brandGreen-10 dark:bg-brandGreen-100 h-40 text-lg font-semibold items-center flex justify-center mb-6 mx-6">
            Replace this component with your content
          </div>
        </div>
      </ModalDescription>
      <ModalFooter>
        <div className="flex justify-end gap-2.5">
          <Button variant="tertiary">Label</Button>
          <Button variant="secondary">Label</Button>
          <Button>Label</Button>
        </div>
      </ModalFooter>
    </ModalContent>
  </Modal>
)
