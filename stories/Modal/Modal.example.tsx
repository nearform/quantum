import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/Modal'
import { Button } from '@/components'
import { CloseModal } from '@/assets'

export const ModalDemo = () => {
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Title</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <DialogDescription>Content</DialogDescription>
        <DialogFooter>
          <Button size="sm" variant="primary">
            Button Text
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
