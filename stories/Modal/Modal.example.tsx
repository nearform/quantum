import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogCloseFooter,
  DialogFooter,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/Modal'
import { Button } from '@/components'

export const ModalDemo = () => {
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader className="border-b-[1px] border-border-subtle">
          <DialogTitle>Title</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <DialogDescription>Content</DialogDescription>
        <DialogFooter className="border-t-[1px] border-border-subtle">
          <DialogCloseFooter>
            <Button size="sm" variant="primary">
              Close
            </Button>
          </DialogCloseFooter>
          <Button size="sm" variant="secondary">
            Label
          </Button>
          <Button size="sm" variant="tertiary">
            Label
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
