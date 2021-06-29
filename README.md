# 페이스북 클론 프로젝트
Vue와 Node를 이용한 페이스북 클론만들기

## 일정
1. 1일차 : vue프로젝트생성 및 DB테이블생성
2. 2일차 : 네비게이션바생성 ( 반응형추가 ), 페이지 라우팅
3. 3일차 : 회원가입과 로그인 구현
4. 4일차 : 로그아웃 및 옵션창 구현
5. 5일차 : 포스트업로드페이지 및 포스트업로드 구현
6. 6일차 : 메인페이지 및 시간처리함수 구현
7. 7일차 : 링크 데코레이션 변수 vuex로 옮김 및 수정, 삭제 버튼만 구현 ( 기능 X )
8. 8일차 : 게시글 수정 및 삭제 구현 + 컴포넌트 구조 수정 및 정리 + 옵션창관련 코드 수정 ( open/close )
9. 9일차 : 유저 프로필 이미지 저장구현

## 문제
1. ::after사용시 글자가 많아지면 세로로 배치되는거 유동적으로 width늘려서 가로로 배치하고 싶은데 방법을 모르겠음
2. `navigation.css > router__link__active`에 !important사용했는데 이거 안쓰면 css가 안먹는데 이유를 모르겠음
3. 네비게이션 가드 에러... 이유를 모르겠음 ( 에러뜨다가 다음으로 넘어가기누르면 다음페이지로 이상없이 이동됨 )
4. 로그인/로그아웃 가끔 로그인했을 때 로그아웃되어있다고 에러남 ( passport에서 뭔가 잘못된것 같음, 추측으로는 nodemon으로 서버 껏다켜져서 그런것같음 )

## 의문
1. `cors`나 `axios`의 `credentials`속성 역할
2. 이미지 저장관련
```
유저의 프로필이미지 저장할 때 현재 사용한 방법은 이미지는 서버의 uploads폴더에 저장하고
DB에 users.profileImage컬럼에 image이름만 저장함 ( 이미지이름은 이미지 생성 시간을 기반으로 결정됨 )
user.profileImage컬럼값을 이용해서 클라이언트에서 서버에서 express.static으로 열어둔 uploads폴더에서 바로 들고와서 사용하는데
첫 번째의문은 이런 방식이 괜찮은지
```

## 해야할것
1. 스크롤 내릴 때 마다 포스트정보 5 ~ 10개씩 불러오기

2. DB에 images테이블 생성하고 users.profileImage, coverImage 컬럼 삭제 ( user : image => 1 : N )
2. 유저 정보 페이지 생성, 포스트 이미지 업로드 시키는 기능 추가 ( 일단 한장만 가능하게 만들고 여러장 올릴수 있도록 수정할 예정 )

## 사용한 것
+ vue.js
+ node.js
+ mysql
+ 로그인인증관려 => passport
+ DB처리 => sequelize
+ 이미지처리 => multer

