"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiFillMessage } from "react-icons/ai";
import { toast } from "react-toastify";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    if (!email || !password) {
      toast("All fields are required!", {
        style: {
          background: "#9810fa",
          color: "white",
        },
      });
      setLoading(false);
      return;
    }

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      toast("Invalid Credentials", {
        style: {
          background: "#9810fa",
          color: "white",
        },
      });
    } else {
      toast("Signin successful", {
        style: {
          background: "#9810fa",
          color: "white",
        },
      });
      router.replace("/auth/setup-profile");
    }

    setLoading(false);
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="max-w-87.5 w-[95%]">
        <div className="flex justify-center text-indigo-600">
          <AiFillMessage size={50} />
        </div>
        <h2 className="text-center text-3xl font-bold my-6 text-gray-300">
          Setup Profile
        </h2>
        <div className="py-10 px-6 rounded-lg  shadow-md">
          <form onSubmit={handleSignin}>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email Address"
              className="w-full px-4 py-3 placeholder-text-gray-400 bg-input-bg rounded-lg outline-none text-gray-100 my-3"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="text"
              placeholder="Password"
              className="w-full px-4 py-3 placeholder-text-gray-400 bg-input-bg rounded-lg outline-none text-gray-100 my-3"
            />
            <label className="text-gray-400">Profile Picture</label>
            <input
              type="file"
              className="w-full px-4 py-3 placeholder-text-gray-400 bg-input-bg rounded-lg outline-none text-gray-100 my-3"
            />
            <button className="w-full bg-linear-to-r from-blue-500 to-purple-600 my-2 py-2 text-white rounded-lg cursor-pointer hover:from-blue-600 transition">
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
