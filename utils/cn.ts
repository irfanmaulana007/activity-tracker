import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * A utility function that combines class names using clsx and twMerge.
 * This allows for conditional classes and proper Tailwind class merging.
 *
 * @param inputs - Class names to combine
 * @returns Combined class names string
 *
 * @example
 * cn('px-2 py-1', condition && 'bg-blue-500', 'bg-red-500')
 * // If condition is true: 'px-2 py-1 bg-blue-500'
 * // If condition is false: 'px-2 py-1 bg-red-500'
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
