import React, { FC, useCallback, useState } from 'react';
import axios from 'axios';
import useSWR from 'swr';

import fetcher from '@utils/fetcher';

const Workspace: FC = ({ children }) => {
  const [onLogin, setOnLogin] = useState(false);
  const { data, error } = useSWR(onLogin ? 'http://localhost:3095/api/users' : null, fetcher, {
    // dedupingInterval: 100000, // 시간 내에서는 cache 에서 data를 가져옴
    errorRetryInterval: 2000, // error 시, 재요청
    errorRetryCount: 5, // error 재요청을 최대 5번만 요청
  });

  const onLogout = useCallback(() => {
    setOnLogin(false);
    axios.post('http://localhost:3095/api/user/logout', null, { withCredentials: true }).then(() => {
      setOnLogin(true);
    });
  }, []);

  return (
    <div>
      <button onClick={onLogout}>로그아웃</button>
      {children}
    </div>
  );
};

export default Workspace;
