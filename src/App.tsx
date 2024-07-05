import { useEffect, useState } from "react";
import { getFollowers } from "./api";

export type Posts = {
  id: number;
  title: string;
  body: string;
}

export default function App() {
  const [posts, setPosts] = useState<Posts[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      const response = await getFollowers(page);
      setPosts(response);
    })();

  }, [page]);


  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {

      if (entries.some((entry) => entry.isIntersecting)) {
        console.log("Elemento está visível!")
        setPage((pageInsideState) => pageInsideState + 1)
      }
    });

    intersectionObserver.observe(document.querySelector('#sentinela') as Element)
    return () => intersectionObserver.disconnect();
  }, []);

  return (
    <>
      <main>
        <h1 className="text-center mt-3 mb-6">GitHub API: Infinite Scroller</h1>
        <h2>Página atual: { page}</h2>

        <ul>
          {posts.map(post => (
            <div key={post.id} className="flex flex-col items-center">
              <div className="mb-5 flex flex-col items-center border w-60 m-auto py-3">
                <p>{post.id}</p>
                <h1>{ post.title }</h1>
                <p className="px-3 text-justify">
                  {post.body}
                </p>
              </div>
            </div>
          ))}
          <li id="sentinela" className="w-60 h-6 bg-red-500 m-auto"></li>
        </ul>
      </main>
    </>
  )
}