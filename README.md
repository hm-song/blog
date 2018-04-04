# personal blog web application

#### 사용 기술
- Spring Boot
- Spring JPA
- Spring Security
- React
- Bootstrap
- MySQL

#### Front-end Dependencies
- [axios](https://www.npmjs.com/package/axios)
- [redux](https://www.npmjs.com/package/redux)
- [react-router-rom](https://www.npmjs.com/package/react-router-dom)
- [redux-actions](https://www.npmjs.com/package/redux-actions)
- [redux-thunk](https://www.npmjs.com/package/redux-thunk)
- [react-tag-input](https://www.npmjs.com/package/react-tag-input)
- [immutable](https://www.npmjs.com/package/immutable)
- [qs](https://www.npmjs.com/package/qs)
- [quill](https://quilljs.com/)
- [prism](http://prismjs.com/)

#### User API
| 기능 | API |
|-----|-----|
| 포스트 목록 | GET /api/public/posts |
| 포스트 보기 | GET /api/public/posts/{id} |
| 로그인 세션 확인 | GET /api/public/checkAuthentication |
| RSS | GET /rss |

#### Admin API
| 기능 | API |
|-----|-----|
| 포스트 등록 | POST /api/admin/posts/write |
| 포스트 수정 | POST /api/admin/posts/{id}/modify |

#### How to run in local

1. application.properties의 *spring.jpa.hibernate.ddl-auto*를 true 설정.
2. root classpath에 *classified.properties* 파일 생성. 이후 아래 프로퍼티들 추가

    - db.address=
    - db.port=
    - db.username=
    - db.password=
    - admin.username=
    - admin.password=

3. MySQL에 *blog* 스키마 생성
4. `$ mvn clean package`를 이용해 webpack build 수행
5. 구동