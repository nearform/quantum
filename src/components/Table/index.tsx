import * as React from 'react';

import { cn } from '@/lib/utils';
import { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

const tableBodyVariants = cva('bg-background dark:bg-grey-900', {
  variants: {
    variant: {
      zebra: [
        '[&>*:nth-child(even)]:bg-background-subtle',
        'dark:[&>*:nth-child(even)]:bg-background-subtle-dark'
      ]
    }
  }
});

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn('caption-bottom text-sm dark:text-white', className)}
      {...props}
    />
  </div>
));
Table.displayName = 'Table';

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      'bg-background-subtle dark:bg-background-subtle-dark  text-left',
      className
    )}
    {...props}
  />
));
TableHeader.displayName = 'TableHeader';

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn('px-4 py-5 leading-[21px] font-bold', className)}
    {...props}
  />
));
TableHead.displayName = 'TableHead';
interface TableBodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement>,
    VariantProps<typeof tableBodyVariants> {}

const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, variant, ...props }, ref) => (
    <tbody
      ref={ref}
      className={cn(tableBodyVariants({ variant }), className)}
      {...props}
    />
  )
);
TableBody.displayName = 'TableBody';

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      'h-[50px] border-b-[1px] border-accent-alt dark:border-grey-500 self-stretch items-center gap-2 font-normal text-left',
      className
    )}
    {...props}
  />
));
TableRow.displayName = 'TableRow';

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td ref={ref} className={cn('p-4', className)} {...props} />
));
TableCell.displayName = 'TableCell';

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption ref={ref} className={cn('mt-4', className)} {...props} />
));
TableCaption.displayName = 'TableCaption';

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn('bg-primary text-primary-foreground', className)}
    {...props}
  />
));
TableFooter.displayName = 'TableFooter';
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption
};
export type { TableBodyProps };
