import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function prefixer(prefix: string, styles: string[]) {
  const prefixer = (prefix: string, stylings: string[]) => {
    return stylings.map((style: string) => {
      if (style.startsWith('dark')) {
        return `dark:${prefix}:${style.split(':').slice(-1)[0]}`
      } else {
        return `${prefix}:${style}`
      }
    })
  }
}
