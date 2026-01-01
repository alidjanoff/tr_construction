import { type InputHTMLAttributes, forwardRef, useState } from 'react';
import './CustomInput.scss';

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  error?: string;
  isTextarea?: boolean;
  rows?: number;
}

const CustomInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, CustomInputProps>(
  ({ label, error, isTextarea = false, rows = 4, className = '', ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = props.value && String(props.value).length > 0;

    const inputClasses = [
      'custom-input',
      isFocused && 'custom-input--focused',
      hasValue && 'custom-input--has-value',
      error && 'custom-input--error',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setIsFocused(true);
      props.onFocus?.(e as React.FocusEvent<HTMLInputElement>);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setIsFocused(false);
      props.onBlur?.(e as React.FocusEvent<HTMLInputElement>);
    };

    return (
      <div className={inputClasses}>
        <label className="custom-input__label">{label}</label>
        {isTextarea ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            className="custom-input__field custom-input__field--textarea"
            rows={rows}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...(props as InputHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            className="custom-input__field"
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...(props as InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
        {error && <span className="custom-input__error">{error}</span>}
      </div>
    );
  }
);

CustomInput.displayName = 'CustomInput';

export default CustomInput;
