import { type ReactNode } from 'react'

export type LayoutComponent = {
  children: ReactNode
}

export type ScreenComponent = () => JSX.Element
export type LayoutScreenComponent = (props: LayoutComponent) => JSX.Element