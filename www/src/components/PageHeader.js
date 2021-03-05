function PageHeader({ title, subTitle }) {
  return (
    <div className="bs-docs-header" id="content">
      <div className="container">
        <h1>{title}</h1>
        <p>{subTitle}</p>
      </div>
    </div>
  );
}

export default PageHeader;
