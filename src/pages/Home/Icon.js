function Icon({ className, children }) {
    return (
        <i className={`${className} align-middle`} style={{ fontSize: '1.25rem', lineHeight: '1' }} aria-hidden="true">
            {children}
        </i>
    );
}
export default Icon;
