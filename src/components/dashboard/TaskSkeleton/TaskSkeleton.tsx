export default function TaskSkeleton() {
  const numberOfLoadingTasks = new Array(5).fill(0).map((_, idx) => idx + 1);

  return (
    <>
      {numberOfLoadingTasks.map((num) => {
        return (
          <div key={num} className="flex bg-slate-100 animate-pulse">
            <div className="h-10 w-2 bg-gray-500"></div>
            <div className="w-full"></div>
          </div>
        );
      })}
    </>
  );
}
