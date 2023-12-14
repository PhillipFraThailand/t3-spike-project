import { CreatePost } from "~/app/_components/create-post";
import { api } from "~/trpc/server";

import { UserButton } from "@clerk/nextjs";

export default async function Home() {
  const allPosts = await api.post.getAll.query();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <UserButton afterSignOutUrl="/" />
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Phillip Eismark
        </h1>
        <CrudShowcase />
        {allPosts?.map((post) => (
          <div key={`${post.id}-${post.createdAt.toDateString()}`}>
            Name: {post.name} Content: {post.content}
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
