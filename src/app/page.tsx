import { Toaster } from '@/components/toaster';
import { TabsInClient } from './_Home/TabsInClient';
import { TabsInServer } from './_Home/TabsInServer';

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Toaster />
      <div>
        <TabsInClient>
          <TabsInServer />
        </TabsInClient>
      </div>
    </main>
  );
}