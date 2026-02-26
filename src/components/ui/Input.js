export default function Input({
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  disabled = false,
  error = false,
  className = "",
  ...props
}) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`
        w-full
        px-3 sm:px-4
        py-2.5 sm:py-3
        text-sm sm:text-base
        rounded-xl
        border
        bg-white
        transition-all duration-200
        outline-none
        ${
          error
            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
            : "border-beige-500 focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
        }
        ${disabled ? "opacity-60 cursor-not-allowed bg-beige-200" : ""}
        ${className}
      `}
      {...props}
    />
  );
}
