import { User } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Counter from "../components/Counter";
import client from "../libs/server/client";
const Home: NextPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [rename, setreName] = useState("");
  // const router = useRouter();
  function 사용자추가() {
    fetch("/api/adduser")
      .then((res) => res.json())
      .then(
        (json) => setUsers([...users, json.user])
        // users.push(json.user)
      );
    // router.reload();
  }
  // function 사용자추가함수() {
  //   client.user.create({ data: { name: "콩순이", age: 20, addr: "인터넷" } });
  // }
  function 사용자삭제(targetID: string) {
    fetch(`/api/user/delete/${targetID}`)
      .then((res) => res.json())
      .then((json) => {
        const filterUser = users.filter((user) => user.id !== json.deletedId);

        setUsers(filterUser);
        console.log("여기서 실행하자");
        console.log(json.deletedId);
      });
  }

  function 이름변경(targetID: String) {
    if (!rename) return;
    const data = { name: rename };
    fetch(`/api/user/update/${targetID}`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    console.log(`${targetID}의 이름을 ${rename}으로`);
  }
  useEffect(() => {
    //컴포넌트가 실행 될떄 한번만 출력
    fetch("/api/alluser")
      .then((res) => res.json())
      .then((json) => setUsers(json.users));
  }, []);
  return (
    <div>
      <Counter aboutName={"이진우"} startDate={20220926} />
      <button className="bg-gray-300 rounded m-2" onClick={사용자추가}>
        사용자 추가
      </button>

      <div className="flex flex-wrap">
        {users.map((user) => {
          return (
            <div key={user.id} className="border-2">
              <div className="text-2xl font-bold">
                <span>{user.name}</span>
                <span> 나이:{user.age}</span>
              </div>
              <div>{user.addr}</div>
              <div>{user.fayfood}</div>
              <div>{user.createAt.toString()}</div>
              <div>{user.id}</div>
              <div>
                <input
                  type={"text"}
                  className="border"
                  value={rename}
                  onChange={(e) => setreName(e.currentTarget.value)}
                />
                <button
                  className="bg-gray-200 text-blue-200 px-2 "
                  onClick={() => 이름변경(user.id)}
                >
                  수정
                </button>
              </div>
              <button
                onClick={() => 사용자삭제(user.id)}
                className="bg-gray-200 test-red-200 px-1 rounded hover:bg-gray-300"
              >
                사용자 삭제
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
