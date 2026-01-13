interface LoaderProps {
  message?: string;
}

export const Loader = ({ message = 'Loading...' }: LoaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-500 rounded-full animate-spin" />
      <p className="text-slate-600 font-medium">{message}</p>
    </div>
  );
};
