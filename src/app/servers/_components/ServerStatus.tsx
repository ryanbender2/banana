const ServerStatus: React.FC<{ status: string }> = ({ status }) => {
  switch (status) {
    case 'STOPPED':
      return <div className="size-2 rounded-full bg-red-500 dark:bg-red-400" />;
    case 'RUNNING':
      return (
        <div className="size-2 rounded-full bg-green-500 dark:bg-green-400" />
      );
    case 'STARTING':
      return (
        <div className="relative flex items-center">
          <span className="size-2 animate-pulse rounded-full bg-yellow-500 dark:bg-yellow-400" />
        </div>
      );
  }
};

export default ServerStatus;
