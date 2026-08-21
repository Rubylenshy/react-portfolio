const ShadowHeading = ({
    as: Tag = 'h2',
    color = 'var(--color-accent-tint-light)',
    offset = 6,
    className = '',
    style = {},
    children,
    ...rest
}) => (
    <Tag
        className={className}
        style={{
            textShadow: `${offset}px ${offset}px 0 ${color}`,
            ...style,
        }}
        {...rest}
    >
        {children}
    </Tag>
)

export default ShadowHeading
