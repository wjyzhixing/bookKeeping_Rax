import { createElement, useState, useEffect } from 'rax';

import View from 'rax-view';
import Text from 'rax-text';
import { history } from 'rax-app';
import cookie from 'react-cookies';
import { Avatar, Message, Button } from '@alifd/meet';
import { WordCloudChart } from '@alife/bizcharts-mobile';
import { host } from '@/utils/const';
import './index.less';
import Ticket from '@/assets/ticket.png';

export default function ShowStatus() {
  const [option, setOption] = useState({});

  const initial = () => {
    const value = {
      username: cookie.loadAll().username,
    };
    fetch(`${host}showStatus`, {
      method: 'POST',
      body: JSON.stringify(value),
      headers: new Headers({
        Authorization: `Bearer ${cookie.loadAll().Authorization}`,
        'Content-Type': 'application/json',
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);
        setOption({
          data: myJson,
          color: 'user_sex',
          fontSize: {
            max: 28,
          },
        });
        if (myJson.err === 0) {
          Message.success(myJson.message);
        } else {
          Message.error(myJson.message);
        }
      });
  };

  useEffect(() => {
    initial();
  }, []);

  console.log(option);
  return (
    <View className="rax-demo-home">
      <Avatar size="large" shape="square" src={Ticket} />
      <Text className="rax-demo-title">Bill distribution</Text>
      <View className="rax-demo-view" style={{ padding: 0 }}>
        <WordCloudChart options={option} />
      </View>
      <Button onClick={() => history.push('/mainAction')}>返回主页</Button>
    </View>
  );
}
