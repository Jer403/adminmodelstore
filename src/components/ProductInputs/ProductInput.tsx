export function ProductInput<T>({
  value,
  setValue,
  identifier,
  name,
  type,
  required,
  placeholder,
}: {
  value: T;
  setValue: React.Dispatch<React.SetStateAction<T>>;
  identifier: string;
  name: string;
  type: string;
  required: boolean;
  placeholder: string;
}) {
  return (
    <div className="relative">
      <label
        htmlFor={identifier}
        className="absolute top-[-14px] left-3 px-1 bg-gray-50  text-lg"
      >
        {name}
      </label>
      {type == "textarea" ? (
        <textarea
          value={value as string}
          onChange={(e) => setValue(e.target.value as T)}
          name={identifier}
          id={identifier}
          required={required}
          className="w-3xl h-28 text-2xl text-gray-900 placeholder-gray-400 bg-gray-50 border-2 border-solid border-gray-400 hover:border-indigo-600 focus:outline-indigo-600 rounded-md p-1.5"
          placeholder={placeholder}
        ></textarea>
      ) : (
        <input
          value={value as string | number}
          onChange={(e) => {
            const newValue =
              type === "number" ? parseFloat(e.target.value) : e.target.value;
            setValue(newValue as T);
          }}
          type={type}
          name={identifier}
          id={identifier}
          required={required}
          className="w-3xl h-16 text-2xl text-gray-900 bg-gray-50 border-2 border-solid border-gray-400 hover:border-indigo-600 focus:outline-indigo-600 rounded-md p-1.5"
          placeholder={placeholder}
          min={type === "number" ? 0 : undefined}
        />
      )}
    </div>
  );
}
