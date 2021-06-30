/* eslint-disable no-useless-catch */
import axios from "axios";
// import store from "@/store/index.js";

// axios인스턴스생성
const instance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 1000,
  withCredentials: true, // 이거없으면 passport의 deserializeUser()를 호출안해서 서버측에서 로그인유지가 안됨
});

const imageInstance = axios.create({
  baseURL: "http://localhost:3000/image",
  header: { "content-type": "multipart/form-data" },
  timeout: 1000,
  withCredentials: true, // 이거없으면 passport의 deserializeUser()를 호출안해서 서버측에서 로그인유지가 안됨
});

// request인터셉터 설정 ( 토큰값 넘겨주기위함 )
// instance.interceptors.request.use(
//   config => {
//     // 토큰값넣기
//     config.headers.Authorization = store.state.token;
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   },
// );

// 프로필이미지 업로드
async function uploadProfileImage(profileImage) {
  try {
    let formData = new FormData();
    formData.append("profileImage", profileImage);

    const { data } = await imageInstance.post("/profile", formData);

    return data;
  } catch (error) {
    throw error;
  }
}

// 커버이미지 업로드
// async function uploadCoverImage(coverImage) {
//   try {
//     let formData = new FormData();
//     formData.append("coverImage", coverImage);

//     const { data } = await imageInstance.post("/cover", formData);
//     return data;
//   } catch (error) {
//     throw error;
//   }
// }

// 회원가입
async function applyRegister(information) {
  try {
    if (information.profileImage) {
      const { profileImage } = await uploadProfileImage(information.profileImage);
      information.profileImage = profileImage;
    }

    const { data } = await instance.post("/auth/register", information);
    return data;
  } catch (error) {
    throw error;
  }
}

// 로그인
async function authLogin(information) {
  try {
    const { data } = await instance.post("/auth/login", information);
    return data;
  } catch (error) {
    throw error;
  }
}

// 로그아웃
async function authLogout() {
  try {
    const { data } = await instance.get("/auth/logout");
    return data;
  } catch (error) {
    throw error;
  }
}

// 포스트 업로드
async function uploadPost(information) {
  try {
    const { data } = await instance.post("/post", information);
    return data;
  } catch (error) {
    throw error;
  }
}

// 현재 유저에게 보여줄 게시글 가져오기 ( 일단은 모든 게시글중에 10개씩 끊어서 가져오는걸로 )
async function fetchPost(pageNumber) {
  try {
    const { data } = await instance.get("/post", pageNumber);
    return data;
  } catch (error) {
    throw error;
  }
}

// 게시글 수정
async function editPost(information) {
  try {
    const { data } = await instance.put("/post", information);
    return data;
  } catch (error) {
    throw error;
  }
}

// 게시글 삭제
async function removePost(postId) {
  try {
    const { data } = await instance.delete("/post", {
      params: {
        postId,
      },
    });

    return data;
  } catch (error) {
    throw error;
  }
}

// 유저와 관련된 정보 가져오기 ( 유저정보, 게시글정보, 이미지정보 )... 유저정보페이지에 사용
async function fetchInformation() {
  try {
    const { data } = await instance.get("/user");

    return data;
  } catch (error) {
    throw error;
  }
}

// 프로필이미지 변경
async function updateProfileImage(profileImage) {
  try {
    let formData = new FormData();
    formData.append("profileImage", profileImage);

    const { data } = await imageInstance.put("/profile", formData);

    return data;
  } catch (error) {
    throw error;
  }
}

export { applyRegister, authLogin, authLogout, uploadPost, fetchPost, editPost, removePost, fetchInformation, updateProfileImage };
