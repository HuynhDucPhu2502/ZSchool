const AdminNavItem = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) => (
  <div className="flex items-center space-x-3 px-4 py-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 cursor-pointer">
    {icon}
    <span className="text-sm font-medium">{text}</span>
  </div>
);

export default AdminNavItem;
