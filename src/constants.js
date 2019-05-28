import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

export const MESSAGE_SENDER = {
  CLIENT: 'client',
  RESPONSE: 'response'
};

export const MESSAGES_TYPES = {
  TEXT: 'text',
  SNIPPET: {
    LINK: 'snippet'
  },
  IMAGE: {
    IMAGE: 'image'
  },
  CUSTOM_COMPONENT: 'component'
};

export const PROP_TYPES = {
  MESSAGE: ImmutablePropTypes.contains({
    type: PropTypes.oneOf([
      MESSAGES_TYPES.TEXT,
      MESSAGES_TYPES.SNIPPET.LINK,
      MESSAGES_TYPES.IMAGE.IMAGE

    ]),
    text: PropTypes.string,
    sender: PropTypes.oneOf([
      MESSAGE_SENDER.CLIENT,
      MESSAGE_SENDER.RESPONSE
    ])
  }),

  SNIPPET: ImmutablePropTypes.contains({
    type: PropTypes.oneOf([
      MESSAGES_TYPES.TEXT,
      MESSAGES_TYPES.SNIPPET.LINK
    ]),
    title: PropTypes.string,
    link: PropTypes.string,
    sender: PropTypes.oneOf([
      MESSAGE_SENDER.CLIENT,
      MESSAGE_SENDER.RESPONSE
    ])
  }),


IMAGE: ImmutablePropTypes.contains({
  type: PropTypes.oneOf([
    MESSAGES_TYPES.TEXT,
    MESSAGES_TYPES.IMAGE.IMAGE
  ]),
  image: PropTypes.string,
  sender: PropTypes.oneOf([
    MESSAGE_SENDER.CLIENT,
    MESSAGE_SENDER.RESPONSE
  ])
})
};


export const MESSAGE_BOX_SCROLL_DURATION = 400;
