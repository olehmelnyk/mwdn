interface ErrorStateProps {
  message?: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({
  message = 'Some error occurred...'
}) => {
  return (<div>{message}</div>)
};

export default ErrorState;
