interface LoadingStateProps {
  message?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading data...'
}) => {
  return (<div>{message}</div>)
};

export default LoadingState;
