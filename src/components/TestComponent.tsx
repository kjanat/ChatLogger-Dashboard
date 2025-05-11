export default function TestComponent() {
  return (
    <div className="p-4 m-4 bg-blue-500 text-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold">Tailwind CSS is working!</h1>
      <p className="mt-2">This component uses Tailwind utility classes.</p>
      <button className="mt-4 px-4 py-2 bg-white text-blue-500 rounded hover:bg-blue-100 transition-colors">
        Click me
      </button>
    </div>
  );
}
