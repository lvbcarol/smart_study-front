const ChatMessage = ({ tipo, texto }) => {
  const isBot = tipo === "bot";

  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"}`}>
      {isBot && (
        <img
          src="/images/chatbot.png"
          alt="Bot"
          className="w-10 h-10 mr-2 rounded-full"
        />
      )}
      <div
        className={`rounded-lg p-3 max-w-[75%] text-sm leading-relaxed ${
          isBot
            ? "bg-[#845ec2] text-white"
            : "bg-gray-100 text-black"
        }`}
        dangerouslySetInnerHTML={{ __html: texto }}
      />
      {!isBot && (
        <i className="bi bi-person-circle text-2xl text-white ml-2" />
      )}
    </div>
  );
};

export default ChatMessage;
