import { createElement, useEffect } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import { history } from 'rax-app';
import { Button } from '@alifd/meet';
import cookie from 'react-cookies';
import './index.css';
import Logo from '../../components/Logo';

export default function Home() {
  useEffect(() => {
    cookie.remove('sex');
    cookie.remove('username');
    cookie.remove('Authorization');
  }, []);

  return (
    <View className="rax-demo-home">
      <Logo uri="//gw.alicdn.com/tfs/TB1MRC_cvb2gK0jSZK9XXaEgFXa-1701-1535.png" />
      <Text className="rax-demo-title">Book Keeping Application</Text>
      <Text className="rax-demo-info">Welcome to use this app.</Text>
      <Text className="rax-demo-info">Please choose Login or register</Text>
      <View className="rax-btn-flex">
        <Button type="primary" onClick={() => history.push('/login')}>
          Log in
        </Button>
        <Button type="default" onClick={() => history.push('/register')}>
          Rigister
        </Button>
      </View>
    </View>
  );
}
