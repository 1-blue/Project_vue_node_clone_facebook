function setCookie(username) {
  const date = new Date(Date.now() + 60 * 60 * 24);
  document.cookie = `clone_facebook_username=${username}; Expires=${date}; path=/;`;
}

function getCookie() {
  const cookies = cookieParser();

  return cookies["clone_facebook_username"] ? cookies["clone_facebook_username"] : null;
}

function clearCookie(username) {
  document.cookie = `clone_facebook_username=${username}; Expires=${Date.now()}; path=/;`;
}

export { setCookie, getCookie, clearCookie };

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
