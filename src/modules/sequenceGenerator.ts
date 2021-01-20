import opts from '../config/options';
let count = opts.snapshot().seq.start;
export async function next(): Promise<number> {
  return (count += 1);
}

export async function value(): Promise<number> {
  return count;
}
