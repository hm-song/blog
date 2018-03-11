# personal blog web application

#### 사용 기술
- Spring Boot
- Spring JPA
- Spring Security
- React
- Bootstrap

#### User API
| 기능 | API |
|-----|-----|
| 포스트 목록 | GET /api/public/posts |
| 포스트 보기 | GET /api/public/posts/{id} |
| 답글 달기 | /api/public/posts/{id}/comments |

#### Admin API
| 기능 | API |
|-----|-----|
| 포스트 목록 | GET /api/admin/posts |
| 포스트 보기 | GET /api/admin/posts/{id} |
| 포스트 등록 | POST /api.admin/posts |
| 포스트 수정 화면 | GET /api/admin/posts/{id}/update |
| 포스트 수정 | POST /api/admin/posts/{id}/update |
| 포스트 삭제 | POST /api/admin/posts/{id}/delete |


#### TODO

(Done)1. 로그인 SESSION 유지(정확히 세션은 유지되나 FE에서 세션정보를 인지 못함) -> 로그인 성공 응답에서 Cookie 정보 intercept 필요

- 게시글 수정(생성?) 이후 authenticated 상태 변경 이슈

- 댓글

- 코드 하이라이트

- 태그

- 검색

- 이전, 다음 포스트

- 에러 처리



98. 에디터 교체 검토(Quill의 기능 거의 사용 안함)

99. 로그인 팝업 엔터 기능
