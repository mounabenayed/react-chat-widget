import React from 'react';
import { List } from 'immutable';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { createNewMessage, createLinkSnippet, createComponentMessage, createImage } from '@utils/messages';

import Messages from '../index';
import Message from '../components/Message';
import Snippet from '../components/Snippet';
import Image from '../components/Image';

configure({ adapter: new Adapter() });

describe('<Messages />', () => {
  const message = createNewMessage('Response message 1');
  const linkSnippet = createLinkSnippet({ title: 'link', link: 'link' });
  const image = createImage({image : 'image'});
  /* eslint-disable react/prop-types */
  const Dummy = ({ text }) => <div>{text}</div>;
  /* eslint-enable */
  const customComp = createComponentMessage(Dummy, { text: 'This is a Dummy Component!' });

  const responseMessages = List([message, linkSnippet, customComp, image]);

  const messagesComponent = shallow(
    <Messages.WrappedComponent
      messages={responseMessages}
    />
  );

  it('should render a Message component', () => {
    expect(messagesComponent.find(Message)).toHaveLength(1);
  });

  it('should render a Snippet component', () => {
    expect(messagesComponent.find(Snippet)).toHaveLength(1);
  });

  it('should render a Image component', () => {
    expect(messagesComponent.find(Image)).toHaveLength(1);
  });

  it('should reder a custom component', () => {
    expect(messagesComponent.find(Dummy)).toHaveLength(1);
  });
});
