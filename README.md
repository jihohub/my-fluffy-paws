# My Fluffy Paws
고양이와 강아지에 특화된 소셜미디어  
집사들이 고양이와 강아지의 프로필을 꾸미고 사진을 올리며  
사료나 간식, 기타 용품들에 대한 정보를 공유할 수 있는 서비스  
  
# 페이지 구현 사항
- 메인 페이지
  - 전체 게시물 목록을 보여줌
  <details>
    <summary>이미지 보기</summary>
    <left>
      <img
      src="https://jiho-image-storage.s3.ap-northeast-2.amazonaws.com/resume/main.png"
      />
    </left>
  </details>
- 메시지 페이지
  - WebSocket을 사용해 메시지 (1:1 채팅) 구현
  - 채팅 내역을 db에 저장하여 과거 채팅 내역 열람 가능
  <details>
    <summary>이미지1 보기</summary>
    <left>
      <img
      src="https://jiho-image-storage.s3.ap-northeast-2.amazonaws.com/resume/chat1.png"
      />
    </left>
    </details>
  <details>
    <summary>이미지2 보기</summary>
    <left>
      <img
      src="https://jiho-image-storage.s3.ap-northeast-2.amazonaws.com/resume/chat2.png"
      />
    </left>
    </details>
- 검색 페이지
  - 유저의 닉네임이나 게시물의 내용을 검색할 수 있는 페이지
  - 검색어를 입력하지 않으면 전체 유저 목록과 전체 게시물 목록을 보여줌
  - 검색어를 입력하면 해당 검색어가 포함된 유저나 게시물 목록을 보여줌
  <details>
    <summary>이미지1 보기</summary>
    <left>
      <img
      src="https://jiho-image-storage.s3.ap-northeast-2.amazonaws.com/resume/search1.png"
      />
    </left>
    </details>
  <details>
    <summary>이미지2 보기</summary>
    <left>
      <img
      src="https://jiho-image-storage.s3.ap-northeast-2.amazonaws.com/resume/search2.png"
      />
    </left>
    </details>
- 게시물 등록 페이지
  - AWS S3을 사용하여 이미지 업로드 기능 구현
  - react-cropper 라이브러리를 이용해 이미지를 정사각형으로 크롭해서 업로드
  <details>
    <summary>이미지 보기</summary>
    <left>
      <img
      src="https://jiho-image-storage.s3.ap-northeast-2.amazonaws.com/resume/crop.png"
      />
    </left>
    </details>
- 유저 페이지
  - 해당 유저의 게시물 수, 팔로잉 수, 팔로워 수를 보여줌
  - 로그인한 상태라면 팔로우 여부에 따라 팔로우 or 언팔로우 버튼과 메시지 버튼 노출
  - 해당 유저의 게시물을 그리드 형식으로 보여줌
  - 게시물에 마우스 호버시 좋아요 수와 댓글 수를 보여줌
  <details>
    <summary>이미지 보기</summary>
    <left>
      <img
      src="https://jiho-image-storage.s3.ap-northeast-2.amazonaws.com/resume/user.png"
      />
    </left>
    </details>
- 회원 가입 페이지
  - 아이디(이메일), 비밀번호, 비밀번호 확인, 닉네임, 프로필 사진(선택사항, 미입력시 디폴트 이미지 사용) 입력하여 가입
  - 프론트엔드에서 유효성 검사를 통과해야 가입 버튼 활성화
  - 백엔드에서 유효성 검사를 통과해야 가입 성공
  <details>
    <summary>이미지 보기</summary>
    <left>
      <img
      src="https://jiho-image-storage.s3.ap-northeast-2.amazonaws.com/resume/register.png"
      />
    </left>
    </details>
- 로그인 페이지

# 기능 또는 컴포넌트 구현 사항
- 회원 가입 기능
  - 아이디(이메일), 비밀번호, 비밀번호 확인, 닉네임, 프로필 사진(선택사항, 미입력시 디폴트 이미지 사용) 입력하여 가입
  - 프론트엔드에서 유효성 검사를 통과해야 가입 버튼 활성화
  - 백엔드에서 유효성 검사를 통과해야 가입 성공
