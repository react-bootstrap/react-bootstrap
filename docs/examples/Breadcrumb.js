const breadcrumbInstance = (
  <Breadcrumb>
    <BreadcrumbItem href="#">
      Home
    </BreadcrumbItem>
    <BreadcrumbItem href="http://getbootstrap.com/components/#breadcrumbs">
      Library
    </BreadcrumbItem>
    <BreadcrumbItem active>
      Data
    </BreadcrumbItem>
  </Breadcrumb>
);

React.render(breadcrumbInstance, mountNode);
