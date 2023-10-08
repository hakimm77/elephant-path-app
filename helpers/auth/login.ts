import React, { SetStateAction } from "react";

export const login = (
  setLoginStatus: React.Dispatch<SetStateAction<boolean>>
) => {
  setTimeout(() => {
    setLoginStatus(true);
  }, 1000);
};
