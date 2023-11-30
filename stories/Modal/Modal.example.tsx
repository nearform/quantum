import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogCloseFooter,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/Modal'
import { Button } from '@/components'
import { CloseIcon } from '@/assets'

export const ModalDemo = () => {
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Title</DialogTitle>
          <DialogClose>
            <CloseIcon className="w-6 h-6 fill-current" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        <DialogDescription>Content</DialogDescription>
        <DialogCloseFooter>
          <Button size="md" variant="primary">
            Button Text
          </Button>
        </DialogCloseFooter>
      </DialogContent>
    </Dialog>
  )
}
