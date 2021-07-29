declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default content
}
declare module 'next-cookies' {
  const nextCookie: (ctx: NextPageContext) => Record<string, unknown>
  export default nextCookie
}

declare function ga(event: string, type: string, options?: unknown): void
