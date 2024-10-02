interface TLabelProps {
  htmlFor: string;
  className?: string;
  children: React.ReactNode;
}

const TLabel: React.FC<TLabelProps> = ({ htmlFor, children, className }) => {
  return (
    <label className={className} htmlFor={htmlFor}>
      {children}
    </label>
  );
};

export default TLabel;
