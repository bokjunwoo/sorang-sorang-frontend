import GetButton from './test/GetButton';
import PostButton from './test/PostButton';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center'>
      <GetButton />
      <PostButton />
      <div className='font-hakgyo text-hakgyo-s'>12px 학교 폰트 테스트</div>
    </main>
  );
}
