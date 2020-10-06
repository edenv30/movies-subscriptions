import React from 'react';

import { useHistory } from 'react-router-dom';

import {Button} from 'react-bootstrap';

const  BackButton = ({ children }) => {
  let history = useHistory()
  return (
    <Button className="btn btn-danger" type="button" onClick={() => history.goBack()}>
      {children}
    </Button>
  )
}

export default BackButton;