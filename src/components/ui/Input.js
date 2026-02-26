export default function Input({ name, placeholder, onChange }) {
  return (
    <input
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      className="w-full px-4 py-3 rounded-xl border border-beige-500 bg-white
      focus:border-primary-600 focus:ring-1 focus:ring-primary-600
      outline-none transition"
    />
  );
}
