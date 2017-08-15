import React from 'react';
import { storiesOf } from '@storybook/react';

import Form from '../src/Form';
import FormGroup from '../src/FormGroup';
import FormLabel from '../src/FormLabel';
import FormCheck from '../src/FormCheck';
import FormControl from '../src/FormControl';

import Button from '../src/Button';
import Row from '../src/Row';
import Col from '../src/Col';
import Grid from '../src/Grid';

storiesOf('Forms ', module)
  .add('Form  ✔', () => (
    <Form>
      <FormGroup>
        <FormLabel for="exampleFormControlInput1">Email address</FormLabel>
        <FormControl type="email" class="Form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
      </FormGroup>
      <FormGroup>
        <FormLabel for="exampleFormControlSelect1">Example select</FormLabel>
        <FormControl componentClass="select" id="exampleFormControlSelect1">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </FormControl>
      </FormGroup>
      <FormGroup>
        <FormLabel for="exampleFormControlSelect2">Example multiple select</FormLabel>
        <FormControl multiple componentClass="select" id="exampleFormControlSelect2">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </FormControl>
      </FormGroup>
      <FormGroup>
        <FormLabel for="exampleFormControlTextarea1">Example textarea</FormLabel>
        <FormControl componentClass="textarea" id="exampleFormControlTextarea1" rows="3" />
      </FormGroup>
    </Form>
  ))
  .add('Horizontal form  ✔', () => (
    <Grid>
      <Form>
        <FormGroup componentClass={Row} controlId="inputEmail3">
          <FormLabel column sm={2}>Email</FormLabel>
          <Col sm={10}>
            <FormControl type="email" placeholder="Email"/>
          </Col>
        </FormGroup>
        <FormGroup componentClass={Row} controlId="inputPassword3">
          <FormLabel column sm={2}>Password</FormLabel>
          <Col sm={10}>
            <FormControl type="password" placeholder="Password" />
          </Col>
        </FormGroup>
        <FormGroup componentClass="fieldset">
          <Row>
            <Col componentClass="legend" className="col-form-legend">Radios</Col>
            <Col sm={10}>
              <FormCheck type="radio" value="option1" name="gridRadios" checked>
                {' '}Option one is this and that&mdash;be sure to include why it's great
              </FormCheck>
              <FormCheck type="radio" value="option2" name="gridRadios" checked>
                {' '}Option two can be something else and selecting it will deselect option one
              </FormCheck>
              <FormCheck type="radio" disabled value="option3" name="gridRadios" checked>
                {' '}Option three is disabled
              </FormCheck>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup componentClass={Row}>
          <Col sm={2}>Checkbox</Col>
          <Col sm={10}>
            <FormCheck type="checkbox">
              {' '}Check me out
            </FormCheck>
          </Col>
        </FormGroup>
        <FormGroup componentClass={Row}>
          <Col sm={10}>
            <Button type="submit" bsStyle="primary">Sign in</Button>
          </Col>
        </FormGroup>
      </Form>
    </Grid>
  ))
  .add('form-row', () => <span />)
  .add('File input ✔', () => (
    <Form>
      <FormGroup>
        <FormLabel>Example file input</FormLabel>
        <FormControl type="file" id="exampleFormControlFile1" />
      </FormGroup>
    </Form>
  ))
  .add('Readonly ✔', () => (
    <FormControl readOnly />
  ))
  .add('Plaintext ✔', () => (
    <Form>
      <FormGroup componentClass={Row}>
        <FormLabel column sm={2}>Blah</FormLabel>
        <Col sm={10}>
        <FormControl placeholder="another input" />
        </Col>
      </FormGroup>
      <FormGroup componentClass={Row}>
        <FormLabel column sm={2}>Example file input</FormLabel>
        <Col sm={10}>
          <FormControl plaintext value="email@example.com" />
        </Col>
      </FormGroup>
    </Form>
  ))
  .add('Sizes ✔', () => (
    <Form>
      <FormControl placeholder="large" bsStyle="lg" /><br />
      <FormControl placeholder="default" /><br />
      <FormControl placeholder="small" bsStyle="sm" /><br />

      <FormControl componentClass="select" bsStyle="lg" >
        <option>Large select</option>
      </FormControl>
      <br />
      <FormControl componentClass="select">
        <option>Default select</option>
      </FormControl>
      <br />
      <FormControl componentClass="select" bsStyle="sm">
        <option>Small select</option>
      </FormControl>
    </Form>
  ))
