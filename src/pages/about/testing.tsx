import dynamic from 'next/dynamic';

const MyDynamicComponent = dynamic(() => import('@/components/misc/greetings'), {
  ssr: false
});

function MyPage() {
  return (
    <div>
      {/* Static content */}
      <MyDynamicComponent />
    </div>
  );
}

export default MyPage;




