interface ButtonProps {
  children: string;
}

export default function Button({ children }: ButtonProps) {
  return (
    <div class="my-4">
      <button
        class="group relative inline-block text-sm font-medium text-indigo-600 focus:ring-3 focus:outline-hidden"
        type="submit"
      >
        <span class="absolute inset-0 translate-x-0 translate-y-0 bg-indigo-600 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5">
        </span>

        <span class="relative block border border-current bg-white px-8 py-3">
          {children}
        </span>
      </button>
    </div>
  );
}
