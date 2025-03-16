export function Badge({ title, value }: { title: string; value: number }) {
  return (
    <div
      className={`flex w-52 h-36 p-8 flex-col justify-center items-center gap-4 border-2 border-gray-300 rounded-xl`}
    >
      <p
        className="text-xl font-[600] text-blue-500"
        style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
        font-family="Helvetica, Arial, sans-serif"
      >
        {title}
      </p>
      <p
        className="text-xl font-[400] text-gray-800"
        style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
        font-family="Helvetica, Arial, sans-serif"
      >
        {value}
      </p>
    </div>
  );
}
