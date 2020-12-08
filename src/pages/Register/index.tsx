import { createElement, useState } from 'rax';

import View from 'rax-view';
import Text from 'rax-text';
import { history } from 'rax-app';
import { Form, Radio, Input, Message } from '@alifd/meet';

import './index.css';
import Logo from '../../components/Logo';

export default function Register() {
  const handleSubmit = (values: any, errors: null) => {
    if (errors === null) {
      fetch('http://localhost:7001/register', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then(function (myJson) {
          console.log(myJson);
          if (myJson.err === 0) {
            Message.success(myJson.message);
          } else {
            Message.error(myJson.message);
          }
        });
    }
  };

  return (
    <View className="rax-demo-home">
      <Logo uri="//gw.alicdn.com/tfs/TB1MRC_cvb2gK0jSZK9XXaEgFXa-1701-1535.png" />
      <Text className="rax-demo-title">Register</Text>
      <View className="demo-content" style={{ padding: 0 }}>
        <Form onSubmit={handleSubmit}>
          <Form.Item label="UserName" required={true} requiredMessage="Must Input User Name">
            <Input outline={false} name="username" placeholder="Please Input User Name" />
          </Form.Item>
          <Form.Item
            label="Password"
            required={true}
            requiredMessage="Must Input Password"
            minLength={6}
            maxLength={16}
            minmaxMessage="Password must between 6 and 16"
          >
            <Input name="password" type="password" clear placeholder="Please Input Password" />
          </Form.Item>
          <Form.Item label="sex" required={true}>
            <Radio.Group direction="hoz" dataSource={['男', '女']} name="sex" />
          </Form.Item>
          <View style={{ marginTop: '10px' }}>
            <Form.Reset block>Reset</Form.Reset>
            <Form.Submit block type="primary">
              Register
            </Form.Submit>
          </View>
        </Form>
        <View style={{ marginTop: '20rpx' }}>
          <Text onClick={() => history.push('/login')} style={{ color: 'blue' }}>
            Own account, click me to login
          </Text>
        </View>
      </View>
    </View>
  );
}
