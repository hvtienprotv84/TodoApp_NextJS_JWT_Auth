import Link from "next/link";

const UnAuth: React.FC = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-4 text-center text-[#f8f8f8]">
      <h1 className="mb-6 text-3xl font-bold sm:text-4xl">
        Xin Chào Bạn Đến Với TodoApp NextJS - JWT Authentication
      </h1>
      <p className="mb-6 max-w-3xl text-base sm:text-2xl">
        Hãy Cùng Ghi Chú Công Việc và Làm Việc Năng Suất Nhất Nhé!
      </p>
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <Link href="/login">
          <div className="rounded bg-blue-500 px-6 py-2 text-center font-bold text-[#f8f8f8] hover:bg-blue-700 sm:px-4">
            Đăng Nhập
          </div>
        </Link>
        <Link href="/signup">
          <div className="rounded bg-green-500 px-6 py-2 text-center font-bold text-[#f8f8f8] hover:bg-green-700 sm:px-4">
            Đăng Ký
          </div>
        </Link>
      </div>
    </div>
  );
};

export default UnAuth;
