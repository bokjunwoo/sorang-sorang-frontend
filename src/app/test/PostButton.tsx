'use client';

import { useState } from 'react';

const PostButton = () => {
  // 상태 관리 (응답 데이터를 화면에 표시하기 위해)
  const [response, setResponse] = useState(null);

  const handleButtonClick = async () => {
    try {
      // POST 요청 보내기
      const res = await fetch(
        'https://k2e94a35648fca.user-app.krampoline.com/api/helloPost',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // 데이터를 JSON 형식으로 보냄
          },
          body: JSON.stringify({
            // 서버에 보낼 데이터 (name을 보냄)
            name: '신창혁',
          }),
        }
      );

      // 응답 상태가 200번대인지 확인 (성공적인 응답 여부 확인)
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      // 응답이 JSON 형식일 경우 JSON으로 처리
      const data = await res.json();

      // 콘솔에 응답 데이터 출력
      console.log('API Post Response:', data);

      // 응답 데이터를 상태로 저장 (선택 사항)
      setResponse(data);
    } catch (error) {
      // 요청 실패 시 에러 메시지 출력
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Send POST Request</button>

      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
};

export default PostButton;
