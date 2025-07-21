const ChatInput = ({ entrada, setEntrada, onEnviar }) => (
  <div className="flex mt-6 w-full max-w-3xl gap-2">
    <input
      type="text"
      className="flex-1 px-4 py-2 rounded border border-gray-300 text-black"
      placeholder="Digite sua pergunta..."
      value={entrada}
      onChange={(e) => setEntrada(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && onEnviar()}
    />
    <button
      onClick={onEnviar}
      className="bg-white text-[#4a148c] px-4 py-2 rounded font-semibold hover:scale-105 transition"
    >
      Enviar
    </button>
  </div>
);

export default ChatInput;
