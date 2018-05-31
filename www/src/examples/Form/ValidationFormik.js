const { Formik } = formik;

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  username: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
  zip: yup.string().required(),
  terms: yup.bool().required(),
});

function FormExample() {
  return (
    <Formik
      validationSchema={schema}
      onSubmit={console.log}
      initialValues={{
        firstName: 'Mark',
        lastName: 'Otto',
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Row>
            <FormGroup as={Col} md="4" controlId="validationFormik01">
              <FormLabel>First name</FormLabel>
              <FormControl
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                isValid={touched.firstName && !errors.firstName}
              />
              <FormControl.Feedback>Looks good!</FormControl.Feedback>
            </FormGroup>
            <FormGroup as={Col} md="4" controlId="validationFormik02">
              <FormLabel>Last name</FormLabel>
              <FormControl
                type="text"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                isValid={touched.firstName && !errors.lastName}
              />

              <FormControl.Feedback>Looks good!</FormControl.Feedback>
            </FormGroup>
            <FormGroup as={Col} md="4" controlId="validationFormikUsername">
              <FormLabel>Username</FormLabel>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  type="text"
                  placeholder="Username"
                  aria-describedby="inputGroupPrepend"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  isInvalid={!!errors.username}
                />
                <FormControl.Feedback type="invalid">
                  {errors.username}
                </FormControl.Feedback>
              </InputGroup>
            </FormGroup>
          </Form.Row>
          <Form.Row>
            <FormGroup as={Col} md="6" controlId="validationFormik03">
              <FormLabel>City</FormLabel>
              <FormControl
                type="text"
                placeholder="City"
                name="city"
                value={values.city}
                onChange={handleChange}
                isInvalid={!!errors.city}
              />

              <FormControl.Feedback type="invalid">
                {errors.city}
              </FormControl.Feedback>
            </FormGroup>
            <FormGroup as={Col} md="3" controlId="validationFormik04">
              <FormLabel>State</FormLabel>
              <FormControl
                type="text"
                placeholder="State"
                name="state"
                value={values.state}
                onChange={handleChange}
                isInvalid={!!errors.state}
              />
              <FormControl.Feedback type="invalid">
                {errors.state}
              </FormControl.Feedback>
            </FormGroup>
            <FormGroup as={Col} md="3" controlId="validationFormik05">
              <FormLabel>Zip</FormLabel>
              <FormControl
                type="text"
                placeholder="Zip"
                name="zip"
                value={values.zip}
                onChange={handleChange}
                isInvalid={!!errors.zip}
              />

              <FormControl.Feedback type="invalid">
                {errors.zip}
              </FormControl.Feedback>
            </FormGroup>
          </Form.Row>
          <FormGroup>
            <FormCheck
              required
              name="terms"
              label="Agree to terms and conditions"
              onChange={handleChange}
              isInvalid={!!errors.terms}
              invalidFeedback={errors.terms}
              id="validationFormik0"
            />
          </FormGroup>
          <Button type="submit">Submit form</Button>
        </Form>
      )}
    </Formik>
  );
}

render(<FormExample />);
