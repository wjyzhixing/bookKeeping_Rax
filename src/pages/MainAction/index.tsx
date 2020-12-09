import { createElement, useEffect, useState } from 'rax';
import Ticket from '@/assets/ticket.png';
import View from 'rax-view';
import Text from 'rax-text';
import { history } from 'rax-app';
import cookie from 'react-cookies';
// import { getSearchParams } from 'rax-app';
// import axios from 'axios';
import { Button, List, Message, Avatar, Icon, Dialog, Select } from '@alifd/meet';

import './index.css';

export default function MainAction(props) {
  const [cookies, setCookies] = useState();
  const [dialog, setDialog] = useState<boolean>(false);
  const [listContent, setListContent] = useState<any>([]);
  const [itemValue, setItemValue] = useState({});
  // const searchParams = getSearchParams();

  const optionList = ['男', '女', ''];

  const getInitialInfo = () => {
    fetch('http://localhost:7001/mainContent', {
      method: 'POST',
      // credentials: 'include',
      body: JSON.stringify({
        userName: cookie.loadAll().username,
      }),
      headers: new Headers({
        Authorization: `Bearer ${cookie.loadAll().Authorization}`,
        'Content-Type': 'application/json',
      }),
    })
      .then((response) => {
        if (response.status == 401) {
          Message.show({
            type: 'warning',
            title: 'You are not authorized.',
          });
        }
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);
        setListContent(myJson.result);
      });
  };

  const delInfo = (item) => {
    fetch('http://localhost:7001/delContent', {
      method: 'POST',
      // credentials: 'include',
      body: JSON.stringify({
        id: item.id,
      }),
      headers: new Headers({
        Authorization: `Bearer ${cookie.loadAll().Authorization}`,
        'Content-Type': 'application/json',
      }),
    })
      .then((response) => {
        if (response.status == 401) {
          Message.show({
            type: 'warning',
            title: 'You are not authorized.',
          });
        }
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);
        getInitialInfo();
      });
  };

  useEffect(() => {
    setCookies(cookie.loadAll());
    console.log(cookie.loadAll().Authorization);
    getInitialInfo();
  }, []);

  const reduceValue = (list: Record<string, any>): number => {
    let res: number = 0;
    list.forEach((item) => {
      // console.log(item);
      if (String(item['price']).slice(0, 1) === '-') {
        res += Number(String(item['price']).slice(1));
      }
    });
    return res;
  };

  const addValue = (list: Record<string, any>): number => {
    let res: number = 0;
    list.forEach((item) => {
      // console.log(item);
      if (String(item['price']).slice(0, 1) !== '-') {
        res += item.price;
      }
    });
    return res;
  };

  const delContent = (item) => {
    console.log(item);
    setItemValue(item);
    setDialog(true);
  };

  const changeContent = (item) => {
    history.push(`/editPage?sex=${cookie.loadAll().sex}&price=${item.price}&content=${item.content}&id=${item.id}`);
  };

  const returnLogin = () => {
    cookie.remove('sex');
    cookie.remove('username');
    cookie.remove('Authorization');
    history.push(`/`);
  };

  console.log(listContent);
  return (
    <View className="rax-demo-home">
      <Avatar size="large" shape="square" src={Ticket} />
      <Text className="rax-demo-title">Book Keeping Application</Text>
      <View className="rax-demo-username">
        <Text>Hello</Text> <Text style={{ color: 'blue' }}>{cookie.loadAll().username}</Text>
      </View>
      <Text className="rax-demo-info">Please check your bill</Text>
      <View className="rax-demo-username">
        <Text>支出</Text> <Text style={{ color: 'blue', marginRight: '20rpx' }}>{reduceValue(listContent)}</Text>
        <Text>收入</Text> <Text style={{ color: 'blue', marginRight: '20rpx' }}>{addValue(listContent)}</Text>
        <Text>结余</Text> <Text style={{ color: 'blue' }}>{addValue(listContent) - reduceValue(listContent)}</Text>
      </View>
      <View>
        <Select
          onChange={(v) => {
            console.log(v);
          }}
        >
          {/* {()} */}
          <Select.Option value={1}>option 1</Select.Option>
          <Select.Option value={2}>option 2</Select.Option>
          <Select.Option value={3}>option 3</Select.Option>
        </Select>
      </View>
      <View className="rax-btn-list">
        <List>
          {listContent.map((item, index) => (
            <List.Item title={item.content} description={item.time} extra={item.price} action key={item.id}>
              {/* <List.ItemTitle>{item.user_sex}</List.ItemTitle> */}
              <List.ItemAction>
                <Icon name="delete-filling" onClick={() => delContent(item)} />
              </List.ItemAction>
              <List.ItemAction>
                <Icon name="edit" onClick={() => changeContent(item)} />
              </List.ItemAction>
            </List.Item>
          ))}
        </List>
      </View>
      <View className="rax-btn">
        <Button type="primary" onClick={() => history.push(`/addPage`)} style={{ marginRight: '30rpx' }}>
          增加账单
        </Button>
        <Button
          type="primary"
          onClick={() => {
            returnLogin();
          }}
        >
          返回登录
        </Button>
      </View>
      <Dialog
        visible={dialog}
        title="请确认"
        content="是否要移除此项目"
        type="confirm"
        onOk={() => {
          setDialog(false);
          delInfo(itemValue);
        }}
        onClose={() => {
          setDialog(false);
        }}
      />
    </View>
  );
}
