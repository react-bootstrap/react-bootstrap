function DocLink({ path, children }) {
  return <a href={`${config.docsUrl}${path}`}>{children}</a>;
}

export default DocLink;
