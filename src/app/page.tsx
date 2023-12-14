import { CreatePost } from "~/app/_components/create-post";
import { api } from "~/trpc/server";

import { UserButton } from "@clerk/nextjs";

export default async function Home() {
  const data = await api.post.getAll.query();

  return (
    <main className="body flex h-screen justify-center">
      <div className="h-full w-full border-x border-slate-400 bg-black md:max-w-6xl">
        <div className="border-b p-4">
          <UserButton afterSignOutUrl="/" />
          <h1 className="">Phillip Eismark</h1>
          <CrudShowcase />
        </div>

        {data?.map((post) => (
          <div
            key={`${post.id}-${post.createdAt.toDateString()}`}
            className="border-b  border-slate-400 p-8"
          >
            <div>
              {post.name}
              {post.content}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

async function CrudShowcase() {
  const latestPost = await api.post.getLatest.query();

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}
