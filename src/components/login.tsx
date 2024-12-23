"use client";

import Link from "next/link";
import { type SVGProps, useState } from "react";
import { useRouter } from "next/navigation";
import { signinGithub, signinGoogle } from "@/lib/social-login";
import { authClient } from "@/lib/auth-client";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    await authClient.signIn.email(
      {
        email,
        password,
        rememberMe: remember,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          router.push("/");
        },
        onError: (ctx) => {
          setLoading(false);
          alert(ctx.error.message);
        },
      },
    );
  };

  return (
    <div className="relative flex min-h-[100dvh] items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="z-10 mx-auto w-full max-w-[500px] text-white">
        <div className="mb-8 text-center">
          <h1 className="font-geist text-3xl font-normal tracking-tighter">
            Welcome back
          </h1>
          <p className="font-geist font-normal text-gray-800/90 dark:text-gray-400">
            Sign in to your account to continue
          </p>
        </div>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-white"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="block w-full rounded-md border-0 py-3 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 sm:text-sm/6"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-white"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="block w-full rounded-md border-0 py-3 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 sm:text-sm/6"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 rounded-lg border-gray-300 text-purple-600 focus:ring-purple-600"
              />
              <label
                htmlFor="remember-me"
                className="ml-3 block text-sm/6 text-white"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm/6">
              <a
                href="/forget-password"
                className="font-normal text-white hover:text-purple-100"
              >
                Forgot password?
              </a>
            </div>
          </div>
          <button
            onClick={signIn}
            className="font-geist relative mx-auto h-12 w-full transform-gpu overflow-hidden rounded bg-neutral-950 bg-purple-200/10 px-5 py-2.5 text-center tracking-tighter text-white transition-all duration-300 hover:bg-neutral-800 hover:bg-transparent/5 hover:ring-2 hover:ring-purple-800 hover:ring-offset-2 hover:ring-offset-zinc-900 active:bg-transparent dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset]"
          >
            {loading ? (
              <span className="relative">Signing In...</span>
            ) : (
              <span className="relative">Sign In</span>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-500 dark:text-gray-400">
            Don&apos;t have an account?
            <Link
              className="ml-2 font-medium text-gray-900 underline-offset-4 hover:underline dark:text-gray-500"
              href="/signup"
            >
              Sign up
            </Link>
          </p>
        </div>
        <div className="mt-6 border-t border-t-gray-600 pt-6">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={signinGithub}
              className="font-geist relative mx-auto flex h-12 w-full transform-gpu items-center justify-center gap-2 overflow-hidden rounded bg-neutral-950 bg-purple-200/10 px-5 py-2.5 text-center tracking-tighter text-white transition-all duration-300 hover:bg-neutral-800 hover:bg-transparent/5 hover:ring-2 hover:ring-purple-800 hover:ring-offset-2 hover:ring-offset-zinc-900 active:bg-transparent dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset]"
            >
              <GithubIcon className="mr-2 h-4 w-4" />
              Sign in with GitHub
            </button>

            <button
              onClick={signinGoogle}
              className="font-geist relative mx-auto flex h-12 w-full transform-gpu items-center justify-center gap-2 overflow-hidden rounded bg-neutral-950 bg-purple-200/10 px-5 py-2.5 text-center tracking-tighter text-white transition-all duration-300 hover:bg-neutral-800 hover:bg-transparent/5 hover:ring-2 hover:ring-purple-800 hover:ring-offset-2 hover:ring-offset-zinc-900 active:bg-transparent dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset]"
            >
              <ChromeIcon className="mr-2 h-4 w-4" />
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChromeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  );
}

function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}
