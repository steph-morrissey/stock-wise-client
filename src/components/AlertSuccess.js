import React from 'react';
import { Alert } from 'antd';

const AlertSuccess = ({ alertMessage, success, onClose }) => {
  return (
    <div style={{ padding: '10px' }}>
      {success ? (
        <Alert
          message={alertMessage}
          type='success'
          closeText='OK'
          onClose={onClose}
        />
      ) : null}
    </div>
  );
};

export default AlertSuccess;
