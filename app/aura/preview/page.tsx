export default function AuraFigmaPreview() {
  return (
    <div className="min-h-screen bg-black flex items-start justify-center pt-20 pb-10 px-4">
      <div className="w-[92vw] max-w-7xl bg-white rounded-2xl border border-gray-200 shadow-[0_6px_20px_rgba(0,0,0,0.10)] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-[#1f2937]">
            AURA Figma Preview
          </h1>
          <a
            href="https://www.figma.com/make/VzCDdr1yorI2GPttgKZnx1/AI-Mental-Health-Chatbot?node-id=0-1&t=ax3ZP17YWRMPh1fa-1"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-emerald-700 hover:underline"
          >
            Open in Figma
          </a>
        </div>
        <div className="aspect-[16/9] w-full bg-[#0b0b0b]">
          <iframe
            title="Figma Preview"
            className="w-full h-full"
            src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fmake%2FVzCDdr1yorI2GPttgKZnx1%2FAI-Mental-Health-Chatbot%3Fnode-id%3D0-1%26t%3Dax3ZP17YWRMPh1fa-1"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}


