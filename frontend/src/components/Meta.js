import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({title, description, keywords}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Welcome to ProShop',
  keywords: 'electronics, cheap electronics, buy electronics',
  description: 'Get the Best Products for Cheap'
}

export default Meta
