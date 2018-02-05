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

1. 로그인 SESSION 유지(정확히 세션은 유지되나 FE에서 세션정보를 인지 못함) -> 로그인 성공 응답에서 Cookie 정보 intercept 필요
