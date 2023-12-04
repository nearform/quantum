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
      <DialogTrigger className="p-52">
        <Button size="sm" variant="primary">
          Open
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Title</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <DialogDescription>
          <div className="bg-blue-50 h-40 text-lg font-semibold items-center flex justify-center">
            Replace this component with your content
          </div>
        </DialogDescription>
        <DialogFooter>
          <DialogCloseFooter className="w-full grid gap-2">
            <Button
              size="sm"
              variant="primary"
              className="w-full dark:bg-blue-300 dark:border-blue-300 dark:text-foreground"
            >
              Close
            </Button>
            <div className="flex justify-center gap-4">
              <div className="dark:text-foreground-muted">
                Additional text line
              </div>
              <div className="dark:text-primary-300 underline text-primary-600">
                Additional text line
              </div>
            </div>
          </DialogCloseFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
