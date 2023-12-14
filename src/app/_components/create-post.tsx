"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

export function CreatePost() {
  const router = useRouter();
  const [name, setName] = useState("");

  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createPost.mutate({ name });
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        placeholder="Title"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <button
        type="submit"
        className="GlowingButton "
        disabled={createPost.isLoading}
      >
        <div className="GlowingButton__glowWrap l">
          <span className="GlowingButton__glow"></span>
        </div>
        <div className="GlowingButton__glowWrap r">
          <span className="GlowingButton__glow"></span>
        </div>
        <span className="GlowingButton__overlay"></span>
        <div className="GlowingButton__content">
          <span>{createPost.isLoading ? "Submitting..." : "Submit"}</span>
          <span>{createPost.isLoading ? "Submitting..." : "Submit"}</span>
        </div>
      </button>
    </form>
  );
}
