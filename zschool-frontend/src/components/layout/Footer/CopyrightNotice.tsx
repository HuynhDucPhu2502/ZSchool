const CopyRightNotice = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="text-center text-gray-500 text-sm mt-6 border-t border-gray-700 pt-4">
      © {currentYear} ZSchool. All rights reserved.
    </div>
  );
};

export default CopyRightNotice;
