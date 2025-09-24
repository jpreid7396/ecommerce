import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="flex flex-col gap-8 items-center justify-center h-[75vh]">
      <h1 className="text-3xl">Page not found</h1>
      <Link href="/" className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300">
        Back home
      </Link>
    </section>
  )
}