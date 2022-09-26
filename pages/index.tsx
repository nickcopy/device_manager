import { User } from "@prisma/client";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Counter from "../components/Counter";
import client from "../libs/server/client";
const Home: NextPage = () => {
  function 사용자추가() {
    fetch("/api/adduser");
  }
  // function 사용자추가함수() {
  //   client.user.create({ data: { name: "콩순이", age: 20, addr: "인터넷" } });
  // }
  const [users, setUsers] = useState<User[]>([]);
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
                <span> 나이{user.age}</span>
              </div>
              <div>{user.addr}</div>
              <div>{user.fayfood}</div>
              <div>{user.createAt.toString()}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
