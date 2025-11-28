import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-6">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <h2 className="text-2xl font-semibold">Page not found</h2>
        <p className="text-muted-foreground max-w-md text-sm">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-4 flex gap-2">
          <Button asChild>
            <Link href="/">Go Home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/servers">View Servers</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
