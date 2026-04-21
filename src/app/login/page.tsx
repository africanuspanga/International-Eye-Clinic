"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Eye, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = createClient();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      router.push("/admin");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f6fa] px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="flex items-center justify-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[#1a2a6c] flex items-center justify-center text-white">
              <Eye size={28} />
            </div>
          </div>
          <h1
            className="text-2xl font-bold text-center text-[#111827] mb-2"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Admin Login
          </h1>
          <p
            className="text-center text-[#6b7280] text-sm mb-8"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            International Eye Hospital CMS
          </p>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm rounded-xl p-4 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label
                className="block text-sm font-medium text-[#374151] mb-1.5"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1a2a6c] focus:ring-2 focus:ring-[#1a2a6c]/10 outline-none transition-all text-sm"
                placeholder="admin@eye.co.tz"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-[#374151] mb-1.5"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1a2a6c] focus:ring-2 focus:ring-[#1a2a6c]/10 outline-none transition-all text-sm"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1a2a6c] hover:bg-[#243688] text-white font-semibold py-3.5 rounded-xl text-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : null}
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
