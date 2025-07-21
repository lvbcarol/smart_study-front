const SaveButton = () => {
  const handleSave = () => {
    alert("Função de salvar em desenvolvimento...");
  };

  return (
    <button
      onClick={handleSave}
      className="mt-4 border border-white px-4 py-2 rounded hover:bg-white hover:text-[#4a148c] transition"
    >
      💾 Salvar conversa
    </button>
  );
};

export default SaveButton;
