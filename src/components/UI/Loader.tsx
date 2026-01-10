import './Loader.scss';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  fullPage?: boolean;
}

const Loader = ({ size = 'md', fullPage = false }: LoaderProps) => {
  return (
    <div className={`loader-container ${fullPage ? 'loader-container--full' : ''}`}>
      <div className={`spinner spinner--${size}`}>
        <div className="spinner__circle"></div>
      </div>
    </div>
  );
};

export default Loader;
