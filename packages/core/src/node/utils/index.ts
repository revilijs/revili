export function toLowerCamelCase(str: string): string {
  let arr: string[] = str.split('-');

  arr = arr.reduce((acc: string[], curr: string) => {
    if (curr.length > 0) {
      acc.push(curr[0].toUpperCase() + curr.slice(1).toLowerCase());
    }
    return acc;
  }, []);

  str = arr.join('');

  return str;
}
