interface ImportMeta {
  hot: {
    on: (event: string, handler: (data: any) => void) => void;
  };
  glob: (value: string) => any;
  globEager: (value: string) => any;
}
