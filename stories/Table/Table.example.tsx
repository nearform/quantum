import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableBodyProps
} from '@/components/Table'
import { Checkbox } from '@/components/Checkbox'
import { Label } from '@/components/Label'
import { BsPersonCircle } from '@/assets'
export const TableDemo = ({ variant }: TableBodyProps) => {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Header Cell</TableHead>
          <TableHead>
            <div className="flex items-center">
              <BsPersonCircle className="mr-2" /> User
            </div>
          </TableHead>
          <TableHead>Method</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody variant={variant}>
        <TableRow>
          <TableCell>Data Cell</TableCell>
          <TableCell>Freeman</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell>$250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="space-x-2">
            <Checkbox />
            <Label>Insert a checkbox</Label>
          </TableCell>
          <TableCell>Vance</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell>$250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Data Cell</TableCell>
          <TableCell>Kleiner</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell>$250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Data Cell</TableCell>
          <TableCell>Mossman</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell>$250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Data Cell</TableCell>
          <TableCell>Breen</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell>$250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Data Cell</TableCell>
          <TableCell>Calhoun</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell>$250.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
