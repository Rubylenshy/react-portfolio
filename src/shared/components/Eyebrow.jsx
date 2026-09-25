// "01 — LABEL" section marker. Every major section carries one; numbering restarts per page.
const Eyebrow = ({ num, label, as: Tag = 'p', className = '', ...rest }) => (
  <Tag className={`eyebrow ${className}`} {...rest}>
    {num && (
      <>
        <span className="eyebrow-num">{num}</span>
        <span aria-hidden="true">—</span>
      </>
    )}
    <span>{label}</span>
  </Tag>
)

export default Eyebrow
