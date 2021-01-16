let count = 0;
export async function next(): Promise<number> {
  return (count += 1);
}

export async function value(): Promise<number> {
  return count;
}
