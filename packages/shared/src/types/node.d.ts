interface ImportMeta {
  hot: {
    on: (event: string, handler: (data: any) => void) => void
    send: (event: string, data: any) => void
  }
  glob: (value: string) => any
  globEager: (value: string) => any
}
