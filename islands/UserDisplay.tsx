import { Signal } from "@preact/signals";

interface UserDisplayProps {
  count: Signal<number>;
}

export default function UserDisplay({ count }: UserDisplayProps) {
  return (
    <div>
      <div>{count.value}</div>

      <button class="btn-3d" onClick={() => count.value++}>Increment</button>
    </div>
  );
}
