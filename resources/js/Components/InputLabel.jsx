export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label {...props} className={`label-text font-black` + className}>
            {value ? value : children}
        </label>
    );
}
