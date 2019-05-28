import React, { Component } from 'react';
import { Widget, addResponseMessage, setQuickButtons, toggleMsgLoader, addImage } from '../index';
import io from 'socket.io-client';
import axios from 'axios';

export default class App extends Component {
  componentDidMount() {
    addResponseMessage('Welcome to this awesome chat!');
    const image= {
      image : 'https://www.w3schools.com/html/img_girl.jpg'
    }
    addImage(image) 
    this.socket.on('connect', () => {
      this.socket.emit('session_request', ({ session_id: 'test' }));
    });
    this.socket.on('session_confirm', (remote_id) => {
      localStorage.setItem('sender_id_io', remote_id);
      axios({
        method: 'post',
        url: 'http://localhost:44379/api/Redis',
        data: {
          Id: remote_id,
          AccessToken: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImNmNTk1ZmM0MWY2YzQzMGU3N2Y5OTc3NTcxMmJkNzcwIiwidHlwIjoiSldUIn0.eyJuYmYiOjE1NTg5NTM3MTEsImV4cCI6MTU1OTA0MDExMSwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzMjAiLCJhdWQiOlsiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzMjAvcmVzb3VyY2VzIiwiYW5ha2luYXBpIiwiaWRwYXBpIl0sImNsaWVudF9pZCI6ImJlbGx1Y2kiLCJzdWIiOiIyMDY1NTMiLCJhdXRoX3RpbWUiOjE1NTg5NTM3MDksImlkcCI6ImxvY2FsIiwiSWQiOiIyMDY1NTMiLCJBY3RpbmdVc2VySWQiOiIyMDY1NTMiLCJOYW1lIjoidGVzdHJmcEBleGFtcGxlLmNvbSIsIkFwcGxpY2F0aW9uTGFuZ3VhZ2VJZCI6IkVuZ2xpc2giLCJTZXNzaW9uSWRlbnRpZmllciI6ImU0ZmEzNjVlLWM4ZmMtNGQ1Mi1iMDIxLWNlOTljZDI0OTBlYSIsIkNvbXBhbnlJZCI6IjgxNDU0IiwiU3VwcGxpZXJJZCI6IjExMDI5NSIsIlJvbGUiOiJBc3Nlc3NtZW50QWRtaW5pc3RyYXRvciIsInNjb3BlIjpbImFuYWtpbmFwaSIsImlkcGFwaSJdfQ.ca77OdOxLVUiOh6o5DEG9_e89krf-7bbuu6DEMbYlpLhvQrp65NiWcYF7BpdIxCdLaPeyrnmsGsIW56TXc_1fNmC8aF-v3IpXxdKbtKoh_GRT5TlPYyJrLjDFYu-sU29Zs_BZXbvJGSWdrRKCAOCaaX5qjsNrs-x2plWltOWWZd_psKo3Idb8spe2M7EVZ8sFxF_pLc3X0IEhTmkAJUu7ZzIQCjXaBGr-ew8PdNHroTOYIwjGiG5cyZsj3NL7l3DcnjwjG53VAaO9DfETJ_DCwgjYSgPfKp___IM6dfAz2x8FBR1JlZA3hSUd79elEsM7Z0Jr0M7hA8iSEfQgLQPTA',
        },
        responseType: 'text',
        responseEncoding: 'utf8',
      });
      // this.socket.emit('user_uttered', {
      //   message: 'hello',
      //   session_id: localStorage.getItem('sender_id_io'),
      // });
    });
    const url = {
      title: 'For more informations, please check out this link',
      link: 'https://support.ecovadis.com/',
      target: '_blank',
    };

    this.socket.on('bot_uttered', (msg) => {
      if (msg.text.slice(0, 4) === 'http') {
        url.link = msg.text;
        addLinkSnippet(url);
      } else if (msg.text.slice(0, 3) === 'img') {
        image.image = msg.text.slice(3,msg.text.length);
        addImage(image)
      }
      else { addResponseMessage(msg.text); }
    });



  }
  socket = io('http://localhost:5005');

  handleNewUserMessage = (newMessage) => {    
    toggleMsgLoader();
    setTimeout(() => {
      toggleMsgLoader();      
      if (newMessage === 'no') {
        setQuickButtons([ { label: 'YES', value: 'YES' }, { label: 'NO', value: 'NO' } ]);
      } else {
        this.socket.emit('user_uttered', {
          message: newMessage,
          session_id: localStorage.getItem('sender_id_io'),
        });
      }
    }, 2000);
  }

  handleQuickButtonClicked = (e) => {
    this.socket.on('bot_uttered', e ) ;
    setQuickButtons([]);
  }

  render() {
    return (
      <Widget
        handleQuickButtonClicked={this.handleQuickButtonClicked}
        badge={1}
        handleNewUserMessage={this.handleNewUserMessage}
        subtitle="Your assistant in the EV Platform"
        title="EV Chatbot"

      />
    );
  }
}



