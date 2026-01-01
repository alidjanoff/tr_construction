import './Loader.scss';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  light?: boolean;
}

const Loader = ({ size = 'md', light = false }: LoaderProps) => {
  const classes = [
    'loader',
    `loader--${size}`,
    light && 'loader--light',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      <div className="loader__spinner">
        <div className="loader__ring" />
        <div className="loader__ring" />
        <div className="loader__ring" />
      </div>
    </div>
  );
};

export default Loader;
