import dynamic from 'next/dynamic';

const ShareDuaClient = dynamic(() => import('./ShareDuaClient'), { ssr: false });

export default function Page() {
  return <ShareDuaClient />;
}