- 로그인 기능
- 게시물 등록, 수정, 삭제 기능
  - AWS S3을 사용하여 이미지 업로드 기능 구현
  - react-cropper 라이브러리를 이용해 이미지를 정사각형으로 크롭해서 업로드
- 댓글 등록, 삭제 기능
- 좋아요, 좋아요 취소 기능
  - 게시물이나 댓글에 좋아요, 좋아요 취소
  - 하트 아이콘의 모양과 좋아요 수 업데이트로 좋아요 여부를 유저가 판별 가능
- 검색 기능
  - 유저의 닉네임이나 게시물의 내용을 검색할 수 있는 페이지
  - 검색어를 입력하지 않으면 전체 유저 목록과 전체 게시물 목록을 보여줌
  - 검색어를 입력하면 해당 검색어가 포함된 유저나 게시물 목록을 보여줌
- 팔로우, 언팔로우 기능
  - 팔로우 여부에 따라 팔로우 or 언팔로우 버튼과 메시지 버튼 노출
- 댓글 영역
  - 댓글 모양 아이콘이나 댓글 n개 보기 텍스트를 클릭하면 댓글 영역 표시
  - 닫기 아이콘이나 댓글 영역 바깥 부분 클릭시 댓글 영역 사라지게 구현
  <details>
    <summary>이미지 보기</summary>
    <left>
      <img
      src="https://jiho-image-storage.s3.ap-northeast-2.amazonaws.com/resume/comment.png"
      />
    </left>
    </details>
- 상호작용 영역
  - 점 3개 아이콘 클릭시 게시물, 댓글, 유저 각각에 해당되는 모달창이 나타나서 상호작용 가능
  <details>
    <summary>이미지 보기</summary>
    <left>
      <img
      src="https://jiho-image-storage.s3.ap-northeast-2.amazonaws.com/resume/modal.png"
      />
    </left>
    </details>
- 네비게이션 영역
  - 메인 페이지, 검색 페이지, 게시물 등록 페이지, 메시지 페이지(미구현), 유저 페이지
  - 로그인 여부에 따라 유저 페이지 버튼의 디자인 변화
  <details>
    <summary>이미지 보기</summary>
    <left>
      <img
      src="https://jiho-image-storage.s3.ap-northeast-2.amazonaws.com/resume/navigation.png"
      />
    </left>
    </details>

# 구현해야 될 기능
- 해시태그 기능
  - 게시물 등록시 해시태그를 추가 가능
  - 검색시 해시태그로 검색 가능
- 회원 프로필 기능
  - 좋아하는 사료, 간식 등을 기입하고 이를 토대로 해당 제품 판매 페이지 제공
    
# 스택
<table>
  <tr>
    <td rowspan="6">Front-end</td>
  </tr>
  <tr>
    <td>Language</td>
    <td>TypeScript</td>
  </tr>
  <tr>
    <td>Library</td>
    <td>React</td>
  </tr>
  <tr>
    <td>State Container</td>
    <td>Redux Toolkit</td>
  </tr>
  <tr>
    <td>Component</td>
    <td>Styled-Components</td>
  </tr>
  <tr>
    <td>Asynchronous</td>
    <td>Axios</td>
  </tr>
  <tr>
    <td rowspan="6">Back-end</td>
  </tr>
  <tr>
    <td>Language</td>
    <td>JavaScript</td>
  </tr>
  <tr>
    <td>Framework</td>
    <td>Express</td>
  </tr>
  <tr>
    <td>ORM</td>
    <td>Sequelize</td>
  </tr>
  <tr>
    <td>Authorization</td>
    <td>jsonwebtoken</td>
  </tr>
  <tr>
    <td>Database</td>
    <td>MySQL</td>
  </tr>
  <tr>
    <td rowspan="3">Tool</td>
  </tr>
  <tr>
    <td>Api Test</td>
    <td>Postman, REST Client</td>
  </tr>
  <tr>
    <td>Version Control</td>
    <td>Github</td>
  </tr>
  <tr>
    <td rowspan="2">Tool</td>
  </tr>
  <tr>
    <td>AWS Public Cloud Service</td>
    <td>S3</td>
  </tr>
</table>
