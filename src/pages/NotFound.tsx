import { useEffect, useState } from "react";

const NotFound = () => {
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    const path = window.location.pathname || '/unknown-path';
    setCurrentPath(path);
    
    console.error(
      "404 Error: User attempted to access non-existent route:",
      path
    );
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-50 rounded-full opacity-30" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-50 rounded-full opacity-20" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-lg mx-auto">
        {/* Clean 404 number */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-gray-800 mb-4">
            404
          </h1>
          <div className="w-16 h-1 bg-indigo-500 mx-auto"></div>
        </div>

        {/* Message */}
        <div className="mb-12 space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
            Không tìm thấy trang
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển. 
            Vui lòng kiểm tra lại đường dẫn.
          </p>
        </div>

        {/* Clean action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            Về trang chủ
          </button>
          
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors duration-200"
          >
            Quay lại
          </button>
        </div>

        {/* Error details */}
        <div className="text-sm text-gray-500 border-t border-gray-200 pt-6">
          <p>Mã lỗi: 404</p>
          <p className="font-mono text-xs mt-1 text-gray-400">
            {currentPath}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;