import { invariant as tsInvariant } from 'ts-invariant';

export default function invariant(
  condition: any,
  message?: string | number | undefined
): asserts condition {
  tsInvariant(condition, message);
}
