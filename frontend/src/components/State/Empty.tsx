interface EmptyStateProps {
  message?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  message = 'No data to display'
}) => {
  return (<div>{message}</div>)
};

export default EmptyState;
