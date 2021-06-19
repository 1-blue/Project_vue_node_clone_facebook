function setToken(token) {
  const date = new Date(Date.now() + 60 * 60 * 24);
  document.cookie = `survey_auth_token=${token}; Expires=${date}; path=/;`;
}

function getToken() {
  const cookies = cookieParser();

  return cookies["survey_auth_token"] ? cookies["survey_auth_token"] : null;
}

function clearToken(token) {
  document.cookie = `survey_auth_token=${token}; Expires=${Date.now()}; path=/;`;
}

export { setToken, getToken, clearToken };

// 쿠키파서
function cookieParser() {
  const cookieArray = document.cookie.split(";");
  const cookieObject = {};

  cookieArray.forEach(v => {
    const tempArray = v.split("=");
    cookieObject[`${tempArray[0].trim()}`] = tempArray[1];
  });

  return cookieObject;
}
