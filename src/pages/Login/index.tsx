import { createElement, useState } from 'rax';

import View from 'rax-view';
import Text from 'rax-text';
import { history } from 'rax-app';
import { Form, Radio, Input, Message } from '@alifd/meet';

import cookie from 'react-cookies';

import './index.css';
import Logo from '../../components/Logo';

export default function Login() {
  const [userDetail, setUserDetail] = useState<Record<string, any>>({});

  const handleSubmit = (values, errors) => {
    if (errors === null) {
      setUserDetail(values);
      fetch('http://localhost:7001/login', {
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
            cookie.save('Authorization', `${myJson.token}`);
            cookie.save('username', values.username);
            cookie.save('sex', values.sex);
            // cookie.save('name', myJson.token, { path: '/mainAction' });
            // ?user=${values.username}&password=${values.password}
            history.push(`/mainAction`);
          } else {
            Message.error(myJson.message);
          }
        });
    }
  };

  return (
    <View className="rax-demo-home">
      <Logo uri="//gw.alicdn.com/tfs/TB1MRC_cvb2gK0jSZK9XXaEgFXa-1701-1535.png" />
      <Text className="rax-demo-title">Login</Text>
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
            <Input name="password" type="password" password clear placeholder="Please Input Password" />
          </Form.Item>
          <Form.Item label="sex" required={true}>
            <Radio.Group direction="hoz" dataSource={['男', '女']} name="sex" />
          </Form.Item>
          <View style={{ marginTop: '10rpx' }}>
            <Form.Reset block>Reset</Form.Reset>
            <Form.Submit block type="primary">
              Login
            </Form.Submit>
          </View>
        </Form>
        <View style={{ marginTop: '20rpx' }}>
          <Text onClick={() => history.push('/register')} style={{ color: 'blue' }}>
            No account, click me to register
          </Text>
        </View>
      </View>
    </View>
  );
}
