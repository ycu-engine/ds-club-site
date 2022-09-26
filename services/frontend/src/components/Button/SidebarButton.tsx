import NextLink from 'next/link'
import { css } from '@emotion/react'
import type { ReactNode } from 'react'
import { Box } from '@chakra-ui/react'

const baseSize = 10

const hoverEffeceButton = css`
  z-index: 1;
  width: ${baseSize}rem;
  height: ${baseSize / 3}rem;
  font-size: 20px;
  text-align: center;
  line-height: ${baseSize / 3}rem;
  // 将来的にはwebフォントを使いたい(https://fonts.google.com/specimen/M+PLUS+Rounded+1c)
  font-family: sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  transition: 0.3s;
  align-items: center;

  &:before,
  &:after {
    content: '';
    position: absolute;
    width: inherit;
    height: inherit;
    top: 0;
    left: 0;
    transition: 0.3s;
  }

  &:before {
    background-color: white;
    z-index: -1;
    box-shadow: 0.2rem 0.2rem 0.5rem rgba(0, 0, 0, 0.2);
  }

  &:after {
    background-color: black;
    transform: translate(${baseSize / 15}rem, ${baseSize / 15}rem);
    z-index: -2;
  }

  &:hover {
    transform: translate(${baseSize / 15}rem, ${baseSize / 15}rem);
    color: white;
  }

  &:hover:before {
    background-color: black;
  }

  &:hover:after {
    background-color: white;
    transform: translate(-${baseSize / 15}rem, -${baseSize / 15}rem);
  }
`
type SidebarButtonProps = {
  children: ReactNode
  link: string
}
export const SidebarButton = ({ children, link }: SidebarButtonProps) => {
  return (
    <NextLink href={link}>
      <Box css={hoverEffeceButton}>{children}</Box>
    </NextLink>
  )
}
