# create-next-app

next.js typescript 프로젝트

```
> npx create-next-app <폴더명> --typescript
```

# tailwind CSS 적용

1. taolwind CSS 설치

[tailwend 설치 링크](https://tailwindcss.com/docs/guides/nextjs)

```
>npm install -D tailwindcss postcss autoprefixer
>npx tailwindcss init -p
```

npm:패키지를 설치하는 명령러
mpx:패키지 실행 명령어

2.템플릿 경로 구성

```
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
```

tailwind.config.js.에 위에 경로를 추가한다.

3. 지시어 추가

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

./styles/globals.css에 위에 지시어를 추가

# prisma

1. VSCODE `prisma`확장 프로그램 설치

2. `prisma`패키지 설치

```
>npm i prisma -D
>npx prisma init
```

/prisma/schema.prisma 파일 생성됨
.env 파일 생성됨
.gitignore에 .env 추가

3. prisma 초기설정

```
DATABASE_URL = "데이터 베이스 주소 설정"
// postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.
generator client {
  provider = "prisma-client-js"
}
//prisma\schema.prisma
datasource db {
  provider = "mongodb"//사용할 데이터 베이스 지정
  url      = env("DATABASE_URL")
}
```

4.데이터 베이스 스키마 업로드

```
npx prisma db push
```

5. prisma studio 실행 (데이터 베이스 웹 클라이언트)

```
npx prisma studio
```

6. `prisma` client 설정

```
>npx prisma generate
```

# prisma 추가 방법

```
 const Newuser = await client.user.create({
      data: {...},
    });
```

추가 적으로 await을 쓰기위해서는 최상위 함수에 async을 추가할것

# prisma crud 사이트

```
https://www.prisma.io/docs/concepts/components/prisma-client/a
```

# fetch 사용 하는법

```
useEffect(() => {
    //컴포넌트가 실행 될떄 한번만 출력
    fetch("/api/alluser")
      .then((res) => res.json())
      .then((json) => console.log(json));
  }, []);
```

# 중간팁

`// @ts-ignore`
위에 코드는 typescript를 밑에 한줄만 잠시 우회하는 코드이다. \*주의: 잠시만 오류을 우회하는 방법일뿐 해결점이 될수는 없다.

# prisma 릴레이션 외래키지정하는법

```
model Device {
  id       String    @id @default(auto()) @map("_id") @db.ObjectId
  product  String
  location String
  unit     String
  memo     String?
  type     String //co2 HUMI TEMP
  createAt DateTime  @default(now())
  updataAt DateTime  @updatedAt
  sencings Sencing[]
}

model Sencing {
  id       String   @id @default(auto()) @map("_id") @db.ObjectId
  createAt DateTime @default(now())
  updataAt DateTime @updatedAt
  value    Float
  Device   Device?  @relation(fields: [deviceId], references: [id])
  deviceId String?  @db.ObjectId
}
```

model Sencing를 device에서 배열로 만들어 주고 저장하면 자동으로
관계를 맺어줌
