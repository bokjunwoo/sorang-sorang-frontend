'use client';

import { useState } from 'react';

const GetButton = () => {
  // 상태 관리 (선택 사항: 응답 데이터를 화면에 출력하기 위해)
  const [response, setResponse] = useState(null);

  const handleButtonClick = async () => {
    try {
      // GET 요청 보내기
      const res = await fetch(
        'https://k2e94a35648fca.user-app.krampoline.com/api/helloGet/1',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json', // 필요한 헤더가 있을 경우 설정
          },
        }
      );

      // 응답 상태가 200번대인지 확인 (성공적인 응답 여부 확인)
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      // 응답 본문을 JSON으로 파싱
      const data = await res.json();

      // 콘솔에 응답 데이터 출력
      console.log('API Response:', data);

      // 응답 데이터를 상태로 저장 (선택 사항)
      setResponse(data);
    } catch (error) {
      // 요청 실패 시 에러 메시지 출력
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Fetch Data</button>

      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
};

export default GetButton;
