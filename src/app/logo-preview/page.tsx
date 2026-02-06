import { BettyLogo, BettyIcon, BettyMark } from "@/components/BettyLogo";

export default function LogoPreviewPage() {
  return (
    <div className="min-h-screen bg-white p-12">
      <h1 className="text-3xl font-bold text-[#1E293B] mb-12">
        Betty Logo — Aerobatic B
      </h1>

      <div className="space-y-16">
        {/* Large version */}
        <section>
          <h2 className="text-lg font-semibold text-[#64748B] mb-6">
            Full Logo (64px) — for hero, headers
          </h2>
          <div className="flex items-center gap-8">
            <div className="p-6 bg-white border rounded-xl">
              <BettyLogo size={64} color="#2B4C7E" />
            </div>
            <div className="p-6 bg-[#2B4C7E] rounded-xl">
              <BettyLogo size={64} color="white" />
            </div>
            <div className="p-6 bg-[#1E293B] rounded-xl">
              <BettyLogo size={64} color="#7FB5B0" />
            </div>
          </div>
        </section>

        {/* Icon version */}
        <section>
          <h2 className="text-lg font-semibold text-[#64748B] mb-6">
            Icon (24px) — for nav, buttons
          </h2>
          <div className="flex items-center gap-8">
            <div className="p-4 bg-white border rounded-lg flex items-center gap-2">
              <BettyIcon size={24} color="#2B4C7E" />
              <span className="text-xl font-bold text-[#2B4C7E]">Betty</span>
              <span className="text-[#7FB5B0] text-xl">.</span>
            </div>
            <div className="p-4 bg-[#2B4C7E] rounded-lg flex items-center gap-2">
              <BettyIcon size={24} color="white" />
              <span className="text-xl font-bold text-white">Betty</span>
              <span className="text-[#7FB5B0] text-xl">.</span>
            </div>
          </div>
        </section>

        {/* Mark version */}
        <section>
          <h2 className="text-lg font-semibold text-[#64748B] mb-6">
            Mark (16px) — for favicon, app icon
          </h2>
          <div className="flex items-center gap-8">
            <div className="w-8 h-8 bg-white border rounded flex items-center justify-center">
              <BettyMark size={16} color="#2B4C7E" />
            </div>
            <div className="w-8 h-8 bg-[#2B4C7E] rounded flex items-center justify-center">
              <BettyMark size={16} color="white" />
            </div>
            <div className="w-8 h-8 bg-[#1E293B] rounded flex items-center justify-center">
              <BettyMark size={16} color="#7FB5B0" />
            </div>
          </div>
        </section>

        {/* Size comparison */}
        <section>
          <h2 className="text-lg font-semibold text-[#64748B] mb-6">
            Size Comparison
          </h2>
          <div className="flex items-end gap-6 p-6 bg-gray-50 rounded-xl">
            <div className="text-center">
              <BettyMark size={16} color="#2B4C7E" />
              <p className="text-xs text-gray-500 mt-2">16px</p>
            </div>
            <div className="text-center">
              <BettyIcon size={24} color="#2B4C7E" />
              <p className="text-xs text-gray-500 mt-2">24px</p>
            </div>
            <div className="text-center">
              <BettyLogo size={32} color="#2B4C7E" />
              <p className="text-xs text-gray-500 mt-2">32px</p>
            </div>
            <div className="text-center">
              <BettyLogo size={48} color="#2B4C7E" />
              <p className="text-xs text-gray-500 mt-2">48px</p>
            </div>
            <div className="text-center">
              <BettyLogo size={64} color="#2B4C7E" />
              <p className="text-xs text-gray-500 mt-2">64px</p>
            </div>
            <div className="text-center">
              <BettyLogo size={96} color="#2B4C7E" />
              <p className="text-xs text-gray-500 mt-2">96px</p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="max-w-2xl">
          <h2 className="text-lg font-semibold text-[#64748B] mb-4">
            The Story
          </h2>
          <p className="text-[#64748B] leading-relaxed">
            The Aerobatic B is inspired by Betty Skelton&apos;s signature aerobatic loops.
            A single continuous line traces an aerobatic ribbon and resolves into a
            lowercase &ldquo;b&rdquo;. The loop represents knowledge circulating continuously —
            never lost, always flowing. Clean enough to work as a favicon at 16px.
          </p>
        </section>
      </div>
    </div>
  );
}
