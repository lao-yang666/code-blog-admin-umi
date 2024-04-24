import { useState } from 'react';
const useUser = () => {
  const [user, setUser] = useState<API.User>();
  return {
    user,
    setUser,
  };
};

export default useUser;