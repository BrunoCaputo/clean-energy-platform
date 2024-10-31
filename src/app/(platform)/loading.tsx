export default function PlatformLoading() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6">
      <div
        className="text-surface relative inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-violet-300 border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      />
      <span className="text-sm text-violet-300">Loading...</span>
    </div>
  )
}
