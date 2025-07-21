const IconButton = ({ onClick, icon, color = "gray" }) => (
  <button
    onClick={onClick}
    className={`text-sm rounded px-2 py-1 font-bold text-white bg-${color}-600 hover:bg-${color}-700 transition`}
  >
    {icon}
  </button>
);

export default IconButton;
