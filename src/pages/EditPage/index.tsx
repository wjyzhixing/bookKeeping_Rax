import { createElement, useState } from 'rax';

import View from 'rax-view';
import Text from 'rax-text';
import { history } from 'rax-app';
import { getSearchParams } from 'rax-app';
import { Form, Radio, Input, Message } from '@alifd/meet';

import cookie from 'react-cookies';

import './index.css';

export default function EditPage() {
  const searchParams = getSearchParams();

  const handleSubmit = (values, errors) => {
    const month = new Date().getMonth() + 1;
    const date = new Date().getDate();
    const year = new Date().getFullYear();
    const param = {
      id: searchParams.id,
      sex: cookie.loadAll().sex,
      username: cookie.loadAll().username,
      time: `${year}年${month}月${date}日`,
      ...values,
    };
    console.log(param);
    if (errors === null) {
      fetch('http://localhost:7001/editContent', {
        method: 'POST',
        body: JSON.stringify(param),
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookie.loadAll().Authorization}`,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then(function (myJson) {
          console.log(myJson);
          if (myJson.err === 0) {
            Message.success(myJson.message);
            history.push(`/mainAction`);
          } else {
            Message.error(myJson.message);
          }
        });
    }
  };
  console.log(cookie.loadAll().sex);
  return (
    <View className="rax-demo-home">
      <Text className="rax-demo-title">Edit Content</Text>
      <View className="demo-content" style={{ padding: 0 }}>
        <Form onSubmit={handleSubmit}>
          <Form.Item label="Price" required={true} requiredMessage="Must Input price">
            <Input outline={false} name="price" placeholder="Please Input price" defaultValue={searchParams.price} />
          </Form.Item>
          <Form.Item label="content" required={true} requiredMessage="Must Input content">
            <Input name="content" clear placeholder="Please Input content" defaultValue={searchParams.content} />
          </Form.Item>
          <View style={{ marginTop: '10px' }}>
            <Form.Reset block>Reset</Form.Reset>
            <Form.Submit block type="primary">
              Change Content
            </Form.Submit>
          </View>
        </Form>
      </View>
    </View>
  );
}
