/* eslint-disable no-useless-catch */
import axios from "axios";

// axios인스턴스생성
const instance = axios.create({
  baseURL: `${process.env.VUE_APP_LOCAL_URL}`,
  withCredentials: true, // 이거없으면 passport의 deserializeUser()를 호출안해서 서버측에서 로그인유지가 안됨
});

const imageInstance = axios.create({
  baseURL: `${process.env.VUE_APP_LOCAL_URL}/image`,
  header: { "content-type": "multipart/form-data" },
  withCredentials: true, // 이거없으면 passport의 deserializeUser()를 호출안해서 서버측에서 로그인유지가 안됨
});

// // 인터셉터설정
// instance.interceptors.request.use(
//   config => {
//     // 스피너 on
//     console.log("on");
//     store.dispatch("spinner/SPINNER_ON");
//     return config;
//   },
//   error => {
//     // 스피너 off
//     store.dispatch("spinner/SPINNER_OFF");
//     return Promise.reject(error);
//   },
// );
// // 스피너 OFF
// instance.interceptors.response.use(
//   function (response) {
//     // 스피너 off
//     console.log("off");
//     store.dispatch("spinner/SPINNER_OFF");
//     return response;
//   },
//   function (error) {
//     // 스피너 off
//     store.dispatch("spinner/SPINNER_OFF");
//     return Promise.reject(error);
//   },
// );

// ========================================= auth-section =========================================
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

// 회원가입
async function applyRegister(information) {
  try {
    if (information.profileImage) {
      const { profileImageName } = await uploadProfileImage(information.profileImage);
      information.profileImageName = profileImageName;
    } else {
      information.profileImageName = null;
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

// ========================================= user-section =========================================
// 유저와 관련된 정보 가져오기 ( 유저정보, 게시글정보, 이미지정보 )... 유저정보페이지에 사용
async function fetchInformation() {
  try {
    const { data } = await instance.get("/user");

    return data;
  } catch (error) {
    throw error;
  }
}

// 게시글작성유저의 정보
async function fetchPostOfUserInfo(postId) {
  try {
    const { data } = await instance.get("/user/info", {
      params: {
        postId,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

// ========================================= image-section =========================================
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

// 프로필이미지 제거
async function removeProfileImage() {
  try {
    const { data } = await imageInstance.delete("/profile");

    return data;
  } catch (error) {
    throw error;
  }
}

// 커버이미지 업로드
async function updateCoverImage(coverImage) {
  try {
    let formData = new FormData();
    formData.append("coverImage", coverImage);

    const { data } = await imageInstance.put("/cover", formData);
    return data;
  } catch (error) {
    throw error;
  }
}

// 커버이미지 제거
async function removeCoverImage() {
  try {
    const { data } = await imageInstance.delete("/cover");

    return data;
  } catch (error) {
    throw error;
  }
}

// 로그인한 유저의 프로필이미지
async function getProfileImage() {
  try {
    // get호출시 cors오류남;
    const { data } = await imageInstance.post("/userProfileImage");
    return data;
  } catch (error) {
    throw error;
  }
}

// ========================================= post-section =========================================
// 현재 유저에게 보여줄 게시글 가져오기
async function fetchPost(fetchPostCount) {
  try {
    const { data } = await instance.get("/post", {
      params: {
        fetchPostCount,
      },
    });
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
async function deletePost(postId) {
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

// 게시글의 개수 가져오기
async function getPostCount() {
  try {
    const { data } = await instance.get("/post/count");
    return data;
  } catch (error) {
    throw error;
  }
}

// ========================================= like-section =========================================
// 게시글 좋아요 정보
async function fetchPostOfLike(postId) {
  try {
    const { data } = await instance.get("/like", {
      params: {
        postId,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

// 좋아요 추가
async function appendLike(PostId) {
  try {
    const { data } = await instance.post("/like", {
      PostId,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

// 좋아요 제거
async function removeLike(likeId) {
  try {
    const { data } = await instance.delete("/like", {
      params: {
        likeId,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

// ========================================= comments-section =========================================
// 댓글 업로드
async function uploadComments(PostId, contents) {
  try {
    const { data } = await instance.post("/comments", { PostId, contents });
    return data;
  } catch (error) {
    throw error;
  }
}

// 게시글의 댓글 가져오기
async function fetchPostOfComments(postId, commentsCount) {
  try {
    const { data } = await instance.get("/comments", {
      params: {
        postId,
        commentsCount,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

// 게시글의 댓글개수 가져오기
async function getTotalCommentsNumber(PostId) {
  try {
    const { data } = await instance.get("/comments/count", {
      params: {
        PostId,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

// 댓글 삭제
async function deleteComments(commentsId) {
  try {
    const { data } = await instance.delete("/comments", {
      params: {
        commentsId,
      },
    });

    return data;
  } catch (error) {
    throw error;
  }
}

// 댓글 수정
async function editComments(information) {
  try {
    const { data } = await instance.put("/comments", information);

    return data;
  } catch (error) {
    throw error;
  }
}

// ========================================= recomments-section =========================================
// 대댓글 업로드
async function uploadRecomments(CommentId, contents) {
  try {
    const { data } = await instance.post("/recomments", { CommentId, contents });
    return data;
  } catch (error) {
    throw error;
  }
}

// 댓글의 대댓글 가져오기
async function fetchCommentsOfRecomments(commentId, recommentsCount) {
  try {
    const { data } = await instance.get("/recomments", {
      params: {
        commentId,
        recommentsCount,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

// 댓글의 대댓글개수 가져오기
async function getTotalRecommentsNumber(CommentId) {
  try {
    const { data } = await instance.get("/recomments/count", {
      params: {
        CommentId,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

// 대댓글 삭제
async function deleteRecomments(recommentsId) {
  try {
    const { data } = await instance.delete("/recomments", {
      params: {
        recommentsId,
      },
    });

    return data;
  } catch (error) {
    throw error;
  }
}

// 댓글 수정
async function editRecomments(information) {
  try {
    const { data } = await instance.put("/recomments", information);

    return data;
  } catch (error) {
    throw error;
  }
}

export {
  applyRegister,
  authLogin,
  authLogout,
  uploadPost,
  fetchPost,
  fetchPostOfUserInfo,
  fetchPostOfLike,
  editPost,
  deletePost,
  fetchInformation,
  updateProfileImage,
  removeProfileImage,
  updateCoverImage,
  removeCoverImage,
  getProfileImage,
  appendLike,
  removeLike,
  fetchPostOfComments,
  uploadComments,
  getTotalCommentsNumber,
  getPostCount,
  deleteComments,
  editComments,
  uploadRecomments,
  fetchCommentsOfRecomments,
  getTotalRecommentsNumber,
  deleteRecomments,
  editRecomments,
};
