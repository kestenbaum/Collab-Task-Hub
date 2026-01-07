import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen bg-zinc-50 font-sans dark:bg-black">
      Main page
      <div>
        <Link href="/test" className="text-green-200">
          Test page
        </Link>
      </div>
    </div>
  );
}
