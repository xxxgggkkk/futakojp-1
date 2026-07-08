import { loginAction } from "@/app/admin/actions";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <main className="grid min-h-screen place-items-center bg-neutral-50 px-4">
      <form action={loginAction} className="w-full max-w-sm rounded-lg border border-line bg-white p-6 shadow-soft">
        <h1 className="text-2xl font-semibold text-ink">管理員登入</h1>
        <p className="mt-2 text-sm text-muted">僅管理員可進入後台維護商品。</p>
        {error && <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">Email 或密碼不正確</p>}
        <label className="mt-5 block text-sm font-medium text-ink">
          Email
          <input name="email" type="email" required className="mt-2 h-10 w-full rounded-md border border-line px-3 outline-none focus:border-ink" />
        </label>
        <label className="mt-4 block text-sm font-medium text-ink">
          密碼
          <input name="password" type="password" required className="mt-2 h-10 w-full rounded-md border border-line px-3 outline-none focus:border-ink" />
        </label>
        <button className="mt-6 w-full rounded-md bg-ink px-4 py-3 text-sm font-semibold text-white hover:bg-gold">登入</button>
      </form>
    </main>
  );
}
